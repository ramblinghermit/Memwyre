import * as path from 'path';
import { resolveCredentials, MemwyrePluginConfig } from './credentials.js';
import { MemwyreClient } from './client.js';
import { createMemwyreTools } from './tools.js';

// Minimal Cordis Context typings for standalone compilation
export interface CordisContext {
  tools?: {
    register: (tool: unknown) => void;
  };
  logger: {
    info: (msg: string, ...args: unknown[]) => void;
    warn: (msg: string, ...args: unknown[]) => void;
    error: (msg: string, ...args: unknown[]) => void;
    debug?: (msg: string, ...args: unknown[]) => void;
  };
  on: (event: string, callback: (...args: any[]) => any) => () => void;
  effect: (fn: () => void | (() => void)) => void;
  [key: string]: unknown;
}

export const name = '@memwyre/dsh-plugin';

// Declare dependencies for Cordis: we require the 'tools' service
export const inject = ['tools'];

// Provide service name so other plugins can access ctx.memwyre
export const provide = ['memwyre'];

export function apply(ctx: CordisContext, config: MemwyrePluginConfig = {}) {
  const credentials = resolveCredentials(config);
  const client = new MemwyreClient(credentials);
  const logger = ctx.logger;

  const autoInject = config.autoInject ?? true;
  const autoCapture = config.autoCapture ?? true;

  // Determine active project name
  const getCurrentProject = (): string => {
    try {
      const cwd = process.cwd();
      return path.basename(cwd) || 'default';
    } catch {
      return 'default';
    }
  };

  // Expose memwyre service on the Cordis Context
  (ctx as Record<string, unknown>).memwyre = {
    client,
    credentials,
    getCurrentProject,
  };

  // 1. Register DSH Tools
  if (ctx.tools && typeof ctx.tools.register === 'function') {
    const tools = createMemwyreTools(client, getCurrentProject);
    for (const tool of tools) {
      try {
        ctx.tools.register(tool);
        logger.info(`[Memwyre] Registered tool: ${tool.name}`);
      } catch (err: unknown) {
        logger.warn(`[Memwyre] Could not register tool ${tool.name}: ${err}`);
      }
    }
  } else {
    logger.warn('[Memwyre] "tools" service not found on context, skipping tool registration.');
  }

  // 2. Automated Context Injection on Session/Turn Start
  if (autoInject && client.isAuthenticated) {
    ctx.effect(() => {
      // Listen to turn/start or session/start if supported by DSH runtime
      const unhookTurn = ctx.on('turn/start', async (session: any) => {
        try {
          const project = getCurrentProject();
          const { memories } = await client.getProjectContext(project);

          if (memories && memories.length > 0) {
            const memoryBlock = [
              '<memwyre-context>',
              `## Past Memories — ${project}`,
              ...memories.map((m) => `- ${m.content}`),
              '</memwyre-context>',
            ].join('\n');

            // Inject into session if supported
            if (session && typeof session.prependSystemContext === 'function') {
              session.prependSystemContext(memoryBlock);
            } else if (session && Array.isArray(session.messages)) {
              session.messages.unshift({
                role: 'system',
                content: memoryBlock,
              });
            }
            logger.info(`[Memwyre] Injected ${memories.length} past memories for project "${project}".`);
          }
        } catch (err: unknown) {
          logger.warn(`[Memwyre] Failed to inject past context: ${err}`);
        }
      });

      return () => {
        if (typeof unhookTurn === 'function') unhookTurn();
      };
    });
  }

  // 3. Automated Transcript Capture on Turn/Session End
  if (autoCapture && client.isAuthenticated) {
    ctx.effect(() => {
      const unhookEnd = ctx.on('turn/end', async (session: any) => {
        try {
          const project = getCurrentProject();
          const sessionId = session?.id || session?.sessionId || `dsh_${Date.now()}`;
          const transcript = session?.transcript || session?.messages || [];

          if (Array.isArray(transcript) && transcript.length > 0) {
            // Non-blocking fire-and-forget background extraction
            client.captureSession({
              session_id: sessionId,
              project_name: project,
              cwd: process.cwd(),
              source: 'deepseek-harness',
              transcript,
            }).catch((err) => {
              logger.debug?.(`[Memwyre] Background capture error: ${err}`);
            });
          }
        } catch (err: unknown) {
          logger.debug?.(`[Memwyre] Capture hook error: ${err}`);
        }
      });

      return () => {
        if (typeof unhookEnd === 'function') unhookEnd();
      };
    });
  }

  logger.info(`[Memwyre] Plugin initialized. (Auth: ${credentials.source}, URL: ${credentials.apiUrl})`);
}

export default {
  name,
  inject,
  provide,
  apply,
};
