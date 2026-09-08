import type { Metadata } from 'next'
import Link from 'next/link'

import { ExternalLinkIcon } from '@/components/icons'
import { Container, Grid, PageHeader, Section } from '@/components/layout/container'
import { CtaBand, Prose } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { Progress } from '@/components/ui/feedback'
import { formatSalaryBand } from '@/content/careers'
import { getSkillHub, skillDefinitions } from '@/content/skills'
import { courseJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateStaticParams() {
  return skillDefinitions.map((skill) => ({ slug: skill.slug }))
}

export const dynamicParams = false

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const hub = getSkillHub(slug)
  if (!hub)
    return buildMetadata({ title: 'Skill', description: '', path: `/skills/${slug}`, index: false })

  return buildMetadata({
    title: hub.name.length > 55 ? hub.name.slice(0, 52).trimEnd() + '…' : hub.name,
    description: hub.description,
    path: `/skills/${hub.slug}`,
  })
}

const typeLabel = {
  DOMAIN: 'Domain knowledge',
  TECHNICAL: 'Technical skill',
  SOFT: 'Soft skill',
  TOOL: 'Tool',
} as const

export default async function SkillPage({ params }: Props) {
  const { slug } = await params
  const hub = getSkillHub(slug)
  if (!hub) return null

  return (
    <>
      <JsonLd
        data={hub.howToLearn.map((course) =>
          courseJsonLd({
            name: course.title,
            description: `${course.title} — a free course covering ${hub.name}.`,
            provider: course.provider,
            url: course.url,
            free: course.free,
          }),
        )}
      />

      <Section spacing="md">
        <Container>
          <PageHeader
            title={hub.name}
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Skills', href: '/skills' },
              { label: hub.name },
            ]}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="brand">{typeLabel[hub.type]}</Badge>
            <Badge variant="outline">{hub.category}</Badge>
            <Badge variant="neutral">
              Needed by {hub.careers.length}{' '}
              {hub.careers.length === 1 ? 'career path' : 'career paths'}
            </Badge>
          </div>
        </Container>
      </Section>

      <Section spacing="sm" surface="raised">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">What it is</h2>
              <Prose className="mt-3">
                <p>{hub.whatItIs}</p>
              </Prose>

              <h2 className="mt-8 text-xl font-semibold tracking-tight">Why it matters</h2>
              <Prose className="mt-3">
                <p>{hub.whyItMatters}</p>
              </Prose>

              <h2 className="mt-8 text-xl font-semibold tracking-tight">Where to learn it, free</h2>
              <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                Government platforms. No fees, no upsell, and we earn nothing from these links.
              </p>
              <div className="mt-4 space-y-3">
                {hub.howToLearn.map((course) => (
                  <Card key={course.url} interactive className="relative">
                    <CardBody className="flex items-start justify-between gap-3 p-4">
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
                        <p className="mt-0.5 text-sm text-[color:var(--color-fg-muted)]">
                          {course.provider}
                          {course.free ? ' · Free' : ''}
                        </p>
                      </div>
                      <ExternalLinkIcon
                        size={16}
                        className="mt-1 shrink-0 text-[color:var(--color-fg-subtle)]"
                      />
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>

            <aside>
              <h2 className="text-sm font-semibold tracking-tight">Who wants it</h2>
              <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                Sorted by how much weight each path puts on it.
              </p>
              <div className="mt-4 space-y-4">
                {hub.careers.map((entry) => (
                  <Card key={entry.path.slug}>
                    <CardBody className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/careers/${entry.path.slug}`}
                          className="text-sm font-medium underline-offset-4 hover:underline"
                        >
                          {entry.path.title}
                        </Link>
                        {entry.critical ? (
                          <Badge size="sm" variant="warning">
                            Must-have
                          </Badge>
                        ) : null}
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <Progress
                          value={entry.level}
                          max={5}
                          tone={entry.critical ? 'accent' : 'brand'}
                          className="flex-1"
                        />
                        <span className="font-mono text-xs text-[color:var(--color-fg-subtle)] tabular-nums">
                          {entry.level}/5
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[color:var(--color-fg-subtle)]">
                        {formatSalaryBand(entry.path.salary.min, entry.path.salary.max)}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <h2 className="text-lg font-semibold tracking-tight">Other skills</h2>
          <Grid cols={4} className="mt-4">
            {skillDefinitions
              .filter((skill) => skill.slug !== hub.slug)
              .slice(0, 8)
              .map((skill) => (
                <Card key={skill.slug} interactive className="relative">
                  <CardBody className="p-4">
                    <p className="text-sm font-medium">
                      <Link href={`/skills/${skill.slug}`} className="after:absolute after:inset-0">
                        {skill.name}
                      </Link>
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--color-fg-subtle)]">
                      {skill.category}
                    </p>
                  </CardBody>
                </Card>
              ))}
          </Grid>
        </Container>
      </Section>

      <CtaBand
        title="Do you have this skill, or do you think you do?"
        description="An assessment turns a self-declared skill into a verified one — and verified skills score higher in matching."
        primaryCta={{ label: 'How assessment works', href: '/how-it-works' }}
        secondaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
      />
    </>
  )
}
