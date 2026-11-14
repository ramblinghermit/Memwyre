/**
 * Memwyre x Antigravity - Stop Lifecycle Hook
 * ============================================
 * Fired by Antigravity whenever an execution loop terminates.
 * Captures conversation turns to Memwyre for asynchronous background knowledge extraction.
 *
 * Supermemory-grade Enhancements:
 *   - Automated Secret Redaction: strips API keys, private tokens, passwords before upload.
 *   - Delta Tracking: tracks last captured step index to only send new conversation deltas.
 *   - Non-blocking: always returns allow/continue without delaying agent termination.
 */

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const { readStoredCredentials } = require('./login');
const { resolveWorkspace } = require('./workspace');

// Regex patterns for secret redaction
const SECRET_PATTERNS = [
  /(?:bv_sk_|sk-|ghp_|gho_|xox[baprs]-|AKIA|AIza)[a-zA-Z0-9_\-]{16,}/g,
  /(?:bearer\s+)[a-zA-Z0-9_\-\.]{20,}/gi,
  /(?:password|secret|token|api[_-]?key)["']?\s*[:=]\s*["']?([^\s"'`]{8,})["']?/gi,
  /-----BEGIN\s+[A-Z\s]+PRIVATE\s+KEY-----[\s\S]*?-----END\s+[A-Z\s]+PRIVATE\s+KEY-----/g,
];

function redactSecrets(text) {
  if (typeof text !== 'string') return text;
  let redacted = text;
  for (const pattern of SECRET_PATTERNS) {
    redacted = redacted.replace(pattern, '[REDACTED_SECRET]');
  }
  return redacted;
}

function getSessionStatePath(sessionId) {
  const dir = path.join(os.homedir(), '.antigravity-memwyre', 'sessions');
  if (!fs.existsSync(dir)) {
    try { fs.mkdirSync(dir, { recursive: true }); } catch (_) {}
  }
  const safeId = String(sessionId || 'default').replace(/[^a-zA-Z0-9_-]/g, '_');
  return path.join(dir, `state_${safeId}.json`);
}

function getLastCapturedIndex(sessionId) {
  try {
    const p = getSessionStatePath(sessionId);
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      return typeof data.lastIndex === 'number' ? data.lastIndex : -1;
    }
  } catch (_) {}
  return -1;
}

function saveLastCapturedIndex(sessionId, lastIndex) {
  try {
    const p = getSessionStatePath(sessionId);
    fs.writeFileSync(p, JSON.stringify({ lastIndex, updatedAt: new Date().toISOString() }), 'utf8');
  } catch (_) {}
}

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
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (_) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.setTimeout(options.timeout || 6000, () => {
      req.destroy(new Error('Capture timed out'));
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function parseTranscriptDelta(filePath, lastCapturedIdx) {
  const steps = [];
  let maxIdx = lastCapturedIdx;
  if (!filePath || !fs.existsSync(filePath)) return { steps, maxIdx };

  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath, { encoding: 'utf8' }),
      crlfDelay: Infinity,
    });

    let currentIdx = 0;
    for await (const line of rl) {
      if (!line.trim()) continue;
      try {
        const step = JSON.parse(line);
        const stepIdx = typeof step.step_index === 'number' ? step.step_index : currentIdx++;

        if (stepIdx <= lastCapturedIdx) {
          continue; // Already captured previously
        }

        if (stepIdx > maxIdx) {
          maxIdx = stepIdx;
        }

        const rawContent = typeof step.content === 'string'
          ? step.content.slice(0, 4000)
          : (step.message ? String(step.message).slice(0, 4000) : '');

        const sanitized = {
          step_index: stepIdx,
          type: step.type,
          source: step.source || (step.role ? step.role.toUpperCase() : undefined),
          created_at: step.created_at || step.timestamp,
          content: redactSecrets(rawContent),
        };

        if (step.tool_calls && Array.isArray(step.tool_calls)) {
          sanitized.tool_calls = step.tool_calls.map((t) => ({
            name: t.name || (t.toolCall && t.toolCall.name),
            toolSummary: redactSecrets(t.toolSummary || (t.args && t.args.toolSummary) || ''),
          }));
        }

        steps.push(sanitized);
      } catch (_) {}
    }
  } catch (_) {}

  return { steps, maxIdx };
}

function writeOutput() {
  process.stdout.write(JSON.stringify({ decision: 'allow', continue: true }));
}

async function main() {
  const input = await readStdin();
  const creds = readStoredCredentials();

  if (!creds || !creds.apiKey) {
    writeOutput();
    process.exit(0);
  }

  const { projectName, projectRoot } = await resolveWorkspace(input, creds);
  const sessionId = input.conversationId || input.sessionId || input.session_id || `agy_${Date.now()}`;
  const transcriptPath = input.transcriptPath || input.transcript_path || null;

  const lastIdx = getLastCapturedIndex(sessionId);
  let deltaSteps = [];
  let maxIdx = lastIdx;

  if (transcriptPath) {
    const parsed = await parseTranscriptDelta(transcriptPath, lastIdx);
    deltaSteps = parsed.steps;
    maxIdx = parsed.maxIdx;
  }

  if (deltaSteps.length > 0) {
    try {
      await fetchJson(`${creds.apiUrl}/api/v1/plugin/capture`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${creds.apiKey}`,
          'Content-Type': 'application/json',
          'X-Plugin-Source': 'antigravity',
        },
        body: {
          session_id: String(sessionId),
          project_name: projectName,
          cwd: projectRoot,
          source: 'antigravity',
          transcript: deltaSteps,
        },
        timeout: 6000,
      });
      saveLastCapturedIndex(sessionId, maxIdx);
    } catch (_) {
      // Non-blocking: background capture failures are ignored
    }
  }

  writeOutput();
  process.exit(0);
}

main().catch(() => {
  writeOutput();
  process.exit(0);
});
