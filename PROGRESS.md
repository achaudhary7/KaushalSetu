# PROGRESS — KaushalSetu Live Status Board

**Last updated:** 2026-09-08 · **Current phase:** Phase 4 — Authentication, Roles & Onboarding

> This file is the source of truth for *where we are*. Update it at the end of every work session.
> Detail lives in `docs/phases/`; this is the dashboard.

---

## Overall

```
Phase  0  ██████████████████████████  ✅ Complete
Phase  1  ██████████████████████████  ✅ Complete
Phase  2  ██████████████████████████  ✅ Complete
Phase  3  ██████████████████████████  ✅ Complete
Phase  4  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase  5  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase  6  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase  7  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase  8  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase  9  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase 10  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase 11  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase 12  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase 13  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase 14  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase 15  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
```

**Completed:** 4 / 16 phases

---

## Status table

| # | Phase | Status | Started | Completed | Summary written | Spec |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Foundation & Project Setup | ✅ Complete | 2026-09-07 | 2026-09-07 | ✅ | [spec](docs/phases/phase-00-foundation.md) |
| 1 | Design System & Brand | ✅ Complete | 2026-09-07 | 2026-09-08 | ✅ | [spec](docs/phases/phase-01-design-system.md) |
| 2 | Public Site & SEO Core | ✅ Complete | 2026-09-08 | 2026-09-08 | ✅ | [spec](docs/phases/phase-02-public-seo.md) |
| 3 | Data Model & Skill Taxonomy | ✅ Complete | 2026-09-08 | 2026-09-08 | ✅ | [spec](docs/phases/phase-03-data-model.md) |
| 4 | Auth, Roles & Onboarding | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-04-auth-rbac.md) |
| 5 | Assessment & Skill Profile | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-05-assessment.md) |
| 6 | Matching & Recommendations | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-06-matching.md) |
| 7 | Opportunities & ATS | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-07-opportunities.md) |
| 8 | Portfolio & Verification | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-08-portfolio.md) |
| 9 | Academician Track | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-09-academician.md) |
| 10 | Analytics & Reports | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-10-analytics.md) |
| 11 | Collaboration Hub | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-11-collaboration.md) |
| 12 | Hardening | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-12-hardening.md) |
| 13 | Deployment & Operations | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-13-deployment.md) |
| 14 | AI Layer | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-14-ai-layer.md) |
| 15 | Demo Pack & Submission | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-15-demo-pack.md) |

---

## Session log

Append one entry per working session. Newest first.

### 2026-09-08 — Session 4

- **Completed Phase 3.** Prisma schema with **56 models and 20 enums**, one migration, and a seed
  that builds the full demo world in **7 seconds**.
- **The seed imports from `src/content/`** rather than duplicating it, and `assertCatalogueComplete()`
  fails loudly if content references a skill the taxonomy does not define — so the Phase 2 contract
  is enforced at seed time, not discovered as an FK error later.
- **Two Prisma 7 surprises, both investigated rather than assumed** (ADR-011). `npm install prisma`
  pulled an **8.0 release candidate** — Prisma's `latest` dist-tag currently points at one, while
  the client resolved to stable 7.10. Both are now pinned. And Prisma 7 moved the datasource URL out
  of the schema and requires a driver adapter, so the MySQL swap is three places, not one.
- **Tested rather than trusted the received wisdom that SQLite cannot do Prisma enums** — it can, on
  7.10. Schema principle 4 holds in dev as well as production.
- Taxonomy: 12 categories, 48 skills, 14 relations. Ayush branches built deepest, with 12 skills
  carrying an explicit **NCISM curriculum area**.
- The demo data is a story: Ananya is clinically strong with gaps in exactly the skills the thin-
  competition Ayush paths need. A company is deliberately left PENDING verification, a certificate
  is deliberately revoked, and one outcome survey is deliberately unanswered — so the admin queue,
  the revocation path and honest response rates are all demonstrable.
- Verified: **8/8 integrity checks pass**, including "no published opportunity from an unverified
  company" and "no rejection without a coded reason". Full verification suite runs in 334ms.
- `prisma migrate reset` is blocked for AI agents by design; run once with explicit user consent.
- **Next:** Phase 4 — authentication, five roles, RBAC and onboarding. Auth models already exist,
  so no migration is needed; `passwordHash` currently holds a seeded placeholder that Phase 4 must
  replace with bcrypt.

### 2026-09-08 — Session 3

- **Completed Phase 2.** The entire public site: **57 indexable pages**, all returning 200.
  15 marketing pages, 11 career paths, 10 skill hubs, 8 opportunity listings with a crawlable
  faceted search, 4 insight articles, and the full legal set (DPDP-aligned privacy, accessibility
  statement, named grievance officer).
- Built the SEO engine every later phase reuses: `buildMetadata()` (used by all 57 pages),
  `lib/seo/jsonld.ts` with 11 typed builders, `sitemap.ts`, `robots.ts`, and an OG image generated
  from SVG at request time.
- **Content moved to `src/content/` as typed fixtures** — careers, skills, opportunities, articles,
  FAQs, legal. **This is now the contract Phase 3's Prisma schema must satisfy.**
- Ayush content is the differentiator and got the most work: 8 Ayush career paths with real skill
  weights, salary bands, entry routes and free SWAYAM/NPTEL courses, plus a flagship article on what
  a BAMS graduate can actually do. Three generic paths sit alongside to prove domain-agnosticism.
- **Caught and fixed 27 of our own SEO violations.** A crawl of all 57 pages found titles and
  descriptions breaching the length limits in our own checklist. All rewritten; now zero violations,
  zero duplicate titles, zero duplicate descriptions.
- Verified by crawling every sitemap URL: 57 × 200, one h1 each, canonical + OG on all, 91 valid
  JSON-LD nodes across 10 types, 404 returns a real 404, facets filter server-side, `JobPosting`
  payload complete.
- **Not done, recorded honestly:** `/help`, `/offline`, `hreflang`, and Lighthouse (no Chrome
  automation available — no performance score is claimed; Phase 12 owns it).
- **Next:** Phase 3 — Prisma schema and the seed data, modelled against the `src/content/` contract.

### 2026-09-08 — Session 2

- Pushed the repository to https://github.com/achaudhary7/KaushalSetu (public, `main`).
- **Completed Phase 1.** Logo and full favicon/PWA icon set, 60 inline SVG icons, 8 scene
  illustrations, the complete token system, 20+ UI primitives on Radix, `Header`, `Footer`,
  `DashboardShell`, and `/style-guide` rendering all of it.
- **Measured contrast instead of assuming it — four token pairs failed.** `border-strong`
  (1.48 light / 1.95 dark), light `tier-self` (2.56) and dark `fg-subtle` on surface (3.75).
  Tokens corrected; now **38/38 pass** in both themes. The audit is now a committed script
  (`scripts/check-contrast.py`) wired into `npm run check`, so this cannot silently regress.
- Navigation moved into `config/navigation.ts` with a `planned` flag, so nav never links to a
  404. Phase 2 flips those flags as pages land.
- Verified: typecheck / lint / format / contrast / build all clean; both routes 200; all brand
  assets serve; `BreadcrumbList` JSON-LD present; CSS ~10.5 KB gzipped.
- **Next:** Phase 2 — the full public site and the SEO engine (`buildMetadata` everywhere,
  `jsonld.ts`, `sitemap.ts`, `robots.ts`, OG images, 25+ pages).

### 2026-09-07 — Session 1
- Read the problem statement, the Ayush/AIIA context, and the Google SEO reference set in `../SEO IMPs`.
- Chose the product name **KaushalSetu** and locked the stack (Next.js 15 + TS + Tailwind v4 +
  Prisma + SQLite→MySQL + Auth.js).
- Resolved the hosting question: Hostinger *shared* hosting cannot run Node, so production targets a
  Hostinger **VPS**; local + Cloudflare Tunnel covers everything before that, free.
- Wrote `CONTEXT.md`, `PLAN.md`, this file, nine reference docs and the sixteen phase specs.
- **Completed Phase 0.** Scaffolded the app on Next.js **16.3.4** (newer than the planned 15 —
  `create-next-app@latest` ships it; docs updated) with React 19.2, Tailwind v4, TypeScript strict
  plus `noUncheckedIndexedAccess`, ESLint + Prettier, and the folder skeleton for all sixteen phases.
- Built the full design token system (light, dark, reduced-motion, verification-tier colours),
  `config/site.ts`, `lib/env.ts`, `lib/seo/metadata.ts`, the root layout and a placeholder home page
  that doubles as a token check.
- Verified: typecheck clean, lint clean, build clean (35.1s), dev server 200 with correct title,
  security headers present, content server-rendered. Committed as `614f103`.
- **Next:** Phase 1 — logo, favicon set, icon and illustration sets, UI primitives, Header/Footer,
  `/style-guide`. Read `node_modules/next/dist/docs/` first; Next 16 has breaking changes from 15.

---

## Blockers

| # | Blocker | Since | Blocks | Owner | Resolution |
| --- | --- | --- | --- | --- | --- |
| — | None currently | — | — | — | — |

---

## Deferred items

Things consciously postponed. Never delete a row — move it to Resolved.

| Item | Deferred from | Deferred to | Why |
| --- | --- | --- | --- |
| All AI features | Everywhere | Phase 14 | Limited AI credits; deterministic engine ships first and stands alone. |
| Own LMS / course hosting | Phase 6 | Out of scope | We link to SWAYAM/NPTEL instead. Honest and better. |
| Video interviewing | Phase 7 | Out of scope | Huge build, low demo value. Mocked at the API boundary. |
| Real certification-provider integrations | Phase 8 | Out of scope | No partner access. Clean interface + mock adapter, stated openly. |
| Payments / paid plans | Phase 2 | Post-hackathon | Pricing page describes tiers; no gateway. |
| Native mobile apps | — | Post-hackathon | PWA covers the demo need. |
| Gradient-mesh background SVG | Phase 1 | Phase 2 | Only the hero will use it; building it blind would be guesswork. |
| `prefers-contrast` handling | Phase 1 | Phase 12 | Phase 12 owns the full accessibility pass. |
| `Table` sort logic + mobile card fallback | Phase 1 | Phase 7 | Needs a real dataset to design against. |
| Keyboard, screen-reader and axe passes | Phase 1 | Phase 12 | Contrast is verified; the rest is Phase 12's scope. Do not claim AA conformance before then. |
| `/help` centre | Phase 2 | Post-hackathon | The FAQ covers the same ground; a thin help centre is worse than none. |
| `/offline` page + service worker | Phase 2 | Phase 12 | Meaningless without a service worker, which is Phase 12's PWA work. |
| `hreflang` declarations | Phase 2 | When Hindi exists | Emitting hreflang for a single locale is noise. Pattern documented in the SEO checklist. |
| Lighthouse measurement | Phase 2 | Phase 12 | No Chrome automation in this environment. No score claimed until actually measured. |
| Electronics & design skill branches | Phase 3 | When a career path needs them | No content references them; seeding unused rows helps nobody. |
| SVG ER diagram | Phase 3 | Phase 15 | 56 models will not fit one readable diagram. A focused matching-path diagram belongs in the pitch deck. |
| Public pages reading from the database | Phase 3 | Phases 6–8 | Phase 2 pages still read `src/content/` fixtures. The schema now satisfies that contract; swapping the imports is each feature phase's job. |
