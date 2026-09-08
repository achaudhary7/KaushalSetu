'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { createContext, useContext, useId } from 'react'

import { AlertTriangleIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/**
 * Form field plumbing.
 *
 * `Field` owns the id, wires `aria-describedby` to the hint and error, and sets
 * `aria-invalid` - so no control has to remember to do it. Every form control in the
 * product goes inside one. See docs/DESIGN-SYSTEM.md rule 6.
 */

interface FieldContextValue {
  id: string
  hintId: string
  errorId: string
  hasError: boolean
  hasHint: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

function useField() {
  const ctx = useContext(FieldContext)
  if (!ctx) {
    throw new Error('Input, Textarea and friends must be rendered inside a <Field>.')
  }
  return ctx
}

/** Everything a control needs to be correctly described and validated. */
export function useFieldControlProps() {
  const { id, hintId, errorId, hasError, hasHint } = useField()
  const describedBy = [hasHint ? hintId : null, hasError ? errorId : null].filter(Boolean).join(' ')

  return {
    id,
    'aria-describedby': describedBy || undefined,
    'aria-invalid': hasError || undefined,
  }
}

export interface FieldProps {
  label: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
  /** Hides the label visually but keeps it for screen readers. */
  labelHidden?: boolean
}

export function Field({
  label,
  hint,
  error,
  required,
  className,
  children,
  labelHidden,
}: FieldProps) {
  const generated = useId()
  const value: FieldContextValue = {
    id: `${generated}-control`,
    hintId: `${generated}-hint`,
    errorId: `${generated}-error`,
    hasError: Boolean(error),
    hasHint: Boolean(hint),
  }

  return (
    <FieldContext.Provider value={value}>
      <div className={cn('flex flex-col gap-1.5', className)}>
        <LabelPrimitive.Root
          htmlFor={value.id}
          className={cn(
            'text-sm leading-none font-medium',
            labelHidden && 'sr-only',
            'text-[color:var(--color-fg)]',
          )}
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-[color:var(--color-danger)]" aria-hidden="true">
              *
            </span>
          ) : null}
          {required ? <span className="sr-only"> (required)</span> : null}
        </LabelPrimitive.Root>

        {children}

        {hint ? (
          <p id={value.hintId} className="text-xs text-[color:var(--color-fg-muted)]">
            {hint}
          </p>
        ) : null}

        {/* Errors are announced, associated, and carry an icon - never colour alone. */}
        {error ? (
          <p
            id={value.errorId}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-[color:var(--color-danger)]"
          >
            <AlertTriangleIcon size={14} />
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  )
}

const controlStyles = [
  'w-full rounded-[var(--radius-md)] border border-[color:var(--color-border-strong)]',
  'bg-[color:var(--color-surface)] text-[color:var(--color-fg)]',
  'placeholder:text-[color:var(--color-fg-subtle)]',
  'transition-colors duration-[var(--duration-fast)]',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
  'disabled:cursor-not-allowed disabled:opacity-60',
  'aria-[invalid=true]:border-[color:var(--color-danger)]',
]

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const fieldProps = useFieldControlProps()
  return (
    <input
      {...fieldProps}
      className={cn(controlStyles, 'h-10 px-3 text-sm', className)}
      {...props}
    />
  )
}

export function Textarea({
  className,
  rows = 4,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldProps = useFieldControlProps()
  return (
    <textarea
      {...fieldProps}
      rows={rows}
      className={cn(controlStyles, 'resize-y px-3 py-2 text-sm', className)}
      {...props}
    />
  )
}

/** Native select. Radix Select lives in ./select for the styled, searchable version. */
export function NativeSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const fieldProps = useFieldControlProps()
  return (
    <select
      {...fieldProps}
      className={cn(controlStyles, 'h-10 px-3 text-sm', className)}
      {...props}
    >
      {children}
    </select>
  )
}

export function FileInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const fieldProps = useFieldControlProps()
  return (
    <input
      {...fieldProps}
      type="file"
      className={cn(
        controlStyles,
        'p-2 text-sm',
        'file:mr-3 file:rounded-[var(--radius-sm)] file:border-0',
        'file:bg-[color:var(--color-surface-sunken)] file:px-3 file:py-1.5',
        'file:text-sm file:font-medium file:text-[color:var(--color-fg)]',
        className,
      )}
      {...props}
    />
  )
}
