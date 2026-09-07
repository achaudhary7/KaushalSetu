# Security Model

This platform holds student academic records, identity documents, resumes and employer data.
"How do you protect student data?" is a question that *will* be asked in evaluation. This document
is the answer.

Fully implemented and verified in Phase 12; the rules apply from Phase 4 onward.

## Data classification

| Class | Examples | Handling |
| --- | --- | --- |
| **Public** | Published opportunities, public portfolios (opt-in), career pages | Cacheable, indexable |
| **Internal** | Aggregate analytics, anonymised rejection reasons | Auth required, never per-individual |
| **Personal** | Name, email, phone, institution, skill profile | Auth + ownership, minimised, exportable, deletable |
| **Sensitive** | Academic records, identity documents, resumes, certificates | Encrypted at rest, signed-URL access only, every access logged |

## Permission matrix

| Resource | Student | Academician | Industry | Institution | Admin |
| --- | --- | --- | --- | --- | --- |
| Own profile | CRUD | CRUD | CRUD | CRUD | R |
| Other student profile | Public fields only | Own institution | Applicants only (blind-filtered) | Own institution | R |
| Opportunity | R | R (faculty types) | CRUD own, **publish only if verified** | R | CRUD, moderate |
| Application | CRUD own | CRUD own | R + status on own postings | R own institution (aggregate) | R |
| Rejection reason (raw) | ❌ never | ❌ | CRUD own | ❌ aggregate only | R |
| Certificate | R own | R own | Issue for own internships, revoke own | R own institution | R, revoke |
| Endorsement | R own | — | Create for own interns | R | R |
| Analytics | Own only | Own only | Own company | Own institution | Platform-wide |
| Audit log | ❌ | ❌ | ❌ | ❌ | R |
| Employer verification | ❌ | ❌ | Submit | ❌ | Approve / reject |

**Enforcement:** `middleware.ts` for coarse route gating, and `requireUser()` / `requireRole()` /
`requireOwnership()` inside every server action and query. **The query is the boundary.** Middleware
alone is not a security control — it can be bypassed by a direct server action invocation.

## Controls

**Authentication.** bcrypt cost 12. Password rules enforced by Zod on both sides. Rate-limited login
with a generic failure message that never reveals whether an email exists. Single-use, expiring
reset tokens. JWT sessions with rotation on privilege change, plus idle and absolute timeouts.
`httpOnly` + `secure` + `sameSite=lax` cookies.

**Input & output.** Zod at every boundary. Prisma parameterises all queries; any raw SQL is
individually reviewed. React escapes by default and `dangerouslySetInnerHTML` is banned outside a
sanitised markdown renderer. CSRF protection on every mutation.

**File uploads.** Extension allowlist *and* magic-byte verification — a renamed executable must be
rejected. Size limits per type. Filenames sanitised and randomised. Stored **outside the web root**,
served only through an authorised route issuing short-lived signed URLs. A virus-scan boundary is
defined (`lib/security/scan.ts`, ClamAV interface) and **mocked in development — this is stated
openly rather than implied as complete**.

**Headers.** CSP, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, restrictive `Permissions-Policy`.

**Rate limits.** Login and registration (5/15min per IP), password reset (3/hour), application
submission (20/day), messaging (50/day), search (60/min), upload (10/hour).

**Audit logging.** Actor, action, target, timestamp, IP for: employer verification decisions,
certificate issue and revocation, endorsements, admin actions, role changes, data exports, bulk
operations, and every access to a Sensitive-class document.

**Blind mode.** Identity fields are stripped **server-side, from the API response**. Hiding them in
the DOM while shipping the data would be a false claim, and a sharp evaluator opening the network
tab would find it.

## Privacy — DPDP Act 2023 alignment

- **Consent** captured explicitly at registration, with purpose stated in plain language.
- **Purpose limitation** — data collected for matching is not repurposed silently.
- **Minimisation** — we do not collect what we do not use. Notably: no caste, no religion, and
  gender only where blind mode makes it *removable* rather than decisive.
- **Access & portability** — `/settings/danger` exports all of a user's data as JSON.
- **Erasure** — account deletion removes personal data and anonymises what must be retained
  (aggregate analytics, issued certificates' validity records).
- **Retention** — application data 3 years, assessment attempts 2 years, audit logs 1 year,
  documents until deletion is requested.
- **Grievance officer** named and contactable at `/grievance`, as expected under the IT Rules.

## Threat model — what we actually defend against

| Threat | Control |
| --- | --- |
| Fake employers running certificate-fee scams | Verification gate before publishing + student reporting + admin queue |
| Forged internship certificates | QR verification against the issuer's own record, with revocation |
| A student inflating their skills | Three-tier verification; self-declared skills are visibly weaker and score lower |
| Recruiter scraping student PII | Auth required, rate limited, blind mode default, access logged |
| Cross-tenant data leakage | Ownership predicate on every query; tested explicitly |
| Credential stuffing | Rate limiting, bcrypt, generic errors, session rotation |
| Malicious file upload | Magic-byte check, allowlist, out-of-root storage, scan boundary |
| Privilege escalation via forged role | Role read from the signed session server-side, never from client input |

## Phase 12 checklist

- [ ] Permission matrix implemented and tested for every cell
- [ ] Rate limiting live on all listed endpoints
- [ ] Security headers verified with an external scanner
- [ ] File upload rejects a renamed executable
- [ ] Documents unreachable without authorisation, all access logged
- [ ] Audit log covers every sensitive action
- [ ] `npm audit` clean of high and critical findings
- [ ] Data export and deletion both work end to end
- [ ] Blind mode verified at the network layer, not the DOM
- [ ] Every mocked control (virus scanning, at-rest encryption on the demo box) documented as mocked
