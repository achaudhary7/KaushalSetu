'use client'

import * as SelectPrimitive from '@radix-ui/react-select'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'
import { useFieldControlProps } from './input'

/**
 * Styled select on Radix.
 *
 * Use `NativeSelect` from ./input for simple cases - it is smaller, works without
 * JavaScript, and is better on mobile. Reach for this one when the options need
 * icons, descriptions or grouping.
 */

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  const fieldProps = useFieldControlProps()
  return (
    <SelectPrimitive.Trigger
      {...fieldProps}
      className={cn(
        'flex h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-md)] px-3',
        'border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]',
        'text-sm text-[color:var(--color-fg)]',
        'data-[placeholder]:text-[color:var(--color-fg-subtle)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'aria-[invalid=true]:border-[color:var(--color-danger)]',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDownIcon size={16} className="text-[color:var(--color-fg-muted)]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={6}
        className={cn(
          'relative max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden',
          'rounded-[var(--radius-md)] border border-[color:var(--color-border)]',
          'bg-[color:var(--color-surface)] shadow-[var(--shadow-xl)]',
          className,
        )}
        style={{ zIndex: 'var(--z-dropdown)' }}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="grid h-6 place-items-center">
          <ChevronUpIcon size={14} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="grid h-6 place-items-center">
          <ChevronDownIcon size={14} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({
  className,
  children,
  description,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & { description?: string }) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex cursor-pointer flex-col rounded-[var(--radius-sm)] py-2 pr-8 pl-2.5',
        'text-sm outline-none select-none',
        'data-[highlighted]:bg-[color:var(--color-surface-raised)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      {description ? (
        <span className="mt-0.5 text-xs text-[color:var(--color-fg-muted)]">{description}</span>
      ) : null}
      <SelectPrimitive.ItemIndicator className="absolute top-2.5 right-2.5">
        <CheckIcon size={15} className="text-[color:var(--color-brand)]" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        'px-2.5 py-1.5 text-xs font-medium text-[color:var(--color-fg-subtle)]',
        className,
      )}
      {...props}
    />
  )
}
