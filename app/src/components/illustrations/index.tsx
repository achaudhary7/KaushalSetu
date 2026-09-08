import { cn } from '@/lib/utils/cn'

/**
 * SVG scene illustrations.
 *
 * Geometric and abstract rather than figurative: cheaper to draw, ages better, avoids the
 * generic-corporate-illustration look, and sidesteps every question about who is depicted.
 * All colour comes from design tokens, so each scene themes automatically.
 *
 * Decorative by default. Pass a `title` when the illustration carries meaning on its own.
 */

interface SceneProps {
  className?: string
  title?: string
}

function Scene({
  viewBox = '0 0 320 200',
  className,
  title,
  children,
}: SceneProps & { viewBox?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={cn('h-auto w-full', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

const brand = 'var(--color-brand)'
const accent = 'var(--color-tier-endorsed)'
const highlight = 'var(--color-highlight-500)'
const faint = 'var(--color-border)'
const surface = 'var(--color-surface-raised)'

/* ==========================================================================
   Hero - the bridge itself. Two banks, a span, and people crossing it.
   ========================================================================== */

export function BridgeScene(props: SceneProps) {
  return (
    <Scene {...props}>
      {/* banks */}
      <rect x="0" y="140" width="70" height="60" rx="6" fill={surface} />
      <rect x="250" y="120" width="70" height="80" rx="6" fill={surface} />

      {/* academia side: stacked books */}
      <rect x="14" y="120" width="42" height="7" rx="3" fill={brand} opacity="0.35" />
      <rect x="18" y="110" width="34" height="7" rx="3" fill={brand} opacity="0.55" />
      <rect x="22" y="100" width="26" height="7" rx="3" fill={brand} />

      {/* industry side: buildings */}
      <rect x="262" y="70" width="18" height="50" rx="3" fill={accent} opacity="0.5" />
      <rect x="286" y="52" width="20" height="68" rx="3" fill={accent} />
      <rect x="290" y="60" width="4" height="4" fill="var(--color-surface)" opacity="0.7" />
      <rect x="298" y="60" width="4" height="4" fill="var(--color-surface)" opacity="0.7" />
      <rect x="290" y="72" width="4" height="4" fill="var(--color-surface)" opacity="0.7" />
      <rect x="298" y="72" width="4" height="4" fill="var(--color-surface)" opacity="0.7" />

      {/* the span */}
      <path
        d="M70 140C110 96 210 88 250 120"
        stroke={brand}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M70 152h180" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      {/* cables */}
      <path
        d="M104 118v34M140 102v50M180 96v56M218 102v50"
        stroke={brand}
        strokeWidth="1.5"
        opacity="0.45"
      />

      {/* travellers */}
      <circle cx="124" cy="145" r="5" fill={highlight} />
      <circle cx="166" cy="145" r="5" fill={accent} />
      <circle cx="206" cy="145" r="5" fill={brand} />
    </Scene>
  )
}

/* ==========================================================================
   Assessment - a questionnaire producing a profile
   ========================================================================== */

export function AssessmentScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <rect x="24" y="26" width="130" height="150" rx="10" fill={surface} stroke={faint} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="44" cy={56 + i * 30} r="6" stroke={i < 3 ? accent : faint} strokeWidth="2" />
          {i < 3 ? (
            <path
              d={`M41 ${56 + i * 30}l2.5 2.5 4-5`}
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <rect
            x="60"
            y={51 + i * 30}
            width={i === 3 ? 50 : 76}
            height="8"
            rx="4"
            fill={brand}
            opacity={i < 3 ? 0.3 : 0.15}
          />
        </g>
      ))}

      {/* the resulting radar */}
      <polygon points="236,40 286,74 268,134 204,134 186,74" stroke={faint} strokeWidth="1.5" />
      <polygon
        points="236,64 268,84 258,122 214,122 204,84"
        fill={brand}
        fillOpacity="0.2"
        stroke={brand}
        strokeWidth="2"
      />
      <circle cx="236" cy="64" r="3.5" fill={brand} />
      <circle cx="268" cy="84" r="3.5" fill={brand} />
      <circle cx="204" cy="84" r="3.5" fill={highlight} />

      <path
        d="M162 100h20M176 94l6 6-6 6"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Scene>
  )
}

/* ==========================================================================
   Matching - two skill vectors overlapping
   ========================================================================== */

export function MatchingScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <circle
        cx="122"
        cy="100"
        r="62"
        fill={brand}
        fillOpacity="0.14"
        stroke={brand}
        strokeWidth="2"
      />
      <circle
        cx="198"
        cy="100"
        r="62"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
        strokeWidth="2"
      />

      {/* the overlap - what the match score is made of */}
      <path
        d="M160 48a62 62 0 0 0 0 104 62 62 0 0 0 0-104Z"
        fill={highlight}
        fillOpacity="0.28"
        stroke={highlight}
        strokeWidth="2"
      />

      {[70, 86, 102, 118].map((y, i) => (
        <rect
          key={y}
          x="82"
          y={y}
          width={i === 3 ? 22 : 30}
          height="6"
          rx="3"
          fill={brand}
          opacity="0.5"
        />
      ))}
      {[70, 86, 102, 118].map((y, i) => (
        <rect
          key={y}
          x={216 + (i === 1 ? 8 : 0)}
          y={y}
          width={i === 1 ? 22 : 30}
          height="6"
          rx="3"
          fill={accent}
          opacity="0.5"
        />
      ))}

      <circle cx="160" cy="86" r="4" fill={highlight} />
      <circle cx="160" cy="102" r="4" fill={highlight} />
      <circle cx="160" cy="118" r="4" fill={highlight} />
    </Scene>
  )
}

/* ==========================================================================
   Verification - a certificate with a QR that resolves to a live page
   ========================================================================== */

export function VerificationScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <rect x="34" y="34" width="128" height="132" rx="8" fill={surface} stroke={faint} />
      <rect x="52" y="56" width="92" height="7" rx="3.5" fill={brand} opacity="0.45" />
      <rect x="52" y="72" width="66" height="6" rx="3" fill={brand} opacity="0.22" />
      <rect x="52" y="86" width="76" height="6" rx="3" fill={brand} opacity="0.22" />

      {/* QR */}
      <rect
        x="52"
        y="106"
        width="48"
        height="48"
        rx="4"
        fill="var(--color-surface)"
        stroke={faint}
      />
      <rect x="58" y="112" width="12" height="12" rx="2" stroke={brand} strokeWidth="2" />
      <rect x="82" y="112" width="12" height="12" rx="2" stroke={brand} strokeWidth="2" />
      <rect x="58" y="136" width="12" height="12" rx="2" stroke={brand} strokeWidth="2" />
      <rect x="82" y="136" width="5" height="5" fill={brand} />
      <rect x="89" y="143" width="5" height="5" fill={brand} />

      {/* seal */}
      <circle
        cx="130"
        cy="134"
        r="16"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
        strokeWidth="2"
      />
      <path
        d="M123 134l5 5 9-10"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* resolves to */}
      <path
        d="M172 100h22M188 94l6 6-6 6"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect x="204" y="52" width="84" height="96" rx="8" fill={surface} stroke={faint} />
      <rect x="216" y="66" width="60" height="6" rx="3" fill={brand} opacity="0.3" />
      <circle
        cx="246"
        cy="102"
        r="18"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
        strokeWidth="2.5"
      />
      <path
        d="M238 102l6 6 11-12"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="222" y="130" width="48" height="6" rx="3" fill={accent} opacity="0.4" />
    </Scene>
  )
}

/* ==========================================================================
   Growth - skills rising over time, with the gap called out
   ========================================================================== */

export function GrowthScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <path d="M40 170h250M40 170V30" stroke={faint} strokeWidth="2" strokeLinecap="round" />
      {[130, 90, 50].map((y) => (
        <path
          key={y}
          d="M40 0h250"
          transform={`translate(0 ${y})`}
          stroke={faint}
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      ))}

      {[0, 1, 2, 3, 4].map((i) => {
        const h = [40, 62, 58, 88, 112][i] ?? 40
        return (
          <rect
            key={i}
            x={62 + i * 46}
            width="26"
            y={170 - h}
            height={h}
            rx="4"
            fill={brand}
            opacity={0.25 + i * 0.16}
          />
        )
      })}

      {/* target line - the gap between current and required */}
      <path d="M52 46h236" stroke={highlight} strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="288" cy="46" r="4" fill={highlight} />

      <path
        d="M75 130C120 120 180 92 275 52"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Scene>
  )
}

/* ==========================================================================
   Collaboration - mentorship and live projects
   ========================================================================== */

export function CollaborationScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <circle
        cx="160"
        cy="100"
        r="26"
        fill={brand}
        fillOpacity="0.16"
        stroke={brand}
        strokeWidth="2"
      />
      <circle cx="160" cy="92" r="8" fill={brand} />
      <path d="M148 114c0-6 5-10 12-10s12 4 12 10" fill={brand} />

      {[
        [64, 48],
        [256, 48],
        [64, 152],
        [256, 152],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <path
            d={`M160 100L${cx} ${cy}`}
            stroke={i % 2 === 0 ? accent : highlight}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.7"
          />
          <circle
            cx={cx}
            cy={cy}
            r="20"
            fill={surface}
            stroke={i % 2 === 0 ? accent : highlight}
            strokeWidth="2"
          />
          <circle cx={cx} cy={(cy ?? 0) - 5} r="6" fill={i % 2 === 0 ? accent : highlight} />
          <path
            d={`M${(cx ?? 0) - 9} ${(cy ?? 0) + 10}c0-5 4-8 9-8s9 3 9 8`}
            fill={i % 2 === 0 ? accent : highlight}
          />
        </g>
      ))}
    </Scene>
  )
}

/* ==========================================================================
   Empty state - a small, quiet scene for "nothing here yet"
   ========================================================================== */

export function EmptyScene({ className, title }: SceneProps) {
  return (
    <Scene viewBox="0 0 160 120" className={cn('max-w-[160px]', className)} title={title}>
      <rect
        x="30"
        y="34"
        width="100"
        height="66"
        rx="8"
        fill={surface}
        stroke={faint}
        strokeDasharray="6 5"
      />
      <rect x="46" y="54" width="46" height="6" rx="3" fill={brand} opacity="0.22" />
      <rect x="46" y="68" width="68" height="6" rx="3" fill={brand} opacity="0.14" />
      <circle cx="80" cy="26" r="11" fill={surface} stroke={faint} strokeWidth="2" />
      <path
        d="M76 26h8M80 22v8"
        stroke={brand}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Scene>
  )
}

/* ==========================================================================
   404 - a bridge with a missing span
   ========================================================================== */

export function NotFoundScene(props: SceneProps) {
  return (
    <Scene {...props}>
      <rect x="0" y="140" width="90" height="60" rx="6" fill={surface} />
      <rect x="230" y="140" width="90" height="60" rx="6" fill={surface} />

      <path
        d="M90 140C104 118 122 106 138 100"
        stroke={brand}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M230 140c-14-22-32-34-48-40"
        stroke={brand}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* the gap */}
      <path
        d="M144 96h32"
        stroke={faint}
        strokeWidth="3"
        strokeDasharray="4 8"
        strokeLinecap="round"
      />

      <path d="M0 152h90M230 152h90" stroke={accent} strokeWidth="3" strokeLinecap="round" />

      <circle
        cx="160"
        cy="60"
        r="16"
        fill="var(--color-warning-subtle)"
        stroke="var(--color-warning)"
        strokeWidth="2"
      />
      <path
        d="M160 53v8M160 66h.01"
        stroke="var(--color-warning)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Scene>
  )
}

/* ==========================================================================
   Decorative background patterns
   ========================================================================== */

export function GridPattern({ className }: { className?: string }) {
  return (
    <svg className={cn('absolute inset-0 h-full w-full', className)} aria-hidden="true">
      <defs>
        <pattern id="ks-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0v48" fill="none" stroke={faint} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ks-grid)" />
    </svg>
  )
}
