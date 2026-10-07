/**
 * Memwyre × Muse Code — First-Run Credential Setup
 * ==================================================
 * Stores your Memwyre API key in ~/.muse-memwyre/credentials.json
 * so it can be read by hooks even when Muse Code clears the shell environment.
 *
 * Usage:
 *   node scripts/login.js
 *   node scripts/login.js --api-key bv_sk_your_key_here
 *   node scripts/login.js --api-url https://server.memwyre.tech  # For self-hosted
 *   node scripts/login.js --test   # Verify credentials without saving
 *
 * What this does:
 *   1. Reads API key from --api-key flag, or prompts interactively
 *   2. Validates the key by calling GET /api/v1/user/me
 *   3. Writes { apiKey, apiUrl, savedAt } to ~/.muse-memwyre/credentials.json
 */

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const CRED_DIR = path.join(os.homedir(), '.muse-memwyre');
const CRED_FILE = path.join(CRED_DIR, 'credentials.json');
const DEFAULT_API_URL = 'https://api.memwyre.tech';

// ---------------------------------------------------------------------------
// CLI arg parser
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Interactive prompt
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Validate API key against Memwyre
// ---------------------------------------------------------------------------
function validateKey(apiKey, apiUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${apiUrl}/api/v1/user/me`);
    const transport = url.protocol === 'https:' ? https : http;
    const req = transport.request(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            try { resolve(JSON.parse(body)); }
            catch (_) { resolve({ ok: true }); }
          } else if (res.statusCode === 401) {
            reject(new Error('Invalid API key — please check your key and try again.'));
          } else {
            reject(new Error(`Unexpected response (HTTP ${res.statusCode}) — is the API URL correct?`));
          }
        });
      }
    );
    req.setTimeout(8000, () => req.destroy(new Error('Connection timed out')));
    req.on('error', (err) => reject(new Error(`Network error: ${err.message}`)));
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Save credentials
// ---------------------------------------------------------------------------
function saveCredentials(apiKey, apiUrl) {
  if (!fs.existsSync(CRED_DIR)) {
    fs.mkdirSync(CRED_DIR, { recursive: true, mode: 0o700 });
  }
  const creds = {
    apiKey,
    apiUrl: apiUrl.replace(/\/$/, ''),
    savedAt: new Date().toISOString(),
    plugin: 'memwyre-muse',
  };
  fs.writeFileSync(CRED_FILE, JSON.stringify(creds, null, 2), { mode: 0o600 });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = parseArgs();

  console.log('\n🧠 Memwyre × Muse Code — Credential Setup\n');

  // Read existing credentials for --test mode
  if (args.test) {
    if (fs.existsSync(CRED_FILE)) {
      const creds = JSON.parse(fs.readFileSync(CRED_FILE, 'utf8'));
      console.log(`✅ Found credentials at: ${CRED_FILE}`);
      console.log(`   API URL: ${creds.apiUrl}`);
      console.log(`   API Key: ${creds.apiKey.slice(0, 8)}...${creds.apiKey.slice(-4)}`);
      console.log(`   Saved:   ${creds.savedAt}`);
      process.exit(0);
    } else {
      console.log(`❌ No credentials found at: ${CRED_FILE}`);
      console.log('   Run this script without --test to set up credentials.');
      process.exit(1);
    }
  }

  let apiKey = args.apiKey;
  let apiUrl = (args.apiUrl || DEFAULT_API_URL).replace(/\/$/, '');

  // If API key not provided via args, check existing creds or prompt
  if (!apiKey) {
    if (fs.existsSync(CRED_FILE)) {
      try {
        const existing = JSON.parse(fs.readFileSync(CRED_FILE, 'utf8'));
        if (existing.apiKey) {
          const answer = await prompt(
            `Existing key found (${existing.apiKey.slice(0, 8)}...). Overwrite? [y/N] `
          );
          if (answer.toLowerCase() !== 'y') {
            console.log('Keeping existing credentials. Exiting.');
            process.exit(0);
          }
        }
      } catch (_) { /* corrupt file — proceed */ }
    }

    console.log('Get your API key from: https://app.memwyre.tech/settings');
    apiKey = await prompt('Enter your Memwyre API Key (bv_sk_...): ');
  }

  if (!apiKey || !apiKey.startsWith('bv_')) {
    console.error('❌ Invalid API key format. Keys should start with "bv_sk_".');
    process.exit(1);
  }

  // Validate against the API
  console.log(`\n⏳ Validating key against ${apiUrl}...`);
  try {
    const user = await validateKey(apiKey, apiUrl);
    const label = user.email || user.username || 'your account';
    console.log(`✅ API key validated for: ${label}`);
  } catch (err) {
    console.error(`❌ Validation failed: ${err.message}`);
    process.exit(1);
  }

  // Save credentials
  saveCredentials(apiKey, apiUrl);
  console.log(`\n💾 Credentials saved to: ${CRED_FILE}`);
  console.log('\n🚀 Memwyre is now ready for Muse Code!');
  console.log('   Start a new Muse session to activate memory injection.\n');
}

main().catch((err) => {
  console.error(`❌ Unexpected error: ${err.message}`);
  process.exit(1);
});
