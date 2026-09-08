import type { Metadata } from 'next'

import { QrCodeIcon, ShieldCheckIcon } from '@/components/icons'
import { VerificationScene } from '@/components/illustrations'
import { Container, Grid, Section } from '@/components/layout/container'
import { CheckList, Hero, Prose } from '@/components/marketing/sections'
import { Card, CardBody } from '@/components/ui/card'
import { Alert } from '@/components/ui/feedback'
import { buildMetadata } from '@/lib/seo/metadata'

import { VerifyForm } from './verify-form'

/**
 * The public certificate verification entry point.
 *
 * This page is indexable — a recruiter searching "verify KaushalSetu certificate" should
 * land here. Individual /verify/[code] pages are noindex, because they are personal
 * records. See docs/SITEMAP.md.
 */

export const metadata: Metadata = buildMetadata({
  title: 'Verify a certificate',
  description:
    'Check any KaushalSetu internship or completion certificate in seconds. Enter the code or scan the QR — no account needed, and revoked certificates show as revoked.',
  path: '/verify',
})

export default function VerifyPage() {
  return (
    <>
      <Hero
        eyebrow="Certificate verification"
        title="Check a certificate in five seconds."
        description="Every certificate issued through KaushalSetu carries a unique code and a QR. Scan it, or type the code below. No account, no login, no phone call to the company."
        illustration={<VerificationScene title="A certificate resolving to a verification page" />}
      >
        <VerifyForm className="mt-8 max-w-md" />
      </Hero>

      <Section surface="raised">
        <Container>
          <Grid cols={2}>
            <Card>
              <CardBody>
                <span className="inline-grid size-10 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                  <QrCodeIcon />
                </span>
                <h2 className="mt-4 font-semibold tracking-tight">What you will see</h2>
                <Prose className="mt-2">
                  <p>
                    The issuing company, the recipient, the dates, the skills demonstrated, and
                    whether the certificate is currently valid or has been revoked. Revocations show
                    immediately, with the reason the issuer gave.
                  </p>
                </Prose>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <span className="inline-grid size-10 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-success-subtle)] text-[color:var(--color-tier-endorsed)]">
                  <ShieldCheckIcon />
                </span>
                <h2 className="mt-4 font-semibold tracking-tight">Why this exists</h2>
                <Prose className="mt-2">
                  <p>
                    Fake internship certificates are a real and widely reported problem. They work
                    because a recruiter holding a printed certificate has no practical way to check
                    it. This removes that gap — the certificate points back at a page the issuing
                    company controls.
                  </p>
                </Prose>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Section>

      <CheckList
        title="For employers issuing certificates"
        description="Issued through the platform, verifiable by anyone, and revocable by you."
        items={[
          'Issue from the completion record — no separate design or document handling',
          'Each certificate gets a unique code and QR pointing at its verification page',
          'Your verified badge appears on the certificate and on the verification page',
          'Revoke at any time, with a reason that shows publicly',
          'Every verification attempt is logged, so you can see when a certificate was checked',
        ]}
      />

      <Section spacing="md">
        <Container width="prose">
          <Alert tone="info" title="Not yet issuing certificates">
            Certificate issuance and verification land in Phase 8 of the build. This page and the
            lookup work; there are no certificates in the system to look up yet. We would rather
            show you the mechanism honestly than fake a result.
          </Alert>
        </Container>
      </Section>
    </>
  )
}
