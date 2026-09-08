import type { Metadata } from 'next'
import Link from 'next/link'

import { CheckIcon, CloseIcon } from '@/components/icons'
import { Container, Grid, Section } from '@/components/layout/container'
import { CtaBand, Hero } from '@/components/marketing/sections'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Callout } from '@/components/ui/feedback'
import { InfoIcon } from '@/components/icons'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils/cn'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Free for students, academicians and institutions — permanently. Employers post a limited number of internships free, with paid tiers for volume hiring and analytics.',
  path: '/pricing',
})

interface Plan {
  name: string
  audience: string
  price: string
  period?: string
  description: string
  featured?: boolean
  includes: string[]
  excludes?: string[]
  cta: { label: string; href: string }
}

const plans: Plan[] = [
  {
    name: 'Students & faculty',
    audience: 'Students, academicians',
    price: 'Free',
    description:
      'Permanently, and not as a trial. A platform that charges the people it is meant to help has misunderstood the problem.',
    includes: [
      'Skill assessment and profile',
      'Career path and role recommendations',
      'Free SWAYAM and NPTEL learning paths',
      'Digital portfolio with verified skills',
      'Unlimited applications',
      'QR-verifiable certificates',
      'ATS-readable resume generation',
      'Mentorship and alumni matching',
      'Faculty: FDPs, internships, consultancy and research',
    ],
    cta: { label: 'Browse opportunities', href: '/opportunities' },
  },
  {
    name: 'Institutions',
    audience: 'Colleges, universities',
    price: 'Free',
    description:
      'Including the analytics. The reverse skill-gap report is more useful to everyone if the institutions who need it most are not the ones who cannot afford it.',
    featured: true,
    includes: [
      'Everything in the student plan for all your students',
      'Placement readiness funnel and cohort analytics',
      'Skill development tracking over time',
      'Reverse skill-gap report, termly',
      'Anonymised rejection reason analysis',
      '6 and 12-month outcome tracking',
      'Faculty engagement and approval workflow',
      'CSV and PDF export throughout',
      'CSV student import',
    ],
    cta: { label: 'Talk to us', href: '/contact' },
  },
  {
    name: 'Employers',
    audience: 'Companies hiring',
    price: 'Free to start',
    period: 'paid tiers for volume',
    description:
      'Post a limited number of internships and micro-internships free. Paid tiers cover volume hiring, the full ATS and analytics.',
    includes: [
      'Employer verification and verified badge',
      'Up to 3 active internship or micro-internship listings',
      'Skill-based candidate matching',
      'Blind first-pass shortlisting',
      'Issue QR-verifiable certificates',
      'Skill endorsements',
    ],
    excludes: [
      'Unlimited job postings',
      'Full applicant tracking board',
      'Pipeline and skill-supply analytics',
      'Bulk CSV posting',
      'Priority placement in search',
    ],
    cta: { label: 'Get in touch', href: '/contact' },
  },
]

export default function PricingPage() {
  return (
    <>
      <Hero
        eyebrow="Pricing"
        title="Free for the people who need it most."
        description="Students, faculty and institutions never pay. Employers fund the platform, because employers are the ones getting hiring value from it."
      />

      <Section spacing="sm">
        <Container>
          <Callout icon={<InfoIcon />} title="No payment processing yet">
            This page describes the intended model. There is no gateway and nothing is being charged
            — paid tiers are post-hackathon work, and it would be dishonest to imply otherwise.
          </Callout>
        </Container>
      </Section>

      <Section spacing="md" surface="raised">
        <Container>
          <Grid cols={3}>
            {plans.map((plan) => (
              <Card
                key={plan.name}
                variant={plan.featured ? 'raised' : 'bordered'}
                className={cn(plan.featured && 'ring-2 ring-[color:var(--color-brand)]')}
              >
                <CardBody className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold tracking-tight">{plan.name}</h2>
                    {plan.featured ? <Badge variant="brand">Most complete</Badge> : null}
                  </div>
                  <p className="mt-0.5 text-xs text-[color:var(--color-fg-subtle)]">
                    {plan.audience}
                  </p>

                  <p className="mt-4 text-3xl font-semibold tracking-tight">{plan.price}</p>
                  {plan.period ? (
                    <p className="text-sm text-[color:var(--color-fg-muted)]">{plan.period}</p>
                  ) : null}

                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                    {plan.description}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm">
                        <CheckIcon
                          size={16}
                          className="mt-0.5 shrink-0 text-[color:var(--color-tier-endorsed)]"
                        />
                        {item}
                      </li>
                    ))}
                    {plan.excludes?.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-[color:var(--color-fg-subtle)]"
                      >
                        <CloseIcon size={16} className="mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-6"
                    variant={plan.featured ? 'primary' : 'outline'}
                    block
                    asChild
                  >
                    <Link href={plan.cta.href}>{plan.cta.label}</Link>
                  </Button>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <CtaBand
        title="Want to pilot this at your institution?"
        description="Institutions use everything free. We will walk you through the dashboards with your own programmes."
        primaryCta={{ label: 'Talk to us', href: '/contact' }}
        secondaryCta={{ label: 'See all features', href: '/features' }}
      />
    </>
  )
}
