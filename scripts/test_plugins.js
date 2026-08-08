import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log("==================================================");
console.log("🤖 RUNNING AUTOMATED AGENT PLUGINS TEST SUITE");
console.log("==================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(` ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(` ❌ FAIL: ${message}`);
    failed++;
  }
}

// -------------------------------------------------------------------
// TEST 1: Claude Code Plugin (STDIN / STDOUT & JSONL Parsing)
// -------------------------------------------------------------------
async function testClaudePlugin() {
  console.log("\n--- Testing Claude Code Plugin (claude-plugin) ---");
  
  // 1. Test inject-memory.cjs
  const injectScript = path.join(rootDir, 'claude-plugin', 'dist', 'inject-memory.cjs');
  assert(fs.existsSync(injectScript), "claude-plugin dist/inject-memory.cjs exists");

  const injectInput = JSON.stringify({ cwd: rootDir, session_id: "claude_test_session_1" });
  
  const injectOutput = await new Promise((resolve) => {
    const child = spawn('node', [injectScript], {
      env: { ...process.env, MEMWYRE_API_KEY: "bv_sk_test_key_123" }
    });
    let out = '';
    child.stdout.on('data', (d) => out += d);
    child.stdin.write(injectInput);
    child.stdin.end();
    child.on('close', () => resolve(out));
  });

  try {
    const json = JSON.parse(injectOutput.trim());
    assert(json.hookSpecificOutput?.hookEventName === "SessionStart", "Claude inject-memory returns hookSpecificOutput.hookEventName = SessionStart");
    assert(typeof json.hookSpecificOutput?.additionalContext === "string", "Claude inject-memory returns additionalContext payload");
  } catch (e) {
    assert(false, `Claude inject-memory output invalid JSON: ${e.message}`);
  }

  // 2. Test capture-session.cjs
  const captureScript = path.join(rootDir, 'claude-plugin', 'dist', 'capture-session.cjs');
  assert(fs.existsSync(captureScript), "claude-plugin dist/capture-session.cjs exists");

  // Create temporary transcript file
  const tmpDir = os.tmpdir();
  const tmpTranscript = path.join(tmpDir, `claude_transcript_${Date.now()}.jsonl`);
  fs.writeFileSync(tmpTranscript, JSON.stringify({ role: "user", content: "Hello world" }) + "\n");

  const captureInput = JSON.stringify({
    cwd: rootDir,
    session_id: "claude_test_session_1",
    transcript_path: tmpTranscript
  });

  const captureOutput = await new Promise((resolve) => {
    const child = spawn('node', [captureScript], {
      env: { ...process.env, MEMWYRE_API_KEY: "bv_sk_test_key_123" }
    });
    let out = '';
    child.stdout.on('data', (d) => out += d);
    child.stdin.write(captureInput);
    child.stdin.end();
    child.on('close', () => resolve(out));
  });

  try {
    const json = JSON.parse(captureOutput.trim());
    assert(json.continue === true, "Claude capture-session returns { continue: true } non-blocking output");
  } catch (e) {
    assert(false, `Claude capture-session output invalid JSON: ${e.message}`);
  } finally {
    if (fs.existsSync(tmpTranscript)) fs.unlinkSync(tmpTranscript);
  }
}

// -------------------------------------------------------------------
// TEST 2: OpenClaw Plugin (Plugin SDK Lifecycle Hooks)
// -------------------------------------------------------------------
async function testOpenClawPlugin() {
  console.log("\n--- Testing OpenClaw Plugin (openclaw-plugin) ---");

  const openclawDist = path.join(rootDir, 'openclaw-plugin', 'dist', 'index.js');
  assert(fs.existsSync(openclawDist), "openclaw-plugin dist/index.js exists");

  const openclawModule = await import(`file://${openclawDist}`);
  const memwyrePlugin = openclawModule.default;
  assert(memwyrePlugin && memwyrePlugin.id === "openclaw-plugin", "OpenClaw plugin exports default memwyrePlugin");

  let registeredEvent = null;
  let registeredHandler = null;

  const mockApi = {
    pluginConfig: { apiKey: "bv_sk_openclaw_test_123" },
    logger: {
      info: () => {},
      warn: () => {},
      error: () => {}
    },
    on: (eventName, handler) => {
      registeredEvent = eventName;
      registeredHandler = handler;
    }
  };

  memwyrePlugin.register(mockApi);
  assert(registeredEvent === "session", "OpenClaw plugin registers listener for 'session' lifecycle event");
  assert(typeof registeredHandler === "function", "OpenClaw plugin registers valid async hook handler function");

  // Simulate Session Start
  try {
    await registeredHandler({ type: "session", action: "start" });
    assert(true, "OpenClaw session:start event handled cleanly without errors");
  } catch (e) {
    assert(false, `OpenClaw session:start error: ${e.message}`);
  }

  // Simulate Session End
  try {
    await registeredHandler({
      type: "session",
      action: "end",
      sessionId: "openclaw_test_99",
      messages: [{ role: "user", content: "Test openclaw memory" }]
    });
    assert(true, "OpenClaw session:end event handled cleanly without errors");
  } catch (e) {
    assert(false, `OpenClaw session:end error: ${e.message}`);
  }
}

// -------------------------------------------------------------------
// TEST 3: OpenCode Plugin (Native Plugin SDK Lifecycle Hooks)
// -------------------------------------------------------------------
async function testOpenCodePlugin() {
  console.log("\n--- Testing OpenCode Plugin (opencode-plugin) ---");

  const opencodeSrc = path.join(rootDir, 'opencode-plugin', 'src', 'index.js');
  assert(fs.existsSync(opencodeSrc), "opencode-plugin src/index.js exists");

  const opencodeModule = await import(`file://${opencodeSrc}`);
  const MemwyrePlugin = opencodeModule.default || opencodeModule.MemwyrePlugin;
  assert(typeof MemwyrePlugin === "function", "OpenCode plugin exports default MemwyrePlugin factory");

  let clientGetMessagesCalled = false;
  const mockClient = {
    session: {
      getMessages: async (sessionId) => {
        clientGetMessagesCalled = true;
        return [{ role: "user", content: `Mock transcript for ${sessionId}` }];
      }
    }
  };

  process.env.MEMWYRE_API_KEY = "bv_sk_opencode_test_123";
  const pluginInstance = await MemwyrePlugin({ directory: rootDir, client: mockClient });
  assert(typeof pluginInstance.event === "function", "OpenCode plugin instance returns event handler");

  // 1. Test session.created
  try {
    await pluginInstance.event({ event: { type: "session.created" } });
    assert(true, "OpenCode session.created event handled cleanly");
  } catch (e) {
    assert(false, `OpenCode session.created error: ${e.message}`);
  }

  // 2. Test session.idle
  try {
    await pluginInstance.event({ event: { type: "session.idle", sessionId: "opencode_test_session_88" } });
    assert(clientGetMessagesCalled === true, "OpenCode session.idle uses client.session.getMessages to retrieve transcript");
  } catch (e) {
    assert(false, `OpenCode session.idle error: ${e.message}`);
  }

  // 3. Test debounce on duplicate session.idle
  clientGetMessagesCalled = false;
  try {
    await pluginInstance.event({ event: { type: "session.idle", sessionId: "opencode_test_session_88" } });
    assert(clientGetMessagesCalled === false, "OpenCode session.idle debounces duplicate triggers for same session ID");
  } catch (e) {
    assert(false, `OpenCode session.idle debounce error: ${e.message}`);
  }
}

async function main() {
  try {
    await testClaudePlugin();
    await testOpenClawPlugin();
    await testOpenCodePlugin();

    console.log("\n==================================================");
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log("==================================================\n");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("FATAL TEST ERROR:", err);
    process.exit(1);
  }
}

main();
