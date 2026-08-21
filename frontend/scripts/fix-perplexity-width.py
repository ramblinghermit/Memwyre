with open('src/assets/brands/perplexity.svg', 'r', encoding='utf-8') as f:
    txt = f.read()

path_content = txt[txt.find('<path'):txt.find('</svg>')].strip()

# Width is expanded to 122 starting at x=34 (right edge = 156), ensuring full letter 'y' has zero clipping
new_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="34 2 122 28" height="28" width="122" fill="none">
  {path_content}
</svg>
'''

with open('src/assets/brands/perplexity.svg', 'w', encoding='utf-8') as f:
    f.write(new_svg)

print('Updated perplexity.svg with generous width and padding!')
