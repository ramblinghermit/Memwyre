---
title: "Muse Code"
description: "Give Muse Code persistent memory across sessions. Automatically inject past project context on startup and capture session transcripts on exit via lifecycle hooks."
---

## Overview

Muse Code is Meta's terminal-based AI coding agent. By default, each Muse Code session starts with a blank slate — it has no memory of previous sessions, architectural decisions, or project conventions.

The Memwyre Muse Plugin bridges this gap:

1. **Context Injection (`SessionStart`)**: When you launch Muse Code, the plugin automatically retrieves relevant past memories matching your current project folder and injects them as start context.
2. **Session Archival (`Stop`)**: When you exit Muse Code, the plugin parses your session transcript and automatically uploads it to Memwyre, saving new insights for future sessions.
3. **MCP Tools**: The plugin connects Muse to the Memwyre MCP server, giving it in-session tools to search, save, and manage your memory vault on demand.

## Installation

The plugin uses pure Node.js built-ins for its hooks — **zero npm dependencies** and no installation bloat.

### Option A: One-Line Installer (recommended)

Run the official Memwyre interactive CLI to automatically install the plugin, configure hooks, and store credentials:

```bash
npx -y install-memwyre --muse-code
```

### Option B: Muse Plugin Marketplace

```bash
export MUSE_EXPERIMENTAL_PLUGINS=1
muse plugins marketplace add memwyre https://github.com/memwyre/muse-plugin
muse plugins install memwyre@memwyre
muse plugins approve memwyre
```

### Option C: Local Install

```bash
muse plugins install /path/to/muse-plugin --scope user
muse plugins approve memwyre
```

## Configuration

### Step 1: Set Up Credentials

> **Important:** Muse Code clears the shell environment before running hooks. `export MEMWYRE_API_KEY` will not work. You must run the one-time login script:

```bash
node ~/.muse/plugins/memwyre/scripts/login.js
```

This saves your API key to `~/.muse-memwyre/credentials.json`, where hooks can always read it regardless of the shell environment state.

Get your API key from **Settings → API Keys** in the [Memwyre web app](https://app.memwyre.tech/settings).

### Step 2 (Optional): Self-Hosted Instance

```bash
node ~/.muse/plugins/memwyre/scripts/login.js --api-url https://your-instance.example.com
```

## How the Hooks Work

The plugin registers two deterministic shell hooks in `hooks.json`:

- **`SessionStart`**: Fires when a Muse session begins. It reads the current workspace directory, fetches relevant memories from Memwyre, and injects them into the `additionalContext` of the system prompt.
- **`Stop`**: Fires when the session ends or the agent pauses. It reads the `session.jsonl` transcript (located at `~/.local/share/muse/sessions/YYYY/MM/DD/<session-uuid>/session.jsonl`) and posts it to the Memwyre extraction backend.

Both hooks are strictly non-blocking (always exit `0`) and will silently fail open if the API is unreachable, ensuring your Muse workflow is never interrupted.

## Skills (Slash Commands)

Once installed, use these commands inside your Muse session:

| Command | Action |
|---------|--------|
| `/memwyre:index` | Analyzes and indexes your codebase architecture into the vault |
| `/memwyre:status` | Shows auth status, project tag, and memory count |
| `/memwyre:logout` | Clears stored credentials |

## MCP Tools

Muse will also have direct access to these Memwyre tools via the MCP server:

| Tool | Description |
|------|-------------|
| `search_memwyre` | Semantic search across your memory vault |
| `save_memory` | Save a new memory to your Inbox |
| `list_memories` | Browse recent memories |
| `get_inbox` | Review pending memories |
| `update_memory` | Edit an existing memory |
| `delete_memory` | Remove a memory permanently |
