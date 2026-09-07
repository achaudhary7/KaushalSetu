import type { NextConfig } from 'next'

/**
 * Security headers.
 *
 * The full policy, including CSP, is finalised in Phase 12 (docs/SECURITY.md).
 * These are the ones that cost nothing and should never have been absent.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Self-contained server bundle — what the Phase 13 VPS deploy runs under PM2. */
  output: 'standalone',

  /* Do not leak the framework version. */
  poweredByHeader: false,

  /* Consistent URLs matter for canonicals: one path, one page. */
  trailingSlash: false,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
