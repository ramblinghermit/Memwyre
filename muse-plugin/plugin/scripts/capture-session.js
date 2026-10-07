/**
 * Memwyre × Muse Code — Stop Hook
 * =================================
 * Fired by Muse Code at the end of every agent turn / when the session stops.
 *
 * Stdin:  JSON payload from Muse Code — includes:
 *           hookEventName, sessionId, cwd, workspaceRoot, transcriptPath (path to session.jsonl)
 * Stdout: JSON { continue: true } to allow Muse to resume normally
 * Exit 0: always — this hook never blocks
 *
 * IMPORTANT — Credential Handling:
 *   Muse Code clears the shell environment before running hooks.
 *   `export MEMWYRE_API_KEY` will NOT be visible here.
 *   Credentials are read from ~/.muse-memwyre/credentials.json (file-based auth).
 *   Run `node scripts/login.js` once to store credentials.
 *   Falls back to MEMWYRE_API_KEY env var for CI / self-hosted setups.
 *
 * Deterministic contract:
 *   - Reads stdin → extracts sessionId + transcriptPath
 *   - Parses the session.jsonl transcript file line-by-line
 *   - Falls back to scanning XDG data dir (~/.local/share/muse/sessions/) if transcriptPath not provided
 *   - POSTs to /api/v1/plugin/capture for background memory extraction
 *   - Always exits 0
 */

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const os = require('os');

// ---------------------------------------------------------------------------
// Stdin reader
// ---------------------------------------------------------------------------
function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    let resolved = false;
    const fallback = setTimeout(() => {
      if (!resolved) { resolved = true; resolve({}); }
    }, 2000);
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      clearTimeout(fallback);
      if (resolved) return;
      resolved = true;
      try { resolve(JSON.parse(data)); } catch (_) { resolve({}); }
    });
    process.stdin.on('error', () => {
      clearTimeout(fallback);
      if (!resolved) { resolved = true; resolve({}); }
    });
  });
}

// ---------------------------------------------------------------------------
// File-based credential reader
// Muse clears the shell env, so we read from a dedicated credentials file.
// ---------------------------------------------------------------------------
function readCredentials() {
  try {
    const credFile = path.join(os.homedir(), '.muse-memwyre', 'credentials.json');
    if (fs.existsSync(credFile)) {
      const raw = fs.readFileSync(credFile, 'utf8');
      const creds = JSON.parse(raw);
      if (creds && creds.apiKey) {
        return {
          apiKey: creds.apiKey,
          apiUrl: (creds.apiUrl || 'https://api.memwyre.tech').replace(/\/$/, ''),
        };
      }
    }
  } catch (_) { /* ignore parse errors */ }

  const apiKey = process.env.MEMWYRE_API_KEY;
  const apiUrl = (process.env.MEMWYRE_API_URL || 'https://api.memwyre.tech').replace(/\/$/, '');
  return apiKey ? { apiKey, apiUrl } : { apiKey: null, apiUrl };
}

// ---------------------------------------------------------------------------
// JSONL transcript parser — reads .jsonl file line by line
// ---------------------------------------------------------------------------
async function parseTranscript(filePath) {
  const messages = [];
  if (!filePath || !fs.existsSync(filePath)) return messages;
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath, { encoding: 'utf8' }),
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      if (!line.trim()) continue;
      try { messages.push(JSON.parse(line)); } catch (_) { /* skip malformed */ }
    }
  } catch (_) { /* silent */ }
  return messages;
}

// ---------------------------------------------------------------------------
// Fallback: scan Muse Code's own session store for the latest session.jsonl
// Muse Code stores sessions at (XDG-compliant):
//   ~/.local/share/muse/sessions/YYYY/MM/DD/<session-uuid>/session.jsonl
// On macOS: ~/Library/Application Support/muse/sessions/...
// On Windows: %LOCALAPPDATA%/muse/sessions/...
// ---------------------------------------------------------------------------
async function findLatestMuseSession() {
  try {
    // Determine XDG data dir per platform
    const xdgDataHome = process.env.XDG_DATA_HOME
      || (process.platform === 'win32'
        ? path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'))
        : (process.platform === 'darwin'
          ? path.join(os.homedir(), 'Library', 'Application Support')
          : path.join(os.homedir(), '.local', 'share')));
    const sessionsRoot = path.join(xdgDataHome, 'muse', 'sessions');
    if (!fs.existsSync(sessionsRoot)) return [];

    let latestFile = null;
    let latestTime = 0;

    // Muse uses YYYY/MM/DD/<uuid>/session.jsonl hierarchy
    // Walk up to 4 levels deep to find session.jsonl files
    function scanDir(dir, depth) {
      if (depth > 4) return;
      let entries;
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch (_) { return; }

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath, depth + 1);
        } else if (entry.name === 'session.jsonl') {
          try {
            const mtime = fs.statSync(fullPath).mtimeMs;
            if (mtime > latestTime) {
              latestTime = mtime;
              latestFile = fullPath;
            }
          } catch (_) { /* stat failed */ }
        }
      }
    }

    scanDir(sessionsRoot, 0);

    if (!latestFile) return [];
    return await parseTranscript(latestFile);
  } catch (_) {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Minimal HTTP POST — zero npm deps
// ---------------------------------------------------------------------------
function postJson(url, payload, headers = {}, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const parsed = new URL(url);
    const transport = parsed.protocol === 'https:' ? https : http;
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers,
      },
    };
    const req = transport.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.setTimeout(timeout, () => req.destroy(new Error('Timed out')));
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const input = await readStdin();

  const cwd = input.workspaceRoot || input.cwd || process.cwd();
  const sessionId = input.sessionId || input.session_id || `muse_${Date.now()}`;
  const transcriptPath = input.transcriptPath || input.transcript_path || null;
  const projectName = path.basename(cwd) || 'default';

  const { apiKey, apiUrl } = readCredentials();

  // Always signal continue — this hook never blocks Muse
  const done = () => {
    process.stdout.write(JSON.stringify({ continue: true }));
    process.exit(0);
  };

  if (!apiKey) return done();

  // 1. Try to read transcript from the path Muse provides in the hook payload
  let transcript = await parseTranscript(transcriptPath);

  // 2. Fallback: scan Muse's session store
  if (transcript.length === 0) {
    transcript = await findLatestMuseSession();
  }

  if (transcript.length === 0) return done();

  // 3. POST to Memwyre capture endpoint (fire-and-forget with a short timeout)
  try {
    await postJson(
      `${apiUrl}/api/v1/plugin/capture`,
      {
        session_id: sessionId,
        project_name: projectName,
        cwd,
        source: 'muse',
        transcript,
      },
      {
        Authorization: `Bearer ${apiKey}`,
        'X-Plugin-Source': 'muse',
      },
      10000
    );
  } catch (_) {
    // Non-fatal — network errors are silently swallowed
  }

  done();
}

main().catch(() => {
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);
});
