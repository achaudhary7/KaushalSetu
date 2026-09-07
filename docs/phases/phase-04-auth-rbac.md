# Phase 4 — Authentication, Roles & Onboarding

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 1, 3 |
| **Blocks** | Phases 5–11 |
| **Estimate** | 6 focused hours |

## Objective

Five roles, one login, correct boundaries. The brief demands "role-based access for students,
academicians, industries, and institutions" — plus an Admin the brief forgets to mention but which
the employer-verification gate requires.

## Deliverables

### Authentication
- [ ] Auth.js v5 configured with a Credentials provider and JWT sessions
- [ ] `bcrypt` password hashing (cost 12), password strength rules enforced by Zod on both sides
- [ ] `/register` — role selection first, then a role-specific form
- [ ] `/login` with rate limiting and a generic failure message (never reveal whether an email exists)
- [ ] `/forgot-password` and `/reset-password/[token]` with single-use, expiring tokens
- [ ] Email verification flow; Nodemailer console transport in dev, SMTP config for production
- [ ] Logout, session refresh, and "remember me" behaviour
- [ ] `/auth/error` and friendly handling of expired or reused tokens

### Authorisation
- [ ] `middleware.ts` — route gating by role for `/dashboard/*`, `/admin/*`, `/settings/*`
- [ ] `src/lib/auth/guards.ts` — `requireUser()`, `requireRole()`, `requireOwnership()` used inside
      server actions and route handlers. **Middleware is convenience; these are the boundary.**
- [ ] A permission matrix in `docs/SECURITY.md` — role × resource × action, written down explicitly
- [ ] Every data query scoped to the caller. No `findMany` without an ownership or role predicate.

### Onboarding wizards — one per role, resumable, progress-saving
- [ ] **Student:** institution, programme (BAMS/BHMS/BUMS/BNYS/B.Tech/other), year, interests,
      initial self-declared skills, career goals → lands on "take your assessment"
- [ ] **Industry:** company details, CIN/GSTIN for verification, sector, size, hiring needs →
      lands in *pending verification* state, unable to publish until an Admin approves
- [ ] **Academician:** institution, department, designation, specialisations, research interests
- [ ] **Institution:** name, AISHE/NCISM code, type, departments, placement cell contact
- [ ] Onboarding completion percentage surfaced on each dashboard until finished

### Account & admin
- [ ] `/settings/profile`, `/settings/account`, `/settings/security` (password, sessions),
      `/settings/notifications`, `/settings/privacy` (portfolio visibility), `/settings/danger`
      (export my data, delete my account — DPDP-aligned)
- [ ] `/admin` console: user list, employer verification queue (approve / reject with reason /
      request documents), reported listings, platform stats
- [ ] Five role dashboards existing as shells with the correct nav, ready for later phases to fill

## Acceptance criteria

1. Each of the five roles can register, verify, onboard and reach its own dashboard.
2. A student hitting `/dashboard/industry` is redirected, and a direct server action call with a
   forged role fails at the guard — verified with a test.
3. An unverified employer cannot publish an opportunity by any route, including a crafted request.
4. Password reset tokens are single-use and expire; reuse is rejected.
5. No password, token or session secret appears in any log or client payload.

## Notes

- The employer verification gate is a *feature*, not friction — it is the answer to the fake
  internship scam problem. Make the pending state visible and explain why it exists in the UI.
- Keep the role check in exactly two places (middleware + guard helper). Scattering `if (role ===`
  through components is how authorisation bugs happen.
- Seed one pre-verified and one pending company so the admin queue has something to show on stage.

---

## Phase Summary

> **Fill this in before starting Phase 5. Mandatory.**

**What was built:**

**Auth flow and session strategy as actually implemented:**

**Permission matrix location and any changes to it:**

**Demo credentials for each role:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
