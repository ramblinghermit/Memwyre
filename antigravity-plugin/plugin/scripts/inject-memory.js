/**
 * Memwyre x Antigravity - SessionStart Lifecycle Hook
 * ====================================================
 * Fired by Antigravity at the initialization of each conversation session.
 * Resembles the Claude Code plugin architecture while conforming to Antigravity's
 * hook specifications and intelligent workspace resolution.
 *
 * Stdin:  JSON payload containing { conversationId, workspacePaths, transcriptPath, cwd, ... }
 * Stdout: JSON payload with both `injectSteps` (Antigravity native) and `hookSpecificOutput` (Claude Code compatible)
 *
 * Deterministic contract:
 *   - Reads system metadata from stdin
 *   - Resolves active project workspace intelligently (never creating useless subfolder workspaces)
 *   - Fetches relevant past memories from Memwyre API
 *   - Injects structured <memwyre-context> into agent's context
 *   - Always outputs valid JSON and exits 0 (never blocks the session)
 */

'use strict';

const https = require('https');
const http = require('http');
const { readStoredCredentials } = require('./login');
const { resolveWorkspace } = require('./workspace');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    let resolved = false;

    // Safety timeout: if stdin closes without data or hangs
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({});
      }
    }, 2000);

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
      method: options.method || 'GET',
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
      req.destroy(new Error('Request timed out'));
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function outputResponse(contextText) {
  // Conforms to both Antigravity's injectSteps and Claude Code's hookSpecificOutput
  const payload = {
    injectSteps: [
      {
        systemMessage: {
          systemMessage: contextText,
        },
      },
    ],
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: contextText,
    },
  };
  process.stdout.write(JSON.stringify(payload));
}

async function main() {
  const input = await readStdin();
  const creds = readStoredCredentials();

  // Resolve project workspace deterministically
  const { projectName, projectRoot } = await resolveWorkspace(input, creds);

  if (!creds || !creds.apiKey) {
    outputResponse(
      `<memwyre-status>\nMemwyre Persistent Memory: Active (No API key found).\nTo link your vault: Run "node scripts/login.js --api-key <YOUR_KEY>"\nOr set MEMWYRE_API_KEY in your environment.\n</memwyre-status>`
    );
    process.exit(0);
  }

  let contextText = '';

  try {
    const res = await fetchJson(
      `${creds.apiUrl}/api/v1/plugin/context?project=${encodeURIComponent(projectName)}&source=antigravity`,
      {
        headers: {
          Authorization: `Bearer ${creds.apiKey}`,
          'Content-Type': 'application/json',
          'X-Plugin-Source': 'antigravity',
        },
        timeout: 6000,
      }
    );

    const memories = res.data && Array.isArray(res.data.memories) ? res.data.memories : [];

    if (memories.length > 0) {
      contextText = `<memwyre-context>\n## Past Memories & Architecture Context — [${projectName}]\n`;
      contextText += `The following verified decisions and project conventions were recalled from your Memwyre Vault:\n\n`;
      for (const m of memories) {
        contextText += `- ${m.content}\n`;
      }
      contextText += `\nKeep these constraints and past decisions in mind while reasoning.\n</memwyre-context>`;
    } else {
      contextText = `<memwyre-status>\nMemwyre: Connected to vault. No previous memories recorded yet for workspace "${projectName}".\nKey decisions made in this session will be captured automatically upon session completion.\n</memwyre-status>`;
    }
  } catch (err) {
    contextText = `<memwyre-status>\nMemwyre: Memory sync notice (${err.message}). Session will proceed normally.\n</memwyre-status>`;
  }

  outputResponse(contextText);
  process.exit(0);
}

main().catch(() => {
  outputResponse('');
  process.exit(0);
});
