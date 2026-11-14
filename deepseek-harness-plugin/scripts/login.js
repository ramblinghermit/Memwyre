/**
 * Memwyre × DeepSeek Harness — First-Run Credential Setup
 * ========================================================
 * Stores your Memwyre API key in ~/.dsh-memwyre/credentials.json
 * so it can be automatically detected by the DeepSeek Harness runtime.
 *
 * Usage:
 *   node scripts/login.js
 *   node scripts/login.js --api-key bv_sk_your_key_here
 *   node scripts/login.js --api-url https://api.memwyre.tech
 *   node scripts/login.js --test
 */

import * as https from 'node:https';
import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import * as readline from 'node:readline';

const CRED_DIR = path.join(os.homedir(), '.dsh-memwyre');
const CRED_FILE = path.join(CRED_DIR, 'credentials.json');
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
          'X-Plugin-Source': 'deepseek-harness',
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
            reject(new Error(`Unexpected response (HTTP ${res.statusCode})`));
          }
        });
      }
    );
    req.setTimeout(8000, () => req.destroy(new Error('Connection timed out')));
    req.on('error', (err) => reject(new Error(`Network error: ${err.message}`)));
    req.end();
  });
}

function saveCredentials(apiKey, apiUrl) {
  if (!fs.existsSync(CRED_DIR)) {
    fs.mkdirSync(CRED_DIR, { recursive: true, mode: 0o700 });
  }
  const creds = {
    apiKey,
    apiUrl: apiUrl.replace(/\/$/, ''),
    savedAt: new Date().toISOString(),
    plugin: '@memwyre/dsh-plugin',
  };
  fs.writeFileSync(CRED_FILE, JSON.stringify(creds, null, 2), { mode: 0o600 });
}

async function main() {
  const args = parseArgs();

  console.log('\n🧠 Memwyre × DeepSeek Harness — Credential Setup\n');

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
      console.log('   Run this script without --test to configure.');
      process.exit(1);
    }
  }

  let apiKey = args.apiKey;
  let apiUrl = (args.apiUrl || DEFAULT_API_URL).replace(/\/$/, '');

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
      } catch (_) {}
    }

    console.log('Get your API key from: https://app.memwyre.tech/settings');
    apiKey = await prompt('Enter your Memwyre API Key (bv_sk_...): ');
  }

  if (!apiKey || (!apiKey.startsWith('bv_') && !apiKey.startsWith('mw_'))) {
    console.error('❌ Invalid API key format. Keys should start with "bv_sk_" or "mw_sk_".');
    process.exit(1);
  }

  console.log(`\n⏳ Validating key against ${apiUrl}...`);
  try {
    const user = await validateKey(apiKey, apiUrl);
    const label = user.email || user.username || 'your account';
    console.log(`✅ API key validated for: ${label}`);
  } catch (err) {
    console.error(`❌ Validation failed: ${err.message}`);
    process.exit(1);
  }

  saveCredentials(apiKey, apiUrl);
  console.log(`\n💾 Credentials saved to: ${CRED_FILE}`);
  console.log('\n🚀 Memwyre is now ready for DeepSeek Harness!');
  console.log('   Add "@memwyre/dsh-plugin" to your cordis.yml to activate.\n');
}

main().catch((err) => {
  console.error(`❌ Unexpected error: ${err.message}`);
  process.exit(1);
});
