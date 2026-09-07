import { siteConfig } from '@/config/site'

/**
 * Phase 0 placeholder.
 *
 * Its only job is to prove the foundation works: fonts load, design tokens resolve,
 * dark mode responds to the OS preference, and the build pipeline is clean.
 * Phase 1 replaces this entirely with the real design system, and Phase 2 with the
 * real home page.
 */

const phases = [
  { n: 0, name: 'Foundation & Project Setup', status: 'in-progress' },
  { n: 1, name: 'Design System & Brand', status: 'pending' },
  { n: 2, name: 'Public Site & SEO Core', status: 'pending' },
  { n: 3, name: 'Data Model & Skill Taxonomy', status: 'pending' },
  { n: 4, name: 'Auth, Roles & Onboarding', status: 'pending' },
  { n: 5, name: 'Assessment & Skill Profile', status: 'pending' },
  { n: 6, name: 'Matching & Recommendations', status: 'pending' },
  { n: 7, name: 'Opportunities & ATS', status: 'pending' },
  { n: 8, name: 'Portfolio & Verification', status: 'pending' },
  { n: 9, name: 'Academician Track', status: 'pending' },
  { n: 10, name: 'Analytics & Reports', status: 'pending' },
  { n: 11, name: 'Collaboration Hub', status: 'pending' },
  { n: 12, name: 'Hardening', status: 'pending' },
  { n: 13, name: 'Deployment & Operations', status: 'pending' },
  { n: 14, name: 'AI Layer', status: 'pending' },
  { n: 15, name: 'Demo Pack & Submission', status: 'pending' },
] as const

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex items-center gap-3">
        {/* First-draft logo mark: two arcs rising to meet at a node - a bridge,
            and an ascending chart. Formalised in Phase 1. */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          role="img"
          aria-label={`${siteConfig.name} logo`}
        >
          <path
            d="M4 30C4 30 10 14 20 14C30 14 36 30 36 30"
            stroke="var(--color-brand)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M4 30H36"
            stroke="var(--color-tier-endorsed)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="20" cy="14" r="4" fill="var(--color-tier-endorsed)" />
        </svg>
        <div>
          <p className="text-xl font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="text-sm text-[color:var(--color-fg-muted)]">{siteConfig.tagline}</p>
        </div>
      </div>

      <h1 className="mt-12 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Foundation is up.
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-[color:var(--color-fg-muted)]">
        Design tokens, fonts, theming and the build pipeline are working. This placeholder is
        replaced in Phase 1 by the design system, and in Phase 2 by the real home page.
      </p>

      <p className="mt-2 text-sm text-[color:var(--color-fg-subtle)]">
        SIH Problem Statement {siteConfig.context.problemStatementId} ·{' '}
        {siteConfig.context.ministry}
      </p>

      {/* Token check: if these swatches render in the right colours and invert
          correctly in dark mode, the token system is wired up properly. */}
      <section className="mt-10" aria-labelledby="tokens">
        <h2
          id="tokens"
          className="text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase"
        >
          Token check
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ['Primary', 'var(--color-brand)'],
            ['Accent', 'var(--color-tier-endorsed)'],
            ['Highlight', 'var(--color-highlight-600)'],
            ['Success', 'var(--color-success)'],
            ['Warning', 'var(--color-warning)'],
            ['Danger', 'var(--color-danger)'],
          ].map(([label, color]) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-[var(--radius-md)] border px-3 py-1.5 text-sm"
            >
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="phases">
        <h2
          id="phases"
          className="text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase"
        >
          Build phases
        </h2>
        <ol className="mt-3 space-y-1">
          {phases.map((phase) => (
            <li
              key={phase.n}
              className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm odd:bg-[color:var(--color-surface-raised)]"
            >
              <span className="w-6 font-mono text-xs text-[color:var(--color-fg-subtle)] tabular-nums">
                {String(phase.n).padStart(2, '0')}
              </span>
              <span className="flex-1">{phase.name}</span>
              <span
                className={
                  phase.status === 'in-progress'
                    ? 'text-xs font-medium text-[color:var(--color-warning)]'
                    : 'text-xs text-[color:var(--color-fg-subtle)]'
                }
              >
                {phase.status === 'in-progress' ? 'In progress' : 'Pending'}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 text-sm text-[color:var(--color-fg-subtle)]">
        Read <code className="font-mono">CONTEXT.md</code> to pick up this project, then{' '}
        <code className="font-mono">PROGRESS.md</code> for current status.
      </p>
    </main>
  )
}
