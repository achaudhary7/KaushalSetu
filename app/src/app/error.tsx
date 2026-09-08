'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { AlertTriangleIcon } from '@/components/icons'
import { Container, Section } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

/**
 * Route-level error boundary.
 *
 * Must be a Client Component — that is the contract for error.tsx. Phase 12 replaces the
 * console call with structured server-side logging carrying a request correlation ID.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled route error:', error)
  }, [error])

  return (
    <Section spacing="lg">
      <Container width="narrow">
        <span className="inline-grid size-12 place-items-center rounded-full bg-[color:var(--color-danger-subtle)] text-[color:var(--color-danger)]">
          <AlertTriangleIcon size={24} />
        </span>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-balance">
          Something went wrong at our end.
        </h1>
        <p className="mt-3 text-[color:var(--color-fg-muted)]">
          This is our problem, not yours. Nothing you were working on has been lost — try again, and
          if it keeps happening, tell us and we will look at it.
        </p>

        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-[color:var(--color-fg-subtle)]">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Report it</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
