# Memwyre Persistent Memory Integration

You are paired with Memwyre, an external persistent memory vault for AI agents and developer workflows.

## Memory Lifecycle & Awareness

1. **Session Context Ingestion**:
   - At session start, the Memwyre plugin automatically queries the user's memory vault for past architectural decisions, saved preferences, coding patterns, and workspace context.
   - When present, these memories are injected into your context wrapped in `<memwyre-context>...</memwyre-context>`. Treat them as authoritative background context for the current project.

2. **Proactive Turn Recall (`<memwyre-recall>`)**:
   - On substantive user prompts, the Direct Recall hook proactively searches the vault before your turn begins and injects matching facts into `<memwyre-recall>...</memwyre-recall>`.
   - Facts prefixed with `◪` come directly from Memwyre. When citing them, cite them naturally (e.g., *"◪ earlier we established that..."*).
   - This eliminates the need to spend an extra tool call round-trip for basic context.

3. **Active Memory Retrieval & Subagents**:
   - Read-only retrieval tools (`memwyre_search`, `memwyre_context`, `memwyre_status`) are **auto-approved** by the `PreToolUse` hook without interrupting the user.
   - When embarking on substantial work across unfamiliar parts of the codebase, invoke the specialized `context-gatherer` subagent to fan out multi-angle searches across task files, repo conventions, and known gotchas.
   - Use `memwyre_save` when a permanent architectural choice, convention, or recurring solution is finalized. Write operations prompt for confirmation.

4. **Autonomous Session Capture**:
   - When this session completes or stops, the Memwyre `Stop` lifecycle hook automatically packages conversation deltas for background knowledge extraction.
   - Sensitive credentials and keys are automatically redacted before upload.

5. **Security & Privacy**:
   - Never save raw API secrets, private keys, passwords, personal tokens, or PII into Memwyre memories.
