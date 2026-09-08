import type { Metadata } from 'next'

import {
  BarChartIcon,
  BadgeCheckIcon,
  HandshakeIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  TargetIcon,
} from '@/components/icons'
import { MatchingScene, VerificationScene } from '@/components/illustrations'
import { CheckList, CtaBand, FaqSection, FeatureGrid, Hero } from '@/components/marketing/sections'
import { industryFaqs } from '@/content/faqs'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'For industry — hire on verified skills, not college name',
  description:
    'Post internships and jobs, screen candidates on assessment-verified and employer-endorsed skills, run blind first-pass shortlisting, and issue QR-verifiable certificates.',
  path: '/for-industry',
})

const features = [
  {
    icon: BadgeCheckIcon,
    title: 'Evidence, not assertions',
    body: 'Filter to candidates whose skills are assessment-verified or endorsed by another verified employer. Self-declared skills are shown as exactly that.',
  },
  {
    icon: TargetIcon,
    title: 'Matching you can audit',
    body: 'Every candidate score opens to show which skills contributed what. No black box to defend to your hiring manager, and no model to distrust.',
  },
  {
    icon: HandshakeIcon,
    title: 'Blind first-pass screening',
    body: 'Hide name, gender, photo and college until skills have been assessed. Enforced server-side, and the platform records that you screened blind so you can demonstrate it.',
  },
  {
    icon: QrCodeIcon,
    title: 'Issue certificates that verify',
    body: 'Completion certificates carry a QR resolving to a public page showing you as the issuer, with revocation under your control.',
  },
  {
    icon: BarChartIcon,
    title: 'Pipeline and skill-supply analytics',
    body: 'Time-to-hire, match-quality distribution, source institutions, and where the skills you need are actually available.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'A verified badge that means something',
    body: 'Because every employer is checked before posting, your listings sit in a pool students trust. That is worth more than it costs you.',
  },
]

export default function ForIndustryPage() {
  return (
    <>
      <Hero
        eyebrow="For industry"
        title="Screen on what a candidate can do."
        description="Filtering by college name is fast, cheap, and throws away most of your applicant pool. Screening on verified skills takes the same time and finds people the shortlist would have missed."
        primaryCta={{ label: 'See pricing', href: '/pricing' }}
        secondaryCta={{ label: 'How matching works', href: '/how-it-works' }}
        illustration={<MatchingScene title="Overlap between a candidate profile and a role" />}
      />

      <FeatureGrid title="What you get" features={features} surface="raised" />

      <CheckList
        title="Why we make you get verified first"
        description="It is one submission, and it is the reason this platform is worth posting on."
        items={[
          'Fake internship listings that charge students a certificate fee are widespread and well documented',
          'We check company registration before any listing goes live',
          'Students can report a suspicious listing, and reports reach a human review queue',
          'The result is a candidate pool that engages with listings instead of distrusting them',
          'Your verified badge appears on every listing and on every certificate you issue',
        ]}
        illustration={<VerificationScene title="A certificate resolving to a verification page" />}
      />

      <CheckList
        title="Micro-internships: try before you commit"
        description="A three-week scoped project is a small risk. A six-month internship offer to an unproven student is not."
        items={[
          'Post one-to-four-week paid pieces of real work',
          'Assess capability on delivered work rather than on an interview',
          'Convert the ones who deliver into longer offers',
          'Reach first and second years before your competitors are looking at them',
          'Endorse specific skills afterwards — which follows the student and reflects on you',
        ]}
        surface="sunken"
      />

      <FaqSection faqs={industryFaqs} />

      <CtaBand
        title="Post your first role free."
        description="Verification takes one submission. Limited internship posting is free on every plan."
        primaryCta={{ label: 'See pricing', href: '/pricing' }}
        secondaryCta={{ label: 'Talk to us', href: '/contact' }}
      />
    </>
  )
}
