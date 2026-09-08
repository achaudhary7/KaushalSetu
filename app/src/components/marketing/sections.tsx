import Link from 'next/link'

import { ArrowRightIcon, CheckIcon } from '@/components/icons'
import { GridPattern } from '@/components/illustrations'
import { Container, Grid, Section } from '@/components/layout/container'
import { JsonLd } from '@/components/seo/json-ld'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/disclosure'
import type { Faq } from '@/content/faqs'
import { faqJsonLd } from '@/lib/seo/jsonld'
import { cn } from '@/lib/utils/cn'

/**
 * Composable marketing sections.
 *
 * Every public page is assembled from these rather than hand-built, which is what keeps
 * 25 pages looking like one product. If a page needs a layout none of these provide, add
 * a section here — do not inline a bespoke one on the page.
 */

/* ---- Hero ---------------------------------------------------------------- */

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  illustration,
  children,
}: {
  eyebrow?: string
  title: string
  description: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  illustration?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <GridPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-40" />
      <Container className="relative">
        <div className={cn('grid items-center gap-12', illustration && 'lg:grid-cols-2')}>
          <div className={cn(!illustration && 'max-w-3xl')}>
            {eyebrow ? <Badge variant="brand">{eyebrow}</Badge> : null}
            <h1
              className={cn(
                'text-4xl font-semibold tracking-tight text-balance sm:text-5xl',
                eyebrow && 'mt-4',
              )}
            >
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color:var(--color-fg-muted)]">
              {description}
            </p>
            {primaryCta || secondaryCta ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {primaryCta ? (
                  <Button size="lg" asChild>
                    <Link href={primaryCta.href}>
                      {primaryCta.label} <ArrowRightIcon />
                    </Link>
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
            ) : null}
            {children}
          </div>
          {illustration ? <div className="lg:pl-8">{illustration}</div> : null}
        </div>
      </Container>
    </Section>
  )
}

/* ---- Feature grid -------------------------------------------------------- */

export interface Feature {
  icon?: React.ComponentType<{ size?: number }>
  title: string
  body: string
  href?: string
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
  cols = 3,
  surface,
}: {
  eyebrow?: string
  title?: string
  description?: string
  features: Feature[]
  cols?: 2 | 3 | 4
  surface?: 'raised' | 'sunken'
}) {
  return (
    <Section surface={surface}>
      <Container>
        {eyebrow || title ? (
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-xs font-semibold tracking-wider text-[color:var(--color-brand)] uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  'text-2xl font-semibold tracking-tight text-balance sm:text-3xl',
                  eyebrow && 'mt-2',
                )}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 text-[color:var(--color-fg-muted)]">{description}</p>
            ) : null}
          </div>
        ) : null}

        <Grid cols={cols} className={cn(title && 'mt-8')}>
          {features.map((feature) => {
            const inner = (
              <CardBody>
                {feature.icon ? (
                  <span className="inline-grid size-10 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                    <feature.icon />
                  </span>
                ) : null}
                <h3 className={cn('font-semibold tracking-tight', feature.icon && 'mt-4')}>
                  {feature.href ? (
                    <Link href={feature.href} className="after:absolute after:inset-0">
                      {feature.title}
                    </Link>
                  ) : (
                    feature.title
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                  {feature.body}
                </p>
              </CardBody>
            )
            return (
              <Card
                key={feature.title}
                className={feature.href ? 'relative' : undefined}
                interactive={feature.href ? true : undefined}
              >
                {inner}
              </Card>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}

/* ---- Numbered steps ------------------------------------------------------ */

export function StepList({
  eyebrow,
  title,
  description,
  steps,
  surface,
}: {
  eyebrow?: string
  title: string
  description?: string
  steps: { name: string; text: string }[]
  surface?: 'raised' | 'sunken'
}) {
  return (
    <Section surface={surface}>
      <Container>
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-wider text-[color:var(--color-brand)] uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={cn(
              'text-2xl font-semibold tracking-tight text-balance sm:text-3xl',
              eyebrow && 'mt-2',
            )}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-[color:var(--color-fg-muted)]">{description}</p>
          ) : null}
        </div>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.name} className="flex gap-4">
              <span
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[color:var(--color-brand)] text-sm font-semibold text-[color:var(--color-brand-fg)]"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{step.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

/* ---- Checklist ----------------------------------------------------------- */

export function CheckList({
  title,
  description,
  items,
  illustration,
  surface,
}: {
  title: string
  description?: string
  items: string[]
  illustration?: React.ReactNode
  surface?: 'raised' | 'sunken'
}) {
  return (
    <Section surface={surface}>
      <Container>
        <div className={cn('grid items-center gap-10', illustration && 'lg:grid-cols-2')}>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-[color:var(--color-fg-muted)]">{description}</p>
            ) : null}
            <ul className="mt-6 space-y-3">
              {items.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon
                    size={18}
                    className="mt-0.5 shrink-0 text-[color:var(--color-tier-endorsed)]"
                  />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {illustration ? <div>{illustration}</div> : null}
        </div>
      </Container>
    </Section>
  )
}

/* ---- FAQ ----------------------------------------------------------------- */

export function FaqSection({
  title = 'Common questions',
  faqs,
  surface,
}: {
  title?: string
  faqs: Faq[]
  surface?: 'raised' | 'sunken'
}) {
  return (
    <Section surface={surface}>
      <Container width="prose">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      {/* The rendered questions and the structured data come from one array. */}
      <JsonLd data={faqJsonLd(faqs)} />
    </Section>
  )
}

/* ---- Stats --------------------------------------------------------------- */

export function StatBand({
  stats,
  note,
}: {
  stats: { value: string; label: string }[]
  note?: string
}) {
  return (
    <Section spacing="md" surface="raised">
      <Container>
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-[color:var(--color-fg-muted)]">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        {note ? <p className="mt-6 text-xs text-[color:var(--color-fg-subtle)]">{note}</p> : null}
      </Container>
    </Section>
  )
}

/* ---- CTA ----------------------------------------------------------------- */

export function CtaBand({
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  title: string
  description?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}) {
  return (
    <Section spacing="md">
      <Container>
        <Card variant="flat" className="overflow-hidden">
          <CardBody className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                {title}
              </h2>
              {description ? (
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">{description}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button asChild>
                <Link href={primaryCta.href}>
                  {primaryCta.label} <ArrowRightIcon />
                </Link>
              </Button>
              {secondaryCta ? (
                <Button variant="outline" asChild>
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </Container>
    </Section>
  )
}

/* ---- Prose --------------------------------------------------------------- */

/** Shared typography for legal pages, help articles and long-form content. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-none space-y-4 text-[15px] leading-relaxed text-[color:var(--color-fg-muted)]',
        '[&_a]:text-[color:var(--color-brand)] [&_a]:underline [&_a]:underline-offset-4',
        '[&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[color:var(--color-fg)]',
        '[&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-[color:var(--color-fg)]',
        '[&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2',
        '[&_ol]:space-y-2 [&_ol_li]:list-decimal',
        '[&_strong]:font-semibold [&_strong]:text-[color:var(--color-fg)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
