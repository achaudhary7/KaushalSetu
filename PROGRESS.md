# PROGRESS — KaushalSetu Live Status Board

**Last updated:** 2026-09-07 · **Current phase:** Phase 0 — Foundation & Project Setup

> This file is the source of truth for *where we are*. Update it at the end of every work session.
> Detail lives in `docs/phases/`; this is the dashboard.

---

## Overall

```
Phase  0  ██████████████████████████  🟨 In Progress
Phase  1  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase  2  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
Phase  3  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜ Not Started
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

**Completed:** 0 / 16 phases

---

## Status table

| # | Phase | Status | Started | Completed | Summary written | Spec |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Foundation & Project Setup | 🟨 In Progress | 2026-09-07 | — | ⬜ | [spec](docs/phases/phase-00-foundation.md) |
| 1 | Design System & Brand | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-01-design-system.md) |
| 2 | Public Site & SEO Core | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-02-public-seo.md) |
| 3 | Data Model & Skill Taxonomy | ⬜ Not Started | — | — | ⬜ | [spec](docs/phases/phase-03-data-model.md) |
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

### 2026-09-07 — Session 1
- Read the problem statement, the Ayush/AIIA context, and the Google SEO reference set in `../SEO IMPs`.
- Chose the product name **KaushalSetu** and locked the stack (Next.js 15 + TS + Tailwind v4 +
  Prisma + SQLite→MySQL + Auth.js).
- Resolved the hosting question: Hostinger *shared* hosting cannot run Node, so production targets a
  Hostinger **VPS**; local + Cloudflare Tunnel covers everything before that, free.
- Wrote `CONTEXT.md`, `PLAN.md`, this file, and the sixteen phase specs.
- Started Phase 0.

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
