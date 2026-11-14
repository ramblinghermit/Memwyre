/**
 * Memwyre x Antigravity - PreToolUse Lifecycle Hook
 * ===================================================
 * Fired before any tool executes.
 * Auto-approves read-only Memwyre MCP tools (search, context, status) so that
 * memory retrieval is seamless and zero-friction, without interrupting the user
 * with repetitive confirmation dialogs.
 *
 * Write tools (memwyre_save) still require user confirmation.
 *
 * Conforms to both Antigravity's `{ decision: 'allow' }` and Claude Code's
 * `{ hookSpecificOutput: { permissionDecision: 'allow' } }`.
 */

'use strict';

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    let resolved = false;

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({});
      }
    }, 1500);

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

const READ_ONLY_TOOLS = new Set([
  'memwyre_search',
  'memwyre_context',
  'memwyre_status',
  'search_memory',
  'listMemories',
  'getMemory',
  'whoAmI',
]);

const WRITE_TOOLS = new Set([
  'memwyre_save',
  'add_memory',
  'save_memory',
  'delete_memory',
]);

async function main() {
  const input = await readStdin();

  // Extract tool name from Antigravity toolCall or Claude Code tool_name
  const toolName = (input.toolCall && input.toolCall.name) || input.tool_name || '';

  // Normalize tool name by stripping all MCP and plugin prefixes
  const cleanName = toolName
    .replace(/^mcp__(?:plugin_memwyre_|claude_ai_)?(?:memwyre__)?/, '')
    .replace(/^memwyre_memwyre_/, 'memwyre_')
    .replace(/^memwyre_/, '');

  const hasReadOnly = READ_ONLY_TOOLS.has(cleanName) ||
                      READ_ONLY_TOOLS.has(`memwyre_${cleanName}`) ||
                      READ_ONLY_TOOLS.has(toolName);

  const hasWrite = WRITE_TOOLS.has(cleanName) ||
                   WRITE_TOOLS.has(`memwyre_${cleanName}`) ||
                   WRITE_TOOLS.has(toolName);

  if (hasReadOnly) {
    // Auto-approve read-only retrieval
    const output = {
      decision: 'allow',
      reason: `Memwyre memory retrieval (${toolName}) is auto-approved for read-only access.`,
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'allow',
        permissionDecisionReason: 'Memwyre read-only memory retrieval runs automatically.',
      },
    };
    process.stdout.write(JSON.stringify(output));
    process.exit(0);
  }

  if (hasWrite) {
    // Keep user confirmation for state mutations
    const output = {
      decision: 'ask',
      reason: `Memwyre memory save (${toolName}) requires confirmation to store permanently.`,
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'ask',
      },
    };
    process.stdout.write(JSON.stringify(output));
    process.exit(0);
  }

  // Pass-through for non-memwyre tools
  process.stdout.write(JSON.stringify({ decision: 'allow', continue: true }));
  process.exit(0);
}

main().catch(() => {
  process.stdout.write(JSON.stringify({ decision: 'allow', continue: true }));
  process.exit(0);
});
