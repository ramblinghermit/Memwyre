---
name: memwyre-search
description: Search your persistent Memwyre Vault for past architecture decisions, conventions, prior conversations, and saved notes across projects. Use when the user asks what was decided before or needs historical project context.
---

# Memwyre Search Skill

Retrieve relevant memories, decisions, and knowledge stored in your Memwyre Vault.

## Instructions

1. Formulate a semantic search query based on what the user is asking.
   - Example query: *"database migration procedure"* or *"JWT auth middleware design"* or *"deployment domain configuration"*.
2. Execute the search:
   - If the `memwyre_search` MCP tool is available, invoke:
     - `query`: your semantic search query
     - `project`: (optional) workspace name to narrow the scope, or omit to search across all workspaces
   - Alternatively, execute the CLI script:
     ```bash
     node scripts/mcp-server.js --search "your query here"
     ```
3. Synthesize the returned memories:
   - Present the key findings clearly to the user.
   - If multiple relevant records exist, organize them chronologically or by topic.
