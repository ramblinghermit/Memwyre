const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

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

async function parseTranscript(filePath) {
  const messages = [];
  try {
    if (!fs.existsSync(filePath)) return messages;
    
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if (!line.trim()) continue;
      try {
        messages.push(JSON.parse(line));
      } catch (e) {
        // Skip malformed JSONL lines
      }
    }
  } catch (err) {
    // Silently handle read errors
  }
  return messages;
}

async function main() {
  const logFile = 'C:\\Users\\himan\\OneDrive\\Documents\\brain_vault\\debug_hook.txt';
  function logDebug(msg) {
    fs.appendFileSync(logFile, new Date().toISOString() + ': ' + msg + '\n');
  }
  
  try {
    logDebug('Hook started.');
    const input = await readStdin();
    logDebug('Stdin read: ' + JSON.stringify(input));
    
    const cwd = input.cwd || process.cwd();
    const sessionId = input.session_id;
    const transcriptPath = input.transcript_path;
    const projectName = cwd.split(/[/\\]/).pop();

    if (!transcriptPath || !sessionId) {
      logDebug('Exiting: Missing transcriptPath or sessionId');
      writeOutput({ continue: true });
      return;
    }

    const apiKey = process.env.MEMWYRE_API_KEY;
    if (!apiKey) {
      logDebug('Exiting: Missing MEMWYRE_API_KEY env var');
      writeOutput({ continue: true });
      return;
    }

    logDebug('Reading transcript at: ' + transcriptPath);
    const transcript = await parseTranscript(transcriptPath);
    if (transcript.length === 0) {
      logDebug('Exiting: Transcript is empty');
      writeOutput({ continue: true });
      return;
    }
    
    logDebug('Transcript parsed. Sending ' + transcript.length + ' messages to backend...');
    const apiUrl = process.env.MEMWYRE_API_URL || 'https://api.memwyre.tech';
    
    try {
      const response = await axios.post(`${apiUrl}/api/v1/plugin/capture`, {
        session_id: sessionId,
        project_name: projectName,
        cwd: cwd,
        transcript: transcript
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000 
      });
      logDebug('Success! Backend responded: ' + response.status);
    } catch (apiError) {
      logDebug('API Error: ' + apiError.message);
      if (apiError.response) {
        logDebug('API Error details: ' + JSON.stringify(apiError.response.data));
      }
    }

    writeOutput({ continue: true });
  } catch (err) {
    logDebug('Fatal Error: ' + err.stack);
    writeOutput({ continue: true });
  }
}

main();
