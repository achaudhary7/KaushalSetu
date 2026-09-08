import Link from 'next/link'

import { NotFoundScene } from '@/components/illustrations'
import { Container, Section } from '@/components/layout/container'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'

/**
 * 404.
 *
 * Lives at the app root rather than inside (marketing), so it also catches unmatched
 * top-level URLs — which means it has to render its own Header and Footer.
 *
 * Next returns a real 404 status with this page, which matters: an error page served as
 * 200 is a soft 404 and pollutes the index (docs/SEO-CHECKLIST.md section 11).
 */
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Section spacing="lg">
          <Container width="narrow">
            <div className="grid items-center gap-10 sm:grid-cols-2">
              <div>
                <p className="font-mono text-sm text-[color:var(--color-fg-subtle)]">404</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  This bridge has a gap in it.
                </h1>
                <p className="mt-3 text-[color:var(--color-fg-muted)]">
                  The page you asked for does not exist — it may have moved, or the link may have
                  been mistyped. Here is the way back.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/">Go home</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/opportunities">Browse opportunities</Link>
                  </Button>
                </div>

                <nav aria-label="Popular pages" className="mt-8">
                  <p className="text-xs font-semibold tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                    Popular
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {[
                      { label: 'Career paths', href: '/careers' },
                      { label: 'Skills and free courses', href: '/skills' },
                      { label: 'Ayush careers', href: '/ayush' },
                      { label: 'Verify a certificate', href: '/verify' },
                      { label: 'Full sitemap', href: '/sitemap' },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[color:var(--color-fg-muted)] underline-offset-4 hover:text-[color:var(--color-fg)] hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <NotFoundScene />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
