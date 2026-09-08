import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/config/site'

/**
 * robots.txt
 *
 * Remember the trap documented in docs/SEO-CHECKLIST.md section 5: `Disallow` blocks
 * *crawling*, not indexing. A URL discovered elsewhere can still be indexed while
 * disallowed — and because Google never fetches it, it never sees a `noindex` either.
 * So anything that must stay out of the index is left crawlable and carries `noindex`
 * from buildMetadata({ index: false }). Disallow is only used here to protect private
 * areas and to stop crawl budget being burned on infinite filter permutations.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Private, authenticated areas
          '/dashboard/',
          '/admin/',
          '/settings/',
          '/onboarding/',
          '/messages/',
          '/notifications',
          // Auth flows - no value in the index, and reset links must never be crawled
          '/auth/',
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password/',
          '/verify-email/',
          // API surface
          '/api/',
          // Individual certificate records are personal. /verify itself stays indexable.
          '/verify/',
          // Crawl-budget protection: the primary facets are linked and crawlable, but
          // sort order and pagination permutations add nothing to the index.
          '/opportunities?*sort=',
          '/opportunities?*page=',
        ],
      },
      {
        // Deep-crawling SEO tools add load without adding users.
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/').replace(/\/$/, ''),
  }
}
