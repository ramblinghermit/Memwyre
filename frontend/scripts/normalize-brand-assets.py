import os
import re
from PIL import Image

brands_dir = r'c:\Users\himan\OneDrive\Documents\brain_vault\frontend\src\assets\brands'

# 1. Autocrop PNGs
for png_name in ['windsurf.png', 'openai.png', 'notion.png']:
    png_path = os.path.join(brands_dir, png_name)
    if os.path.exists(png_path):
        im = Image.open(png_path).convert('RGBA')
        bbox = im.getbbox()
        if bbox:
            # Crop to bbox with a tiny 2px padding
            cropped = im.crop(bbox)
            cropped.save(png_path)
            print(f'Cropped {png_name}: new size = {cropped.size}')

# 2. Fix VS Code SVG viewBox
vscode_path = os.path.join(brands_dir, 'vscode.svg')
if os.path.exists(vscode_path):
    with open(vscode_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Add viewBox="0 0 120 60" if missing
    if 'viewBox' not in content:
        content = content.replace('<svg ', '<svg viewBox="0 0 120 60" ')
        with open(vscode_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated vscode.svg with viewBox')

# 3. Create a pristine VS Code horizontal lockup if needed
# Official VS Code Ribbon + "Visual Studio Code" text
vscode_clean = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 70" height="70" width="340" fill="none">
  <!-- VS Code Ribbon -->
  <g transform="translate(0, 5) scale(0.6)">
    <mask id="vsc-m" width="100" height="100" x="0" y="0" mask-type="alpha" maskUnits="userSpaceOnUse">
      <path fill="#fff" fill-rule="evenodd" d="M70.912 99.317a6.223 6.223 0 0 0 4.96-.19l20.589-9.907A6.25 6.25 0 0 0 100 83.587V16.413a6.25 6.25 0 0 0-3.54-5.632L75.874.874a6.226 6.226 0 0 0-7.104 1.21L29.355 38.04 12.187 25.01a4.162 4.162 0 0 0-5.318.236l-5.506 5.009a4.168 4.168 0 0 0-.004 6.162L16.247 50 1.36 63.583a4.168 4.168 0 0 0 .004 6.162l5.506 5.01a4.162 4.162 0 0 0 5.318.236l17.168-13.032L68.77 97.917a6.217 6.217 0 0 0 2.143 1.4ZM75.015 27.3 45.11 50l29.906 22.701V27.3Z" clip-rule="evenodd"/>
    </mask>
    <g mask="url(#vsc-m)">
      <path fill="#0065A9" d="M96.461 10.796 75.857.876a6.23 6.23 0 0 0-7.107 1.207l-67.451 61.5a4.167 4.167 0 0 0 .004 6.162l5.51 5.009a4.167 4.167 0 0 0 5.32.236l81.228-61.62c2.725-2.067 6.639-.124 6.639 3.297v-.24a6.25 6.25 0 0 0-3.539-5.63Z"/>
      <path fill="#007ACC" d="m96.461 89.204-20.604 9.92a6.229 6.229 0 0 1-7.107-1.207l-67.451-61.5a4.167 4.167 0 0 1 .004-6.162l5.51-5.009a4.167 4.167 0 0 1 5.32-.236l81.228 61.62c2.725 2.067 6.639.124 6.639-3.297v.24a6.25 6.25 0 0 1-3.539 5.63Z"/>
      <path fill="#1F9CF0" d="M75.858 99.126a6.232 6.232 0 0 1-7.108-1.21c2.306 2.307 6.25.674 6.25-2.588V4.672c0-3.262-3.944-4.895-6.25-2.589a6.232 6.232 0 0 1 7.108-1.21l20.6 9.908A6.25 6.25 0 0 1 100 16.413v67.174a6.25 6.25 0 0 1-3.541 5.633l-20.601 9.906Z"/>
    </g>
  </g>
  <!-- Visual Studio Code Wordmark Paths -->
  <g transform="translate(72, 14)" fill="#000000">
    <text x="0" y="32" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="30" font-weight="700" letter-spacing="-0.5">Visual Studio Code</text>
  </g>
</svg>'''
with open(os.path.join(brands_dir, 'vscode.svg'), 'w', encoding='utf-8') as f:
    f.write(vscode_clean)
print('Wrote balanced vscode.svg')

# 4. Clean Grok SVG
grok_clean = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 56" height="56" width="190" fill="none">
  <g transform="translate(0, 6)">
    <svg viewBox="0 0 24 24" width="44" height="44" fill="#000000">
      <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" fill-rule="evenodd"/>
    </svg>
  </g>
  <g transform="translate(54, 12)" fill="#000000">
    <text x="0" y="28" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="32" font-weight="800" letter-spacing="-0.5">Grok</text>
  </g>
</svg>'''
with open(os.path.join(brands_dir, 'grok.svg'), 'w', encoding='utf-8') as f:
    f.write(grok_clean)
print('Wrote balanced grok.svg')

# 5. Clean Perplexity SVG (tight viewBox)
perplexity_clean = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 56" height="56" width="240" fill="none">
  <g transform="translate(0, 6)">
    <svg viewBox="0 0 24 24" width="44" height="44" fill="#22B8CD">
      <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z" fill-rule="nonzero"/>
    </svg>
  </g>
  <g transform="translate(54, 12)" fill="#000000">
    <text x="0" y="27" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="29" font-weight="600" letter-spacing="-0.3">perplexity</text>
  </g>
</svg>'''
with open(os.path.join(brands_dir, 'perplexity.svg'), 'w', encoding='utf-8') as f:
    f.write(perplexity_clean)
print('Wrote balanced perplexity.svg')
