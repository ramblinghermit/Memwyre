# Antigravity × Memwyre Plugin

<p align="center">
  <img src="plugin/assets/logo.svg" alt="Memwyre Logo" width="120" />
</p>

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="license" /></a>
  <img src="https://img.shields.io/badge/antigravity-plugin-4285F4?style=flat-square&logo=google" alt="antigravity plugin" />
  <img src="https://img.shields.io/badge/memwyre-v2.0-7C3AED?style=flat-square" alt="memwyre" />
</p>

Persistent shared memory and automated session lifecycle hooks for **Google Antigravity** (IDE, CLI, and Agent 2.0), powered by **Memwyre**.

---

## Features

- 🧠 **`SessionStart` Context Injection**: Automatically queries your Memwyre Vault for past architecture decisions, project conventions, and saved code patterns when starting an Antigravity conversation, prepending them into the agent's context.
- 💾 **`Stop` Session Capture**: When an Antigravity execution loop finishes, the plugin extracts conversation steps and uploads them to Memwyre for asynchronous factual extraction and knowledge refinement.
- 🔌 **Built-in MCP Server**: Exposes `memwyre_search`, `memwyre_save`, `memwyre_context`, and `memwyre_status` tools directly over stdio JSON-RPC 2.0 with zero external npm dependencies.
- 🛠️ **On-Demand Skills**:
  - `memwyre-save`: Save permanent architectural decisions, user preferences, and conventions.
  - `memwyre-search`: Query past cross-session knowledge and architectural decisions.
  - `memwyre-status`: Verify API connectivity, active user account, and stored credentials.
- 📜 **Active Rules (`rules/AGENTS.md`)**: Automatically guides the agent pair-programmer to respect established patterns, recall historical decisions, and prevent storing secrets or tokens.
- ⚡ **Zero External Dependencies**: Pure Node.js standard libraries (`http`, `https`, `readline`, `fs`, `path`). Works immediately across Windows, macOS, and Linux.

---

## Directory Structure

```text
antigravity-plugin/
├── package.json
├── README.md
└── plugin/
    ├── plugin.json         # Manifest (name, displayName, suggestedPrompts, logo)
    ├── mcp_config.json     # MCP server definition (stdio)
    ├── hooks.json          # Antigravity lifecycle hooks (SessionStart, Stop)
    ├── assets/
    │   └── logo.svg        # 128x128 square high-contrast logo
    ├── rules/
    │   └── AGENTS.md       # Always-on guidelines when plugin is enabled
    ├── skills/
    │   ├── memwyre-save/SKILL.md
    │   ├── memwyre-search/SKILL.md
    │   └── memwyre-status/SKILL.md
    └── scripts/
        ├── inject-memory.js    # SessionStart context injection hook
        ├── capture-session.js  # Stop session transcript capture hook
        ├── mcp-server.js       # Zero-dependency MCP stdio server
        ├── login.js            # Authentication and credential management
        └── workspace.js        # Deterministic project/workspace resolver
```

---

## Installation

### Option 1: Global User Install (Recommended)

Install the plugin bundle into your Antigravity global configuration directory:

#### On Windows (PowerShell):
```powershell
# Create plugin directory in ~/.gemini/config/plugins
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\config\plugins\memwyre"

# Copy plugin contents
Copy-Item -Recurse -Force "antigravity-plugin\plugin\*" "$env:USERPROFILE\.gemini\config\plugins\memwyre\"
```

#### On macOS / Linux:
```bash
mkdir -p ~/.gemini/config/plugins/memwyre
cp -r antigravity-plugin/plugin/* ~/.gemini/config/plugins/memwyre/
```

### Option 2: Workspace-Level Install

To enable the plugin exclusively for your repository:

```bash
mkdir -p .agents/plugins/memwyre
cp -r antigravity-plugin/plugin/* .agents/plugins/memwyre/
```

---

## Authentication & Setup

Run the one-time authentication script to link your Memwyre Vault:

```bash
node antigravity-plugin/plugin/scripts/login.js --api-key "bv_sk_your_api_key_here"
```

> **API Key**: Retrieve your personal API key from your [Memwyre Dashboard](https://memwyre.tech/login) (or settings page).

### Verification

Check that your credentials and server connection are active:

```bash
node antigravity-plugin/plugin/scripts/login.js --test
```

Output:
```
=== Memwyre x Antigravity Authentication ===

Testing credentials from: ~/.antigravity-memwyre/credentials.json
API URL: https://api.memwyre.tech
Key Prefix: bv_sk_...

[SUCCESS] Connected to Memwyre Vault!
Account Email: user@example.com
```

---

## How It Works

```
Antigravity Session Opens
         ↓
SessionStart Lifecycle Hook
         ↓ (stdin: conversationId, workspacePaths, transcriptPath)
scripts/inject-memory.js
         → GET /api/v1/plugin/context?project=<workspace>
         → stdout: { injectSteps: [ { systemMessage: { systemMessage: "<memwyre-context>..." } } ] }
         ↓
Agent reasons with project memory & constraints
         ↓
During session:
  - Agent can call `memwyre_search` to query past decisions
  - Agent can call `memwyre_save` to persist new architecture rules
         ↓
Agent Turn / Session Finishes
         ↓
Stop Lifecycle Hook
         ↓ (stdin: conversationId, transcriptPath, terminationReason)
scripts/capture-session.js
         → Parses transcript.jsonl
         → POST /api/v1/plugin/capture
         → Background Celery worker extracts atomic memories & facts
         ↓
Stdout: {} (Execution safely terminates)
```

---

## Available Tools & Commands

### MCP Tools

| Tool | Parameters | Description |
|------|------------|-------------|
| `memwyre_search` | `query` (str, req), `project` (str, opt) | Semantically search your Memwyre Vault for past design choices, rules, and code snippets. |
| `memwyre_save` | `text` (str, req), `tags` (str, opt), `project` (str, opt) | Save an atomic architectural pattern or convention to your Vault. |
| `memwyre_context` | `project` (str, opt) | Retrieve all active memories linked to a specific workspace directory. |
| `memwyre_status` | *(none)* | Check connection health and authenticated user email. |

### CLI Commands

You can also run memory operations directly from the terminal:

```bash
# Search vault
node scripts/mcp-server.js --search "JWT authentication architecture"

# Save a memory
node scripts/mcp-server.js --save "Always run migrations using alembic upgrade head before starting server" --tags "db,backend"

# Check connection status
node scripts/mcp-server.js --status
```

---

## License

Apache-2.0 License. See the main repository [LICENSE](../LICENSE) file.
