import type { Metadata } from 'next'
import Link from 'next/link'

import { Container, Grid, Section } from '@/components/layout/container'
import { CtaBand, Hero } from '@/components/marketing/sections'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { getSkillHubs } from '@/content/skills'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Skills and free courses',
  description:
    'Every skill on the platform: what it is, which careers need it and at what level, and the free SWAYAM and NPTEL courses that teach it.',
  path: '/skills',
})

const typeLabel = {
  DOMAIN: 'Domain',
  TECHNICAL: 'Technical',
  SOFT: 'Soft skill',
  TOOL: 'Tool',
} as const

export default function SkillsPage() {
  const hubs = getSkillHubs()

  return (
    <>
      <Hero
        eyebrow="Skill hubs"
        title="Every skill, and who is actually asking for it."
        description="Ordered by how much demand each skill carries across the career paths on this platform. Each one links to the careers that need it and the free courses that teach it."
        primaryCta={{ label: 'Explore career paths', href: '/careers' }}
        secondaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
      />

      <Section surface="raised">
        <Container>
          <Grid cols={2}>
            {hubs.map((hub) => (
              <Card key={hub.slug} interactive className="relative">
                <CardBody>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge size="sm" variant="brand">
                      {typeLabel[hub.type]}
                    </Badge>
                    <Badge size="sm" variant="outline">
                      {hub.category}
                    </Badge>
                    {hub.careers.some((c) => c.critical) ? (
                      <Badge size="sm" variant="warning">
                        Must-have somewhere
                      </Badge>
                    ) : null}
                  </div>

                  <h2 className="mt-3 font-semibold tracking-tight">
                    <Link href={`/skills/${hub.slug}`} className="after:absolute after:inset-0">
                      {hub.name}
                    </Link>
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                    {hub.description}
                  </p>
                  <p className="mt-3 text-xs text-[color:var(--color-fg-subtle)]">
                    Needed by {hub.careers.length}{' '}
                    {hub.careers.length === 1 ? 'career path' : 'career paths'} ·{' '}
                    {hub.howToLearn.length} free{' '}
                    {hub.howToLearn.length === 1 ? 'course' : 'courses'}
                  </p>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <CtaBand
        title="Which of these are you missing?"
        description="The assessment tells you, and ranks the gaps by how much each one actually costs you."
        primaryCta={{ label: 'See career paths', href: '/careers' }}
        secondaryCta={{ label: 'How it works', href: '/how-it-works' }}
      />
    </>
  )
}
