import axios from "axios";
import fs from "fs";
import path from "path";
import os from "os";
import { DatabaseSync } from "node:sqlite";

/**
 * Reads the latest session transcript directly from OpenCode's local SQLite database.
 */
function getLatestSessionTranscriptFromDB() {
  try {
    const homedir = os.homedir();
    const dbPath = path.join(homedir, ".local", "share", "opencode", "opencode.db");
    if (!fs.existsSync(dbPath)) return { sessionId: null, transcript: [] };

    const db = new DatabaseSync(dbPath);
    const latestSession = db.prepare(`SELECT id FROM session ORDER BY time_created DESC LIMIT 1`).get();
    if (!latestSession || !latestSession.id) return { sessionId: null, transcript: [] };

    const sessionId = latestSession.id;
    const messages = db.prepare(`SELECT id, data FROM message WHERE session_id = ? ORDER BY time_created ASC`).all(sessionId);
    
    const transcript = [];
    for (const msgRow of messages) {
      let msgData = {};
      try { msgData = JSON.parse(msgRow.data); } catch {}
      
      const role = msgData.role || "user";
      const parts = db.prepare(`SELECT data FROM part WHERE message_id = ? ORDER BY time_created ASC`).all(msgRow.id);
      let textContent = "";
      for (const partRow of parts) {
        try {
          const partData = JSON.parse(partRow.data);
          if (partData.type === "text" && partData.text) {
            textContent += partData.text + "\n";
          }
        } catch {}
      }
      
      if (textContent.trim().length > 0) {
        transcript.push({ role, content: textContent.trim() });
      }
    }
    return { sessionId, transcript };
  } catch (err) {
    console.error(`[Memwyre] DB Reader Error: ${err.message}`);
    return { sessionId: null, transcript: [] };
  }
}

/**
 * Memwyre Plugin for OpenCode
 */
export const MemwyrePlugin = async ({ directory, client }) => {
  const cwd = directory || process.cwd();
  const projectName = cwd.split(/[/\\]/).pop() || "default";
  const apiKey = process.env.MEMWYRE_API_KEY;
  const hostUrl = (process.env.MEMWYRE_API_URL || "https://api.memwyre.tech").replace(/\/$/, "");

  // Track which sessions have already been captured to prevent duplicate POSTs
  const capturedSessions = new Set();

  return {
    event: async ({ event }) => {
      if (!apiKey) return;

      const eventType = String(event?.type || event?.event || "");
      console.error(`[Memwyre Debug] OpenCode event type: '${eventType}'`);

      // 1. Session Start Hook: Auto-inject project memory context
      if (eventType.includes("create") || eventType.includes("start") || eventType.includes("init")) {
        try {
          const res = await axios.get(`${hostUrl}/api/v1/plugin/context`, {
            params: { project: projectName },
            headers: { Authorization: `Bearer ${apiKey}` },
            timeout: 5000,
          });
          const memories = res.data?.memories || [];
          if (memories.length > 0) {
            const contextBlock = memories.map(m => `- ${m.content}`).join("\n");
            console.error(`[Memwyre] Loaded ${memories.length} memories for workspace '${projectName}'`);
            return {
              context: `<memwyre-context>\n## Past Memories for ${projectName}\n\n${contextBlock}\n</memwyre-context>`
            };
          }
        } catch (e) {
          console.error(`[Memwyre] Failed to fetch context: ${e.message || e}`);
        }
      }

      // 2. Session Idle / Stop Hook: Auto-capture session transcript
      const isIdleEvent = eventType.includes("idle") || 
                          eventType.includes("end") || 
                          eventType.includes("stop") || 
                          (eventType === "session.status" && (event.status?.type === "idle" || event.status === "idle" || event.session?.status === "idle"));

      if (isIdleEvent) {
        const sessionId = event.sessionId || event.session?.id || event.id || `opencode_${Date.now()}`;

        // Skip if already captured for this session
        if (capturedSessions.has(sessionId)) return;

        // Fetch transcript via client API or event payload fallbacks
        let transcript = [];
        try {
          if (client?.session?.getMessages) {
            try {
              const res = await client.session.getMessages({ path: { id: sessionId } });
              transcript = res?.data || res || [];
            } catch (err1) {
              try {
                const res2 = await client.session.getMessages({ sessionID: sessionId });
                transcript = res2?.data || res2 || [];
              } catch (err2) {
                transcript = await client.session.getMessages(sessionId);
              }
            }
          }
        } catch (e) {
          // Client API unavailable
        }

        if (!Array.isArray(transcript) || transcript.length === 0) {
          transcript = event.messages || event.transcript || event.session?.messages || event.payload?.messages || event.history || [];
        }

        if (!Array.isArray(transcript) || transcript.length === 0) {
          const userMsg = event?.input || event?.prompt || event?.message;
          const assistantMsg = event?.output || event?.response || event?.reply;
          if (userMsg || assistantMsg) {
            transcript = [];
            if (userMsg) transcript.push({ role: "user", content: typeof userMsg === "string" ? userMsg : JSON.stringify(userMsg) });
            if (assistantMsg) transcript.push({ role: "assistant", content: typeof assistantMsg === "string" ? assistantMsg : JSON.stringify(assistantMsg) });
          }
        }

        if (!Array.isArray(transcript) || transcript.length === 0) {
          const dbResult = getLatestSessionTranscriptFromDB();
          if (dbResult.transcript && dbResult.transcript.length > 0) {
            transcript = dbResult.transcript;
          }
        }

        if (!Array.isArray(transcript) || transcript.length === 0) {
          console.error(`[Memwyre Capture Debug] isIdleEvent triggered for eventType='${eventType}', sessionId='${sessionId}', but transcript is empty.`);
          return;
        }

        // Mark session as captured immediately to debounce duplicate triggers
        capturedSessions.add(sessionId);

        try {
          await axios.post(`${hostUrl}/api/v1/plugin/capture`, {
            session_id: sessionId,
            project_name: projectName,
            cwd: cwd,
            transcript,
          }, {
            headers: { Authorization: `Bearer ${apiKey}` },
            timeout: 5000,
          });
          console.error(`[Memwyre] Captured session transcript (${transcript.length} items) for workspace '${projectName}'`);
        } catch (e) {
          console.error(`[Memwyre] Failed to capture session: ${e.message || e}`);
        }
      }
    },
  };
};

export default MemwyrePlugin;
