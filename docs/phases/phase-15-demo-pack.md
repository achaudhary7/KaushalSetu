# Phase 15 — Demo Pack & Submission

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Everything built so far |
| **Estimate** | 4 focused hours |

## Objective

A built product does not present itself. This phase turns the software into a demonstration that
lands in the minutes you are given, and into a submission package that stands on its own when
nobody is there to explain it.

## Deliverables

### The narrative seed dataset
- [ ] A story dataset, not a random one. Named characters with believable situations:
  - **Ananya**, 3rd-year BAMS — strong in classical diagnostics, gaps in regulatory affairs and
    clinical research methodology. The platform maps her toward pharmacovigilance and hands her
    three free NPTEL courses. *She is the main demo thread.*
  - **Rahul**, 1st-year B.Pharm — almost no profile, discovers a micro-internship, builds his first
    verified portfolio entry. *He answers "what about junior students?"*
  - **Dr. Meera**, Associate Professor of Dravyaguna — finds an FDP and a research collaboration
    with an Ayush pharma unit. *She is the academician track, in thirty seconds.*
  - **Himalaya Wellness Pvt Ltd** — a verified employer posting a QA internship, screening blind,
    endorsing skills, issuing a QR certificate. *The industry thread.*
  - **AIIA, New Delhi** — the institution seeing the reverse skill-gap report. *The policy thread.*
- [ ] Applications sitting at every pipeline stage so no board looks empty
- [ ] Historical data across several months so every chart has a real trend
- [ ] One issued certificate, printed, with a QR that actually scans in the room
- [ ] `npm run db:seed:demo` restores this exact state in one command, in under 20 seconds

### The demo script
- [ ] A minute-by-minute script for the allotted slot, with the fallback cut for a shorter one
- [ ] Suggested spine:
      1. **The AIIA insight** (30s) — "this statement is generic, but it comes from AIIA. We built
         for the Ayush workforce." *Open here. It is the strongest thirty seconds you have.*
      2. Ananya: assessment → skill profile → ranked gaps → free learning path (2m)
      3. Match explanation panel — "here is exactly how that score was computed" (1m)
      4. Employer: verified badge, posts, screens **blind**, shortlists (1.5m)
      5. Certificate issued → scan the QR on a printed copy, live (1m) — *the moment people remember*
      6. Institution: reverse skill-gap report and 12-month outcomes (1.5m)
      7. Faculty track in thirty seconds — the half everyone else forgot (0.5m)
      8. Architecture, honest scope, roadmap (1m)
- [ ] Every click rehearsed; no live typing of long text; no dependency on the network
- [ ] A prepared answer for each likely question: how is matching computed, why no AI in the core,
      how do you stop fake certificates, how does this scale, what is mocked, what about privacy
- [ ] A recorded screen capture of the full demo as insurance against a laptop failure

### The pitch deck
- [ ] Slide 1 — the AIIA insight and the Ayush positioning
- [ ] Slide 2 — the problem, in numbers
- [ ] Slide 3 — the solution, one diagram
- [ ] Slide 4 — the four roles and what each gets
- [ ] Slide 5 — **the three gaps in the brief and how we closed them** (verification, curriculum
      feedback loop, longitudinal outcomes). This is the differentiation slide; give it the most work.
- [ ] Slide 6 — architecture, in SVG
- [ ] Slide 7 — the matching algorithm, written out as maths, explainable
- [ ] Slide 8 — **honest scope**: what is built, what is mocked, what is roadmap. Judges reward this
      and punish its absence when they probe.
- [ ] Slide 9 — impact and scale: what happens if a state adopts it
- [ ] Slide 10 — roadmap and the AI layer
- [ ] Deck built on the same brand system as the product

### Submission assets
- [ ] Screenshots of every major screen, both themes, at presentation resolution
- [ ] An SVG architecture diagram and an SVG user-flow diagram
- [ ] `README.md` finalised — a stranger can run this in five minutes
- [ ] Demo credentials for all five roles, printed on a card
- [ ] The public URL (tunnel or VPS), tested from a phone on mobile data
- [ ] A 3-minute demo video
- [ ] Post-hackathon roadmap: what a real pilot at one institution would need

### Final checks
- [ ] Every phase file has a completed summary block
- [ ] `PROGRESS.md` reflects reality
- [ ] `docs/DECISIONS.md` records every significant choice
- [ ] No placeholder text, no lorem ipsum, no broken links anywhere
- [ ] Mobile tested on a real phone, not just a devtools viewport
- [ ] A full run-through on the actual presentation laptop, offline

## Acceptance criteria

1. The demo runs start to finish within the time slot without improvisation.
2. `npm run db:seed:demo` returns the exact demo state reliably.
3. The printed certificate's QR scans on a phone and opens the verification page.
4. Every judge question in the prepared list has a rehearsed, honest answer.
5. The submission stands alone: someone reading the README and deck without a demo understands it.

## Notes

- **Open with the AIIA insight.** Most teams will present a generic placement portal. Naming the
  sponsor and showing you built for their actual workforce reframes everything that follows, and it
  costs you thirty seconds.
- **Rehearse the certificate QR scan on the real printed page.** It is the most tangible moment in
  the demo — a physical object verified live — and it is also the most likely to fail on the day if
  untested.
- Be honest about what is mocked. Every experienced evaluator can tell, and the teams that
  volunteer it are trusted on everything else they claim.

---

## Phase Summary

> **Fill this in when the project is complete.**

**What was built:**

**Final demo script timing:**

**Questions asked by judges and how they were answered:**

**What we would do differently:**

**Verified by:**
