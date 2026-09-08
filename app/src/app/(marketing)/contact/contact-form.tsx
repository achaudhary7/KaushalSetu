'use client'

import { useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field, Input, NativeSelect, Textarea } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils/cn'

/**
 * Contact form.
 *
 * One Zod schema, used here on the client and — from Phase 4, when there is a server
 * action to submit to — on the server as well. Validation defined once, never drifting.
 */

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.email('Enter a valid email address'),
  role: z.string().min(1, 'Please choose one'),
  subject: z.string().min(4, 'A few words about the subject'),
  message: z.string().min(20, 'Please give us a little more detail (at least 20 characters)'),
})

type FieldName = keyof z.infer<typeof contactSchema>

export function ContactForm({ className }: { className?: string }) {
  const { toast } = useToast()
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    const result = contactSchema.safeParse(data)
    if (!result.success) {
      const next: Partial<Record<FieldName, string>> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName | undefined
        if (key && !next[key]) next[key] = issue.message
      }
      setErrors(next)
      // Move focus to the first problem so keyboard and screen reader users are not stranded.
      const firstKey = Object.keys(next)[0]
      if (firstKey) {
        form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus()
      }
      return
    }

    setErrors({})
    setSubmitting(true)

    // Phase 4 replaces this with a server action + Nodemailer.
    window.setTimeout(() => {
      setSubmitting(false)
      form.reset()
      toast({
        title: 'Message validated',
        description:
          'Delivery is not wired up yet — please email us directly using the addresses above.',
        tone: 'info',
      })
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('grid gap-5 sm:grid-cols-2', className)}>
      <Field label="Your name" error={errors.name} required>
        <Input name="name" autoComplete="name" placeholder="Ananya Sharma" />
      </Field>

      <Field label="Email" error={errors.email} required>
        <Input name="email" type="email" autoComplete="email" placeholder="you@institution.ac.in" />
      </Field>

      <Field label="I am a" error={errors.role} required>
        <NativeSelect name="role" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option value="student">Student</option>
          <option value="academician">Academician / faculty</option>
          <option value="industry">Employer</option>
          <option value="institution">Institution</option>
          <option value="other">Something else</option>
        </NativeSelect>
      </Field>

      <Field label="Subject" error={errors.subject} required>
        <Input name="subject" placeholder="Piloting this at our college" />
      </Field>

      <Field
        label="Message"
        error={errors.message}
        hint="Reporting a listing? Include the URL."
        required
        className="sm:col-span-2"
      >
        <Textarea name="message" rows={6} placeholder="Tell us what you need…" />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" loading={submitting}>
          Send message
        </Button>
      </div>
    </form>
  )
}
