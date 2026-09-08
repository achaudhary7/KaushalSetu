import type { Metadata } from 'next'
import Link from 'next/link'

import { Container, Section } from '@/components/layout/container'
import { Breadcrumbs } from '@/components/ui/navigation'
import { careerPaths } from '@/content/careers'
import { legalDocuments } from '@/content/legal'
import { opportunities } from '@/content/opportunities'
import { articles } from '@/content/resources'
import { skillDefinitions } from '@/content/skills'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * Human-readable sitemap.
 *
 * Complements /sitemap.xml. Useful to visitors, and it gives every page at least one
 * genuine internal link from a crawlable location — which matters for the deeper career,
 * skill and opportunity pages.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Sitemap',
  description:
    'Every page on KaushalSetu — audience pages, career paths, skill hubs, opportunities, insights and policies.',
  path: '/sitemap',
})

const groups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', href: '/' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Design system', href: '/style-guide' },
    ],
  },
  {
    title: 'Who it is for',
    links: [
      { label: 'For students', href: '/for-students' },
      { label: 'For industry', href: '/for-industry' },
      { label: 'For institutions', href: '/for-institutions' },
      { label: 'For academicians', href: '/for-academicians' },
      { label: 'Ayush careers', href: '/ayush' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'All opportunities', href: '/opportunities' },
      { label: 'All career paths', href: '/careers' },
      { label: 'All skills', href: '/skills' },
      { label: 'Insights', href: '/resources' },
      { label: 'Verify a certificate', href: '/verify' },
    ],
  },
  {
    title: 'Career paths',
    links: careerPaths.map((path) => ({ label: path.title, href: `/careers/${path.slug}` })),
  },
  {
    title: 'Skills',
    links: skillDefinitions.map((skill) => ({ label: skill.name, href: `/skills/${skill.slug}` })),
  },
  {
    title: 'Opportunities',
    links: opportunities.map((o) => ({ label: o.title, href: `/opportunities/${o.slug}` })),
  },
  {
    title: 'Insights',
    links: articles.map((a) => ({ label: a.title, href: `/resources/${a.slug}` })),
  },
  {
    title: 'Policies',
    links: Object.values(legalDocuments).map((doc) => ({
      label: doc.title,
      href: `/${doc.slug}`,
    })),
  },
]

export default function SitemapPage() {
  const total = groups.reduce((sum, group) => sum + group.links.length, 0)

  return (
    <Section spacing="md">
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sitemap' }]} />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Sitemap</h1>
        <p className="mt-2 text-[color:var(--color-fg-muted)]">
          {total} pages. The machine-readable version is at{' '}
          <Link href="/sitemap.xml" className="underline underline-offset-4">
            /sitemap.xml
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-semibold tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                {group.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[color:var(--color-fg-muted)] underline-offset-4 hover:text-[color:var(--color-fg)] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </Section>
  )
}
