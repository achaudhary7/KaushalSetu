import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/layout/theme'
import { TooltipProvider } from '@/components/ui/overlay'
import { ToastProvider } from '@/components/ui/toast'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'

/**
 * Self-hosted variable fonts. next/font inlines the @font-face and preloads the file,
 * which removes both the render-blocking request and the layout shift that webfonts
 * otherwise cause. See docs/PERFORMANCE.md.
 */
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-custom',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    /* Per docs/SEO-CHECKLIST.md: descriptive home title, suffix pattern elsewhere. */
    default: `${siteConfig.name} — Academia-Industry Portal for Skills, Internships & Placements`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: false },
  icons: {
    /* Stable URLs. Per ../SEO IMPs/Fevicon.txt these must not change once indexed. */
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning: next-themes stamps data-theme on <html> before
    // hydration, so the server and client markup differ by design.
    <html
      lang="en-IN"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <TooltipProvider delayDuration={200}>
            <ToastProvider>{children}</ToastProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
