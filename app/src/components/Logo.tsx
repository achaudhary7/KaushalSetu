import { cn } from '@/lib/utils/cn'

/**
 * The KaushalSetu mark.
 *
 * A bridge span that rises left to right, with two pylons and a node at its high end.
 * It reads two ways on purpose: a setu (bridge) between academia and industry, and an
 * ascending trajectory - the student's skill growth ending at a destination.
 *
 * Built from four strokes so it survives at 16px. Colour comes from design tokens, so it
 * themes for free and inverts correctly on dark backgrounds.
 */

type LogoVariant = 'horizontal' | 'stacked' | 'mark'
type LogoTone = 'brand' | 'mono' | 'inverse'

const markSizes = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
} as const

interface LogoProps {
  variant?: LogoVariant
  size?: keyof typeof markSizes
  /** `mono` and `inverse` use currentColor throughout - for print, favicons and dark bands. */
  tone?: LogoTone
  className?: string
  /** Set false when the logo sits inside a link that already has an accessible name. */
  labelled?: boolean
}

function Mark({ size, tone }: { size: number; tone: LogoTone }) {
  const span = tone === 'brand' ? 'var(--color-brand)' : 'currentColor'
  const accent = tone === 'brand' ? 'var(--color-tier-endorsed)' : 'currentColor'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* the bank the bridge crosses */}
      <path d="M3 27h26" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      {/* the rising span */}
      <path
        d="M5 27C5 15.5 11.5 8.5 26.5 6.5"
        stroke={span}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* pylons - what makes it read as a bridge rather than a line chart */}
      <path d="M11.5 27v-9.2" stroke={span} strokeWidth="2" strokeLinecap="round" />
      <path d="M19 27v-13.4" stroke={span} strokeWidth="2" strokeLinecap="round" />
      {/* the destination */}
      <circle cx="27" cy="6.2" r="3.2" fill={accent} />
    </svg>
  )
}

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('leading-none tracking-tight', className)}>
      <span className="font-medium">Kaushal</span>
      <span className="font-bold">Setu</span>
    </span>
  )
}

export function Logo({
  variant = 'horizontal',
  size = 'md',
  tone = 'brand',
  className,
  labelled = true,
}: LogoProps) {
  const px = markSizes[size]

  const wordmarkSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-3xl',
  }[size]

  if (variant === 'mark') {
    return (
      <span
        className={cn('inline-flex', className)}
        role={labelled ? 'img' : undefined}
        aria-label={labelled ? 'KaushalSetu' : undefined}
      >
        <Mark size={px} tone={tone} />
      </span>
    )
  }

  if (variant === 'stacked') {
    return (
      <span
        className={cn('inline-flex flex-col items-center gap-1.5', className)}
        role={labelled ? 'img' : undefined}
        aria-label={labelled ? 'KaushalSetu' : undefined}
      >
        <Mark size={px} tone={tone} />
        <Wordmark className={wordmarkSize} />
      </span>
    )
  }

  return (
    <span
      className={cn('inline-flex items-center gap-2.5', className)}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? 'KaushalSetu' : undefined}
    >
      <Mark size={px} tone={tone} />
      <Wordmark className={wordmarkSize} />
    </span>
  )
}
