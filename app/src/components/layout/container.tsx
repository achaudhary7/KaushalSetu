import { cn } from '@/lib/utils/cn'

import { Breadcrumbs, type Crumb } from '@/components/ui/navigation'

/**
 * Spacing and width primitives.
 *
 * These exist so no page invents its own max-width or vertical rhythm. If a layout needs
 * something different, that is a conversation about the design system, not a one-off
 * className on a page.
 */

const widths = {
  /** Long-form reading: articles, legal pages, policy text. */
  prose: 'max-w-3xl',
  /** Focused flows: forms, auth, onboarding steps. */
  narrow: 'max-w-4xl',
  /** The default for marketing and dashboard content. */
  default: 'max-w-7xl',
  /** Full-bleed dashboards and data tables. */
  wide: 'max-w-screen-2xl',
} as const

export function Container({
  width = 'default',
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { width?: keyof typeof widths }) {
  return (
    <div
      className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', widths[width], className)}
      {...props}
    />
  )
}

const spacing = {
  sm: 'py-8 sm:py-10',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
} as const

export function Section({
  spacing: space = 'lg',
  surface,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  spacing?: keyof typeof spacing
  surface?: 'raised' | 'sunken'
}) {
  return (
    <section
      className={cn(
        spacing[space],
        surface === 'raised' && 'bg-[color:var(--color-surface-raised)]',
        surface === 'sunken' && 'bg-[color:var(--color-surface-sunken)]',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/** Page title block. Every content page opens with one, so headings stay consistent. */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: {
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-[color:var(--color-fg-muted)]">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  )
}

/** Responsive grid with a sane default. Avoids each page re-deriving column counts. */
export function Grid({
  cols = 3,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { cols?: 2 | 3 | 4 }) {
  const map = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }
  return <div className={cn('grid grid-cols-1 gap-5', map[cols], className)} {...props} />
}
