import type { Metadata } from 'next'
import Link from 'next/link'

import { Container, Section } from '@/components/layout/container'
import { CheckList, CtaBand, Hero, Prose } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { Card, CardBody } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { organizationJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Why KaushalSetu exists, what problem it solves, and what is honestly built versus planned. Created for Smart India Hackathon problem statement 26044.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <Hero
        eyebrow="About"
        title="A skills gap is usually an information gap."
        description="Students do not lack ability. They lack a reliable answer to a simple question: which specific skills does the work I want actually require, and which of them am I missing?"
      />

      <Section spacing="sm">
        <Container width="prose">
          <Prose>
            <h2>The problem we were given</h2>
            <p>
              KaushalSetu was built for{' '}
              <strong>
                Smart India Hackathon problem statement {siteConfig.context.problemStatementId}
              </strong>{' '}
              — a portal for academia–industry collaboration covering skill mapping, internships and
              placement, from the {siteConfig.context.ministry}.
            </p>
            <p>
              The statement asks for three lifecycles on one platform: skill development,
              internships, and placement — with role-based access for students, industry,
              academicians and institutions.
            </p>

            <h2>What the statement leaves out</h2>
            <p>
              Reading it closely, three things are missing, and each one is the difference between a
              useful platform and a directory.
            </p>
            <p>
              <strong>Every skill is self-declared.</strong> The statement says &ldquo;verified
              skills&rdquo; repeatedly and never defines verification. So we did: three tiers, each
              visually distinct, filterable by recruiters, and weighted in the match score — so
              verification is worth earning rather than decorative.
            </p>
            <p>
              <strong>Nothing feeds demand back to curriculum.</strong> The entire premise is a gap
              between what institutions teach and what industry needs, yet no information flows back
              to the people who set the syllabus. Our reverse skill-gap report closes that loop, and
              folds in the reasons students were actually rejected.
            </p>
            <p>
              <strong>Success stops at &ldquo;placed&rdquo;.</strong> Nobody asks whether the
              placement lasted or was relevant. We ask, at six and twelve months.
            </p>

            <h2>Why it is Ayush-aware</h2>
            <p>
              The problem statement is written generically and never mentions Ayush — but it comes
              from the Ministry of Ayush, almost certainly the All India Institute of Ayurveda. So
              we built the general platform and made the domain layer specific: career paths for
              BAMS, BHMS and BUMS graduates, a skill taxonomy aligned to the NCISM curriculum, and
              internship categories covering Ayush hospitals, dispensaries and pharmaceutical units.
            </p>
            <p>
              Because the taxonomy is data rather than code, none of that costs generality. The same
              platform serves an engineering college with a different seed and no code change.
            </p>
          </Prose>
        </Container>
      </Section>

      <CheckList
        surface="raised"
        title="How we decided what to build"
        description="A few principles that shaped every technical decision, all recorded as decision records in the repository."
        items={[
          'Explainable over impressive — the matching engine is arithmetic you can inspect, not a model you must trust',
          'Verified over claimed — evidence beats assertion, and the system rewards it in the score',
          'Free over affordable — every recommended course is on SWAYAM or NPTEL, because a student in debt is not helped by a discount',
          'Honest over polished — the features page marks what is built and what is not, and we say what is mocked',
          'Server-rendered over clever — public pages work with JavaScript disabled, which is also what makes them findable',
        ]}
      />

      <Section>
        <Container width="prose">
          <h2 className="text-2xl font-semibold tracking-tight">Where this is up to</h2>
          <Prose className="mt-3">
            <p>
              This platform is being built in the open, in sixteen numbered phases. The plan, the
              progress board, the decision records and a per-phase summary of what was actually done
              all live in the repository — including the things that failed and had to be fixed.
            </p>
          </Prose>
          <Card className="mt-5">
            <CardBody>
              <p className="text-sm font-medium">Repository</p>
              <a
                href="https://github.com/achaudhary7/KaushalSetu"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-[color:var(--color-brand)] underline underline-offset-4"
              >
                github.com/achaudhary7/KaushalSetu
              </a>
              <p className="mt-3 text-sm text-[color:var(--color-fg-muted)]">
                See{' '}
                <Link href="/features" className="underline underline-offset-4">
                  Features
                </Link>{' '}
                for what is live today versus planned.
              </p>
            </CardBody>
          </Card>
        </Container>
      </Section>

      <CtaBand
        title="Questions, or want to pilot this at your institution?"
        primaryCta={{ label: 'Get in touch', href: '/contact' }}
        secondaryCta={{ label: 'Read the FAQ', href: '/faq' }}
      />
    </>
  )
}
