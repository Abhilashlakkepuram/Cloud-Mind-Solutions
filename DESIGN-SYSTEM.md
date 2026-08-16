# CloudMind Solutions — Design System

Single source of truth for the visual language. Every token below is declared in
`src/app/globals.css` under `@theme`; nothing here is aspirational.

If you are adding a page, read this first. If you need a value that isn't here,
add it here before you use it — raw hex or one-off px in a component is the one
thing that will pull this site apart.

---

## 1. Colour

All seven brand values are extracted from the logo. **Do not introduce a colour
outside this table.** Status red/green exist for form feedback only and are never
used decoratively.

| Token | Hex | From the logo | Used for |
|---|---|---|---|
| `--color-navy-ink` | `#0B1E3D` | "Cloud" wordmark, circuit strokes | Primary text, dark base |
| `--color-blue-deep` | `#1E4FD6` | Cloud mark gradient, lower-left | Gradient start, button hover |
| `--color-blue-primary` | `#2E6DF6` | "Mind" wordmark | **The single action colour** |
| `--color-cyan-bright` | `#38BDF8` | Cloud mark gradient, upper-right | Gradient end, accents, glow, focus ring |
| `--color-slate-gray` | `#6B7280` | "SOLUTIONS" subtext | Secondary text, captions |
| `--color-paper` / `-100` | `#F7F9FC` | Logo background | Light section background |
| `--color-white` | `#FFFFFF` | Logo background | Card surfaces, text on dark |

### Derived ramps

These are not new colours — they are `navy-ink` and `paper` mixed toward
black/white so dark and light sections have layering instead of one flat fill.

`--color-ink-900 #060F20` · `ink-850 #081629` · `ink-800 #0B1E3D` · `ink-700 #12294D` · `ink-600 #1A3562` · `ink-500 #24447A`

`--color-paper-50 #FBFCFE` · `paper-100 #F7F9FC` · `paper-200 #EEF2F9` · `paper-300 #E2E8F2`

### Signature gradient

```css
linear-gradient(135deg, #1E4FD6 0%, #38BDF8 100%)
```

The exact angle and stops of the cloud mark. Available as the `brand-gradient`
and `brand-gradient-text` utilities. **Never substitute another gradient.**
Reserved for: the primary CTA, one emphasised phrase per hero, the hero
conductors, the conductor fill in *How we work*, and the footer hairline.

### Section rhythm

Sections alternate `dark → white → paper` so no two adjacent sections share a
background. Dark sections carry the `circuit-grid` substrate and cyan accents;
light sections carry navy headings and slate body copy.

**The site header is fixed and transparent until scroll, so every page's first
section must be dark.** This is a hard constraint, not a preference.

### Contrast — measured, not estimated

| Pair | Ratio | |
|---|---|---|
| `navy-ink` on `white` | 16.57:1 | AAA |
| `navy-ink` on `paper-100` | 15.71:1 | AAA |
| `white` on `ink-900` | 19.14:1 | AAA |
| `white` on `ink-800` | 16.57:1 | AAA |
| `cyan-bright` on `ink-800` | 7.73:1 | AAA |
| `white/65` on `ink-800` | 7.60:1 | AAA |
| `white/60` on `ink-800` | 6.67:1 | AA |
| `blue-deep` on `white` | 6.68:1 | AA |
| `slate-gray` on `white` | 4.83:1 | AA |
| `slate-gray` on `paper-100` | 4.58:1 | AA |
| `white` on `blue-primary` | 4.53:1 | AA |
| ~~`blue-primary` on `paper-100`~~ | 4.30:1 | **fails — do not use** |

### The one sanctioned exception

`#25D366` — WhatsApp green — appears on the floating chat button
(`layout/WhatsAppButton.tsx`) and nowhere else. It is a third-party brand mark,
and recognition is the whole function of that control; a navy button with an
unfamiliar glyph does the job worse. The component takes `tone="brand"` to
switch it to the CloudMind gradient if that trade is ever reversed.

**Do not treat this as precedent for other off-palette colour.**

**Two rules fall out of this table:**

1. **Text on light surfaces uses `blue-deep`, not `blue-primary`.** At 4.30:1 on
   `paper-100`, blue-primary fails AA for body and label text. `blue-deep`
   clears it. `blue-primary` is still correct for solid fills (white on it is
   4.53:1), borders, icons, and hover states.
2. `white/60` is the floor for readable body copy on dark. Below that
   (`white/40`, `white/30`) is reserved for 10–11px mono metadata that repeats
   information available elsewhere — never for required reading.

Re-run the check after any colour change:
`python scripts/contrast.py`

---

## 2. Typography

Three faces, three jobs. Loaded via `next/font/google` in `src/app/layout.tsx`
(self-hosted, no external request at runtime).

| Role | Face | Weights | Job |
|---|---|---|---|
| Display | **Space Grotesk** | 500/600/700 | `h1`–`h6`, stat figures, pull quotes |
| Body | **Inter** | 400/500/600 | All prose, UI, buttons, nav |
| Mono | **JetBrains Mono** | 400/500 | Eyebrows, metrics, units, spec labels, timestamps |

Headings use `-0.03em` tracking and `1.05` line-height — Space Grotesk is wide
by default and needs pulling in at display sizes. Body is `1.6` line-height.

### Scale

Fluid `clamp()` throughout; the mobile end never drops below 16px for body.

`--text-micro 11px` (mono only) · `caption 13` · `sm 14` · `base 16` · `lg 18` ·
`xl 20→22` · `2xl 24→30` · `3xl 30→40` · `4xl 36→56` · `5xl 44→80` · `6xl 52→104`

### The mono voice

`.label-mono` — 11px, 500, `0.16em` tracking, uppercase. This is the brand's
technical register. Use it for eyebrows, data keys, and units. **Never for
sentences.** Every `SectionLabel` pairs it with a pulsing node.

---

## 3. Spacing & layout

| Token | Value |
|---|---|
| `--spacing-section` | `clamp(5rem, 9vw, 9rem)` |
| `--spacing-section-sm` | `clamp(3.5rem, 6vw, 6rem)` |
| `--spacing-gutter` | `clamp(1.25rem, 4vw, 2.5rem)` |

Container widths via `<Container width="…">`: `prose 42rem` · `narrow 48rem` ·
`default 72rem` · `wide 85rem`.

Radii: `xs 2` · `sm 4` · `md 8` · `lg 14`. Cards and panels are `lg`; controls
are `md`. Nothing is fully rounded except avatars and nodes.

### Composition rules

- Section headings are **left-aligned and asymmetric** by default. The only
  centred composition on the site is the closing CTA band — centring is a stop,
  not a default.
- No row of three identical cards. The services grid gives the lead practice a
  wider, taller cell; industries are a definition list, not cards.
- Hierarchy comes from whitespace and type-scale contrast before it comes from
  colour blocks.

---

## 4. The circuit motif

This is the structural device, not decoration. It appears at four scales:

1. **Section labels** — a pulsing node, the mono eyebrow, a short conductor stub.
2. **Dividers** (`TraceDivider`) — a conductor with 45° jogs that draws itself
   and lights three nodes in sequence as it enters view.
3. **Hover states** — `CornerTrace` on service cards draws a line into a node;
   `TraceLink` draws its underline left-to-right.
4. **The engagement path** (`HowWeWork`) — a conductor scrubbed against scroll
   position down the length of the section, powering on each stage node as the
   fill reaches it. This is now the largest expression of the motif on the site.

> The hero previously carried a full traced operating-model diagram
> (`SignalSystem`), removed on request. Its `.signal-pulse` / `trace-pulse`
> CSS went with it — reinstate both together if that idea ever returns.

**Routing rule:** conductors are orthogonal or exactly 45°. Never freehand
curves. This is what keeps the motif reading as engineering rather than ornament.

---

## 5. Motion

| Token | Value |
|---|---|
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` — the default |
| `--ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)` |
| `--duration-fast` | 160ms (hover, colour) |
| `--duration-base` | 240ms (state change) |
| `--duration-slow` | 420ms (panels) |
| Scroll reveal | 700ms, expo.out, 24px travel |
| Route transition | 320ms (budget: <400ms) |

Mirrored for JS in `src/lib/motion.ts` so CSS and Motion agree.

### Which library

- **Motion (Framer Motion)** — component reveals, staggers, mega-menu, route
  transitions, hero parallax via `useScroll`.
- **GSAP + ScrollTrigger** — genuine scroll-*linked* sequences only. Currently
  one: the *How we work* conductor, scrubbed against scroll position.

Do not hand-roll scroll listeners.

### Rules

- Animate `transform` and `opacity` only. Pulses ride `offset-path`, which is
  compositor-driven — no per-frame JS.
- Motion must convey meaning: state, sequence, or spatial continuity. A reveal
  that only says "this is new" is noise.
- Reveals fire once (`viewport={{ once: true }}`). Nothing re-animates on
  scroll-back except the scrubbed conductor.
- `prefers-reduced-motion` is honoured in three places, all required for any new
  motion: the CSS blanket rule in `globals.css`, `<MotionConfig reducedMotion="user">`
  in the root layout, and a `gsap.matchMedia()` branch that sets the finished
  state.

---

## 6. Components

| Component | Path | Notes |
|---|---|---|
| `Container` `Section` `SectionLabel` `SectionHeading` | `ui/Section.tsx` | Layout + heading blocks |
| `Button` `ButtonLink` `TraceLink` | `ui/Button.tsx` | Variants: `gradient` `solid` `outline` `ghost` `onDark` |
| `ImagePlaceholder` | `ui/ImagePlaceholder.tsx` | **Adding `src` is the only change needed to go live** |
| `Logo` `LogoMark` | `ui/Logo.tsx` | Placeholder lockup; swap when the real SVG lands |
| `Reveal` `RevealGroup` `RevealItem` | `ui/Reveal.tsx` | Scroll reveals + stagger |
| `TraceDivider` | `ui/TraceDivider.tsx` | Section transition |
| `FaqList` | `ui/FaqList.tsx` | Native `<details>`; no JS shipped |
| `Field` `Honeypot` + input tokens | `ui/Form.tsx` | Shared by both forms so rules can't drift |
| `PageHero` | `layout/PageHero.tsx` | Every inner page. Dark by rule |
| `CtaSection` | `layout/CtaSection.tsx` | Closing CTA — the one centred block per page |
| `PageTransition` | `layout/PageTransition.tsx` | 320ms, enter-only |
| `PostBody` `PostCard` `PostGrid` | `components/blog/` | `PostCard` takes `headingLevel` — see §7 |
| `LegalPage` | `legal/LegalPage.tsx` | Plain template, no motion |
| Icon set | `components/icons/` | Lucide (ISC) — see §6.1 |

### 6.1 Icons

**Lucide**, ISC licensed, vendored as raw SVG rather than installed as a
package — so there is no dependency, no tree-shaking to reason about, and the
markup is auditable in the repo.

| File | Role |
|---|---|
| `icons/registry.ts` | The glyphs. Raw SVG strings, normalised to 24px / 1.5 stroke, `currentColor` only |
| `icons/Icon.tsx` | `<Icon name="…" />` renderer + `createIcon()` factory |
| `icons/index.tsx` | Semantic named exports (`IconShield`, `IconHealthcare`, …) and the `serviceIcons` / `industryIcons` maps |

**Import the named export, not the raw name.** `IconPulse` rather than
`<Icon name="server-cog" />`. Which Lucide glyph backs a name is then a one-line
change in `index.tsx` and needs no edits at the call sites.

Rules:

- **1.5 stroke, 24px grid, `currentColor`.** Set colour with a text class on the
  parent; never put `fill`/`stroke` on the icon.
- Icons are **decorative by default** — `aria-hidden`, since almost every one
  sits beside a label. Pass `title` only when the icon is the sole carrier of
  meaning, which makes it `role="img"` with that accessible name.
- Adding a glyph: copy from lucide.dev, set `stroke-width="1.5"`, add
  `aria-hidden="true"`, keep the registry alphabetical, then add a semantic
  named export.

> This replaced a bespoke icon set drawn in the circuit motif. The motif still
> lives in the section labels, dividers, card hover traces, and the engagement
> path — see §4 — it is simply no longer carried by the icons.

Button variant discipline: **one `gradient` button per view.** Everything else
is `solid`, `outline`, or `onDark`. The gradient is the site's loudest signal and
it stops meaning anything if it appears twice on a screen.

---

## 7. Accessibility (non-negotiable)

- Focus ring: 2px `cyan-bright`, 3px offset, on `:focus-visible`. Restyle if you
  must; never remove.
- Interactive targets ≥ 44×44 (`h-11` on mobile controls).
- Semantic landmarks; one `h1` per page; **heading levels never skip.** This is
  easy to break with reusable cards — a card that is `h2` on an index page is
  `h3` under a section heading. `PostCard` takes a `headingLevel` prop for
  exactly this reason. Re-run `scripts/audit.py` after adding any page.
- Every icon is `aria-hidden` unless it carries meaning alone, in which case it
  takes a `title`.
- Every image or placeholder has a real description, never `alt=""` on content.
- `cursor-pointer` on everything clickable.
- Colour never carries meaning alone.
- Skip-to-content link is the first focusable element.

---

## 8. Placeholders

Nothing in this repo ships with a real photograph, logo, or client name.

- Images — `<ImagePlaceholder>` renders the exact final aspect ratio with the
  intended content and dimensions printed on it.
- Logo — `src/components/ui/Logo.tsx`, marked `[PLACEHOLDER: CloudMind logo SVG]`.
  Real files go in `public/assets/logo/`.
- Open Graph card — `public/assets/og/default.png`, referenced in the metadata.
- **Fabricated numbers are labelled `[PLACEHOLDER STAT]` in the visible UI**, not
  just in a comment, so nothing invented reaches production unnoticed.

---

## 9. Positioning & copy rules

**CloudMind is a new company (founded 2026).** This constrains the copy more
than it constrains the design, and it is the rule most likely to be broken by
someone adding a page in a hurry.

### Never write

- A founding year earlier than 2026, or any "since 20XX"
- Client counts, retention rates, satisfaction scores, or aggregate outcome stats
- "Trusted by", "our clients tell us", "most clients", or anything else that
  asserts a roster
- Client logos, testimonials, or case studies presented as CloudMind's own work
- Partner or certification status the company has not been granted

### Write instead

- Commitments that are checkable on day one — see the home page proof band.
  A new firm's credibility is contractual, not historical.
- Prior work **attributed to the employer where it happened**. The services
  pages state provenance in a bordered note *above* the worked example, not in
  a footnote below it.
- The costs of being new, stated plainly. `/about` and `/careers` both run a
  two-column ledger with a "what we cannot offer yet" side. That column is the
  most persuasive thing on either page — do not quietly delete it as the company
  grows; revise it.

### Banned words

`cutting-edge` · `synergy` · `revolutionize` · `seamless` · `leverage` ·
`best-in-class` · `world-class` · `game-changing` · `holistic` · `empower` ·
`paradigm`

`scripts/audit.py` fails the build-time check on all of these, plus tenure
claims and heading-level skips. Run it against a dev server after adding pages:

```
npm run dev
python scripts/audit.py
```

### Fabricated data

Any invented figure must be labelled `[PLACEHOLDER STAT]` **in the visible UI**,
not only in a code comment. Same for names, quotes, and photos: `[PLACEHOLDER]`.
The point is that nothing invented can reach production without someone seeing
the label and deciding to remove it.

---

## 10. Anti-patterns — do not reintroduce

- Purple→blue "tech" gradients, or any gradient other than the brand one
- Generic centred hero (headline / subhead / two buttons / blob)
- A row of three identical rounded-corner icon cards
- `01` / `02` / `03` step badges — if the content is sequential, label it with
  something informative (we use elapsed time)
- Icons at a stroke weight other than 1.5, or off the 24px grid — the registry is
  normalised for a reason, and a 2px-stroke icon dropped in beside them is
  immediately visible
- Emoji as icons
- Cream + terracotta + serif; or black + single neon accent
- Marketing fluff: "cutting-edge", "synergy", "revolutionize", "seamless"
- Headlines any consultancy could have written
