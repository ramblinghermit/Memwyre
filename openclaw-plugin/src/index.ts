/**
 * Memwyre Plugin for OpenClaw
 * Provides persistent memory and continuous session context lifecycle hooks.
 *
 * Hooks:
 *   - session/start: Auto-fetches past project memories at session startup.
 *   - session/end:   Auto-captures session transcripts when session finishes.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

// ---------------------------------------------------------------------------
// Plugin Definition
// ---------------------------------------------------------------------------

const memwyrePlugin = {
    id: "openclaw-plugin",
    name: "Memwyre",
    description: "Persistent memory and automated context lifecycle hooks for OpenClaw, powered by Memwyre.",
    configSchema: {
        type: "object",
        properties: {
            apiKey: {
                type: "string",
                description: "Your Memwyre API Key (starts with bv_sk_)",
            },
            hostUrl: {
                type: "string",
                description: "Memwyre server URL",
                default: "https://api.memwyre.tech",
            },
        },
        required: ["apiKey"],
        additionalProperties: false,
    },

    register(api: OpenClawPluginApi) {
        const config = (api.pluginConfig || {}) as { apiKey?: string; hostUrl?: string };
        const hostUrl = (config.hostUrl || process.env.MEMWYRE_API_URL || "https://api.memwyre.tech").replace(/\/$/, "");
        const apiKey = config.apiKey || process.env.MEMWYRE_API_KEY || "";

        const cwd = process.cwd();
        const projectName = cwd.split(/[/\\]/).pop() || "default";

        // Helper: Find and parse latest session .jsonl from OpenClaw session store
        const getLatestSessionMessages = (): any[] => {
            try {
                const homedir = os.homedir();
                const sessionsDir = path.join(homedir, ".openclaw", "agents", "main", "sessions");
                if (!existsSync(sessionsDir)) return [];
                
                const files = readdirSync(sessionsDir)
                    .filter(f => f.endsWith(".jsonl"))
                    .map(f => ({ file: f, mtime: statSync(path.join(sessionsDir, f)).mtimeMs }))
                    .sort((a, b) => b.mtime - a.mtime);
                
                if (files.length === 0) return [];
                
                const latestFile = path.join(sessionsDir, files[0].file);
                const content = readFileSync(latestFile, "utf8");
                const lines = content.split("\n").filter(l => l.trim().length > 0);
                const messages = [];
                for (const line of lines) {
                    try {
                        messages.push(JSON.parse(line));
                    } catch {}
                }
                return messages;
            } catch {
                return [];
            }
        };

        // -----------------------------------------------------------------------
        // Lifecycle Hook: Session Start (Context Injection)
        // -----------------------------------------------------------------------
        const injectContext = async () => {
            if (!apiKey) return;
            try {
                const res = await fetch(
                    `${hostUrl}/api/v1/plugin/context?project=${encodeURIComponent(projectName)}`,
                    {
                        headers: { Authorization: `Bearer ${apiKey}` },
                        signal: AbortSignal.timeout(5000),
                    }
                );
                if (res.ok) {
                    const data = (await res.json()) as { memories?: Array<{ content: string }> };
                    const memories = data.memories || [];
                    if (memories.length > 0) {
                        const contextBlock = memories.map(m => `- ${m.content}`).join("\n");
                        api.logger.info(`[Memwyre] Loaded ${memories.length} memories for '${projectName}':\n${contextBlock}`);
                    }
                }
            } catch (err) {
                api.logger.warn(`[Memwyre] Failed to fetch session context: ${err}`);
            }
        };

        // -----------------------------------------------------------------------
        // Lifecycle Hook: Session End (Transcript Capture)
        // -----------------------------------------------------------------------
        const captureSession = async (event?: any) => {
            if (!apiKey) return;

            let transcript: any[] = event?.messages || event?.transcript || event?.session?.messages || event?.payload?.messages || event?.history || [];
            
            // Try event.sessionFile
            if ((!Array.isArray(transcript) || transcript.length === 0) && event?.sessionFile && existsSync(event.sessionFile)) {
                try {
                    const content = readFileSync(event.sessionFile, "utf8");
                    transcript = content.split("\n").filter(l => l.trim().length > 0).map(l => JSON.parse(l));
                } catch {}
            }

            // Fallback: Read latest session .jsonl from OpenClaw's session store
            if (!Array.isArray(transcript) || transcript.length === 0) {
                transcript = getLatestSessionMessages();
            }

            if (!Array.isArray(transcript) || transcript.length === 0) {
                api.logger.info(`[Memwyre] Session end trigger, but no transcript found.`);
                return;
            }

            try {
                await fetch(`${hostUrl}/api/v1/plugin/capture`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        session_id: event?.sessionId || event?.session_id || `openclaw_${Date.now()}`,
                        project_name: projectName,
                        cwd: cwd,
                        transcript,
                    }),
                    signal: AbortSignal.timeout(5000),
                });
                api.logger.info(`[Memwyre] Captured session transcript (${transcript.length} items) for workspace '${projectName}'`);
            } catch (err) {
                api.logger.warn(`[Memwyre] Failed to capture session: ${err}`);
            }
        };

        // Trigger context fetch on registration
        injectContext();

        // Process exit capture trigger
        process.on("exit", () => captureSession());

        // Register lifecycle event hooks
        const hookHandler = async (event: any) => {
            const eventType = String(event?.type || event?.event || "");
            const eventAction = String(event?.action || "");

            if ((eventType === "session" && eventAction === "start") || eventType.includes("start") || eventType.includes("created") || eventType.includes("before")) {
                await injectContext();
            }
            if ((eventType === "session" && (eventAction === "end" || eventAction === "idle")) || eventType.includes("end") || eventType.includes("idle") || eventType.includes("finish") || eventType.includes("complete")) {
                await captureSession(event);
            }
        };

        if (typeof (api as any).on === "function") {
            (api as any).on("session", hookHandler);
            (api as any).on("before_prompt_build", injectContext);
            (api as any).on("agent_end", captureSession);
            (api as any).on("session_end", captureSession);
            (api as any).on("turn_end", captureSession);
        } else if (typeof (api as any).registerHook === "function") {
            (api as any).registerHook("session", hookHandler);
            (api as any).registerHook("before_prompt_build", injectContext);
            (api as any).registerHook("agent_end", captureSession);
            (api as any).registerHook("session_end", captureSession);
        }

        api.logger.info(`[Memwyre] plugin v${pluginVersion} initialised for workspace '${projectName}' (host: ${hostUrl})`);
    },
};

// Version helper
let pluginVersion = "unknown";
try {
    const pkg = JSON.parse(
        readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    );
    pluginVersion = pkg.version || "unknown";
} catch {
    // silently ignore — version string is informational only
}

export default memwyrePlugin;
