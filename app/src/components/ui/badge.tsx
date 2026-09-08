import { cva, type VariantProps } from 'class-variance-authority'

import { BadgeCheckIcon, CheckIcon, CloseIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral:
          'bg-[color:var(--color-surface-sunken)] text-[color:var(--color-fg-muted)] border border-[color:var(--color-border)]',
        brand: 'bg-[color:var(--color-brand-subtle)] text-[color:var(--color-brand)]',
        success: 'bg-[color:var(--color-success-subtle)] text-[color:var(--color-success)]',
        warning: 'bg-[color:var(--color-warning-subtle)] text-[color:var(--color-warning)]',
        danger: 'bg-[color:var(--color-danger-subtle)] text-[color:var(--color-danger)]',
        info: 'bg-[color:var(--color-info-subtle)] text-[color:var(--color-info)]',
        outline: 'border border-[color:var(--color-border-strong)] text-[color:var(--color-fg)]',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px] [&_svg]:size-3',
        md: 'px-2.5 py-1 text-xs [&_svg]:size-3.5',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md' },
  },
)

export function Badge({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

/** A badge that can be dismissed - used for active filters and selected skills. */
export function Chip({
  children,
  onRemove,
  removeLabel,
  className,
}: {
  children: React.ReactNode
  onRemove?: () => void
  removeLabel?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border-strong)]',
        'bg-[color:var(--color-surface)] py-1 pr-1 pl-3 text-xs font-medium',
        className,
      )}
    >
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ?? `Remove ${String(children)}`}
          className={cn(
            'grid size-4 place-items-center rounded-full',
            'text-[color:var(--color-fg-subtle)] hover:bg-[color:var(--color-surface-sunken)]',
            'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[color:var(--color-focus)]',
          )}
        >
          <CloseIcon size={11} />
        </button>
      ) : null}
    </span>
  )
}

/* ==========================================================================
   Skill verification badge
   --------------------------------------------------------------------------
   The three tiers are the product's credibility mechanism (ADR-006). They must be
   distinguishable at a glance AND in greyscale print, which is why each tier differs
   in icon and border weight as well as colour - never colour alone.
   ========================================================================== */

export type VerificationTier = 'SELF_DECLARED' | 'ASSESSMENT_VERIFIED' | 'EMPLOYER_ENDORSED'

export const tierMeta: Record<
  VerificationTier,
  { label: string; short: string; description: string }
> = {
  SELF_DECLARED: {
    label: 'Self-declared',
    short: 'Self',
    description: 'Added by the student. Not independently checked.',
  },
  ASSESSMENT_VERIFIED: {
    label: 'Assessment-verified',
    short: 'Verified',
    description: 'Earned through a KaushalSetu assessment. Links to the attempt and score.',
  },
  EMPLOYER_ENDORSED: {
    label: 'Employer-endorsed',
    short: 'Endorsed',
    description: 'Vouched for by a verified company after an internship or project.',
  },
}

export function SkillBadge({
  skill,
  tier,
  proficiency,
  endorsedBy,
  className,
}: {
  skill: string
  tier: VerificationTier
  /** 0-5 scale. Rendered as a compact level marker when present. */
  proficiency?: number
  /** Named on the badge for employer-endorsed skills - attribution is the whole point. */
  endorsedBy?: string
  className?: string
}) {
  const styles: Record<VerificationTier, string> = {
    SELF_DECLARED:
      'border-dashed border-[color:var(--color-tier-self)] text-[color:var(--color-fg-muted)] bg-transparent',
    ASSESSMENT_VERIFIED:
      'border-solid border-[color:var(--color-tier-assessed)] text-[color:var(--color-tier-assessed)] bg-[color:var(--color-brand-subtle)]',
    EMPLOYER_ENDORSED:
      'border-solid border-2 border-[color:var(--color-tier-endorsed)] text-[color:var(--color-tier-endorsed)] bg-[color:var(--color-success-subtle)]',
  }

  const icon = {
    SELF_DECLARED: null,
    ASSESSMENT_VERIFIED: <CheckIcon size={12} strokeWidth={2.5} />,
    EMPLOYER_ENDORSED: <BadgeCheckIcon size={13} />,
  }[tier]

  const meta = tierMeta[tier]
  const srSuffix = endorsedBy ? `${meta.label} by ${endorsedBy}` : meta.label

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        styles[tier],
        className,
      )}
    >
      {icon}
      <span>{skill}</span>
      {typeof proficiency === 'number' ? (
        <span className="font-mono text-[10px] tabular-nums opacity-70">{proficiency}/5</span>
      ) : null}
      <span className="sr-only"> — {srSuffix}</span>
    </span>
  )
}
