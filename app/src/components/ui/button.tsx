import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { SpinnerIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/**
 * The button. There is exactly one, and every other phase uses it.
 *
 * `asChild` renders the styles onto a child element - use it for links that should look
 * like buttons, so navigation stays a real <a href> (which matters for crawlability,
 * see docs/SEO-CHECKLIST.md).
 */

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)]',
    'font-medium whitespace-nowrap select-none',
    'transition-colors duration-[var(--duration-fast)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-[color:var(--color-brand)] text-[color:var(--color-brand-fg)] hover:bg-[color:var(--color-brand-hover)] shadow-[var(--shadow-sm)]',
        secondary:
          'bg-[color:var(--color-surface-raised)] text-[color:var(--color-fg)] border border-[color:var(--color-border)] hover:bg-[color:var(--color-surface-sunken)]',
        outline:
          'border border-[color:var(--color-border-strong)] text-[color:var(--color-fg)] hover:bg-[color:var(--color-surface-raised)]',
        ghost: 'text-[color:var(--color-fg)] hover:bg-[color:var(--color-surface-raised)]',
        danger: 'bg-[color:var(--color-danger)] text-white hover:opacity-90',
        accent:
          'bg-[color:var(--color-tier-endorsed)] text-white hover:opacity-90 shadow-[var(--shadow-sm)]',
        link: 'text-[color:var(--color-brand)] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-sm [&_svg]:size-4',
        md: 'h-10 px-4 text-sm [&_svg]:size-4',
        lg: 'h-12 px-6 text-base [&_svg]:size-5',
        icon: 'size-10 [&_svg]:size-5',
        'icon-sm': 'size-8 [&_svg]:size-4',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, block }), className)}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* Slot accepts exactly one child, so the spinner is only injected when we own
          the element. An asChild button that needs a loading state should render its
          own spinner. */}
      {loading && !asChild ? (
        <>
          <SpinnerIcon aria-hidden="true" />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { buttonVariants }
