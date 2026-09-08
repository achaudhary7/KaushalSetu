'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { ChevronDownIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/* ---- Tabs ---------------------------------------------------------------- */

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex items-center gap-1 border-b border-[color:var(--color-border)]',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'relative -mb-px px-3.5 py-2.5 text-sm font-medium whitespace-nowrap',
        'border-b-2 border-transparent text-[color:var(--color-fg-muted)]',
        'transition-colors duration-[var(--duration-fast)]',
        'hover:text-[color:var(--color-fg)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
        'data-[state=active]:border-[color:var(--color-brand)] data-[state=active]:text-[color:var(--color-brand)]',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'pt-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
        className,
      )}
      {...props}
    />
  )
}

/* ---- Accordion ----------------------------------------------------------- */

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-[color:var(--color-border)]', className)}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center justify-between gap-4 py-4 text-left',
          'text-[15px] font-medium',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={cn(
            'shrink-0 text-[color:var(--color-fg-muted)]',
            'transition-transform duration-[var(--duration-fast)]',
            'group-data-[state=open]:rotate-180',
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn('overflow-hidden text-sm text-[color:var(--color-fg-muted)]', className)}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}
