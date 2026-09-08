import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config/site'

/**
 * The default OpenGraph image.
 *
 * Composed from the same shapes as the logo and rendered at request time by Satori, so
 * there is no raster asset in the repository - consistent with the all-SVG rule.
 *
 * Satori supports a subset of CSS: flexbox only (no grid), no CSS variables, explicit
 * `display` on every element with multiple children. Hence the literal hex values here,
 * which are the resolved values of the brand tokens.
 */

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INDIGO = '#1E3A8A'
const TEAL = '#2DD4BF'
const SLATE = '#0f172a'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 80,
        fontFamily: 'sans-serif',
      }}
    >
      {/* Brand lockup: the bridge mark, drawn with the same geometry as Logo.tsx */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
          <path d="M3 27h26" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M5 27C5 15.5 11.5 8.5 26.5 6.5"
            stroke={INDIGO}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M11.5 27v-9.2" stroke={INDIGO} strokeWidth="2" strokeLinecap="round" />
          <path d="M19 27v-13.4" stroke={INDIGO} strokeWidth="2" strokeLinecap="round" />
          <circle cx="27" cy="6.2" r="3.2" fill={TEAL} />
        </svg>
        <div style={{ display: 'flex', fontSize: 40, color: SLATE }}>
          <span style={{ fontWeight: 500 }}>Kaushal</span>
          <span style={{ fontWeight: 800 }}>Setu</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: SLATE,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: 900,
          }}
        >
          The bridge from campus to career.
        </div>
        <div style={{ fontSize: 30, color: '#475569', marginTop: 24, maxWidth: 860 }}>
          Skill assessment, verified portfolios, internships and placements — for students,
          industry, academicians and institutions.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            backgroundColor: '#eef2ff',
            color: INDIGO,
            fontSize: 22,
            fontWeight: 600,
            padding: '10px 22px',
            borderRadius: 999,
          }}
        >
          Verified skills
        </div>
        <div
          style={{
            display: 'flex',
            backgroundColor: '#f0fdfa',
            color: '#0f766e',
            fontSize: 22,
            fontWeight: 600,
            padding: '10px 22px',
            borderRadius: 999,
          }}
        >
          Verifiable certificates
        </div>
        <div
          style={{
            display: 'flex',
            backgroundColor: '#fffbeb',
            color: '#b45309',
            fontSize: 22,
            fontWeight: 600,
            padding: '10px 22px',
            borderRadius: 999,
          }}
        >
          Real outcomes
        </div>
      </div>
    </div>,
    size,
  )
}
