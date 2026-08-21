import re

with open(r'src/assets/brands/perplexity_official.svg', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract the d attribute of path cls-2
m = re.search(r'<path class="cls-2" d="([^"]+)"/>', text)
if m:
    d_path = m.group(1)
    svg_clean = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="34 0 116 36" height="36" width="116" fill="none">
  <path fill="#000000" d="{d_path}"/>
</svg>'''
    with open(r'src/assets/brands/perplexity.svg', 'w', encoding='utf-8') as out_f:
        out_f.write(svg_clean)
    print('Successfully wrote pure vector perplexity.svg')
else:
    print('Failed to find cls-2 path')
