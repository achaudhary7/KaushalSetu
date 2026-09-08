# CONTEXT.md — Read This First

> **Purpose of this file:** this is the single entry point that restores full project context
> for any developer (or AI session) that picks up this repository. If you read nothing else,
> read this file, then `PROGRESS.md`, then the phase file you are working on.

---

## 1. What this project is

**KaushalSetu** — a centralised **Academia–Industry Collaboration Portal** for skill mapping,
internships and placements.

Built for **Smart India Hackathon, Problem Statement ID 26044**, titled
*"Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement"*.

**Sponsoring body:** Ministry of Ayush (almost certainly the All India Institute of Ayurveda, AIIA).
The problem statement is written generically and never mentions Ayush. **This is the single most
important strategic fact in this repository** — see Section 5.

## 2. The name

| Field | Value |
| --- | --- |
| Product name | **KaushalSetu** |
| Meaning | *Kaushal* = skill, *Setu* = bridge |
| Tagline | The bridge from campus to career. |
| Alt tagline (Ayush framing) | Bridging Ayush education and industry. |
| Preferred domain | `kaushalsetu.in` (fallbacks: `.org.in`, `.co.in`) |
| Alternatives considered | SkillSetu, VidyaSetu, Samarth, AyuSetu, CareerBridge |

Why it wins: government skilling vocabulary (Kaushal Vikas / PMKVY), Sanskrit root reads
naturally to an Ayush ministry panel, short, spellable, `.in` almost certainly free.

## 3. The three lifecycles the brief demands

1. **Skill development** — questionnaire assessment to skill profile with strengths and gaps, then
   recommended roles, industries and training, career guidance, and a verified digital portfolio.
2. **Internships** — industry posts with required skills, skill-based matching, apply, track,
   mentor feedback, completion record. Plus a **separate academician track** (faculty internships,
   industrial training, FDPs, consultancy, collaborative research).
3. **Placement** — job postings, recommendation engine, shortlisting on skill compatibility and
   eligibility, recruitment management, analytics dashboards.

Plus a **platform layer**: role-based access for four user types, secure document management,
collaboration features (mentorship, live projects, workshops), integration boundaries for external
learning platforms, and analytics for institutions and policymakers.

## 4. Our differentiators (why we beat a generic placement portal)

The brief has three quiet weaknesses. Each one is a feature we ship.

| Weakness in the brief | Our answer | Phase |
| --- | --- | --- |
| Every skill is **self-declared** | **Three-tier skill badges**: self-declared / assessment-verified / employer-endorsed. Recruiters can filter to verified only. | 5, 8 |
| Nothing feeds demand **back to curriculum** | **Reverse Skill-Gap Report** — aggregate employer demand vs. syllabus coverage, delivered termly to institution and regulator. | 10 |
| Success stops at **"placed"** | **6- and 12-month longitudinal outcome tracking** — still employed, role relevant, satisfied. | 10 |

Additional differentiators:

- **QR-verifiable certificates** — company issues internship completion through the portal, the
  certificate carries a QR resolving to a public verification page. Kills fake-internship certificates.
- **Employer verification gate** — company registration verified before any posting goes live;
  students can report suspicious listings. Directly targets the "pay a certificate fee" scam.
- **Blind shortlisting mode** — name, gender and college hidden during the first screening pass,
  revealed only after skill-based shortlisting. Addresses tier-2/tier-3 college disadvantage.
- **Rejection reason capture** — anonymised, aggregated, fed into gap analysis. Students see
  patterns, never individual rejections.
- **Regional demand map** — which skills are wanted in which districts, so students are not all
  chasing the same three cities.
- **Gap to free learning path** — every identified gap maps to specific **SWAYAM / NPTEL** courses.
  Government platforms, zero cost, aligns with existing national infrastructure.
- **Micro-internships** — 1 to 4 week paid tasks so 1st/2nd-year students build a portfolio early.
- **Alumni mentorship matching** — cheaper and more responsive than industry mentors.
- **One-click ATS-readable resume** generated from the verified portfolio.

## 5. The Ayush layer (do not skip this)

We build the generic platform, but the **domain layer is Ayush-aware**:

- Career paths for **BAMS / BHMS / BUMS / BNYS** graduates: clinical practice, Ayush pharmaceutical
  manufacturing under GMP, panchakarma and therapy centres, wellness and medical tourism, clinical
  research and CTRI trials, regulatory affairs, medical writing, Ayush informatics.
- Internship categories at **Ayush hospitals, dispensaries, and pharma units**.
- Skill taxonomy aligned to the **NCISM** curriculum, not a generic IT skills list.
- Faculty track pointed at **Ayush FDPs** and collaborative research with Ayush pharma.

**Opening line of the pitch:** *"The statement is written generically, but it comes from AIIA.
We built for the Ayush workforce specifically — while remaining domain-agnostic by design."*

The taxonomy is data, not code. Generic engineering / IT / management skills ship in the same seed,
so the platform demos convincingly for any institution.

## 6. Hard constraints

| Constraint | Consequence |
| --- | --- |
| **Very limited AI credits** | All AI is deferred to **Phase 14**, the last build phase. The matching engine is deterministic (weighted cosine similarity) — arithmetic, not AI. It costs nothing, never rate-limits, and is *explainable to a judge*. AI is a pluggable enhancement layer with a rule-based fallback that must always work. |
| **No Vercel** | Local-first development. Demo over LAN or a Cloudflare Tunnel. Production on a **Hostinger VPS** (Node + MySQL + Nginx + PM2). See `docs/DEPLOYMENT.md`. |
| **SEO is a first-class requirement** | Server-rendered by default, per-page metadata, canonicals, sitemap, robots, JSON-LD structured data. Source: the Google Search Central docs in `../SEO IMPs`. See `docs/SEO-CHECKLIST.md`. |
| **Reusable components everywhere** | One `Header`, one `Footer`, one `Button`, one `Card`. Nothing duplicated. See `docs/DESIGN-SYSTEM.md`. |
| **All imagery is SVG** | Logo, icons, illustrations, empty states, OG images. No raster assets, no stock photos, no paid licences. |
| **Performance is graded** | Lighthouse 95+ on public pages. Budgets in `docs/PERFORMANCE.md`. |

## 7. Where everything lives

```
kaushalsetu/
├── CONTEXT.md              <- you are here; read first
├── PLAN.md                 <- master phase plan, phases 0-15
├── PROGRESS.md             <- live status board; update after every work session
├── docs/
│   ├── ARCHITECTURE.md     <- stack, folder layout, request lifecycle
│   ├── DATA-MODEL.md       <- entities and relationships
│   ├── DESIGN-SYSTEM.md    <- tokens, components, brand
│   ├── SEO-CHECKLIST.md    <- per-page SEO contract, from the Google docs
│   ├── PERFORMANCE.md      <- budgets and techniques
│   ├── SECURITY.md         <- authz model, document handling, threats
│   ├── DEPLOYMENT.md       <- localhost -> tunnel -> Hostinger VPS
│   ├── DECISIONS.md        <- ADR log; every non-obvious choice and why
│   ├── SITEMAP.md          <- every route, its role gate, and its SEO status
│   └── phases/
│       └── phase-00-foundation.md ... phase-15-demo-pack.md
└── app/                    <- the Next.js application
    ├── src/content/        <- typed content fixtures; the contract the schema satisfies
    ├── prisma/             <- schema.prisma (56 models) + seed/ split by domain
    └── scripts/            <- check-contrast.py, verify-db.ts
```

**Two commands worth knowing before anything else:**

```bash
npm run db:seed    # rebuild the demo world (~7s)
npm run check      # typecheck + lint + format + WCAG contrast audit
```

## 8. The working rhythm (non-negotiable)

1. Open `PROGRESS.md`. Find the first phase not marked ✅ Complete.
2. Open `docs/phases/phase-NN-*.md`. Work the deliverable checklist top to bottom.
3. Tick each deliverable in the phase file as you finish it (`- [ ]` becomes `- [x]`).
4. When every deliverable is ticked and acceptance criteria pass, fill in the
   **Phase Summary** block at the bottom of the phase file. This block is what a future
   session reads instead of re-deriving the work. It is mandatory.
5. Update the status row in `PROGRESS.md` and log any non-obvious choice in `docs/DECISIONS.md`.
6. Commit with `phase(NN): <what changed>`.

**Never start phase N+1 while phase N's summary block is empty.** That is how context is lost.

## 9. Status legend used everywhere

| Symbol | Meaning |
| --- | --- |
| ⬜ Not Started | No work begun |
| 🟨 In Progress | Actively being built |
| 🟦 Blocked | Waiting on a decision or dependency (state it) |
| 🟧 Review | Built, awaiting verification against acceptance criteria |
| ✅ Complete | All deliverables ticked, acceptance criteria pass, summary written |
| ⏸️ Deferred | Consciously postponed (state to which phase) |
