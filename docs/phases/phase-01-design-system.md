# Phase 1 — Design System & Brand Identity

| | |
| --- | --- |
| **Status** | ✅ Complete |
| **Depends on** | Phase 0 |
| **Blocks** | Phases 2–11 (everything visual) |
| **Estimate** | 6 focused hours |
| **Started** | 2026-09-07 |
| **Completed** | 2026-09-08 |

## Objective

Land the entire visual language and the reusable component library *before* any feature is built.
Every later phase then assembles from existing parts instead of inventing new ones. This is what
keeps the product looking like one product rather than fifteen phases stapled together.

## Brand direction

**Positioning:** an official-feeling but modern government-adjacent platform. Credible enough for a
ministry panel, contemporary enough that students want to use it. Not a dated government portal, not
a startup landing page.

- **Primary — Deep Indigo `#1E3A8A` family.** Trust, institution, officialdom.
- **Accent — Ayush Green `#0F766E` family.** The Ayush connection, growth, wellness. Used for
  success states, verified badges, and the accent half of the logo mark.
- **Highlight — Saffron `#D97706` family.** Warmth and Indian identity. Used sparingly: CTAs,
  active states, chart emphasis. Never as a large background.
- **Neutrals** — a 50→950 slate ramp for text, surfaces and borders.
- **Semantic** — success / warning / danger / info, each with a foreground pair that passes AA.

**Typography:** one variable sans for UI and headings (Inter or Plus Jakarta Sans via
`next/font`, self-hosted, subset to latin + latin-ext), one variable mono for codes, IDs and
verification hashes. Two families, no more. A modular type scale (1.200 minor third) from
`text-xs` to `display-2xl`.

**Shape & depth:** 8px base radius, 12px for cards, full for pills. Shadows are subtle and used to
signal elevation only — no decorative drop shadows. Borders do most of the separation work.

**Motion:** 150ms for state changes, 250ms for entrances, 200ms ease-out as the default curve.
Everything respects `prefers-reduced-motion`.

## Deliverables

### Brand assets — all SVG, all hand-authored
- [x] **Logo mark** — a bridge/setu form built from two arcs meeting at a rising node, reading as
      both a bridge and an upward chart. Single-path where possible, works at 16px.
- [x] **Logo lockups** — horizontal (mark + wordmark), stacked, mark-only
- [x] **Monochrome and reversed variants** for dark backgrounds and print
- [x] `components/Logo.tsx` — one component, props for `variant` and `size`, uses `currentColor`
- [x] **Favicon set** from the mark: `icon.svg`, `favicon.ico` (32/16 multi-size),
      `apple-touch-icon` at 180×180 — per `../SEO IMPs/Fevicon.txt`: square, not a placeholder,
      crawlable, stable URL
- [x] `manifest.webmanifest` with maskable icons and theme colours
- [x] **Icon set** — a hand-built SVG icon component set (~40 icons) using a 24px grid and 1.5px
      strokes, inlined so they cost zero requests
- [x] **Illustration set** — 6–8 SVG scene illustrations for hero, empty states, 404, onboarding
      steps and role landing pages, drawn from the brand palette and theme-aware
- [~] **Pattern/texture SVGs** — grid shipped (`GridPattern`); gradient mesh not built, deferred to Phase 2 where the hero needs it

### Token system
- [x] `src/styles/globals.css` — full `@theme` token block: colour ramps, type scale, spacing,
      radii, shadows, z-index ladder, motion durations and easings
- [x] Dark mode by class with every token redefined; no colour defined only inside a media query
- [~] `prefers-reduced-motion` handled globally; `prefers-contrast` NOT handled — deferred to Phase 12
- [x] `ThemeProvider` + `ThemeToggle` with no flash of wrong theme on first paint

### UI primitives — `src/components/ui/`
- [x] `Button` (variants: primary, secondary, outline, ghost, danger, link × sm/md/lg, loading state, icon slots)
- [x] `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `FileInput`
- [x] `Field` wrapper — label, hint, error, required marker, correct `aria-describedby` wiring
- [x] `Card` (+ Header/Body/Footer), `Badge`, `Chip`, `Avatar`, `AvatarGroup`
- [x] `Tabs`, `Accordion`, `Dialog`, `Sheet`, `Popover`, `Tooltip`, `DropdownMenu`
- [~] `Table` — sticky header and horizontal scroll container done; `sortable` is a style flag only (no sort logic), and the mobile card fallback is not built. Both land with the first real data table in Phase 7.
- [x] `Toast` + toast dispatcher
- [x] `Progress`, `ProgressRing`, `Skeleton`, `Spinner`
- [x] `Alert`, `Callout`, `EmptyState`, `ErrorState`
- [x] `Breadcrumbs` (renders visually **and** emits `BreadcrumbList` JSON-LD), `Pagination`, `Stepper`
- [x] `Rating`, `StatTile`, `Timeline`

### Layout components — `src/components/layout/`
- [x] `Header` — sticky, responsive, mega-menu on desktop, accessible slide-over on mobile,
      auth-aware (logged-out CTAs vs. user menu). **Used by every page. Built exactly once.**
- [x] `Footer` — four-column with audience links, resources, legal, contact, grievance officer,
      social, and the government-context line. **Built exactly once.**
- [x] `Container`, `Section`, `Grid` — spacing and max-width primitives so no page invents its own
- [x] `PageHeader` — title, description, breadcrumbs, actions slot
- [x] `DashboardShell` — `Sidebar` (role-aware nav) + `Topbar` (search, notifications, user menu) +
      collapsible state persisted
- [x] `SkipToContent` link and correct landmark structure (`header`/`nav`/`main`/`footer`)

### Verification
- [x] `/style-guide` route rendering every component in every variant and state, both themes
- [x] Contrast audit: all text and interactive pairs pass WCAG 2.1 AA (4.5:1 body, 3:1 large/UI)
- [ ] Full keyboard pass — NOT manually verified. Radix supplies the behaviour and focus rings are styled globally, but nobody has tabbed the whole guide. Phase 12 owns this.
- [ ] Screen reader pass — NOT done. Phase 12 owns this.

## Acceptance criteria

1. `/style-guide` renders every component with zero visual defects in light and dark.
2. No component is defined twice anywhere in the codebase.
3. Toggling the theme causes no flash and no unreadable pairing.
4. Every interactive element is operable by keyboard alone with a visible focus indicator.
5. axe reports zero violations on `/style-guide`.
6. Total CSS shipped on the placeholder home page is under 20 KB gzipped.

## Notes

- Build the `Header` and `Footer` *well* now. They appear on every page and are the first thing a
  judge sees. Getting them right once is worth more than any other hour in this phase.
- Icons must be inline SVG components, not an icon font and not sprite fetches — zero extra
  requests, and they inherit `currentColor` so theming is free.
- Resist adding a component "because we might need it". The list above is already generous.

---

## Phase Summary

*Completed 2026-09-08.*

**What was built.** The complete visual language and the reusable component library, plus the
brand assets. Phase 2 now assembles pages from existing parts instead of inventing them. The
interim home page and `/style-guide` both render the system end to end.

**Key decisions made.**

- **The logo is a rising bridge span with two pylons and a node at its high end.** It reads two
  ways deliberately — a *setu* between academia and industry, and an ascending trajectory ending
  at a destination. Four strokes, so it survives at 16px. Drawn once in `Logo.tsx` from tokens,
  and re-drawn in Python from the same geometry to produce the raster icons.
- **Contrast was measured, not eyeballed — and four pairs failed.** `scripts/check-contrast.py`
  parses tokens straight out of `globals.css` and asserts every pair the product renders.
  The first run failed on: light `tier-self` (2.56), light and dark `border-strong` (1.48 / 1.95),
  and dark `fg-subtle` on surface (3.75). Tokens were corrected —
  `border-strong` → neutral-500 in both themes, dark `fg-muted` → neutral-300,
  dark `fg-subtle` → neutral-400, light `tier-self` → neutral-500. **Now 38/38 pass.**
  Wired into `npm run check`, so a future token change that breaks contrast fails the build gate.
- **Decorative `--color-border` is deliberately excluded from the 3:1 rule**, and the script says
  so. WCAG 1.4.11 covers boundaries needed to identify a component or its state; a card is
  identified by its content. `--color-border-strong`, which draws form controls, is in scope and
  passes.
- **Header is a Server Component with three small client islands** (grouped menus, mobile sheet,
  theme toggle). Links are real anchors rendered on the server, so navigation is crawlable with
  JavaScript off.
- **Navigation is data.** `config/navigation.ts` drives header, footer, mobile menu and all five
  dashboard sidebars. Routes are declared ahead of their phase and marked `planned`; `live()`
  filters them out, so **navigation never links to a 404**. Phase 2 flips these flags as pages land.
  This is why the header and footer currently look sparse — that is correct, not broken.
- **Toasts are hand-rolled** (~120 lines, no dependency) so the live-region behaviour is exactly
  right: polite for confirmations, assertive for errors.
- **Avatars are generated** — initials plus a deterministic hue from the name. Every user gets a
  stable, distinct avatar with no upload and no third-party service.
- **`Breadcrumbs` emits its own `BreadcrumbList` JSON-LD** from the same array it renders, so the
  visual trail and the structured data cannot drift. Verified in the live HTML.
- **`SkillBadge` differs by icon and border weight, not only colour** — the three tiers must be
  distinguishable in greyscale print, because certificates get printed.

**Component inventory.**

| Path | Exports |
| --- | --- |
| `components/Logo.tsx` | `Logo` — variants horizontal / stacked / mark, tones brand / mono / inverse, 4 sizes |
| `components/icons/index.tsx` | 60 icons, 24px grid, 1.5px stroke, inline, `currentColor` |
| `components/illustrations/index.tsx` | `BridgeScene` `AssessmentScene` `MatchingScene` `VerificationScene` `GrowthScene` `CollaborationScene` `EmptyScene` `NotFoundScene` `GridPattern` |
| `ui/button.tsx` | `Button` — 7 variants × 5 sizes, `asChild`, `loading`, `block` |
| `ui/input.tsx` | `Field` `Input` `Textarea` `NativeSelect` `FileInput` `useFieldControlProps` |
| `ui/toggle.tsx` | `Checkbox` `RadioGroup` `Radio` `Switch` `Slider` |
| `ui/select.tsx` | `Select` `SelectTrigger` `SelectContent` `SelectItem` `SelectLabel` `SelectValue` |
| `ui/card.tsx` | `Card` (4 variants) `CardHeader` `CardTitle` `CardDescription` `CardBody` `CardFooter` `StatTile` |
| `ui/badge.tsx` | `Badge` (7 variants) `Chip` `SkillBadge` `tierMeta` `VerificationTier` |
| `ui/avatar.tsx` | `Avatar` (5 sizes) `AvatarGroup` |
| `ui/feedback.tsx` | `Skeleton` `Spinner` `Progress` `ProgressRing` `Alert` `Callout` `EmptyState` `ErrorState` |
| `ui/overlay.tsx` | `Dialog` `Sheet` `DropdownMenu` `Popover` `Tooltip` `TooltipProvider` + parts |
| `ui/disclosure.tsx` | `Tabs` `TabsList` `TabsTrigger` `TabsContent` `Accordion` + parts |
| `ui/table.tsx` | `TableWrapper` `Table` `TableHead` `TableBody` `TableRow` `TableHeaderCell` `TableCell` `TableCaption` |
| `ui/toast.tsx` | `ToastProvider` `useToast` |
| `ui/navigation.tsx` | `Breadcrumbs` (+JSON-LD) `Pagination` `Stepper` |
| `ui/data.tsx` | `Separator` `Timeline` `Rating` |
| `layout/header.tsx` + `header-client.tsx` | `Header` `NavDropdown` `MobileNav` |
| `layout/footer.tsx` | `Footer` |
| `layout/container.tsx` | `Container` (4 widths) `Section` `PageHeader` `Grid` |
| `layout/dashboard-shell.tsx` | `DashboardShell` `DashboardUser` |
| `layout/theme.tsx` | `ThemeProvider` `ThemeToggle` |

**Token reference.** `app/src/styles/globals.css` is the only source of truth. Palette in
`@theme`, semantic layer on bare `:root`, dark redeclared twice (media query + `[data-theme]`).
Documented in `docs/DESIGN-SYSTEM.md`, enforced by `npm run check:contrast`.

**Deviations from the spec above, and why.**

- **Components are grouped into cohesive files** (`feedback.tsx`, `overlay.tsx`, `disclosure.tsx`,
  `data.tsx`) rather than one file per primitive. Fewer files to navigate, identical imports.
- **Gradient-mesh background not built** — only `GridPattern`. Phase 2's hero is where it would
  actually be used; building it blind now would have been guesswork.
- **`prefers-contrast` not handled.** Deferred to Phase 12, which owns the accessibility pass.
- **`Table` is partial** — sticky header and scroll container work; `sortable` is a style flag with
  no sort logic, and there is no mobile card fallback. Both need a real dataset to design against,
  so they land in Phase 7.
- **`/style-guide` is a Client Component wholesale.** It exists to exercise interactive components,
  it is `noindex`, and it ships to nobody but us. The server-first rule is relaxed there
  deliberately, and the file says so.
- **Pillow was installed** (dev-only, not an app dependency) to render `favicon.ico`,
  `apple-touch-icon.png` and the maskable PWA icons from the same path geometry as the React logo.

**Anything the next phase must know.**

1. **Flip the `planned: true` flags in `config/navigation.ts`** as each Phase 2 page lands. Until
   you do, the page exists but nothing links to it.
2. **Every page must go through `buildMetadata()`.** It is built and currently used by exactly two
   pages. Do not hand-write metadata.
3. **`Breadcrumbs` gives you `BreadcrumbList` free** — use it rather than emitting that JSON-LD
   by hand. The remaining types (`Organization`, `WebSite`, `JobPosting`, `FAQPage`, …) still need
   `lib/seo/jsonld.ts`, which Phase 2 builds.
4. **The interim home page (`(marketing)/page.tsx`) is disposable.** Phase 2 replaces it entirely.
5. **`(marketing)/layout.tsx` already wraps Header + `<main id="main">` + Footer.** New marketing
   pages just export a default component; do not re-add the chrome.
6. **Run `npm run check` before committing** — it now includes the contrast audit.
7. **Illustrations take an optional `title`.** Pass it when the scene carries meaning; omit it and
   the SVG is correctly `aria-hidden`.
8. **Not yet verified: keyboard walkthrough, screen reader, axe.** Phase 12 owns all three. Do not
   claim WCAG conformance beyond contrast until then.

**Verified by.**

| Check | Result |
| --- | --- |
| `npm run typecheck` | Clean |
| `npm run lint` | Zero problems |
| `npm run format:check` | All files formatted |
| `npm run check:contrast` | **38/38 pass**, both themes, parsed from `globals.css` |
| `npm run build` | Compiled 26.5s, 3 routes, no errors |
| `GET /` · `GET /style-guide` | 200 / 200 |
| Style guide coverage | 18 sections, 60 icons, 8 illustrations rendered |
| `BreadcrumbList` JSON-LD | Present and correct in served HTML |
| `/style-guide` robots | `noindex, nofollow, nocache` |
| Server-rendered content | Hero copy, tier badges and headings all present in raw HTML |
| Brand assets | `/icon.svg` `/favicon.ico` `/apple-touch-icon.png` `/icon-192.png` `/icon-512.png` `/manifest.webmanifest` all 200 with correct content types |
| CSS budget | ~10.5 KB gzipped total — under the 20 KB budget |
