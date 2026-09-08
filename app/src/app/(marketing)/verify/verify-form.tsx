'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/cn'

/**
 * Certificate code lookup.
 *
 * Navigates to /verify/[code], which does the actual lookup server-side. Keeping the
 * result on its own URL means a verification can be linked to and shared — which is the
 * whole point of a public verification page.
 */

const CODE_PATTERN = /^KS-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/

export function VerifyForm({ className }: { className?: string }) {
  const router = useRouter()
  const [error, setError] = useState<string>()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const raw = new FormData(event.currentTarget).get('code')
    const code = String(raw ?? '')
      .trim()
      .toUpperCase()

    if (!code) {
      setError('Enter the code printed on the certificate')
      return
    }
    if (!CODE_PATTERN.test(code)) {
      setError('That does not look like a KaushalSetu code. They look like KS-8F2A-91DC-4B7E.')
      return
    }

    setError(undefined)
    router.push(`/verify/${code}`)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn(className)}>
      <Field
        label="Certificate code"
        hint="Printed below the QR code, or scan the QR with your phone camera."
        error={error}
      >
        <Input
          name="code"
          placeholder="KS-8F2A-91DC-4B7E"
          autoComplete="off"
          spellCheck={false}
          className="font-mono uppercase"
        />
      </Field>
      <Button type="submit" className="mt-3">
        Verify certificate
      </Button>
    </form>
  )
}
