import Link from 'next/link'

import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { absoluteUrl } from '@/config/site'
import { cn } from '@/lib/utils/cn'

/* ==========================================================================
   Breadcrumbs
   --------------------------------------------------------------------------
   Renders the visual trail AND emits BreadcrumbList structured data from the same
   data, so the two can never drift apart. Every page with a hierarchy uses this and
   gets its structured data for free - see docs/SEO-CHECKLIST.md section 3.
   ========================================================================== */

export interface Crumb {
  label: string
  /** Omit on the current page - the last crumb is not a link. */
  href?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRightIcon
                    size={14}
                    className="text-[color:var(--color-fg-subtle)]"
                    aria-hidden="true"
                  />
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)] hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="font-medium text-[color:var(--color-fg)]"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

/* ==========================================================================
   Pagination
   --------------------------------------------------------------------------
   Real <a href> links, not buttons, so paginated result pages are crawlable and
   shareable (docs/SEO-CHECKLIST.md section 1).
   ========================================================================== */

export function Pagination({
  page,
  totalPages,
  hrefFor,
  className,
}: {
  page: number
  totalPages: number
  hrefFor: (page: number) => string
  className?: string
}) {
  if (totalPages <= 1) return null

  const windowed: (number | 'gap')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      windowed.push(i)
    } else if (windowed[windowed.length - 1] !== 'gap') {
      windowed.push('gap')
    }
  }

  const linkClass = cn(
    'grid h-9 min-w-9 place-items-center rounded-[var(--radius-md)] px-2 text-sm',
    'border border-[color:var(--color-border)]',
    'hover:bg-[color:var(--color-surface-raised)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
  )

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1.5', className)}>
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" aria-label="Previous page" className={linkClass}>
          <ChevronLeftIcon size={16} />
        </Link>
      ) : null}

      {windowed.map((item, i) =>
        item === 'gap' ? (
          <span
            key={`gap-${i}`}
            className="px-1 text-[color:var(--color-fg-subtle)]"
            aria-hidden="true"
          >
            &hellip;
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              linkClass,
              item === page &&
                'border-[color:var(--color-brand)] bg-[color:var(--color-brand)] font-medium text-[color:var(--color-brand-fg)]',
            )}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" aria-label="Next page" className={linkClass}>
          <ChevronRightIcon size={16} />
        </Link>
      ) : null}
    </nav>
  )
}

/* ==========================================================================
   Stepper - onboarding wizards (Phase 4), assessments (Phase 5), posting flows (Phase 7)
   ========================================================================== */

export interface Step {
  label: string
  description?: string
}

export function Stepper({
  steps,
  current,
  className,
}: {
  steps: Step[]
  /** Zero-based index of the active step. */
  current: number
  className?: string
}) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex flex-col gap-0 sm:flex-row sm:items-start sm:gap-2">
        {steps.map((step, index) => {
          const done = index < current
          const active = index === current

          return (
            <li key={step.label} className="flex flex-1 gap-3 sm:flex-col sm:gap-2">
              <div className="flex flex-col items-center sm:w-full sm:flex-row sm:items-center">
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full border text-xs font-semibold',
                    done &&
                      'border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-[color:var(--color-brand-fg)]',
                    active &&
                      'border-[color:var(--color-brand)] text-[color:var(--color-brand)] ring-4 ring-[color:var(--color-brand-subtle)]',
                    !done &&
                      !active &&
                      'border-[color:var(--color-border-strong)] text-[color:var(--color-fg-subtle)]',
                  )}
                  aria-hidden="true"
                >
                  {done ? <CheckIcon size={14} strokeWidth={3} /> : index + 1}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    className={cn(
                      'my-1 w-px flex-1 sm:mx-2 sm:my-0 sm:h-px sm:w-auto',
                      done
                        ? 'bg-[color:var(--color-brand)]'
                        : 'bg-[color:var(--color-border-strong)]',
                    )}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="pb-6 sm:pb-0">
                <p
                  className={cn(
                    'text-sm font-medium',
                    active ? 'text-[color:var(--color-fg)]' : 'text-[color:var(--color-fg-muted)]',
                  )}
                >
                  {step.label}
                  {active ? <span className="sr-only"> (current step)</span> : null}
                  {done ? <span className="sr-only"> (completed)</span> : null}
                </p>
                {step.description ? (
                  <p className="mt-0.5 text-xs text-[color:var(--color-fg-subtle)]">
                    {step.description}
                  </p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
