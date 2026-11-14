/**
 * Memwyre x Antigravity - Credential Setup & Status Tool
 * ========================================================
 * Stores and validates your Memwyre API key in ~/.antigravity-memwyre/credentials.json
 * so it can be read seamlessly by Antigravity hooks, MCP servers, and skills.
 *
 * Usage:
 *   node scripts/login.js
 *   node scripts/login.js --api-key bv_sk_...
 *   node scripts/login.js --api-url https://api.memwyre.tech
 *   node scripts/login.js --test
 */

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const AGY_CRED_DIR = path.join(os.homedir(), '.antigravity-memwyre');
const AGY_CRED_FILE = path.join(AGY_CRED_DIR, 'credentials.json');
const SHARED_CRED_DIR = path.join(os.homedir(), '.memwyre');
const SHARED_CRED_FILE = path.join(SHARED_CRED_DIR, 'credentials.json');
const DEFAULT_API_URL = 'https://api.memwyre.tech';

function parseArgs() {
  const args = process.argv.slice(2);
  const result = { apiKey: null, apiUrl: null, test: false };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--api-key' && args[i + 1]) result.apiKey = args[++i];
    if (args[i] === '--api-url' && args[i + 1]) result.apiUrl = args[++i];
    if (args[i] === '--test') result.test = true;
  }
  return result;
}

function prompt(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function readStoredCredentials() {
  const candidateFiles = [
    AGY_CRED_FILE,
    SHARED_CRED_FILE,
    path.join(os.homedir(), '.muse-memwyre', 'credentials.json'),
  ];

  for (const file of candidateFiles) {
    try {
      if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, 'utf8');
        const data = JSON.parse(raw);
        if (data && data.apiKey) {
          return {
            apiKey: data.apiKey,
            apiUrl: (data.apiUrl || DEFAULT_API_URL).replace(/\/$/, ''),
            source: file,
          };
        }
      }
    } catch (_) {}
  }

  // Also check ~/.gemini/antigravity/mcp_config.json
  try {
    const mcpConfigPath = path.join(os.homedir(), '.gemini', 'antigravity', 'mcp_config.json');
    if (fs.existsSync(mcpConfigPath)) {
      const raw = fs.readFileSync(mcpConfigPath, 'utf8');
      const match = raw.match(/bv_sk_[a-zA-Z0-9_-]+/);
      if (match) {
        return {
          apiKey: match[0],
          apiUrl: DEFAULT_API_URL,
          source: mcpConfigPath,
        };
      }
    }
  } catch (_) {}

  if (process.env.MEMWYRE_API_KEY) {
    return {
      apiKey: process.env.MEMWYRE_API_KEY,
      apiUrl: (process.env.MEMWYRE_API_URL || DEFAULT_API_URL).replace(/\/$/, ''),
      source: 'environment variable',
    };
  }

  return null;
}

function validateKey(apiKey, apiUrl) {
  return new Promise((resolve, reject) => {
    // Memwyre uses /api/v1/auth/verify to validate tokens and return the User object
    const targetUrl = new URL(`${apiUrl.replace(/\/$/, '')}/api/v1/auth/verify`);
    const transport = targetUrl.protocol === 'https:' ? https : http;
    const req = transport.request(
      {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
        path: targetUrl.pathname,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-Plugin-Source': 'antigravity',
        },
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (res.statusCode === 200) {
              resolve({ ok: true, data });
            } else {
              resolve({ ok: false, status: res.statusCode, error: data.detail || body });
            }
          } catch (_) {
            resolve({ ok: false, status: res.statusCode, error: body });
          }
        });
      }
    );

    req.setTimeout(8000, () => {
      req.destroy(new Error('Validation request timed out'));
    });

    req.on('error', reject);
    req.end();
  });
}

function saveCredentials(apiKey, apiUrl) {
  const payload = JSON.stringify(
    {
      apiKey,
      apiUrl,
      updatedAt: new Date().toISOString(),
      client: 'antigravity-memwyre',
    },
    null,
    2
  );

  // Write to ~/.antigravity-memwyre
  if (!fs.existsSync(AGY_CRED_DIR)) fs.mkdirSync(AGY_CRED_DIR, { recursive: true });
  fs.writeFileSync(AGY_CRED_FILE, payload, 'utf8');

  // Also write to shared ~/.memwyre
  try {
    if (!fs.existsSync(SHARED_CRED_DIR)) fs.mkdirSync(SHARED_CRED_DIR, { recursive: true });
    fs.writeFileSync(SHARED_CRED_FILE, payload, 'utf8');
  } catch (_) {}
}

async function main() {
  const args = parseArgs();
  console.log('\n=== Memwyre x Antigravity Authentication ===\n');

  if (args.test) {
    const existing = readStoredCredentials();
    if (!existing) {
      console.log('Status: Disconnected (No Memwyre API key found).');
      console.log('Run: node scripts/login.js --api-key <YOUR_KEY>');
      process.exit(1);
    }

    console.log(`Testing credentials from: ${existing.source}`);
    console.log(`API URL: ${existing.apiUrl}`);
    console.log(`Key Prefix: ${existing.apiKey.slice(0, 10)}...`);

    try {
      const result = await validateKey(existing.apiKey, existing.apiUrl);
      if (result.ok) {
        console.log('\n[SUCCESS] Connected to Memwyre Vault!');
        if (result.data.email) console.log(`Account Email: ${result.data.email}`);
        if (result.data.username) console.log(`Username: ${result.data.username}`);
      } else {
        console.log(`\n[ERROR] Authentication failed (HTTP ${result.status}): ${result.error}`);
        process.exit(1);
      }
    } catch (err) {
      console.log(`\n[ERROR] Connection failed: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  let apiKey = args.apiKey;
  const apiUrl = (args.apiUrl || DEFAULT_API_URL).replace(/\/$/, '');

  if (!apiKey) {
    const existing = readStoredCredentials();
    if (existing) {
      console.log(`Found active credentials from ${existing.source}.`);
      console.log(`Key prefix: ${existing.apiKey.slice(0, 10)}...`);
      const ans = await prompt('Do you want to re-authenticate or overwrite? (y/N): ');
      if (ans.toLowerCase() !== 'y') {
        console.log('Existing credentials retained.');
        return;
      }
    }

    apiKey = await prompt('Enter your Memwyre API key (from https://memwyre.tech/login): ');
  }

  if (!apiKey || (!apiKey.startsWith('bv_') && !apiKey.startsWith('mw_'))) {
    console.log('\n[ERROR] Invalid API key format. Memwyre keys typically start with "bv_sk_" or "mw_".');
    process.exit(1);
  }

  console.log('\nValidating API key with Memwyre server...');
  try {
    const result = await validateKey(apiKey, apiUrl);
    if (!result.ok) {
      console.log(`\n[ERROR] Validation failed (HTTP ${result.status}): ${result.error}`);
      process.exit(1);
    }

    saveCredentials(apiKey, apiUrl);
    console.log('\n[SUCCESS] Successfully authenticated with Memwyre!');
    if (result.data.email) console.log(`Account: ${result.data.email}`);
    console.log(`Credentials saved to: ${AGY_CRED_FILE}`);
    console.log('Persistent memory is now ready for Antigravity sessions.\n');
  } catch (err) {
    console.log(`\n[ERROR] Could not contact Memwyre server: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { readStoredCredentials, validateKey, saveCredentials };
