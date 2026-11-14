import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface MemwyreCredentials {
  apiKey: string | null;
  apiUrl: string;
  source: 'config' | 'env' | 'file' | 'none';
}

export interface MemwyrePluginConfig {
  apiKey?: string;
  apiUrl?: string;
  autoInject?: boolean;
  autoCapture?: boolean;
  maxInjectedMemories?: number;
}

const DEFAULT_API_URL = 'https://api.memwyre.tech';

/**
 * Candidate credential file locations in order of preference
 */
function getCredentialFilePaths(): string[] {
  const home = os.homedir();
  return [
    path.join(home, '.dsh-memwyre', 'credentials.json'),
    path.join(home, '.memwyre', 'credentials.json'),
    path.join(home, '.muse-memwyre', 'credentials.json'),
  ];
}

/**
 * Resolves Memwyre credentials using tiered lookup:
 * 1. Explicit cordis.yml configuration
 * 2. Environment variables (MEMWYRE_API_KEY, MEMWYRE_API_URL)
 * 3. File-based credentials (~/.dsh-memwyre/credentials.json, etc.)
 */
export function resolveCredentials(config?: MemwyrePluginConfig): MemwyreCredentials {
  // 1. Direct configuration
  if (config?.apiKey && config.apiKey.trim().length > 0) {
    return {
      apiKey: config.apiKey.trim(),
      apiUrl: (config.apiUrl || DEFAULT_API_URL).replace(/\/$/, ''),
      source: 'config',
    };
  }

  // 2. Environment variables
  const envKey = process.env.MEMWYRE_API_KEY || process.env.BRAIN_VAULT_API_KEY;
  const envUrl = process.env.MEMWYRE_API_URL || process.env.BRAIN_VAULT_API_URL;
  if (envKey && envKey.trim().length > 0) {
    return {
      apiKey: envKey.trim(),
      apiUrl: (envUrl || config?.apiUrl || DEFAULT_API_URL).replace(/\/$/, ''),
      source: 'env',
    };
  }

  // 3. Local credential files
  for (const filePath of getCredentialFilePaths()) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.apiKey === 'string' && parsed.apiKey.trim().length > 0) {
          return {
            apiKey: parsed.apiKey.trim(),
            apiUrl: (parsed.apiUrl || config?.apiUrl || DEFAULT_API_URL).replace(/\/$/, ''),
            source: 'file',
          };
        }
      }
    } catch {
      // Continue to next file candidate if corrupted
    }
  }

  return {
    apiKey: null,
    apiUrl: (config?.apiUrl || DEFAULT_API_URL).replace(/\/$/, ''),
    source: 'none',
  };
}

/**
 * Persists Memwyre credentials to disk
 */
export function saveCredentials(apiKey: string, apiUrl: string = DEFAULT_API_URL): string {
  const primaryDir = path.join(os.homedir(), '.dsh-memwyre');
  const primaryFile = path.join(primaryDir, 'credentials.json');

  if (!fs.existsSync(primaryDir)) {
    fs.mkdirSync(primaryDir, { recursive: true, mode: 0o700 });
  }

  const payload = {
    apiKey: apiKey.trim(),
    apiUrl: apiUrl.replace(/\/$/, ''),
    savedAt: new Date().toISOString(),
    plugin: '@memwyre/dsh-plugin',
  };

  fs.writeFileSync(primaryFile, JSON.stringify(payload, null, 2), { mode: 0o600 });
  return primaryFile;
}
