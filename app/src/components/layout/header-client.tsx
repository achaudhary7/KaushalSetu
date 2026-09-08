'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ChevronDownIcon, MenuIcon } from '@/components/icons'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/overlay'
import { live, type NavGroup, type NavItem } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

import { ThemeToggle } from './theme'

/**
 * The interactive islands of the header.
 *
 * Kept separate from header.tsx so the header shell stays a Server Component and marketing
 * pages ship only this small amount of JavaScript. See docs/ARCHITECTURE.md - "server-first".
 */

/** Desktop grouped menu. Real links inside, so every destination is crawlable. */
export function NavDropdown({ group }: { group: NavGroup }) {
  const items = live(group.items)
  if (items.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'group inline-flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium',
          'text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
        )}
      >
        {group.label}
        <ChevronDownIcon
          size={15}
          className="transition-transform duration-[var(--duration-fast)] group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className="flex-col items-start gap-0.5">
              <span className="font-medium">{item.label}</span>
              {item.description ? (
                <span className="text-xs text-[color:var(--color-fg-muted)]">
                  {item.description}
                </span>
              ) : null}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MobileNav({ groups, primary }: { groups: NavGroup[]; primary: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const primaryLive = live(primary)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent title="Menu" description="Navigate KaushalSetu">
        <div className="flex flex-col gap-6">
          {groups.map((group) => {
            const items = live(group.items)
            if (items.length === 0) return null
            return (
              <div key={group.label}>
                <p className="mb-2 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {items.map((item) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className="block rounded-[var(--radius-md)] px-2 py-2 text-sm hover:bg-[color:var(--color-surface-raised)]"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {primaryLive.length > 0 ? (
            <ul className="flex flex-col gap-0.5 border-t border-[color:var(--color-border)] pt-4">
              {primaryLive.map((item) => (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block rounded-[var(--radius-md)] px-2 py-2 text-sm hover:bg-[color:var(--color-surface-raised)]"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex flex-col gap-2 border-t border-[color:var(--color-border)] pt-4">
            <Button variant="outline" block asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button block asChild>
              <Link href="/register">Get started</Link>
            </Button>
          </div>

          <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-4">
            <span className="text-sm text-[color:var(--color-fg-muted)]">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function MobileLogo() {
  return <Logo variant="horizontal" size="sm" className="lg:hidden" labelled={false} />
}
