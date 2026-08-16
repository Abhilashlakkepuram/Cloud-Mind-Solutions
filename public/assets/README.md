# Asset drop points

Nothing in this repo ships with a real image. Every slot is rendered by
`<ImagePlaceholder>` at the exact final aspect ratio, with the intended content
and dimensions printed on the placeholder itself.

Drop real files here and wire them up by adding a single `src` prop — no layout,
sizing, or alt-text changes are needed.

| Folder | Contents | Wired up in |
|---|---|---|
| `logo/` | Source artwork + derived variants | `src/components/ui/Logo.tsx` |
| `og/` | `default.png` (1200×630) | `src/app/layout.tsx` metadata |
| `banner/` | Hero background video + poster | `src/components/home/Hero.tsx` |
| `team/` | Leadership headshots, office photography | About page |
| `blog/` | Post cover images, 1200×675 | Blog index + post template |
| `clients/` | Client logos, 160×60 — **unused today** (the home strip shows platforms, not clients) | — |

## Hero background video

`banner/home-banner.mp4` + `banner/home-banner-poster.jpg` are **derived**, not
the originals. `banner/home banner.mp4` is the source as supplied — keep it.

The source needed three fixes before it could ship:

1. **A "Veo" watermark** in the bottom-right corner (it is AI-generated stock)
2. Letterbox bars top and bottom
3. An audio track, useless on a muted background video

All three are handled by one crop-and-encode:

```bash
ffmpeg -i "home banner.mp4" -an -vf "crop=1280:680:0:8" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart home-banner.mp4

ffmpeg -ss 2.0 -i "home banner.mp4" -vf "crop=1280:680:0:8" \
  -frames:v 1 -q:v 4 home-banner-poster.jpg
```

`crop=W:H:X:Y` keeps y 8–688, which drops both bars and the watermark
(y≈693–707). Result: **2621 KB → 1126 KB**, plus a 69 KB poster.

**If new footage is supplied, re-run `python scripts/hero-contrast.py`.** The
hero scrim is tuned to the specific brightness of this clip; different footage
will move the worst-case text contrast.

`banner/CatBanner.mp4` is unreferenced — delete it or wire it up.

The favicon lives at `src/app/favicon.ico` (Next.js file convention) — replace
that file directly with the real mark.

## Swapping a placeholder

```tsx
// before
<ImagePlaceholder label="Team photo" width={1200} height={800} context="About hero" />

// after — one prop
<ImagePlaceholder src="/assets/team/office.jpg" label="Team photo" width={1200} height={800} context="About hero" />
```

`ImagePlaceholder` switches to `next/image` automatically when `src` is present,
and reuses `label` as the alt text.
