# Phase 2 — Public Marketing Site & SEO Core

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phase 1 |
| **Blocks** | Nothing hard, but every later public page inherits this machinery |
| **Estimate** | 8 focused hours |

## Objective

Build the entire logged-out surface of the product, and the SEO infrastructure that every page in
the application — now and in later phases — will use. After this phase the site is *complete and
impressive* to anyone who visits without an account, which is exactly the state you want to be in
early.

Source material for every SEO decision here: the Google Search Central documents in `../SEO IMPs`.
The distilled contract lives in `docs/SEO-CHECKLIST.md`.

## Deliverables

### The SEO engine — build this first, use it on every page
- [ ] `src/lib/seo/metadata.ts` — `buildMetadata()` helper producing title, description, canonical,
      OpenGraph, Twitter card, robots directives from one typed input. **No page writes metadata by hand.**
- [ ] Title strategy: `Page Title · KaushalSetu` under 60 chars, unique per page, descriptive not
      vague — per `../SEO IMPs/Title.txt` (no "Home", no boilerplate repetition, no keyword stuffing)
- [ ] Meta description: unique, 140–160 chars, written as a summary not a keyword list
- [ ] `alternates.canonical` on every page — self-referencing, absolute
- [ ] URL structure: lowercase, hyphenated, shallow, no fragments used for content, parameters as
      `?key=value&key2=value2` — per `../SEO IMPs/URL.txt`
- [ ] `src/app/sitemap.ts` — static routes now, dynamic (opportunities, portfolios, articles,
      career paths) wired in later phases; segmented if it ever exceeds 50k URLs
- [ ] `src/app/robots.ts` — allow the public site, disallow `/dashboard`, `/api`, `/admin`,
      `/settings`, search-result permutations; declare the sitemap
- [ ] `src/lib/seo/jsonld.ts` — typed builders for `Organization`, `WebSite` + `SearchAction`,
      `BreadcrumbList`, `FAQPage`, `JobPosting`, `Course`, `Person`, `Article`, `EducationalOrganization`
- [ ] `src/app/opengraph-image.tsx` + per-route variants — OG images generated from SVG/`ImageResponse`,
      1200×630, no raster assets
- [ ] Favicon links and `manifest.webmanifest` wired into the root layout
- [ ] `hreflang` scaffolding for future `en` / `hi` (declare the pattern now, translate later)
- [ ] Semantic HTML discipline: one `h1`, ordered headings, real `<nav>`/`<main>`/`<article>`,
      descriptive link text, `alt` on every meaningful SVG and `aria-hidden` on decorative ones

### Pages — marketing
- [ ] `/` — home: hero with the SVG illustration, the problem framed in numbers, the three
      lifecycles, the four audiences, the differentiators (verification, reverse gap report,
      outcomes), how it works in three steps, Ayush focus band, trust/verification band, FAQ, CTA
- [ ] `/for-students` — assessment, matching, portfolio, micro-internships, free learning paths
- [ ] `/for-industry` — post, verified talent, blind shortlisting, ATS, analytics
- [ ] `/for-institutions` — dashboards, reverse skill-gap report, outcome tracking, NAAC/NBA-useful data
- [ ] `/for-academicians` — FDPs, faculty internships, consultancy, research collaboration
- [ ] `/how-it-works` — the full lifecycle walkthrough with an SVG process diagram
- [ ] `/features` — the complete capability matrix
- [ ] `/ayush` — the domain page: BAMS/BHMS/BUMS career paths, NCISM alignment, Ayush employers
- [ ] `/pricing` — free for students and institutions, tiers for industry (descriptive, no gateway)

### Pages — the SEO engine of the site
- [ ] `/opportunities` — public, crawlable, faceted search (type, skill, location, mode, stipend).
      Filters are real URLs, not client-only state, so each facet is indexable.
- [ ] `/opportunities/[slug]` — detail page with full `JobPosting` structured data
      (title, description, datePosted, validThrough, employmentType, hiringOrganization,
      jobLocation, baseSalary, skills, educationRequirements). *Wired to real data in Phase 7;
      renders from a typed fixture now.*
- [ ] `/careers/[path]` — career path explorer pages (e.g. `/careers/ayurvedic-pharmacovigilance`),
      each listing required skills, salary band, entry routes and courses. Genuinely useful content
      and the highest-value organic surface on the site.
- [ ] `/skills/[slug]` — skill hub pages: what it is, who wants it, where to learn it free, related roles
- [ ] `/resources` + `/resources/[slug]` — insights and guides with `Article` structured data,
      author, dates and reading time
- [ ] `/verify` and `/verify/[code]` — public certificate verification (Phase 8 fills the logic;
      the page and its `noindex` policy for individual codes are set here)

### Pages — trust, support and legal
- [ ] `/about` — mission, the SIH 26044 context, the team
- [ ] `/contact` — validated form, office address, `ContactPoint` structured data
- [ ] `/faq` — accordion with `FAQPage` structured data
- [ ] `/help` — help centre index and articles
- [ ] `/privacy` — including DPDP Act 2023 framing
- [ ] `/terms`
- [ ] `/cookies`
- [ ] `/accessibility` — the accessibility statement, WCAG 2.1 AA conformance claim
- [ ] `/grievance` — grievance officer and nodal contact (expected of an Indian platform under the IT Rules)
- [ ] `/security` — responsible disclosure policy
- [ ] `/sitemap` — the human-readable HTML sitemap
- [ ] `not-found.tsx` (404) and `error.tsx` (500) — designed, on-brand, with useful onward links
- [ ] `/offline` — PWA offline fallback

### Performance
- [ ] Every marketing page is a Server Component; `'use client'` only for the mobile menu, theme
      toggle, accordion and any form
- [ ] Fonts self-hosted via `next/font`, `display: swap`, preloaded, subset
- [ ] No layout shift: explicit dimensions on every SVG and media box
- [ ] Route-level dynamic imports for anything below the fold that needs JS
- [ ] Lighthouse run and recorded for `/`, `/for-students`, `/opportunities`

## Acceptance criteria

1. Lighthouse on `/`: Performance ≥ 95, Accessibility ≥ 95, Best Practices 100, SEO 100.
2. Every page has a unique title and description; a script verifies no duplicates exist.
3. `/sitemap.xml` and `/robots.txt` both return valid, correct output.
4. All JSON-LD passes Google's Rich Results Test with no errors.
5. Disabling JavaScript still shows full content and working navigation on every marketing page —
   this is the direct test of the JS-SEO guidance in `../SEO IMPs/SEO Basic.txt`.
6. `next build` reports no marketing route over 100 KB First Load JS.

## Notes

- `/opportunities`, `/careers/*` and `/skills/*` are the organic acquisition engine. A placement
  portal that hides all its listings behind a login has no search presence at all. Public listing
  pages with `JobPosting` structured data are also eligible for Google's job search experience —
  say this on stage, it lands well.
- Individual `/verify/[code]` pages must be `noindex` (they are personal records), while `/verify`
  itself is indexable.
- Write real copy, not lorem ipsum. Thin content is an SEO problem and a demo problem.

---

## Phase Summary

> **Fill this in before starting Phase 3. Mandatory.**

**What was built:**

**Key decisions made:**

**Route inventory (path → title → indexable? → structured data):**

**Lighthouse scores recorded:**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
