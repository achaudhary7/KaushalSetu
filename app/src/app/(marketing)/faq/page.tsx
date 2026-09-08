import type { Metadata } from 'next'

import { CtaBand, FaqSection, Hero } from '@/components/marketing/sections'
import {
  academicianFaqs,
  generalFaqs,
  industryFaqs,
  institutionFaqs,
  studentFaqs,
} from '@/content/faqs'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Frequently asked questions',
  description:
    'How matching is calculated, what a verified skill means, whether it costs anything, how certificates are verified, and what happens to your data.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <>
      <Hero
        eyebrow="FAQ"
        title="Questions people actually ask."
        description="If your question is not here, the contact page reaches a person."
        primaryCta={{ label: 'Contact us', href: '/contact' }}
        secondaryCta={{ label: 'How it works', href: '/how-it-works' }}
      />

      <FaqSection title="About the platform" faqs={generalFaqs} surface="raised" />
      <FaqSection title="For students" faqs={studentFaqs} />
      <FaqSection title="For industry" faqs={industryFaqs} surface="raised" />
      <FaqSection title="For institutions" faqs={institutionFaqs} />
      <FaqSection title="For academicians" faqs={academicianFaqs} surface="raised" />

      <CtaBand
        title="Still unclear on something?"
        primaryCta={{ label: 'Contact us', href: '/contact' }}
        secondaryCta={{ label: 'See all features', href: '/features' }}
      />
    </>
  )
}
