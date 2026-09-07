# Performance Budgets & Techniques

Performance is a graded requirement, not a polish item. These budgets are checked in Phase 12 and
should be respected in every phase before it.

## Budgets

| Metric | Target | Google "good" | Where |
| --- | --- | --- | --- |
| LCP | < 2.0s | < 2.5s | All pages |
| INP | < 200ms | < 200ms | All interactions |
| CLS | < 0.05 | < 0.1 | All pages |
| TTFB | < 400ms | < 800ms | Server-rendered |
| First Load JS | < 100 KB | — | Marketing routes |
| First Load JS | < 180 KB | — | Dashboard routes |
| CSS | < 20 KB gzip | — | Any route |
| Lighthouse Perf | ≥ 95 | — | Public pages |
| Lighthouse Perf | ≥ 90 | — | Dashboard pages |
| Dashboard TTI | < 1.5s | — | Seeded dataset |

Measured on a simulated mid-range Android over 4G — not on a developer laptop over fibre. Most of
this platform's users are on exactly that device.

## Techniques, by cause

**JavaScript (the biggest lever).** Server Components by default; `'use client'` pushed to the
leaves. Charts, PDF generation, editors, maps and dialogs behind `next/dynamic`. No moment-style
date library — `Intl` is built in. No component library shipping unused code. Bundle analyser run
before every phase closes.

**Rendering.** Static generation for marketing. ISR for opportunity and portfolio pages. Streaming
with Suspense so a slow analytics query never blocks the shell. `unstable_cache` on expensive
aggregate queries with sensible revalidation.

**CSS.** Tailwind purges to what is used. Tokens as CSS variables — theme switching costs no
JavaScript re-render. No CSS-in-JS runtime.

**Fonts.** Two variable families, self-hosted through `next/font`, subset to latin + latin-ext,
`display: swap`, preloaded. Fonts are a classic LCP killer and a classic CLS killer; `next/font`
handles both if used properly.

**Images.** Everything is SVG, inlined for icons (zero requests) and componentised for
illustrations. SVGs are minified and carry explicit dimensions, so CLS from imagery is structurally
zero. Any future raster goes through `next/image` with explicit sizing.

**Database.** No N+1 — Prisma `include` used deliberately, never reflexively. `select` narrowed to
rendered fields. Indexes on every foreign key and every search facet. Analytics reads from
denormalised snapshot tables (`SkillDemandSnapshot`), never from live aggregation over applications.
Cursor pagination on long lists.

**Network.** Brotli and gzip at Nginx. Immutable cache headers on hashed static assets. HTTP/2.
Preconnect only where genuinely needed.

## Anti-patterns, banned

- `'use client'` at the top of a page or layout "for convenience"
- Fetching in a client `useEffect` what the server could have rendered
- Importing a whole library for one function
- Loading chart or PDF code on a marketing route
- Images without dimensions
- Blocking the shell on the slowest query instead of streaming it
- Any layout shift from late-arriving fonts, banners or async content

## Verification routine

1. `npm run build` — read the route-size table; investigate anything over budget.
2. `ANALYZE=true npm run build` — check nothing dashboard-only leaked into marketing.
3. Lighthouse on one page per route type, mobile preset, recorded in the phase summary.
4. Real-device check on an actual mid-range phone before submission.
5. In Phase 13, re-run everything against production — localhost numbers are not real numbers.
