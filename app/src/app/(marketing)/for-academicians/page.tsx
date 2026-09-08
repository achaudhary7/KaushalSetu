import type { Metadata } from 'next'

import {
  AwardIcon,
  BookOpenIcon,
  BriefcaseIcon,
  HandshakeIcon,
  LightbulbIcon,
  UsersIcon,
} from '@/components/icons'
import { CollaborationScene } from '@/components/illustrations'
import { CheckList, CtaBand, FaqSection, FeatureGrid, Hero } from '@/components/marketing/sections'
import { academicianFaqs } from '@/content/faqs'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'For academicians — FDPs and research',
  description:
    'A dedicated faculty track: industry internships, industrial training, Faculty Development Programmes, consultancy and collaborative research.',
  path: '/for-academicians',
})

const features = [
  {
    icon: BriefcaseIcon,
    title: 'Faculty internships',
    body: 'Term or summer placements inside industry, so what you teach reflects how the work is currently done rather than how it was done when you last practised.',
  },
  {
    icon: BookOpenIcon,
    title: 'FDP catalogue and registration',
    body: 'Browse, register, attend, and receive a completion certificate that carries the same QR verification as every other credential here.',
  },
  {
    icon: LightbulbIcon,
    title: 'Consultancy opportunities',
    body: 'Companies post real problems. You express interest, scope and terms are recorded, and your institution approves where its policy requires it.',
  },
  {
    icon: HandshakeIcon,
    title: 'Collaborative research',
    body: 'Industry research needs matched to your expertise by the same engine that matches students to roles — and explainable the same way.',
  },
  {
    icon: UsersIcon,
    title: 'Guest lectures and mentorship',
    body: 'Requests flow in both directions: institutions asking for a speaker, industry offering one, and faculty mentoring students on live projects.',
  },
  {
    icon: AwardIcon,
    title: 'A profile that accumulates',
    body: 'Specialisations, publications, industry exposure and completed programmes in one place — and visible to your institution for its own reporting.',
  },
]

export default function ForAcademiciansPage() {
  return (
    <>
      <Hero
        eyebrow="For academicians"
        title="The other half of academia–industry."
        description="Faculty have the least visibility into industry practice of anyone in the loop, and the fewest structured routes into it. This is the track most placement portals forget entirely — the brief asks for it explicitly, so we built it."
        primaryCta={{ label: 'How it works', href: '/how-it-works' }}
        secondaryCta={{ label: 'Talk to us', href: '/contact' }}
        illustration={<CollaborationScene title="Faculty connected to industry partners" />}
      />

      <FeatureGrid title="What you get" features={features} surface="raised" />

      <CheckList
        title="Built for Ayush faculty in particular"
        description="Generic FDP listings are not much use to a Professor of Dravyaguna. The seeded programmes and collaborations here are Ayush-specific."
        items={[
          'NCISM-aligned pedagogy and curriculum development programmes',
          'Research methodology and clinical trial design for classical formulations',
          'GMP and quality systems for Ayush manufacturing',
          'Collaborative research with Ayush pharmaceutical units and hospitals',
          'Consultancy on formulation standardisation, quality control and pharmacovigilance',
          'Industrial training placements at GMP-certified manufacturing units',
        ]}
      />

      <CheckList
        title="Your institution stays in the loop"
        description="Because in practice a faculty member usually needs institutional approval before an industry engagement, and pretending otherwise makes a system nobody can actually use."
        items={[
          'Approval step built into the flow where your institution requires one',
          'Institutions see and approve faculty industry engagements from their own dashboard',
          "Completed programmes feed your profile and your institution's reporting",
          'Industry exposure counts toward the engagement evidence accreditation bodies ask for',
        ]}
        surface="sunken"
      />

      <FaqSection faqs={academicianFaqs} />

      <CtaBand
        title="Free for faculty, always."
        description="Academicians and institutions never pay on this platform."
        primaryCta={{ label: 'Talk to us', href: '/contact' }}
        secondaryCta={{ label: 'See all features', href: '/features' }}
      />
    </>
  )
}
