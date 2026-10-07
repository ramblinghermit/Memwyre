# Muse Code × Memwyre Plugin

<p align="center">
  <a href="https://www.npmjs.com/package/@memwyre/muse-plugin"><img src="https://img.shields.io/npm/v/@memwyre/muse-plugin?style=flat-square&color=ff4d4d&label=npm" alt="npm version" /></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="license" /></a>
  <img src="https://img.shields.io/badge/muse_code-plugin-0064FF?style=flat-square" alt="muse plugin" />
</p>

Seamless persistent memory and automated session lifecycle hooks for **Muse Code** (`muse` CLI), powered by **Memwyre**.

---

## Features

- 🧠 **`SessionStart` — Context Injection**: Automatically retrieves past project memories when a Muse Code session starts, prepending them into the system prompt.
- 💾 **`Stop` — Session Capture**: When the session ends, sends the transcript to Memwyre for background memory extraction.
- 🔑 **File-Based Auth**: Credentials stored in `~/.muse-memwyre/credentials.json` — works even when Muse clears the shell environment.
- 🔌 **MCP Server**: Exposes the full Memwyre toolset via `server.memwyre.tech/mcp` for in-session tool calls.
- ⚡ **Zero Dependencies**: Both hook scripts are pure Node.js built-ins (`http`, `https`, `fs`, `readline`). No `npm install` needed.
- 🔒 **Non-Blocking**: All hooks exit `0` and never stall the agent — errors are silently swallowed.
- 🛠️ **Skills**: Manual control via `/memwyre:index`, `/memwyre:status`, `/memwyre:logout` slash commands.

---

## Installation

### Option A — Muse Plugin Marketplace (recommended)

```bash
export MUSE_EXPERIMENTAL_PLUGINS=1
muse plugins marketplace add memwyre https://github.com/memwyre/muse-plugin
muse plugins install memwyre@memwyre
muse plugins approve memwyre
```

### Option B — Local Path Install

```bash
muse plugins install /path/to/muse-plugin --scope user
muse plugins approve memwyre
```

### Option C — Manual (direct `.muse` placement)

Copy the `plugin/` directory into your user or project Muse config:

```bash
# User-level (all Muse sessions)
mkdir -p ~/.muse/plugins/memwyre
cp -r plugin/* ~/.muse/plugins/memwyre/
```

---

## Configuration

### Step 1: Authenticate (Required)

Because Muse Code clears the shell environment before running hooks, you cannot use `export MEMWYRE_API_KEY`. Instead, run the one-time login script:

```bash
node ~/.muse/plugins/memwyre/scripts/login.js
```

This will:
1. Prompt for your Memwyre API key (get one from [app.memwyre.tech/settings](https://app.memwyre.tech/settings))
2. Validate it against the Memwyre API
3. Save it to `~/.muse-memwyre/credentials.json`

> **CI / Self-Hosted**: If Muse doesn't clear the env (e.g., in CI), you can still use `export MEMWYRE_API_KEY="bv_sk_..."` as a fallback.

### Step 2 (Optional): Override API URL

If you're using a self-hosted Memwyre instance:

```bash
node ~/.muse/plugins/memwyre/scripts/login.js --api-url https://your-instance.example.com
```

---

## How It Works

| Hook | Trigger | Action |
|------|---------|--------|
| `SessionStart` | Muse Code session opens | Fetches past project memories from Memwyre → injects as `<memwyre-context>` into system prompt |
| `Stop` | Agent turn ends / session closes | Reads `session.jsonl` transcript → POSTs to Memwyre for async memory extraction |

### Data Flow

```
Muse Code session starts
    ↓
SessionStart hook fires
    ↓ stdin: { hookEventName, sessionId, cwd, ... }
inject-memory.js
    → reads ~/.muse-memwyre/credentials.json
    → GET /api/v1/plugin/context?project=<name>&source=muse
    → stdout: { hookSpecificOutput: { additionalContext: "<memwyre-context>...</memwyre-context>" } }
    ↓
Muse prepends context to system prompt
    ↓
[... your Muse Code session ...]
    ↓
Stop hook fires
    ↓ stdin: { hookEventName, sessionId, cwd, transcriptPath, ... }
capture-session.js
    → reads ~/.muse-memwyre/credentials.json
    → parses transcriptPath session.jsonl
      (fallback: scans ~/.local/share/muse/sessions/YYYY/MM/DD/*/session.jsonl)
    → POST /api/v1/plugin/capture { source: "muse", ... }
    → stdout: { continue: true }
```

---

## Skills (Slash Commands)

Use these inside a Muse session:

| Command | Action |
|---------|--------|
| `/memwyre:index` | Indexes current codebase architecture into Memwyre vault |
| `/memwyre:status` | Shows auth status, project tag, and memory count |
| `/memwyre:logout` | Clears stored credentials from `~/.muse-memwyre/credentials.json` |

---

## MCP Tools

When Muse connects to the Memwyre MCP server (configured in `mcp.json`), you have access to:

| Tool | Description |
|------|-------------|
| `search_memwyre` | Semantic search across your memory vault |
| `save_memory` | Save a new memory to your Inbox |
| `list_memories` | Browse recent memories |
| `get_inbox` | Review pending memories |
| `update_memory` | Edit an existing memory |
| `delete_memory` | Remove a memory permanently |

---

## Plugin Structure

```
muse-plugin/
├── package.json
├── README.md
└── plugin/
    ├── plugin.json          ← Muse Code plugin manifest
    ├── mcp.json             ← MCP server config (server.memwyre.tech/mcp)
    ├── hooks/
    │   └── hooks.json       ← SessionStart + Stop lifecycle hook config
    ├── scripts/
    │   ├── inject-memory.js ← SessionStart handler (zero deps, file-based auth)
    │   ├── capture-session.js ← Stop handler (zero deps, file-based auth)
    │   └── login.js         ← First-run credential bootstrap
    └── skills/
        └── memwyre/
            └── SKILL.md     ← /memwyre:index, :status, :logout commands
```

---

## License

[Apache-2.0](LICENSE)
