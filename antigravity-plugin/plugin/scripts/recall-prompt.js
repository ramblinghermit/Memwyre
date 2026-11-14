/**
 * Memwyre x Antigravity - Direct Recall Lifecycle Hook
 * ======================================================
 * Fired before model generation:
 *   - In Antigravity: via PreInvocation
 *   - In Claude Code: via UserPromptSubmit
 *
 * Proactive Advantage:
 *   Instead of waiting for the LLM to decide whether to spend a turn and token
 *   budget invoking an MCP tool, this hook directly searches Memwyre's vector
 *   vault using the user's substantive prompt before the model begins reasoning.
 *
 *   Deduplicates results within the session so the prompt is never spammed
 *   with duplicate facts.
 */

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const readline = require('readline');
const { readStoredCredentials } = require('./login');
const { resolveWorkspace } = require('./workspace');

const MIN_PROMPT_LENGTH = 10;
const MAX_RESULTS = 5;
const SEARCH_TIMEOUT_MS = 4000;

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    let resolved = false;

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({});
      }
    }, 1500);

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      clearTimeout(timer);
      if (resolved) return;
      resolved = true;
      try {
        resolve(JSON.parse(data));
      } catch (_) {
        resolve({});
      }
    });
    process.stdin.on('error', () => {
      clearTimeout(timer);
      if (!resolved) {
        resolved = true;
        resolve({});
      }
    });
  });
}

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const transport = parsed.protocol === 'https:' ? https : http;
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: options.method || 'POST',
      headers: options.headers || {},
    };

    const req = transport.request(reqOptions, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data: JSON.parse(body) });
        } catch (_) {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data: body });
        }
      });
    });

    req.setTimeout(options.timeout || SEARCH_TIMEOUT_MS, () => {
      req.destroy(new Error('Search request timed out'));
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function hashText(text) {
  return crypto.createHash('sha256').update(String(text).replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 16);
}

function getSeenStorePath(sessionId) {
  const dir = path.join(os.homedir(), '.antigravity-memwyre', 'sessions');
  if (!fs.existsSync(dir)) {
    try { fs.mkdirSync(dir, { recursive: true }); } catch (_) {}
  }
  const safeId = String(sessionId || 'default').replace(/[^a-zA-Z0-9_-]/g, '_');
  return path.join(dir, `recalled_${safeId}.json`);
}

function readSeenHashes(sessionId) {
  try {
    const p = getSeenStorePath(sessionId);
    if (fs.existsSync(p)) {
      return new Set(JSON.parse(fs.readFileSync(p, 'utf8')));
    }
  } catch (_) {}
  return new Set();
}

function saveSeenHashes(sessionId, seenSet) {
  try {
    const p = getSeenStorePath(sessionId);
    fs.writeFileSync(p, JSON.stringify(Array.from(seenSet)), 'utf8');
  } catch (_) {}
}

async function extractLatestUserPrompt(transcriptPath) {
  if (!transcriptPath || !fs.existsSync(transcriptPath)) return '';
  let lastPrompt = '';

  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(transcriptPath, { encoding: 'utf8' }),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (!line.trim()) continue;
      try {
        const item = JSON.parse(line);
        if (item.type === 'USER_INPUT' || item.role === 'user' || item.source === 'USER_EXPLICIT') {
          if (typeof item.content === 'string') {
            lastPrompt = item.content;
          } else if (item.message) {
            lastPrompt = String(item.message);
          }
        }
      } catch (_) {}
    }
  } catch (_) {}

  return lastPrompt.trim();
}

function outputResult(ephemeralText, userPromptSubmitText) {
  const payload = {
    injectSteps: ephemeralText
      ? [
          {
            ephemeralMessage: ephemeralText,
          },
        ]
      : [],
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext: userPromptSubmitText || ephemeralText || '',
    },
    continue: true,
  };
  process.stdout.write(JSON.stringify(payload));
}

async function main() {
  const input = await readStdin();
  const creds = readStoredCredentials();

  if (!creds || !creds.apiKey) {
    outputResult('', '');
    process.exit(0);
  }

  // Determine user prompt from stdin or transcript
  let prompt = (input.prompt || input.userPrompt || '').trim();
  const transcriptPath = input.transcriptPath || input.transcript_path;

  if (!prompt && transcriptPath) {
    prompt = await extractLatestUserPrompt(transcriptPath);
  }

  // Skip trivial, short, or command prompts
  if (prompt.length < MIN_PROMPT_LENGTH || ['/', '!', '#'].includes(prompt[0])) {
    outputResult('', '');
    process.exit(0);
  }

  const sessionId = input.conversationId || input.sessionId || input.session_id || 'default';
  const { projectName } = await resolveWorkspace(input, creds);

  let memories = [];
  try {
    const res = await fetchJson(`${creds.apiUrl}/api/v1/retrieval/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.apiKey}`,
        'Content-Type': 'application/json',
        'X-Plugin-Source': 'antigravity-direct-recall',
      },
      body: {
        query: prompt.slice(0, 400),
        workspace_name: projectName,
        top_k: MAX_RESULTS,
      },
      timeout: SEARCH_TIMEOUT_MS,
    });

    if (res.ok && res.data) {
      if (Array.isArray(res.data.results)) {
        memories = res.data.results;
      } else if (Array.isArray(res.data.memories)) {
        memories = res.data.memories;
      }
    }
  } catch (_) {
    // Non-blocking fallback
  }

  if (memories.length === 0) {
    outputResult('', '');
    process.exit(0);
  }

  // Filter against seen hashes
  const seenSet = readSeenHashes(sessionId);
  const fresh = [];

  for (const m of memories) {
    const text = (m.content || m.text || (typeof m === 'string' ? m : '')).trim();
    if (!text) continue;
    const h = hashText(text);
    if (!seenSet.has(h)) {
      seenSet.add(h);
      fresh.push(text);
    }
  }

  if (fresh.length === 0) {
    outputResult('', '');
    process.exit(0);
  }

  saveSeenHashes(sessionId, seenSet);

  const formatted = `<memwyre-recall>\n◪ Proactively recalled from Memwyre Vault for this prompt:\n${fresh.map((f) => `- ◪ ${f}`).join('\n')}\nKeep these verified facts and past decisions in mind while answering.\n</memwyre-recall>`;

  outputResult(formatted, formatted);
  process.exit(0);
}

main().catch(() => {
  outputResult('', '');
  process.exit(0);
});
