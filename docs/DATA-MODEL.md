# Data Model

**Status: as-built.** The authoritative source is `app/prisma/schema.prisma`. This document
explains the reasoning; the schema is the truth. Last verified against the schema on 2026-09-08
(Phase 3).

**56 models, 20 enums, 1 migration.** Seeds in ~7s.

## Principles

1. **The skill taxonomy is data, not code.** Swapping Ayush for engineering is a change to
   `prisma/seed/taxonomy.ts` and nothing else.
2. **Soft-delete anything a user authored** (`deletedAt`), rather than destroying it.
3. **Auditable state.** Applications, verifications and endorsements carry an event trail, not
   just a current status column.
4. **Enums, not free strings.** A typo is not a valid state. (SQLite *does* accept Prisma enums —
   see ADR-011.)
5. **Denormalise for analytics.** Dashboards read snapshot tables, never live aggregation over
   application data.

## Model groups

**Identity & profiles (9)** — `User` · `Account` · `Session` · `VerificationToken` ·
`StudentProfile` · `AcademicianProfile` · `IndustryProfile` · `InstitutionProfile`

**Organisations & geography (3)** — `Company` · `Institution` · `Region`

**Taxonomy (3)** — `SkillCategory` · `Skill` · `SkillRelation`

**Careers (3)** — `CareerPath` · `JobRole` · `RoleSkillRequirement`

**Assessment (5)** — `Assessment` · `Question` · `AssessmentAttempt` · `Answer` · `SkillScore`

**Skill profile (1)** — `UserSkill`

**Opportunities (4)** — `Opportunity` · `OpportunitySkill` · `EligibilityCriteria` ·
`OpportunityReport`

**Applications (5)** — `Application` · `ApplicationEvent` · `RejectionReason` · `Interview` ·
`Offer`

**Portfolio & credentials (9)** — `PortfolioSettings` · `Project` · `Achievement` · `Education` ·
`Experience` · `Certification` · `Endorsement` · `Certificate` · `CertificateVerificationLog`

**Learning (5)** — `LearningResource` · `SkillResourceMap` · `LearningPath` · `LearningPathItem` ·
`Enrollment`

**Collaboration (5)** — `Mentorship` · `MentorshipSession` · `Event` · `EventRegistration` ·
`ChallengeSubmission`

**Outcomes & analytics (4)** — `PlacementRecord` · `OutcomeSurvey` · `SkillDemandSnapshot` ·
`CurriculumSkillCoverage`

**Platform (5)** — `Notification` · `Thread` · `Message` · `Document` · `AuditLog`

## The tables that carry the product

### `RoleSkillRequirement` — the matching engine's input

The single most important table. Phase 6 scores a student's `UserSkill` vector against these rows.

```
jobRoleId · skillId · weight (0..1) · minProficiency (0..5) · isCritical
```

`weight` decides whether recommendations feel intelligent or arbitrary: a role's defining skill is
1.0, supporting skills 0.6–0.8, nice-to-haves 0.3. `isCritical` is a hard gate — miss one and the
score is penalised regardless of everything else.

As seeded, Ayush Pharmaceutical QA looks like this:

```
w=1.00  min=4/5  [MUST]  GMP documentation and batch records
w=0.90  min=4/5  [MUST]  Dravyaguna and raw drug authentication
w=0.90  min=4/5  [MUST]  Ayurvedic Pharmacopoeia of India standards
w=0.80  min=3/5          Rasashastra and Bhaishajya Kalpana
w=0.70  min=3/5          Analytical instrumentation (HPTLC, HPLC basics)
w=0.60  min=3/5          Quality systems and audit readiness
```

### `UserSkill.verificationTier` — the credibility mechanism

`SELF_DECLARED | ASSESSMENT_VERIFIED | EMPLOYER_ENDORSED` (ADR-006). Drives badge display,
recruiter filtering, and the `verif` term in the match score — which is what makes verification
worth earning rather than decorative. An `Endorsement` promotes a row to `EMPLOYER_ENDORSED` and
records who vouched for it.

### `SkillDemandSnapshot` + `CurriculumSkillCoverage` — the reverse gap report

Neither is asked for by the problem statement. Together they are the feature that makes this
platform interesting to a ministry rather than only to students: demand on one side, syllabus
coverage on the other.

```
demand 20.4  covered=false  GMP documentation and batch records
demand 18.7  covered=false  Health informatics and terminology coding
demand 18.7  covered=false  Scientific and protocol writing
```

Denormalised deliberately — live aggregation over applications would never feel fast enough in a
demo.

### `OutcomeSurvey` — the longitudinal differentiator

Two windows (`SIX_MONTH`, `TWELVE_MONTH`) per `PlacementRecord`. The seed deliberately includes a
**non-response**, so dashboards must show a real response rate rather than hide it.

### `Opportunity` — one model, two audiences

The `type` enum covers `INTERNSHIP`, `MICRO_INTERNSHIP`, `APPRENTICESHIP`, `JOB`, `LIVE_PROJECT`
**and** the entire Phase 9 faculty track (`FDP`, `FACULTY_INTERNSHIP`, `CONSULTANCY`, `RESEARCH`).
Getting this abstraction right here is why Phase 9 should cost almost nothing.

### `Certificate` — QR verification

`verificationCode` is unique and resolves to the public `/verify/[code]` page (ADR-007).
`revokedAt` + `revokeReason` show publicly. `CertificateVerificationLog` records every lookup, so
"certificates verified this month" is a real number.

### `ApplicationEvent.wasBlind` — provable blind screening

Records whether a transition happened while blind screening was active, so a company can
demonstrate it screened blind (ADR-008) rather than merely claim it.

## Key relationships

```
User 1─1 {Student|Academician|Industry|Institution}Profile
User 1─n UserSkill n─1 Skill n─1 SkillCategory
Skill n─n JobRole              via RoleSkillRequirement (weight, minProficiency, isCritical)
JobRole n─1 CareerPath
Company 1─n Opportunity 1─n OpportunitySkill n─1 Skill
Opportunity 1─1 EligibilityCriteria           (hard gate in matching)
Opportunity 1─n Application 1─n ApplicationEvent
Application 0─1 RejectionReason   -> anonymised -> curriculum gap report
Application 0─1 Offer 0─1 PlacementRecord 1─n OutcomeSurvey
User 1─n Certificate (unique verificationCode -> public /verify/[code])
Company 1─n Endorsement n─1 UserSkill         (promotes tier to EMPLOYER_ENDORSED)
Institution 1─n CurriculumSkillCoverage n─1 Skill
```

## Indexing

Every foreign key, plus covering indexes on the columns the Phase 7 search facets filter by:

```
Opportunity(status, type, deadline) · Opportunity(companyId) · Opportunity(regionId)
OpportunitySkill(skillId) · Application(opportunityId, status) · Application(userId, status)
UserSkill(userId, verificationTier) · Certificate(verificationCode) unique
SkillDemandSnapshot(skillId, regionId, period) unique · AuditLog(targetType, targetId)
```

## JSON-in-string columns

SQLite has no native array or JSON type that survives a clean move to MySQL, so a handful of
read-mostly list fields are stored as JSON strings: `CareerPath.programmes` / `dayToDay` /
`entryRoutes` / `regions`, `Opportunity.responsibilities`, `EligibilityCriteria.programmes` /
`years`, `Question.options` / `correct`, `Certificate.skills`, `Application.matchBreakdown`.

**None of these is ever filtered on in SQL** — they are rendered, not queried. Anything the
platform actually filters by (skills, eligibility, region, status) is a real relation or column.

## Seeded demo world

`npm run db:seed` (or `db:reset` to rebuild from scratch) produces:

| | |
| --- | --- |
| Regions | 21 |
| Skill categories / skills / relations | 12 / 48 / 14 |
| Career paths / roles / skill requirements | 11 / 11 / 60 |
| Free courses (SWAYAM, NPTEL) / skill mappings | 12 / 46 |
| Institutions / companies | 3 / 7 (one deliberately `PENDING` verification) |
| Users across all five roles | 13 |
| Opportunities / their skill requirements | 8 / 32 |
| Assessment questions | 63 |
| Applications / status events / coded rejections | 15 / 57 / 2 |
| Outcome surveys (both windows, incl. a non-response) | 8 |
| Demand snapshots / curriculum coverage rows | 144 / 144 |

Verify at any time with `npx tsx scripts/verify-db.ts`.

## Provider portability

SQLite in development, MySQL 8 in production (ADR-003). Prisma 7 moved the connection URL out of
the schema, so the swap touches exactly three places (ADR-011):

1. `provider = "mysql"` in `prisma/schema.prisma`
2. `PrismaBetterSqlite3` → `PrismaMariaDb` in `src/lib/db/client.ts`
3. `DATABASE_URL` in the environment

No application code changes. Kept portable by using no raw SQL and no provider-specific types.
