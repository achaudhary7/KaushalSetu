# Phase 5 — Skill Assessment & Profiling

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 3, 4 |
| **Blocks** | Phases 6, 8, 10 |
| **Estimate** | 8 focused hours |

## Objective

The first pillar of the brief: *"Students complete a questionnaire to evaluate their technical and
soft skills shared by industry. The system generates a skill profile and identifies strengths and
skill gaps based on current industry requirements."*

Everything here is deterministic arithmetic. No AI, no credits, and — critically — it is
**explainable**. When a judge asks "how did you calculate that?", the answer is a formula you can
write on a whiteboard.

## Deliverables

### Assessment engine
- [ ] Question types: single-choice, multi-choice, Likert (soft skills), scenario/situational
      judgement, short numeric, and ordering
- [ ] Industry-defined criteria — a company or admin can attach weights to skills so the assessment
      reflects *current industry requirements*, exactly as the brief specifies
- [ ] Section structure: technical, domain (Ayush-specific for Ayush programmes), aptitude, soft skills
- [ ] Branching — a strong answer unlocks a harder follow-up, a weak one stops that thread. Cheap to
      implement, and it makes the assessment feel adaptive without any model.
- [ ] Timed aptitude module: quantitative, logical, verbal, with a per-section timer
- [ ] Autosave every answer; a dropped connection or closed tab loses nothing
- [ ] Resume-in-progress with a clear "you are on question 14 of 40" indicator
- [ ] Anti-gaming basics: question shuffling, option shuffling, one attempt per window with a
      cooldown, and a recorded attempt trail

### Scoring — `src/lib/assessment/scoring.ts`
- [ ] Per-question weighted scoring producing a raw score per skill
- [ ] Normalisation to a 0–5 proficiency scale with named bands
      (Novice / Beginner / Competent / Proficient / Expert) and written descriptors for each
- [ ] Confidence weighting: fewer questions on a skill produces a lower-confidence score, and the UI
      says so rather than pretending to precision it does not have
- [ ] Soft-skill scoring from Likert responses with behavioural anchors, plus a consistency check
      across reverse-coded items
- [ ] **Gap computation:** for a target role, `gap = required_proficiency − current_proficiency`,
      ranked by `gap × role_weight × market_demand`. This ranking is what makes the output *useful*
      rather than merely descriptive.
- [ ] Fully unit-tested (Vitest) — this is the part a judge is most likely to probe

### Skill profile output
- [ ] `/dashboard/student/assessment` — take, resume, review history
- [ ] `/dashboard/student/skills` — the profile: radar chart across categories, per-skill proficiency
      bars, strengths list, ranked gap list
- [ ] **Verification tier written on completion** — every assessed skill is promoted from
      SELF_DECLARED to ASSESSMENT_VERIFIED, with the attempt as evidence. This is tier 2 of the
      three-tier badge system landing.
- [ ] Comparison views: you vs. your target role, you vs. your cohort's median (anonymised)
- [ ] A results page a student would actually want to share, with a downloadable SVG/PDF summary
- [ ] Re-assessment allowed after a cooldown, with progress-over-time charted

### Explainability
- [ ] A "how was this calculated?" panel on every score showing questions answered, weights applied
      and the arithmetic. Ship this. It is a differentiator and it takes an hour.

## Acceptance criteria

1. A student completes an assessment end to end and receives a profile in under 15 minutes.
2. The same answers always produce the same scores — verified by a deterministic test.
3. Every skill score traces back to specific questions through the UI.
4. Gap ranking visibly changes when the target role changes.
5. Closing the browser mid-assessment and returning loses no answers.
6. Assessment-verified badges appear on the profile immediately after completion.

## Notes

- **Explainability is the whole strategy here.** Most teams will hand-wave "AI-based assessment".
  A transparent, reproducible, weighted model that you can defend in thirty seconds is stronger
  in a viva than a black box you cannot explain.
- Keep the assessment genuinely short. A 40-question demo that takes four minutes to click through
  on stage is worth more than a rigorous 200-question instrument nobody will sit through.
- The confidence-weighting detail is small and makes the system look far more considered than it
  cost. Do not skip it.

---

## Phase Summary

> **Fill this in before starting Phase 6. Mandatory.**

**What was built:**

**Scoring formula as implemented (write the actual maths here):**

**Proficiency bands and their descriptors:**

**Question bank size and coverage:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
