import type { Metadata } from 'next'
import Link from 'next/link'

import { MapPinIcon } from '@/components/icons'
import { Container, Grid, Section } from '@/components/layout/container'
import { CtaBand, Hero } from '@/components/marketing/sections'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { careerPaths, formatSalaryBand } from '@/content/careers'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Career paths for Indian graduates',
  description:
    'Eleven career paths with the skills each needs, realistic salary bands, entry routes and free courses. Ayush, technology and management.',
  path: '/careers',
})

const demandLabel = {
  growing: { text: 'Growing', variant: 'success' as const },
  steady: { text: 'Steady', variant: 'neutral' as const },
  emerging: { text: 'Emerging', variant: 'info' as const },
}

const domainLabel = {
  ayush: 'Ayush',
  technology: 'Technology',
  business: 'Business',
}

export default function CareersPage() {
  const byDomain = (['ayush', 'technology', 'business'] as const).map((domain) => ({
    domain,
    paths: careerPaths.filter((path) => path.domain === domain),
  }))

  return (
    <>
      <Hero
        eyebrow="Career explorer"
        title="Where does this degree actually lead?"
        description="Not a list of job titles. For each path: the skills it genuinely asks for and at what level, a realistic salary band, how people get in, and free courses that close the gap."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'Explore skills', href: '/skills' }}
      />

      {byDomain.map(({ domain, paths }) => (
        <Section key={domain} surface={domain === 'ayush' ? 'raised' : undefined} spacing="md">
          <Container>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight">{domainLabel[domain]}</h2>
              <span className="text-sm text-[color:var(--color-fg-subtle)]">
                {paths.length} {paths.length === 1 ? 'path' : 'paths'}
              </span>
            </div>
            {domain === 'ayush' ? (
              <p className="mt-1 max-w-2xl text-sm text-[color:var(--color-fg-muted)]">
                Built out first and in most depth, because almost no good content exists for what an
                Ayush graduate can do beyond clinical practice.
              </p>
            ) : null}
            {domain === 'technology' || domain === 'business' ? (
              <p className="mt-1 max-w-2xl text-sm text-[color:var(--color-fg-muted)]">
                Included to make the point that the taxonomy is data, not code — the same platform
                serves any institution.
              </p>
            ) : null}

            <Grid cols={3} className="mt-6">
              {paths.map((path) => (
                <Card key={path.slug} interactive className="relative">
                  <CardBody>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge size="sm" variant={demandLabel[path.demand].variant}>
                        {demandLabel[path.demand].text}
                      </Badge>
                      <Badge size="sm" variant="outline">
                        {formatSalaryBand(path.salary.min, path.salary.max)}
                      </Badge>
                    </div>
                    <h3 className="mt-3 font-semibold tracking-tight">
                      <Link href={`/careers/${path.slug}`} className="after:absolute after:inset-0">
                        {path.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                      {path.summary}
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-[color:var(--color-fg-subtle)]">
                      <MapPinIcon size={13} />
                      {path.regions.slice(0, 3).join(' · ')}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      ))}

      <CtaBand
        title="Know the path. Now find the gap."
        description="Each career page names the two or three skills standing between you and it."
        primaryCta={{ label: 'Explore skills', href: '/skills' }}
        secondaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
      />
    </>
  )
}
