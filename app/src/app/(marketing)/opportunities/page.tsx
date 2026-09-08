import type { Metadata } from 'next'
import Link from 'next/link'

import { BriefcaseIcon, ClockIcon, MapPinIcon, ShieldCheckIcon } from '@/components/icons'
import { Container, PageHeader, Section } from '@/components/layout/container'
import { CtaBand } from '@/components/marketing/sections'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/feedback'
import { EmptyScene } from '@/components/illustrations'
import { Button } from '@/components/ui/button'
import {
  formatStipend,
  modeLabels,
  opportunities,
  opportunityFacets,
  typeLabels,
  type Opportunity,
} from '@/content/opportunities'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils/cn'

/**
 * Public opportunity search.
 *
 * The SEO engine of the whole site. Three decisions matter here:
 *
 * 1. It works logged out. A placement portal that hides every listing behind a login has no
 *    search presence at all.
 * 2. Filters are URL query parameters, not client state - so every facet combination is a
 *    real, shareable, crawlable URL (../SEO IMPs/URL.txt).
 * 3. Filtering happens on the server, so the page renders complete with JavaScript disabled.
 *
 * Phase 7 swaps the fixture array for a database query; the URL contract stays identical.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Internships, micro-internships and jobs',
  description:
    'Verified internships, micro-internships, apprenticeships and entry-level jobs across Ayush, healthcare and technology. Filter by skill, location, type and stipend.',
  path: '/opportunities',
})

interface SearchParams {
  type?: string
  region?: string
  mode?: string
  sector?: string
  q?: string
}

function matches(opportunity: Opportunity, filters: SearchParams): boolean {
  if (filters.type && opportunity.type !== filters.type) return false
  if (filters.region && opportunity.location.region !== filters.region) return false
  if (filters.mode && opportunity.mode !== filters.mode) return false
  if (filters.sector && opportunity.company.sector !== filters.sector) return false
  if (filters.q) {
    const haystack = [
      opportunity.title,
      opportunity.company.name,
      opportunity.summary,
      ...opportunity.skills.map((s) => s.name),
    ]
      .join(' ')
      .toLowerCase()
    if (!haystack.includes(filters.q.toLowerCase())) return false
  }
  return true
}

/** Builds a filter URL, preserving other active facets and clearing the one being toggled. */
function facetHref(current: SearchParams, key: keyof SearchParams, value: string | null): string {
  const next = new URLSearchParams()
  for (const [k, v] of Object.entries(current)) {
    if (v && k !== key) next.set(k, v)
  }
  if (value) next.set(key, value)
  const query = next.toString()
  return query ? `/opportunities?${query}` : '/opportunities'
}

function FacetGroup({
  label,
  paramKey,
  values,
  labels,
  current,
}: {
  label: string
  paramKey: keyof SearchParams
  values: string[]
  labels?: Record<string, string>
  current: SearchParams
}) {
  const active = current[paramKey]
  return (
    <div>
      <p className="text-xs font-semibold tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
        {label}
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        <li>
          <Link
            href={facetHref(current, paramKey, null)}
            className={cn(
              'inline-block rounded-full border px-3 py-1 text-xs',
              !active
                ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)] font-medium text-[color:var(--color-brand-fg)]'
                : 'border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-surface-raised)]',
            )}
          >
            All
          </Link>
        </li>
        {values.map((value) => (
          <li key={value}>
            <Link
              href={facetHref(current, paramKey, value)}
              aria-current={active === value ? 'true' : undefined}
              className={cn(
                'inline-block rounded-full border px-3 py-1 text-xs',
                active === value
                  ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)] font-medium text-[color:var(--color-brand-fg)]'
                  : 'border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-surface-raised)]',
              )}
            >
              {labels?.[value] ?? value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const filters = await searchParams
  const facets = opportunityFacets()
  const results = opportunities.filter((o) => matches(o, filters))
  const filtered = Object.values(filters).some(Boolean)

  return (
    <>
      <Section spacing="md">
        <Container>
          <PageHeader
            title="Opportunities"
            description="Internships, micro-internships, apprenticeships, live projects and entry-level roles. Every employer here is verified before their listing goes live."
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Opportunities' }]}
          />

          {/* Facets are links, not buttons — each combination is a real crawlable URL. */}
          <nav
            aria-label="Filter opportunities"
            className="mt-8 grid gap-5 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] p-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <FacetGroup
              label="Type"
              paramKey="type"
              values={facets.types}
              labels={typeLabels}
              current={filters}
            />
            <FacetGroup
              label="Mode"
              paramKey="mode"
              values={facets.modes}
              labels={modeLabels}
              current={filters}
            />
            <FacetGroup
              label="Location"
              paramKey="region"
              values={facets.regions}
              current={filters}
            />
            <FacetGroup
              label="Sector"
              paramKey="sector"
              values={facets.sectors}
              current={filters}
            />
          </nav>

          <p className="mt-5 text-sm text-[color:var(--color-fg-muted)]" aria-live="polite">
            {results.length} {results.length === 1 ? 'opportunity' : 'opportunities'}
            {filtered ? ' matching your filters' : ''}
            {filtered ? (
              <>
                {' · '}
                <Link href="/opportunities" className="underline underline-offset-4">
                  Clear filters
                </Link>
              </>
            ) : null}
          </p>
        </Container>
      </Section>

      <Section spacing="sm" surface="raised">
        <Container>
          {results.length === 0 ? (
            <EmptyState
              illustration={<EmptyScene className="w-32" />}
              title="Nothing matches those filters"
              description="Try widening the location or type — or clear the filters and browse everything."
              action={
                <Button size="sm" asChild>
                  <Link href="/opportunities">Clear filters</Link>
                </Button>
              }
            />
          ) : (
            <ul className="grid gap-4">
              {results.map((opportunity) => (
                <li key={opportunity.slug}>
                  <Card interactive className="relative">
                    <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge size="sm" variant="brand">
                            {typeLabels[opportunity.type]}
                          </Badge>
                          <Badge size="sm" variant="neutral">
                            {modeLabels[opportunity.mode]}
                          </Badge>
                          {opportunity.company.verified ? (
                            <Badge size="sm" variant="success">
                              <ShieldCheckIcon size={12} /> Verified employer
                            </Badge>
                          ) : null}
                        </div>

                        <h2 className="mt-2.5 text-lg font-semibold tracking-tight">
                          <Link
                            href={`/opportunities/${opportunity.slug}`}
                            className="after:absolute after:inset-0"
                          >
                            {opportunity.title}
                          </Link>
                        </h2>

                        <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                          {opportunity.company.name} · {opportunity.company.sector}
                        </p>

                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                          {opportunity.summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {opportunity.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill.name} size="sm" variant="outline">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <dl className="flex shrink-0 flex-col gap-1.5 text-sm sm:text-right">
                        <div className="flex items-center gap-1.5 sm:justify-end">
                          <BriefcaseIcon
                            size={14}
                            className="text-[color:var(--color-fg-subtle)]"
                          />
                          <dd className="font-medium">{formatStipend(opportunity.stipend)}</dd>
                        </div>
                        <div className="flex items-center gap-1.5 text-[color:var(--color-fg-muted)] sm:justify-end">
                          <MapPinIcon size={14} />
                          <dd>{opportunity.location.city}</dd>
                        </div>
                        {opportunity.durationWeeks ? (
                          <div className="flex items-center gap-1.5 text-[color:var(--color-fg-muted)] sm:justify-end">
                            <ClockIcon size={14} />
                            <dd>{opportunity.durationWeeks} weeks</dd>
                          </div>
                        ) : null}
                      </dl>
                    </CardBody>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaBand
        title="Not sure which of these you are ready for?"
        description="The career explorer shows what each path asks for, and where you would need to close a gap."
        primaryCta={{ label: 'Explore career paths', href: '/careers' }}
        secondaryCta={{ label: 'How matching works', href: '/how-it-works' }}
      />
    </>
  )
}
