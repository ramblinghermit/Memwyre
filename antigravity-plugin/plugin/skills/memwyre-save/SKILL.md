---
name: memwyre-save
description: Save architectural decisions, project conventions, coding patterns, or user preferences to your persistent Memwyre Vault. Use when the user asks to remember something or when a permanent architectural rule or pattern is finalized.
---

# Memwyre Save Skill

Persist important architectural facts, conventions, patterns, or user preferences to your Memwyre Vault so they are permanently remembered across all future Antigravity sessions and other AI tools.

## Instructions

1. Identify the atomic fact, decision, or convention to persist:
   - Make it self-contained, descriptive, and actionable.
   - Example: *"Config validation in backend/app/core/config.py strictly requires pydantic-settings v2 syntax."*
   - Example: *"All API responses must include request ID in X-Request-ID header."*
2. Check for sensitive data (API keys, secrets, passwords) and redact them before saving.
3. Save the memory:
   - If the `memwyre_save` MCP tool is available, invoke it with:
     - `text`: the concise atomic insight
     - `tags`: relevant categories (e.g., `["architecture", "backend", "conventions"]`)
     - `project`: current workspace or project name
   - Alternatively, if tool call is unavailable, execute the CLI script:
     ```bash
     node scripts/mcp-server.js --save "Your memory text here" --tags "architecture,backend"
     ```
4. Confirm to the user that the memory was saved to their Memwyre Inbox or Vault.
