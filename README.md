# KaushalSetu

**The bridge from campus to career.**

A centralised Academia–Industry Collaboration Portal for skill mapping, internships and placements —
connecting students, industry, academicians and institutions on one platform.

Built for **Smart India Hackathon, Problem Statement 26044** *(Portal for Academia - Industry
collaboration for Skill Mapping, Internships and Placement)*, sponsored by the **Ministry of Ayush**.

---

## Where to start reading

| Order | File | What it gives you |
| --- | --- | --- |
| 1 | [`CONTEXT.md`](CONTEXT.md) | Full project orientation. **Read this first.** |
| 2 | [`PROGRESS.md`](PROGRESS.md) | Where we are right now |
| 3 | [`PLAN.md`](PLAN.md) | The sixteen-phase build plan |
| 4 | [`docs/phases/`](docs/phases/) | The spec for the phase you are working on |

Reference docs: [architecture](docs/ARCHITECTURE.md) · [design system](docs/DESIGN-SYSTEM.md) ·
[SEO](docs/SEO-CHECKLIST.md) · [data model](docs/DATA-MODEL.md) ·
[performance](docs/PERFORMANCE.md) · [security](docs/SECURITY.md) ·
[deployment](docs/DEPLOYMENT.md) · [decisions](docs/DECISIONS.md) · [routes](docs/SITEMAP.md)

## Quick start

```bash
cd app
npm install
cp .env.example .env
npm run db:seed        # builds the full demo world in ~7s
npm run dev            # http://localhost:3000
```

Requires Node 20.9+ (developed on 24). No external service is needed — the database is a local
SQLite file. `npm install` generates the Prisma client automatically via `postinstall`, which
`typecheck` and the seed both need.

### Demo accounts

Password `KaushalSetu@2026` for all of them.

| Role | Email |
| --- | --- |
| Student (3rd-year BAMS — the main demo thread) | `ananya@student.aiia.gov.in` |
| Student (1st year — micro-internship story) | `rahul@student.spit.ac.in` |
| Academician | `meera.iyer@aiia.gov.in` |
| Industry (verified employer) | `vikram@himalayawellness.example` |
| Institution | `placements@aiia.gov.in` |
| Admin | `admin@kaushalsetu.in` |

The seed also prints two verifiable certificate codes to try at `/verify` — one valid, one revoked.

### Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint |
| `npm run format` | Prettier, write |
| `npm run check` | typecheck + lint + format + contrast audit — run before every commit |
| `npm run db:seed` | Rebuild the demo world (wipes and re-seeds; ~7s) |
| `npm run db:studio` | Browse the database |
| `npm run db:reset` | Drop, migrate and re-seed. **Destructive** — Prisma blocks AI agents from running this without explicit consent. |

## What it does

Three lifecycles on one platform:

- **Skill development** — questionnaire and aptitude assessment produces a skill profile with
  strengths and ranked gaps, then recommends roles, industries and *free* SWAYAM/NPTEL courses.
- **Internships** — industry posts, students are matched and apply, progress and mentor feedback are
  tracked, completion is certified. A separate track covers faculty internships, FDPs, consultancy
  and collaborative research.
- **Placement** — job postings, skill-based matching, shortlisting, recruitment management, and
  analytics for institutions and policymakers.

### What makes it different

The brief has three quiet gaps. We closed all three:

1. **Skills are self-declared.** → **Three-tier verification**: self-declared, assessment-verified,
   employer-endorsed. Recruiters filter to verified only, and verified skills score higher in
   matching, so the tiers actually mean something.
2. **Nothing feeds demand back to curriculum.** → **Reverse skill-gap report**: aggregate employer
   demand against syllabus coverage, delivered termly to the institution and the regulator.
3. **Success stops at "placed".** → **6- and 12-month outcome tracking**: still employed, role
   relevant, satisfied.

Plus: QR-verifiable internship certificates (against fake-certificate scams), an employer
verification gate before any posting goes live, blind shortlisting that hides name, gender and
college during first-pass screening, anonymised rejection-reason capture, a regional demand map,
micro-internships for junior students, alumni mentorship, and one-click ATS-readable resumes.

### Built for Ayush, domain-agnostic by design

The problem statement is written generically but comes from AIIA. The skill taxonomy, career paths
and internship categories are Ayush-aware — BAMS/BHMS/BUMS routes into clinical practice, GMP
pharmaceutical manufacturing, panchakarma centres, clinical research, regulatory affairs — aligned
to the NCISM curriculum. Because the taxonomy is **data, not code**, the same platform serves any
institution.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma 7 (pinned) · SQLite → MySQL ·
Auth.js · Recharts · Vitest + Playwright.

Everything is free and self-hostable. Nothing in this stack can expire, rate-limit us, or start
charging mid-project.

**On AI:** the matching engine is deterministic weighted cosine similarity — arithmetic, not a
model. It costs nothing, runs instantly, and every score can be explained on screen. AI arrives in
Phase 14 as a strictly additive layer, and the platform is fully functional with `AI_ENABLED=false`.
See [ADR-002](docs/DECISIONS.md).

## Hosting

Local for development and for the hackathon demo. Free [Cloudflare
Tunnel](docs/DEPLOYMENT.md#stage-2--public-url-free-in-five-seconds) for a public URL when sharing.
Production on a **Hostinger VPS** — note that Hostinger's *shared* plans run PHP only and cannot
host a Node.js app. Details and free alternatives in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Status

Phase 3 of 16 complete — see [`PROGRESS.md`](PROGRESS.md).

- **Live now:** the full public site (57 indexable pages), the design system, and the database with
  a seeded demo world.
- **Next:** authentication and role-based access.
