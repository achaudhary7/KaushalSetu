import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  SpinnerIcon,
  XCircleIcon,
} from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/* ---- Loading ------------------------------------------------------------- */

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--radius-md)] bg-[color:var(--color-surface-sunken)]',
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

export function Spinner({ size = 20, label }: { size?: number; label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-2">
      <SpinnerIcon size={size} />
      <span className={label ? 'text-sm text-[color:var(--color-fg-muted)]' : 'sr-only'}>
        {label ?? 'Loading'}
      </span>
    </span>
  )
}

/* ---- Progress ------------------------------------------------------------ */

export function Progress({
  value,
  max = 100,
  label,
  showValue,
  tone = 'brand',
  className,
}: {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  tone?: 'brand' | 'accent' | 'warning'
  className?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const fill = {
    brand: 'var(--color-brand)',
    accent: 'var(--color-tier-endorsed)',
    warning: 'var(--color-warning)',
  }[tone]

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-3 text-xs">
          {label ? <span className="text-[color:var(--color-fg-muted)]">{label}</span> : null}
          {showValue ? <span className="font-medium tabular-nums">{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      <ProgressPrimitive.Root
        value={value}
        max={max}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-surface-sunken)]"
      >
        <ProgressPrimitive.Indicator
          className="h-full rounded-full transition-[width] duration-[var(--duration-base)]"
          style={{ width: `${pct}%`, backgroundColor: fill }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

/** Circular progress. Used for profile completeness and match scores. */
export function ProgressRing({
  value,
  max = 100,
  size = 64,
  strokeWidth = 6,
  label,
  className,
}: {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  className?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className={cn('relative inline-grid place-items-center', className)}>
      <svg
        width={size}
        height={size}
        role="img"
        aria-label={label ? `${label}: ${Math.round(pct)}%` : `${Math.round(pct)}%`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--color-surface-sunken)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--color-brand)"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (pct / 100) * circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-[stroke-dashoffset] duration-[var(--duration-base)]"
        />
      </svg>
      <span className="absolute text-sm font-semibold tabular-nums">{Math.round(pct)}</span>
    </div>
  )
}

/* ---- Messages ------------------------------------------------------------ */

const alertVariants = cva('flex gap-3 rounded-[var(--radius-md)] border p-4 text-sm', {
  variants: {
    tone: {
      info: 'border-[color:var(--color-info)]/30 bg-[color:var(--color-info-subtle)] text-[color:var(--color-fg)]',
      success:
        'border-[color:var(--color-success)]/30 bg-[color:var(--color-success-subtle)] text-[color:var(--color-fg)]',
      warning:
        'border-[color:var(--color-warning)]/30 bg-[color:var(--color-warning-subtle)] text-[color:var(--color-fg)]',
      danger:
        'border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-subtle)] text-[color:var(--color-fg)]',
    },
  },
  defaultVariants: { tone: 'info' },
})

const alertIcons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  danger: XCircleIcon,
} as const

export function Alert({
  tone = 'info',
  title,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { title?: string }) {
  const IconComponent = alertIcons[tone ?? 'info']
  const iconColor = {
    info: 'text-[color:var(--color-info)]',
    success: 'text-[color:var(--color-success)]',
    warning: 'text-[color:var(--color-warning)]',
    danger: 'text-[color:var(--color-danger)]',
  }[tone ?? 'info']

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    >
      <IconComponent className={cn('mt-0.5', iconColor)} />
      <div className="flex-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={cn(title && 'mt-1', 'text-[color:var(--color-fg-muted)]')}>{children}</div>
      </div>
    </div>
  )
}

/** A quieter Alert for editorial asides in long-form content. */
export function Callout({
  icon,
  title,
  children,
  className,
}: {
  icon?: React.ReactNode
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-[var(--radius-md)] border-l-2 border-[color:var(--color-brand)]',
        'bg-[color:var(--color-surface-raised)] p-4 text-sm',
        className,
      )}
    >
      {icon ? <span className="mt-0.5 text-[color:var(--color-brand)]">{icon}</span> : null}
      <div>
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={cn(title && 'mt-1', 'text-[color:var(--color-fg-muted)]')}>{children}</div>
      </div>
    </div>
  )
}

/* ---- Empty and error states ---------------------------------------------
   Every data view in this product ships all three states: loading, empty, error.
   See docs/DESIGN-SYSTEM.md rule 7.
   ------------------------------------------------------------------------ */

export function EmptyState({
  illustration,
  title,
  description,
  action,
  className,
}: {
  illustration?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)]',
        'border border-dashed border-[color:var(--color-border-strong)] px-6 py-12 text-center',
        className,
      )}
    >
      {illustration}
      <div>
        <p className="font-medium">{title}</p>
        {description ? (
          <p className="mx-auto mt-1 max-w-sm text-sm text-[color:var(--color-fg-muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  action,
  className,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)]',
        'border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-subtle)]',
        'px-6 py-12 text-center',
        className,
      )}
    >
      <XCircleIcon size={32} className="text-[color:var(--color-danger)]" />
      <div>
        <p className="font-medium">{title}</p>
        {description ? (
          <p className="mx-auto mt-1 max-w-sm text-sm text-[color:var(--color-fg-muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
