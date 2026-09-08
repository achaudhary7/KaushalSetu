import type { Metadata } from 'next'

import { LegalDocumentPage } from '@/components/marketing/legal-document'
import { legalDocuments } from '@/content/legal'
import { buildMetadata } from '@/lib/seo/metadata'

const document = legalDocuments.grievance!

export const metadata: Metadata = buildMetadata({
  title: document.title,
  description: document.description,
  path: '/grievance',
})

export default function Page() {
  return <LegalDocumentPage document={document} />
}
