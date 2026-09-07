# Architecture

## Stack

| Concern | Technology | Version |
| --- | --- | --- |
| Runtime | Node.js | 22 LTS (dev on 24) |
| Framework | Next.js, App Router | 16.x |
| Language | TypeScript, `strict` | 5.x |
| Styling | Tailwind CSS | 4.x |
| Primitives | Radix UI | latest |
| ORM | Prisma | 6.x |
| Database | SQLite (dev) → MySQL 8 (prod) | — |
| Auth | Auth.js (NextAuth) v5, credentials + JWT | 5.x |
| Validation | Zod | 4.x |
| Charts | Recharts, dynamically imported | 3.x |
| PDF | @react-pdf/renderer | latest |
| QR | qrcode | latest |
| Email | Nodemailer (console transport in dev) | latest |
| Tests | Vitest (unit), Playwright (e2e) | latest |

Everything is free and self-hostable. No service in this list can expire, rate-limit us, or start
charging mid-project.

## Directory layout

```
kaushalsetu/
├── prisma/
│   ├── schema.prisma            Single source of truth for the data model
│   ├── migrations/
│   └── seed/                    Split by domain: taxonomy, careers, users, opportunities
├── public/
│   ├── icon.svg  favicon.ico  apple-touch-icon.png
│   └── manifest.webmanifest
├── src/
│   ├── app/
│   │   ├── (marketing)/         Public, SEO-critical, all Server Components
│   │   ├── (auth)/              login, register, reset — minimal layout
│   │   ├── (dashboard)/         Authenticated app, role-segmented, noindex
│   │   ├── (public-data)/       /opportunities, /p/[username], /verify — public but data-driven
│   │   ├── api/                 Route handlers: auth, uploads, webhooks, health
│   │   ├── layout.tsx           Root: fonts, theme, Organization JSON-LD, base metadata
│   │   ├── sitemap.ts robots.ts opengraph-image.tsx
│   │   ├── not-found.tsx error.tsx global-error.tsx
│   ├── components/
│   │   ├── ui/                  Primitives. Built in Phase 1. Never duplicated.
│   │   ├── layout/              Header, Footer, Container, Section, DashboardShell
│   │   ├── marketing/           Hero, FeatureGrid, Testimonial, CTA, Stats
│   │   ├── dashboard/           StatTile, DataTable, FilterBar, charts
│   │   ├── icons/               Inline SVG icon components
│   │   └── illustrations/       Inline SVG scene components
│   ├── lib/
│   │   ├── seo/                 metadata.ts, jsonld.ts
│   │   ├── auth/                config.ts, guards.ts, password.ts
│   │   ├── db/                  client.ts (singleton), queries/ by domain
│   │   ├── matching/            vector, similarity, eligibility, explain, rank
│   │   ├── assessment/          scoring, gap analysis
│   │   ├── analytics/           queries.ts — every metric defined once
│   │   ├── ai/                  provider interface + NullProvider (Phase 14)
│   │   ├── validators/          Zod schemas, shared client and server
│   │   ├── env.ts               Validated environment access
│   │   └── utils/
│   ├── config/
│   │   ├── site.ts              Name, tagline, URLs, contact, social
│   │   ├── navigation.ts        Header, footer, per-role sidebar nav
│   │   └── constants.ts
│   ├── types/
│   └── styles/globals.css       Tailwind entry + @theme design tokens
├── tests/{unit,e2e}/
└── docs/
```

## Rendering strategy, route by route

| Segment | Strategy | Reason |
| --- | --- | --- |
| `(marketing)/*` | Static, Server Components | Fastest possible; fully crawlable |
| `/opportunities` | Dynamic + revalidate | Fresh listings, still server-rendered for SEO |
| `/opportunities/[slug]` | ISR, revalidate on publish | Crawlable, cacheable, `JobPosting` JSON-LD |
| `/p/[username]` | ISR | Public portfolio, shareable, indexable |
| `/verify/[code]` | Dynamic, `noindex` | Live status, must never be stale, personal record |
| `(auth)/*` | Dynamic, `noindex` | — |
| `(dashboard)/*` | Dynamic, Server Components + islands | Per-user data; `noindex` via robots + meta |

**The rule:** a component is a Server Component unless it needs state, an effect, or an event
handler. `'use client'` is pushed as far down the tree as possible — a client-side chart lives
inside a server-rendered card, not the other way around.

## Data access

- One Prisma client singleton (`src/lib/db/client.ts`) to survive dev hot-reload.
- Queries live in `src/lib/db/queries/<domain>.ts`, never inline in components.
- **Every query is scoped to the caller.** `requireUser()` / `requireRole()` / `requireOwnership()`
  from `src/lib/auth/guards.ts` run inside the query or the server action — middleware is a
  convenience layer, not the security boundary.
- Mutations are Server Actions with Zod validation at the boundary, returning typed results.
- `select` is narrowed to the fields actually rendered — never `include` everything.

## Request lifecycle (authenticated page)

```
Request
  → middleware.ts        session cookie read, role checked, redirect if wrong role
  → layout (server)      shell, nav, user menu — cached where possible
  → page (server)        guard → scoped query → render
  → streamed to client   Suspense boundaries let slow sections arrive late
  → client islands       hydrate only interactive components
```

## Key architectural rules

1. **Reuse before writing.** Anything used twice moves to `components/ui/` immediately.
2. **One source of truth per concept.** Site identity in `config/site.ts`; nav in
   `config/navigation.ts`; metrics in `lib/analytics/queries.ts`; tokens in `globals.css`.
3. **Types flow from Prisma.** Database types are derived, never hand-maintained in parallel.
4. **Validation once, used twice.** One Zod schema per form, shared by client and server.
5. **No secrets on the client.** Only `NEXT_PUBLIC_*` crosses the boundary, and `lib/env.ts` makes
   the distinction explicit and enforced.
6. **Every list has three states.** Loading skeleton, empty state, error state. Always all three.
7. **AI is optional infrastructure.** Everything works with `AI_ENABLED=false`.

## Extension points (deliberately mocked, honestly stated)

| Integration | Boundary | Status |
| --- | --- | --- |
| Learning platforms (SWAYAM, NPTEL) | `LearningResource` + deep links | Real links, no API — none is public |
| Certification providers | `lib/integrations/certifications.ts` | Interface + mock adapter |
| Institutional databases (ERP/AISHE) | CSV import + a documented import interface | CSV real, API mocked |
| Virus scanning | `lib/security/scan.ts` | ClamAV interface, mock in dev |
| SMS / WhatsApp notifications | `lib/notifications/channels` | Interface only |

Each of these is a clean seam that a real deployment would fill. Saying so plainly is better than
implying integrations that do not exist.
