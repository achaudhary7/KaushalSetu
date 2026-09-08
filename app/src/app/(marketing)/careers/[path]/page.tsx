import type { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRightIcon, BookOpenIcon, ExternalLinkIcon, MapPinIcon } from '@/components/icons'
import { Container, Grid, PageHeader, Section } from '@/components/layout/container'
import { CtaBand, Prose } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Progress } from '@/components/ui/feedback'
import { careerPaths, formatSalaryBand, getCareerPath } from '@/content/careers'
import { opportunities } from '@/content/opportunities'
import { skillSlugForName } from '@/content/skills'
import { occupationJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * Career path detail.
 *
 * The highest-value organic surface on this site: almost no good content exists for
 * queries like "career options after BAMS" or "what does an Ayush regulatory affairs
 * executive do". See docs/SEO-CHECKLIST.md section 9.
 */

export function generateStaticParams() {
  return careerPaths.map((path) => ({ path: path.slug }))
}

export const dynamicParams = false

type Props = { params: Promise<{ path: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path: slug } = await params
  const career = getCareerPath(slug)
  if (!career)
    return buildMetadata({
      title: 'Career path',
      description: '',
      path: `/careers/${slug}`,
      index: false,
    })

  return buildMetadata({
    title: career.title,
    description: career.description,
    path: `/careers/${career.slug}`,
  })
}

export default async function CareerPathPage({ params }: Props) {
  const { path: slug } = await params
  const career = getCareerPath(slug)

  // dynamicParams = false means Next returns 404 for unknown slugs before we get here.
  if (!career) return null

  const related = opportunities.filter((o) => o.careerSlug === career.slug)

  return (
    <>
      <JsonLd
        data={occupationJsonLd({
          name: career.title,
          description: career.description,
          skills: career.skills.map((s) => s.skill),
          salary: { min: career.salary.min, max: career.salary.max },
        })}
      />

      <Section spacing="md">
        <Container>
          <PageHeader
            title={career.title}
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Careers', href: '/careers' },
              { label: career.title },
            ]}
            actions={
              <Button asChild>
                <Link href="/opportunities">
                  Find openings <ArrowRightIcon />
                </Link>
              </Button>
            }
          />

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="brand">{formatSalaryBand(career.salary.min, career.salary.max)}</Badge>
            <Badge variant={career.demand === 'steady' ? 'neutral' : 'success'}>
              {career.demand === 'growing'
                ? 'Growing demand'
                : career.demand === 'emerging'
                  ? 'Emerging field'
                  : 'Steady demand'}
            </Badge>
            {career.programmes.map((programme) => (
              <Badge key={programme} variant="outline">
                {programme}
              </Badge>
            ))}
          </div>

          <Prose className="mt-6 max-w-3xl">
            <p className="text-lg text-[color:var(--color-fg)]">{career.summary}</p>
          </Prose>
        </Container>
      </Section>

      <Section spacing="sm" surface="raised">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">What the work involves</h2>
              <ul className="mt-4 space-y-2">
                {career.dayToDay.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--color-brand)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-xl font-semibold tracking-tight">Skills it asks for</h2>
              <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                Required level on a 0–5 scale. Must-have skills are gated in matching — miss one and
                the score is penalised regardless of everything else.
              </p>
              <div className="mt-4 space-y-4">
                {career.skills.map((requirement) => {
                  const hubSlug = skillSlugForName(requirement.skill)
                  return (
                    <div key={requirement.skill}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-sm font-medium">
                          {hubSlug ? (
                            <Link
                              href={`/skills/${hubSlug}`}
                              className="underline-offset-4 hover:underline"
                            >
                              {requirement.skill}
                            </Link>
                          ) : (
                            requirement.skill
                          )}
                          {requirement.critical ? (
                            <Badge size="sm" variant="warning" className="ml-2">
                              Must-have
                            </Badge>
                          ) : null}
                        </p>
                        <span className="font-mono text-xs text-[color:var(--color-fg-subtle)] tabular-nums">
                          Level {requirement.level}/5
                        </span>
                      </div>
                      <Progress
                        value={requirement.level}
                        max={5}
                        tone={requirement.critical ? 'accent' : 'brand'}
                        className="mt-1.5"
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <aside className="space-y-5">
              <Card>
                <CardBody>
                  <h2 className="text-sm font-semibold tracking-tight">How people get in</h2>
                  <ul className="mt-3 space-y-2 text-sm text-[color:var(--color-fg-muted)]">
                    {career.entryRoutes.map((route) => (
                      <li key={route}>{route}</li>
                    ))}
                  </ul>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h2 className="text-sm font-semibold tracking-tight">Salary band</h2>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">
                    {formatSalaryBand(career.salary.min, career.salary.max)}
                  </p>
                  <p className="mt-1.5 text-sm text-[color:var(--color-fg-muted)]">
                    {career.salary.note}
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <MapPinIcon size={15} /> Where the work is
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {career.regions.map((region) => (
                      <Badge key={region} size="sm" variant="neutral">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <BookOpenIcon /> Close the gap, free
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[color:var(--color-fg-muted)]">
            Government platforms, no fees. We link to them; we do not host or resell courses.
          </p>
          <Grid cols={2} className="mt-5">
            {career.learning.map((course) => (
              <Card key={course.url} interactive className="relative">
                <CardBody className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0"
                      >
                        {course.title}
                      </a>
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                      {course.provider} · Free
                    </p>
                  </div>
                  <ExternalLinkIcon
                    size={16}
                    className="mt-1 shrink-0 text-[color:var(--color-fg-subtle)]"
                  />
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section spacing="md" surface="sunken">
          <Container>
            <h2 className="text-xl font-semibold tracking-tight">Open roles on this path</h2>
            <Grid cols={3} className="mt-5">
              {related.map((opportunity) => (
                <Card key={opportunity.slug} interactive className="relative">
                  <CardBody>
                    <p className="text-xs text-[color:var(--color-fg-subtle)]">
                      {opportunity.company.name}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight">
                      <Link
                        href={`/opportunities/${opportunity.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {opportunity.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm text-[color:var(--color-fg-muted)]">
                      {opportunity.location.city} · {opportunity.location.region}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title={`Ready to work toward ${career.title.toLowerCase()}?`}
        description="Browse verified openings, or see the full skill breakdown for each requirement."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'All career paths', href: '/careers' }}
      />
    </>
  )
}
