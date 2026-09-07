# Phase 14 — AI Layer *(built last, by design)*

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 5, 6, 7, 8 — all of them working without AI |
| **Blocks** | Nothing |
| **Estimate** | 6 focused hours |
| **Precondition** | **Do not start this phase until Phases 0–13 are complete.** |

## Why this phase is last

Two reasons, and both are worth saying out loud in the pitch:

1. **Practical.** AI credits are limited. Spending them on a feature nobody can see is waste;
   spending them at the end, on a product that already works, is leverage.
2. **Architectural, and this is the better argument.** A recommendation engine you cannot explain is
   a liability in an evaluation. Phase 6 built a deterministic, auditable, zero-cost matching engine
   that a judge can verify on a whiteboard. AI *enhances* that engine's inputs and presentation —
   it never becomes the thing the product depends on.

**The governing rule: every AI feature has a working non-AI fallback that is already shipped.**
If the API key is absent, the quota is exhausted, or the network is down, the product loses polish
and loses nothing else. This must be true on stage, and it must be true in the code.

## Architecture

- [ ] `src/lib/ai/provider.ts` — a single interface (`complete`, `embed`, `extract`) with two
      implementations: the real provider, and a deterministic `NullProvider` that returns the
      Phase 5/6 rule-based result
- [ ] `AI_ENABLED` environment flag; when false, `NullProvider` is wired in and no key is required
- [ ] Aggressive response caching keyed on content hash — the same resume is never parsed twice
- [ ] Per-user and global token budgets, enforced before the call, with a graceful message on exhaustion
- [ ] Every AI-generated output is labelled as AI-assisted in the UI and is user-editable
- [ ] Structured outputs validated with Zod; a malformed response falls back rather than crashing
- [ ] Cost and call logging so spend is visible, not discovered

## Features, in priority order

### 1. Resume parsing → structured skills *(highest value per token)*
- [ ] Upload a resume, extract skills, education, experience and projects into the portfolio
- [ ] Extracted skills enter as **SELF_DECLARED** only — parsing is not verification, and the tier
      system must not be undermined by convenience
- [ ] User reviews and confirms every extraction before it is saved
- [ ] **Fallback:** keyword matching against the skill taxonomy, which works acceptably and costs nothing

### 2. Semantic skill matching *(layered on top of Phase 6)*
- [ ] Embed skill names and descriptions to catch synonyms and near-equivalents — "Panchakarma
      therapy" matching "detoxification procedures", "React" matching "ReactJS"
- [ ] Embeddings are computed **once per skill at seed time** and cached in the database, not per
      request. Cost is bounded and tiny.
- [ ] The semantic score adjusts the Phase 6 cosine score by a bounded factor; it never replaces it,
      so the explanation panel remains truthful
- [ ] **Fallback:** exact and alias matching from a hand-curated synonym table

### 3. Career guidance assistant
- [ ] A chat interface grounded in the student's own skill profile, gaps and local opportunities
- [ ] Strictly scoped to career guidance; refuses off-topic use
- [ ] Retrieval from the platform's own data, not open-ended generation
- [ ] Rate limited per user
- [ ] **Fallback:** a decision-tree guidance flow over the same data, which is genuinely useful alone

### 4. Interview preparation
- [ ] Generate role-specific and skill-specific practice questions from the opportunity
- [ ] Model answer guidance and a self-assessment rubric
- [ ] **Fallback:** a curated question bank per role, seeded in Phase 3

### 5. Assessment answer evaluation
- [ ] Evaluate free-text and scenario answers against a rubric, with reasoning shown
- [ ] Human-reviewable; never the sole determinant of a verified badge
- [ ] **Fallback:** keyword rubric scoring, plus these question types simply carry less weight

### 6. Content assistance
- [ ] Help industry write clearer job descriptions with correctly tagged skills
- [ ] Help students phrase project descriptions
- [ ] **Fallback:** templates and structured prompts, which many users prefer anyway

## Acceptance criteria

1. With `AI_ENABLED=false`, every route works and no feature disappears — only its quality changes.
2. Every AI output is labelled and editable.
3. Token spend per feature is logged and visible in the admin view.
4. Cache hit rate is measurable, and repeated identical requests cost nothing.
5. A forced provider failure degrades to the fallback with no error surfaced to the user.
6. No AI output is ever the sole basis for a verified skill badge or a rejection.

## Notes

- Build features **1 and 2 only** if credits are tight. They deliver the most visible value per token
  and both have solid fallbacks.
- The pitch line: *"The platform is fully functional with AI disabled. AI improves the quality of
  matches; it is not what makes them possible."* That is a strong, honest, memorable answer to the
  inevitable "where is the AI?" question — and it quietly reframes the absence of a black box as a
  design decision, which it is.
- Never let an AI-parsed skill become verified. The three-tier system is the product's credibility
  and a convenience shortcut would hollow it out.

---

## Phase Summary

> **Fill this in before starting Phase 15. Mandatory.**

**What was built:**

**Provider, models and settings used:**

**Fallback behaviour verified for each feature:**

**Measured token cost per feature:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
