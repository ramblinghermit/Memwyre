/**
 * Memwyre Workspace Resolver
 * ===========================
 * Resolves project workspaces intelligently and deterministically:
 *   1. Prioritizes Git root, Antigravity project metadata, and Antigravity workspace roots.
 *   2. Prevents creating useless/fragmented workspaces for subdirectories (e.g., 'backend', 'src', 'app').
 *   3. Prevents creating workspaces for internal agent/temp folders (.gemini, brain, AppData) or user homedir.
 *   4. Matches against existing Memwyre projects to prevent duplicate naming (hyphen vs underscore).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const http = require('http');

// Known generic subfolders that should NEVER be treated as project workspaces
const GENERIC_SUBDIRECTORIES = new Set([
  'src',
  'app',
  'apps',
  'backend',
  'frontend',
  'client',
  'server',
  'dist',
  'build',
  'scripts',
  'bin',
  'lib',
  'docs',
  'test',
  'tests',
  'node_modules',
  'tmp',
  'temp',
  'scratch',
  '.system_generated',
]);

// Internal directories that should NEVER be used as project names
const IGNORED_PATH_PATTERNS = [
  /[\\/]\.gemini[\\/]/i,
  /[\\/]antigravity[\\/]brain[\\/]/i,
  /[\\/]AppData[\\/]Local[\\/]Temp/i,
  /[\\/]\.temp/i,
];

/**
 * Retrieve active project information from Antigravity's project registry
 */
function getAntigravityProject(targetDir = null) {
  const configDir = path.join(os.homedir(), '.gemini', 'config', 'projects');
  if (!fs.existsSync(configDir)) return null;

  // 1. By ANTIGRAVITY_PROJECT_ID environment variable
  const projId = process.env.ANTIGRAVITY_PROJECT_ID;
  if (projId) {
    const file = path.join(configDir, `${projId}.json`);
    if (fs.existsSync(file)) {
      try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (data && data.name) {
          const uri = data.projectResources?.resources?.[0]?.gitFolder?.folderUri || null;
          let folderPath = null;
          if (uri) {
            folderPath = decodeURIComponent(uri.replace(/^file:\/\/\/?/, '')).replace(/\//g, path.sep);
          }
          return { name: data.name, folderPath };
        }
      } catch (_) {}
    }
  }

  // 2. By matching directory to registered project folderUri
  try {
    const searchPath = (targetDir || process.cwd()).toLowerCase();
    const files = fs.readdirSync(configDir);
    let mostRecentProject = null;
    let mostRecentTime = 0;

    for (const f of files) {
      if (f.endsWith('.json') && f !== 'outside-of-project.json') {
        const full = path.join(configDir, f);
        try {
          const stat = fs.statSync(full);
          const data = JSON.parse(fs.readFileSync(full, 'utf8'));
          const uri = data.projectResources?.resources?.[0]?.gitFolder?.folderUri;
          let folderPath = null;
          if (uri) {
            folderPath = decodeURIComponent(uri.replace(/^file:\/\/\/?/, '')).replace(/\//g, path.sep);
            if (searchPath.startsWith(folderPath.toLowerCase())) {
              return { name: data.name, folderPath };
            }
          }
          if (stat.mtimeMs > mostRecentTime && data.name) {
            mostRecentTime = stat.mtimeMs;
            mostRecentProject = { name: data.name, folderPath };
          }
        } catch (_) {}
      }
    }

    if (mostRecentProject) return mostRecentProject;
  } catch (_) {}

  return null;
}

/**
 * Walk up directory tree to find repository or project root
 */
function findProjectRoot(startDir) {
  if (!startDir || typeof startDir !== 'string') {
    startDir = process.cwd();
  }

  let current = path.resolve(startDir);
  const root = path.parse(current).root;
  const homeDir = path.resolve(os.homedir());

  // Never treat home directory or filesystem root as project root
  if (current === homeDir || current === root) {
    const agy = getAntigravityProject();
    if (agy && agy.folderPath) return agy.folderPath;
    return current;
  }

  // First pass: look specifically for .git or .agents (authoritative repo roots)
  let dir = current;
  while (dir && dir !== root && dir !== homeDir) {
    if (fs.existsSync(path.join(dir, '.git')) || fs.existsSync(path.join(dir, '.agents'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  // Second pass: look for project manifest files
  dir = current;
  while (dir && dir !== root && dir !== homeDir) {
    if (
      fs.existsSync(path.join(dir, 'package.json')) ||
      fs.existsSync(path.join(dir, 'pyproject.toml')) ||
      fs.existsSync(path.join(dir, 'Cargo.toml')) ||
      fs.existsSync(path.join(dir, 'go.mod'))
    ) {
      const base = path.basename(dir).toLowerCase();
      if (!GENERIC_SUBDIRECTORIES.has(base)) {
        return dir;
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  // Fallback: check if Antigravity has a known project registered
  const agy = getAntigravityProject(current);
  if (agy && agy.folderPath) {
    return agy.folderPath;
  }

  return current;
}

/**
 * Fetch existing project names from Memwyre API (cached in memory)
 */
let cachedProjectNames = null;
let lastProjectFetchTime = 0;

function fetchUserProjects(apiUrl, apiKey) {
  return new Promise((resolve) => {
    const now = Date.now();
    if (cachedProjectNames && now - lastProjectFetchTime < 60000) {
      return resolve(cachedProjectNames);
    }

    const url = new URL(`${apiUrl.replace(/\/$/, '')}/api/v1/projects/`);
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
          'X-Plugin-Source': 'antigravity-workspace-resolver',
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => { body += c; });
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (Array.isArray(data)) {
              cachedProjectNames = data.map((p) => p.name).filter(Boolean);
              lastProjectFetchTime = now;
              return resolve(cachedProjectNames);
            }
          } catch (_) {}
          resolve([]);
        });
      }
    );

    req.setTimeout(3000, () => {
      req.destroy();
      resolve([]);
    });

    req.on('error', () => resolve([]));
    req.end();
  });
}

/**
 * Resolve workspace directory and canonical project name
 */
async function resolveWorkspace(input = {}, creds = null) {
  let candidate = null;

  if (Array.isArray(input.workspacePaths) && input.workspacePaths.length > 0) {
    for (const p of input.workspacePaths) {
      if (typeof p === 'string' && !IGNORED_PATH_PATTERNS.some((re) => re.test(p))) {
        candidate = p;
        break;
      }
    }
  }

  if (!candidate) {
    candidate = input.workspaceRoot || input.cwd || process.cwd();
  }

  // Normalize candidate
  const homeDir = path.resolve(os.homedir());
  let projectRoot = findProjectRoot(candidate);

  // If candidate or projectRoot ended up as home directory or generic folder, consult Antigravity registry
  let baseProjectName = path.basename(projectRoot) || 'default';
  const homeBase = path.basename(homeDir).toLowerCase();

  if (
    baseProjectName.toLowerCase() === homeBase ||
    GENERIC_SUBDIRECTORIES.has(baseProjectName.toLowerCase()) ||
    IGNORED_PATH_PATTERNS.some((re) => re.test(projectRoot))
  ) {
    const agy = getAntigravityProject(candidate);
    if (agy) {
      baseProjectName = agy.name;
      if (agy.folderPath) projectRoot = agy.folderPath;
    }
  }

  // Match against existing Memwyre projects to prevent duplicate naming
  if (creds && creds.apiKey) {
    try {
      const existingProjects = await fetchUserProjects(creds.apiUrl, creds.apiKey);
      const normalizedBase = baseProjectName.toLowerCase().replace(/[-_]/g, '');

      for (const existing of existingProjects) {
        if (existing.toLowerCase() === baseProjectName.toLowerCase()) {
          baseProjectName = existing;
          break;
        }
        const normalizedExisting = existing.toLowerCase().replace(/[-_]/g, '');
        if (normalizedExisting === normalizedBase) {
          baseProjectName = existing;
          break;
        }
      }
    } catch (_) {}
  }

  return {
    projectName: baseProjectName,
    projectRoot,
    cwd: candidate,
  };
}

module.exports = {
  findProjectRoot,
  resolveWorkspace,
  getAntigravityProject,
  GENERIC_SUBDIRECTORIES,
};
