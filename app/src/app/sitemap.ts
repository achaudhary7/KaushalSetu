import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/config/site'
import { careerSlugs } from '@/content/careers'
import { opportunities } from '@/content/opportunities'
import { articles } from '@/content/resources'
import { skillSlugs } from '@/content/skills'

/**
 * sitemap.xml
 *
 * Rules from docs/SEO-CHECKLIST.md section 5:
 *   - only canonical, indexable, 200-status URLs
 *   - never a redirect, never a noindex page
 *   - accurate lastModified from real data
 *
 * Explicitly excluded: /style-guide, /verify/[code] (personal records), and everything
 * under /dashboard, /admin, /settings, /auth.
 *
 * Phase 7 and 8 replace the fixture imports with database queries. If this ever approaches
 * 50,000 URLs, split it with generateSitemaps().
 */

type Entry = MetadataRoute.Sitemap[number]

const staticPages: { path: string; priority: number; changeFrequency: Entry['changeFrequency'] }[] =
  [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/opportunities', priority: 0.9, changeFrequency: 'daily' },
    { path: '/careers', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/skills', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/ayush', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/for-students', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/for-industry', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/for-institutions', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/for-academicians', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/how-it-works', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/features', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/resources', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/verify', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/sitemap', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/grievance', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/security', priority: 0.3, changeFrequency: 'yearly' },
  ]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const careerEntries: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
    url: absoluteUrl(`/careers/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const skillEntries: MetadataRoute.Sitemap = skillSlugs.map((slug) => ({
    url: absoluteUrl(`/skills/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // lastModified comes from the posting date, not from "now" - claiming everything
  // changed today is exactly the kind of signal that gets a sitemap ignored.
  const opportunityEntries: MetadataRoute.Sitemap = opportunities.map((opportunity) => ({
    url: absoluteUrl(`/opportunities/${opportunity.slug}`),
    lastModified: new Date(opportunity.postedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/resources/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...careerEntries,
    ...skillEntries,
    ...opportunityEntries,
    ...articleEntries,
  ]
}
