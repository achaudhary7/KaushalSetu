# Phase 7 — Opportunities & Applicant Tracking

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 4, 6 |
| **Blocks** | Phases 8, 10, 11 |
| **Estimate** | 10 focused hours — the largest phase |

## Objective

The transactional heart of the platform: industries post, students find and apply, everyone tracks.
This is where the brief's internship and placement pillars actually happen.

## Deliverables

### Posting (Industry)
- [ ] `/dashboard/industry/opportunities/new` — a multi-step form covering all types:
      internship, **micro-internship** (1–4 weeks, paid, aimed at 1st/2nd years), apprenticeship,
      entry-level job, live project
- [ ] Skill requirements picker from the taxonomy, each with required proficiency, weight, and a
      must-have flag — this is the input the matching engine consumes
- [ ] Eligibility criteria builder (programme, year, CGPA, location, availability window)
- [ ] Compensation, duration, mode (on-site / remote / hybrid), openings, deadline
- [ ] Draft → review → publish, with a preview of exactly what students will see
- [ ] **Publication is blocked until the employer is verified** (Phase 4 gate) — with a clear
      explanation of why, not a dead end
- [ ] Duplicate, close, extend, and archive actions
- [ ] Bulk CSV import for companies with many roles

### Discovery (Student & public)
- [ ] `/opportunities` — faceted search: type, skill, sector, location, mode, stipend range,
      duration, deadline. **Facets are URL parameters** so every combination is crawlable and
      shareable (per the URL guidance in `../SEO IMPs/URL.txt`).
- [ ] Sort by match score (logged in), recency, deadline, stipend
- [ ] `/opportunities/[slug]` — full detail with `JobPosting` JSON-LD, company profile, verification
      badge, skill requirements shown against *your* profile, and your match explanation inline
- [ ] Saved opportunities, saved searches, and email alerts on new matches
- [ ] "Report this listing" — the anti-scam control, routed to the admin queue
- [ ] Similar opportunities module

### Applying & tracking (Student)
- [ ] One-click apply using the portfolio, with an optional cover note
- [ ] Per-opportunity screening questions
- [ ] Document attachment from the secure document store (resume, certificates)
- [ ] `/dashboard/student/applications` — a Kanban or table view of the pipeline with a status
      timeline per application: Applied → Under review → Shortlisted → Interview → Offer →
      Accepted / Rejected / Withdrawn
- [ ] Withdraw, and a full application history
- [ ] Deadline reminders

### ATS (Industry)
- [ ] `/dashboard/industry/opportunities/[id]/applicants` — pipeline board with drag-between-stages
- [ ] **Blind shortlisting mode** — a toggle that hides name, gender, photo and college during the
      first screening pass, showing only skills, match score and verified evidence. Reveal happens
      on shortlisting, and the toggle state is recorded so the company can *prove* it screened blind.
      Directly addresses tier-2/tier-3 disadvantage, and it is a strong stage moment.
- [ ] Filter and sort by match score, verified-skills-only, eligibility
- [ ] Bulk actions, internal notes, ratings, and interview scheduling
- [ ] **Rejection reason capture** — a coded reason (skill gap / experience / eligibility / role
      filled / better fit found) plus optional detail, required to reject. Anonymised and
      aggregated into the Phase 10 gap analysis. Students see *cohort patterns*, never their own
      individual rejection text.
- [ ] Offer issue and acceptance flow
- [ ] Export applicants to CSV

### Internship execution
- [ ] Once accepted: a mentor assignment, milestones, weekly progress logs by the student,
      mentor feedback and rating, and a completion record that feeds Phase 8's certificate issuance

### Admin
- [ ] Reported-listing queue with take-down, and an opportunity moderation view

## Acceptance criteria

1. The full loop works end to end: verified company posts → student is recommended it → applies →
   recruiter screens blind → shortlists → interviews → offers → student accepts.
2. An unverified company cannot publish by any route.
3. Every facet combination on `/opportunities` produces a shareable, working URL that renders
   server-side with correct metadata.
4. Rejecting without selecting a reason is impossible.
5. Blind mode genuinely withholds identity from the API response, not merely from the DOM —
   verified by inspecting the network payload.
6. `JobPosting` structured data passes the Rich Results Test on a live listing.

## Notes

- Blind mode must be enforced **server-side**. Hiding fields with CSS while shipping them in the
  JSON is the kind of thing a sharp judge will check, and it would undermine the whole claim.
- Micro-internships are the answer to "what does a first-year student do on this platform?" —
  which is a question your own team embodies. Lead with it.
- Rejection reason capture feels like a small form control. It is the input to the most
  policy-relevant output in the entire product. Treat it accordingly.

---

## Phase Summary

> **Fill this in before starting Phase 8. Mandatory.**

**What was built:**

**Application status machine as implemented:**

**Blind mode: what is withheld, where it is enforced:**

**Rejection reason codes used:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
