const axios = require('axios');

async function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    let resolved = false;
    const fallback = setTimeout(() => {
      if (!resolved) { resolved = true; resolve({}); }
    }, 1000);
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      clearTimeout(fallback);
      if (resolved) return;
      resolved = true;
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        resolve({});
      }
    });
  });
}

function writeOutput(data) {
  console.log(JSON.stringify(data));
}

async function main() {
  try {
    const input = await readStdin();
    const cwd = input.cwd || process.cwd();
    // Use the basename of the cwd as the project name
    const projectName = cwd.split(/[/\\]/).pop();

    const apiKey = process.env.MEMWYRE_API_KEY;
    if (!apiKey) {
      writeOutput({
        hookSpecificOutput: {
          hookEventName: 'SessionStart',
          additionalContext: `<memwyre-status>\nMemwyre API Key not found. Please set MEMWYRE_API_KEY in your environment to enable persistent memory.\n</memwyre-status>`
        }
      });
      return;
    }

    // Call the FastAPI backend to fetch project context
    const apiUrl = process.env.MEMWYRE_API_URL || 'https://api.memwyre.tech';
    
    let contextText = '';
    try {
      const response = await axios.get(`${apiUrl}/api/v1/plugin/context`, {
        params: { project: projectName },
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000 // Don't hang Claude Code on startup
      });
      
      const memories = response.data.memories || [];
      if (memories.length > 0) {
        contextText = `<memwyre-context>\n## Past Memories for ${projectName}\n\n`;
        memories.forEach(m => {
          contextText += `- ${m.content}\n`;
        });
        contextText += `\n</memwyre-context>`;
      } else {
        contextText = `<memwyre-status>\nNo previous memories found for ${projectName}. Memwyre will capture your session automatically.\n</memwyre-status>`;
      }
    } catch (apiError) {
      contextText = `<memwyre-status>\nFailed to fetch Memwyre context: ${apiError.message}\n</memwyre-status>`;
    }

    writeOutput({
      hookSpecificOutput: {
        hookEventName: 'SessionStart',
        additionalContext: contextText
      }
    });

  } catch (err) {
    writeOutput({
      hookSpecificOutput: {
        hookEventName: 'SessionStart',
        additionalContext: `<memwyre-status>\nFatal error in inject-memory hook: ${err.message}\n</memwyre-status>`
      }
    });
  }
}

main();
