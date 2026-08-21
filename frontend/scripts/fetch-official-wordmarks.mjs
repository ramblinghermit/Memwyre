import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '../src/assets/brands');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function fetchUrl(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.status === 200) {
      const text = await res.text();
      if (text.includes('<svg') || text.includes('<?xml') || text.includes('<path')) {
        return text;
      }
    }
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
  }
  return null;
}

async function main() {
  const sources = {
    // 1. Claude: Wikimedia official vector logo (coral sunburst + serif Claude)
    'claude.svg': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg',
    
    // 2. Cursor: Official 2.5D logo from cursor.com/brand
    // (Already created from official vector paths of cursor.com)

    // 3. OpenAI: Wikimedia official vector logo
    'openai.svg': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    
    // 4. ChatGPT: Wikimedia official vector wordmark
    'chatgpt.svg': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    
    // 5. Google Gemini: Wikimedia official 2025 vector wordmark
    'gemini.svg': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Google_Gemini_logo_2025.svg',
    
    // 6. Perplexity: Wikimedia official Perplexity vector wordmark
    'perplexity.svg': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg',
    
    // 7. Grok: Wikimedia official Grok vector wordmark
    'grok.svg': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Grok_logo_%282023-2025%29.svg',
    
    // 8. Notion: Official full horizontal lockup with text
    'notion.svg': 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/notion-text.svg',
    
    // 9. VS Code: Official horizontal lockup
    'vscode.svg': 'https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-ar21.svg',
    
    // 10. Codeium / Windsurf: Official logo
    'codeium.svg': 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/codeium-color.svg',
  };

  for (const [filename, url] of Object.entries(sources)) {
    console.log(`Fetching ${filename} from ${url}...`);
    const svgContent = await fetchUrl(url);
    if (svgContent) {
      const dest = path.join(targetDir, filename);
      fs.writeFileSync(dest, svgContent, 'utf-8');
      console.log(` -> Successfully saved ${dest} (${svgContent.length} bytes)`);
    } else {
      console.log(` -> Failed to fetch ${filename}`);
    }
  }
}

main();
