# Phase 11 — Collaboration Hub

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 4, 7, 9 |
| **Blocks** | Nothing |
| **Estimate** | 6 focused hours |

## Objective

The brief asks the platform to "facilitate industry–academia collaboration through mentorship
programs, workshops, guest lectures, innovation challenges, and live industry projects."

This is the phase that makes the product a *collaboration* portal rather than a job board with
extra tabs.

## Deliverables

### Mentorship
- [ ] Mentor directory — industry professionals, faculty, and **alumni**, with expertise tags drawn
      from the same taxonomy
- [ ] **Alumni mentorship matching** — alumni are matched on shared institution, programme and
      career path. They respond at a far higher rate than cold industry mentors and cost nothing to
      recruit. This is the pragmatic version of a feature everyone promises and nobody staffs.
- [ ] Request → accept/decline → active → completed lifecycle, with capacity limits per mentor
- [ ] Session scheduling with availability slots, agenda, and notes
- [ ] Session feedback both ways, and a mentor rating
- [ ] Goal tracking within a mentorship
- [ ] Mentor recognition: hours contributed, students mentored, a shareable badge

### Guest lectures & workshops
- [ ] Institutions request a speaker on a topic; industry professionals offer sessions
- [ ] Matching on expertise and location, including remote
- [ ] Scheduling, capacity, registration, attendance marking
- [ ] Post-event feedback and a completion certificate for attendees (Phase 8 QR system, reused)
- [ ] A public events calendar — indexable, with `Event` structured data

### Live industry projects
- [ ] Companies post real problems as projects with scope, deliverables and timeline
- [ ] Student teams (or individuals) apply; team formation with role assignment
- [ ] Milestones, submissions, mentor review, and iteration
- [ ] Completion produces a portfolio entry, employer-endorsed skills, and a certificate — three
      Phase 8 outputs from one flow
- [ ] Faculty can supervise, connecting the academic and industry sides in one record

### Innovation challenges
- [ ] Challenge creation: problem, criteria, prizes, timeline, eligibility
- [ ] Team registration and submission (documents, links, description)
- [ ] Judging: rubric, multiple judges, scoring, leaderboard
- [ ] Results announcement, winner certificates
- [ ] Seed one Ayush-themed challenge — it makes the domain focus concrete rather than claimed

### Platform plumbing
- [ ] `Notification` system — in-app centre, preferences per category, email digest
- [ ] Threaded messaging between connected parties, with rate limits and abuse reporting.
      Messaging is only permitted where a relationship exists (application, mentorship, project) —
      this prevents the platform becoming a spam channel, which recruiters' inboxes will thank you for.
- [ ] Activity feed on each dashboard

## Acceptance criteria

1. A mentorship runs through its full lifecycle including sessions and feedback.
2. A live project completes and produces a portfolio entry, an endorsement and a certificate.
3. A challenge accepts submissions, is judged, and produces a leaderboard and winner certificates.
4. Notifications are delivered in-app for every significant event, and preferences are respected.
5. Messaging is impossible between two users with no established relationship.
6. Events appear on the public calendar with valid `Event` structured data.

## Notes

- Scope discipline matters here. This phase can absorb unlimited time. If the schedule is tight,
  build **mentorship + live projects** properly and present challenges and workshops as designed
  but unbuilt. Two complete flows beat four half-flows.
- The relationship-gated messaging rule is a small constraint that prevents a large class of abuse
  and is worth one sentence in the pitch.

---

## Phase Summary

> **Fill this in before starting Phase 12. Mandatory.**

**What was built:**

**What was scoped down or deferred, and why:**

**Notification event catalogue:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
