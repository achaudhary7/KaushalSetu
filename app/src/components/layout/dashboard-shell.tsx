'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  BellIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from '@/components/icons'
import { Logo } from '@/components/Logo'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/overlay'
import { type NavGroup } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

import { ThemeToggle } from './theme'

/**
 * The authenticated application shell: role-aware sidebar plus a topbar.
 *
 * Phases 5-11 render their pages inside this. The nav groups come from
 * `dashboardNav[role]` in config/navigation.ts, so adding a dashboard route is a
 * config change, not a layout change.
 */

export interface DashboardUser {
  name: string
  email: string
  roleLabel: string
  avatarUrl?: string | null
}

function SidebarNav({ groups, onNavigate }: { groups: NavGroup[]; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 px-2.5 text-[11px] font-semibold tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
            {group.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between gap-2 rounded-[var(--radius-md)] px-2.5 py-2 text-sm',
                      'transition-colors duration-[var(--duration-fast)]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
                      active
                        ? 'bg-[color:var(--color-brand-subtle)] font-medium text-[color:var(--color-brand)]'
                        : 'text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-surface-raised)] hover:text-[color:var(--color-fg)]',
                    )}
                  >
                    {item.label}
                    {item.planned ? (
                      <Badge size="sm" variant="neutral">
                        Soon
                      </Badge>
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function DashboardShell({
  groups,
  user,
  notificationCount = 0,
  children,
}: {
  groups: NavGroup[]
  user: DashboardUser
  notificationCount?: number
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-dvh flex-col bg-[color:var(--color-surface-sunken)]">
      {/* Topbar */}
      <header
        className="sticky top-0 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <div className="flex h-14 items-center gap-3 px-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open navigation"
                className="lg:hidden"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" title="Navigation" description={user.roleLabel}>
              <SidebarNav groups={groups} onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link href="/" aria-label="KaushalSetu, home" className="shrink-0">
            <Logo variant="horizontal" size="sm" labelled={false} />
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon-sm" aria-label="Search">
              <SearchIcon />
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={
                notificationCount > 0
                  ? `Notifications, ${notificationCount} unread`
                  : 'Notifications'
              }
              className="relative"
            >
              <BellIcon />
              {notificationCount > 0 ? (
                <span
                  className="absolute top-1 right-1 size-2 rounded-full bg-[color:var(--color-danger)]"
                  aria-hidden="true"
                />
              ) : null}
            </Button>

            <ThemeToggle className="hidden sm:inline-flex" />

            <DropdownMenu>
              <DropdownMenuTrigger
                className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                aria-label="Account menu"
              >
                <Avatar name={user.name} src={user.avatarUrl} size="sm" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <span className="block font-medium text-[color:var(--color-fg)]">
                    {user.name}
                  </span>
                  <span className="block truncate">{user.email}</span>
                  <Badge size="sm" variant="brand" className="mt-1.5">
                    {user.roleLabel}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - desktop only; mobile uses the sheet above */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 lg:block">
          <SidebarNav groups={groups} />
        </aside>

        <main id="main" className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
