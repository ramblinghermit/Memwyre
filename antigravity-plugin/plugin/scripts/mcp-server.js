/**
 * Memwyre x Antigravity - Pure Node.js Stdio MCP Server
 * =======================================================
 * Implements the Model Context Protocol (MCP) JSON-RPC 2.0 specification over stdio.
 * Zero npm dependencies - works out of the box with Node.js built-ins.
 *
 * Exposes tools:
 *   - memwyre_search: Semantic retrieval across vault memories
 *   - memwyre_save: Save permanent architectural decisions / conventions
 *   - memwyre_context: Get all memories for a project workspace
 *   - memwyre_status: Check account info, projects, and connectivity
 */

'use strict';

const https = require('https');
const http = require('http');
const readline = require('readline');
const path = require('path');
const { readStoredCredentials, validateKey } = require('./login');
const { resolveWorkspace } = require('./workspace');

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
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data: JSON.parse(body) });
        } catch (_) {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data: body });
        }
      });
    });

    req.setTimeout(options.timeout || 10000, () => {
      req.destroy(new Error('Request timed out'));
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Tool Handlers
// ---------------------------------------------------------------------------
async function handleSearch(args) {
  const creds = readStoredCredentials();
  if (!creds || !creds.apiKey) {
    return 'Error: Memwyre API key not configured. Run "node scripts/login.js --api-key <KEY>" or set MEMWYRE_API_KEY.';
  }

  let project = args.project;
  if (!project) {
    const ws = await resolveWorkspace({ cwd: process.cwd() }, creds);
    project = ws.projectName;
  }

  const query = args.query;

  try {
    const res = await fetchJson(`${creds.apiUrl}/api/v1/retrieval/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.apiKey}`,
        'Content-Type': 'application/json',
        'X-Plugin-Source': 'antigravity-mcp',
      },
      body: {
        query,
        workspace_name: project,
        top_k: 5,
      },
      timeout: 10000,
    });

    if (res.ok && res.data) {
      if (typeof res.data === 'string') return res.data;
      if (Array.isArray(res.data.results) && res.data.results.length > 0) {
        return res.data.results
          .map((r, i) => `${i + 1}. ${r.content || r.text || JSON.stringify(r)}`)
          .join('\n\n');
      }
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data
          .map((r, i) => `${i + 1}. ${r.content || r.text || JSON.stringify(r)}`)
          .join('\n\n');
      }
    }

    // Fallback: search via project context endpoint
    const ctxRes = await fetchJson(
      `${creds.apiUrl}/api/v1/plugin/context?project=${encodeURIComponent(project)}&source=antigravity-mcp`,
      {
        headers: {
          Authorization: `Bearer ${creds.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (ctxRes.ok && ctxRes.data && Array.isArray(ctxRes.data.memories) && ctxRes.data.memories.length > 0) {
      const qLower = query.toLowerCase();
      const filtered = ctxRes.data.memories.filter((m) =>
        (m.content || '').toLowerCase().includes(qLower)
      );
      const matches = filtered.length > 0 ? filtered : ctxRes.data.memories;
      return matches.map((m, i) => `${i + 1}. ${m.content}`).join('\n\n');
    }

    return `No relevant memories found in Memwyre Vault for query: "${query}". (Searched workspace: ${project})`;
  } catch (err) {
    return `Search request failed: ${err.message}`;
  }
}

async function handleSave(args) {
  const creds = readStoredCredentials();
  if (!creds || !creds.apiKey) {
    return 'Error: Memwyre API key not configured. Run "node scripts/login.js --api-key <KEY>".';
  }

  let project = args.project;
  if (!project) {
    const ws = await resolveWorkspace({ cwd: process.cwd() }, creds);
    project = ws.projectName;
  }

  const text = args.text;
  let tags = args.tags;
  if (typeof tags === 'string') {
    tags = tags.split(',').map((t) => t.trim()).filter(Boolean);
  } else if (!Array.isArray(tags)) {
    tags = ['antigravity'];
  }

  // Derive a clean title if not provided
  let title = args.title;
  if (!title && typeof text === 'string') {
    const firstLine = text.split('\n').map((l) => l.trim()).find((l) => l.length > 0) || 'Agent Memory';
    title = firstLine.replace(/^#+\s*/, '').slice(0, 80).trim() || 'Agent Memory';
  } else if (!title) {
    title = 'Agent Memory';
  }

  try {
    const res = await fetchJson(`${creds.apiUrl}/api/v1/memory/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${creds.apiKey}`,
        'Content-Type': 'application/json',
        'X-Plugin-Source': 'antigravity-mcp',
      },
      body: {
        title,
        content: text,
        tags,
        source: 'antigravity',
        workspace_name: project,
      },
      timeout: 10000,
    });

    if (res.ok) {
      const id = (res.data && res.data.id) ? `mem_${res.data.id}` : 'new';
      return `Memory successfully saved to Memwyre Vault (${id}). Workspace: "${project}".`;
    }

    let errorDetail = `HTTP ${res.status}`;
    if (res.data) {
      if (typeof res.data.detail === 'string') {
        errorDetail = res.data.detail;
      } else if (Array.isArray(res.data.detail)) {
        errorDetail = res.data.detail.map((d) => (d.msg ? `${d.loc ? d.loc.join('.') + ': ' : ''}${d.msg}` : JSON.stringify(d))).join('; ');
      } else if (typeof res.data.detail === 'object') {
        errorDetail = JSON.stringify(res.data.detail);
      } else if (res.data.message) {
        errorDetail = typeof res.data.message === 'string' ? res.data.message : JSON.stringify(res.data.message);
      }
    }
    return `Failed to save memory: ${errorDetail}`;
  } catch (err) {
    return `Save request error: ${err.message}`;
  }
}

async function handleContext(args) {
  const creds = readStoredCredentials();
  if (!creds || !creds.apiKey) {
    return 'Error: Memwyre API key not configured.';
  }

  let project = args.project;
  if (!project) {
    const ws = await resolveWorkspace({ cwd: process.cwd() }, creds);
    project = ws.projectName;
  }

  try {
    const res = await fetchJson(
      `${creds.apiUrl}/api/v1/plugin/context?project=${encodeURIComponent(project)}&source=antigravity-mcp`,
      {
        headers: {
          Authorization: `Bearer ${creds.apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    if (res.ok && res.data && Array.isArray(res.data.memories) && res.data.memories.length > 0) {
      return `### Memwyre Context for [${project}]\n\n` +
        res.data.memories.map((m, i) => `${i + 1}. ${m.content} (${m.created_at || 'stored'})`).join('\n\n');
    }

    return `No memories currently stored for workspace: "${project}".`;
  } catch (err) {
    return `Failed to fetch context: ${err.message}`;
  }
}

async function handleStatus() {
  const creds = readStoredCredentials();
  if (!creds || !creds.apiKey) {
    return 'Memwyre Status: Disconnected (No API key found). Set MEMWYRE_API_KEY or run login.js.';
  }

  const ws = await resolveWorkspace({ cwd: process.cwd() }, creds);

  try {
    const val = await validateKey(creds.apiKey, creds.apiUrl);
    if (val.ok) {
      return `Memwyre Status: Connected\nAPI Endpoint: ${creds.apiUrl}\nAccount Email: ${val.data.email || 'N/A'}\nActive Workspace: ${ws.projectName} (${ws.projectRoot})\nCredentials Source: ${creds.source}`;
    }
    return `Memwyre Status: Auth Error (HTTP ${val.status}): ${val.error}`;
  } catch (err) {
    return `Memwyre Status: Network error connecting to ${creds.apiUrl} (${err.message})`;
  }
}

// ---------------------------------------------------------------------------
// Tool Manifests
// ---------------------------------------------------------------------------
const TOOLS = [
  {
    name: 'memwyre_search',
    description: 'Search your persistent Memwyre Vault for past project decisions, architecture notes, personal conventions, and saved code context.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Semantic query (e.g. "auth token architecture", "database migration conventions", "deployment setup")',
        },
        project: {
          type: 'string',
          description: 'Optional workspace/project name to constrain results to (defaults to root workspace)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'memwyre_save',
    description: 'Save an important insight, architectural decision, code pattern, or preference to your Memwyre Vault so it persists across all agent sessions.',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Optional short summary title for the memory (auto-extracted from text if omitted).',
        },
        text: {
          type: 'string',
          description: 'The memory or knowledge snippet to remember.',
        },
        tags: {
          type: 'string',
          description: 'Comma-separated list of tags (e.g. "auth, architecture, backend")',
        },
        project: {
          type: 'string',
          description: 'Workspace or project name (defaults to root workspace)',
        },
      },
      required: ['text'],
    },
  },
  {
    name: 'memwyre_context',
    description: 'Retrieve past project memories and context registered for the current codebase from Memwyre.',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Workspace or project name (defaults to root workspace)',
        },
      },
    },
  },
  {
    name: 'memwyre_status',
    description: 'Check Memwyre persistent memory connectivity, active user account, and stored credential details.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

// ---------------------------------------------------------------------------
// MCP Protocol Loop (stdio)
// ---------------------------------------------------------------------------
function sendRpc(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

function startMcpServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on('line', async (line) => {
    if (!line.trim()) return;

    let req;
    try {
      req = JSON.parse(line);
    } catch (_) {
      return;
    }

    const { id, method, params } = req;

    if (method === 'initialize') {
      sendRpc({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: 'memwyre',
            version: '1.0.0',
          },
        },
      });
      return;
    }

    if (method === 'notifications/initialized') {
      return;
    }

    if (method === 'tools/list') {
      sendRpc({
        jsonrpc: '2.0',
        id,
        result: {
          tools: TOOLS,
        },
      });
      return;
    }

    if (method === 'tools/call') {
      const toolName = params && params.name;
      const args = (params && params.arguments) || {};
      let resultText = '';

      try {
        if (toolName === 'memwyre_search') {
          resultText = await handleSearch(args);
        } else if (toolName === 'memwyre_save') {
          resultText = await handleSave(args);
        } else if (toolName === 'memwyre_context') {
          resultText = await handleContext(args);
        } else if (toolName === 'memwyre_status') {
          resultText = await handleStatus(args);
        } else {
          sendRpc({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Unknown tool: ${toolName}`,
            },
          });
          return;
        }

        sendRpc({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: resultText,
              },
            ],
          },
        });
      } catch (err) {
        sendRpc({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `Tool execution failed: ${err.message}`,
              },
            ],
            isError: true,
          },
        });
      }
      return;
    }

    if (id !== undefined) {
      sendRpc({
        jsonrpc: '2.0',
        id,
        error: {
          code: -32601,
          message: `Method not supported: ${method}`,
        },
      });
    }
  });
}

// ---------------------------------------------------------------------------
// Direct CLI mode handler
// ---------------------------------------------------------------------------
async function handleCli() {
  const args = process.argv.slice(2);
  if (args.includes('--search')) {
    const qIdx = args.indexOf('--search');
    const query = args[qIdx + 1] || '';
    const res = await handleSearch({ query });
    console.log(res);
    return true;
  }
  if (args.includes('--save')) {
    const sIdx = args.indexOf('--save');
    const text = args[sIdx + 1] || '';
    let tags = 'cli';
    if (args.includes('--tags')) {
      tags = args[args.indexOf('--tags') + 1] || 'cli';
    }
    const res = await handleSave({ text, tags });
    console.log(res);
    return true;
  }
  if (args.includes('--status')) {
    const res = await handleStatus();
    console.log(res);
    return true;
  }
  return false;
}

async function run() {
  const handled = await handleCli();
  if (!handled) {
    startMcpServer();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
