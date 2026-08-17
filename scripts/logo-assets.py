"""Derive every logo asset from the single supplied source file.

    python scripts/logo-assets.py

Requires Pillow (`pip install pillow`). Idempotent — safe to re-run, and the
only thing you need to touch if the client supplies new artwork: drop the new
file in as SOURCE and run this.

Why the derived variants exist
------------------------------
The supplied lockup is built for LIGHT backgrounds. Its circuit strokes are
#001551, which measures 1.15:1 against our ink-900 header — effectively
invisible. The `-ondark` variants lift only those dark strokes to white
(19.14:1) and leave the blue cloud gradient untouched, which is standard
knockout practice for a dark surface.

The supplied lockup is also STACKED (1.48:1). At header height that renders the
wordmark ~10px tall, so the header uses the mark alone beside live type. See
src/components/ui/Logo.tsx.
"""

import os

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO_DIR = os.path.join(ROOT, "public", "assets", "logo")
OG_DIR = os.path.join(ROOT, "public", "assets", "og")
APP_DIR = os.path.join(ROOT, "src", "app")

SOURCE = os.path.join(LOGO_DIR, "e0262132-8b83-4283-94a9-d5d9b0276262.png")

# Content bands measured from the source by row-alpha profile.
MARK_BOTTOM = 600      # cloud mark ends
LOCKUP_BOTTOM = 925    # after "SOLUTIONS", before the tagline

# Knockout curve. Full white below LO, untouched above HI, linear between.
# The cloud gradient's darkest stop (#1E4FD6) has max channel 214 — safely above HI.
LO, HI = 100, 170


def alpha_bbox(img, threshold):
    """Bounding box of pixels whose alpha exceeds `threshold`."""
    return img.split()[3].point(lambda v: 255 if v > threshold else 0).getbbox()


def save(img, path, max_w=None):
    if max_w and img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    img.save(path, "PNG", optimize=True)
    print(f"  {os.path.basename(path):<34} {img.width:>4} x {img.height:<4} "
          f"{os.path.getsize(path) / 1024:>7.1f} KB")
    return img


def knockout_image(im):
    """Lift dark navy artwork to white so it reads on a dark surface."""
    im = im.convert("RGBA").copy()
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            mx = max(r, g, b)
            if mx >= HI:
                continue
            t = 1.0 if mx <= LO else (HI - mx) / (HI - LO)
            px[x, y] = (round(r + (255 - r) * t),
                        round(g + (255 - g) * t),
                        round(b + (255 - b) * t), a)
    return im


def knockout(src_path, dst_path):
    im = knockout_image(Image.open(src_path))
    im.save(dst_path, "PNG", optimize=True)
    print(f"  {os.path.basename(dst_path):<34} {im.width:>4} x {im.height:<4} "
          f"{os.path.getsize(dst_path) / 1024:>7.1f} KB   (knockout)")
    return im


def build_og_card(lockup):
    """1200x630 share card: ink-900 substrate, brand glows, centred lockup."""
    W, H = 1200, 630
    card = Image.new("RGBA", (W, H), (6, 15, 32, 255))

    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 72):
        gd.line([(x, 0), (x, H)], fill=(56, 189, 248, 255))
    for y in range(0, H, 72):
        gd.line([(0, y), (W, y)], fill=(56, 189, 248, 255))
    grid.putalpha(grid.split()[3].point(lambda v: int(v * 0.10)))
    card.alpha_composite(grid)

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gl = ImageDraw.Draw(glow)
    for cx, cy, radius, tint in [
        (int(W * 0.86), int(H * 0.08), 480, (56, 189, 248)),
        (int(W * 0.10), int(H * 0.95), 380, (30, 79, 214)),
    ]:
        for i in range(radius, 0, -6):
            gl.ellipse([cx - i, cy - i, cx + i, cy + i],
                       fill=(*tint, int(26 * (1 - i / radius) ** 2)))
    card.alpha_composite(glow)

    lw = int(W * 0.52)
    lock = lockup.resize((lw, round(lockup.height * lw / lockup.width)), Image.LANCZOS)
    card.alpha_composite(lock, ((W - lock.width) // 2, (H - lock.height) // 2 - 8))

    d = ImageDraw.Draw(card)
    for x in range(W):
        t = x / W
        a = 0 if (t < 0.15 or t > 0.9) else int(
            210 * min(1, (t - 0.15) / 0.2) * min(1, (0.9 - t) / 0.2))
        d.line([(x, H - 4), (x, H)],
               fill=(round(30 + 26 * t), round(79 + 110 * t), round(214 + 34 * t), a))

    os.makedirs(OG_DIR, exist_ok=True)
    path = os.path.join(OG_DIR, "default.png")
    card.convert("RGB").save(path, "PNG", optimize=True)
    print(f"  {'og/default.png':<34} {W:>4} x {H:<4} "
          f"{os.path.getsize(path) / 1024:>7.1f} KB")


def main():
    if not os.path.exists(SOURCE):
        raise SystemExit(f"Source artwork not found: {SOURCE}")

    im = Image.open(SOURCE).convert("RGBA")
    W, _ = im.size
    print(f"Source: {os.path.basename(SOURCE)}  {im.width}x{im.height}\n")
    print("Light-surface variants:")

    mark_region = im.crop((0, 0, W, MARK_BOTTOM))
    save(mark_region.crop(alpha_bbox(mark_region, 6)),
         os.path.join(LOGO_DIR, "cloudmind-mark.png"), 512)

    lock_region = im.crop((0, 0, W, LOCKUP_BOTTOM))
    save(lock_region.crop(alpha_bbox(lock_region, 6)),
         os.path.join(LOGO_DIR, "cloudmind-lockup.png"), 900)

    save(im.crop(alpha_bbox(im, 6)),
         os.path.join(LOGO_DIR, "cloudmind-lockup-full.png"), 1200)

    print("\nDark-surface variants:")
    knockout(os.path.join(LOGO_DIR, "cloudmind-mark.png"),
             os.path.join(LOGO_DIR, "cloudmind-mark-ondark.png"))
    knockout(os.path.join(LOGO_DIR, "cloudmind-lockup.png"),
             os.path.join(LOGO_DIR, "cloudmind-lockup-ondark.png"))
    full_dark = knockout(os.path.join(LOGO_DIR, "cloudmind-lockup-full.png"),
                         os.path.join(LOGO_DIR, "cloudmind-lockup-full-ondark.png"))

    print("\nIcons:")
    # Every icon sits on the navy tile, so the mark must be knocked out first —
    # the supplied artwork's #001551 circuit strokes measure 1.15:1 against
    # ink-900 and would leave a hollow cloud outline.
    tight = knockout_image(mark_region).crop(alpha_bbox(mark_region, 90))

    def squared(pad_ratio, background=None):
        """Centre the mark on a square canvas. `background` opaque or None."""
        side = max(tight.size)
        pad = round(side * pad_ratio)
        size = side + pad * 2
        canvas = Image.new("RGBA", (size, size), background or (0, 0, 0, 0))
        canvas.paste(tight, ((size - tight.width) // 2, (size - tight.height) // 2), tight)
        return canvas

    NAVY = (6, 15, 32, 255)

    # favicon.ico — 16/32/48 only. Larger sizes belong in PNG icons; bundling
    # 128 and 256 into the .ico quadrupled the file for no benefit, and the
    # favicon is requested on every single page load.
    #
    # Solid navy tile rather than transparent: a knocked-out mark on
    # transparency vanishes against a light tab bar, and the original dark mark
    # vanishes against a dark one. The tile reads on both.
    ico = os.path.join(APP_DIR, "favicon.ico")
    squared(0.12, NAVY).save(ico, "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"  {'src/app/favicon.ico':<34} 16/32/48   "
          f"{os.path.getsize(ico) / 1024:>7.1f} KB")

    save(squared(0.10).resize((512, 512), Image.LANCZOS),
         os.path.join(LOGO_DIR, "cloudmind-mark-square.png"))

    # iOS ignores transparency on home-screen icons and composites onto black,
    # which kills the circuit strokes. Ship it pre-composited on ink-900.
    apple = squared(0.16, NAVY).resize((180, 180), Image.LANCZOS)
    save(apple, os.path.join(LOGO_DIR, "apple-touch-icon.png"))

    # PWA / Android. `maskable` needs the artwork inside a 40% safe zone,
    # because launchers crop it to whatever shape the OS uses.
    save(squared(0.14, NAVY).resize((192, 192), Image.LANCZOS),
         os.path.join(LOGO_DIR, "icon-192.png"))
    save(squared(0.14, NAVY).resize((512, 512), Image.LANCZOS),
         os.path.join(LOGO_DIR, "icon-512.png"))
    save(squared(0.34, NAVY).resize((512, 512), Image.LANCZOS),
         os.path.join(LOGO_DIR, "icon-maskable-512.png"))

    print("\nShare card:")
    build_og_card(full_dark)
    print("\nDone.")


if __name__ == "__main__":
    main()
