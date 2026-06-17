import rembg
from PIL import Image
for i in [3, 4]:
    img = Image.open(f'public/hero/hero{i}_scene.png')
    out = rembg.remove(img)
    out.save(f'public/hero/hero{i}_transparent.png')
    print(f'Processed hero{i}')