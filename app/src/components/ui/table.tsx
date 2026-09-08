import { cn } from '@/lib/utils/cn'

/**
 * Data table.
 *
 * Wrapped in an overflow-x container so a wide table scrolls inside itself rather than
 * making the whole page scroll sideways - see docs/PERFORMANCE.md and the responsive rule.
 * For genuinely dense tables on mobile, render a card list instead; a squeezed table is
 * worse than a different layout.
 */

export function TableWrapper({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border)]',
        className,
      )}
      {...props}
    />
  )
}

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn('w-full border-collapse text-sm', className)} {...props} />
}

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        'sticky top-0 bg-[color:var(--color-surface-raised)] text-left',
        'border-b border-[color:var(--color-border)]',
        className,
      )}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('divide-y divide-[color:var(--color-border)]', className)} {...props} />
  )
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'transition-colors duration-[var(--duration-fast)] hover:bg-[color:var(--color-surface-raised)]',
        className,
      )}
      {...props}
    />
  )
}

export function TableHeaderCell({
  className,
  sortable,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { sortable?: boolean }) {
  return (
    <th
      scope="col"
      className={cn(
        'px-4 py-3 text-xs font-semibold tracking-wide text-[color:var(--color-fg-muted)] uppercase',
        sortable && 'cursor-pointer select-none hover:text-[color:var(--color-fg)]',
        className,
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3 align-middle', className)} {...props} />
}

export function TableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn('px-4 py-3 text-left text-sm text-[color:var(--color-fg-muted)]', className)}
      {...props}
    />
  )
}
