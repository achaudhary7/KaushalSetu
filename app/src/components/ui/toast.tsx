'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import {
  AlertTriangleIcon,
  CheckCircleIcon,
  CloseIcon,
  InfoIcon,
  XCircleIcon,
} from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/**
 * Toasts.
 *
 * Hand-rolled rather than pulled from a library: the whole thing is under 120 lines, it
 * ships no extra dependency, and the announcement behaviour is exactly what we want -
 * a polite live region for confirmations, assertive for errors.
 */

export type ToastTone = 'info' | 'success' | 'warning' | 'danger'

export interface Toast {
  id: string
  title: string
  description?: string
  tone: ToastTone
}

interface ToastContextValue {
  toast: (input: Omit<Toast, 'id'> & { tone?: ToastTone }) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>.')
  return ctx
}

const toneIcon = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  danger: XCircleIcon,
} as const

const toneColor = {
  info: 'text-[color:var(--color-info)]',
  success: 'text-[color:var(--color-success)]',
  warning: 'text-[color:var(--color-warning)]',
  danger: 'text-[color:var(--color-danger)]',
} as const

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ tone = 'info', ...rest }: Omit<Toast, 'id'> & { tone?: ToastTone }) => {
      const id = crypto.randomUUID()
      setToasts((current) => [...current, { id, tone, ...rest }])
      // Errors stay long enough to be read and acted on; confirmations do not linger.
      window.setTimeout(() => dismiss(id), tone === 'danger' ? 8000 : 5000)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-4 bottom-4 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2"
        style={{ zIndex: 'var(--z-toast)' }}
      >
        {toasts.map((t) => {
          const ToneIcon = toneIcon[t.tone]
          return (
            <div
              key={t.id}
              role={t.tone === 'danger' ? 'alert' : 'status'}
              aria-live={t.tone === 'danger' ? 'assertive' : 'polite'}
              className={cn(
                'pointer-events-auto flex gap-3 rounded-[var(--radius-lg)] p-4',
                'border border-[color:var(--color-border)] bg-[color:var(--color-surface)]',
                'shadow-[var(--shadow-xl)]',
              )}
            >
              <ToneIcon className={cn('mt-0.5 shrink-0', toneColor[t.tone])} />
              <div className="flex-1 text-sm">
                <p className="font-medium">{t.title}</p>
                {t.description ? (
                  <p className="mt-0.5 text-[color:var(--color-fg-muted)]">{t.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className={cn(
                  'grid size-6 shrink-0 place-items-center rounded-[var(--radius-sm)]',
                  'text-[color:var(--color-fg-subtle)] hover:bg-[color:var(--color-surface-raised)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[color:var(--color-focus)]',
                )}
              >
                <CloseIcon size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
