import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brandsDir = path.join(__dirname, '../src/assets/brands');
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

// 1. Claude Wordmark (Matching user's screenshot exactly: coral sunburst + serif Claude)
const claudeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 56" height="56" width="210" fill="none">
  <g transform="translate(4, 5)">
    <svg viewBox="0 0 24 24" width="46" height="46" fill="#D97756">
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill-rule="nonzero"/>
    </svg>
  </g>
  <text x="62" y="38" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="500" fill="#000000" letter-spacing="-0.5">Claude</text>
</svg>`;

// 2. OpenAI Wordmark
const openaiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 56" height="56" width="200" fill="none">
  <g transform="translate(4, 8)">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="#000000">
      <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26-.095-1.88-.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" fill-rule="evenodd"/>
    </svg>
  </g>
  <text x="56" y="37" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="28" font-weight="700" fill="#000000" letter-spacing="-0.5">OpenAI</text>
</svg>`;

// 3. Cursor Wordmark
const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 56" height="56" width="190" fill="none">
  <g transform="translate(4, 9)">
    <svg viewBox="0 0 466.73 532.09" width="36" height="38">
      <path d="M233.36 0L0 134.73v262.63l233.36 134.73 233.37-134.73V134.73L233.36 0z" fill="#000000"/>
      <path d="M233.36 43.57l195.59 112.92-195.59 112.93L37.77 156.49 233.36 43.57z" fill="#444444"/>
      <path d="M37.77 186.95l177.67 102.58v205.15L37.77 392.1V186.95z" fill="#1a1a1a"/>
      <path d="M251.29 494.68V289.53l177.67-102.58v205.15L251.29 494.68z" fill="#666666"/>
    </svg>
  </g>
  <text x="52" y="37" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="28" font-weight="800" fill="#000000" letter-spacing="-0.8">Cursor</text>
</svg>`;

// 4. VS Code Wordmark
const vscodeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 56" height="56" width="220" fill="none">
  <g transform="translate(4, 7)">
    <svg viewBox="0 0 100 100" width="42" height="42">
      <path d="M74.4531 6.8125L49.0312 30.5625L30.9375 16.7812C28.9102 15.2266 26.0469 15.6992 24.582 17.7852L17.7852 27.4727C16.3203 29.5586 16.793 32.4219 18.8789 33.8867L35.6562 46.7188L18.8789 59.5508C16.793 61.0156 16.3203 63.8789 17.7852 65.9648L24.582 75.6523C26.0469 77.7383 28.9102 78.2109 30.9375 76.6562L49.0312 62.875L74.4531 86.625C76.8125 88.8281 80.5312 87.8906 81.6562 84.8438L98.5312 21.0938C99.4219 17.7031 96.6562 14.4688 93.1875 14.8281L74.4531 6.8125Z" fill="#007ACC"/>
      <path d="M74.4531 6.8125L49.0312 30.5625L74.4531 54.3125V6.8125Z" fill="#0065A9"/>
      <path d="M74.4531 86.625L49.0312 62.875L74.4531 39.125V86.625Z" fill="#0065A9"/>
      <path d="M49.0312 30.5625L30.9375 16.7812C28.9102 15.2266 26.0469 15.6992 24.582 17.7852L17.7852 27.4727C16.3203 29.5586 16.793 32.4219 18.8789 33.8867L35.6562 46.7188L49.0312 30.5625Z" fill="#1F8AD2"/>
      <path d="M49.0312 62.875L30.9375 76.6562C28.9102 78.2109 26.0469 77.7383 24.582 75.6523L17.7852 65.9648C16.3203 63.8789 16.793 61.0156 18.8789 59.5508L35.6562 46.7188L49.0312 62.875Z" fill="#1F8AD2"/>
    </svg>
  </g>
  <text x="56" y="37" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="28" font-weight="700" fill="#000000" letter-spacing="-0.5">VS Code</text>
</svg>`;

// 5. Windsurf Wordmark
const windsurfSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 56" height="56" width="210" fill="none">
  <g transform="translate(4, 8)">
    <rect width="40" height="40" rx="9" fill="#F4F1EA" stroke="#E2DFD6" stroke-width="1.2"/>
    <path d="M11 19c2.2 4.5 4 8 5.8 8s3.2-3 5-8c1.8 5 3.2 8 5 8s3.6-3.5 5.8-8" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="56" y="37" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="27" font-weight="700" fill="#000000" letter-spacing="-0.5">Windsurf</text>
</svg>`;

// 6. Claude Code Wordmark
const claudecodeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 56" height="56" width="250" fill="none">
  <g transform="translate(4, 9)">
    <svg viewBox="0 0 24 24" width="38" height="38" fill="#D97756">
      <path clip-rule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fill-rule="evenodd"/>
    </svg>
  </g>
  <text x="52" y="37" font-family="'SF Mono', 'Courier New', monospace, 'Segoe UI'" font-size="24" font-weight="700" fill="#000000" letter-spacing="-0.5">Claude Code</text>
</svg>`;

// 7. Google Gemini Wordmark
const geminiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 56" height="56" width="200" fill="none">
  <defs>
    <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4285F4"/>
      <stop offset="50%" stop-color="#9B72CB"/>
      <stop offset="100%" stop-color="#D96570"/>
    </linearGradient>
  </defs>
  <g transform="translate(4, 7)">
    <svg viewBox="0 0 24 24" width="42" height="42">
      <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#gemini-grad)"/>
    </svg>
  </g>
  <text x="56" y="37" font-family="'Product Sans', 'Segoe UI', sans-serif" font-size="28" font-weight="700" fill="#1F1F1F" letter-spacing="-0.5">Gemini</text>
</svg>`;

// 8. Perplexity Wordmark
const perplexitySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 56" height="56" width="220" fill="none">
  <g transform="translate(4, 8)">
    <svg viewBox="0 0 24 24" width="40" height="40" fill="#22B8CD">
      <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z" fill-rule="nonzero"/>
    </svg>
  </g>
  <text x="54" y="36" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="25" font-weight="600" fill="#000000" letter-spacing="-0.3">perplexity</text>
</svg>`;

// 9. Notion Wordmark
const notionSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 56" height="56" width="180" fill="none">
  <g transform="translate(4, 7)">
    <svg viewBox="0 0 32 32" width="42" height="42" fill="#000000">
      <path d="M26.974 5.289l-4.148-3.074c-.943-.728-2.51-.817-3.921-.197l-12.756 5.9c-.838.388-1.517 1.34-1.517 2.126v16.147c0 .786.679 1.488 1.517 1.564l17.702 1.568c.838.076 1.517-.506 1.517-1.292V6.657c0-.786-.452-1.368-1.394-.002v-1.366zm-5.748.243v1.895l-7.986 3.737v-1.895l7.986-3.737zm-9.38 5.753l7.986-3.737v14.471l-7.986 3.737V11.285zm10.774 12.576l-1.394.652V8.026l1.394-.652v16.487z"/>
    </svg>
  </g>
  <text x="56" y="37" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="28" font-weight="700" fill="#000000" letter-spacing="-0.8">Notion</text>
</svg>`;

// 10. OpenClaw Wordmark
const openclawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 56" height="56" width="230" fill="none">
  <g transform="translate(4, 7)">
    <svg viewBox="0 0 24 24" width="42" height="42">
      <path d="M12 2.568c-6.33 0-9.495 5.275-9.495 9.495 0 4.22 3.165 8.44 6.33 9.494v2.11h2.11v-2.11s1.055.422 2.11 0v2.11h2.11v-2.11c3.165-1.055 6.33-5.274 6.33-9.494S18.33 2.568 12 2.568z" fill="#FF4D4D"/>
      <path d="M8.835 9.109a1.266 1.266 0 100-2.532 1.266 1.266 0 000 2.532zM15.165 9.109a1.266 1.266 0 100-2.532 1.266 1.266 0 000 2.532z" fill="#050810"/>
    </svg>
  </g>
  <text x="54" y="37" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="27" font-weight="800" fill="#000000" letter-spacing="-0.5">OpenClaw</text>
</svg>`;

// 11. Google Drive Wordmark
const gdriveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 56" height="56" width="240" fill="none">
  <g transform="translate(4, 8)">
    <svg viewBox="0 0 87.3 78" width="44" height="40">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
      <path d="m57.4 1.2-13.75 23.8 13.75 23.8h27.5c0-1.55-.4-3.1-1.2-4.5l-22.95-39.8c-.8-1.4-1.95-2.5-3.3-3.3z" fill="#ffba00"/>
      <path d="m71.2 48.8h-55.1l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h69.6c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
    </svg>
  </g>
  <text x="56" y="37" font-family="'Product Sans', 'Segoe UI', sans-serif" font-size="25" font-weight="600" fill="#3C4043" letter-spacing="-0.5">Google Drive</text>
</svg>`;

// 12. xAI Grok Wordmark
const grokSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 56" height="56" width="170" fill="none">
  <g transform="translate(4, 7)">
    <svg viewBox="0 0 24 24" width="42" height="42" fill="#000000">
      <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" fill-rule="evenodd"/>
    </svg>
  </g>
  <text x="54" y="37" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="28" font-weight="800" fill="#000000" letter-spacing="-0.5">Grok</text>
</svg>`;

// 13. Antigravity Wordmark
const antigravitySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 56" height="56" width="240" fill="none">
  <g transform="translate(4, 7)">
    <circle cx="21" cy="21" r="19" fill="#1A73E8"/>
    <path d="M21 9L30 26H12L21 9Z" fill="#FFFFFF"/>
    <circle cx="21" cy="22" r="3.5" fill="#EA4335"/>
  </g>
  <text x="54" y="37" font-family="'Product Sans', 'Segoe UI', sans-serif" font-size="25" font-weight="700" fill="#202124" letter-spacing="-0.5">Antigravity</text>
</svg>`;

const files = {
  'claude.svg': claudeSvg,
  'openai.svg': openaiSvg,
  'cursor.svg': cursorSvg,
  'vscode.svg': vscodeSvg,
  'windsurf.svg': windsurfSvg,
  'claudecode.svg': claudecodeSvg,
  'gemini.svg': geminiSvg,
  'perplexity.svg': perplexitySvg,
  'notion.svg': notionSvg,
  'openclaw.svg': openclawSvg,
  'gdrive.svg': gdriveSvg,
  'grok.svg': grokSvg,
  'antigravity.svg': antigravitySvg,
};

for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(brandsDir, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Wrote ${filePath}`);
}
