# Data Model

> **Status: planned.** The authoritative schema is written in Phase 3 (`prisma/schema.prisma`).
> This document is the design intent, and is updated to match reality when Phase 3 closes.
> Full deliverable list: `docs/phases/phase-03-data-model.md`.

## Principles

1. **The skill taxonomy is data, not code.** Swapping Ayush for engineering is a seed change, never
   a code change. This is what makes the platform credibly domain-agnostic while shipping Ayush-first.
2. **Soft-delete anything a user authored** (`deletedAt`), rather than destroying records.
3. **Auditable state.** Applications, verifications and endorsements carry an event trail, not just
   a current status column.
4. **Enums, not free strings**, for role, status and type. A typo is not a valid state.
5. **Denormalise for analytics.** Dashboards read snapshot tables, never live aggregates over
   application data — a demo cannot wait on a five-way join.

## Entity groups

**Identity & profiles** — `User` · `Account` · `Session` · `VerificationToken` ·
`StudentProfile` · `AcademicianProfile` · `IndustryProfile` · `InstitutionProfile` ·
`Company` · `Institution` · `Region`

**Taxonomy & careers** — `SkillCategory` · `Skill` · `SkillRelation` · `CareerPath` · `JobRole` ·
`RoleSkillRequirement`

> `RoleSkillRequirement(skill, weight 0–1, minProficiency)` is the most important table in the
> product. It is the vector the Phase 6 matching engine scores against. Its weights decide whether
> recommendations feel intelligent or arbitrary.

**Assessment & skill profile** — `Assessment` · `Question` · `AssessmentAttempt` · `Answer` ·
`SkillScore` · `UserSkill`

> `UserSkill.verificationTier` ∈ `SELF_DECLARED | ASSESSMENT_VERIFIED | EMPLOYER_ENDORSED`.
> Load-bearing: it drives badge display, recruiter filtering, and the `verif` term in the match
> score. See ADR-006.

**Opportunities & applications** — `Opportunity` · `OpportunitySkill` · `EligibilityCriteria` ·
`OpportunityReport` · `Application` · `ApplicationEvent` · `RejectionReason` · `Shortlist` ·
`Interview` · `Offer`

> One `Opportunity` model with a `type` enum covers internships, micro-internships, apprenticeships,
> jobs, live projects, **and** the entire Phase 9 faculty track (FDP, faculty internship,
> consultancy, research). Get this abstraction right in Phase 3 and Phase 9 costs almost nothing.

**Portfolio & credentials** — `Project` · `Achievement` · `Certification` · `Education` ·
`Experience` · `Endorsement` · `PortfolioSettings` · `Certificate` · `CertificateVerificationLog`

**Learning** — `LearningResource` (SWAYAM / NPTEL) · `SkillResourceMap` · `LearningPath` ·
`LearningPathItem` · `Enrollment`

**Collaboration** — `Mentorship` · `MentorshipSession` · `Workshop` · `GuestLecture` ·
`InnovationChallenge` · `ChallengeSubmission`

**Outcomes & analytics** — `PlacementRecord` · `OutcomeSurvey` (6- and 12-month) ·
`SkillDemandSnapshot` (skill × region × period) · `CurriculumSkillCoverage` (institution × skill)

> The last three exist for features the brief never asked for: longitudinal outcome tracking and the
> reverse skill-gap report. They are what make the platform interesting to a ministry rather than
> only to students.

**Platform** — `Notification` · `Thread` · `Message` · `Document` · `AuditLog`

## Key relationships

```
User 1─1 {Student|Academician|Industry|Institution}Profile
User 1─n UserSkill n─1 Skill n─1 SkillCategory
Skill n─n JobRole            (via RoleSkillRequirement: weight, minProficiency)
JobRole n─1 CareerPath
Company 1─n Opportunity 1─n OpportunitySkill n─1 Skill
Opportunity 1─n Application 1─n ApplicationEvent
Application 0─1 RejectionReason      -> anonymised -> SkillDemandSnapshot
Application 0─1 Offer 0─1 PlacementRecord 1─n OutcomeSurvey
User 1─n Certificate  (unique verificationCode -> public /verify/[code])
Company 1─n Endorsement n─1 UserSkill   (promotes tier to EMPLOYER_ENDORSED)
Institution 1─n CurriculumSkillCoverage n─1 Skill   -> reverse gap report
```

## Indexing plan

Every foreign key. Plus covering indexes on the search facets that Phase 7 filters by:
`Opportunity(type, status, deadline)`, `Opportunity(regionId)`, `OpportunitySkill(skillId)`,
`Application(userId, status)`, `Application(opportunityId, status)`,
`UserSkill(userId, verificationTier)`, `Certificate(verificationCode)` unique,
`SkillDemandSnapshot(skillId, regionId, period)`.

## Provider portability

SQLite in development, MySQL 8 in production (ADR-003). To stay portable: no raw SQL, no
provider-specific types, no database-level enums relied upon for constraint enforcement (Prisma
enforces them), `utf8mb4` collation in MySQL. Tested against MySQL in Phase 13.

---

*Replace this file's content with the as-built model, plus an SVG ER diagram, when Phase 3 closes.*
