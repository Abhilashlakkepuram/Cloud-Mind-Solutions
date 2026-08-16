"""Worst-case text contrast over the hero background video.

    python scripts/hero-contrast.py

Requires `pip install pillow imageio-ffmpeg` (imageio-ffmpeg bundles its own
ffmpeg binary — nothing is installed system-wide).

Why this exists
---------------
A still image can be checked once. A video cannot: the hero clip is 8 seconds
of moving light, and a frame that is dark behind the headline at t=2s may be
bright at t=5s. Checking a single frame gave 8.95:1 for the headline and
4.50:1 for the mono line; sampling every frame revealed the real worst cases
were 4.72:1 and 2.00:1 — the mono line failed AA outright.

So this samples the whole loop, composites the CSS scrim over each frame in
the region the copy occupies, and reports the worst contrast any reader could
actually encounter. Exits non-zero if anything drops below its threshold.

Keep SCRIM_STOPS in sync with the gradient in src/components/home/Hero.tsx.
"""

import os
import subprocess
import sys
import tempfile
from math import pow

try:
    import imageio_ffmpeg
    from PIL import Image
except ImportError:
    sys.exit("Missing dependencies. Run: pip install pillow imageio-ffmpeg")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO = os.path.join(ROOT, "public", "assets", "banner", "home-banner.mp4")

INK_900 = (6, 15, 32)

# (position 0-1, alpha) — mirrors the linear-gradient in Hero.tsx.
SCRIM_STOPS = [(0.00, 1.00), (0.34, 0.96), (0.50, 0.88),
               (0.62, 0.40), (0.76, 0.10), (1.00, 0.28)]

# Region the copy occupies, as fractions of the hero box.
TEXT_X = (0.06, 0.52)
TEXT_Y = (0.20, 0.90)

# (label, foreground, alpha, minimum ratio)
TARGETS = [
    ("headline  white",      (255, 255, 255), 1.00, 4.5),
    ("lede      white/75",   (255, 255, 255), 0.75, 4.5),
    ("mono spec white/70",   (255, 255, 255), 0.70, 4.5),
]

FPS = 4  # frames sampled per second of footage


def _lin(v):
    v /= 255
    return v / 12.92 if v <= 0.04045 else pow((v + 0.055) / 1.055, 2.4)


def luminance(c):
    return 0.2126 * _lin(c[0]) + 0.7152 * _lin(c[1]) + 0.0722 * _lin(c[2])


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def composite(fg, bg, alpha):
    return tuple(round(alpha * f + (1 - alpha) * b) for f, b in zip(fg, bg))


def scrim_alpha(t):
    for i in range(len(SCRIM_STOPS) - 1):
        (p0, a0), (p1, a1) = SCRIM_STOPS[i], SCRIM_STOPS[i + 1]
        if p0 <= t <= p1:
            f = (t - p0) / (p1 - p0) if p1 > p0 else 0
            return a0 + (a1 - a0) * f
    return SCRIM_STOPS[-1][1]


def main():
    if not os.path.exists(VIDEO):
        sys.exit(f"Video not found: {VIDEO}")

    tmp = tempfile.mkdtemp()
    subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-i", VIDEO,
         "-vf", f"fps={FPS},scale=640:-1", os.path.join(tmp, "f%03d.png")],
        capture_output=True,
    )
    names = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
    if not names:
        sys.exit("ffmpeg produced no frames.")
    frames = [Image.open(os.path.join(tmp, n)).convert("RGB") for n in names]
    print(f"Sampled {len(frames)} frames from {os.path.basename(VIDEO)}\n")

    failures = []
    for label, fg, alpha, minimum in TARGETS:
        worst, worst_at = 999.0, None
        for name, im in zip(names, frames):
            w, h = im.size
            for x in range(int(TEXT_X[0] * w), int(TEXT_X[1] * w), 6):
                a = scrim_alpha(x / w)
                for y in range(int(TEXT_Y[0] * h), int(TEXT_Y[1] * h), 6):
                    bg = composite(INK_900, im.getpixel((x, y)), a)
                    c = contrast(composite(fg, bg, alpha), bg)
                    if c < worst:
                        worst, worst_at = c, name
        ok = worst >= minimum
        if not ok:
            failures.append((label, worst, minimum))
        print(f"{'PASS' if ok else 'FAIL'}  {label:<22} {worst:6.2f}:1  "
              f"(min {minimum}, worst frame {worst_at})")

    if failures:
        print(f"\n{len(failures)} target(s) below threshold — darken the scrim "
              f"or raise the text opacity in Hero.tsx.")
        return 1
    print("\nAll hero text clears AA against every frame.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
