import Link from 'next/link'

import { MailIcon, ShieldCheckIcon } from '@/components/icons'
import { Logo } from '@/components/Logo'
import { footerNav, live } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/cn'

/**
 * The site footer. Built exactly once, used by every page.
 *
 * Carries the things an Indian government-facing platform is expected to surface: the
 * grievance officer route, the accessibility statement, and an honest line about what this
 * platform is and who it was built for. See docs/SITEMAP.md.
 */

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'mt-auto border-t border-[color:var(--color-border)] bg-[color:var(--color-surface-raised)]',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo variant="horizontal" size="md" />
            <p className="mt-3 text-sm text-[color:var(--color-fg-muted)]">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className={cn(
                'mt-4 inline-flex items-center gap-2 text-sm',
                'text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)] hover:underline',
              )}
            >
              <MailIcon size={15} />
              {siteConfig.contact.email}
            </a>
          </div>

          {footerNav.map((group) => {
            const items = live(group.items)
            if (items.length === 0) return null
            return (
              <nav key={group.label} aria-label={group.label}>
                <h2 className="text-xs font-semibold tracking-wider text-[color:var(--color-fg)] uppercase">
                  {group.label}
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)] hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[color:var(--color-fg-subtle)]">
            © {year} {siteConfig.name}. Built for {siteConfig.context.event} problem statement{' '}
            {siteConfig.context.problemStatementId}, {siteConfig.context.ministry}.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-[color:var(--color-fg-subtle)]">
            <ShieldCheckIcon size={14} className="text-[color:var(--color-tier-endorsed)]" />
            Verified skills. Verified employers. Verifiable certificates.
          </p>
        </div>
      </div>
    </footer>
  )
}
