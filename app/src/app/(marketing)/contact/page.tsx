import type { Metadata } from 'next'

import { MailIcon, ShieldCheckIcon, UsersIcon } from '@/components/icons'
import { Container, Grid, Section } from '@/components/layout/container'
import { Hero } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { Card, CardBody } from '@/components/ui/card'
import { Alert } from '@/components/ui/feedback'
import { siteConfig } from '@/config/site'
import { contactPageJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

import { ContactForm } from './contact-form'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch about piloting KaushalSetu at your institution, posting opportunities as an employer, reporting a listing, or anything else.',
  path: '/contact',
})

const routes = [
  {
    icon: UsersIcon,
    title: 'Institutions and employers',
    body: 'Piloting the platform, posting opportunities, or getting your organisation verified.',
    email: siteConfig.contact.email,
  },
  {
    icon: MailIcon,
    title: 'Students and faculty',
    body: 'Account questions, assessment issues, or anything that is not working as it should.',
    email: siteConfig.contact.support,
  },
  {
    icon: ShieldCheckIcon,
    title: 'Grievances and security',
    body: 'Formal grievances go to our named officer; security issues go to the disclosure address.',
    email: siteConfig.contact.grievance,
  },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />

      <Hero
        eyebrow="Contact"
        title="Talk to us."
        description="Whether you want to pilot this at an institution, post as an employer, or tell us something is broken — this reaches a person."
      />

      <Section spacing="sm">
        <Container>
          <Grid cols={3}>
            {routes.map((route) => (
              <Card key={route.title}>
                <CardBody>
                  <span className="inline-grid size-10 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                    <route.icon />
                  </span>
                  <h2 className="mt-4 font-semibold tracking-tight">{route.title}</h2>
                  <p className="mt-1.5 text-sm text-[color:var(--color-fg-muted)]">{route.body}</p>
                  <a
                    href={`mailto:${route.email}`}
                    className="mt-3 inline-block text-sm text-[color:var(--color-brand)] underline underline-offset-4"
                  >
                    {route.email}
                  </a>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section spacing="md" surface="raised">
        <Container width="narrow">
          <h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2>
          <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
            We read everything. Reporting a suspicious listing? Include the URL and we will look at
            it the same day.
          </p>

          <Alert tone="info" className="mt-5">
            This form validates and confirms, but does not yet deliver — email sending arrives with
            authentication in Phase 4. Until then please use the addresses above, which do work.
          </Alert>

          <ContactForm className="mt-6" />
        </Container>
      </Section>
    </>
  )
}
