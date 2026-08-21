import os
import re
from PIL import Image

brands_dir = r'c:\Users\himan\OneDrive\Documents\brain_vault\frontend\src\assets\brands'

for f in sorted(os.listdir(brands_dir)):
    p = os.path.join(brands_dir, f)
    if f.endswith('.png'):
        im = Image.open(p)
        bbox = im.getbbox()
        w, h = im.size
        bw = bbox[2] - bbox[0]
        bh = bbox[3] - bbox[1]
        print(f'{f}: size=({w}, {h}), bbox={bbox}, content_size=({bw}, {bh}), padding_top={bbox[1]}, padding_bottom={h - bbox[3]}')
    elif f.endswith('.svg'):
        with open(p, 'r', encoding='utf-8') as svg_f:
            content = svg_f.read()
            vb = re.search(r'viewBox="([^"]+)"', content)
            w = re.search(r'width="([^"]+)"', content)
            h = re.search(r'height="([^"]+)"', content)
            print(f'{f}: viewBox={vb.group(1) if vb else "None"}, w={w.group(1) if w else "None"}, h={h.group(1) if h else "None"}')
