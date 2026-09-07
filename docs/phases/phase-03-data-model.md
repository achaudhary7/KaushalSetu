# Phase 3 — Data Model & Skill Taxonomy

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phase 0 |
| **Blocks** | Phases 4–11 |
| **Estimate** | 5 focused hours |

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
- [ ] **Identity:** `User`, `Account`, `Session`, `VerificationToken`, `Role` enum
      (STUDENT, ACADEMICIAN, INDUSTRY, INSTITUTION, ADMIN)
- [ ] **Profiles:** `StudentProfile`, `AcademicianProfile`, `IndustryProfile`, `InstitutionProfile`
- [ ] **Taxonomy:** `SkillCategory`, `Skill` (slug, description, type: TECHNICAL/SOFT/DOMAIN/TOOL,
      level descriptors), `SkillRelation` (prerequisite / related / successor)
- [ ] **Career model:** `CareerPath`, `JobRole`, `RoleSkillRequirement` (skill, weight 0–1,
      minimum proficiency) — this table *is* the matching engine's input
- [ ] **Assessment:** `Assessment`, `Question` (with type, options, weights, difficulty),
      `AssessmentAttempt`, `Answer`, `SkillScore`
- [ ] **Skill profile:** `UserSkill` (proficiency 0–5, `verificationTier`:
      SELF_DECLARED / ASSESSMENT_VERIFIED / EMPLOYER_ENDORSED, evidence link, timestamps)
- [ ] **Opportunities:** `Opportunity` (type: INTERNSHIP / MICRO_INTERNSHIP / APPRENTICESHIP /
      JOB / LIVE_PROJECT / FDP / FACULTY_INTERNSHIP / CONSULTANCY / RESEARCH), `OpportunitySkill`,
      `EligibilityCriteria`, `OpportunityReport` (suspicious-listing reports)
- [ ] **Applications:** `Application`, `ApplicationEvent` (status trail), `RejectionReason`
      (coded + anonymised free text), `Shortlist`, `Interview`, `Offer`
- [ ] **Portfolio:** `Project`, `Achievement`, `Certification`, `Education`, `Experience`,
      `Endorsement`, `PortfolioSettings` (visibility)
- [ ] **Credentials:** `Certificate` (issuer, recipient, type, issuedAt, `verificationCode`,
      revoked flag), `CertificateVerificationLog`
- [ ] **Learning:** `LearningResource` (SWAYAM / NPTEL / other, free flag, URL, duration),
      `SkillResourceMap`, `LearningPath`, `LearningPathItem`, `Enrollment`
- [ ] **Collaboration:** `Mentorship`, `MentorshipSession`, `Workshop`, `GuestLecture`,
      `InnovationChallenge`, `ChallengeSubmission`
- [ ] **Outcomes:** `PlacementRecord`, `OutcomeSurvey` (6-month / 12-month, employed, role relevance,
      satisfaction) — the longitudinal differentiator
- [ ] **Analytics support:** `SkillDemandSnapshot` (skill × region × period × demand count),
      `CurriculumSkillCoverage` (institution × skill × covered?) — the reverse gap report's inputs
- [ ] **Platform:** `Notification`, `Message`, `Thread`, `Document` (secure storage metadata),
      `AuditLog`, `Region` (state / district), `Institution`, `Company`
- [ ] Indexes on every foreign key and on the columns the search facets filter by
- [ ] `dev.db` on SQLite; `provider` swap to MySQL documented as a one-line change

### Seed data — `prisma/seed.ts`
- [ ] **Ayush skill branch (the differentiator):** Ayurvedic diagnostics (*nadi pariksha*, *prakriti*
      assessment), Panchakarma procedures, Dravyaguna / herbal pharmacology, Rasashastra,
      GMP and Ayush pharmaceutical manufacturing, Ayush regulatory affairs and AYUSH-approved claims,
      clinical research and CTRI trial methodology, medical writing, pharmacovigilance,
      wellness centre operations, medical tourism, Ayush informatics — mapped to NCISM curriculum areas
- [ ] **Generic branches:** software and data, electronics and core engineering, management and
      business, design, and a full soft-skill branch (communication, teamwork, problem solving,
      adaptability, leadership, time management, ethics)
- [ ] **Career paths:** 12+ including BAMS/BHMS clinical practice, Ayush pharma QA, panchakarma
      therapy centre management, clinical research associate, regulatory affairs executive, medical
      writer, wellness entrepreneur, plus generic software/data/management paths
- [ ] **Role–skill weight maps** for every career path (this is what makes matching meaningful)
- [ ] **Assessment bank:** 60+ questions across technical, domain and soft skills, weighted
- [ ] **Learning resources:** 40+ real SWAYAM / NPTEL courses mapped to skills, with real URLs
- [ ] **Regions:** Indian states and a district subset, for the regional demand map
- [ ] **Demo world:** 3 verified companies (incl. an Ayush pharma unit and an Ayush hospital),
      2 institutions, 12 students with deliberately varied and *interesting* skill gaps,
      3 academicians, 15 opportunities, applications at every pipeline stage, 2 issued certificates
- [ ] `npm run db:reset` — drop, migrate, seed, in one command

### Documentation
- [ ] `docs/DATA-MODEL.md` — entity list, relationships, an ER diagram in SVG, and the reasoning
      behind the non-obvious tables (`RoleSkillRequirement`, `SkillDemandSnapshot`, `OutcomeSurvey`)

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

> **Fill this in before starting Phase 4. Mandatory.**

**What was built:**

**Final model list and any additions beyond the spec:**

**Taxonomy structure (categories → skill counts):**

**Demo accounts and their credentials:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
