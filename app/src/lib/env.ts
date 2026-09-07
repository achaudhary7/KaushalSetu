import { z } from 'zod'

/**
 * Validated environment access.
 *
 * The point of this file is failure timing: a missing variable should stop the app at boot
 * with a message naming the variable, not surface as an undefined-shaped crash three screens
 * into a demo.
 *
 * Server variables are read lazily so that importing this module from a client component
 * cannot leak them.
 */

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Phase 3+. Optional until the database exists.
  DATABASE_URL: z.string().min(1).optional(),

  // Phase 4+. Required once authentication is wired up.
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Phase 4+. Absent in development, where email falls back to a console transport.
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().optional(),

  // Phase 12. Uploads are stored outside the web root.
  UPLOAD_DIR: z.string().default('./uploads'),

  // Phase 14. The platform is fully functional with AI disabled - that is the design.
  AI_ENABLED: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  ANTHROPIC_API_KEY: z.string().optional(),
})

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
})

/**
 * Client variables must be referenced by their full literal name so the Next.js build can
 * inline them. Destructuring `process.env` here would break that.
 */
const clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
})

if (!clientEnv.success) {
  console.error('Invalid public environment variables:', z.treeifyError(clientEnv.error))
  throw new Error('Invalid public environment variables. See the errors above.')
}

export const publicEnv = clientEnv.data

let cachedServerEnv: z.infer<typeof serverSchema> | null = null

/**
 * Server-only environment. Throws if called from the browser bundle, and validates on first
 * use so a misconfigured deployment fails fast and legibly.
 */
export function serverEnv(): z.infer<typeof serverSchema> {
  if (typeof window !== 'undefined') {
    throw new Error('serverEnv() was called on the client. Use publicEnv instead.')
  }

  if (cachedServerEnv) return cachedServerEnv

  const parsed = serverSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error('Invalid server environment variables:', z.treeifyError(parsed.error))
    throw new Error('Invalid server environment variables. See the errors above.')
  }

  cachedServerEnv = parsed.data
  return cachedServerEnv
}

/**
 * Guard for variables that become mandatory in a later phase. Call it at the point of use so
 * the error names the feature that needs the variable, not just the variable.
 */
export function requireEnv<K extends keyof z.infer<typeof serverSchema>>(
  key: K,
  feature: string,
): NonNullable<z.infer<typeof serverSchema>[K]> {
  const value = serverEnv()[key]
  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing required environment variable ${String(key)}, needed for: ${feature}`)
  }
  return value as NonNullable<z.infer<typeof serverSchema>[K]>
}
