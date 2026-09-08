import type { Metadata } from 'next'
import Link from 'next/link'

import { ClockIcon } from '@/components/icons'
import { Container, Grid, Section } from '@/components/layout/container'
import { CtaBand, Hero } from '@/components/marketing/sections'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { articles } from '@/content/resources'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Insights — careers, internships and skills',
  description:
    'Practical guides on Ayush careers, spotting fake internship offers, free courses that employers value, and building a portfolio before final year.',
  path: '/resources',
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function ResourcesPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <>
      <Hero
        eyebrow="Insights"
        title="Things worth knowing before placement season."
        description="Written for students who are trying to work out what to do next, not for a search engine. If a guide here does not change what you would actually do, it should not exist."
        primaryCta={{ label: 'Explore career paths', href: '/careers' }}
        secondaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
      />

      <Section surface="raised">
        <Container>
          <Grid cols={2}>
            {sorted.map((article) => (
              <Card key={article.slug} interactive className="relative">
                <CardBody>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <Badge key={tag} size="sm" variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight">
                    <Link
                      href={`/resources/${article.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                    {article.description}
                  </p>
                  <p className="mt-3 flex items-center gap-3 text-xs text-[color:var(--color-fg-subtle)]">
                    <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon size={12} /> {article.readingMinutes} min read
                    </span>
                  </p>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <CtaBand
        title="Or skip straight to the data."
        description="Eleven career paths with the skills, salary bands and free courses for each."
        primaryCta={{ label: 'Career explorer', href: '/careers' }}
        secondaryCta={{ label: 'Skill hubs', href: '/skills' }}
      />
    </>
  )
}
