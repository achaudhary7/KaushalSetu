/**
 * Career paths.
 *
 * Phase 2 renders these from typed fixtures; Phase 3 moves them into `CareerPath`,
 * `JobRole` and `RoleSkillRequirement` and Phase 6 scores against them. **This file is the
 * contract that the Prisma schema must satisfy** - if a field here has no home in the
 * schema, the schema is wrong.
 *
 * Ayush-first, deliberately (see CONTEXT.md section 5): the problem statement is written
 * generically but comes from AIIA, and almost no good online content exists for
 * "what can a BAMS graduate actually do". That is open ground, and it is the highest-value
 * organic surface on this site. Generic paths sit alongside them to prove the platform is
 * domain-agnostic - the taxonomy is data, not code.
 */

export interface CareerSkill {
  skill: string
  /** 1-5, matching the proficiency bands defined in Phase 5. */
  level: number
  /** Weight in the match score. A defining skill is 1.0; a nice-to-have is 0.3. */
  weight: number
  critical?: boolean
}

export interface CareerPath {
  slug: string
  title: string
  /** Under 160 chars - this becomes the meta description. */
  description: string
  domain: 'ayush' | 'technology' | 'business'
  programmes: string[]
  summary: string
  dayToDay: string[]
  skills: CareerSkill[]
  salary: { min: number; max: number; note: string }
  entryRoutes: string[]
  demand: 'growing' | 'steady' | 'emerging'
  regions: string[]
  /** Free courses on government platforms. Real links, no API - none is public. */
  learning: { title: string; provider: 'SWAYAM' | 'NPTEL' | 'Other'; url: string }[]
}

export const careerPaths: CareerPath[] = [
  {
    slug: 'ayurvedic-clinical-practice',
    title: 'Ayurvedic Clinical Practice',
    description:
      'Practise as a registered Ayurvedic physician. Entry routes, required skills, salary bands and free courses for BAMS graduates.',
    domain: 'ayush',
    programmes: ['BAMS'],
    summary:
      'The route most BAMS graduates assume is the only one. It is a good one — but it rewards clinical depth and record-keeping discipline far more than most students expect, and the graduates who do well are the ones who treated their internship year as training rather than a formality.',
    dayToDay: [
      'Outpatient consultation, prakriti assessment and nadi pariksha',
      'Prescribing classical and proprietary formulations, with dose and anupana reasoning',
      'Panchakarma planning and supervising therapists',
      'Case documentation, follow-up and outcome tracking',
      'Coordinating referrals with allopathic colleagues in integrative settings',
    ],
    skills: [
      {
        skill: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
        level: 4,
        weight: 1.0,
        critical: true,
      },
      {
        skill: 'Classical formulation knowledge (Bhaishajya Kalpana)',
        level: 4,
        weight: 0.9,
        critical: true,
      },
      { skill: 'Panchakarma procedure planning', level: 3, weight: 0.8 },
      { skill: 'Clinical documentation and case records', level: 3, weight: 0.7 },
      { skill: 'Patient communication and counselling', level: 4, weight: 0.8 },
      { skill: 'Medical ethics and NCISM practice standards', level: 3, weight: 0.6 },
    ],
    salary: {
      min: 300000,
      max: 900000,
      note: 'Wide range — private practice varies enormously by location and years established.',
    },
    entryRoutes: [
      'BAMS + compulsory rotating internship, then state Ayush council registration',
      'MD/MS (Ayurveda) for specialisation and teaching eligibility',
      'Junior resident posts at Ayush hospitals and teaching institutions',
    ],
    demand: 'steady',
    regions: ['Kerala', 'Maharashtra', 'Karnataka', 'Gujarat', 'Uttarakhand'],
    learning: [
      {
        title: 'Ayurvedic Inheritance of India',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/121106003',
      },
      {
        title: 'Introduction to Research Methodology',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/',
      },
    ],
  },
  {
    slug: 'ayush-pharmaceutical-quality-assurance',
    title: 'Ayush Pharmaceutical Quality Assurance',
    description:
      'Work in GMP-regulated Ayush manufacturing: quality control, quality assurance and standardisation of classical formulations.',
    domain: 'ayush',
    programmes: ['BAMS', 'B.Pharm (Ayurveda)', 'BHMS', 'BUMS'],
    summary:
      'The single most underrated destination for an Ayush graduate. Manufacturing units are legally required to employ qualified Ayush personnel, the work is stable and well-paid, and the competition is thin because almost nobody is told this path exists during their degree.',
    dayToDay: [
      'Raw drug authentication and pharmacognostic identification',
      'In-process and finished-product quality checks against API standards',
      'Maintaining batch manufacturing records and GMP documentation',
      'Stability studies and shelf-life determination',
      'Handling regulatory inspections and internal audits',
    ],
    skills: [
      { skill: 'GMP documentation and batch records', level: 4, weight: 1.0, critical: true },
      { skill: 'Dravyaguna and raw drug authentication', level: 4, weight: 0.9, critical: true },
      { skill: 'Rasashastra and Bhaishajya Kalpana', level: 3, weight: 0.8 },
      { skill: 'Analytical instrumentation (HPTLC, HPLC basics)', level: 3, weight: 0.7 },
      {
        skill: 'Ayurvedic Pharmacopoeia of India standards',
        level: 4,
        weight: 0.9,
        critical: true,
      },
      { skill: 'Quality systems and audit readiness', level: 3, weight: 0.6 },
    ],
    salary: {
      min: 350000,
      max: 1200000,
      note: 'QA leads at larger units reach the upper end within 6-8 years.',
    },
    entryRoutes: [
      'Graduate trainee at an Ayush manufacturing unit',
      'QC analyst, moving into QA after 2-3 years',
      'M.Pharm (Ayurveda) or MD (Rasashastra) for faster progression',
    ],
    demand: 'growing',
    regions: ['Gujarat', 'Uttarakhand', 'Maharashtra', 'Madhya Pradesh', 'Karnataka'],
    learning: [
      { title: 'Good Manufacturing Practices', provider: 'SWAYAM', url: 'https://swayam.gov.in/' },
      {
        title: 'Analytical Chemistry',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/104105085',
      },
    ],
  },
  {
    slug: 'panchakarma-therapy-and-centre-management',
    title: 'Panchakarma Therapy & Centre Management',
    description:
      'Lead panchakarma delivery and run therapy centres — clinical supervision, protocol design, therapist training and centre operations.',
    domain: 'ayush',
    programmes: ['BAMS'],
    summary:
      'Panchakarma centres need someone clinically qualified to design protocols and supervise therapists — and someone commercially literate to run the place. Graduates who can do both are genuinely scarce, which is why this path pays better than general practice earlier.',
    dayToDay: [
      'Assessing patients and designing individualised purvakarma and pradhankarma protocols',
      'Supervising therapists and maintaining procedure quality',
      'Training and certifying therapy staff',
      'Managing consumables, oils and formulation inventory',
      'Outcome tracking and package design',
    ],
    skills: [
      { skill: 'Panchakarma procedure planning', level: 5, weight: 1.0, critical: true },
      {
        skill: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
        level: 4,
        weight: 0.9,
        critical: true,
      },
      { skill: 'Therapist supervision and training', level: 3, weight: 0.8 },
      { skill: 'Centre operations and inventory management', level: 3, weight: 0.7 },
      { skill: 'Patient communication and counselling', level: 4, weight: 0.8 },
      { skill: 'Infection control and safety protocols', level: 3, weight: 0.7 },
    ],
    salary: {
      min: 360000,
      max: 1000000,
      note: 'Wellness resorts and medical tourism centres pay a premium.',
    },
    entryRoutes: [
      'Panchakarma physician at a hospital or wellness centre',
      'MD (Panchakarma) for specialist and teaching roles',
      'Centre manager after 3-5 years of clinical supervision',
    ],
    demand: 'growing',
    regions: ['Kerala', 'Goa', 'Uttarakhand', 'Himachal Pradesh', 'Karnataka'],
    learning: [
      {
        title: 'Ayurvedic Inheritance of India',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/121106003',
      },
      { title: 'Hospital Management', provider: 'SWAYAM', url: 'https://swayam.gov.in/' },
    ],
  },
  {
    slug: 'ayush-clinical-research',
    title: 'Clinical Research in Ayush',
    description:
      'Design and run clinical trials for Ayush interventions — CTRI registration, protocol design, GCP compliance and data management.',
    domain: 'ayush',
    programmes: ['BAMS', 'BHMS', 'BUMS', 'BNYS'],
    summary:
      'Ayush needs evidence, and evidence needs people who understand both the classical framework and trial methodology. That combination is rare, which makes a clinically-trained graduate with real research methods training unusually employable.',
    dayToDay: [
      'Writing trial protocols and case report forms',
      'CTRI registration and ethics committee submissions',
      'Participant recruitment, consent and follow-up',
      'Data collection, cleaning and basic statistical analysis',
      'GCP compliance, monitoring visits and audit trails',
    ],
    skills: [
      { skill: 'Clinical research methodology', level: 4, weight: 1.0, critical: true },
      { skill: 'Good Clinical Practice (GCP)', level: 4, weight: 0.9, critical: true },
      { skill: 'Biostatistics fundamentals', level: 3, weight: 0.8 },
      { skill: 'Scientific and protocol writing', level: 4, weight: 0.8 },
      {
        skill: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
        level: 3,
        weight: 0.6,
      },
      { skill: 'Data management and documentation', level: 3, weight: 0.7 },
    ],
    salary: {
      min: 400000,
      max: 1400000,
      note: 'CROs and pharma pay more than academic research posts.',
    },
    entryRoutes: [
      'Clinical research coordinator at a hospital or CRO',
      'Research assistant on a CCRAS or university project',
      'PG diploma in clinical research alongside a clinical degree',
    ],
    demand: 'growing',
    regions: ['Delhi NCR', 'Maharashtra', 'Karnataka', 'Telangana', 'Gujarat'],
    learning: [
      {
        title: 'Introduction to Research Methodology',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/',
      },
      {
        title: 'Biostatistics and Design of Experiments',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/102106051',
      },
    ],
  },
  {
    slug: 'ayush-regulatory-affairs',
    title: 'Ayush Regulatory Affairs',
    description:
      'Licensing, product approvals and claim compliance for Ayush products under the Drugs & Cosmetics Act. Low competition, fast progression.',
    domain: 'ayush',
    programmes: ['BAMS', 'BHMS', 'BUMS', 'B.Pharm (Ayurveda)'],
    summary:
      'Every Ayush product that reaches a shelf passes through someone who understands both the classical texts and the regulatory framework. Very few graduates train for this deliberately, so the people who do tend to move quickly.',
    dayToDay: [
      'Preparing licence applications and product dossiers',
      'Reviewing label claims against permissible Ayush claims',
      'Liaising with state licensing authorities and the Ayush ministry',
      'Tracking regulatory change and assessing product impact',
      'Export documentation and country-specific requirements',
    ],
    skills: [
      {
        skill: 'Ayush regulatory framework and Drugs & Cosmetics Act',
        level: 4,
        weight: 1.0,
        critical: true,
      },
      { skill: 'Product dossier and technical writing', level: 4, weight: 0.9, critical: true },
      { skill: 'Ayurvedic Pharmacopoeia of India standards', level: 3, weight: 0.8 },
      { skill: 'GMP documentation and batch records', level: 3, weight: 0.7 },
      { skill: 'Attention to detail and compliance discipline', level: 4, weight: 0.8 },
    ],
    salary: {
      min: 400000,
      max: 1500000,
      note: 'Export-focused regulatory roles pay materially more.',
    },
    entryRoutes: [
      'Regulatory affairs executive at an Ayush manufacturer',
      'Moving across from QA after 2-3 years',
      'PG diploma in regulatory affairs',
    ],
    demand: 'growing',
    regions: ['Gujarat', 'Maharashtra', 'Delhi NCR', 'Uttarakhand'],
    learning: [
      {
        title: 'Intellectual Property Rights and Regulatory Practice',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/',
      },
      {
        title: 'Technical Writing',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/109104030',
      },
    ],
  },
  {
    slug: 'medical-writing-and-pharmacovigilance',
    title: 'Medical Writing & Pharmacovigilance',
    description:
      'Write regulatory and scientific content, and monitor the safety of Ayush products. A desk-based clinical career with strong remote and part-time options.',
    domain: 'ayush',
    programmes: ['BAMS', 'BHMS', 'BUMS', 'B.Pharm (Ayurveda)'],
    summary:
      'The most accessible non-clinical path, and the friendliest to anyone who needs flexible or remote work. It rewards clear writing far more than it rewards clinical seniority — which makes it a genuine option from the year you graduate.',
    dayToDay: [
      'Writing clinical study reports, manuscripts and patient literature',
      'Adverse event intake, coding and causality assessment',
      'Periodic safety update reports',
      'Literature surveillance for Ayush formulations',
      'Reviewing marketing claims for scientific accuracy',
    ],
    skills: [
      { skill: 'Scientific and protocol writing', level: 4, weight: 1.0, critical: true },
      {
        skill: 'Pharmacovigilance and adverse event reporting',
        level: 4,
        weight: 0.9,
        critical: true,
      },
      { skill: 'Literature search and appraisal', level: 3, weight: 0.8 },
      { skill: 'Clinical research methodology', level: 3, weight: 0.7 },
      { skill: 'English written communication', level: 4, weight: 0.9, critical: true },
    ],
    salary: {
      min: 350000,
      max: 1200000,
      note: 'Freelance medical writing can exceed this; it is also less secure.',
    },
    entryRoutes: [
      'Junior medical writer at a CRO, agency or pharma company',
      'Pharmacovigilance associate at an Ayush pharmacovigilance centre',
      'Freelance writing alongside clinical practice',
    ],
    demand: 'growing',
    regions: ['Remote', 'Karnataka', 'Telangana', 'Maharashtra', 'Delhi NCR'],
    learning: [
      {
        title: 'Technical Writing',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/109104030',
      },
      { title: 'Pharmacovigilance', provider: 'SWAYAM', url: 'https://swayam.gov.in/' },
    ],
  },
  {
    slug: 'wellness-and-medical-tourism',
    title: 'Wellness & Medical Tourism Operations',
    description:
      'Run Ayush wellness programmes for domestic and international guests — protocol design, guest experience and operations at resorts, spas and medical tourism providers.',
    domain: 'ayush',
    programmes: ['BAMS', 'BNYS', 'BHMS'],
    summary:
      'India markets Ayush wellness internationally, and those operations need clinically qualified people who can also handle guests, standards and commercial reality. Kerala built an industry on exactly this.',
    dayToDay: [
      'Designing wellness packages grounded in classical protocols',
      'Guest consultation and programme personalisation',
      'Coordinating therapists, kitchen and scheduling',
      'Maintaining clinical safety and hygiene standards',
      'Working with international guests and their expectations',
    ],
    skills: [
      { skill: 'Panchakarma procedure planning', level: 4, weight: 0.9, critical: true },
      { skill: 'Wellness programme design', level: 4, weight: 1.0, critical: true },
      { skill: 'Guest experience and cross-cultural communication', level: 4, weight: 0.8 },
      { skill: 'Centre operations and inventory management', level: 3, weight: 0.7 },
      { skill: 'Ayurvedic diet and lifestyle counselling', level: 4, weight: 0.8 },
    ],
    salary: {
      min: 350000,
      max: 1100000,
      note: 'International resort roles include accommodation more often than not.',
    },
    entryRoutes: [
      'Resident Ayurveda physician at a resort or wellness centre',
      'Wellness consultant with a medical tourism operator',
      'Hospitality management qualification alongside a clinical degree',
    ],
    demand: 'growing',
    regions: ['Kerala', 'Goa', 'Uttarakhand', 'Rajasthan', 'Himachal Pradesh'],
    learning: [
      { title: 'Hospital Management', provider: 'SWAYAM', url: 'https://swayam.gov.in/' },
      {
        title: 'Soft Skills Development',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/109104107',
      },
    ],
  },
  {
    slug: 'ayush-informatics-and-health-data',
    title: 'Ayush Informatics & Health Data',
    description:
      'Bridge Ayush practice and digital health — EMR design, NAMASTE terminology coding, ABDM integration and analytics for Ayush systems.',
    domain: 'ayush',
    programmes: ['BAMS', 'BHMS', 'BUMS', 'B.Tech'],
    summary:
      'An emerging path with almost no competition. Digital health infrastructure needs people who understand Ayush terminology and clinical workflow well enough to model it — a software engineer alone cannot do this, and a clinician alone cannot either.',
    dayToDay: [
      'Mapping Ayush diagnoses to NAMASTE and ICD-11 TM2 codes',
      'Specifying EMR workflows for Ayush practice',
      'Supporting ABDM and health-record interoperability',
      'Analysing clinical and outcome data',
      'Working between clinicians and engineering teams',
    ],
    skills: [
      { skill: 'Health informatics and terminology coding', level: 4, weight: 1.0, critical: true },
      {
        skill: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
        level: 3,
        weight: 0.8,
      },
      { skill: 'Data analysis and visualisation', level: 3, weight: 0.8 },
      { skill: 'Requirements gathering and specification', level: 3, weight: 0.7 },
      { skill: 'SQL and data querying', level: 2, weight: 0.5 },
    ],
    salary: {
      min: 450000,
      max: 1600000,
      note: 'Health-tech pays closer to software rates than to clinical rates.',
    },
    entryRoutes: [
      'Clinical analyst or domain consultant at a health-tech company',
      'Research associate on an ABDM or NAMASTE project',
      'Self-taught data skills layered onto a clinical degree',
    ],
    demand: 'emerging',
    regions: ['Karnataka', 'Delhi NCR', 'Telangana', 'Maharashtra', 'Remote'],
    learning: [
      {
        title: 'Introduction to Data Analytics',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106107220',
      },
      { title: 'Health Informatics', provider: 'SWAYAM', url: 'https://swayam.gov.in/' },
    ],
  },

  /* ---- Generic paths: the platform is domain-agnostic by design ---------- */

  {
    slug: 'software-engineering',
    title: 'Software Engineering',
    description:
      'Build and maintain software systems. Required skills, entry routes, salary bands and free NPTEL courses for engineering and computer science graduates.',
    domain: 'technology',
    programmes: ['B.Tech', 'BCA', 'MCA', 'B.Sc Computer Science'],
    summary:
      'Included to prove the point: the skill taxonomy is data, not code. The same assessment, matching and verification machinery serves an engineering college with no changes beyond a different seed.',
    dayToDay: [
      'Writing, reviewing and testing application code',
      'Debugging production issues',
      'Designing APIs and data models',
      'Collaborating through version control and code review',
    ],
    skills: [
      { skill: 'Programming fundamentals', level: 4, weight: 1.0, critical: true },
      { skill: 'Data structures and algorithms', level: 4, weight: 0.9, critical: true },
      { skill: 'Version control (Git)', level: 3, weight: 0.8 },
      { skill: 'Databases and SQL', level: 3, weight: 0.8 },
      { skill: 'Problem solving', level: 4, weight: 0.9 },
      { skill: 'Written communication', level: 3, weight: 0.6 },
    ],
    salary: { min: 400000, max: 2500000, note: 'Enormous spread by employer tier and location.' },
    entryRoutes: [
      'Campus placement',
      'Internship converted to full-time',
      'Open-source and portfolio-led hiring',
    ],
    demand: 'growing',
    regions: ['Karnataka', 'Telangana', 'Maharashtra', 'Tamil Nadu', 'Remote'],
    learning: [
      {
        title: 'Programming in Java',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106105191',
      },
      {
        title: 'Data Structures and Algorithms',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106102064',
      },
    ],
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    description:
      'Turn data into decisions — querying, analysis, visualisation and reporting. Skills, entry routes and free courses for graduates from any discipline.',
    domain: 'technology',
    programmes: ['B.Tech', 'B.Sc', 'BBA', 'B.Com', 'Any discipline'],
    summary:
      'One of the few paths genuinely open to graduates from any degree, including clinical ones — which is why it appears on both the Ayush and generic sides of this platform.',
    dayToDay: [
      'Writing SQL queries against operational data',
      'Cleaning and reconciling datasets',
      'Building dashboards and recurring reports',
      'Explaining findings to non-technical stakeholders',
    ],
    skills: [
      { skill: 'SQL and data querying', level: 4, weight: 1.0, critical: true },
      { skill: 'Data analysis and visualisation', level: 4, weight: 0.9, critical: true },
      { skill: 'Spreadsheet proficiency', level: 4, weight: 0.7 },
      { skill: 'Statistics fundamentals', level: 3, weight: 0.8 },
      { skill: 'Written communication', level: 4, weight: 0.8 },
    ],
    salary: {
      min: 350000,
      max: 1800000,
      note: 'Domain expertise plus analytics pays better than analytics alone.',
    },
    entryRoutes: [
      'Analyst trainee programmes',
      'Internal move from an operations role',
      'Portfolio of real analyses',
    ],
    demand: 'growing',
    regions: ['Karnataka', 'Maharashtra', 'Telangana', 'Delhi NCR', 'Remote'],
    learning: [
      {
        title: 'Introduction to Data Analytics',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106107220',
      },
      {
        title: 'Data Science for Engineers',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106106179',
      },
    ],
  },
  {
    slug: 'operations-and-business-management',
    title: 'Operations & Business Management',
    description:
      'Run the machinery of an organisation — process, people, supply and cost. Entry routes and skills for management and commerce graduates.',
    domain: 'business',
    programmes: ['BBA', 'MBA', 'B.Com', 'Any discipline'],
    summary:
      'The broadest generic path, and a common destination for Ayush graduates who move into centre or unit management after a few clinical years.',
    dayToDay: [
      'Process design and continuous improvement',
      'Vendor, inventory and cost management',
      'Coordinating teams and schedules',
      'Reporting on operational metrics',
    ],
    skills: [
      { skill: 'Process design and improvement', level: 4, weight: 1.0, critical: true },
      { skill: 'Centre operations and inventory management', level: 3, weight: 0.8 },
      { skill: 'Spreadsheet proficiency', level: 4, weight: 0.8 },
      { skill: 'Team coordination and leadership', level: 4, weight: 0.9 },
      { skill: 'Written communication', level: 4, weight: 0.8 },
    ],
    salary: { min: 300000, max: 1500000, note: 'Sector matters more than degree at entry level.' },
    entryRoutes: [
      'Management trainee schemes',
      'Operations executive roles',
      'Internal promotion from a specialist role',
    ],
    demand: 'steady',
    regions: ['Maharashtra', 'Delhi NCR', 'Gujarat', 'Karnataka', 'Tamil Nadu'],
    learning: [
      {
        title: 'Operations Management',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/110105124',
      },
      {
        title: 'Soft Skills Development',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/109104107',
      },
    ],
  },
]

export function getCareerPath(slug: string): CareerPath | undefined {
  return careerPaths.find((path) => path.slug === slug)
}

export const careerSlugs = careerPaths.map((path) => path.slug)

/** Formats a salary band the way an Indian reader expects: lakhs per annum. */
export function formatSalaryBand(min: number, max: number): string {
  const lakh = (value: number) => (value / 100000).toFixed(1).replace(/\.0$/, '')
  return `₹${lakh(min)}–${lakh(max)} LPA`
}
