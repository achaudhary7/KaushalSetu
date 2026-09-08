import type { Metadata } from 'next'

import { buildMetadata } from '@/lib/seo/metadata'

/**
 * The style guide is an internal reference, so it is explicitly noindex.
 * Metadata lives here because the page itself is a Client Component.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Design system',
  description:
    'The KaushalSetu design system: brand, colour tokens, typography, and every reusable component in every variant and state.',
  path: '/style-guide',
  index: false,
})

export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
  return children
}
