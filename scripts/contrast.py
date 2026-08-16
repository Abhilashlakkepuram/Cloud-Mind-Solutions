"""WCAG contrast check for the CloudMind palette.

Run after any colour change:  python scripts/contrast.py
Exits non-zero if a pair marked `required` drops below its threshold, so this
can be wired into CI.
"""

import sys

PALETTE = {
    "navy-ink": "#0B1E3D",
    "blue-deep": "#1E4FD6",
    "blue-primary": "#2E6DF6",
    "cyan-bright": "#38BDF8",
    "slate-gray": "#6B7280",
    "paper-100": "#F7F9FC",
    "white": "#FFFFFF",
    "ink-900": "#060F20",
    "ink-800": "#0B1E3D",
}


def _lin(c: int) -> float:
    s = c / 255
    return s / 12.92 if s <= 0.04045 else ((s + 0.055) / 1.055) ** 2.4


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def ratio(fg: str, bg: str) -> float:
    a, b = luminance(fg), luminance(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def over(fg: str, bg: str, alpha: float) -> str:
    """Composite a translucent foreground over an opaque background."""
    f, b = fg.lstrip("#"), bg.lstrip("#")
    out = ""
    for i in (0, 2, 4):
        out += "%02x" % round(alpha * int(f[i : i + 2], 16) + (1 - alpha) * int(b[i : i + 2], 16))
    return "#" + out


P = PALETTE
# (label, foreground, background, minimum) — 4.5 for body text, 3.0 for
# large text and meaningful graphics.
CHECKS = [
    ("navy-ink on white", P["navy-ink"], P["white"], 4.5),
    ("navy-ink on paper-100", P["navy-ink"], P["paper-100"], 4.5),
    ("slate-gray on white", P["slate-gray"], P["white"], 4.5),
    ("slate-gray on paper-100", P["slate-gray"], P["paper-100"], 4.5),
    ("blue-deep on white", P["blue-deep"], P["white"], 4.5),
    ("blue-deep on paper-100", P["blue-deep"], P["paper-100"], 4.5),
    ("white on blue-primary", P["white"], P["blue-primary"], 4.5),
    ("white on blue-deep", P["white"], P["blue-deep"], 4.5),
    ("blue-primary icon on white", P["blue-primary"], P["white"], 3.0),
    ("white on ink-800", P["white"], P["ink-800"], 4.5),
    ("white on ink-900", P["white"], P["ink-900"], 4.5),
    ("white/65 on ink-800", over(P["white"], P["ink-800"], 0.65), P["ink-800"], 4.5),
    ("white/60 on ink-800", over(P["white"], P["ink-800"], 0.60), P["ink-800"], 4.5),
    ("cyan-bright on ink-800", P["cyan-bright"], P["ink-800"], 4.5),
    ("cyan-bright on ink-900", P["cyan-bright"], P["ink-900"], 4.5),
]


def main() -> int:
    failures = []
    for label, fg, bg, minimum in CHECKS:
        r = ratio(fg, bg)
        ok = r >= minimum
        if not ok:
            failures.append((label, r, minimum))
        print(f"{'PASS' if ok else 'FAIL'}  {label:<30} {r:6.2f}:1  (min {minimum})")

    if failures:
        print(f"\n{len(failures)} pair(s) below threshold:")
        for label, r, minimum in failures:
            print(f"  - {label}: {r:.2f}:1 < {minimum}")
        return 1

    print("\nAll pairs pass.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
