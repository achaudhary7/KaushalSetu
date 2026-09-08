import type { PrismaClient } from '../../src/generated/prisma/client'
import { careerPaths } from '../../src/content/careers'
import { opportunities } from '../../src/content/opportunities'
import { skillDefinitions } from '../../src/content/skills'

/**
 * The skill taxonomy.
 *
 * This is the file that makes the "domain-agnostic by design" claim true: swapping
 * Ayush for engineering is a change here, and nowhere else. Ayush branches are built
 * out first and in most depth (CONTEXT.md section 5); generic branches ship alongside
 * so the platform demos for any institution.
 *
 * Every skill referenced anywhere in src/content MUST appear in `skillCatalogue` —
 * `assertCatalogueComplete()` fails the seed loudly if one is missing, which is how we
 * catch content drift instead of discovering it as a foreign-key error mid-demo.
 */

type Domain = 'AYUSH' | 'TECHNOLOGY' | 'BUSINESS' | 'HEALTHCARE' | 'OTHER'
type Type = 'TECHNICAL' | 'SOFT' | 'DOMAIN' | 'TOOL'

interface CategorySeed {
  name: string
  slug: string
  domain: Domain
  description: string
  sortOrder: number
}

export const categories: CategorySeed[] = [
  // ---- Ayush: the differentiator, aligned to NCISM curriculum areas ----------
  { name: 'Ayurveda — Clinical', slug: 'ayurveda-clinical', domain: 'AYUSH', sortOrder: 1,
    description: 'Diagnosis, treatment planning and patient management in Ayurvedic practice.' },
  { name: 'Ayurveda — Pharmacology', slug: 'ayurveda-pharmacology', domain: 'AYUSH', sortOrder: 2,
    description: 'Dravyaguna, Rasashastra and Bhaishajya Kalpana — the medicine itself.' },
  { name: 'Ayush — Manufacturing', slug: 'ayush-manufacturing', domain: 'AYUSH', sortOrder: 3,
    description: 'GMP-regulated production, quality control and standardisation.' },
  { name: 'Ayush — Regulatory', slug: 'ayush-regulatory', domain: 'AYUSH', sortOrder: 4,
    description: 'Licensing, permissible claims and compliance under the Drugs & Cosmetics Act.' },
  { name: 'Ayush — Safety', slug: 'ayush-safety', domain: 'AYUSH', sortOrder: 5,
    description: 'Pharmacovigilance and adverse event monitoring for Ayush products.' },
  { name: 'Wellness & Therapy', slug: 'wellness-therapy', domain: 'AYUSH', sortOrder: 6,
    description: 'Panchakarma delivery, wellness programme design and centre operations.' },

  // ---- Cross-domain -------------------------------------------------------
  { name: 'Research', slug: 'research', domain: 'HEALTHCARE', sortOrder: 10,
    description: 'Study design, evidence appraisal and trial conduct.' },
  { name: 'Data', slug: 'data', domain: 'TECHNOLOGY', sortOrder: 11,
    description: 'Querying, analysis, visualisation and health informatics.' },
  { name: 'Software', slug: 'software', domain: 'TECHNOLOGY', sortOrder: 12,
    description: 'Building and maintaining software systems.' },
  { name: 'Communication', slug: 'communication', domain: 'OTHER', sortOrder: 13,
    description: 'Writing, explaining and being understood — clinically and commercially.' },
  { name: 'Operations & Management', slug: 'operations-management', domain: 'BUSINESS', sortOrder: 14,
    description: 'Process, people, inventory and cost.' },
  { name: 'Professional Skills', slug: 'professional-skills', domain: 'OTHER', sortOrder: 15,
    description: 'The behaviours employers cite most often when rejecting candidates.' },
]

interface SkillSeed {
  name: string
  slug: string
  category: string
  type: Type
  /// NCISM curriculum area, where one applies. This is the Ayush alignment made concrete.
  ncismArea?: string
}

/**
 * Every skill in the platform. Names must match `src/content/*.ts` exactly.
 */
export const skillCatalogue: SkillSeed[] = [
  // ---- Ayurveda — Clinical -------------------------------------------------
  { name: 'Ayurvedic diagnostics (Nadi Pariksha, Prakriti assessment)', slug: 'ayurvedic-diagnostics', category: 'ayurveda-clinical', type: 'DOMAIN', ncismArea: 'Roga Nidana evam Vikriti Vigyan' },
  { name: 'Clinical documentation and case records', slug: 'clinical-documentation', category: 'ayurveda-clinical', type: 'DOMAIN', ncismArea: 'Kayachikitsa' },
  { name: 'Medical ethics and NCISM practice standards', slug: 'medical-ethics', category: 'ayurveda-clinical', type: 'DOMAIN', ncismArea: 'Agada Tantra evam Vidhi Vaidyaka' },
  { name: 'Ayurvedic diet and lifestyle counselling', slug: 'ayurvedic-diet-counselling', category: 'ayurveda-clinical', type: 'DOMAIN', ncismArea: 'Swasthavritta evam Yoga' },

  // ---- Ayurveda — Pharmacology --------------------------------------------
  { name: 'Classical formulation knowledge (Bhaishajya Kalpana)', slug: 'bhaishajya-kalpana', category: 'ayurveda-pharmacology', type: 'DOMAIN', ncismArea: 'Rasashastra evam Bhaishajya Kalpana' },
  { name: 'Dravyaguna and raw drug authentication', slug: 'dravyaguna', category: 'ayurveda-pharmacology', type: 'DOMAIN', ncismArea: 'Dravyaguna Vigyan' },
  { name: 'Rasashastra and Bhaishajya Kalpana', slug: 'rasashastra', category: 'ayurveda-pharmacology', type: 'DOMAIN', ncismArea: 'Rasashastra evam Bhaishajya Kalpana' },
  { name: 'Ayurvedic Pharmacopoeia of India standards', slug: 'api-standards', category: 'ayurveda-pharmacology', type: 'DOMAIN', ncismArea: 'Rasashastra evam Bhaishajya Kalpana' },

  // ---- Ayush — Manufacturing ----------------------------------------------
  { name: 'GMP documentation and batch records', slug: 'gmp-documentation', category: 'ayush-manufacturing', type: 'DOMAIN' },
  { name: 'Analytical instrumentation (HPTLC, HPLC basics)', slug: 'analytical-instrumentation', category: 'ayush-manufacturing', type: 'TECHNICAL' },
  { name: 'Quality systems and audit readiness', slug: 'quality-systems', category: 'ayush-manufacturing', type: 'DOMAIN' },

  // ---- Ayush — Regulatory --------------------------------------------------
  { name: 'Ayush regulatory framework and Drugs & Cosmetics Act', slug: 'ayush-regulatory-framework', category: 'ayush-regulatory', type: 'DOMAIN' },
  { name: 'Product dossier and technical writing', slug: 'product-dossier-writing', category: 'ayush-regulatory', type: 'TECHNICAL' },

  // ---- Ayush — Safety ------------------------------------------------------
  { name: 'Pharmacovigilance and adverse event reporting', slug: 'pharmacovigilance', category: 'ayush-safety', type: 'DOMAIN' },

  // ---- Wellness & Therapy --------------------------------------------------
  { name: 'Panchakarma procedure planning', slug: 'panchakarma-procedure-planning', category: 'wellness-therapy', type: 'DOMAIN', ncismArea: 'Panchakarma' },
  { name: 'Therapist supervision and training', slug: 'therapist-supervision', category: 'wellness-therapy', type: 'SOFT' },
  { name: 'Wellness programme design', slug: 'wellness-programme-design', category: 'wellness-therapy', type: 'DOMAIN' },
  { name: 'Guest experience and cross-cultural communication', slug: 'guest-experience', category: 'wellness-therapy', type: 'SOFT' },
  { name: 'Infection control and safety protocols', slug: 'infection-control', category: 'wellness-therapy', type: 'DOMAIN' },

  // ---- Research ------------------------------------------------------------
  { name: 'Clinical research methodology', slug: 'clinical-research-methodology', category: 'research', type: 'TECHNICAL' },
  { name: 'Good Clinical Practice (GCP)', slug: 'good-clinical-practice', category: 'research', type: 'TECHNICAL' },
  { name: 'Biostatistics fundamentals', slug: 'biostatistics', category: 'research', type: 'TECHNICAL' },
  { name: 'Literature search and appraisal', slug: 'literature-appraisal', category: 'research', type: 'TECHNICAL' },
  { name: 'Statistics fundamentals', slug: 'statistics-fundamentals', category: 'research', type: 'TECHNICAL' },

  // ---- Data ----------------------------------------------------------------
  { name: 'Health informatics and terminology coding', slug: 'health-informatics', category: 'data', type: 'TECHNICAL' },
  { name: 'SQL and data querying', slug: 'sql-and-data-querying', category: 'data', type: 'TECHNICAL' },
  { name: 'Data analysis and visualisation', slug: 'data-analysis', category: 'data', type: 'TECHNICAL' },
  { name: 'Data management and documentation', slug: 'data-management', category: 'data', type: 'TECHNICAL' },
  { name: 'Spreadsheet proficiency', slug: 'spreadsheet-proficiency', category: 'data', type: 'TOOL' },

  // ---- Software ------------------------------------------------------------
  { name: 'Programming fundamentals', slug: 'programming-fundamentals', category: 'software', type: 'TECHNICAL' },
  { name: 'Data structures and algorithms', slug: 'data-structures-algorithms', category: 'software', type: 'TECHNICAL' },
  { name: 'Version control (Git)', slug: 'version-control-git', category: 'software', type: 'TOOL' },
  { name: 'Databases and SQL', slug: 'databases-and-sql', category: 'software', type: 'TECHNICAL' },

  // ---- Communication -------------------------------------------------------
  { name: 'Scientific and protocol writing', slug: 'scientific-writing', category: 'communication', type: 'TECHNICAL' },
  { name: 'Patient communication and counselling', slug: 'patient-communication', category: 'communication', type: 'SOFT' },
  { name: 'English written communication', slug: 'english-written-communication', category: 'communication', type: 'SOFT' },
  { name: 'Written communication', slug: 'written-communication', category: 'communication', type: 'SOFT' },
  { name: 'Requirements gathering and specification', slug: 'requirements-gathering', category: 'communication', type: 'TECHNICAL' },

  // ---- Operations & Management ---------------------------------------------
  { name: 'Centre operations and inventory management', slug: 'centre-operations', category: 'operations-management', type: 'DOMAIN' },
  { name: 'Process design and improvement', slug: 'process-design', category: 'operations-management', type: 'TECHNICAL' },
  { name: 'Team coordination and leadership', slug: 'team-coordination', category: 'operations-management', type: 'SOFT' },

  // ---- Professional Skills (the full soft-skill branch the spec asks for) ---
  { name: 'Problem solving', slug: 'problem-solving', category: 'professional-skills', type: 'SOFT' },
  { name: 'Attention to detail and compliance discipline', slug: 'attention-to-detail', category: 'professional-skills', type: 'SOFT' },
  { name: 'Teamwork and collaboration', slug: 'teamwork', category: 'professional-skills', type: 'SOFT' },
  { name: 'Adaptability', slug: 'adaptability', category: 'professional-skills', type: 'SOFT' },
  { name: 'Time management', slug: 'time-management', category: 'professional-skills', type: 'SOFT' },
  { name: 'Professional ethics', slug: 'professional-ethics', category: 'professional-skills', type: 'SOFT' },
  { name: 'Learning agility', slug: 'learning-agility', category: 'professional-skills', type: 'SOFT' },
]

/** Prerequisite / related edges, so learning paths can be ordered sensibly. */
export const skillRelations: { from: string; to: string; type: 'PREREQUISITE' | 'RELATED' | 'SUCCESSOR' }[] = [
  { from: 'clinical-research-methodology', to: 'biostatistics', type: 'RELATED' },
  { from: 'clinical-research-methodology', to: 'good-clinical-practice', type: 'RELATED' },
  { from: 'biostatistics', to: 'statistics-fundamentals', type: 'PREREQUISITE' },
  { from: 'scientific-writing', to: 'english-written-communication', type: 'PREREQUISITE' },
  { from: 'product-dossier-writing', to: 'scientific-writing', type: 'PREREQUISITE' },
  { from: 'gmp-documentation', to: 'api-standards', type: 'RELATED' },
  { from: 'gmp-documentation', to: 'quality-systems', type: 'SUCCESSOR' },
  { from: 'ayush-regulatory-framework', to: 'gmp-documentation', type: 'RELATED' },
  { from: 'panchakarma-procedure-planning', to: 'ayurvedic-diagnostics', type: 'PREREQUISITE' },
  { from: 'wellness-programme-design', to: 'panchakarma-procedure-planning', type: 'PREREQUISITE' },
  { from: 'health-informatics', to: 'sql-and-data-querying', type: 'RELATED' },
  { from: 'data-analysis', to: 'sql-and-data-querying', type: 'PREREQUISITE' },
  { from: 'pharmacovigilance', to: 'literature-appraisal', type: 'RELATED' },
  { from: 'data-structures-algorithms', to: 'programming-fundamentals', type: 'PREREQUISITE' },
]

/**
 * Fails loudly if src/content references a skill this catalogue does not define.
 *
 * This is the guard that keeps the Phase 2 content contract and the Phase 3 schema in
 * step. Without it, a renamed skill in careers.ts becomes a silent FK failure later.
 */
export function assertCatalogueComplete(): void {
  const defined = new Set(skillCatalogue.map((s) => s.name))
  const referenced = new Set<string>()

  for (const path of careerPaths) {
    for (const requirement of path.skills) referenced.add(requirement.skill)
  }
  for (const opportunity of opportunities) {
    for (const skill of opportunity.skills) referenced.add(skill.name)
  }
  for (const definition of skillDefinitions) referenced.add(definition.name)

  const missing = [...referenced].filter((name) => !defined.has(name))
  if (missing.length > 0) {
    throw new Error(
      `Skill catalogue is incomplete. These skills are referenced in src/content but not ` +
        `defined in prisma/seed/taxonomy.ts:\n  - ${missing.join('\n  - ')}`,
    )
  }

  const slugs = skillCatalogue.map((s) => s.slug)
  const dupes = slugs.filter((slug, i) => slugs.indexOf(slug) !== i)
  if (dupes.length > 0) {
    throw new Error(`Duplicate skill slugs in catalogue: ${[...new Set(dupes)].join(', ')}`)
  }
}

/** Level descriptors, so a proficiency number means something concrete. */
function levelDescriptors(type: Type): string {
  const bands =
    type === 'SOFT'
      ? [
          'Rarely demonstrates this',
          'Demonstrates it with prompting',
          'Demonstrates it consistently in familiar situations',
          'Demonstrates it under pressure and in unfamiliar situations',
          'Models it for others and coaches them',
        ]
      : [
          'Aware of the concept; cannot apply it unaided',
          'Applies it with close supervision',
          'Applies it independently in routine cases',
          'Handles non-routine cases and explains the reasoning',
          'Sets standards and trains others',
        ]
  return JSON.stringify(
    Object.fromEntries(bands.map((description, index) => [index + 1, description])),
  )
}

export async function seedTaxonomy(prisma: PrismaClient) {
  assertCatalogueComplete()

  for (const category of categories) {
    await prisma.skillCategory.create({ data: category })
  }

  const categoryIds = new Map(
    (await prisma.skillCategory.findMany({ select: { id: true, slug: true } })).map((c) => [
      c.slug,
      c.id,
    ]),
  )

  // Authored descriptions from src/content/skills.ts, where a hub page exists.
  const authored = new Map(skillDefinitions.map((d) => [d.name, d]))

  for (const skill of skillCatalogue) {
    const categoryId = categoryIds.get(skill.category)
    if (!categoryId) throw new Error(`Unknown category "${skill.category}" for skill ${skill.slug}`)
    const detail = authored.get(skill.name)

    await prisma.skill.create({
      data: {
        name: skill.name,
        slug: skill.slug,
        categoryId,
        type: skill.type,
        description: detail?.description ?? null,
        whatItIs: detail?.whatItIs ?? null,
        whyItMatters: detail?.whyItMatters ?? null,
        levelDescriptors: levelDescriptors(skill.type),
        ncismArea: skill.ncismArea ?? null,
      },
    })
  }

  const skillIds = new Map(
    (await prisma.skill.findMany({ select: { id: true, slug: true } })).map((s) => [s.slug, s.id]),
  )

  for (const relation of skillRelations) {
    const fromSkillId = skillIds.get(relation.from)
    const toSkillId = skillIds.get(relation.to)
    if (!fromSkillId || !toSkillId) {
      throw new Error(`Skill relation references unknown slug: ${relation.from} -> ${relation.to}`)
    }
    await prisma.skillRelation.create({
      data: { fromSkillId, toSkillId, type: relation.type },
    })
  }

  return {
    categories: categories.length,
    skills: skillCatalogue.length,
    relations: skillRelations.length,
  }
}
