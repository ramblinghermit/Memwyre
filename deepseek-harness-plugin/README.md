# DeepSeek Harness × Memwyre Plugin

<p align="center">
  <a href="https://www.npmjs.com/package/@memwyre/dsh-plugin"><img src="https://img.shields.io/npm/v/@memwyre/dsh-plugin?style=flat-square&color=ff4d4d&label=npm" alt="npm version" /></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="license" /></a>
  <img src="https://img.shields.io/badge/deepseek_harness-plugin-0064FF?style=flat-square" alt="deepseek harness plugin" />
</p>

Seamless persistent memory, contextual retrieval, and automated session lifecycle hooks for **DeepSeek Harness** (`dsh`), powered by **Memwyre**.

---

## Features

- 🧠 **Contextual Injection (`turn/start`)**: Automatically queries Memwyre for past architectural decisions, patterns, and conventions relevant to the active project, prepending them into the agent prompt.
- 💾 **Automated Session Capture (`turn/end`)**: Automatically captures agent session transcripts upon turn completion, sending them to Memwyre for background signal and fact extraction without blocking the agent.
- 🛠️ **Native DSH Tools**: Exposes `memwyre_search`, `memwyre_save`, `memwyre_context`, and `memwyre_status` tools directly into the Cordis tool registry.
- 🔌 **Cordis Service Provider**: Registers `ctx.memwyre` on the shared Cordis context so other plugins can access the Memwyre client programmatically.
- 🔄 **Revertible & Hot-Reload Safe**: Implemented with native Cordis effects (`ctx.effect`) to ensure clean disposal without ghost tools or memory leaks.
- 🔑 **Multi-Tier Credential Resolution**: Reads credentials from `cordis.yml` config, environment variables (`MEMWYRE_API_KEY`), or local credential store (`~/.dsh-memwyre/credentials.json`).
- ⚡ **Zero Dependencies**: Pure modern Node.js and TypeScript. No heavy runtime dependencies.

---

## Architecture

```
DeepSeek Harness Runtime (Cordis Context)
   │
   ├── Core Services: tools, session, agent
   │
   └── @memwyre/dsh-plugin
         │
         ├── 1. Context Extension: ctx.memwyre
         │
         ├── 2. Native Tools:
         │      ├── memwyre_search   (Semantic retrieval)
         │      ├── memwyre_save     (Save decision / fact)
         │      ├── memwyre_context  (Project workspace context)
         │      └── memwyre_status   (Connection & account status)
         │
         ├── 3. Lifecycle Hooks:
         │      ├── turn/start ──► GET /api/v1/plugin/context (Inject memories)
         │      └── turn/end   ──► POST /api/v1/plugin/capture (Background sync)
         │
         └── 4. MCP Server:
                └── https://server.memwyre.tech/mcp
```

---

## Installation

### Option A — Install from npm

Inside your DeepSeek Harness environment:

```bash
pnpm add @memwyre/dsh-plugin
```

### Option B — Local Workspace / Monorepo

If running from the DeepSeek Harness monorepo or a local directory:

```bash
# Link or install local package
pnpm add file:/path/to/deepseek-harness-plugin
```

---

## Configuration

### 1. Mounting in `cordis.yml` / `cordis.patch.yml`

Add `@memwyre/dsh-plugin` to your DeepSeek Harness configuration:

```yaml
plugins:
  # LLM Adapter & Core plugins
  - name: "@deepseek-ai/dsh-model-openai"
    config:
      apiKey: "${DEEPSEEK_API_KEY}"
  - name: "@deepseek-ai/dsh-tools"
  - name: "@deepseek-ai/dsh-agent"

  # Memwyre Persistent Memory Plugin
  - name: "@memwyre/dsh-plugin"
    config:
      # Optional if configured via environment or login script
      apiKey: "${MEMWYRE_API_KEY}"
      apiUrl: "https://api.memwyre.tech"
      
      # Automated context injection on turn/start (default: true)
      autoInject: true
      
      # Automated transcript extraction on turn/end (default: true)
      autoCapture: true
```

### 2. Authenticating

You can authenticate in any of the following ways:

#### Method 1: Interactive Login Script (Recommended)

Run the credential bootstrap script:

```bash
node scripts/login.js
```

This will:
1. Prompt for your Memwyre API key (`bv_sk_...` from [app.memwyre.tech/settings](https://app.memwyre.tech/settings))
2. Validate the key against the Memwyre API
3. Save it to `~/.dsh-memwyre/credentials.json`

Verify credentials anytime with:

```bash
node scripts/login.js --test
```

#### Method 2: Environment Variable

```bash
export MEMWYRE_API_KEY="bv_sk_your_api_key_here"
```

#### Method 3: `cordis.yml` Config

Pass `apiKey` directly in the plugin config block in `cordis.yml`.

---

## Agent Tools

When mounted, DeepSeek Harness gains the following tools:

| Tool | Parameters | Description |
|---|---|---|
| `memwyre_search` | `query` (string, required)<br>`project` (string, optional) | Performs semantic search across your Memwyre Vault for architecture patterns, past decisions, and saved context. |
| `memwyre_save` | `text` (string, required)<br>`tags` (string, optional)<br>`project` (string, optional) | Explicitly saves an architectural decision, fact, or convention to your Memwyre Vault so it persists across sessions. |
| `memwyre_context` | `project` (string, optional) | Fetches the latest memories registered for the current project codebase. |
| `memwyre_status` | *(none)* | Checks connectivity, account identity, and active project name. |

---

## Programmatic Usage (Cordis Service)

Any other Cordis plugin in DeepSeek Harness can access the `memwyre` service directly:

```typescript
import type { Context } from '@deepseek-ai/cordis';

export const name = 'my-custom-plugin';
export const inject = ['memwyre'];

export function apply(ctx: Context) {
  // Query Memwyre via the service
  const memwyre = ctx.memwyre;
  
  ctx.on('my-custom-event', async () => {
    const results = await memwyre.client.searchMemories('auth conventions');
    ctx.logger.info(`Memories: ${results}`);
  });
}
```

---

## Model Context Protocol (MCP)

Memwyre also provides a streamable HTTP MCP server:

```
https://server.memwyre.tech/mcp
```

If your DeepSeek Harness deployment uses an MCP bridge plugin, you can reference `plugin/mcp.json` to mount the full MCP tool suite.

---

## Repository Layout

```
deepseek-harness-plugin/
├── cordis.example.yml    # Example DeepSeek Harness configuration
├── package.json          # Package manifest (@memwyre/dsh-plugin)
├── tsconfig.json         # TypeScript configuration
├── README.md             # This guide
├── plugin/
│   └── mcp.json          # MCP server configuration
├── scripts/
│   └── login.js          # Interactive credential bootstrap script
└── src/
    ├── index.ts          # Cordis plugin entrypoint & lifecycle hooks
    ├── client.ts         # Memwyre REST API client
    ├── credentials.ts    # Multi-tier credential resolver
    └── tools.ts          # DSH tool definitions
```

---

## License

[Apache-2.0](LICENSE)
