# Design System

Full component checklist lives in `docs/phases/phase-01-design-system.md`. This file is the
reference: the tokens, the rules, and where things live.

## Brand

**KaushalSetu** — *Kaushal* (skill) + *Setu* (bridge). Tagline: **The bridge from campus to career.**

**Design intent:** official-feeling but modern. Credible to a ministry panel, contemporary enough
that a 20-year-old wants to use it. Not a dated government portal; not a consumer startup.

### Logo

A bridge form built from two arcs rising to meet at a node — reads simultaneously as a *setu*
(bridge) and as an ascending chart. Built as a single SVG path where possible so it holds at 16px.

Variants: horizontal lockup (default), stacked, mark-only, monochrome, reversed.
One component: `<Logo variant="horizontal" size="md" />`, drawing colour from `currentColor` so it
themes for free.

## Colour tokens

Declared as CSS custom properties in `src/styles/globals.css` under `@theme`. Never write a hex
value in a component.

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Primary (trust, institution) | `--color-primary-*` | Indigo 600 `#1E3A8A` base | lightened for contrast |
| Accent (Ayush, growth, verified) | `--color-accent-*` | Teal 700 `#0F766E` | lightened |
| Highlight (CTA, Indian identity) | `--color-highlight-*` | Amber 600 `#D97706` | lightened |
| Surface | `--color-surface`, `--color-surface-raised` | white / slate-50 | slate-950 / slate-900 |
| Text | `--color-fg`, `--color-fg-muted`, `--color-fg-subtle` | slate-900/600/500 | slate-50/400/500 |
| Border | `--color-border`, `--color-border-strong` | slate-200/300 | slate-800/700 |
| Success / Warning / Danger / Info | `--color-{semantic}` + `-fg` | each AA-verified | each AA-verified |

Each colour has a 50→950 ramp. **Every token is defined on bare `:root` first**, then redefined
under `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`. A colour whose only
definition sits inside a media query is a bug.

### Verification tier colours (load-bearing — see Phase 8)

| Tier | Colour | Treatment |
| --- | --- | --- |
| Self-declared | `--color-fg-subtle` | Grey outline, no icon |
| Assessment-verified | `--color-primary-600` | Blue fill, check icon |
| Employer-endorsed | `--color-accent-600` | Teal fill, seal icon, names the endorser |

These three must be distinguishable at a glance, and distinguishable in greyscale print.

## Typography

| Token | Use |
| --- | --- |
| `--font-sans` | Inter or Plus Jakarta Sans, variable, self-hosted via `next/font`, latin subset |
| `--font-mono` | JetBrains Mono — verification codes, IDs, hashes |

Scale (1.200 minor third): `xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 · 4xl 36 ·
5xl 48 · 6xl 60`. Line height 1.5 for body, 1.2 for display. Body copy caps at ~70ch.

Two families. No third. No decorative fonts.

## Spacing, shape, depth, motion

- **Spacing:** 4px base — `1 2 3 4 6 8 12 16 20 24 32` in the scale. Section padding
  `py-16 md:py-24`.
- **Radius:** `sm 4 · md 8 (default) · lg 12 (cards) · xl 16 · full (pills, avatars)`.
- **Shadow:** four levels, all subtle, used only to signal elevation. Borders do the separating.
- **Motion:** 150ms state change, 250ms entrance, `ease-out` default. Everything wrapped in
  `@media (prefers-reduced-motion: reduce)` to disable.
- **Z-index ladder:** `dropdown 1000 · sticky 1100 · overlay 1200 · modal 1300 · popover 1400 ·
  toast 1500`. Named tokens only — no arbitrary `z-[9999]`.

## Component rules

1. **Built once, in `src/components/ui/`.** If you are writing a second button, stop.
2. **Variants via props**, never via copied files.
3. **Composition over configuration** — `<Card><CardHeader/><CardBody/></Card>`, not a Card with
   twenty props.
4. **Every interactive element** has hover, focus-visible, active, disabled and loading states.
5. **Focus rings are never removed.** `focus-visible:ring-2 ring-offset-2` is the house style.
6. **Every form control** pairs with `<Field>` for label, hint, error and `aria-describedby` wiring.
7. **Every data view** ships loading, empty and error states. All three.
8. **Icons are inline SVG components** using `currentColor` — no icon font, no sprite fetch.
9. **Never `style={{}}`** for anything a token covers.

## Layout

- `Container` — `max-w-7xl` with responsive padding. Content pages use `max-w-3xl` for readability.
- `Section` — vertical rhythm and optional background treatment.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Mobile-first, always.
- Grid: 12 columns on desktop, 4 on mobile.

## Accessibility floor (WCAG 2.1 AA)

- Contrast 4.5:1 body text, 3:1 large text and UI boundaries — verified in **both** themes.
- Everything keyboard-operable, with a visible focus indicator and logical tab order.
- One `h1` per page, headings in order, real landmarks, skip-to-content link.
- Errors announced via `aria-live`, associated with their field, never colour-alone.
- Touch targets 44×44 minimum.
- Usable at 200% zoom.
- `prefers-reduced-motion` and `prefers-contrast` honoured.

## Illustration & imagery

**Everything is SVG.** No raster, no stock photography, no paid licences.

- Scene illustrations use the brand palette, theme-aware via `currentColor` and CSS variables.
- Geometric and abstract rather than figurative — cheaper to draw, ages better, and avoids the
  generic-corporate-illustration look.
- Decorative SVGs: `aria-hidden="true"` and no title. Meaningful ones: `<title>` and `role="img"`.
- Every SVG carries explicit `width`/`height` or a `viewBox` with a sized wrapper, so CLS stays at zero.
- OG images generated at request time from the same SVG language via `ImageResponse`.

## The style guide route

`/style-guide` renders every component in every variant and state, in both themes. It is the
reference and the regression test. Keep it current — a component not on that page does not exist.
