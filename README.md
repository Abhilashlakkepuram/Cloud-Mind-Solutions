# CloudMind Solutions — marketing site

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion · GSAP ScrollTrigger

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # prerenders every route
npm run lint
```

**Read [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) before adding a page.** It is the
source of truth for colour, type, motion, the circuit motif, and the copy rules.

## Checks

```bash
python scripts/contrast.py   # WCAG contrast across the palette; non-zero exit on failure
npm run dev                  # then, in a second shell:
python scripts/audit.py      # headings, a11y names, metadata, banned copy, tenure claims
```

Both are plain Python 3, no dependencies. Run them after any colour change or
new page.

## Routes

| Route | Notes |
|---|---|
| `/` | Home. Scroll-scrubbed engagement path in `HowWeWork` |
| `/services` | Hub |
| `/services/[slug]` | 5 practices, prerendered from `lib/service-content.ts` |
| `/industries` | 5 sectors, from `lib/industries.ts` |
| `/about` `/careers` | Both run the honest two-column ledger |
| `/blog` `/blog/[slug]` | 4 posts, from `lib/blog.ts` |
| `/contact` | Validated form → `/api/contact` |
| `/privacy-policy` `/terms-and-conditions` | Plain legal template |
| `/sitemap.xml` `/robots.txt` | Generated from the same data as the routes |

## Content lives in `src/lib/`

Pages are layout; copy is data. To change wording, edit the lib file, not the
page: `site.ts` · `service-content.ts` · `industries.ts` · `about-content.ts` ·
`careers-content.ts` · `blog.ts`.

## Before launch

Nothing here ships with a real image, client, or number. Search the codebase for
`[PLACEHOLDER` — every instance is deliberate and needs a decision.

- [ ] **Delivery is not wired.** `/api/contact` and `/api/careers` validate
      correctly and then `console.warn` — no email or CRM destination exists.
      See the `TODO(delivery)` block in each. Provision via the Vercel
      Marketplace rather than hardcoding a provider SDK.
- [x] Logo, favicon, app icons, and OG card — all derived from the supplied
      artwork by `python scripts/logo-assets.py`. Re-run it if new artwork lands.
- [ ] Real domain, phone, and email in `src/lib/site.ts`
- [ ] Real WhatsApp number in `src/lib/site.ts` (`company.whatsapp.number`,
      digits only — currently the placeholder line)
- [ ] Team names, roles, and headshots in `src/lib/about-content.ts`
- [ ] Legal review of both legal pages — they are drafts, not advice
- [ ] Confirm retention periods in the privacy policy are actually enforced
- [ ] Replace or remove the worked examples on service pages; they are drawn
      from the founders' prior employers and need clearance plus a reference
- [ ] **Visual QA at 360 / 768 / 1024 / 1440 has not been done** — see below

## Known gap

The site has not been visually verified in a browser. Every route was checked by
fetching and parsing the rendered HTML (`scripts/audit.py`), and the build and
lint pass, but nobody has looked at it. Responsive behaviour, motion timing, and
visual polish are unverified. Do a pass at 360 / 768 / 1024 / 1440 before launch.
