import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/cn'

/**
 * Card, by composition rather than configuration - <Card><CardHeader/><CardBody/></Card>,
 * not a Card with twenty props. See docs/DESIGN-SYSTEM.md rule 3.
 */

const cardVariants = cva(
  'rounded-[var(--radius-lg)] bg-[color:var(--color-surface)] text-[color:var(--color-fg)]',
  {
    variants: {
      variant: {
        bordered: 'border border-[color:var(--color-border)]',
        raised: 'border border-[color:var(--color-border)] shadow-[var(--shadow-md)]',
        flat: 'bg-[color:var(--color-surface-raised)]',
        ghost: '',
      },
      interactive: {
        true: 'transition-shadow duration-[var(--duration-fast)] hover:shadow-[var(--shadow-lg)] focus-within:shadow-[var(--shadow-lg)]',
      },
    },
    defaultVariants: { variant: 'bordered' },
  },
)

export function Card({
  className,
  variant,
  interactive,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ variant, interactive }), className)} {...props} />
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 p-5 pb-0', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('leading-tight font-semibold tracking-tight', className)} {...props} />
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-[color:var(--color-fg-muted)]', className)} {...props} />
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border-t border-[color:var(--color-border)] p-5',
        className,
      )}
      {...props}
    />
  )
}

/**
 * The dashboard metric tile. Every number on it must trace to a documented query -
 * see docs/phases/phase-10-analytics.md.
 */
export function StatTile({
  label,
  value,
  hint,
  icon,
  trend,
  className,
}: {
  label: string
  value: React.ReactNode
  hint?: string
  icon?: React.ReactNode
  trend?: { direction: 'up' | 'down' | 'flat'; label: string }
  className?: string
}) {
  const trendColor =
    trend?.direction === 'up'
      ? 'text-[color:var(--color-success)]'
      : trend?.direction === 'down'
        ? 'text-[color:var(--color-danger)]'
        : 'text-[color:var(--color-fg-muted)]'

  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-[color:var(--color-fg-muted)]">{label}</p>
        {icon ? <span className="text-[color:var(--color-fg-subtle)]">{icon}</span> : null}
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      {trend || hint ? (
        <p className="mt-1.5 flex items-center gap-2 text-xs">
          {trend ? <span className={cn('font-medium', trendColor)}>{trend.label}</span> : null}
          {hint ? <span className="text-[color:var(--color-fg-subtle)]">{hint}</span> : null}
        </p>
      ) : null}
    </Card>
  )
}
