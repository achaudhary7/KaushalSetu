import type { Metadata } from 'next'
import Link from 'next/link'

import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@/components/icons'
import { Container, PageHeader, Section } from '@/components/layout/container'
import { Prose } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Alert } from '@/components/ui/feedback'
import { getCareerPath } from '@/content/careers'
import {
  employmentTypeFor,
  formatStipend,
  getOpportunity,
  modeLabels,
  opportunities,
  typeLabels,
} from '@/content/opportunities'
import { skillSlugForName } from '@/content/skills'
import { jobPostingJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * Opportunity detail.
 *
 * Carries full JobPosting structured data, which makes listings eligible for Google's job
 * search experience - real distribution a placement portal can otherwise never get.
 * See docs/SEO-CHECKLIST.md section 3.
 */

export function generateStaticParams() {
  return opportunities.map((o) => ({ slug: o.slug }))
}

export const dynamicParams = false

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const opportunity = getOpportunity(slug)
  if (!opportunity) {
    return buildMetadata({
      title: 'Opportunity',
      description: '',
      path: `/opportunities/${slug}`,
      index: false,
    })
  }

  return buildMetadata({
    title: opportunity.title,
    description: opportunity.summary.slice(0, 158),
    path: `/opportunities/${opportunity.slug}`,
  })
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function OpportunityPage({ params }: Props) {
  const { slug } = await params
  const opportunity = getOpportunity(slug)
  if (!opportunity) return null

  const career = opportunity.careerSlug ? getCareerPath(opportunity.careerSlug) : undefined
  const similar = opportunities
    .filter((o) => o.slug !== opportunity.slug && o.company.sector === opportunity.company.sector)
    .slice(0, 3)

  return (
    <>
      <JsonLd
        data={jobPostingJsonLd({
          title: opportunity.title,
          description: [opportunity.summary, ...opportunity.responsibilities].join(' '),
          slug: opportunity.slug,
          datePosted: opportunity.postedAt,
          validThrough: opportunity.deadline,
          employmentType: employmentTypeFor[opportunity.type],
          organisation: { name: opportunity.company.name },
          location: { city: opportunity.location.city, region: opportunity.location.region },
          remote: opportunity.mode === 'REMOTE',
          salary: opportunity.stipend
            ? {
                min: opportunity.stipend.min,
                max: opportunity.stipend.max,
                unit: opportunity.stipend.period === 'year' ? 'YEAR' : 'MONTH',
              }
            : undefined,
          skills: opportunity.skills.map((s) => s.name),
          educationRequirements: opportunity.eligibility.programmes.join(', '),
        })}
      />

      <Section spacing="md">
        <Container>
          <PageHeader
            title={opportunity.title}
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Opportunities', href: '/opportunities' },
              { label: opportunity.title },
            ]}
            actions={
              <Button>
                Apply <ArrowRightIcon />
              </Button>
            }
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="brand">{typeLabels[opportunity.type]}</Badge>
            <Badge variant="neutral">{modeLabels[opportunity.mode]}</Badge>
            {opportunity.company.verified ? (
              <Badge variant="success">
                <ShieldCheckIcon size={12} /> Verified employer
              </Badge>
            ) : null}
            <Badge variant="outline">{opportunity.company.sector}</Badge>
          </div>
        </Container>
      </Section>

      <Section spacing="sm" surface="raised">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <Prose>
                <p className="text-lg text-[color:var(--color-fg)]">{opportunity.summary}</p>
              </Prose>

              <h2 className="mt-8 text-xl font-semibold tracking-tight">What you would do</h2>
              <ul className="mt-3 space-y-2">
                {opportunity.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--color-brand)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-xl font-semibold tracking-tight">Skills required</h2>
              <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                Must-have skills are gated — the match score is penalised if one is missing,
                regardless of how strong everything else is.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {opportunity.skills.map((skill) => {
                  const hubSlug = skillSlugForName(skill.name)
                  const content = (
                    <>
                      {skill.name}
                      <span className="ml-1.5 font-mono text-[10px] opacity-70">
                        {skill.level}/5
                      </span>
                    </>
                  )
                  return (
                    <li key={skill.name}>
                      {hubSlug ? (
                        <Link href={`/skills/${hubSlug}`}>
                          <Badge variant={skill.mustHave ? 'warning' : 'outline'}>{content}</Badge>
                        </Link>
                      ) : (
                        <Badge variant={skill.mustHave ? 'warning' : 'outline'}>{content}</Badge>
                      )}
                    </li>
                  )
                })}
              </ul>

              <h2 className="mt-8 text-xl font-semibold tracking-tight">
                About {opportunity.company.name}
              </h2>
              <Prose className="mt-3">
                <p>{opportunity.company.about}</p>
              </Prose>

              <Alert tone="info" title="Every employer here is verified" className="mt-8">
                Company registration is checked before any listing goes live. No genuine opportunity
                will ever ask you to pay a fee — for a certificate, a deposit or anything else. If
                one does,{' '}
                <Link href="/contact" className="underline underline-offset-4">
                  report it
                </Link>
                .
              </Alert>
            </div>

            <aside className="space-y-5">
              <Card>
                <CardBody className="space-y-3 text-sm">
                  <div className="flex items-start gap-2.5">
                    <BriefcaseIcon
                      size={16}
                      className="mt-0.5 text-[color:var(--color-fg-subtle)]"
                    />
                    <div>
                      <p className="text-[color:var(--color-fg-muted)]">Compensation</p>
                      <p className="font-medium">{formatStipend(opportunity.stipend)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPinIcon size={16} className="mt-0.5 text-[color:var(--color-fg-subtle)]" />
                    <div>
                      <p className="text-[color:var(--color-fg-muted)]">Location</p>
                      <p className="font-medium">
                        {opportunity.location.city}, {opportunity.location.region}
                      </p>
                    </div>
                  </div>
                  {opportunity.durationWeeks ? (
                    <div className="flex items-start gap-2.5">
                      <ClockIcon size={16} className="mt-0.5 text-[color:var(--color-fg-subtle)]" />
                      <div>
                        <p className="text-[color:var(--color-fg-muted)]">Duration</p>
                        <p className="font-medium">{opportunity.durationWeeks} weeks</p>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-start gap-2.5">
                    <UsersIcon size={16} className="mt-0.5 text-[color:var(--color-fg-subtle)]" />
                    <div>
                      <p className="text-[color:var(--color-fg-muted)]">Openings</p>
                      <p className="font-medium">{opportunity.openings}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CalendarIcon
                      size={16}
                      className="mt-0.5 text-[color:var(--color-fg-subtle)]"
                    />
                    <div>
                      <p className="text-[color:var(--color-fg-muted)]">Apply by</p>
                      <p className="font-medium">{formatDate(opportunity.deadline)}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h2 className="text-sm font-semibold tracking-tight">Who can apply</h2>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-[color:var(--color-fg-muted)]">Programmes</dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        {opportunity.eligibility.programmes.map((programme) => (
                          <Badge key={programme} size="sm" variant="neutral">
                            {programme}
                          </Badge>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[color:var(--color-fg-muted)]">Year of study</dt>
                      <dd className="font-medium">{opportunity.eligibility.years.join(', ')}</dd>
                    </div>
                    {opportunity.eligibility.minCgpa ? (
                      <div>
                        <dt className="text-[color:var(--color-fg-muted)]">Minimum CGPA</dt>
                        <dd className="font-medium">{opportunity.eligibility.minCgpa}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <p className="mt-3 text-xs text-[color:var(--color-fg-subtle)]">
                    Eligibility is a hard gate in matching — it is met or it is not, never partially
                    weighted.
                  </p>
                </CardBody>
              </Card>

              {career ? (
                <Card>
                  <CardBody>
                    <h2 className="text-sm font-semibold tracking-tight">This leads to</h2>
                    <Link
                      href={`/careers/${career.slug}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-brand)] underline-offset-4 hover:underline"
                    >
                      {career.title} <ArrowRightIcon size={14} />
                    </Link>
                    <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
                      See the full skill map, salary band and entry routes for this path.
                    </p>
                  </CardBody>
                </Card>
              ) : null}

              <p className="text-xs text-[color:var(--color-fg-subtle)]">
                Posted {formatDate(opportunity.postedAt)}
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      {similar.length > 0 ? (
        <Section spacing="md">
          <Container>
            <h2 className="text-xl font-semibold tracking-tight">Similar opportunities</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {similar.map((other) => (
                <li key={other.slug}>
                  <Card interactive className="relative h-full">
                    <CardBody>
                      <Badge size="sm" variant="brand">
                        {typeLabels[other.type]}
                      </Badge>
                      <h3 className="mt-2 font-semibold tracking-tight">
                        <Link
                          href={`/opportunities/${other.slug}`}
                          className="after:absolute after:inset-0"
                        >
                          {other.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                        {other.company.name} · {other.location.city}
                      </p>
                    </CardBody>
                  </Card>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
