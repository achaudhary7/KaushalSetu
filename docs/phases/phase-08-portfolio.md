# Phase 8 — Digital Portfolio, Verification & Credentials

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 5, 7 |
| **Blocks** | Phase 10 |
| **Estimate** | 7 focused hours |

## Objective

The brief asks for a "digital portfolio for students containing verified skills, certifications,
projects, internships, and achievements to improve employability."

The word doing the work in that sentence is **verified** — and the brief never says how. That gap
is our headline feature.

## The three-tier verification model

| Tier | Source | Visual treatment | Filterable |
| --- | --- | --- | --- |
| **Self-declared** | The student typed it | Grey outline badge, no tick | Yes |
| **Assessment-verified** | Earned through a platform assessment (Phase 5) | Blue badge, tick, links to the attempt and score | Yes |
| **Employer-endorsed** | Vouched for by a verified company after an internship or project | Green badge, seal, names the endorsing company and date | Yes |

A recruiter can filter to *verified only*, and the matching engine already weights verified skills
higher (Phase 6). The tier system is therefore load-bearing, not decorative — which is the whole
point.

## Deliverables

### Portfolio
- [ ] `/dashboard/student/portfolio` — the editor: sections for skills, education, projects,
      internships and experience, certifications, achievements, publications, links
- [ ] Rich project entries: description, skills used, role, outcomes, links, and an SVG placeholder
      cover generated from the project name when no image exists
- [ ] Drag-to-reorder sections, per-section visibility toggles
- [ ] Completeness meter with specific prompts ("add one project to reach 80%")
- [ ] `/p/[username]` — the **public portfolio page**: server-rendered, indexable (opt-in),
      `Person` + `ProfilePage` JSON-LD, OG image generated per profile, fast, and genuinely
      presentable. This is a real acquisition surface — students will share these links.
- [ ] Privacy controls: public / unlisted / private, and per-field hiding (contact details default off)
- [ ] Print stylesheet so the public page prints cleanly

### Endorsement flow
- [ ] A verified company that hosted a student can endorse specific skills with an optional comment
- [ ] Endorsement request from the student to a past mentor
- [ ] Endorsements are immutable once given and are attributed and dated
- [ ] Revocation path with an audit trail, for the rare case it is needed

### QR-verifiable certificates
- [ ] Company issues an internship or project completion certificate from the completion record
- [ ] Certificate design: an on-brand SVG template rendered to PDF, with the issuing company, the
      student, dates, skills demonstrated, mentor signature block, a unique code and a QR
- [ ] `/verify/[code]` — a **public verification page** showing issuer, recipient, dates, skills,
      issue date, and status (valid / revoked). No login required — a recruiter must be able to
      check in five seconds from a printed certificate.
- [ ] `/verify` — manual code entry
- [ ] Revocation by the issuer, with the reason surfaced on the verification page
- [ ] Verification attempts logged (for the analytics story: "certificates verified this month")
- [ ] Individual `/verify/[code]` pages are `noindex`; `/verify` is indexable

### Resume generation
- [ ] One-click **ATS-readable** resume from the portfolio: real text in a single column, no tables,
      no graphics, standard section headings, PDF via `@react-pdf/renderer`
- [ ] A second, designed template for human readers
- [ ] Verification tiers shown as text markers in the ATS version ("Verified: React (assessment)")
- [ ] Choose which sections and which target role to tailor toward
- [ ] Download and shareable link

## Acceptance criteria

1. Scanning the QR on a generated certificate PDF opens the live verification page.
2. A revoked certificate immediately shows as revoked on that page.
3. The three tiers are visually distinct at a glance and filterable by recruiters.
4. `/p/[username]` scores ≥ 95 on Lighthouse and passes the Rich Results Test for `Person`.
5. The generated ATS resume parses correctly when opened as plain text — headings and content intact.
6. A private portfolio is inaccessible to a logged-out visitor and absent from the sitemap.

## Notes

- Fake internship certificates are a real and widely reported problem in India. The QR verification
  story is concrete, socially useful, and takes about ninety minutes to build. It consistently
  outperforms far more expensive features in front of judges.
- Generate the certificate as SVG then render to PDF — consistent with the all-SVG rule, and it
  means the same template renders on screen and in print with no divergence.
- Make the public portfolio genuinely beautiful. Students sharing these links is the cheapest
  growth mechanism the platform has.

---

## Phase Summary

> **Fill this in before starting Phase 9. Mandatory.**

**What was built:**

**Verification tier rules as implemented:**

**Certificate code format and verification URL scheme:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
