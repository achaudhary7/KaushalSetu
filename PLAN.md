# KaushalSetu — Master Build Plan

**Problem Statement:** SIH 26044 — Portal for Academia–Industry Collaboration for Skill Mapping,
Internships and Placement · **Sponsor:** Ministry of Ayush (AIIA)

**Plan version:** 1.0 · **Created:** 2026-09-07 · **Owner:** achaudhary7@gmail.com

> Read `CONTEXT.md` before this file. Track live status in `PROGRESS.md`.
> Each phase has a full spec in `docs/phases/`.

---

## Part A — Decisions taken up front

### A1. The stack, and why

| Layer | Choice | Reasoning |
| --- | --- | --- |
| Framework | **Next.js 16 (App Router) + TypeScript** | Server components render real HTML on first response. That is the single biggest SEO lever — the Google JS-SEO doc in `../SEO IMPs/SEO Basic.txt` spends its whole length warning about content that only appears after JS executes. We sidestep the problem entirely. Also gives us file-based routing, per-route metadata, image/font optimisation and route-level code splitting for free. |
| Styling | **Tailwind CSS v4 + CSS custom properties** | Design tokens live in CSS variables so light/dark and future white-labelling are one variable swap. Tailwind's output is purged to only what we use — typically under 15 KB gzipped. |
| Components | **Hand-built primitives on Radix UI** | Radix gives accessible, unstyled behaviour (dialog focus trap, combobox keyboard nav, etc.). We style them once, in `components/ui/`, and never re-implement. No heavy component library shipped to the browser. |
| Database | **SQLite in dev → MySQL 8 in production** | Zero-setup locally (a file, committable, resettable). Hostinger gives MySQL on every plan. Prisma abstracts the difference to one line in `schema.prisma`. |
| ORM | **Prisma** | Type-safe queries, real migration history, and a seed script — which matters enormously for a hackathon demo that must be resettable in 10 seconds. |
| Auth | **Auth.js v5 (NextAuth), credentials + JWT sessions** | Free, self-hosted, no external identity provider, no per-MAU billing. Role claim in the JWT drives middleware route gating. |
| Charts | **Recharts** | React-native API, SVG output (fits the all-SVG rule), tree-shakeable, loaded only on dashboard routes via dynamic import. |
| PDF / QR | **@react-pdf/renderer + qrcode** | Server-side generation of ATS resumes and QR-verifiable certificates. Both MIT, both offline. |
| Validation | **Zod** | One schema validates the form on the client and the payload on the server. No drift. |
| Email | **Nodemailer, console transport in dev** | Free. Swaps to Hostinger's SMTP or Brevo's free tier in production without a code change. |
| Testing | **Vitest + Playwright** | Vitest for the matching engine and scoring maths (the part a judge will interrogate). Playwright for the three critical end-to-end journeys. |

**Rejected, deliberately:** Vercel (user constraint), any paid API, any component library that ships
a megabyte of CSS, a bespoke LMS, video interviewing, and real integrations with certification
providers. The last three are mocked behind clean API boundaries and we say so honestly on stage.

### A2. Hosting — the recommendation

Three stages, and the first two cost nothing:

1. **Development and hackathon demo — `localhost`.** `npm run dev`, SQLite file, seeded data.
   Nothing can fail on stage because nothing leaves the machine. This is the demo path.
2. **Sharing with teammates and judges before the event — Cloudflare Tunnel.**
   `cloudflared tunnel --url http://localhost:3000` gives a public HTTPS URL in ~5 seconds,
   free, no account required, no card. Runs the real app off your machine. Perfect for review
   rounds and for putting a link in a submission form.
3. **Production — Hostinger VPS (KVM 1), not shared hosting.**

   **This is important and easy to get wrong:** Hostinger's *shared* plans (Premium/Business web
   hosting) run PHP and MySQL only. They cannot run a Node.js server, so a server-rendered Next.js
   app will not work there. You need their **VPS** tier (KVM 1, roughly ₹400–500/month), which is a
   real Ubuntu box. On it: Node 22 + PM2 (process manager, restarts on crash and boot) + Nginx
   (reverse proxy, gzip/brotli, static caching) + MySQL 8 + Certbot (free Let's Encrypt TLS).
   Full runbook in `docs/DEPLOYMENT.md`.

   *If a VPS is genuinely not possible:* the fallback is a static export of the public marketing
   site (Phase 2 output, `output: 'export'`) onto Hostinger shared hosting, with the authenticated
   application running elsewhere. This splits the app and hurts, so treat it as a last resort. The
   free alternatives that do run Node — Render, Railway, Fly.io, Koyeb — all have usable free tiers
   and are a better fallback than splitting the app.

### A3. What we add to the brief

The brief is large but incomplete. These are the additions, all justified in `CONTEXT.md` §4–5:

**New features:** three-tier skill verification · QR-verifiable certificates · employer verification
gate and listing reports · reverse skill-gap report to curriculum · rejection reason capture ·
regional demand map · blind shortlisting · gap-to-SWAYAM/NPTEL learning paths · micro-internships ·
alumni mentorship · ATS resume generator · 6/12-month outcome follow-up · Ayush-specific taxonomy
and career paths.

**Missing pages the brief never mentions but a real portal must have** (all specified in
`docs/SITEMAP.md`): public opportunity search that works logged-out (this is the SEO engine of the
whole site) · individual opportunity detail pages with `JobPosting` structured data · public student
portfolio pages · public certificate verification page · career-path explorer · a resources/insights
section (the only realistic organic traffic source) · pricing/for-institutions page · about, contact,
FAQ, help centre · privacy policy, terms, accessibility statement, grievance/nodal officer contact
(mandatory for an Indian government-facing platform under the IT Rules) · 404 and 500 pages ·
sitemap.xml, robots.txt, manifest, offline page.

### A4. Sequencing logic

Phases 0–2 build the shell and the entire public, SEO-visible surface **before** any database work.
That is deliberate: it means there is something impressive and complete to show from day two, the
design system is settled before feature pressure starts, and every later feature drops into an
existing layout instead of inventing one.

Phases 3–8 are the core product and are the **minimum viable demo**. If time runs out, stop after
Phase 8 and present 9–15 as a roadmap. A complete small system beats a broken large one.

Phase 14 (AI) is last and is strictly additive — every AI feature has a deterministic fallback that
is already shipped and already works.

---

## Part B — The phases

| # | Phase | Outcome | Est. | Status |
| --- | --- | --- | --- | --- |
| 0 | Foundation & Setup | Repo, stack, tooling, docs, tracking, env | 3h | ⬜ |
| 1 | Design System & Brand | Logo, tokens, UI kit, Header/Footer, a11y | 6h | ⬜ |
| 2 | Public Site & SEO Core | 15+ marketing pages, sitemap, JSON-LD, OG | 8h | ⬜ |
| 3 | Data Model & Seed | Prisma schema, Ayush+generic taxonomy, seeds | 5h | ⬜ |
| 4 | Auth & RBAC | 5 roles, sessions, onboarding, route gating | 6h | ⬜ |
| 5 | Assessment & Skill Profile | Questionnaire, aptitude, scoring, gap analysis | 8h | ⬜ |
| 6 | Matching & Recommendation | Cosine engine, career paths, learning paths | 7h | ⬜ |
| 7 | Opportunities & ATS | Post, verify, search, apply, track, blind mode | 10h | ⬜ |
| 8 | Portfolio & Verification | 3-tier badges, QR certs, public profile, resume | 7h | ⬜ |
| 9 | Academician Track | FDPs, faculty internships, consultancy, research | 5h | ⬜ |
| 10 | Analytics & Reports | Dashboards, reverse gap report, outcomes | 7h | ⬜ |
| 11 | Collaboration Hub | Mentorship, workshops, live projects, challenges | 6h | ⬜ |
| 12 | Hardening | Perf, a11y, security, rate limits, audit log | 5h | ⬜ |
| 13 | Deployment | Local, tunnel, VPS runbook, backups, CI | 4h | ⬜ |
| 14 | AI Layer *(last)* | Parsing, semantic match, guidance, prep | 6h | ⬜ |
| 15 | Demo Pack | Seed story, pitch deck, script, roadmap | 4h | ⬜ |

Estimates are focused-hours, not calendar time.

---

### Phase 0 — Foundation & Project Setup
Scaffold Next.js + TypeScript + Tailwind, ESLint/Prettier, path aliases, env handling, folder
architecture, git init with sensible ignores, all documentation and the phase-tracking system.
**Exit:** `npm run dev` serves a styled placeholder; `npm run build` and `npm run lint` are clean;
every doc file exists. → `docs/phases/phase-00-foundation.md`

### Phase 1 — Design System & Brand Identity
The KaushalSetu SVG logo (mark + wordmark + favicon set), the colour/type/space token system with
dark mode, and the reusable primitive library: Button, Input, Select, Textarea, Card, Badge, Tabs,
Dialog, Sheet, Table, Toast, Avatar, Progress, Skeleton, EmptyState, Breadcrumbs, Pagination,
Stepper, plus the site `Header`, `Footer`, `Container`, `Section`, `PageHeader`, and the dashboard
shell (`Sidebar`, `Topbar`). Custom SVG icon set and illustration set. WCAG 2.1 AA verified.
**Exit:** a `/style-guide` route renders every component in both themes; contrast passes.
→ `docs/phases/phase-01-design-system.md`

### Phase 2 — Public Marketing Site & SEO Core
Every logged-out page: home, four audience landing pages (students, industry, institutions,
faculty), how-it-works, features, career-path explorer, public opportunity search + detail,
resources/insights index + articles, about, contact, FAQ, help, pricing-for-institutions, and the
full legal set. Plus the SEO machinery: metadata helper, canonicals, `sitemap.ts`, `robots.ts`,
JSON-LD (Organization, WebSite+SearchAction, BreadcrumbList, FAQPage, JobPosting, Course), dynamic
SVG-based OG images, and the PWA manifest.
**Exit:** Lighthouse 95+/95/100/100 on home; every page has unique title, description, canonical;
sitemap validates. → `docs/phases/phase-02-public-seo.md`

### Phase 3 — Data Model & Skill Taxonomy
Full Prisma schema (~30 models), migrations, and the seed data that makes everything else possible:
a two-level skill taxonomy with Ayush/NCISM branches alongside IT, engineering, management and
soft-skill branches; career paths; role–skill weight maps; SWAYAM/NPTEL course catalogue;
district/region reference data; demo users across all five roles.
**Exit:** `npm run db:reset` rebuilds a complete demo world in under 20 seconds.
→ `docs/phases/phase-03-data-model.md`

### Phase 4 — Authentication, Roles & Onboarding
Register/login/logout, password reset, email verification (console transport in dev), five roles
(Student, Industry, Academician, Institution, Admin), middleware route gating, per-role onboarding
wizards, account settings, and the admin console skeleton for employer verification.
**Exit:** every role can register, onboard and land on its own dashboard; cross-role access is
denied at the middleware and again at the data layer. → `docs/phases/phase-04-auth-rbac.md`

### Phase 5 — Skill Assessment & Profiling
The questionnaire engine (industry-defined criteria, weighted, branching), a timed aptitude module,
soft-skill self-assessment with behavioural anchors, deterministic scoring, and the generated skill
profile: proficiency per skill, strengths, gaps ranked by industry demand, radar visualisation, and
the first tier of the three-tier badge system (assessment-verified).
**Exit:** a student completes an assessment and receives an explainable, reproducible profile.
→ `docs/phases/phase-05-assessment.md`

### Phase 6 — Skill Mapping, Matching & Recommendations
Skill-vector representation, weighted cosine similarity with eligibility filters, and a **match
explanation panel** that shows exactly which skills contributed what — the answer to "how was this
computed?" Career-path recommendations, gap-to-course learning paths on SWAYAM/NPTEL, industry and
role suggestions, and the regional demand map.
**Exit:** deterministic, unit-tested scores; every recommendation can be explained in one screen.
→ `docs/phases/phase-06-matching.md`

### Phase 7 — Opportunities & Applicant Tracking
Industry posting flows for internships, micro-internships, apprenticeships, jobs and live projects;
the employer verification gate; public + authenticated search with faceted filters; application
submission and status pipeline; the recruiter ATS board with blind shortlisting; rejection reason
capture; saved searches and alerts; suspicious-listing reports.
**Exit:** post → match → apply → shortlist → offer works end to end for two roles.
→ `docs/phases/phase-07-opportunities.md`

### Phase 8 — Digital Portfolio, Verification & Credentials
The public student portfolio page (indexable, `Person`/`ProfilePage` structured data), three-tier
skill badges rendered distinctly, employer endorsement flow, project and achievement records,
internship completion certificates issued by companies with QR codes, the public
`/verify/[code]` page, and one-click ATS-readable resume export.
**Exit:** a certificate scans to a live verification page; a recruiter can filter to verified-only.
→ `docs/phases/phase-08-portfolio.md`

### Phase 9 — Academician / Faculty Track
The dedicated portal the brief asks for and most teams forget: faculty internships, industrial
training, FDP catalogue and registration, consultancy opportunities, collaborative research
listings with expertise matching, and the faculty profile with publications and specialisations.
**Exit:** a faculty member discovers, applies to and tracks an FDP and a research collaboration.
→ `docs/phases/phase-09-academician.md`

### Phase 10 — Analytics, Dashboards & Reports
Institution dashboard (skill development, internship participation, placement readiness funnel),
industry dashboard (pipeline, time-to-hire, skill demand), admin/policymaker view, the **reverse
skill-gap report** (employer demand vs. syllabus coverage, exportable per term), the **6/12-month
longitudinal outcome survey and report**, and CSV/PDF export throughout.
**Exit:** every chart traces to a real query; the gap report produces a document an institution
could actually act on. → `docs/phases/phase-10-analytics.md`

### Phase 11 — Collaboration Hub
Mentorship request/accept/session flow including alumni matching, guest lecture and workshop
scheduling, live industry projects with milestones, innovation challenges with submissions and
judging, plus in-app notifications and a messaging thread model.
**Exit:** a mentorship relationship and a live project both run through their full lifecycle.
→ `docs/phases/phase-11-collaboration.md`

### Phase 12 — Performance, Accessibility & Security Hardening
Core Web Vitals work against the budgets, bundle analysis, image/font strategy, full keyboard and
screen-reader pass, then the security layer: rate limiting, CSRF, headers/CSP, file upload
validation and virus-scan boundary, secure document storage with signed access, audit logging,
and PII minimisation.
**Exit:** budgets met, axe-clean, and the checklist in `docs/SECURITY.md` fully ticked.
→ `docs/phases/phase-12-hardening.md`

### Phase 13 — Deployment & Operations
Production build config, environment matrix, MySQL migration path, the Cloudflare Tunnel demo
recipe, the full Hostinger VPS runbook (Node, PM2, Nginx, MySQL, Certbot, firewall), automated
backups, a GitHub Actions CI that lints/tests/builds, and uptime monitoring.
**Exit:** a documented, repeatable deploy; a rollback that takes under two minutes.
→ `docs/phases/phase-13-deployment.md`

### Phase 14 — AI Layer *(built last, by design)*
Only after everything above works. Resume parsing to structured skills, semantic skill matching via
embeddings layered *on top of* the cosine score, a career guidance assistant, interview preparation
question generation, and assessment answer evaluation. Every feature sits behind a provider
interface with the Phase 5/6 deterministic path as fallback, response caching, and a hard token
budget. If the credits run out mid-demo, nothing breaks.
**Exit:** AI on and AI off both produce a working product; the difference is quality, not function.
→ `docs/phases/phase-14-ai-layer.md`

### Phase 15 — Demo Pack & Submission
A narrative seed dataset (named students with believable gaps, verified companies, real-looking
Ayush postings), the demo script timed to the slot, the pitch deck opening on the AIIA insight,
screenshots, architecture diagram, an honest "what is mocked" slide, and the post-hackathon roadmap.
**Exit:** the full demo runs in the allotted minutes without touching a keyboard off-script.
→ `docs/phases/phase-15-demo-pack.md`

---

## Part C — Cross-cutting rules that apply in every phase

1. **Reuse before you write.** If a `Button` exists, no phase creates another one. Any component
   used twice moves into `components/ui/` immediately.
2. **Server-first.** A component is a Server Component unless it needs state, effects or event
   handlers. `'use client'` is a decision, not a default.
3. **Every page ships metadata.** Unique `<title>`, unique description, canonical, OG/Twitter. A
   page without these does not pass review. See `docs/SEO-CHECKLIST.md`.
4. **Every image is SVG**, inline for icons (no request) and componentised for illustrations.
5. **Every list has an empty state, a loading skeleton and an error state.** All three, always.
6. **Authorisation is checked at the data layer**, not only in middleware. Middleware is a
   convenience; the query is the boundary.
7. **No secret in the repo.** `.env.example` is committed, `.env` never is.
8. **Update the phase file as you go**, not at the end when you have forgotten what you did.

## Part D — Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Scope overrun — the brief is enormous | High | High | Phases 3–8 are the contract. 9–15 are roadmap if time is short. Every phase ships something demonstrable. |
| AI credits exhausted | High | Low | AI is Phase 14 and strictly additive. The product is complete without it. |
| Hostinger shared hosting cannot run Node | Certain | Medium | Documented up front (§A2). VPS or a free Node host; never discover this at deploy time. |
| Demo fails on venue wifi | Medium | High | The demo runs on localhost with seeded SQLite. No network dependency at all. |
| Design drifts across phases | Medium | Medium | Phase 1 lands the system before features start; `/style-guide` is the reference. |
| Losing context between sessions | Medium | High | This plan, `PROGRESS.md`, and the mandatory per-phase summary blocks exist precisely for this. |
