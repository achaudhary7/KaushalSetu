# Phase 9 — Academician / Faculty Track

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 4, 7 |
| **Blocks** | Nothing |
| **Estimate** | 5 focused hours |

## Objective

The brief explicitly asks for "a dedicated portal for academicians to explore faculty internships,
industrial training, Faculty Development Programmes (FDPs), consultancy opportunities, and
collaborative research projects."

Most competing teams will build a student placement portal and quietly drop this. Building it is
therefore a cheap way to be visibly more complete than the field — and it is the half of the
"academia–industry" title that everyone forgets.

## Deliverables

### Faculty profile
- [ ] `/dashboard/academician` — dashboard with opportunities, applications, upcoming programmes
- [ ] Profile: designation, department, qualifications, specialisations, years of teaching,
      industry exposure, publications, patents, projects guided, subjects taught
- [ ] Expertise tagging against the same skill taxonomy students use — which is what lets us match
      faculty to research collaborations and industry problems using the Phase 6 engine, unchanged
- [ ] Public faculty profile page (opt-in, indexable, `Person` JSON-LD)

### Opportunity types (reusing the Phase 7 `Opportunity` model, different types)
- [ ] **Faculty internships** — a term or summer placement in industry
- [ ] **Industrial training** — short structured programmes
- [ ] **FDPs** — catalogue, schedule, registration, capacity, waitlist, completion certificate
      (issued through the Phase 8 QR system — no extra work, immediate credibility)
- [ ] **Consultancy** — companies post problems, faculty express interest, scope and terms recorded
- [ ] **Collaborative research** — industry research needs matched to faculty expertise, with a
      joint-proposal record

### Flows
- [ ] Browse and filter by type, domain, duration, mode, location, sponsor
- [ ] Apply / register / express interest, with the appropriate flow per type
- [ ] Institution approval step where policy requires it (a faculty member usually needs a nod
      before an industry engagement) — model it, it is realistic and institutions will notice
- [ ] Tracking dashboard: applied, approved, in progress, completed
- [ ] Completion records feeding the faculty profile and the institution's dashboard

### Ayush specificity
- [ ] Seeded Ayush FDPs (NCISM-aligned pedagogy, research methodology, GMP for Ayush manufacturing,
      clinical trial design for classical formulations)
- [ ] Research collaboration examples with Ayush pharma and hospitals
- [ ] Consultancy examples: formulation standardisation, quality control, pharmacovigilance

### Cross-links
- [ ] Faculty can be listed as mentors in the Phase 11 collaboration hub
- [ ] Faculty industry exposure feeds the institution analytics in Phase 10
- [ ] Guest lecture requests flow between industry and faculty in both directions

## Acceptance criteria

1. An academician registers, completes a profile, discovers an FDP, registers, and receives a
   verifiable completion certificate.
2. A consultancy opportunity posted by industry surfaces to faculty with matching expertise.
3. The institution can see and approve its faculty's industry engagements.
4. Faculty opportunities are excluded from student-facing search, and vice versa.
5. No Phase 7 code is duplicated — the same models and components are reused with different types.

## Notes

- This phase should feel almost free if Phase 7 was built with a generic `Opportunity` type enum
  rather than a hard-coded internship model. If it does not feel free, the Phase 7 abstraction was
  wrong and this is the moment to fix it.
- The institution approval step is a small piece of realism that signals you have actually thought
  about how colleges work. Cheap, and it registers with academic evaluators.

---

## Phase Summary

> **Fill this in before starting Phase 10. Mandatory.**

**What was built:**

**How Phase 7 models were reused (and anything added):**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
