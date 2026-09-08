'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

import { MonitorIcon, MoonIcon, SunIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/**
 * Theming.
 *
 * next-themes writes `data-theme` on <html> before first paint, which is why globals.css
 * declares the dark palette against both `[data-theme='dark']` and the OS media query -
 * the toggle wins in both directions, and there is no flash of the wrong theme.
 */

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

const options = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'system', label: 'System', Icon: MonitorIcon },
] as const

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-[color:var(--color-border)] p-0.5',
        className,
      )}
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              'grid size-7 place-items-center rounded-full',
              'transition-colors duration-[var(--duration-fast)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
              active
                ? 'bg-[color:var(--color-surface-sunken)] text-[color:var(--color-fg)]'
                : 'text-[color:var(--color-fg-subtle)] hover:text-[color:var(--color-fg)]',
            )}
          >
            <Icon size={15} />
          </button>
        )
      })}
    </div>
  )
}
