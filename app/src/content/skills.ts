import { careerPaths, type CareerPath } from './careers'

/**
 * Skill hub pages.
 *
 * Descriptions are authored here; **which careers need a skill is derived from
 * careers.ts** rather than duplicated. That keeps the internal link graph automatically
 * consistent - every skill links to its careers, every career links to its skills - which
 * is exactly the dense, genuine internal linking docs/SEO-CHECKLIST.md section 9 asks for.
 *
 * Phase 3 moves these into `Skill` and `SkillCategory`.
 */

export type SkillType = 'DOMAIN' | 'TECHNICAL' | 'SOFT' | 'TOOL'

export interface SkillDefinition {
  slug: string
  name: string
  type: SkillType
  category: string
  /** Under 160 chars - becomes the meta description. */
  description: string
  whatItIs: string
  whyItMatters: string
  howToLearn: { title: string; provider: string; url: string; free: boolean }[]
}

/** Authored content. The name must match the `skill` strings used in careers.ts. */
export const skillDefinitions: SkillDefinition[] = [
  {
    slug: 'ayurvedic-diagnostics',
    name: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)',
    type: 'DOMAIN',
    category: 'Ayurveda — Clinical',
    description:
      'Assessing constitution and imbalance through pulse examination, observation and structured questioning. The foundational clinical skill in Ayurvedic practice.',
    whatItIs:
      "The classical diagnostic framework: determining a patient's prakriti (constitution) and vikriti (current imbalance) through ashtavidha pariksha, with nadi pariksha as its most-discussed component.",
    whyItMatters:
      'Every downstream clinical decision depends on it. It is also the skill employers find hardest to assess from a transcript, which is precisely why an assessment-verified badge for it carries weight.',
    howToLearn: [
      {
        title: 'Ayurvedic Inheritance of India',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/121106003',
        free: true,
      },
    ],
  },
  {
    slug: 'gmp-documentation',
    name: 'GMP documentation and batch records',
    type: 'DOMAIN',
    category: 'Ayush — Manufacturing',
    description:
      'Maintaining Good Manufacturing Practice records for Ayush production — batch manufacturing records, SOPs and audit-ready documentation.',
    whatItIs:
      'The discipline of recording every manufacturing step so a batch can be reconstructed and defended years later: BMRs, SOPs, deviation reports and change control.',
    whyItMatters:
      'It is a legal requirement, and it is the skill that separates a hireable Ayush graduate from an unhireable one in the manufacturing sector — a sector most students never hear about during their degree.',
    howToLearn: [
      {
        title: 'Good Manufacturing Practices',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/',
        free: true,
      },
    ],
  },
  {
    slug: 'panchakarma-procedure-planning',
    name: 'Panchakarma procedure planning',
    type: 'DOMAIN',
    category: 'Ayurveda — Clinical',
    description:
      'Designing and supervising panchakarma protocols — purvakarma preparation, pradhankarma procedures and paschatkarma follow-up.',
    whatItIs:
      'Selecting, sequencing and dosing the five principal purification procedures for an individual patient, including preparation and post-procedure care.',
    whyItMatters:
      'Panchakarma is the commercial engine of Ayush wellness. Centres need someone qualified to design protocols and supervise delivery, and that person is paid accordingly.',
    howToLearn: [
      {
        title: 'Ayurvedic Inheritance of India',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/121106003',
        free: true,
      },
    ],
  },
  {
    slug: 'clinical-research-methodology',
    name: 'Clinical research methodology',
    type: 'TECHNICAL',
    category: 'Research',
    description:
      'Designing and running clinical studies — protocol design, randomisation, blinding, endpoints and bias control.',
    whatItIs:
      'The methods that make a clinical claim defensible: study design, sample size, control of confounding, and honest reporting of what was and was not shown.',
    whyItMatters:
      'Ayush is under sustained pressure to produce evidence. Graduates who can run a methodologically sound study are scarce and immediately useful.',
    howToLearn: [
      {
        title: 'Introduction to Research Methodology',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/',
        free: true,
      },
      {
        title: 'Biostatistics and Design of Experiments',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/102106051',
        free: true,
      },
    ],
  },
  {
    slug: 'ayush-regulatory-framework',
    name: 'Ayush regulatory framework and Drugs & Cosmetics Act',
    type: 'DOMAIN',
    category: 'Ayush — Regulatory',
    description:
      'The licensing and compliance framework governing Ayush products in India, including permissible claims and product approval routes.',
    whatItIs:
      'Schedule T, licensing categories, permissible label claims, and the process by which an Ayush product legally reaches a shelf.',
    whyItMatters:
      'Almost no graduate studies this deliberately, and every manufacturer needs someone who has. Low competition, high responsibility, fast progression.',
    howToLearn: [
      {
        title: 'Intellectual Property Rights and Regulatory Practice',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/',
        free: true,
      },
    ],
  },
  {
    slug: 'scientific-writing',
    name: 'Scientific and protocol writing',
    type: 'TECHNICAL',
    category: 'Communication',
    description:
      'Writing clinical protocols, study reports and scientific manuscripts with precision, structure and defensible claims.',
    whatItIs:
      'Communicating method and result so another professional can evaluate, reproduce or regulate the work — without overstating what the data shows.',
    whyItMatters:
      'It unlocks medical writing, regulatory affairs and research at once, it is learnable from a standing start, and it travels: it is the most remote-friendly skill on this platform.',
    howToLearn: [
      {
        title: 'Technical Writing',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/109104030',
        free: true,
      },
    ],
  },
  {
    slug: 'sql-and-data-querying',
    name: 'SQL and data querying',
    type: 'TECHNICAL',
    category: 'Data',
    description:
      'Retrieving and shaping data from relational databases — the entry skill for every analytics and health-informatics role.',
    whatItIs: 'Reading and writing queries that join, filter and aggregate data held in tables.',
    whyItMatters:
      'It is the lowest-effort, highest-return technical skill a non-technical graduate can acquire, and it is the gateway into Ayush informatics and health data work.',
    howToLearn: [
      {
        title: 'Introduction to Data Analytics',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106107220',
        free: true,
      },
      {
        title: 'Data Science for Engineers',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106106179',
        free: true,
      },
    ],
  },
  {
    slug: 'patient-communication',
    name: 'Patient communication and counselling',
    type: 'SOFT',
    category: 'Communication',
    description:
      'Explaining diagnosis, treatment and lifestyle change in a way patients understand, accept and actually follow.',
    whatItIs:
      'Listening, explaining without jargon, checking understanding, and handling difficult conversations — including uncertainty and non-adherence.',
    whyItMatters:
      'In Ayush practice, adherence to diet and lifestyle advice determines outcomes as much as the prescription does. Patients who do not understand do not comply.',
    howToLearn: [
      {
        title: 'Soft Skills Development',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/109104107',
        free: true,
      },
    ],
  },
  {
    slug: 'pharmacovigilance',
    name: 'Pharmacovigilance and adverse event reporting',
    type: 'DOMAIN',
    category: 'Ayush — Safety',
    description:
      'Detecting, recording, assessing and reporting adverse events associated with Ayush products.',
    whatItIs:
      'Case intake, causality assessment, coding and periodic safety reporting under the national Ayush pharmacovigilance programme.',
    whyItMatters:
      'Safety data is the credibility currency of traditional medicine, and the national programme has more posts than trained applicants.',
    howToLearn: [
      { title: 'Pharmacovigilance', provider: 'SWAYAM', url: 'https://swayam.gov.in/', free: true },
    ],
  },
  {
    slug: 'health-informatics',
    name: 'Health informatics and terminology coding',
    type: 'TECHNICAL',
    category: 'Data',
    description:
      'Structuring clinical information for digital systems — NAMASTE terminology, ICD-11 TM2 mapping and ABDM interoperability.',
    whatItIs:
      'Turning clinical concepts into coded, machine-readable data that health systems can exchange without losing meaning.',
    whyItMatters:
      'Ayush is being brought into national digital health infrastructure. That work needs people who understand the clinical concepts *and* the coding — a combination almost nobody has.',
    howToLearn: [
      {
        title: 'Health Informatics',
        provider: 'SWAYAM',
        url: 'https://swayam.gov.in/',
        free: true,
      },
    ],
  },
]

/* ---- Derived: which careers need each skill ------------------------------ */

export interface SkillHub extends SkillDefinition {
  careers: { path: CareerPath; level: number; weight: number; critical: boolean }[]
  /** Highest weight across all careers — a crude but honest demand proxy until Phase 10. */
  demandScore: number
}

export function getSkillHubs(): SkillHub[] {
  return skillDefinitions
    .map((definition) => {
      const careers = careerPaths
        .map((path) => {
          const requirement = path.skills.find((s) => s.skill === definition.name)
          return requirement
            ? {
                path,
                level: requirement.level,
                weight: requirement.weight,
                critical: Boolean(requirement.critical),
              }
            : null
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
        .sort((a, b) => b.weight - a.weight)

      return {
        ...definition,
        careers,
        demandScore: careers.reduce((total, entry) => total + entry.weight, 0),
      }
    })
    .sort((a, b) => b.demandScore - a.demandScore)
}

export function getSkillHub(slug: string): SkillHub | undefined {
  return getSkillHubs().find((hub) => hub.slug === slug)
}

export const skillSlugs = skillDefinitions.map((skill) => skill.slug)

/** Resolves a skill name used in careers.ts back to its hub page, when one exists. */
export function skillSlugForName(name: string): string | undefined {
  return skillDefinitions.find((skill) => skill.name === name)?.slug
}
