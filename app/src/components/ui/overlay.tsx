'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { CloseIcon } from '@/components/icons'
import { cn } from '@/lib/utils/cn'

/**
 * Layered surfaces, all on Radix - which gives us focus trapping, escape handling,
 * scroll locking and correct ARIA for free. We only supply the styling.
 *
 * Z-index comes from the named ladder in globals.css. No arbitrary values.
 */

const overlayClass = cn(
  'fixed inset-0 bg-[color:var(--color-neutral-950)]/50 backdrop-blur-[2px]',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=open]:fade-in data-[state=closed]:fade-out',
)

const panelBase = cn(
  'bg-[color:var(--color-surface)] text-[color:var(--color-fg)]',
  'border border-[color:var(--color-border)] shadow-[var(--shadow-xl)]',
  'focus:outline-none',
)

/* ---- Dialog -------------------------------------------------------------- */

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({
  className,
  children,
  title,
  description,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  title: string
  description?: string
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClass} style={{ zIndex: 'var(--z-overlay)' }} />
      <DialogPrimitive.Content
        className={cn(
          panelBase,
          'fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
          'max-h-[85vh] overflow-y-auto rounded-[var(--radius-lg)] p-6',
          className,
        )}
        style={{ zIndex: 'var(--z-modal)' }}
        {...props}
      >
        <div className="mb-4 pr-8">
          <DialogPrimitive.Title className="text-lg font-semibold tracking-tight">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
              {description}
            </DialogPrimitive.Description>
          ) : null}
        </div>
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className={cn(
            'absolute top-5 right-5 grid size-8 place-items-center rounded-[var(--radius-md)]',
            'text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-surface-raised)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
          )}
        >
          <CloseIcon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/* ---- Sheet (a Dialog docked to an edge) ---------------------------------- */

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

export function SheetContent({
  className,
  children,
  title,
  description,
  side = 'right',
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  title: string
  description?: string
  side?: 'left' | 'right'
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClass} style={{ zIndex: 'var(--z-overlay)' }} />
      <DialogPrimitive.Content
        className={cn(
          panelBase,
          'fixed inset-y-0 w-[min(22rem,calc(100vw-3rem))] overflow-y-auto p-6',
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          className,
        )}
        style={{ zIndex: 'var(--z-modal)' }}
        {...props}
      >
        <div className="mb-6 pr-8">
          <DialogPrimitive.Title className="text-base font-semibold">{title}</DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
              {description}
            </DialogPrimitive.Description>
          ) : null}
        </div>
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className={cn(
            'absolute top-5 right-5 grid size-8 place-items-center rounded-[var(--radius-md)]',
            'text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-surface-raised)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]',
          )}
        >
          <CloseIcon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/* ---- Dropdown menu ------------------------------------------------------- */

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export function DropdownMenuContent({
  className,
  align = 'end',
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(panelBase, 'min-w-48 rounded-[var(--radius-md)] p-1', className)}
        style={{ zIndex: 'var(--z-dropdown)' }}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm',
        'outline-none select-none',
        'data-[highlighted]:bg-[color:var(--color-surface-raised)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&_svg]:size-4 [&_svg]:text-[color:var(--color-fg-muted)]',
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'px-2.5 py-1.5 text-xs font-medium text-[color:var(--color-fg-subtle)]',
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('my-1 h-px bg-[color:var(--color-border)]', className)}
      {...props}
    />
  )
}

/* ---- Popover ------------------------------------------------------------- */

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export function PopoverContent({
  className,
  align = 'center',
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(panelBase, 'w-72 rounded-[var(--radius-md)] p-4 text-sm', className)}
        style={{ zIndex: 'var(--z-popover)' }}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/* ---- Tooltip ------------------------------------------------------------- */

export const TooltipProvider = TooltipPrimitive.Provider

export function Tooltip({
  content,
  children,
  side = 'top',
}: {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            'max-w-64 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-xs',
            'bg-[color:var(--color-neutral-900)] text-[color:var(--color-neutral-50)]',
            'shadow-[var(--shadow-lg)]',
          )}
          style={{ zIndex: 'var(--z-popover)' }}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[color:var(--color-neutral-900)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
