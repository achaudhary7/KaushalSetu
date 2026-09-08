/**
 * Opportunity listings.
 *
 * Typed fixtures for Phase 2, replaced by real `Opportunity` records in Phase 7. The shape
 * here is the contract that the Prisma model must satisfy, and it is what
 * `jobPostingJsonLd()` consumes - so getting it right now saves rework later.
 *
 * Content is deliberately plausible rather than generic: Ayush pharma units, hospitals and
 * wellness centres alongside one software role, because that mix is the whole argument.
 */

export type OpportunityType =
  'INTERNSHIP' | 'MICRO_INTERNSHIP' | 'APPRENTICESHIP' | 'JOB' | 'LIVE_PROJECT'

export type WorkMode = 'ONSITE' | 'REMOTE' | 'HYBRID'

export interface Opportunity {
  slug: string
  title: string
  type: OpportunityType
  company: { name: string; sector: string; verified: boolean; about: string }
  location: { city: string; region: string }
  mode: WorkMode
  /** Monthly stipend or salary in INR. Absent means unpaid, which we surface honestly. */
  stipend?: { min: number; max?: number; period: 'month' | 'year' }
  durationWeeks?: number
  openings: number
  postedAt: string
  deadline: string
  summary: string
  responsibilities: string[]
  skills: { name: string; level: number; mustHave: boolean }[]
  eligibility: { programmes: string[]; years: number[]; minCgpa?: number }
  /** Which career path this feeds, for internal linking. */
  careerSlug?: string
}

export const opportunities: Opportunity[] = [
  {
    slug: 'quality-assurance-intern-himalaya-wellness-dehradun',
    title: 'Quality Assurance Intern — Ayush Manufacturing',
    type: 'INTERNSHIP',
    company: {
      name: 'Himalaya Wellness Pvt Ltd',
      sector: 'Ayush Pharmaceuticals',
      verified: true,
      about:
        'A GMP-certified Ayush manufacturing unit producing classical and proprietary formulations for domestic and export markets.',
    },
    location: { city: 'Dehradun', region: 'Uttarakhand' },
    mode: 'ONSITE',
    stipend: { min: 15000, period: 'month' },
    durationWeeks: 24,
    openings: 4,
    postedAt: '2026-08-18',
    deadline: '2026-10-15',
    summary:
      'Six months inside a working GMP facility, learning how a classical formulation actually gets made, tested and released. You will leave with batch documentation experience that almost no fresh BAMS graduate has.',
    responsibilities: [
      'Assist with raw drug authentication and pharmacognostic identification',
      'Support in-process and finished-product quality checks',
      'Maintain batch manufacturing records under supervision',
      'Participate in stability study sampling',
      'Shadow internal audits and inspection readiness work',
    ],
    skills: [
      { name: 'GMP documentation and batch records', level: 2, mustHave: true },
      { name: 'Dravyaguna and raw drug authentication', level: 3, mustHave: true },
      { name: 'Ayurvedic Pharmacopoeia of India standards', level: 2, mustHave: false },
      { name: 'Attention to detail and compliance discipline', level: 3, mustHave: true },
    ],
    eligibility: { programmes: ['BAMS', 'B.Pharm (Ayurveda)'], years: [3, 4], minCgpa: 6.0 },
    careerSlug: 'ayush-pharmaceutical-quality-assurance',
  },
  {
    slug: 'clinical-research-coordinator-aiia-new-delhi',
    title: 'Clinical Research Coordinator — Ayurveda Trials',
    type: 'JOB',
    company: {
      name: 'Sattva Clinical Research',
      sector: 'Clinical Research',
      verified: true,
      about:
        'A contract research organisation specialising in trials of traditional medicine interventions, working with CTRI-registered studies.',
    },
    location: { city: 'New Delhi', region: 'Delhi NCR' },
    mode: 'HYBRID',
    stipend: { min: 480000, max: 620000, period: 'year' },
    openings: 2,
    postedAt: '2026-08-25',
    deadline: '2026-10-05',
    summary:
      'Run the day-to-day of CTRI-registered Ayurveda trials — recruitment, consent, data and monitoring. Suited to a clinically trained graduate who wants to build an evidence-side career.',
    responsibilities: [
      'Coordinate participant recruitment, screening and informed consent',
      'Maintain case report forms and source documentation',
      'Prepare ethics committee and CTRI submissions',
      'Support monitoring visits and query resolution',
      'Track protocol deviations and report them accurately',
    ],
    skills: [
      { name: 'Clinical research methodology', level: 3, mustHave: true },
      { name: 'Good Clinical Practice (GCP)', level: 3, mustHave: true },
      { name: 'Data management and documentation', level: 3, mustHave: true },
      { name: 'Scientific and protocol writing', level: 3, mustHave: false },
      {
        name: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
        level: 2,
        mustHave: false,
      },
    ],
    eligibility: { programmes: ['BAMS', 'BHMS', 'BUMS', 'B.Pharm (Ayurveda)'], years: [4] },
    careerSlug: 'ayush-clinical-research',
  },
  {
    slug: 'medical-writing-micro-internship-remote',
    title: 'Medical Writing Micro-Internship — Patient Literature',
    type: 'MICRO_INTERNSHIP',
    company: {
      name: 'Prakriti Health Communications',
      sector: 'Healthcare Communications',
      verified: true,
      about:
        'A small medical communications practice producing patient-facing and regulatory content for Ayush and integrative health clients.',
    },
    location: { city: 'Remote', region: 'India' },
    mode: 'REMOTE',
    stipend: { min: 8000, period: 'month' },
    durationWeeks: 3,
    openings: 6,
    postedAt: '2026-09-01',
    deadline: '2026-09-30',
    summary:
      'Three weeks, paid, fully remote — rewrite three sets of patient information leaflets into plain language and have them reviewed. Open to first and second years, which is the point: build a portfolio entry before final year.',
    responsibilities: [
      'Rewrite technical formulation information into plain patient language',
      'Fact-check claims against permissible Ayush claims',
      'Incorporate reviewer feedback across two revision rounds',
      'Deliver three finished leaflets as a portfolio piece',
    ],
    skills: [
      { name: 'English written communication', level: 3, mustHave: true },
      { name: 'Scientific and protocol writing', level: 2, mustHave: false },
      { name: 'Literature search and appraisal', level: 2, mustHave: false },
    ],
    eligibility: {
      programmes: ['BAMS', 'BHMS', 'BUMS', 'B.Pharm (Ayurveda)', 'BNYS'],
      years: [1, 2, 3, 4],
    },
    careerSlug: 'medical-writing-and-pharmacovigilance',
  },
  {
    slug: 'panchakarma-physician-kerala-wellness-retreat',
    title: 'Panchakarma Physician — Wellness Retreat',
    type: 'JOB',
    company: {
      name: 'Kaya Kalp Wellness Retreat',
      sector: 'Wellness & Medical Tourism',
      verified: true,
      about:
        'A 40-room Ayurveda wellness retreat serving domestic and international guests on 7 to 21 day programmes.',
    },
    location: { city: 'Kochi', region: 'Kerala' },
    mode: 'ONSITE',
    stipend: { min: 540000, max: 780000, period: 'year' },
    openings: 1,
    postedAt: '2026-08-12',
    deadline: '2026-10-20',
    summary:
      'Own the clinical side of a working retreat: assess guests, design protocols, supervise therapists. Accommodation included. Strong fit for someone who wants clinical depth and operational responsibility together.',
    responsibilities: [
      'Guest assessment and individualised programme design',
      'Supervising therapists across daily procedure schedules',
      'Maintaining clinical safety, hygiene and consent records',
      'Training new therapy staff',
      'Working with international guests and their expectations',
    ],
    skills: [
      { name: 'Panchakarma procedure planning', level: 4, mustHave: true },
      {
        name: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
        level: 4,
        mustHave: true,
      },
      { name: 'Guest experience and cross-cultural communication', level: 3, mustHave: true },
      { name: 'Therapist supervision and training', level: 3, mustHave: false },
    ],
    eligibility: { programmes: ['BAMS'], years: [4] },
    careerSlug: 'wellness-and-medical-tourism',
  },
  {
    slug: 'regulatory-affairs-trainee-gujarat',
    title: 'Regulatory Affairs Trainee — Ayush Products',
    type: 'APPRENTICESHIP',
    company: {
      name: 'Vaidya Ayurvedics Ltd',
      sector: 'Ayush Pharmaceuticals',
      verified: true,
      about:
        'An Ayush manufacturer with a growing export portfolio across the Gulf and Southeast Asia.',
    },
    location: { city: 'Ahmedabad', region: 'Gujarat' },
    mode: 'ONSITE',
    stipend: { min: 22000, period: 'month' },
    durationWeeks: 52,
    openings: 2,
    postedAt: '2026-08-30',
    deadline: '2026-10-10',
    summary:
      'A twelve-month apprenticeship in Ayush regulatory affairs — licensing, dossiers and export documentation. Structured training in a discipline that almost no degree teaches and every manufacturer needs.',
    responsibilities: [
      'Compile licence applications and product dossiers',
      'Review label claims against permissible Ayush claims',
      'Support export documentation for Gulf and ASEAN markets',
      'Track regulatory change and summarise product impact',
    ],
    skills: [
      { name: 'Ayush regulatory framework and Drugs & Cosmetics Act', level: 2, mustHave: true },
      { name: 'Product dossier and technical writing', level: 3, mustHave: true },
      { name: 'Attention to detail and compliance discipline', level: 4, mustHave: true },
      { name: 'Ayurvedic Pharmacopoeia of India standards', level: 2, mustHave: false },
    ],
    eligibility: { programmes: ['BAMS', 'BHMS', 'BUMS', 'B.Pharm (Ayurveda)'], years: [4] },
    careerSlug: 'ayush-regulatory-affairs',
  },
  {
    slug: 'ayush-emr-terminology-live-project',
    title: 'Live Project — Ayush EMR Terminology Mapping',
    type: 'LIVE_PROJECT',
    company: {
      name: 'AyurTech Systems',
      sector: 'Health Technology',
      verified: true,
      about:
        'A health-tech company building electronic medical records for Ayush hospitals and ABDM-compliant record exchange.',
    },
    location: { city: 'Bengaluru', region: 'Karnataka' },
    mode: 'REMOTE',
    stipend: { min: 20000, period: 'month' },
    durationWeeks: 10,
    openings: 3,
    postedAt: '2026-08-28',
    deadline: '2026-10-08',
    summary:
      'Map a set of Ayurvedic diagnoses to NAMASTE and ICD-11 TM2 codes alongside the engineering team. A clinician-plus-data project — genuinely open ground, and it produces a portfolio piece nobody else will have.',
    responsibilities: [
      'Map Ayurvedic diagnostic terms to NAMASTE and ICD-11 TM2',
      'Document ambiguous mappings and propose resolutions',
      'Review EMR workflow drafts from a clinical standpoint',
      'Present findings to the product team at milestone reviews',
    ],
    skills: [
      { name: 'Health informatics and terminology coding', level: 2, mustHave: true },
      {
        name: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
        level: 3,
        mustHave: true,
      },
      { name: 'Requirements gathering and specification', level: 2, mustHave: false },
      { name: 'Written communication', level: 3, mustHave: true },
    ],
    eligibility: { programmes: ['BAMS', 'BHMS', 'B.Tech'], years: [3, 4] },
    careerSlug: 'ayush-informatics-and-health-data',
  },
  {
    slug: 'frontend-engineering-intern-bengaluru',
    title: 'Frontend Engineering Intern',
    type: 'INTERNSHIP',
    company: {
      name: 'AyurTech Systems',
      sector: 'Health Technology',
      verified: true,
      about:
        'A health-tech company building electronic medical records for Ayush hospitals and ABDM-compliant record exchange.',
    },
    location: { city: 'Bengaluru', region: 'Karnataka' },
    mode: 'HYBRID',
    stipend: { min: 25000, period: 'month' },
    durationWeeks: 16,
    openings: 3,
    postedAt: '2026-09-02',
    deadline: '2026-10-12',
    summary:
      'Build clinician-facing interfaces for an Ayush EMR. Included here to make a point: the same platform, taxonomy and matching engine serve an engineering college without a single code change.',
    responsibilities: [
      'Build and test UI components against design specifications',
      'Fix defects raised by clinical users',
      'Participate in code review',
      'Write component documentation',
    ],
    skills: [
      { name: 'Programming fundamentals', level: 3, mustHave: true },
      { name: 'Version control (Git)', level: 2, mustHave: true },
      { name: 'Problem solving', level: 3, mustHave: true },
      { name: 'Written communication', level: 2, mustHave: false },
    ],
    eligibility: {
      programmes: ['B.Tech', 'BCA', 'MCA', 'B.Sc Computer Science'],
      years: [3, 4],
      minCgpa: 7.0,
    },
    careerSlug: 'software-engineering',
  },
  {
    slug: 'pharmacovigilance-associate-remote',
    title: 'Pharmacovigilance Associate — Ayush Safety Monitoring',
    type: 'JOB',
    company: {
      name: 'Prakriti Health Communications',
      sector: 'Healthcare Communications',
      verified: true,
      about:
        'A small medical communications practice producing patient-facing and regulatory content for Ayush and integrative health clients.',
    },
    location: { city: 'Remote', region: 'India' },
    mode: 'REMOTE',
    stipend: { min: 420000, max: 560000, period: 'year' },
    openings: 2,
    postedAt: '2026-08-20',
    deadline: '2026-10-18',
    summary:
      'Adverse event intake, coding and causality assessment for Ayush formulations. Fully remote, and one of the few clinical-adjacent roles that genuinely works part-time.',
    responsibilities: [
      'Process adverse event reports and assess causality',
      'Maintain the safety database and coding consistency',
      'Contribute to periodic safety update reports',
      'Run literature surveillance for assigned formulations',
    ],
    skills: [
      { name: 'Pharmacovigilance and adverse event reporting', level: 3, mustHave: true },
      { name: 'Literature search and appraisal', level: 3, mustHave: true },
      { name: 'English written communication', level: 4, mustHave: true },
      { name: 'Data management and documentation', level: 3, mustHave: false },
    ],
    eligibility: { programmes: ['BAMS', 'BHMS', 'BUMS', 'B.Pharm (Ayurveda)'], years: [4] },
    careerSlug: 'medical-writing-and-pharmacovigilance',
  },
]

export function getOpportunity(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug)
}

export const opportunitySlugs = opportunities.map((o) => o.slug)

/* ---- Display helpers ----------------------------------------------------- */

export const typeLabels: Record<OpportunityType, string> = {
  INTERNSHIP: 'Internship',
  MICRO_INTERNSHIP: 'Micro-internship',
  APPRENTICESHIP: 'Apprenticeship',
  JOB: 'Job',
  LIVE_PROJECT: 'Live project',
}

export const modeLabels: Record<WorkMode, string> = {
  ONSITE: 'On-site',
  REMOTE: 'Remote',
  HYBRID: 'Hybrid',
}

/** schema.org employmentType values. Used by jobPostingJsonLd(). */
export const employmentTypeFor: Record<OpportunityType, string> = {
  INTERNSHIP: 'INTERN',
  MICRO_INTERNSHIP: 'INTERN',
  APPRENTICESHIP: 'FULL_TIME',
  JOB: 'FULL_TIME',
  LIVE_PROJECT: 'CONTRACTOR',
}

export function formatStipend(stipend?: Opportunity['stipend']): string {
  if (!stipend) return 'Unpaid'
  const fmt = (value: number) =>
    stipend.period === 'year'
      ? `₹${(value / 100000).toFixed(1).replace(/\.0$/, '')} LPA`
      : `₹${value.toLocaleString('en-IN')}/month`
  return stipend.max ? `${fmt(stipend.min)} – ${fmt(stipend.max)}` : fmt(stipend.min)
}

/** Distinct facet values, derived so the filter UI can never drift from the data. */
export function opportunityFacets() {
  return {
    types: [...new Set(opportunities.map((o) => o.type))],
    regions: [...new Set(opportunities.map((o) => o.location.region))].sort(),
    modes: [...new Set(opportunities.map((o) => o.mode))],
    sectors: [...new Set(opportunities.map((o) => o.company.sector))].sort(),
  }
}
