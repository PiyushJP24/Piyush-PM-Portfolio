from PIL import Image, ImageDraw
import random

A = '/app/frontend/public/assets/'
CREAM = (247, 243, 234)
PANEL = (239, 233, 218)
INK = (34, 38, 31)
FOREST = (62, 92, 70)
SAGE = (163, 184, 160)
W, H = 1200, 750

def grain(im, alpha=0.05, sigma=16):
    n = Image.effect_noise(im.size, sigma).convert('L')
    return Image.blend(im, Image.merge('RGB', (n, n, n)), alpha)

def grid(d, color=(34, 38, 31, 12), step=80):
    for x in range(0, W, step):
        d.line([(x, 0), (x, H)], fill=color)
    for y in range(0, H, step):
        d.line([(0, y), (W, y)], fill=color)

# viz-1: bar chart on cream (Netflix usage)
im = Image.new('RGB', (W, H), CREAM)
d = ImageDraw.Draw(im, 'RGBA')
grid(d)
bars = [90, 140, 120, 180, 220, 260, 240, 300, 340, 380]
for i, hv in enumerate(bars):
    x = 110 + i * 100
    d.rounded_rectangle([x, H - 90 - hv, x + 52, H - 90], radius=8, fill=FOREST + (255,))
d.line([(70, H - 90), (W - 60, H - 90)], fill=INK + (180,), width=3)
d.line([(70, 60), (70, H - 90)], fill=INK + (180,), width=3)
grain(im).save(A + 'viz-1.jpg', quality=85)

# viz-2: scatter clusters on panel (Spotify clustering)
random.seed(7)
im = Image.new('RGB', (W, H), PANEL)
d = ImageDraw.Draw(im, 'RGBA')
grid(d)
for (cx, cy), c in [((320, 300), FOREST), ((780, 420), INK), ((580, 190), SAGE)]:
    for _ in range(46):
        x = cx + random.gauss(0, 85)
        y = cy + random.gauss(0, 70)
        r = random.uniform(5, 11)
        d.ellipse([x - r, y - r, x + r, y + r], fill=c + (170,))
grain(im).save(A + 'viz-2.jpg', quality=85)

# viz-3: rising line on forest (LLM trends)
im = Image.new('RGB', (W, H), FOREST)
d = ImageDraw.Draw(im, 'RGBA')
grid(d, color=(247, 243, 234, 14))
pts = [(90, 620), (240, 590), (390, 540), (540, 470), (690, 400), (840, 300), (990, 210), (1110, 140)]
d.polygon(pts + [(1110, H - 40), (90, H - 40)], fill=(247, 243, 234, 28))
d.line(pts, fill=CREAM + (255,), width=6, joint='curve')
for x, y in pts:
    d.ellipse([x - 9, y - 9, x + 9, y + 9], fill=SAGE + (255,))
d.line([(90, H - 40), (W - 60, H - 40)], fill=CREAM + (150,), width=3)
grain(im).save(A + 'viz-3.jpg', quality=85)
print('viz thumbs saved')
