# Architecture Decision Record

One entry per non-obvious choice. Append, never rewrite history. If a decision is reversed, add a
new entry that supersedes the old one and mark the old one.

Format: **ADR-NNN · Title · Date · Status** — Context / Decision / Consequences.

---

## ADR-001 · Next.js over Flask/Django · 2026-09-07 · Accepted

**Context.** The obvious hackathon stack is Flask or Django with Bootstrap templates. It is simpler
and the team is junior. But this project has two graded requirements that pull the other way: SEO
must be first-class, and the design must look professional.

**Decision.** Next.js 16 App Router with TypeScript.

**Consequences.** Server components give crawlable HTML with no extra work, which is precisely what
the Google JS-SEO doc warns about getting wrong. Route-level code splitting, font optimisation and
metadata handling arrive free. The cost is a steeper learning curve and a Node runtime in
production — which drove ADR-004. Accepted: the SEO and performance requirements are explicit in the
brief and in the user's constraints, and Django templates would have meant hand-rolling the same
optimisations worse.

---

## ADR-002 · Deterministic matching, not AI · 2026-09-07 · Accepted

**Context.** The brief asks for a "recommendation engine". The instinct is to reach for an LLM or
embeddings. AI credits are severely limited, and any external API is a live dependency during an
evaluation.

**Decision.** Weighted cosine similarity over skill vectors, plus coverage, a critical-skill gate
and a verification weighting. Pure arithmetic. AI is deferred to Phase 14 as a bounded enhancement
with a shipped fallback.

**Consequences.** Zero cost, instant, deterministic, and — the real win — **explainable**. When a
judge asks how a match was computed, we show the arithmetic on screen. Every recommendation carries
an explanation panel. We lose semantic synonym matching until Phase 14 adds it as a bounded
adjustment on top. The product is fully functional with `AI_ENABLED=false`, and we say so
deliberately in the pitch rather than apologising for it.

---

## ADR-003 · SQLite in development, MySQL in production · 2026-09-07 · Accepted

**Context.** The demo must be resettable in seconds and must not depend on a running database
server on a laptop. Production on Hostinger has MySQL available everywhere.

**Decision.** Prisma with SQLite locally, MySQL 8 in production. One-line provider change.

**Consequences.** `npm run db:reset` rebuilds the whole demo world instantly and the database is a
single file. The risk is provider-specific behaviour drift (SQLite's loose typing, no native enums,
different collation). Mitigated by keeping the schema conservative — no raw SQL, no
provider-specific features — and by testing against MySQL in Phase 13 before it matters.

---

## ADR-004 · Hostinger VPS, not shared hosting · 2026-09-07 · Accepted

**Context.** The user asked for Hostinger rather than Vercel. Hostinger's shared web hosting plans
run PHP and MySQL only — they cannot run a Node.js process, so a server-rendered Next.js app cannot
be deployed there. This is a hard technical fact and the most likely source of a late, painful
surprise.

**Decision.** Production targets a Hostinger **VPS** (KVM 1, ~₹400–500/month) running Node + PM2 +
Nginx + MySQL + Certbot. Development and the hackathon demo run on localhost; sharing before then
uses a free Cloudflare Tunnel.

**Consequences.** Costs a small monthly amount but gives a real server we fully control. Documented
in Phase 0 rather than discovered in Phase 13. Fallbacks recorded if a VPS proves impossible:
Render / Railway / Fly.io / Koyeb free tiers, all of which run Node. Splitting the app — static
public site on shared hosting, app elsewhere — is documented as a last resort only.

---

## ADR-005 · Public marketing site built before the database · 2026-09-07 · Accepted

**Context.** The conventional order is data model first. But SEO is a graded requirement, the
design system needs to settle before feature pressure, and there is real value in having something
complete and impressive to show from day two.

**Decision.** Phases 1–2 build the design system and the entire public surface before Phase 3
touches Prisma. Data-driven public pages render from typed fixtures and are wired to real data when
their phase lands.

**Consequences.** Every later feature drops into an existing, settled layout instead of inventing
one. There is always something demonstrable. The cost is writing fixtures that are later replaced —
a small, contained amount of throwaway work, and the fixture *types* survive as the contract.

---

## ADR-006 · Three-tier skill verification · 2026-09-07 · Accepted

**Context.** The brief repeatedly says "verified skills" but never specifies what verification
means. Every competing team will let students self-declare skills and call them verified.

**Decision.** Three explicit tiers — self-declared, assessment-verified, employer-endorsed — that
are visually distinct, filterable by recruiters, and **weighted in the matching score** (Phase 6).

**Consequences.** The system is load-bearing rather than cosmetic: verified skills genuinely produce
better matches, which gives students a reason to earn them and recruiters a reason to trust them.
It constrains later features — notably, AI resume parsing in Phase 14 may only ever produce
self-declared skills, because letting a convenience feature mint verified badges would hollow out
the entire mechanism.

---

## ADR-007 · Certificate verification via public QR page · 2026-09-07 · Accepted

**Context.** Fake internship certificates are a real and widely reported problem in India. The brief
asks for internship completion records but specifies no way to check one.

**Decision.** Companies issue completion certificates through the portal. Each carries a unique code
and a QR resolving to a public `/verify/[code]` page — no login required.

**Consequences.** A recruiter with a printed certificate can confirm it in five seconds. Individual
verification pages are `noindex` (personal records) while `/verify` is indexable. Requires
revocation support and a verification log. Roughly ninety minutes of work for one of the most
tangible moments in the demo — a physical object verified live in the room.

---

## ADR-008 · Blind shortlisting enforced server-side · 2026-09-07 · Accepted

**Context.** Students from tier-2 and tier-3 institutions are filtered out on college name before
their skills are ever read. A blind first-pass screen addresses this directly.

**Decision.** A recruiter-side toggle hides name, gender, photo and college during first-pass
screening, revealing them only on shortlisting. Identity fields are withheld **from the API
response**, not merely hidden in the DOM. The toggle state is recorded so a company can demonstrate
it screened blind.

**Consequences.** Requires a separate serialisation path for blind mode and care that no other
endpoint leaks the same data. The stronger claim — and the one worth making on stage — is that this
is real, not cosmetic, and that a sharp evaluator can open the network tab and confirm it.

---

## ADR-009 · Next.js 16 and Zod 4, not 15 and 3 · 2026-09-07 · Accepted

**Context.** The plan named Next.js 15 and Zod 3. `create-next-app@latest` now scaffolds Next
**16.3.4** with React 19.2 and Turbopack as the default bundler, and the current Zod major is 4.

**Decision.** Take the current majors rather than pinning backwards.

**Consequences.** No reason to start a new project on a superseded major. But Next 16 has real
breaking changes from 15, and much published guidance (and model training data) still describes 14
and 15 conventions. The scaffold auto-generates `app/AGENTS.md` pointing at bundled docs in
`node_modules/next/dist/docs/` — **consult those before writing routing or metadata code**,
particularly in Phase 2. Zod 4 changes error formatting: `z.treeifyError()` replaces v3's
`.format()`, which `src/lib/env.ts` already uses.

---

## ADR-010 · Contrast is asserted by a script, not reviewed by eye · 2026-09-08 · Accepted

**Context.** WCAG AA contrast is easy to claim and easy to get wrong. Phase 1 defined a two-theme
token system where every semantic colour is indirected through a palette, which makes the actual
rendered ratios non-obvious from reading the CSS.

**Decision.** `app/scripts/check-contrast.py` parses the tokens out of `globals.css`, resolves the
semantic layer for both themes, and asserts every pair the product actually renders. It runs as
part of `npm run check`.

**Consequences.** The first run **failed four pairs** that looked fine by eye: `--color-border-strong`
at 1.48:1 (light) and 1.95:1 (dark) against their surfaces, light `--color-tier-self` at 2.56:1,
and dark `--color-fg-subtle` at 3.75:1 on surface. All four were fixed at the token level rather
than patched per component. It also forced an explicit, defensible decision to exclude decorative
`--color-border` from the 3:1 rule, documented in the script itself. The cost is a Python
dependency in the check pipeline; the benefit is that a future token change that breaks contrast
fails the gate instead of shipping. This does **not** make the product WCAG AA conformant on its
own — keyboard, screen reader and axe passes remain Phase 12's work.

---

<!--
Template for new entries:

## ADR-NNN · Title · YYYY-MM-DD · Proposed | Accepted | Superseded by ADR-NNN

**Context.** What forced a decision.

**Decision.** What we chose.

**Consequences.** What this makes easy, what it makes hard, what it rules out.
-->
