import Link from 'next/link'

import { Container, Section } from '@/components/layout/container'
import { Prose } from '@/components/marketing/sections'
import { Breadcrumbs } from '@/components/ui/navigation'
import type { LegalDocument } from '@/content/legal'
import { legalDocuments } from '@/content/legal'

/**
 * Shared renderer for every legal and trust page.
 *
 * One component, six documents — so the typography, the "last updated" line and the
 * cross-links between them can never drift apart.
 */
export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  const others = Object.values(legalDocuments).filter((doc) => doc.slug !== document.slug)

  return (
    <Section spacing="md">
      <Container width="prose">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: document.title }]} />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {document.title}
        </h1>
        <p className="mt-2 text-sm text-[color:var(--color-fg-subtle)]">
          Last updated {document.updated}
        </p>

        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-fg)]">
          {document.intro}
        </p>

        {document.sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            <Prose className="mt-3">
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </Prose>
          </section>
        ))}

        <nav
          aria-label="Other policies"
          className="mt-12 border-t border-[color:var(--color-border)] pt-6"
        >
          <p className="text-xs font-semibold tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
            Related
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {others.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/${doc.slug}`}
                  className="text-sm text-[color:var(--color-fg-muted)] underline-offset-4 hover:text-[color:var(--color-fg)] hover:underline"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  )
}
