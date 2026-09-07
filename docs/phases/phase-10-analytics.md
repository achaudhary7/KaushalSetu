# Phase 10 — Analytics, Dashboards & Reports

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 5, 7, 8 |
| **Blocks** | Nothing |
| **Estimate** | 7 focused hours |

## Objective

The brief asks institutions to "monitor student skill development, internship participation, and
placement progress through dashboards and analytics", and for "comprehensive analytics to support
data-driven decisions for institutions, industries, and policymakers."

Two of the deliverables here — the **reverse skill-gap report** and **longitudinal outcomes** — are
not in the brief at all, and they are the features that make this a platform a *ministry* cares
about rather than one that only students care about.

## Deliverables

### Institution dashboard — `/dashboard/institution`
- [ ] Headline tiles: students onboarded, assessments completed, average skill coverage against
      industry demand, internship participation rate, placement funnel conversion, offers accepted
- [ ] **Skill development view** — cohort skill distribution, movement over time, verified vs.
      self-declared ratio, most common gaps by programme and year
- [ ] **Internship participation** — by department, year, sector, and host organisation
- [ ] **Placement readiness funnel** — profiled → assessed → recommended → applied → shortlisted →
      interviewed → offered → placed, with drop-off at each stage. The drop-off is the insight.
- [ ] Department and programme comparison
- [ ] Student drill-down (respecting privacy rules) with an at-risk list — students with low
      engagement or high unmet gaps, so the placement cell can actually intervene
- [ ] Filters: academic year, programme, department, batch

### The Reverse Skill-Gap Report — the differentiator
- [ ] Aggregate demanded skills across every posting reaching this institution's students, weighted
      by frequency, seniority and stipend
- [ ] Map demand against `CurriculumSkillCoverage` — what the syllabus already teaches
- [ ] Output three ranked lists: **covered and demanded** (working), **demanded but not covered**
      (the curriculum gap), **covered but not demanded** (candidate for review)
- [ ] Fold in **anonymised rejection reasons** from Phase 7 — the skills students are actually being
      rejected for, which is a sharper signal than job descriptions alone
- [ ] Trend view across terms, so the report shows movement not just a snapshot
- [ ] Export as a designed PDF addressed to the institution and the regulator, with a plain-language
      executive summary a dean could act on without a data analyst
- [ ] `/dashboard/institution/curriculum-gap` with a term selector

### Longitudinal outcomes — the second differentiator
- [ ] Automated **6-month and 12-month** post-placement surveys: still employed, role relevant to
      qualification, compensation band, satisfaction, would-recommend
- [ ] Survey delivery, reminders, and a response-rate indicator (be honest about response rates —
      showing them is more credible than hiding them)
- [ ] Outcome dashboard: retention, relevance, satisfaction by employer, by role, by programme
- [ ] Employer quality signals derived from outcomes — which employers produce lasting placements
- [ ] This converts "we placed 200 students" into "we placed 200 students and 84% were still in a
      relevant role a year later." That second sentence is the one a ministry quotes.

### Industry dashboard — `/dashboard/industry/analytics`
- [ ] Posting performance: views, applications, match quality distribution
- [ ] Pipeline health and time-to-hire
- [ ] Skill availability in the candidate pool vs. what they are asking for
- [ ] Source institutions and their candidate quality
- [ ] Diversity metrics under blind mode — reportable, and a genuine selling point to companies

### Admin / policymaker view — `/admin/insights`
- [ ] National and state-level skill demand and supply
- [ ] **Regional demand map** (SVG, from Phase 6) with drill-down by district
- [ ] Sector trends, including a dedicated Ayush sector view
- [ ] Platform health: users, verified employers, certificates issued and verified

### Shared infrastructure
- [ ] `src/lib/analytics/queries.ts` — every metric defined once, in one place, with its formula
      documented next to it
- [ ] Recharts components loaded via dynamic import so no dashboard JS reaches marketing pages
- [ ] CSV export on every table, PDF export on every report
- [ ] Date-range and cohort filters shared across dashboards
- [ ] Skeleton loading states; nothing blocks on the slowest query

## Acceptance criteria

1. Every number on every dashboard traces to a documented query — no hard-coded figures anywhere.
2. The reverse gap report produces a document an institution could act on unchanged.
3. Outcome surveys generate, deliver, and aggregate correctly on the seeded timeline.
4. Charts render correctly in both themes and are readable when printed in greyscale.
5. Dashboards load in under 1.5s on the seeded dataset.
6. A recruiter or institution cannot see another organisation's data — enforced at the query layer.

## Notes

- Follow the `dataviz` guidance: one consistent palette, accessible in both themes, no chart junk,
  and a clear default chart type per question. Consistency across dashboards reads as professionalism.
- **Never present a metric you cannot explain.** A judge asking "how is placement readiness
  calculated?" and getting a precise answer is worth more than three extra charts.
- The reverse gap report is the slide that connects your project to policy. Give it the most design
  attention of anything in this phase.

---

## Phase Summary

> **Fill this in before starting Phase 11. Mandatory.**

**What was built:**

**Metric definitions (name → formula → source query):**

**Reverse gap report methodology as implemented:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
