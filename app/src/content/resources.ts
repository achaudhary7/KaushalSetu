/**
 * Insight articles.
 *
 * The only realistic source of organic traffic that is not a job listing. Written as
 * genuinely useful content rather than keyword bait — thin content is both an SEO problem
 * and a demo problem (docs/phases/phase-02-public-seo.md).
 *
 * Stored as structured sections rather than markdown so no parser ships to the browser.
 */

export interface ArticleSection {
  heading?: string
  paragraphs?: string[]
  list?: string[]
}

export interface Article {
  slug: string
  title: string
  /** Under 160 chars — becomes the meta description. */
  description: string
  publishedAt: string
  updatedAt?: string
  readingMinutes: number
  tags: string[]
  /** Opening paragraph, rendered as the lede. */
  lede: string
  sections: ArticleSection[]
  related?: { label: string; href: string }[]
}

export const articles: Article[] = [
  {
    slug: 'what-can-you-do-with-a-bams-degree',
    title: 'What can you actually do with a BAMS degree?',
    description:
      'Eight career paths for BAMS graduates beyond clinical practice — manufacturing, regulatory affairs, research and medical writing.',
    publishedAt: '2026-08-20',
    updatedAt: '2026-09-05',
    readingMinutes: 8,
    tags: ['Ayush careers', 'BAMS', 'Career planning'],
    lede: 'Most BAMS students are told about one career: clinical practice. It is a good career. It is also, by a wide margin, the most competitive one — and it is not the only place a five-and-a-half-year clinical education is valuable.',
    sections: [
      {
        paragraphs: [
          'The gap is not a shortage of jobs. It is a shortage of information. Ayush manufacturing units are legally required to employ qualified Ayush personnel. Clinical research organisations running trials on traditional medicine need people who understand both the classical framework and trial methodology. Regulatory affairs teams need someone who can read a classical text and the Drugs & Cosmetics Act. Almost none of this is mentioned during the degree.',
          'What follows is the shortlist, with the skills each path actually asks for.',
        ],
      },
      {
        heading: '1. Ayush pharmaceutical quality assurance',
        paragraphs: [
          'The single most underrated destination. Manufacturing units need qualified Ayush personnel for raw drug authentication, in-process quality checks and GMP documentation. The work is stable, the pay is competitive from the start, and the competition is thin because most graduates have never heard of it.',
          'What it asks for: GMP documentation, Dravyaguna and raw drug authentication, familiarity with the Ayurvedic Pharmacopoeia of India, and a tolerance for meticulous record-keeping.',
        ],
      },
      {
        heading: '2. Regulatory affairs',
        paragraphs: [
          'Every Ayush product that reaches a shelf passes through someone who understands both the classical basis of the formulation and the regulatory framework governing its claims. Very few graduates train for this deliberately, so those who do tend to move up quickly.',
        ],
      },
      {
        heading: '3. Clinical research',
        paragraphs: [
          'Ayush is under sustained pressure to produce evidence. That work needs people who can design a methodologically sound study and understand what is being studied. A clinically trained graduate with real research methods training is unusually employable, and the training itself is free on SWAYAM.',
        ],
      },
      {
        heading: '4. Medical writing and pharmacovigilance',
        paragraphs: [
          'The most accessible non-clinical path, and the most remote-friendly. It rewards clear writing far more than clinical seniority, which means it is a genuine option from the year you graduate — and one of the few that works part-time alongside practice.',
        ],
      },
      {
        heading: '5–8. The rest of the shortlist',
        list: [
          'Panchakarma therapy and centre management — clinical depth plus operational responsibility, and it pays earlier than general practice',
          'Wellness and medical tourism — India markets this internationally, and those operations need clinically qualified staff',
          'Ayush informatics and health data — emerging, almost no competition, and it needs someone who understands the clinical concepts well enough to model them',
          'Teaching and academia — with an MD and, increasingly, a research record',
        ],
      },
      {
        heading: 'The honest caveat',
        paragraphs: [
          'None of these paths open automatically. Each asks for two or three specific skills your degree touches only lightly — GMP documentation, research methodology, regulatory framework, clear technical writing. The good news is that every one of those is learnable, and the courses that teach them on SWAYAM and NPTEL are free.',
          'The graduates who end up with options are the ones who worked out which two skills their target path needed, and closed those gaps before final year rather than after it.',
        ],
      },
    ],
    related: [
      { label: 'Explore all career paths', href: '/careers' },
      { label: 'Ayush careers in detail', href: '/ayush' },
    ],
  },
  {
    slug: 'how-to-spot-a-fake-internship-offer',
    title: 'How to spot a fake internship offer',
    description:
      'Fake internship scams charge students for worthless certificates. Six checks that take two minutes, and what a genuine offer looks like.',
    publishedAt: '2026-08-26',
    readingMinutes: 5,
    tags: ['Internships', 'Student safety'],
    lede: 'The pattern is consistent enough to be recognisable: an unsolicited offer, an impressive-sounding company, no interview worth the name, and somewhere near the end, a fee. Sometimes it is called a registration charge. Sometimes a certificate fee. Sometimes a refundable security deposit that is never refunded.',
    sections: [
      {
        heading: 'Six checks, two minutes',
        list: [
          'You are asked to pay anything. A genuine internship does not charge you. This single rule catches most of them.',
          'The company has no verifiable registration. Look for a CIN or GSTIN and check it against the MCA register.',
          'There was no real selection process. An offer that arrives without an interview, a task, or any assessment of whether you can do the work is not an offer for work.',
          'The communication comes from a personal email domain rather than a company one.',
          'The role description is vague about what you would actually do, but specific about what you would receive — a certificate, a letter of recommendation, "industry exposure".',
          'You are pressured to decide quickly. Urgency is the oldest tool in the box.',
        ],
      },
      {
        heading: 'Why the certificate matters to them',
        paragraphs: [
          'The product being sold is not the internship. It is the certificate — a document that looks like evidence of experience and costs nothing to produce. It works because a recruiter receiving a printed certificate has no practical way to check it.',
          'That is the actual vulnerability, and it is fixable. A certificate that carries a QR code resolving to a page controlled by the issuing company can be checked in five seconds by anyone, with no account and no phone call. It is the reason we built certificate verification into this platform before we built half the features the brief asked for.',
        ],
      },
      {
        heading: 'What to do if you see one',
        paragraphs: [
          'Report it. Every listing on KaushalSetu has a report control, and reports go to a human review queue. Employers here are verified before a listing goes live, which is friction we chose deliberately — it is the reason the listings you see can be trusted.',
          "If you have already paid, report it to your institution's placement cell and to cybercrime.gov.in. You will not be the only one.",
        ],
      },
    ],
    related: [
      { label: 'Verify a certificate', href: '/verify' },
      { label: 'Browse verified opportunities', href: '/opportunities' },
    ],
  },
  {
    slug: 'free-courses-that-employers-actually-value',
    title: 'Free courses employers actually value',
    description:
      'Which free government courses close the skill gaps employers hire for — mapped to specific Ayush and technical career paths, with no paid alternatives pushed.',
    publishedAt: '2026-08-29',
    readingMinutes: 6,
    tags: ['Learning', 'SWAYAM', 'NPTEL'],
    lede: 'There is an entire industry selling students certificates for skills they could have acquired free. SWAYAM and NPTEL are government platforms, cost nothing, and carry courses from the IITs and central institutions. The problem is not availability. It is knowing which of the thousands on offer map to a job you might actually get.',
    sections: [
      {
        heading: 'Start from the gap, not the catalogue',
        paragraphs: [
          'Browsing a course catalogue and picking what looks interesting is how people end up with six half-finished certificates and no new capability. The order that works is the opposite: pick a target role, find the two or three skills you are missing for it, then find courses for exactly those.',
          'That is the whole logic behind the learning paths on this platform — every identified gap resolves to specific free courses, ordered by prerequisite, rather than a catalogue to browse.',
        ],
      },
      {
        heading: 'For Ayush graduates',
        list: [
          'Research methodology (SWAYAM) — the gateway to clinical research roles, and the single highest-return course for a clinical graduate',
          'Good Manufacturing Practices (SWAYAM) — required for Ayush manufacturing QA, a sector most graduates never consider',
          'Technical Writing (NPTEL) — unlocks medical writing and regulatory affairs at once, and it is remote-friendly work',
          'Biostatistics and Design of Experiments (NPTEL) — pairs with research methodology; together they make you employable in trials',
          'Introduction to Data Analytics (NPTEL) — the entry point to Ayush informatics, an emerging field with almost no competition',
        ],
      },
      {
        heading: 'For engineering and general graduates',
        list: [
          'Data Structures and Algorithms (NPTEL) — still the thing technical interviews test',
          'Data Science for Engineers (NPTEL) — broader and more practical than most paid alternatives',
          'Operations Management (NPTEL) — undervalued, and it applies in every sector',
          'Soft Skills Development (NPTEL) — genuinely useful, and the skill employers most often cite when rejecting candidates',
        ],
      },
      {
        heading: 'A word on certificates',
        paragraphs: [
          'A course certificate proves attendance, not capability, and experienced recruiters know the difference. What changes a hiring decision is being able to demonstrate the skill — a piece of work, a project, an assessment score someone else administered.',
          'Take the course. Then do something with it that produces evidence.',
        ],
      },
    ],
    related: [
      { label: 'Browse skills and their free courses', href: '/skills' },
      { label: 'Explore career paths', href: '/careers' },
    ],
  },
  {
    slug: 'micro-internships-for-first-and-second-years',
    title: 'Micro-internships: what to do in first and second year',
    description:
      'You do not have to wait until final year to build a portfolio. Short, paid, one-to-four-week projects that produce real evidence of capability.',
    publishedAt: '2026-09-03',
    readingMinutes: 4,
    tags: ['Internships', 'Career planning'],
    lede: 'The standard advice to a first-year student is to wait. Build your basics, focus on academics, worry about placements in third year. It is not bad advice, but it produces a predictable outcome: in final year, every student in the cohort has an identical profile and nothing to distinguish them.',
    sections: [
      {
        heading: 'The alternative',
        paragraphs: [
          'A micro-internship is a short, scoped, paid piece of real work — typically one to four weeks. Rewriting a set of patient information leaflets. Mapping a terminology set. Cleaning and analysing a dataset. Building one component of an interface.',
          'It is small enough that a company will hand it to someone unproven, and real enough that finishing it produces evidence: a piece of work, a named reference, and — on this platform — an endorsement from a verified employer attached to a specific skill.',
        ],
      },
      {
        heading: 'Why companies offer them',
        paragraphs: [
          'Because a three-week commitment to an unproven student is a small risk, and a six-month one is not. Micro-internships are how a company finds out whether you are worth a longer offer, which is exactly why a meaningful share of them convert.',
        ],
      },
      {
        heading: 'What to look for in your first one',
        list: [
          'It is paid. Unpaid "exposure" work is worth what you pay for it.',
          'The deliverable is concrete — something you can point at afterwards.',
          'The employer is verified, so the endorsement you earn means something.',
          'It uses a skill on the path you are actually interested in, not just any skill.',
        ],
      },
      {
        heading: 'The compounding effect',
        paragraphs: [
          'Two micro-internships in second year and one longer internship in third year is a materially different profile from one final-year internship. Not because of the hours, but because each one produces verified skills and a reference, and those accumulate into something a recruiter can check.',
          'The students who struggle in placement season are rarely the ones who lacked ability. They are the ones with no evidence of it.',
        ],
      },
    ],
    related: [
      { label: 'Find micro-internships', href: '/opportunities?type=MICRO_INTERNSHIP' },
      { label: 'How verification works', href: '/for-students' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export const articleSlugs = articles.map((article) => article.slug)
