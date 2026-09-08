import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

import { PrismaClient } from '@/generated/prisma/client'

/**
 * The Prisma client singleton.
 *
 * Prisma 7 requires a driver adapter rather than reading a connection string from the
 * schema, so the provider swap for production (ADR-003) happens here and in
 * prisma.config.ts — the schema itself stays provider-agnostic.
 *
 * To move to MySQL in Phase 13:
 *   1. `provider = "mysql"` in prisma/schema.prisma
 *   2. swap PrismaBetterSqlite3 for PrismaMariaDb here
 *   3. point DATABASE_URL at the MySQL instance
 * Nothing in application code changes.
 *
 * The globalThis cache is what stops dev hot-reload opening a new connection pool on
 * every edit until SQLite runs out of handles.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
  const adapter = new PrismaBetterSqlite3({ url })

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
