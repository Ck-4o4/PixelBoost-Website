from PIL import Image
import glob
import os
import math

def get_thumbnail(path):
    try:
        img = Image.open(path).convert('RGB')
        return img.resize((32, 32))
    except Exception:
        return None

target1 = get_thumbnail('/Users/ck/.gemini/antigravity-ide/brain/cdd62b25-7ef6-4a7e-8f44-1e0910d4ff3e/media__1783527256727.jpg')
target2 = get_thumbnail('/Users/ck/.gemini/antigravity-ide/brain/cdd62b25-7ef6-4a7e-8f44-1e0910d4ff3e/media__1783527207184.jpg')

def get_diff(img1, img2):
    diff = 0
    d1 = list(img1.getdata())
    d2 = list(img2.getdata())
    for (r1,g1,b1), (r2,g2,b2) in zip(d1, d2):
        diff += (r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2
    return diff

for f in glob.glob('public/*.*'):
    img = get_thumbnail(f)
    if img:
        d1 = get_diff(target1, img)
        d2 = get_diff(target2, img)
        print(f"{os.path.basename(f)}: diff1={d1} diff2={d2}")
