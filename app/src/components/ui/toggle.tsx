'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { CheckIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/**
 * Binary and range controls, on Radix behaviour with our styling.
 *
 * Each carries its own label so the whole control is one click target and one tab stop -
 * they do not need the <Field> wrapper that text inputs use.
 */

export function Checkbox({
  label,
  description,
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: string
  description?: string
}) {
  return (
    <label className={cn('group flex cursor-pointer items-start gap-2.5', className)}>
      <CheckboxPrimitive.Root
        className={cn(
          'mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[var(--radius-sm)]',
          'border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]',
          'transition-colors duration-[var(--duration-fast)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
          'data-[state=checked]:border-[color:var(--color-brand)] data-[state=checked]:bg-[color:var(--color-brand)]',
          'data-[state=indeterminate]:border-[color:var(--color-brand)] data-[state=indeterminate]:bg-[color:var(--color-brand)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-[color:var(--color-brand-fg)]">
          <CheckIcon size={13} strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label ? (
        <span className="text-sm leading-snug">
          <span className="text-[color:var(--color-fg)]">{label}</span>
          {description ? (
            <span className="block text-xs text-[color:var(--color-fg-muted)]">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  )
}

export function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn('flex flex-col gap-2', className)} {...props} />
}

export function Radio({
  label,
  description,
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  label?: string
  description?: string
}) {
  return (
    <label className={cn('flex cursor-pointer items-start gap-2.5', className)}>
      <RadioGroupPrimitive.Item
        className={cn(
          'mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full',
          'border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]',
          'transition-colors duration-[var(--duration-fast)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
          'data-[state=checked]:border-[color:var(--color-brand)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-[color:var(--color-brand)]" />
      </RadioGroupPrimitive.Item>
      {label ? (
        <span className="text-sm leading-snug">
          <span className="text-[color:var(--color-fg)]">{label}</span>
          {description ? (
            <span className="block text-xs text-[color:var(--color-fg-muted)]">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  )
}

export function Switch({
  label,
  description,
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: string
  description?: string
}) {
  return (
    <label className={cn('flex cursor-pointer items-start gap-3', className)}>
      <SwitchPrimitive.Root
        className={cn(
          'relative mt-0.5 h-5 w-9 shrink-0 rounded-full',
          'border border-transparent bg-[color:var(--color-neutral-300)]',
          'transition-colors duration-[var(--duration-fast)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
          'data-[state=checked]:bg-[color:var(--color-brand)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'block size-4 rounded-full bg-white shadow-[var(--shadow-sm)]',
            'transition-transform duration-[var(--duration-fast)]',
            'translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[18px]',
          )}
        />
      </SwitchPrimitive.Root>
      {label ? (
        <span className="text-sm leading-snug">
          <span className="text-[color:var(--color-fg)]">{label}</span>
          {description ? (
            <span className="block text-xs text-[color:var(--color-fg-muted)]">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  )
}

export function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none items-center select-none', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-[color:var(--color-surface-sunken)]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-[color:var(--color-brand)]" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block size-4 rounded-full border-2 border-[color:var(--color-brand)]',
          'bg-[color:var(--color-surface)] shadow-[var(--shadow-sm)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
        )}
      />
    </SliderPrimitive.Root>
  )
}
