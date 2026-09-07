# Phase 6 — Skill Mapping, Matching & Recommendations

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 3, 5 |
| **Blocks** | Phases 7, 10 |
| **Estimate** | 7 focused hours |

## Objective

The intelligence of the platform, built entirely from arithmetic. The brief asks for a
"recommendation engine to match students with relevant placement opportunities" and skill mapping
that "recommends relevant industries, job roles, and skill development programs".

We deliver it with weighted cosine similarity over skill vectors. It costs nothing, runs instantly,
never rate-limits, produces identical results every time, and — the part that wins marks — can be
explained completely on one screen.

## The algorithm (write it down, defend it)

```
Represent each student and each opportunity as a vector over the skill taxonomy.

  student[i]      = proficiency in skill i, normalised to 0..1
  opportunity[i]  = required proficiency × role weight for skill i, 0 if not required

  base   = cosine_similarity(student, opportunity)          // direction of fit
  cover  = Σ min(student[i], required[i]) / Σ required[i]   // how much of the requirement is met
  crit   = 1 if every must-have skill meets its minimum, else penalty factor
  verif  = weighted share of matched skills that are verified, not self-declared

  score  = (0.45·base + 0.35·cover + 0.20·verif) × crit × eligibility

Eligibility (programme, year, CGPA, location preference) is a hard gate: 0 or 1.
Every term above is displayed to the user in the explanation panel.
```

The `verif` term is deliberate: it makes the three-tier verification system *materially* affect
outcomes rather than being decorative, which is the point of building it.

## Deliverables

### Engine — `src/lib/matching/`
- [ ] `vector.ts` — build sparse skill vectors for students, roles and opportunities
- [ ] `similarity.ts` — cosine, coverage, critical-skill gate, verification weighting
- [ ] `eligibility.ts` — hard filters (programme, year, CGPA, location, availability)
- [ ] `explain.ts` — returns the per-skill contribution breakdown behind any score
- [ ] `rank.ts` — sort, diversify (don't return five listings from one company), paginate
- [ ] Full Vitest suite including edge cases: empty profile, over-qualified, zero overlap,
      single-skill role, and a golden-file test that locks scores against regression

### Student-facing
- [ ] `/dashboard/student/recommendations` — three tabs: opportunities, career paths, learning
- [ ] **Match explanation panel** on every recommendation: which skills matched, each one's weight
      and contribution, what is missing, and the exact score arithmetic. This is the screen to
      demo. It answers the judge's question before they ask it.
- [ ] Career path recommendations ranked by fit and by demand, with "what you'd need to add"
- [ ] **Gap → free learning path:** each gap maps to specific SWAYAM / NPTEL courses, ordered by
      prerequisite, with estimated hours and a projected score improvement on completion
- [ ] Industry and sector recommendations
- [ ] "Improve my match" simulator — a slider showing how acquiring skill X moves your score on
      the roles you want. Cheap to build, extremely convincing on stage.
- [ ] Saved and dismissed recommendations

### Recruiter-facing
- [ ] Candidate matching for a posting, with the same explanation panel from the other side
- [ ] Filter to verified-skill candidates only
- [ ] Match-score threshold and sorting

### Market intelligence
- [ ] **Regional demand map** — an SVG map of India, skill demand shaded by state/district, so
      students see opportunity outside the obvious three cities
- [ ] Trending skills by sector and period, computed from `SkillDemandSnapshot`
- [ ] `/careers/[path]` public pages fed by real data now (Phase 2 built them on fixtures)

## Acceptance criteria

1. Scores are deterministic and unit-tested; the golden-file test passes.
2. Every recommendation opens an explanation the user can follow without a maths background.
3. Changing one skill's proficiency changes rankings in the direction a human would predict.
4. Matching 500 students against 100 opportunities completes in under 500ms.
5. Every identified gap resolves to at least one free, real, working course link.
6. The engine has zero dependency on any external service or API key.

## Notes

- **Say "we did not use AI here, deliberately"** and explain why: explainability, zero cost,
  determinism, and no dependency on an API being up during evaluation. Framed that way it reads as
  engineering judgement rather than a limitation. The AI layer in Phase 14 then arrives as an
  enhancement on a system that already works.
- Precompute and cache opportunity vectors. They change rarely; student vectors change on assessment.
- The "improve my match" simulator is the single highest demo-value feature in this phase relative
  to build cost. Prioritise it if time is short.

---

## Phase Summary

> **Fill this in before starting Phase 7. Mandatory.**

**What was built:**

**Final scoring formula and weights as implemented:**

**Performance measured (records × time):**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
