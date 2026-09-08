import type { Metadata } from 'next'

import { LegalDocumentPage } from '@/components/marketing/legal-document'
import { legalDocuments } from '@/content/legal'
import { buildMetadata } from '@/lib/seo/metadata'

const document = legalDocuments.security!

export const metadata: Metadata = buildMetadata({
  title: document.title,
  description: document.description,
  path: '/security',
})

export default function Page() {
  return <LegalDocumentPage document={document} />
}
