# Phase 12 — Performance, Accessibility & Security Hardening

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phases 1–11 |
| **Blocks** | Phase 13 |
| **Estimate** | 5 focused hours |

## Objective

Turn a working product into a defensible one. Performance and accessibility have been maintained
throughout; this phase measures them properly and closes the security gaps that a platform holding
student academic records, identity documents and employer data genuinely must close.

## Deliverables

### Performance
- [ ] Bundle analysis (`@next/bundle-analyzer`); nothing dashboard-only leaking into marketing routes
- [ ] Core Web Vitals measured on real pages against `docs/PERFORMANCE.md` budgets:
      LCP < 2.0s, INP < 200ms, CLS < 0.05
- [ ] Audit every `'use client'` — each one justified, or converted back to a Server Component
- [ ] Dynamic imports for charts, editors, PDF generation, maps and dialogs
- [ ] Database: N+1 queries eliminated, indexes verified against real query plans, `select` narrowed
      to the fields actually rendered
- [ ] Caching strategy documented and applied — static marketing pages, revalidated listing pages,
      dynamic dashboards, plus `unstable_cache` on expensive analytics queries
- [ ] Font subsetting verified; SVG assets minified; no unused CSS
- [ ] Streaming and Suspense boundaries so slow sections never block the shell
- [ ] Lighthouse recorded for one page of every type; results committed to the phase summary

### Accessibility — WCAG 2.1 AA
- [ ] Automated axe pass across all routes, zero violations
- [ ] Full keyboard walkthrough of all three critical journeys
- [ ] Screen reader test (NVDA) on registration, assessment and application flows
- [ ] Focus management in dialogs, sheets and route transitions
- [ ] Form errors announced, associated, and never colour-only
- [ ] Contrast verified in both themes, including charts and badges
- [ ] `prefers-reduced-motion` honoured everywhere
- [ ] Zoom to 200% without loss of content or function
- [ ] `/accessibility` statement updated to reflect the actual, tested conformance level

### Security
- [ ] Rate limiting on auth, application submission, messaging, search and file upload
- [ ] CSRF protection on every mutating action
- [ ] Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
      Permissions-Policy
- [ ] Input validation with Zod at every boundary; output escaping verified
- [ ] SQL injection surface: Prisma parameterises, but audit every raw query
- [ ] **File uploads:** type allowlist, magic-byte check (not just extension), size limits, stored
      outside the web root, served through an authorised signed-URL route, filenames sanitised,
      and a virus-scan boundary defined (ClamAV interface, mocked if not deployed — and stated)
- [ ] **Secure document management** as the brief requires: resumes, certificates, internship
      reports and academic records — encrypted at rest, access-logged, and never directly reachable
- [ ] `AuditLog` on every sensitive action: verification decisions, endorsements, certificate issue
      and revocation, admin actions, data exports
- [ ] PII minimisation — collect only what is used; blind mode enforced at the API layer
- [ ] Session security: rotation on privilege change, absolute and idle timeouts, secure cookie flags
- [ ] Dependency audit (`npm audit`), no high or critical vulnerabilities
- [ ] `docs/SECURITY.md` completed: threat model, permission matrix, data classification,
      retention policy, incident contact
- [ ] DPDP Act 2023 alignment: consent capture, purpose limitation, data export, deletion path

### Reliability
- [ ] Error boundaries at every route segment with useful recovery actions
- [ ] Structured server-side error logging with request correlation IDs
- [ ] Graceful degradation when the database or email is unavailable
- [ ] `/api/health` endpoint for monitoring
- [ ] Playwright end-to-end tests for the three critical journeys, running in CI

## Acceptance criteria

1. Every performance budget in `docs/PERFORMANCE.md` is met and the numbers are recorded.
2. Zero axe violations across all routes; NVDA can complete all three critical journeys.
3. Every item in the `docs/SECURITY.md` checklist is ticked or has a written, accepted exception.
4. `npm audit` reports no high or critical vulnerabilities.
5. Uploading a renamed executable as a "PDF" is rejected by the magic-byte check.
6. The audit log captures every sensitive action with actor, target, timestamp and IP.

## Notes

- A student portal holds academic records and identity documents. Treat the security work as a
  requirement, not a polish item — and be able to say so, because "how do you protect student data?"
  is a question that gets asked in these evaluations.
- Where something is mocked (virus scanning, encryption at rest on a demo box), **say so in the
  documentation and on the slide**. Honest boundaries read as maturity; overclaiming does not survive
  a follow-up question.

---

## Phase Summary

> **Fill this in before starting Phase 13. Mandatory.**

**What was built:**

**Measured performance numbers (page → LCP / INP / CLS / Lighthouse):**

**Accessibility findings and fixes:**

**Security checklist status, including accepted exceptions:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
