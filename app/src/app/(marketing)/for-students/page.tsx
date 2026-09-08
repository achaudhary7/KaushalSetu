import type { Metadata } from 'next'

import {
  AwardIcon,
  BadgeCheckIcon,
  BookOpenIcon,
  FileTextIcon,
  TargetIcon,
  UsersIcon,
} from '@/components/icons'
import { AssessmentScene, GrowthScene } from '@/components/illustrations'
import { CheckList, CtaBand, FaqSection, FeatureGrid, Hero } from '@/components/marketing/sections'
import { studentFaqs } from '@/content/faqs'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'For students — find your skill gaps and close them free',
  description:
    'Assess your technical and soft skills, see which career paths fit, and close every gap with free SWAYAM and NPTEL courses. No fees, ever.',
  path: '/for-students',
})

const features = [
  {
    icon: TargetIcon,
    title: 'Know where you actually stand',
    body: 'A questionnaire built from criteria industry supplied, covering technical, domain, aptitude and soft skills. You get proficiency per skill, not a single meaningless score.',
  },
  {
    icon: BookOpenIcon,
    title: 'Gaps become a free reading list',
    body: 'Every gap maps to specific SWAYAM and NPTEL courses, ordered by prerequisite. Government platforms, zero cost. We do not sell you a course.',
  },
  {
    icon: BadgeCheckIcon,
    title: 'Skills you can prove',
    body: 'Complete an assessment and the skill is verified against your attempt. Finish an internship and the employer can endorse it. Recruiters filter on exactly this.',
  },
  {
    icon: AwardIcon,
    title: 'Certificates that survive scrutiny',
    body: 'Internship certificates carry a QR resolving to a public verification page. Nobody has to take your word for it, and no fake can imitate it.',
  },
  {
    icon: FileTextIcon,
    title: 'One-click ATS-readable resume',
    body: 'Generated from your verified portfolio in a format applicant tracking systems can actually parse — single column, real text, standard headings.',
  },
  {
    icon: UsersIcon,
    title: 'Alumni who actually reply',
    body: 'Mentorship matched on your institution, programme and target path. Alumni respond at a far higher rate than cold industry contacts.',
  },
]

export default function ForStudentsPage() {
  return (
    <>
      <Hero
        eyebrow="For students"
        title="Stop guessing what employers want."
        description="Most students discover the gap between what they studied and what industry asks for during placement season, when it is too late to do anything about it. Find out in second year instead — and close it with courses that cost nothing."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'Explore career paths', href: '/careers' }}
        illustration={<AssessmentScene title="A questionnaire producing a skill profile" />}
      />

      <FeatureGrid
        title="What you get"
        description="All of it free. Students never pay on this platform."
        features={features}
        surface="raised"
      />

      <CheckList
        title="First or second year? Start now, not in third."
        description="The standard advice is to wait. It produces a cohort where every profile is identical by final year."
        items={[
          'Micro-internships — one to four weeks, paid, scoped so a company will hand them to someone unproven',
          'Each one produces a portfolio entry, a reference, and employer-endorsed skills',
          'Take the assessment early and retake it — progress over time is charted',
          'Alumni mentorship is open from year one',
          'Two micro-internships in second year is a materially different profile from one final-year internship',
        ]}
        illustration={<GrowthScene title="Skill growth over time against a target level" />}
        surface="sunken"
      />

      <CheckList
        title="Studying BAMS, BHMS or BUMS?"
        description="This platform was built for you specifically. Most Ayush graduates are told about one career; there are eight, and the competition for most of them is thin because nobody mentions they exist."
        items={[
          'Ayush pharmaceutical quality assurance — GMP-regulated, stable, well paid, barely known',
          'Regulatory affairs — every product on a shelf passed through someone who does this',
          'Clinical research and CTRI trials — Ayush needs evidence, and evidence needs method',
          'Medical writing and pharmacovigilance — remote-friendly, accessible from graduation',
          'Panchakarma and wellness centre management — clinical depth plus commercial responsibility',
          'Ayush informatics — emerging, and it needs a clinician who understands data',
        ]}
      />

      <FaqSection faqs={studentFaqs} surface="raised" />

      <CtaBand
        title="Find out where you stand."
        description="Browse what employers are asking for right now, then work backwards."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'Explore skills', href: '/skills' }}
      />
    </>
  )
}
