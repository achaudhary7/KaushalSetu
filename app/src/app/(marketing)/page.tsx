import type { Metadata } from 'next'
import Link from 'next/link'

import {
  BadgeCheckIcon,
  BriefcaseIcon,
  BuildingIcon,
  GraduationCapIcon,
  HandshakeIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
} from '@/components/icons'
import { BridgeScene } from '@/components/illustrations'
import { Container, Section } from '@/components/layout/container'
import {
  CheckList,
  CtaBand,
  FaqSection,
  FeatureGrid,
  Hero,
  StepList,
} from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { SkillBadge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { generalFaqs } from '@/content/faqs'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Skills, Internships & Placements',
  description:
    'Assess your skills, see which ones industry actually wants, and close the gap with free courses. Verified portfolios and matched internships.',
  path: '/',
})

const audiences = [
  {
    icon: GraduationCapIcon,
    title: 'For students',
    body: 'Find out what you actually know, what industry wants, and the shortest free route between the two.',
    href: '/for-students',
  },
  {
    icon: BriefcaseIcon,
    title: 'For industry',
    body: 'Post roles, screen on verified evidence rather than college name, and issue certificates nobody can fake.',
    href: '/for-industry',
  },
  {
    icon: BuildingIcon,
    title: 'For institutions',
    body: 'See placement readiness, the gap between your syllabus and employer demand, and what happened a year later.',
    href: '/for-institutions',
  },
  {
    icon: UsersIcon,
    title: 'For academicians',
    body: 'Faculty internships, FDPs, consultancy and research collaboration — the half of academia-industry everyone forgets.',
    href: '/for-academicians',
  },
]

const differentiators = [
  {
    icon: BadgeCheckIcon,
    title: 'Skills that are actually verified',
    body: 'Three tiers — self-declared, assessment-verified, employer-endorsed. Recruiters filter to verified only, and verified skills score higher in matching. The tiers do real work.',
  },
  {
    icon: QrCodeIcon,
    title: 'Certificates nobody can fake',
    body: 'Companies issue internship certificates through the portal. Each carries a QR resolving to a public verification page. A recruiter checks it in five seconds, with no account.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Demand fed back to curriculum',
    body: 'Aggregate what employers ask for, compare it to what the syllabus covers, and hand the institution a termly report on the gap — including why students were actually rejected.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Employers verified before they post',
    body: 'Company registration is checked before any listing goes live, and students can report anything suspicious. Fake internship scams do not survive this.',
  },
  {
    icon: HandshakeIcon,
    title: 'Blind first-pass screening',
    body: 'Name, gender and college hidden until skills have been assessed. Enforced on the server, not hidden in the page — so it is real, and a company can prove it screened blind.',
  },
  {
    icon: SparklesIcon,
    title: 'Explainable matching, no black box',
    body: 'Every match score opens to show which skills contributed what. It is arithmetic, not a model — reproducible, inspectable, and it costs nothing to run.',
  },
]

const steps = [
  {
    name: 'Assess',
    text: 'Complete a questionnaire built from criteria industry supplied. You get a skill profile with proficiency per skill, your strengths, and your gaps ranked by how much they actually matter.',
  },
  {
    name: 'Map',
    text: 'See the career paths your profile fits, the roles you are close to, and exactly which two or three skills stand between you and each one.',
  },
  {
    name: 'Close the gap',
    text: 'Every gap maps to specific free courses on SWAYAM and NPTEL. Government platforms, no fees, ordered by prerequisite.',
  },
  {
    name: 'Prove it',
    text: 'Assessments promote skills to verified. Employers endorse them after real work. Your portfolio carries the evidence, not just the claim.',
  },
  {
    name: 'Apply',
    text: 'Get matched to internships, micro-internships and jobs from verified employers, then track every application through one pipeline.',
  },
  {
    name: 'Follow through',
    text: 'Completion certificates are QR-verifiable. Six and twelve months on, we ask whether the role lasted and whether it was relevant.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

      <Hero
        eyebrow="Built for SIH 26044 · Ministry of Ayush"
        title="The bridge from campus to career."
        description="Students find out which skills they actually have, which ones industry actually wants, and exactly how to close the distance — free. Industry finds candidates it can verify. Institutions find out what to teach next."
        primaryCta={{ label: 'Explore opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'See how it works', href: '/how-it-works' }}
        illustration={<BridgeScene title="Students crossing from academia to industry" />}
      >
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[color:var(--color-fg-subtle)]">
            Every skill carries its evidence:
          </span>
          <SkillBadge skill="Panchakarma" tier="SELF_DECLARED" />
          <SkillBadge skill="Dravyaguna" tier="ASSESSMENT_VERIFIED" />
          <SkillBadge
            skill="GMP documentation"
            tier="EMPLOYER_ENDORSED"
            endorsedBy="Himalaya Wellness"
          />
        </div>
      </Hero>

      <FeatureGrid
        eyebrow="One platform, four roles"
        title="Everyone in the loop, on the same data"
        description="The skills gap persists because students, industry and institutions each see only their own side of it. This is the shared view."
        features={audiences}
        cols={4}
        surface="raised"
      />

      <StepList
        eyebrow="How it works"
        title="Assess, map, close the gap, prove it"
        description="Six steps, and the platform stays with you through all of them rather than stopping at the job listing."
        steps={steps}
      />

      <FeatureGrid
        eyebrow="What makes this different"
        title="Most placement portals stop at a job board"
        description="The problem statement asks for skill mapping, internships and placements. It leaves three gaps — self-declared skills, no feedback to curriculum, and success measured as 'placed'. We built for all three."
        features={differentiators}
        surface="raised"
      />

      {/* The Ayush positioning — the thing most competing teams will miss entirely */}
      <Section>
        <Container>
          <Card variant="bordered" className="overflow-hidden">
            <CardBody className="grid gap-8 p-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[color:var(--color-tier-endorsed)] uppercase">
                  Built for the Ayush workforce
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  Most BAMS graduates are told about one career. There are eight.
                </h2>
                <p className="mt-3 leading-relaxed text-[color:var(--color-fg-muted)]">
                  Ayush pharmaceutical manufacturing under GMP. Panchakarma and wellness centre
                  management. Clinical research and CTRI trials. Regulatory affairs. Medical writing
                  and pharmacovigilance. Medical tourism. Ayush informatics. Each one needs two or
                  three specific skills a degree touches only lightly — and each of those is
                  learnable free.
                </p>
                <p className="mt-3 leading-relaxed text-[color:var(--color-fg-muted)]">
                  Our skill taxonomy is aligned to the NCISM curriculum rather than a generic IT
                  skills list. It is also just data — so the same platform serves an engineering
                  college without a line of code changing.
                </p>
                <Link
                  href="/ayush"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand)] underline-offset-4 hover:underline"
                >
                  Explore Ayush career paths
                </Link>
              </div>
              <ul className="grid gap-2 self-center text-sm">
                {[
                  'Ayush pharmaceutical QA — GMP, high demand, thin competition',
                  'Regulatory affairs — low competition, fast progression',
                  'Clinical research — CTRI trials, evidence generation',
                  'Medical writing — remote-friendly from day one',
                  'Panchakarma centre management — clinical plus commercial',
                  'Ayush informatics — emerging, almost no competition',
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-[var(--radius-md)] bg-[color:var(--color-surface-raised)] px-3 py-2.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Container>
      </Section>

      <CheckList
        surface="raised"
        title="Trust is a feature, not a footnote"
        description="A placement platform is only as useful as the claims on it are true. Four mechanisms do that work."
        items={[
          'Employers are verified against company registration before any listing goes live',
          'Skills carry a visible tier: self-declared, assessment-verified, or employer-endorsed',
          'Internship certificates carry a QR that resolves to a public verification page',
          'Students can report a suspicious listing, and reports reach a human review queue',
          'Blind screening is enforced server-side — hidden fields are not in the response at all',
          'Every recommendation can be opened to show exactly how its score was calculated',
        ]}
      />

      <FaqSection faqs={generalFaqs} />

      <CtaBand
        title="Find out where you actually stand."
        description="Browse verified opportunities now, or read how the assessment and matching work before you sign up."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'How it works', href: '/how-it-works' }}
      />
    </>
  )
}
