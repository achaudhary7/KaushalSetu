import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { audienceNav, exploreNav, live, primaryNav } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

import { MobileNav, NavDropdown } from './header-client'
import { ThemeToggle } from './theme'

/**
 * The site header. Built exactly once, used by every page.
 *
 * A Server Component shell with three small client islands (the grouped menus, the mobile
 * sheet, the theme toggle). The links themselves are real anchors rendered on the server,
 * so navigation is fully crawlable with JavaScript disabled.
 */

export function Header({ className }: { className?: string }) {
  const primary = live(primaryNav)

  return (
    <header
      className={cn(
        'sticky top-0 border-b border-[color:var(--color-border)]',
        'bg-[color:var(--color-surface)]/85 backdrop-blur-md',
        className,
      )}
      style={{ zIndex: 'var(--z-sticky)' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-focus)]"
          aria-label="KaushalSetu, home"
        >
          <Logo variant="horizontal" size="md" labelled={false} />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-0.5 lg:flex">
          <NavDropdown group={audienceNav} />
          <NavDropdown group={exploreNav} />
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium',
                'text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Get started</Link>
            </Button>
          </div>
          <MobileNav groups={[audienceNav, exploreNav]} primary={primaryNav} />
        </div>
      </div>
    </header>
  )
}
