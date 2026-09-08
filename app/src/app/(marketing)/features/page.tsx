import type { Metadata } from 'next'

import { Container, Section } from '@/components/layout/container'
import { CtaBand, Hero } from '@/components/marketing/sections'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { Callout } from '@/components/ui/feedback'
import { InfoIcon } from '@/components/icons'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Features',
  description:
    'The full capability list — skill assessment, explainable matching, verified portfolios, QR certificates, analytics and the collaboration hub.',
  path: '/features',
})

type Status = 'live' | 'building' | 'planned'

interface FeatureRow {
  name: string
  description: string
  status: Status
}

const groups: { group: string; blurb: string; items: FeatureRow[] }[] = [
  {
    group: 'Skill development',
    blurb: 'Find out what you know, what is missing, and how to close it without paying anyone.',
    items: [
      {
        name: 'Questionnaire-based skill assessment',
        description:
          'Technical, domain, aptitude and soft-skill sections using industry-supplied criteria, with branching and autosave.',
        status: 'planned',
      },
      {
        name: 'Skill profile with proficiency bands',
        description:
          '0–5 per skill with named bands and a confidence weighting where evidence is thin.',
        status: 'planned',
      },
      {
        name: 'Ranked gap analysis',
        description: 'Gaps ordered by gap size × role weight × market demand, not alphabetically.',
        status: 'planned',
      },
      {
        name: 'Free learning paths',
        description:
          'Every gap resolves to specific SWAYAM and NPTEL courses, ordered by prerequisite.',
        status: 'planned',
      },
      {
        name: 'Career path explorer',
        description:
          'Eight Ayush paths and three generic ones, with skills, salary bands and entry routes.',
        status: 'live',
      },
      {
        name: 'Skill hub pages',
        description: 'What each skill is, who wants it, and where to learn it free.',
        status: 'live',
      },
      {
        name: '"Improve my match" simulator',
        description: 'See how acquiring a specific skill moves your score on the roles you want.',
        status: 'planned',
      },
    ],
  },
  {
    group: 'Verification and trust',
    blurb: 'The brief says "verified skills" and never defines it. This is our definition.',
    items: [
      {
        name: 'Three-tier skill badges',
        description:
          'Self-declared, assessment-verified, employer-endorsed — visually distinct and filterable.',
        status: 'live',
      },
      {
        name: 'Verification weighted in matching',
        description:
          'Verified skills genuinely produce better matches, so the tiers are load-bearing rather than decorative.',
        status: 'planned',
      },
      {
        name: 'QR-verifiable certificates',
        description:
          'Public verification page per certificate, with issuer-controlled revocation. No login to check.',
        status: 'planned',
      },
      {
        name: 'Employer verification gate',
        description: 'Company registration checked before any listing publishes.',
        status: 'planned',
      },
      {
        name: 'Suspicious listing reports',
        description: 'One-click reporting into a human review queue.',
        status: 'planned',
      },
    ],
  },
  {
    group: 'Internships and placement',
    blurb: 'Post, match, apply, track — for five kinds of opportunity, not just one.',
    items: [
      {
        name: 'Public, crawlable opportunity search',
        description:
          'Faceted filters as real URLs, so every combination is shareable and indexable.',
        status: 'live',
      },
      {
        name: 'JobPosting structured data',
        description: "Listings are eligible for Google's job search experience.",
        status: 'live',
      },
      {
        name: 'Micro-internships',
        description: 'One-to-four week paid work, aimed at first and second years.',
        status: 'live',
      },
      {
        name: 'Explainable match scores',
        description: 'Every recommendation opens to show the arithmetic behind it.',
        status: 'planned',
      },
      {
        name: 'Application pipeline and status trail',
        description: 'Applied through offer, with every state change recorded.',
        status: 'planned',
      },
      {
        name: 'Recruiter ATS board',
        description: 'Pipeline, notes, ratings, bulk actions and interview scheduling.',
        status: 'planned',
      },
      {
        name: 'Blind first-pass shortlisting',
        description: 'Identity withheld server-side until skills have been screened.',
        status: 'planned',
      },
      {
        name: 'Rejection reason capture',
        description: 'Coded reasons, anonymised, feeding curriculum gap analysis.',
        status: 'planned',
      },
      {
        name: 'Saved searches and alerts',
        description: 'Be told when something matching your profile is posted.',
        status: 'planned',
      },
    ],
  },
  {
    group: 'Portfolio and credentials',
    blurb: "Evidence a recruiter can check without taking anyone's word for it.",
    items: [
      {
        name: 'Public student portfolio',
        description: 'Server-rendered, indexable when you choose, with Person structured data.',
        status: 'planned',
      },
      {
        name: 'Employer endorsements',
        description: 'Attributed, dated and immutable once given.',
        status: 'planned',
      },
      {
        name: 'ATS-readable resume generation',
        description:
          'Single column, real text, standard headings — parseable by the systems that actually read it.',
        status: 'planned',
      },
      {
        name: 'Secure document management',
        description: 'Stored outside the web root, signed-URL access, every access logged.',
        status: 'planned',
      },
    ],
  },
  {
    group: 'Academician track',
    blurb: 'The half of "academia–industry" most portals drop.',
    items: [
      {
        name: 'Faculty internships and industrial training',
        description: 'Structured industry placements for teaching staff.',
        status: 'planned',
      },
      {
        name: 'FDP catalogue and registration',
        description: 'With verifiable completion certificates.',
        status: 'planned',
      },
      {
        name: 'Consultancy opportunities',
        description: 'Companies post problems; faculty express interest.',
        status: 'planned',
      },
      {
        name: 'Collaborative research matching',
        description: 'Industry research needs matched to faculty expertise.',
        status: 'planned',
      },
      {
        name: 'Institutional approval workflow',
        description: 'Because faculty usually need a nod before an industry engagement.',
        status: 'planned',
      },
    ],
  },
  {
    group: 'Analytics and reporting',
    blurb: 'Every number traces to a documented query. No figure on any dashboard is hard-coded.',
    items: [
      {
        name: 'Placement readiness funnel',
        description: 'Profiled through offered, with drop-off at each stage.',
        status: 'planned',
      },
      {
        name: 'Reverse skill-gap report',
        description: 'Employer demand against syllabus coverage, delivered termly.',
        status: 'planned',
      },
      {
        name: '6 and 12-month outcome tracking',
        description:
          'Still employed, role relevant, satisfied — with response rates shown honestly.',
        status: 'planned',
      },
      {
        name: 'Regional skill demand map',
        description: 'Which skills are wanted where, so students look beyond three cities.',
        status: 'planned',
      },
      {
        name: 'Industry pipeline analytics',
        description: 'Time-to-hire, match quality, source institutions, skill availability.',
        status: 'planned',
      },
      {
        name: 'CSV and PDF export throughout',
        description: 'On every table and every report.',
        status: 'planned',
      },
    ],
  },
  {
    group: 'Collaboration',
    blurb: 'What makes it a collaboration portal rather than a job board with tabs.',
    items: [
      {
        name: 'Mentorship, including alumni matching',
        description: 'Matched on institution, programme and target path. Alumni reply more.',
        status: 'planned',
      },
      {
        name: 'Live industry projects',
        description: 'Real problems, student teams, milestones, faculty supervision.',
        status: 'planned',
      },
      {
        name: 'Guest lectures and workshops',
        description: 'Requests in both directions, with attendance and certificates.',
        status: 'planned',
      },
      {
        name: 'Innovation challenges',
        description: 'Submissions, rubric-based judging and winner certificates.',
        status: 'planned',
      },
      {
        name: 'Relationship-gated messaging',
        description:
          'You can only message someone you have an actual connection with. Prevents the platform becoming a spam channel.',
        status: 'planned',
      },
    ],
  },
  {
    group: 'Platform',
    blurb: 'The things that are invisible until they are missing.',
    items: [
      {
        name: 'Role-based access for five roles',
        description:
          'Student, academician, industry, institution and admin, enforced at the data layer.',
        status: 'planned',
      },
      {
        name: 'WCAG 2.1 AA design system',
        description: 'Contrast asserted by a script that runs in the build gate.',
        status: 'live',
      },
      {
        name: 'Full dark mode',
        description: 'Every token redeclared; no colour defined only inside a media query.',
        status: 'live',
      },
      {
        name: 'Server-rendered and crawlable',
        description: 'Public pages render fully with JavaScript disabled.',
        status: 'live',
      },
      {
        name: 'Audit logging',
        description: 'Every verification, endorsement, certificate and admin action recorded.',
        status: 'planned',
      },
      {
        name: 'Data export and deletion',
        description: 'DPDP-aligned: take your data with you, or remove it.',
        status: 'planned',
      },
      {
        name: 'AI layer (optional)',
        description: 'Resume parsing and semantic matching. Everything works with it switched off.',
        status: 'planned',
      },
    ],
  },
]

const statusMeta: Record<Status, { label: string; variant: 'success' | 'warning' | 'neutral' }> = {
  live: { label: 'Live', variant: 'success' },
  building: { label: 'Building', variant: 'warning' },
  planned: { label: 'Planned', variant: 'neutral' },
}

export default function FeaturesPage() {
  const counts = groups
    .flatMap((g) => g.items)
    .reduce<Record<Status, number>>(
      (acc, item) => ({ ...acc, [item.status]: acc[item.status] + 1 }),
      { live: 0, building: 0, planned: 0 },
    )

  return (
    <>
      <Hero
        eyebrow="Features"
        title="Everything the platform does, and what is actually built."
        description="Marked honestly. A feature list that quietly implies everything is finished is worth nothing to you and embarrasses us the moment you click something."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'How it works', href: '/how-it-works' }}
      />

      <Section spacing="sm">
        <Container>
          <Callout icon={<InfoIcon />} title="Where this is up to">
            {counts.live} of {counts.live + counts.building + counts.planned} capabilities are live
            today. This platform is being built in public, in numbered phases, and the roadmap and
            progress board are in the repository. Nothing below is marked Live unless you can use it
            right now.
          </Callout>
        </Container>
      </Section>

      {groups.map((group) => (
        <Section key={group.group} spacing="sm">
          <Container>
            <h2 className="text-xl font-semibold tracking-tight">{group.group}</h2>
            <p className="mt-1 max-w-2xl text-sm text-[color:var(--color-fg-muted)]">
              {group.blurb}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <Card key={item.name} variant="bordered">
                  <CardBody className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                        {item.description}
                      </p>
                    </div>
                    <Badge size="sm" variant={statusMeta[item.status].variant}>
                      {statusMeta[item.status].label}
                    </Badge>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <CtaBand
        title="Use what is live now."
        description="The career explorer, skill hubs and opportunity search all work today."
        primaryCta={{ label: 'Explore careers', href: '/careers' }}
        secondaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
      />
    </>
  )
}
