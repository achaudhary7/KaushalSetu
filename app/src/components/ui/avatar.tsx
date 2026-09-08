'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils/cn'

/**
 * Avatar with a generated fallback.
 *
 * No image? We derive initials and a deterministic hue from the name, so every user has a
 * distinct, stable avatar without a single uploaded file or third-party service. Consistent
 * with the all-SVG, no-raster-assets rule.
 */

const sizes = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-lg',
  xl: 'size-20 text-2xl',
} as const

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

/** Stable hue from the name, so the same person is always the same colour. */
function hueOf(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 360
  }
  return hash
}

export function Avatar({
  name,
  src,
  size = 'md',
  className,
}: {
  name: string
  src?: string | null
  size?: keyof typeof sizes
  className?: string
}) {
  const hue = hueOf(name)

  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative inline-flex shrink-0 overflow-hidden rounded-full select-none',
        sizes[size],
        className,
      )}
    >
      {src ? <AvatarPrimitive.Image src={src} alt="" className="size-full object-cover" /> : null}
      <AvatarPrimitive.Fallback
        delayMs={src ? 300 : 0}
        className="grid size-full place-items-center font-semibold"
        style={{
          backgroundColor: `hsl(${hue} 55% 92%)`,
          color: `hsl(${hue} 60% 28%)`,
        }}
      >
        <span aria-hidden="true">{initialsOf(name)}</span>
        <span className="sr-only">{name}</span>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export function AvatarGroup({
  people,
  max = 4,
  size = 'sm',
  className,
}: {
  people: { name: string; src?: string | null }[]
  max?: number
  size?: keyof typeof sizes
  className?: string
}) {
  const shown = people.slice(0, max)
  const overflow = people.length - shown.length

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {shown.map((person) => (
        <Avatar
          key={person.name}
          name={person.name}
          src={person.src}
          size={size}
          className="ring-2 ring-[color:var(--color-surface)]"
        />
      ))}
      {overflow > 0 ? (
        <span
          className={cn(
            'grid place-items-center rounded-full font-medium',
            'bg-[color:var(--color-surface-sunken)] text-[color:var(--color-fg-muted)]',
            'ring-2 ring-[color:var(--color-surface)]',
            sizes[size],
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  )
}
