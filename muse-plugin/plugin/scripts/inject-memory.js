/**
 * Memwyre × Muse Code — SessionStart Hook
 * =========================================
 * Fired by Muse Code at the beginning of every session.
 *
 * Stdin:  JSON payload from Muse Code (hookEventName, sessionId, cwd, workspaceRoot, etc.)
 * Stdout: JSON with hookSpecificOutput.additionalContext to inject into system prompt
 * Exit 0: success / allow session to proceed
 *
 * IMPORTANT — Credential Handling:
 *   Muse Code clears the shell environment before running hooks.
 *   `export MEMWYRE_API_KEY` will NOT be visible here.
 *   Credentials are read from ~/.muse-memwyre/credentials.json (file-based auth).
 *   Run `node scripts/login.js` once to store credentials.
 *   Falls back to MEMWYRE_API_KEY env var for CI / self-hosted setups.
 *
 * Deterministic contract:
 *   - Reads stdin → parses JSON
 *   - Reads credentials from file or env
 *   - Calls GET /api/v1/plugin/context?project=<name>&source=muse
 *   - Writes additionalContext back to stdout for Muse to prepend to system prompt
 *   - Always exits 0 (never blocks the session)
 */

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ---------------------------------------------------------------------------
// Stdin reader — reads all of stdin as a UTF-8 string, returns parsed JSON
// ---------------------------------------------------------------------------
function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    let resolved = false;

    // Safety fallback: if stdin closes without data (e.g. invoked standalone)
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
// Falls back to MEMWYRE_API_KEY env var for CI / self-hosted setups.
// ---------------------------------------------------------------------------
function readCredentials() {
  // 1. Try file-based auth (primary — works even when Muse clears env)
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

  // 2. Fallback to env var (works in CI or if Muse doesn't clear env)
  const apiKey = process.env.MEMWYRE_API_KEY;
  const apiUrl = (process.env.MEMWYRE_API_URL || 'https://api.memwyre.tech').replace(/\/$/, '');
  return apiKey ? { apiKey, apiUrl } : { apiKey: null, apiUrl };
}

// ---------------------------------------------------------------------------
// Minimal fetch replacement — no dependencies, pure Node built-ins
// ---------------------------------------------------------------------------
function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const transport = parsed.protocol === 'https:' ? https : http;
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = transport.request(reqOptions, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch (_) { resolve({ status: res.statusCode, data: body }); }
      });
    });

    req.setTimeout(options.timeout || 8000, () => {
      req.destroy(new Error('Request timed out'));
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const input = await readStdin();

  // Resolve project name from cwd (Muse sends workspaceRoot and/or cwd in stdin)
  const cwd = input.workspaceRoot || input.cwd || process.cwd();
  const projectName = path.basename(cwd) || 'default';

  const { apiKey, apiUrl } = readCredentials();

  // If no API key configured — emit a soft status message, don't block
  if (!apiKey) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'SessionStart',
        additionalContext: `<memwyre-status>\nMemwyre: No API key found.\nRun: node "${path.join(os.homedir(), '.muse/plugins/memwyre/scripts/login.js')}"\nOr set MEMWYRE_API_KEY in your environment.\n</memwyre-status>`
      }
    }));
    process.exit(0);
  }

  let contextText = '';

  try {
    const res = await fetchJson(
      `${apiUrl}/api/v1/plugin/context?project=${encodeURIComponent(projectName)}&source=muse`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-Plugin-Source': 'muse',
        },
        timeout: 8000,
      }
    );

    const memories = (res.data && res.data.memories) ? res.data.memories : [];

    if (memories.length > 0) {
      contextText = `<memwyre-context>\n## Past Memories — ${projectName}\n\n`;
      for (const m of memories) {
        contextText += `- ${m.content}\n`;
      }
      contextText += `\n</memwyre-context>`;
    } else {
      contextText = `<memwyre-status>\nMemwyre: No previous memories for "${projectName}". This session will be captured automatically.\n</memwyre-status>`;
    }
  } catch (err) {
    // Non-fatal: network issue. Don't block the session.
    contextText = `<memwyre-status>\nMemwyre: Could not reach API (${err.message}). Session will proceed without memory injection.\n</memwyre-status>`;
  }

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: contextText,
    }
  }));

  process.exit(0);
}

main().catch(() => process.exit(0));
