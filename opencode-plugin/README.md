# Memwyre OpenCode Plugin

Automated persistent memory and session capture for **OpenCode**, powered by **Memwyre**.

## Overview

The Memwyre OpenCode plugin follows a simple **Lifecycle Hook Architecture** matching the Claude Code & OpenClaw plugin methodology:

1. **Session Start (`session.created`)**: Automatically fetches and injects project-scoped memories for your workspace (`/api/v1/plugin/context`).
2. **Session Idle/End (`session.idle`)**: Automatically captures and uploads session transcripts for processing (`/api/v1/plugin/capture`).

## Configuration

To activate this plugin in OpenCode, add it to your OpenCode configuration (`.opencode/plugins/memwyre.js` or `opencode.config.js`):

```javascript
import { MemwyrePlugin } from "@memwyre/opencode-plugin";

export default MemwyrePlugin;
```

### Environment Variables

Ensure `MEMWYRE_API_KEY` is set in your environment:

```bash
export MEMWYRE_API_KEY="bv_sk_your_api_key_here"
export MEMWYRE_API_URL="https://server.memwyre.tech" # Optional, defaults to production
```
