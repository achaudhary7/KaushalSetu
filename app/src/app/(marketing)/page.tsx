import type { Metadata } from 'next'
import Link from 'next/link'

import {
  ArrowRightIcon,
  BadgeCheckIcon,
  GraduationCapIcon,
  QrCodeIcon,
  TrendingUpIcon,
} from '@/components/icons'
import { BridgeScene, GridPattern } from '@/components/illustrations'
import { Container, Grid, Section } from '@/components/layout/container'
import { Badge, SkillBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * Interim home page.
 *
 * Phase 1 gives it the design system; Phase 2 replaces it with the full marketing home
 * page, its structured data and its generated OG image. Kept deliberately short until then.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Academia-Industry Portal for Skills, Internships & Placements',
  description:
    'KaushalSetu connects students, industry, academicians and institutions — skill assessment, verified digital portfolios, matched internships and placements, and the curriculum feedback loop that closes the skills gap.',
  path: '/',
})

const differentiators = [
  {
    icon: BadgeCheckIcon,
    title: 'Skills that are actually verified',
    body: 'Three tiers — self-declared, assessment-verified, employer-endorsed. Recruiters filter to verified only, and verified skills score higher in matching. The tiers do real work.',
  },
  {
    icon: QrCodeIcon,
    title: 'Certificates nobody can fake',
    body: 'Companies issue internship certificates through the portal. Each carries a QR that resolves to a public verification page. A recruiter checks it in five seconds.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Demand fed back to curriculum',
    body: 'Aggregate what employers ask for, compare it to what the syllabus covers, and hand the institution a termly report on the gap. Including why students were actually rejected.',
  },
  {
    icon: GraduationCapIcon,
    title: 'Outcomes, not just placements',
    body: 'Six- and twelve-month follow-ups: still employed, role relevant, satisfied. "We placed 200 students" becomes "84% were still in a relevant role a year later."',
  },
]

export default function HomePage() {
  return (
    <>
      <Section spacing="lg" className="relative overflow-hidden">
        <GridPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-40" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="brand">
                SIH {siteConfig.context.problemStatementId} · {siteConfig.context.ministry}
              </Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                The bridge from campus to career.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color:var(--color-fg-muted)]">
                Students find out which skills they actually have, which ones industry actually
                wants, and exactly how to close the distance. Industry finds candidates it can
                verify. Institutions find out what to teach next.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/style-guide">
                    See the design system <ArrowRightIcon />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href="https://github.com/achaudhary7/KaushalSetu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the plan
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[color:var(--color-fg-subtle)]">
                  Skills carry their evidence:
                </span>
                <SkillBadge skill="Panchakarma" tier="SELF_DECLARED" />
                <SkillBadge skill="Dravyaguna" tier="ASSESSMENT_VERIFIED" />
                <SkillBadge
                  skill="GMP documentation"
                  tier="EMPLOYER_ENDORSED"
                  endorsedBy="Himalaya Wellness"
                />
              </div>
            </div>

            <div className="lg:pl-8">
              <BridgeScene title="Students crossing from academia to industry" />
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="raised">
        <Container>
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Most placement portals stop at a job board. This one closes the loop.
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--color-fg-muted)]">
            The problem statement asks for skill mapping, internships and placements. It leaves
            three gaps. We built for all three.
          </p>

          <Grid cols={2} className="mt-8">
            {differentiators.map(({ icon: Icon, title, body }) => (
              <Card key={title}>
                <CardBody>
                  <span className="inline-grid size-10 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                    <Icon />
                  </span>
                  <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                    {body}
                  </p>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <Card variant="flat">
            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Phase 1 of 16 complete — the design system is live.</p>
                <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                  The full marketing site, its structured data and the public opportunity search
                  arrive in Phase 2.
                </p>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/style-guide">
                  Open the style guide <ArrowRightIcon />
                </Link>
              </Button>
            </CardBody>
          </Card>
        </Container>
      </Section>
    </>
  )
}
