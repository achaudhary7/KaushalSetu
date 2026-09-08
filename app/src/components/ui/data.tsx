import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { StarIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

export function Separator({
  className,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'bg-[color:var(--color-border)]',
        'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
        'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Timeline. Used for application status trails (Phase 7), internship milestones,
 * and audit history. Each entry is a real state change, not decoration.
 */
export interface TimelineEntry {
  title: string
  description?: string
  timestamp?: string
  state?: 'done' | 'current' | 'upcoming' | 'failed'
}

export function Timeline({ entries, className }: { entries: TimelineEntry[]; className?: string }) {
  const dotColor = {
    done: 'bg-[color:var(--color-success)]',
    current: 'bg-[color:var(--color-brand)] ring-4 ring-[color:var(--color-brand-subtle)]',
    upcoming: 'bg-[color:var(--color-border-strong)]',
    failed: 'bg-[color:var(--color-danger)]',
  }

  return (
    <ol className={cn('relative flex flex-col', className)}>
      {entries.map((entry, index) => {
        const state = entry.state ?? 'done'
        const isLast = index === entries.length - 1

        return (
          <li key={`${entry.title}-${index}`} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className={cn('mt-1.5 size-2.5 shrink-0 rounded-full', dotColor[state])}
                aria-hidden="true"
              />
              {!isLast ? (
                <span className="w-px flex-1 bg-[color:var(--color-border)]" aria-hidden="true" />
              ) : null}
            </div>
            <div className={cn('flex-1', !isLast && 'pb-5')}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p
                  className={cn(
                    'text-sm font-medium',
                    state === 'upcoming' && 'text-[color:var(--color-fg-muted)]',
                  )}
                >
                  {entry.title}
                </p>
                {entry.timestamp ? (
                  <time className="font-mono text-xs text-[color:var(--color-fg-subtle)]">
                    {entry.timestamp}
                  </time>
                ) : null}
              </div>
              {entry.description ? (
                <p className="mt-0.5 text-sm text-[color:var(--color-fg-muted)]">
                  {entry.description}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/** Read-only rating display - mentor feedback, employer ratings. */
export function Rating({
  value,
  max = 5,
  size = 16,
  label,
  className,
}: {
  value: number
  max?: number
  size?: number
  label?: string
  className?: string
}) {
  return (
    <span
      className={cn('inline-flex items-center gap-0.5', className)}
      role="img"
      aria-label={label ?? `${value} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <StarIcon
          key={i}
          size={size}
          className={
            i < Math.round(value)
              ? 'fill-[color:var(--color-highlight-500)] text-[color:var(--color-highlight-500)]'
              : 'text-[color:var(--color-border-strong)]'
          }
        />
      ))}
      <span className="ml-1.5 text-xs font-medium tabular-nums">{value.toFixed(1)}</span>
    </span>
  )
}
