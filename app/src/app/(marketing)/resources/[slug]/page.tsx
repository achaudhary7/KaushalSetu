import type { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRightIcon, ClockIcon } from '@/components/icons'
import { Container, Section } from '@/components/layout/container'
import { CtaBand, Prose } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/ui/navigation'
import { articles, getArticle } from '@/content/resources'
import { articleJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export const dynamicParams = false

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) {
    return buildMetadata({
      title: 'Article',
      description: '',
      path: `/resources/${slug}`,
      index: false,
    })
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
  })
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return null

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          path: `/resources/${article.slug}`,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
        })}
      />

      <Section spacing="md">
        <Container width="prose">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Insights', href: '/resources' },
              { label: article.title },
            ]}
          />

          <article className="mt-6">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <Badge key={tag} size="sm" variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {article.title}
            </h1>

            <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-fg-subtle)]">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {article.updatedAt ? <span>Updated {formatDate(article.updatedAt)}</span> : null}
              <span className="inline-flex items-center gap-1">
                <ClockIcon size={13} /> {article.readingMinutes} min read
              </span>
            </p>

            <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-fg)]">
              {article.lede}
            </p>

            {article.sections.map((section, index) => (
              <section key={section.heading ?? `section-${index}`} className="mt-8">
                {section.heading ? (
                  <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
                ) : null}
                <Prose className={section.heading ? 'mt-3' : undefined}>
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

            {article.related?.length ? (
              <nav aria-label="Related" className="mt-10 flex flex-wrap gap-3">
                {article.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border-strong)] px-4 py-2 text-sm hover:bg-[color:var(--color-surface-raised)]"
                  >
                    {link.label} <ArrowRightIcon size={14} />
                  </Link>
                ))}
              </nav>
            ) : null}
          </article>
        </Container>
      </Section>

      {others.length > 0 ? (
        <Section spacing="md" surface="raised">
          <Container width="prose">
            <h2 className="text-lg font-semibold tracking-tight">More insights</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <Card key={other.slug} interactive className="relative">
                  <CardBody>
                    <h3 className="font-semibold tracking-tight">
                      <Link
                        href={`/resources/${other.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {other.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm text-[color:var(--color-fg-muted)]">
                      {other.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title="Put it into practice."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'Explore career paths', href: '/careers' }}
      />
    </>
  )
}
