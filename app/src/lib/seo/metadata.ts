import type { Metadata } from 'next'

import { absoluteUrl, siteConfig } from '@/config/site'

/**
 * The single place page metadata is constructed.
 *
 * No page writes <title>, description, canonical or OpenGraph tags by hand. That guarantees
 * the per-page SEO contract in docs/SEO-CHECKLIST.md is satisfied by construction rather
 * than by remembering.
 *
 * Expanded in Phase 2 with per-route OG image generation.
 */

export interface BuildMetadataOptions {
  /** Page-specific title. Kept under ~50 chars so the suffixed title stays under 60. */
  title: string
  /** Unique, 140-160 characters, written as a human summary of this page. */
  description: string
  /** Path relative to the site root, e.g. '/for-students'. Used for the canonical URL. */
  path: string
  /** Set false for anything private: dashboards, /verify/[code], private portfolios. */
  index?: boolean
  /** Overrides the generated OpenGraph image. */
  ogImage?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

export function buildMetadata({
  title,
  description,
  path,
  index = true,
  ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const image = ogImage ?? absoluteUrl('/opengraph-image')

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : {
          index: false,
          follow: false,
          nocache: true,
        },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [image],
    },
  }
}
