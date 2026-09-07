/**
 * Single source of truth for product identity.
 *
 * Nothing else in the codebase hard-codes the product name, tagline, domain or contact
 * details. Renaming or white-labelling the platform should be a change to this file alone.
 */

export const siteConfig = {
  name: 'KaushalSetu',
  /** Used where the name needs expanding, e.g. the home page <title>. */
  legalName: 'KaushalSetu Academia-Industry Collaboration Portal',
  tagline: 'The bridge from campus to career.',
  taglineAyush: 'Bridging Ayush education and industry.',
  description:
    'A unified academia-industry platform for skill assessment, verified digital portfolios, internships and placements - connecting students, industry, academicians and institutions.',

  /**
   * Canonical origin. Everything SEO-facing derives from this: canonicals, the sitemap,
   * OpenGraph URLs and JSON-LD. It must match the host actually served in production,
   * including the www / non-www decision.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  locale: 'en_IN',
  themeColor: '#1e3a8a',

  contact: {
    email: 'hello@kaushalsetu.in',
    support: 'support@kaushalsetu.in',
    /** Named grievance officer, as expected of an Indian platform under the IT Rules. */
    grievance: 'grievance@kaushalsetu.in',
    security: 'security@kaushalsetu.in',
  },

  social: {
    github: '',
    linkedin: '',
    x: '',
  },

  /** Context for the about page and the pitch. */
  context: {
    problemStatementId: '26044',
    problemStatementTitle:
      'Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement',
    event: 'Smart India Hackathon',
    ministry: 'Ministry of Ayush',
  },
} as const

export type SiteConfig = typeof siteConfig

/** Absolute URL helper. Every canonical, OG and sitemap URL goes through this. */
export function absoluteUrl(path = '/'): string {
  const base = siteConfig.url.replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}
