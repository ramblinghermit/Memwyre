import { MemwyreClient } from './client.js';

export interface ToolDefinition<TArgs = any, TResult = any> {
  name: string;
  description: string;
  parameters: Record<
    string,
    {
      type: string;
      required?: boolean;
      description?: string;
      enum?: string[];
    }
  >;
  output?: {
    schema?: Record<string, unknown>;
    render?: (args: TArgs, value: TResult) => Array<{ type: 'text'; text: string }>;
  };
  execute: (args: TArgs) => Promise<TResult>;
}

/**
 * Factory for creating all Memwyre DSH tools configured with the active client
 */
export function createMemwyreTools(
  client: MemwyreClient,
  getCurrentProject: () => string
): ToolDefinition[] {
  // 1. Semantic Search Tool
  const searchTool: ToolDefinition<{ query: string; project?: string }, string> = {
    name: 'memwyre_search',
    description:
      'Search your persistent Memwyre Vault for past project decisions, architecture notes, personal conventions, and saved code context.',
    parameters: {
      query: {
        type: 'string',
        required: true,
        description: 'Semantic query (e.g. "auth token architecture", "database migration conventions", "deployment setup")',
      },
      project: {
        type: 'string',
        required: false,
        description: 'Optional project name or workspace name to constrain results to (defaults to current project)',
      },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: String(value) }],
    },
    async execute(args) {
      const targetProject = args.project || getCurrentProject();
      return await client.searchMemories(args.query, targetProject);
    },
  };

  // 2. Save Memory Tool
  const saveTool: ToolDefinition<{ text: string; tags?: string | string[]; project?: string }, string> = {
    name: 'memwyre_save',
    description:
      'Save an important insight, architectural decision, code pattern, or preference to your Memwyre Vault so it persists across all agent sessions.',
    parameters: {
      text: {
        type: 'string',
        required: true,
        description: 'The memory or knowledge snippet to remember.',
      },
      tags: {
        type: 'string',
        required: false,
        description: 'Comma-separated list of tags (e.g. "auth, architectural-decision, backend")',
      },
      project: {
        type: 'string',
        required: false,
        description: 'Workspace or project name (defaults to current project).',
      },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: String(value) }],
    },
    async execute(args) {
      let tagsArray: string[] | undefined;
      if (typeof args.tags === 'string') {
        tagsArray = args.tags.split(',').map((t) => t.trim());
      } else if (Array.isArray(args.tags)) {
        tagsArray = args.tags.map((t) => String(t).trim());
      }
      const targetProject = args.project || getCurrentProject();
      return await client.saveMemory(args.text, tagsArray, targetProject);
    },
  };

  // 3. Project Context Tool
  const contextTool: ToolDefinition<{ project?: string }, string> = {
    name: 'memwyre_context',
    description:
      'Retrieve past project memories and context registered for the current codebase from Memwyre.',
    parameters: {
      project: {
        type: 'string',
        required: false,
        description: 'The project name to fetch context for (defaults to active project directory name).',
      },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: String(value) }],
    },
    async execute(args) {
      const targetProject = args.project || getCurrentProject();
      const res = await client.getProjectContext(targetProject);
      if (res.memories.length === 0) {
        return `No past memories found for project "${targetProject}". Interactions will be captured automatically.`;
      }
      return `Past Memories for "${targetProject}":\n` +
        res.memories.map((m) => `- ${m.content}`).join('\n');
    },
  };

  // 4. Status Tool
  const statusTool: ToolDefinition<Record<string, unknown>, string> = {
    name: 'memwyre_status',
    description: 'Check Memwyre connection status, authenticated account, and active project vault.',
    parameters: {},
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: String(value) }],
    },
    async execute() {
      if (!client.isAuthenticated) {
        return 'Memwyre: Not authenticated. Set MEMWYRE_API_KEY or run "node scripts/login.js" to authenticate.';
      }
      const val = await client.validateKey();
      if (!val.ok) {
        return `Memwyre: API Key validation failed: ${val.error}`;
      }
      const project = getCurrentProject();
      return `Memwyre Connected!\n- User: ${val.email || val.username}\n- API: ${client.apiUrl}\n- Active Project: ${project}`;
    },
  };

  return [searchTool, saveTool, contextTool, statusTool];
}
