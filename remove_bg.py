import rembg
from PIL import Image
for i in range(1, 6):
    try:
        img = Image.open(f'public/hero/hero{i}.png')
        out = rembg.remove(img)
        out.save(f'public/hero/hero{i}_transparent.png')
        print(f'Processed hero{i}.png')
    except Exception as e:
        print(f'Error on {i}:', e)