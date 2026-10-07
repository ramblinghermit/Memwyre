import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, '..');

async function main() {
  console.log('Starting Vite server...');
  const server = spawn('npx', ['vite', '--port', '5173', '--host', '127.0.0.1'], {
    cwd: frontendRoot,
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', d => {
    const msg = d.toString();
    if (msg.includes('Local:')) console.log(msg.trim());
  });

  // Poll until server is ready
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:5173/marketing-video');
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 400));
  }

  if (!ready) {
    throw new Error('Vite dev server failed to start in time');
  }

  console.log('Vite server ready, launching Chromium...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.goto('http://127.0.0.1:5173/marketing-video', { waitUntil: 'networkidle' });

  const scenes = [
    '2. Needs',
    '3. Meet Overlay',
    '4. Cloud Hub',
    '5. Any Model',
    '6. Any Tool',
    '7. Permissions',
    '8. Channels',
    '9. @-tag Agent',
    '10. Cost & Usage',
    '11. Self-Host',
    '12. Outro'
  ];

  for (let i = 0; i < scenes.length; i++) {
    const sName = scenes[i];
    await page.click(`button:has-text("${sName}")`);
    await page.waitForTimeout(600);
    const outPath = path.join(frontendRoot, 'scratch', `scene_${i + 2}.png`);
    await page.screenshot({ path: outPath });
    console.log(`Captured scene_${i + 2}.png`);
  }

  await browser.close();
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], { shell: true });
  } else {
    server.kill();
  }

  console.log('All updated scenes captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
