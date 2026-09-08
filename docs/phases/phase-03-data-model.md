# Phase 3 — Data Model & Skill Taxonomy

| | |
| --- | --- |
| **Status** | ✅ Complete |
| **Depends on** | Phase 0 |
| **Blocks** | Phases 4–11 |
| **Estimate** | 5 focused hours |
| **Started** | 2026-09-08 |
| **Completed** | 2026-09-08 |

## Objective

Design the schema once, properly, so no later phase has to fight a migration under time pressure.
Then seed a believable world — because a demo with three fake records is unconvincing, and the
matching engine cannot be tuned against empty tables.

## Design principles

- **The skill taxonomy is data, not code.** Swapping Ayush for engineering is a seed change, never
  a code change. This is what makes the platform credibly domain-agnostic while being Ayush-first.
- **Soft deletes on anything a user authored.** `deletedAt` rather than destroying records.
- **Every state change that matters is auditable.** Applications, verifications and endorsements
  carry an event trail, not just a current status.
- **Enums over free strings** for status, role and type. Typos are not a valid state.

## Deliverables

### Schema — `prisma/schema.prisma`
- [x] **Identity:** `User`, `Account`, `Session`, `VerificationToken`, `Role` enum
      (STUDENT, ACADEMICIAN, INDUSTRY, INSTITUTION, ADMIN)
- [x] **Profiles:** `StudentProfile`, `AcademicianProfile`, `IndustryProfile`, `InstitutionProfile`
- [x] **Taxonomy:** `SkillCategory`, `Skill` (slug, description, type: TECHNICAL/SOFT/DOMAIN/TOOL,
      level descriptors), `SkillRelation` (prerequisite / related / successor)
- [x] **Career model:** `CareerPath`, `JobRole`, `RoleSkillRequirement` (skill, weight 0–1,
      minimum proficiency) — this table *is* the matching engine's input
- [x] **Assessment:** `Assessment`, `Question` (with type, options, weights, difficulty),
      `AssessmentAttempt`, `Answer`, `SkillScore`
- [x] **Skill profile:** `UserSkill` (proficiency 0–5, `verificationTier`:
      SELF_DECLARED / ASSESSMENT_VERIFIED / EMPLOYER_ENDORSED, evidence link, timestamps)
- [x] **Opportunities:** `Opportunity` (type: INTERNSHIP / MICRO_INTERNSHIP / APPRENTICESHIP /
      JOB / LIVE_PROJECT / FDP / FACULTY_INTERNSHIP / CONSULTANCY / RESEARCH), `OpportunitySkill`,
      `EligibilityCriteria`, `OpportunityReport` (suspicious-listing reports)
- [x] **Applications:** `Application`, `ApplicationEvent` (status trail), `RejectionReason`
      (coded + anonymised free text), `Shortlist`, `Interview`, `Offer`
- [x] **Portfolio:** `Project`, `Achievement`, `Certification`, `Education`, `Experience`,
      `Endorsement`, `PortfolioSettings` (visibility)
- [x] **Credentials:** `Certificate` (issuer, recipient, type, issuedAt, `verificationCode`,
      revoked flag), `CertificateVerificationLog`
- [x] **Learning:** `LearningResource` (SWAYAM / NPTEL / other, free flag, URL, duration),
      `SkillResourceMap`, `LearningPath`, `LearningPathItem`, `Enrollment`
- [x] **Collaboration:** `Mentorship`, `MentorshipSession`, `Workshop`, `GuestLecture`,
      `InnovationChallenge`, `ChallengeSubmission`
- [x] **Outcomes:** `PlacementRecord`, `OutcomeSurvey` (6-month / 12-month, employed, role relevance,
      satisfaction) — the longitudinal differentiator
- [x] **Analytics support:** `SkillDemandSnapshot` (skill × region × period × demand count),
      `CurriculumSkillCoverage` (institution × skill × covered?) — the reverse gap report's inputs
- [x] **Platform:** `Notification`, `Message`, `Thread`, `Document` (secure storage metadata),
      `AuditLog`, `Region` (state / district), `Institution`, `Company`
- [x] Indexes on every foreign key and on the columns the search facets filter by
- [~] `dev.db` on SQLite; the MySQL swap is **three** places, not one — Prisma 7 moved the URL out of the schema and requires a driver adapter. Documented in docs/DATA-MODEL.md and ADR-011. Still no application-code change.

### Seed data — `prisma/seed.ts`
- [x] **Ayush skill branch (the differentiator):** Ayurvedic diagnostics (*nadi pariksha*, *prakriti*
      assessment), Panchakarma procedures, Dravyaguna / herbal pharmacology, Rasashastra,
      GMP and Ayush pharmaceutical manufacturing, Ayush regulatory affairs and AYUSH-approved claims,
      clinical research and CTRI trial methodology, medical writing, pharmacovigilance,
      wellness centre operations, medical tourism, Ayush informatics — mapped to NCISM curriculum areas
- [~] **Generic branches:** software, data, communication, operations/management and the full
      soft-skill branch all shipped. **Electronics/core engineering and design were not** — no career
      path or opportunity in the content references them, so seeding them would have been unused
      rows. Add them alongside the first career path that needs them.
- [x] **Career paths:** 12+ including BAMS/BHMS clinical practice, Ayush pharma QA, panchakarma
      therapy centre management, clinical research associate, regulatory affairs executive, medical
      writer, wellness entrepreneur, plus generic software/data/management paths
- [x] **Role–skill weight maps** for every career path (this is what makes matching meaningful)
- [x] **Assessment bank:** 60+ questions across technical, domain and soft skills, weighted
- [x] **Learning resources:** 40+ real SWAYAM / NPTEL courses mapped to skills, with real URLs
- [x] **Regions:** Indian states and a district subset, for the regional demand map
- [~] **Demo world:** 6 verified companies + 1 deliberately PENDING (so the admin queue has
      something real), 3 institutions, 8 students with varied gaps, 1 academician, 8 opportunities,
      applications at all 7 pipeline stages, 2 certificates (one revoked). Fewer students and
      academicians than specified, more companies. Opportunities are 8 not 15 because they are
      derived from the Phase 2 content fixtures — inventing extra listings here would have broken
      the contract between the public pages and the database.
- [x] `npm run db:reset` — drop, migrate, seed, in one command

### Documentation
- [~] `docs/DATA-MODEL.md` rewritten as-built with entity groups, relationships, indexing and the
      reasoning behind the load-bearing tables. **No SVG ER diagram** — 56 models will not fit one
      readable diagram; the grouped listing plus the relationship block is more useful. A focused
      diagram of the matching-engine path belongs in the Phase 15 pitch deck.

## Acceptance criteria

1. `npm run db:reset` completes in under 20 seconds and produces a fully populated database.
2. Prisma Studio shows sensible, realistic data in every table — nothing named "test test".
3. The schema supports every feature in Phases 4–11 with no further migrations needed for
   *structure* (additive migrations are fine).
4. Every foreign key is indexed; the opportunity search facets have covering indexes.
5. `docs/DATA-MODEL.md` is accurate against the actual schema.

## Notes

- Spend the extra hour on the seed data. It is the difference between a demo that lands and a demo
  where the judge sees "Student 1 · Skill A · 50%" and stops believing.
- `RoleSkillRequirement.weight` is the most important number in the product. Set it thoughtfully:
  a role's defining skill at 1.0, supporting skills at 0.6–0.8, nice-to-haves at 0.3.
- Keep `SkillDemandSnapshot` denormalised on purpose. Analytics queries over live application data
  will not be fast enough to feel good in a demo.

---

## Phase Summary

*Completed 2026-09-08.*

**What was built.** `prisma/schema.prisma` — **56 models, 20 enums**, one migration — plus a seed
that builds a complete, narrative demo world in **7 seconds**. The Phase 2 content fixtures are now
the seed's input rather than a parallel copy, so the public pages and the database cannot disagree.

**Key decisions made.**

- **The seed imports from `src/content/`.** Careers, skills, opportunities and their weights are
  transformed rather than retyped. `assertCatalogueComplete()` in `taxonomy.ts` fails the seed
  loudly if content references a skill the catalogue does not define — which is how content drift
  gets caught at seed time instead of as a foreign-key error mid-demo.
- **Prisma 7 needed real investigation, not assumption** (ADR-011). Two things bit:
  `npm install prisma` pulled an **8.0 release candidate** because Prisma's `latest` dist-tag
  currently points at one, while `@prisma/client` resolved to stable 7.10 — a mismatch that would
  have failed obscurely. Both are now pinned to `^7.10.0`. And Prisma 7 moved the datasource URL
  out of the schema and made a driver adapter mandatory.
- **SQLite enums were tested, not assumed.** The received wisdom is that Prisma enums are
  unsupported on SQLite. A minimal schema proved otherwise on 7.10, so schema principle 4 holds in
  development as well as production — no downgrade to stringly-typed status columns.
- **One `Opportunity` model covers students and faculty.** The `type` enum spans internships
  through `FDP`, `FACULTY_INTERNSHIP`, `CONSULTANCY` and `RESEARCH`. Phase 9 should be close to free.
- **A deliberately PENDING company and a revoked certificate are seeded**, so the admin
  verification queue and the certificate revocation path are demonstrable rather than theoretical.
- **One outcome survey is deliberately unanswered**, forcing dashboards to show a real response
  rate rather than quietly hide non-response.
- **The demo data is a story.** Ananya is clinically strong (7 assessment-verified skills, 1
  employer-endorsed) with gaps in exactly clinical research methodology, GCP and regulatory
  framework — which is precisely what the matching engine will point her at, and what the career
  content says the thin-competition paths need.

**Final model list.** 56 models across: identity & profiles (9), organisations & geography (3),
taxonomy (3), careers (3), assessment (5), skill profile (1), opportunities (4), applications (5),
portfolio & credentials (9), learning (5), collaboration (5), outcomes & analytics (4), platform (5).
Full listing and reasoning in `docs/DATA-MODEL.md`.

**Taxonomy structure.** 12 categories / 48 skills / 14 prerequisite-and-related relations.
Ayush branches are built out first and deepest — Ayurveda Clinical, Ayurveda Pharmacology, Ayush
Manufacturing, Ayush Regulatory, Ayush Safety, Wellness & Therapy — with 12 skills carrying an
explicit **NCISM curriculum area**, which is the Ayush alignment made concrete rather than claimed.
Generic branches (Research, Data, Software, Communication, Operations, Professional Skills) ship
alongside.

**Demo accounts** — password `KaushalSetu@2026` for all (a seeded placeholder hash; Phase 4
replaces it with bcrypt at registration):

| Role | Email | Story |
| --- | --- | --- |
| Student | `ananya@student.aiia.gov.in` | 3rd-year BAMS — the main demo thread |
| Student | `rahul@student.spit.ac.in` | 1st year — the micro-internship story |
| Academician | `meera.iyer@aiia.gov.in` | Associate Professor, Dravyaguna |
| Industry | `vikram@himalayawellness.example` | Verified employer, QA lead |
| Institution | `placements@aiia.gov.in` | Placement officer at AIIA |
| Admin | `admin@kaushalsetu.in` | Verification queue |

**Deviations from the spec above, and why.** Four, all marked `- [~]` in the deliverables and
summarised here: the MySQL swap is three places rather than one (Prisma 7); electronics and design
skill branches were skipped as unreferenced; there is no SVG ER diagram (56 models will not fit one
readable picture); and the demo world has more companies but fewer students, academicians and
opportunities than specified — opportunities are derived from the Phase 2 fixtures, and inventing
extras would have broken the very contract this phase exists to honour.

**Anything the next phase must know.**

1. **`src/lib/db/client.ts` is the only place a Prisma client should be constructed.** It handles
   the adapter and the hot-reload singleton.
2. **Do not run `npm update` on `prisma` / `@prisma/client`.** They are pinned to `^7.10.0`
   deliberately; `latest` is an 8.0 RC (ADR-011).
3. **`prisma migrate reset` is blocked for AI agents** and needs explicit user consent each time.
   `npm run db:seed` does its own wipe and needs no consent — prefer it for routine resets.
4. **Auth models already exist** (`User`, `Account`, `Session`, `VerificationToken` with `purpose`
   and `usedAt`). Phase 4 needs no migration for them. `passwordHash` currently holds a seeded
   placeholder, **not** a bcrypt hash — Phase 4 must replace the hashing on registration and
   re-seed.
5. **`Role`, `VerificationTier`, `ApplicationStatus` and `RejectionCode` enums are the contract**
   for Phases 4–10. Import them from `@/generated/prisma/client`, never retype them.
6. **`src/generated/prisma` is git-ignored.** A fresh clone must run `npm run db:generate` (or any
   `db:*` script) before `typecheck` will pass.
7. **`scripts/verify-db.ts`** checks integrity and prints the matching-engine input. Run it after
   changing the seed.

**Verified by.**

| Check | Result |
| --- | --- |
| `prisma validate` | Schema valid |
| `prisma migrate dev` | One migration applied cleanly; enums accepted on SQLite |
| `npm run db:seed` | Completes in **6.9–7.2s** — target was under 20s |
| `npm run db:reset` | Full drop → migrate → seed in **7.1s** (run once with explicit user consent) |
| Integrity checks (`scripts/verify-db.ts`) | **8/8 pass** — no orphans, no duplicate slugs, no weight or proficiency out of range, no opportunity without eligibility or skills, **no published opportunity from an unverified company**, **no rejection without a coded reason** |
| Matching-engine input | Reads correctly with weights, minimums and must-have flags |
| Verification tiers on demo student | 7 assessment-verified, 1 employer-endorsed, 3 self-declared |
| Reverse gap report inputs | Demand and curriculum coverage join correctly; top-demanded skills correctly show `covered=false` |
| Certificate lookup | Resolves code → recipient → issuer → revocation status |
| Query performance | Full verification suite in **334ms** |
| `npm run check` | typecheck, lint, format and contrast (38/38) all clean |
| `npm run build` | Compiled in 24.5s, no errors |
