import type { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRightIcon, MapPinIcon, TrendingUpIcon } from '@/components/icons'
import { Container, Grid, Section } from '@/components/layout/container'
import { CheckList, CtaBand, Hero, Prose } from '@/components/marketing/sections'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { careerPaths, formatSalaryBand } from '@/content/careers'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Ayush careers for BAMS, BHMS & BUMS',
  description:
    'Eight career paths beyond clinical practice: GMP manufacturing, regulatory affairs, clinical research, medical writing and Ayush informatics.',
  path: '/ayush',
})

const ayushPaths = careerPaths.filter((path) => path.domain === 'ayush')

const demandLabel = {
  growing: { text: 'Growing demand', variant: 'success' as const },
  steady: { text: 'Steady demand', variant: 'neutral' as const },
  emerging: { text: 'Emerging field', variant: 'info' as const },
}

export default function AyushPage() {
  return (
    <>
      <Hero
        eyebrow="Built for the Ayush workforce"
        title="An Ayush degree opens more doors than you were told about."
        description="Ayush manufacturing units are legally required to employ qualified Ayush personnel. Clinical research needs people who understand both the classical framework and trial methodology. Regulatory teams need someone who can read a classical text and the Drugs & Cosmetics Act. Almost none of this comes up during the degree."
        primaryCta={{ label: 'Browse Ayush opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'All career paths', href: '/careers' }}
      />

      <Section spacing="sm">
        <Container width="prose">
          <Prose>
            <p>
              This platform was built for Smart India Hackathon problem statement 26044, which asks
              for an academia–industry portal for skill mapping, internships and placement. The
              statement is written generically and never mentions Ayush — but it comes from the
              Ministry of Ayush.
            </p>
            <p>
              So we built the general platform and made the domain layer Ayush-aware. The skill
              taxonomy is aligned to the <strong>NCISM curriculum</strong> rather than a generic IT
              skills list. Internship categories cover Ayush hospitals, dispensaries and
              pharmaceutical units. The career paths below are the ones an Ayush graduate can
              actually reach.
            </p>
            <p>
              The taxonomy is data, not code — so the same platform serves an engineering college
              without a line changing. Being specific about Ayush costs nothing in generality.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section surface="raised">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Eight paths for Ayush graduates
          </h2>
          <p className="mt-2 max-w-2xl text-[color:var(--color-fg-muted)]">
            Each one with the skills it actually asks for, realistic salary bands, entry routes, and
            free courses that close the gap.
          </p>

          <Grid cols={2} className="mt-8">
            {ayushPaths.map((path) => (
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
                  <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[color:var(--color-fg-subtle)]">
                    <MapPinIcon size={13} />
                    {path.regions.slice(0, 3).join(' · ')}
                  </p>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <CheckList
        title="Why the competition is thin"
        description="Not because the jobs are scarce. Because the information is."
        items={[
          'Manufacturing units must employ qualified Ayush personnel by law — and most graduates have never considered it',
          'Regulatory affairs is taught in almost no Ayush curriculum, yet every product needs it',
          'Ayush is under sustained pressure to produce clinical evidence, and evidence needs trained methodologists',
          'Digital health infrastructure is being extended to Ayush, and it needs clinicians who understand data',
          'Each path asks for only two or three specific skills your degree touches lightly — all learnable free',
        ]}
      />

      <Section surface="sunken">
        <Container>
          <div className="flex items-start gap-3">
            <TrendingUpIcon className="mt-1 shrink-0 text-[color:var(--color-tier-endorsed)]" />
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Where Ayush employers actually are
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[color:var(--color-fg-muted)]">
                Manufacturing clusters in Gujarat, Uttarakhand and Madhya Pradesh. Wellness and
                medical tourism in Kerala, Goa and Himachal. Clinical research and regulatory work
                in Delhi NCR and Maharashtra. Remote work in medical writing and pharmacovigilance
                from anywhere. Once the regional demand map lands, you will be able to see this by
                district rather than chase the same three cities as everyone else.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="See what Ayush employers are hiring for right now."
        description="Verified employers only — GMP manufacturers, hospitals, wellness centres and research organisations."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{
          label: 'Read the BAMS career guide',
          href: '/resources/what-can-you-do-with-a-bams-degree',
        }}
      />

      <Section spacing="sm">
        <Container>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand)] underline-offset-4 hover:underline"
          >
            See all career paths, including engineering and management <ArrowRightIcon size={16} />
          </Link>
        </Container>
      </Section>
    </>
  )
}
