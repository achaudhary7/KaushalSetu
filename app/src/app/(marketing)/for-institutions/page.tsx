import type { Metadata } from 'next'

import {
  BarChartIcon,
  FileTextIcon,
  LightbulbIcon,
  PieChartIcon,
  TrendingUpIcon,
  UsersIcon,
} from '@/components/icons'
import { GrowthScene } from '@/components/illustrations'
import { CheckList, CtaBand, FaqSection, FeatureGrid, Hero } from '@/components/marketing/sections'
import { institutionFaqs } from '@/content/faqs'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'For institutions',
  description:
    'Track skill development, internship participation and placement readiness, with a termly report on the gap between your syllabus and employer demand.',
  path: '/for-institutions',
})

const features = [
  {
    icon: PieChartIcon,
    title: 'Placement readiness funnel',
    body: 'Profiled, assessed, recommended, applied, shortlisted, interviewed, offered — with drop-off at every stage. The drop-off is usually where the insight is.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Cohort skill development',
    body: 'Skill distribution across your students, movement over time, and the ratio of verified to self-declared. Filterable by department, programme and batch.',
  },
  {
    icon: FileTextIcon,
    title: 'The reverse skill-gap report',
    body: 'What employers ask for, against what your syllabus covers. Three ranked lists: working, missing, and due for review. Delivered termly as a document a dean can act on.',
  },
  {
    icon: LightbulbIcon,
    title: 'Rejection reasons, anonymised',
    body: 'Recruiters must state why they rejected a candidate. Aggregated, that is a sharper signal about your curriculum than any job description.',
  },
  {
    icon: BarChartIcon,
    title: 'Outcomes at 6 and 12 months',
    body: 'Still employed? Role relevant to the qualification? Satisfied? This turns a placement percentage into evidence.',
  },
  {
    icon: UsersIcon,
    title: 'Faculty engagement too',
    body: 'Faculty internships, FDPs and consultancy, with the approval step your policy actually requires built in.',
  },
]

export default function ForInstitutionsPage() {
  return (
    <>
      <Hero
        eyebrow="For institutions"
        title="Find out what to teach next."
        description="Your placement percentage tells you what happened. It does not tell you which skill your students were repeatedly rejected for, or whether the graduates you placed were still in a relevant role a year later. Both are knowable."
        primaryCta={{ label: 'Talk to us', href: '/contact' }}
        secondaryCta={{ label: 'See the full feature list', href: '/features' }}
        illustration={<GrowthScene title="Cohort skill growth against required levels" />}
      />

      <FeatureGrid title="What you get" features={features} surface="raised" />

      <CheckList
        title="The reverse skill-gap report, in detail"
        description="The brief this platform was built for asks institutions to monitor skill development. It never asks anyone to feed employer demand back to the people who set the syllabus. That gap is the whole point of this report."
        items={[
          'Every skill demanded across postings reaching your students, weighted by frequency, seniority and stipend',
          'Mapped against what your curriculum already covers',
          'Three ranked lists: covered and demanded, demanded but not covered, covered but not demanded',
          'Anonymised rejection reasons folded in — what students were actually turned down for',
          'Trend across terms, so you see movement rather than a snapshot',
          'Exported as a designed PDF with a plain-language summary, addressed to you and to the regulator',
        ]}
      />

      <CheckList
        title="Useful for accreditation, honestly"
        description="NAAC and NBA both ask for evidence on placement, employability and industry engagement. Most of this platform produces exactly that as a by-product."
        items={[
          'Placement and internship participation by department, programme and batch',
          'Documented industry engagement — MoUs, guest lectures, live projects, faculty internships',
          'Skill development tracked longitudinally rather than self-reported',
          'Graduate outcome data at 6 and 12 months, with the response rate shown rather than hidden',
          'Exportable as CSV and PDF for your own reporting',
        ]}
        surface="sunken"
      />

      <FaqSection faqs={institutionFaqs} />

      <CtaBand
        title="See what your cohort looks like."
        description="Institutions use the platform free. We will walk you through the dashboards with your own programmes."
        primaryCta={{ label: 'Talk to us', href: '/contact' }}
        secondaryCta={{ label: 'Pricing', href: '/pricing' }}
      />
    </>
  )
}
