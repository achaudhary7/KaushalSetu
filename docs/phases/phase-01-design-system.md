# Phase 1 — Design System & Brand Identity

| | |
| --- | --- |
| **Status** | ⬜ Not Started |
| **Depends on** | Phase 0 |
| **Blocks** | Phases 2–11 (everything visual) |
| **Estimate** | 6 focused hours |

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
- [ ] **Logo mark** — a bridge/setu form built from two arcs meeting at a rising node, reading as
      both a bridge and an upward chart. Single-path where possible, works at 16px.
- [ ] **Logo lockups** — horizontal (mark + wordmark), stacked, mark-only
- [ ] **Monochrome and reversed variants** for dark backgrounds and print
- [ ] `components/Logo.tsx` — one component, props for `variant` and `size`, uses `currentColor`
- [ ] **Favicon set** from the mark: `icon.svg`, `favicon.ico` (32/16 multi-size),
      `apple-touch-icon` at 180×180 — per `../SEO IMPs/Fevicon.txt`: square, not a placeholder,
      crawlable, stable URL
- [ ] `manifest.webmanifest` with maskable icons and theme colours
- [ ] **Icon set** — a hand-built SVG icon component set (~40 icons) using a 24px grid and 1.5px
      strokes, inlined so they cost zero requests
- [ ] **Illustration set** — 6–8 SVG scene illustrations for hero, empty states, 404, onboarding
      steps and role landing pages, drawn from the brand palette and theme-aware
- [ ] **Pattern/texture SVGs** — a subtle grid and a gradient mesh for section backgrounds

### Token system
- [ ] `src/styles/globals.css` — full `@theme` token block: colour ramps, type scale, spacing,
      radii, shadows, z-index ladder, motion durations and easings
- [ ] Dark mode by class with every token redefined; no colour defined only inside a media query
- [ ] `prefers-reduced-motion` and `prefers-contrast` handling
- [ ] `ThemeProvider` + `ThemeToggle` with no flash of wrong theme on first paint

### UI primitives — `src/components/ui/`
- [ ] `Button` (variants: primary, secondary, outline, ghost, danger, link × sm/md/lg, loading state, icon slots)
- [ ] `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `FileInput`
- [ ] `Field` wrapper — label, hint, error, required marker, correct `aria-describedby` wiring
- [ ] `Card` (+ Header/Body/Footer), `Badge`, `Chip`, `Avatar`, `AvatarGroup`
- [ ] `Tabs`, `Accordion`, `Dialog`, `Sheet`, `Popover`, `Tooltip`, `DropdownMenu`
- [ ] `Table` (sortable, sticky header, responsive card fallback on mobile)
- [ ] `Toast` + toast dispatcher
- [ ] `Progress`, `ProgressRing`, `Skeleton`, `Spinner`
- [ ] `Alert`, `Callout`, `EmptyState`, `ErrorState`
- [ ] `Breadcrumbs` (renders visually **and** emits `BreadcrumbList` JSON-LD), `Pagination`, `Stepper`
- [ ] `Rating`, `StatTile`, `Timeline`

### Layout components — `src/components/layout/`
- [ ] `Header` — sticky, responsive, mega-menu on desktop, accessible slide-over on mobile,
      auth-aware (logged-out CTAs vs. user menu). **Used by every page. Built exactly once.**
- [ ] `Footer` — four-column with audience links, resources, legal, contact, grievance officer,
      social, and the government-context line. **Built exactly once.**
- [ ] `Container`, `Section`, `Grid` — spacing and max-width primitives so no page invents its own
- [ ] `PageHeader` — title, description, breadcrumbs, actions slot
- [ ] `DashboardShell` — `Sidebar` (role-aware nav) + `Topbar` (search, notifications, user menu) +
      collapsible state persisted
- [ ] `SkipToContent` link and correct landmark structure (`header`/`nav`/`main`/`footer`)

### Verification
- [ ] `/style-guide` route rendering every component in every variant and state, both themes
- [ ] Contrast audit: all text and interactive pairs pass WCAG 2.1 AA (4.5:1 body, 3:1 large/UI)
- [ ] Full keyboard pass — every interactive element reachable, visible focus ring, logical order
- [ ] Screen reader pass on the header, a dialog and a form

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

> **Fill this in before starting Phase 2. Mandatory.**

**What was built:**

**Key decisions made:**

**Component inventory (name → path → variants):**

**Token reference (where the source of truth lives):**

**Deviations from the spec above, and why:**

**Anything the next phase must know:**

**Verified by:**
