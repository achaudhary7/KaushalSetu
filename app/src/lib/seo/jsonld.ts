import { absoluteUrl, siteConfig } from '@/config/site'

/**
 * Typed JSON-LD builders.
 *
 * One builder per schema.org type we actually use, so no page hand-assembles structured
 * data. The map of which type goes on which page is in docs/SEO-CHECKLIST.md section 3.
 *
 * Everything here is generated from typed application data - never from user input - which
 * is why rendering it with dangerouslySetInnerHTML is safe. See <JsonLd> in
 * components/seo/json-ld.tsx.
 */

type Thing = Record<string, unknown>

const CONTEXT = 'https://schema.org' as const

function withContext(node: Thing): Thing {
  return { '@context': CONTEXT, ...node }
}

/* ---- Site-wide ----------------------------------------------------------- */

export function organizationJsonLd(): Thing {
  return withContext({
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/icon-512.png'),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    areaServed: 'IN',
    knowsAbout: [
      'Skill assessment',
      'Internships',
      'Campus placement',
      'Ayush careers',
      'Academia-industry collaboration',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.contact.support,
        availableLanguage: ['en', 'hi'],
        areaServed: 'IN',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'grievance redressal',
        email: siteConfig.contact.grievance,
        areaServed: 'IN',
      },
    ],
  })
}

export function websiteJsonLd(): Thing {
  return withContext({
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: siteConfig.name,
    url: absoluteUrl('/'),
    description: siteConfig.description,
    inLanguage: 'en-IN',
    publisher: { '@id': absoluteUrl('/#organization') },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl('/opportunities?q={search_term_string}'),
      },
      'query-input': 'required name=search_term_string',
    },
  })
}

/* ---- Content ------------------------------------------------------------- */

export function faqJsonLd(faqs: { question: string; answer: string }[]): Thing {
  return withContext({
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  })
}

export function articleJsonLd(article: {
  title: string
  description: string
  path: string
  publishedAt: string
  updatedAt?: string
  author?: string
}): Thing {
  return withContext({
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(article.path) },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Organization', name: article.author ?? siteConfig.name },
    publisher: { '@id': absoluteUrl('/#organization') },
    inLanguage: 'en-IN',
  })
}

export function howToJsonLd(howTo: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}): Thing {
  return withContext({
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  })
}

/* ---- The high-value one -------------------------------------------------- */

export interface JobPostingInput {
  title: string
  description: string
  slug: string
  datePosted: string
  validThrough: string
  employmentType: string
  organisation: { name: string; url?: string }
  location: { city: string; region: string; country?: string }
  remote?: boolean
  salary?: { min: number; max?: number; currency?: string; unit: string }
  skills: string[]
  educationRequirements?: string
  /** Internships and micro-internships are not full jobs; Google wants this flagged. */
  directApply?: boolean
}

/**
 * JobPosting - the single highest-value structured data type on this site. It makes
 * listings eligible for Google's job search experience, which is real distribution
 * a placement portal can otherwise never get.
 */
export function jobPostingJsonLd(job: JobPostingInput): Thing {
  return withContext({
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: siteConfig.name,
      value: job.slug,
    },
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.organisation.name,
      ...(job.organisation.url ? { sameAs: job.organisation.url } : {}),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.city,
        addressRegion: job.location.region,
        addressCountry: job.location.country ?? 'IN',
      },
    },
    ...(job.remote
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: { '@type': 'Country', name: 'India' },
        }
      : {}),
    ...(job.salary
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: job.salary.currency ?? 'INR',
            value: {
              '@type': 'QuantitativeValue',
              minValue: job.salary.min,
              ...(job.salary.max ? { maxValue: job.salary.max } : {}),
              unitText: job.salary.unit,
            },
          },
        }
      : {}),
    skills: job.skills.join(', '),
    ...(job.educationRequirements
      ? {
          educationRequirements: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: job.educationRequirements,
          },
        }
      : {}),
    directApply: job.directApply ?? true,
    url: absoluteUrl(`/opportunities/${job.slug}`),
  })
}

export function courseJsonLd(course: {
  name: string
  description: string
  provider: string
  url: string
  free?: boolean
}): Thing {
  return withContext({
    '@type': 'Course',
    name: course.name,
    description: course.description,
    url: course.url,
    provider: { '@type': 'Organization', name: course.provider },
    ...(course.free
      ? {
          offers: {
            '@type': 'Offer',
            price: 0,
            priceCurrency: 'INR',
            category: 'Free',
          },
        }
      : {}),
  })
}

export function occupationJsonLd(role: {
  name: string
  description: string
  skills: string[]
  salary?: { min: number; max: number }
}): Thing {
  return withContext({
    '@type': 'Occupation',
    name: role.name,
    description: role.description,
    skills: role.skills.join(', '),
    occupationLocation: { '@type': 'Country', name: 'India' },
    ...(role.salary
      ? {
          estimatedSalary: {
            '@type': 'MonetaryAmountDistribution',
            name: 'base',
            currency: 'INR',
            duration: 'P1Y',
            percentile10: role.salary.min,
            percentile90: role.salary.max,
          },
        }
      : {}),
  })
}

export function contactPageJsonLd(): Thing {
  return withContext({
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.name}`,
    url: absoluteUrl('/contact'),
    mainEntity: { '@id': absoluteUrl('/#organization') },
  })
}
