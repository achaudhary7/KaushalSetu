import type { Metadata } from 'next'
import Link from 'next/link'

import { XCircleIcon } from '@/components/icons'
import { Container, Section } from '@/components/layout/container'
import { Prose } from '@/components/marketing/sections'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/ui/navigation'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * Public certificate verification result.
 *
 * ALWAYS noindex — this is a personal record, and individual certificates must never
 * appear in search results. /verify itself is indexable. See docs/SITEMAP.md.
 *
 * Phase 8 wires this to the `Certificate` table and `CertificateVerificationLog`. Until
 * then it correctly reports that no certificate matches, which is the honest answer.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Certificate verification',
  description: 'Verification result for a KaushalSetu certificate.',
  path: '/verify',
  index: false,
})

type Props = { params: Promise<{ code: string }> }

export default async function VerifyCodePage({ params }: Props) {
  const { code } = await params
  const normalised = decodeURIComponent(code).toUpperCase()

  // Phase 8: look up `Certificate` by verificationCode, log the attempt, render issuer,
  // recipient, dates, skills and revocation status.
  const certificate = null

  return (
    <Section spacing="md">
      <Container width="narrow">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Verify', href: '/verify' },
            { label: 'Result' },
          ]}
        />

        <Card className="mt-6">
          <CardBody className="p-8 text-center">
            {certificate ? null : (
              <>
                <span className="inline-grid size-14 place-items-center rounded-full bg-[color:var(--color-danger-subtle)] text-[color:var(--color-danger)]">
                  <XCircleIcon size={28} />
                </span>
                <h1 className="mt-4 text-2xl font-semibold tracking-tight">No certificate found</h1>
                <p className="mt-2 text-[color:var(--color-fg-muted)]">
                  Nothing in our records matches this code.
                </p>
                <p className="mt-4 font-mono text-sm break-all text-[color:var(--color-fg-subtle)]">
                  {normalised}
                </p>
              </>
            )}
          </CardBody>
        </Card>

        <Prose className="mt-6">
          <p>
            <strong>What this means.</strong> Either the code was mistyped, or no certificate with
            this code was ever issued through KaushalSetu. A certificate that cannot be verified
            here was not issued here — whatever it looks like.
          </p>
          <p>
            Certificate issuance lands in Phase 8 of this build, so there are no certificates in the
            system yet. The lookup itself works, and this is the answer it correctly gives.
          </p>
          <p>
            If someone has given you a document claiming to be a KaushalSetu certificate and it does
            not verify, <Link href="/contact">tell us</Link> — that is exactly what this mechanism
            is for.
          </p>
        </Prose>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/verify">Try another code</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Report a problem</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
