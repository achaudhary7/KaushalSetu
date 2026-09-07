# SEO Checklist & Contract

Distilled from the Google Search Central documentation in `../SEO IMPs/`. Every page in
KaushalSetu must satisfy the per-page contract in §2 before it is considered done.

Source files referenced: `SEO Basic.txt` (JavaScript SEO), `SEO Fandametal.txt`, `Page and Meta.txt`,
`Title.txt`, `URL.txt`, `Sitemap.txt`, `Robot.txt`, `robots.txt specification.txt`, `Fevicon.txt`,
`Snipet.txt`, `Feature.txt`, `Mobile Indexing.txt`, `links.txt`, `technical and Spam.txt`,
`APM.txt`, `Google Search.txt`, `Google Discover.txt`, `AI Overviews.txt`.

---

## 1. The architectural decisions that do most of the work

| Decision | Why, per the source docs |
| --- | --- |
| **Server-render everything public** | `SEO Basic.txt` describes Google's three-phase crawl → render → index pipeline, where rendering is queued separately and may lag. Content present in the initial HTML skips that queue entirely. Our marketing pages, opportunity listings, portfolios and articles are all Server Components. |
| **Real `<a href>` links only** | `links.txt` and `SEO Basic.txt`: Googlebot discovers URLs from `href` attributes. A `<div onclick=router.push()>` is invisible to a crawler. Every navigation in the app uses `next/link`, which renders a real anchor. |
| **No content behind fragments** | `URL.txt`: Google does not support URL fragments for content changes. All state that changes content lives in path segments or query parameters. |
| **Mobile-first** | `Mobile Indexing.txt`: Google indexes the mobile rendering. Content, structured data and metadata must be identical on mobile and desktop — no hiding content on small screens. |
| **One canonical host** | Pick with-`www` or without, redirect the other, and make `NEXT_PUBLIC_SITE_URL` match. Canonicals, sitemap and OG URLs all derive from that one variable. |

---

## 2. Per-page contract

No page ships without all of these. `buildMetadata()` in `src/lib/seo/metadata.ts` enforces most
of it by construction — pages pass typed input, never hand-write tags.

- [ ] **Unique `<title>`**, under ~60 characters, descriptive and specific.
      Per `Title.txt`: never vague ("Home", "Profile"), never keyword-stuffed, never boilerplate
      repeated across pages. Pattern: `{Specific Page Title} · KaushalSetu`, with the home page as
      `KaushalSetu — Academia–Industry Portal for Skills, Internships & Placements`.
- [ ] **Unique meta description**, 140–160 characters, written as a human summary of *this* page.
- [ ] **Self-referencing canonical**, absolute URL.
- [ ] **One `<h1>`**, matching the page's subject, with headings in order below it.
- [ ] **OpenGraph + Twitter card** — title, description, 1200×630 image, type, url.
- [ ] **Robots directives** — explicit `index/follow` for public pages, `noindex` for anything
      private (dashboards, `/verify/[code]`, private portfolios, search permutations we do not want).
- [ ] **Structured data** where a type applies (§3), validated in the Rich Results Test.
- [ ] **Descriptive link text** — no "click here". Per `links.txt`, anchor text is a ranking and
      comprehension signal.
- [ ] **Alt text** on meaningful images; `aria-hidden="true"` + no alt on decorative SVG.
- [ ] **Content renders with JavaScript disabled.** The single best test that the page is crawlable.

---

## 3. Structured data map

| Type | Where | Phase |
| --- | --- | --- |
| `Organization` | Root layout, every page | 2 |
| `WebSite` + `SearchAction` | Home | 2 |
| `BreadcrumbList` | Emitted automatically by the `Breadcrumbs` component | 1–2 |
| `FAQPage` | `/faq`, and FAQ sections on landing pages | 2 |
| `JobPosting` | `/opportunities/[slug]` — full: title, description, datePosted, validThrough, employmentType, hiringOrganization, jobLocation, baseSalary, skills, educationRequirements | 2 (fixture) → 7 (real) |
| `Course` | `/skills/[slug]` learning resources, learning paths | 6 |
| `Person` + `ProfilePage` | `/p/[username]` public portfolios, faculty profiles | 8, 9 |
| `Article` | `/resources/[slug]` | 2 |
| `Event` | Workshops, guest lectures, challenges, public calendar | 11 |
| `EducationalOrganization` | Institution profile pages | 9 |
| `ContactPoint` | `/contact` | 2 |

`JobPosting` is the highest-value item on this list — it makes listings eligible for Google's job
search experience, which is a real, demonstrable distribution advantage worth naming in the pitch.

---

## 4. URL rules (`URL.txt`)

- Lowercase, hyphen-separated, no underscores, no trailing slash inconsistency.
- Shallow and readable: `/opportunities/ayurvedic-qa-intern-himalaya-2026`, not `/o?id=8814`.
- Parameters use `key=value` joined by `&`; multiple values for one key use commas.
  Never brackets, never colons as separators.
- Percent-encode reserved characters (IETF STD 66).
- Slugs are stable. If one must change, 301 to the new URL and keep the redirect.
- Filter and facet state lives in query parameters so every combination is a shareable, crawlable URL.

---

## 5. `robots.txt` and sitemaps

**`robots.txt`** — generated by `src/app/robots.ts`:
- Allow the public site.
- Disallow `/dashboard/`, `/admin/`, `/settings/`, `/api/`, `/auth/`, and high-cardinality filter
  permutations that would waste crawl budget.
- Declare the sitemap with an absolute URL.
- Remember (`Robot.txt`): a `Disallow` prevents *crawling*, not indexing of a URL discovered
  elsewhere. To keep something out of the index, use `noindex` on a page that is *allowed* to be
  crawled — blocking it means Google never sees the `noindex`.

**`sitemap.xml`** — generated by `src/app/sitemap.ts`:
- Only canonical, indexable, 200-status URLs. Never a redirect, never a `noindex` page.
- Accurate `lastModified` from real data timestamps.
- Segment into a sitemap index if it ever approaches 50,000 URLs or 50 MB (`Sitemap.txt`).
- Dynamic entries added as each phase lands: opportunities (7), portfolios (8), articles (2),
  career paths (6), skill hubs (6), events (11).

---

## 6. Favicon (`Fevicon.txt`)

- Square SVG plus a multi-size `.ico`, and a 180×180 `apple-touch-icon`.
- `<link rel="icon">` in the root layout, on a **stable URL that never changes**.
- Must be crawlable — not blocked by robots.txt.
- A visual representation of the brand, not a generic placeholder.
- Google may take days to weeks to pick it up. Ship it in Phase 1, not the week of submission.

---

## 7. Snippets (`Snipet.txt`, `Feature.txt`)

- Well-structured content with clear headings and direct answers is what becomes a featured snippet;
  there is no markup that requests one.
- Use `max-snippet`, `max-image-preview:large` and `max-video-preview` deliberately in the robots meta.
- `data-nosnippet` on anything that must never appear in a snippet — for us, any fragment of
  personal data on a public portfolio.
- FAQ sections written as genuine question/answer pairs serve both users and People-Also-Ask.

---

## 8. Core Web Vitals (`APM.txt`)

Page experience is measured on real-user data. Budgets and techniques live in
`docs/PERFORMANCE.md`; the targets are LCP < 2.0s, INP < 200ms, CLS < 0.05, comfortably inside
Google's thresholds.

---

## 9. Content strategy — where organic traffic actually comes from

A placement portal with everything behind a login has no search presence. Our indexable surfaces,
in order of expected value:

1. **`/opportunities` and `/opportunities/[slug]`** — high intent, `JobPosting` eligible.
2. **`/careers/[path]`** — "career options after BAMS", "what does an Ayush regulatory affairs
   executive do". Almost no good content exists for these queries. This is genuinely open ground.
3. **`/skills/[slug]`** — skill hubs linking to free SWAYAM/NPTEL courses.
4. **`/resources/[slug]`** — guides on internships, resumes, skill gaps, Ayush careers.
5. **`/p/[username]`** — public portfolios, shared by students themselves.
6. **`/verify`** — recruiters arriving from a printed certificate. Low volume, very high trust.

Internal linking: every skill links to its careers, every career to its skills and opportunities,
every opportunity to its skills. A dense, genuinely useful internal graph, built from real data.

---

## 10. Spam policy compliance (`technical and Spam.txt`)

We are building a real product, so this is mostly about not doing anything stupid:

- No doorway pages — do not generate thin `/careers/x-in-{city}` permutations.
- No keyword stuffing in titles, descriptions or body copy.
- No cloaking — the crawler sees exactly what the user sees.
- Auto-generated content (AI-assisted job descriptions in Phase 14) must be reviewed and edited by
  the posting user before publication, never published unattended at scale.
- User-generated content (portfolios, listings) is moderated; the employer verification gate and
  the report mechanism are the controls.
- No paid links, no link schemes.

---

## 11. Pre-launch verification

- [ ] Google Search Console property verified, sitemap submitted
- [ ] Rich Results Test passes for every structured data type in §3
- [ ] Mobile-Friendly rendering confirmed on real devices
- [ ] Lighthouse SEO score 100 on every public page
- [ ] No duplicate titles or descriptions (script-verified across the route table)
- [ ] All canonicals point at the production host, not localhost
- [ ] `robots.txt` in production does not block the site (check this twice — it is the classic
      launch-day catastrophe: a staging `Disallow: /` shipped to production)
- [ ] Every public page renders fully with JavaScript disabled
- [ ] 404 returns a real 404 status, not a 200 with an error page
