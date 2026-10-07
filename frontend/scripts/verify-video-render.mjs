import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, '..');

const PORT = 5199;
const HOST = '127.0.0.1';
const TEST_URL = `http://${HOST}:${PORT}/marketing-video`;

async function main() {
  console.log('Starting preview server...');
  const server = spawn('npm', ['run', 'preview', '--', '--port', String(PORT), '--host', HOST], {
    cwd: frontendRoot,
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', d => console.log('[preview]', d.toString().trim()));
  server.stderr.on('data', d => console.error('[preview err]', d.toString().trim()));

  // Wait for server to become responsive
  await new Promise(r => setTimeout(r, 2500));

  console.log('Launching chromium...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

  await page.goto(TEST_URL, { waitUntil: 'networkidle' });
  console.log('Page loaded successfully:', TEST_URL);

  const outDir = path.resolve(frontendRoot, 'scratch', 'video_test_shots');
  await mkdir(outDir, { recursive: true });

  // Capture shots across scenes
  const scenesToTest = [
    { name: '01_intro.png', delay: 800 },
    { name: '02_needs.png', delay: 3000 },
    { name: '03_meet.png', delay: 2500 },
    { name: '04_cloud.png', delay: 2000 },
    { name: '05_models.png', delay: 2200 },
    { name: '06_tools.png', delay: 2000 },
    { name: '07_permissions.png', delay: 2000 },
    { name: '08_chat.png', delay: 2000 },
    { name: '09_tagged.png', delay: 2000 },
    { name: '10_cost.png', delay: 2000 },
    { name: '11_selfhost.png', delay: 2000 },
    { name: '12_outro.png', delay: 2000 }
  ];

  for (const s of scenesToTest) {
    await page.waitForTimeout(s.delay);
    await page.screenshot({ path: path.join(outDir, s.name) });
    console.log(`Captured ${s.name}`);
  }

  await browser.close();
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], { shell: true });
  } else {
    server.kill();
  }

  console.log('Verification finished successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
