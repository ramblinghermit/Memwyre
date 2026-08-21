with open('src/assets/brands/perplexity.svg', 'r', encoding='utf-8') as f:
    txt = f.read()

# Path starts at <path
path_content = txt[txt.find('<path'):txt.find('</svg>')].strip()

# Tighten the viewBox from (34 0 116 36) to (36 3.5 110 25) so the text fills the height more and scales up ~30%
new_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="36 3.5 110 25" height="25" width="110" fill="none">
  {path_content}
</svg>
'''

with open('src/assets/brands/perplexity.svg', 'w', encoding='utf-8') as f:
    f.write(new_svg)

print('Updated perplexity.svg successfully!')
