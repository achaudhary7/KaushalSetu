import { hash } from 'node:crypto'

import type { PrismaClient } from '../../src/generated/prisma/client'
import { opportunities } from '../../src/content/opportunities'

/**
 * The demo world.
 *
 * A story dataset, not a random one (docs/phases/phase-15-demo-pack.md). Named people
 * with believable situations, so a judge watching the demo follows a narrative rather
 * than reading "Student 1 / Skill A / 50%".
 *
 *   Ananya    3rd-year BAMS   strong clinically, gaps in regulatory + research  <- main thread
 *   Rahul     1st-year B.Pharm  almost no profile; the micro-internship story
 *   Meera     Associate Professor of Dravyaguna; the academician track
 *   Vikram    recruiter at a verified Ayush manufacturer; the industry thread
 *   Priya     placement officer at AIIA; the institution and policy thread
 *
 * Passwords are seeded as a placeholder hash. Phase 4 replaces this with bcrypt at
 * registration — nothing here is a real credential.
 */

const DEMO_PASSWORD = 'KaushalSetu@2026'

/** Placeholder only. Phase 4 introduces bcrypt; this exists so the column is not null. */
function placeholderHash(email: string): string {
  return `seed$${hash('sha256', `${email}:${DEMO_PASSWORD}`)}`
}

export async function seedOrganisations(prisma: PrismaClient) {
  const regions = new Map(
    (await prisma.region.findMany({ select: { id: true, slug: true } })).map((r) => [r.slug, r.id]),
  )

  const institutions = [
    {
      name: 'All India Institute of Ayurveda, New Delhi',
      slug: 'aiia-new-delhi',
      code: 'NCISM-DL-001',
      type: 'Ayush Institute',
      about:
        'An apex Ayurveda institute under the Ministry of Ayush, offering undergraduate, postgraduate and doctoral programmes alongside clinical research.',
      websiteUrl: 'https://aiia.gov.in',
      regionSlug: 'new-delhi',
    },
    {
      name: 'Government Ayurveda College, Thiruvananthapuram',
      slug: 'gac-thiruvananthapuram',
      code: 'NCISM-KL-004',
      type: 'Ayush College',
      about: 'One of the oldest Ayurveda colleges in India, with a large teaching hospital.',
      regionSlug: 'thiruvananthapuram',
    },
    {
      name: 'Sardar Patel Institute of Technology',
      slug: 'spit',
      code: 'AISHE-C-12345',
      type: 'Engineering College',
      about:
        'An autonomous engineering institute. Included to demonstrate that the platform is domain-agnostic.',
      regionSlug: 'maharashtra',
    },
  ]

  for (const institution of institutions) {
    const { regionSlug, ...data } = institution
    await prisma.institution.create({
      data: { ...data, regionId: regions.get(regionSlug) ?? null },
    })
  }

  // Companies are derived from the Phase 2 opportunity fixtures, so the public pages
  // and the database describe the same employers.
  const companySeeds = new Map<string, { sector: string; about: string; regionSlug: string }>()
  for (const opportunity of opportunities) {
    if (!companySeeds.has(opportunity.company.name)) {
      companySeeds.set(opportunity.company.name, {
        sector: opportunity.company.sector,
        about: opportunity.company.about,
        regionSlug: opportunity.location.city.toLowerCase().replace(/\s+/g, '-'),
      })
    }
  }

  for (const [name, detail] of companySeeds) {
    await prisma.company.create({
      data: {
        name,
        slug: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        sector: detail.sector,
        about: detail.about,
        cin: `U${Math.floor(10000 + Math.random() * 89999)}DL2019PTC${Math.floor(
          100000 + Math.random() * 899999,
        )}`,
        verification: 'VERIFIED',
        verifiedAt: new Date('2026-07-15'),
        regionId: regions.get(detail.regionSlug) ?? null,
      },
    })
  }

  // One company deliberately left PENDING, so the Phase 4 admin verification queue has
  // something real to show and the gate can be demonstrated blocking a publish.
  await prisma.company.create({
    data: {
      name: 'Nirmal Ayurveda Exports',
      slug: 'nirmal-ayurveda-exports',
      sector: 'Ayush Pharmaceuticals',
      about: 'A small Ayush exporter awaiting verification of its company registration.',
      cin: 'U24239GJ2024PTC141872',
      verification: 'PENDING',
      regionId: regions.get('gujarat') ?? null,
    },
  })

  return { institutions: institutions.length, companies: companySeeds.size + 1 }
}

export async function seedPeople(prisma: PrismaClient) {
  const institutions = new Map(
    (await prisma.institution.findMany({ select: { id: true, slug: true } })).map((i) => [
      i.slug,
      i.id,
    ]),
  )
  const companies = new Map(
    (await prisma.company.findMany({ select: { id: true, slug: true } })).map((c) => [c.slug, c.id]),
  )
  const regions = new Map(
    (await prisma.region.findMany({ select: { id: true, slug: true } })).map((r) => [r.slug, r.id]),
  )
  const skills = new Map(
    (await prisma.skill.findMany({ select: { id: true, slug: true } })).map((s) => [s.slug, s.id]),
  )

  async function createUser(input: {
    email: string
    name: string
    role: 'STUDENT' | 'ACADEMICIAN' | 'INDUSTRY' | 'INSTITUTION' | 'ADMIN'
  }) {
    return prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        role: input.role,
        passwordHash: placeholderHash(input.email),
        emailVerified: new Date('2026-08-01'),
        onboardedAt: new Date('2026-08-01'),
      },
    })
  }

  /* ---- Ananya — the main demo thread -------------------------------------- */
  const ananya = await createUser({
    email: 'ananya@student.aiia.gov.in',
    name: 'Ananya Sharma',
    role: 'STUDENT',
  })
  await prisma.studentProfile.create({
    data: {
      userId: ananya.id,
      institutionId: institutions.get('aiia-new-delhi') ?? null,
      programme: 'BAMS',
      yearOfStudy: 3,
      graduationYear: 2028,
      cgpa: 8.2,
      rollNumber: 'AIIA/BAMS/2023/042',
      regionId: regions.get('new-delhi') ?? null,
      headline: 'Third-year BAMS student interested in clinical research and regulatory affairs',
      careerGoal: 'ayush-clinical-research',
    },
  })
  // Strong clinically, weak exactly where the platform will point her.
  const ananyaSkills: [string, number, 'SELF_DECLARED' | 'ASSESSMENT_VERIFIED'][] = [
    ['ayurvedic-diagnostics', 4, 'ASSESSMENT_VERIFIED'],
    ['bhaishajya-kalpana', 4, 'ASSESSMENT_VERIFIED'],
    ['dravyaguna', 3.5, 'ASSESSMENT_VERIFIED'],
    ['patient-communication', 4, 'ASSESSMENT_VERIFIED'],
    ['panchakarma-procedure-planning', 3, 'SELF_DECLARED'],
    ['clinical-research-methodology', 1.5, 'ASSESSMENT_VERIFIED'],
    ['good-clinical-practice', 1, 'SELF_DECLARED'],
    ['scientific-writing', 2, 'ASSESSMENT_VERIFIED'],
    ['ayush-regulatory-framework', 1, 'SELF_DECLARED'],
    ['english-written-communication', 3.5, 'ASSESSMENT_VERIFIED'],
  ]
  for (const [slug, proficiency, tier] of ananyaSkills) {
    const skillId = skills.get(slug)
    if (skillId) {
      await prisma.userSkill.create({
        data: { userId: ananya.id, skillId, proficiency, verificationTier: tier },
      })
    }
  }

  /* ---- Rahul — the junior-student story ----------------------------------- */
  const rahul = await createUser({
    email: 'rahul@student.spit.ac.in',
    name: 'Rahul Verma',
    role: 'STUDENT',
  })
  await prisma.studentProfile.create({
    data: {
      userId: rahul.id,
      institutionId: institutions.get('spit') ?? null,
      programme: 'B.Tech',
      branch: 'Computer Engineering',
      yearOfStudy: 1,
      graduationYear: 2030,
      cgpa: 7.4,
      regionId: regions.get('maharashtra') ?? null,
      headline: 'First-year student looking for a first real piece of work',
    },
  })
  for (const [slug, proficiency] of [
    ['programming-fundamentals', 2],
    ['english-written-communication', 3],
    ['problem-solving', 2.5],
  ] as [string, number][]) {
    const skillId = skills.get(slug)
    if (skillId) {
      await prisma.userSkill.create({
        data: { userId: rahul.id, skillId, proficiency, verificationTier: 'SELF_DECLARED' },
      })
    }
  }

  /* ---- More students, so cohort analytics are not a sample of two ---------- */
  const cohort = [
    { name: 'Karthik Nair', email: 'karthik@student.gac.ac.in', inst: 'gac-thiruvananthapuram', programme: 'BAMS', year: 4, cgpa: 7.8 },
    { name: 'Priya Das', email: 'priya.d@student.aiia.gov.in', inst: 'aiia-new-delhi', programme: 'BAMS', year: 4, cgpa: 8.9 },
    { name: 'Sanjay Rao', email: 'sanjay@student.gac.ac.in', inst: 'gac-thiruvananthapuram', programme: 'BAMS', year: 2, cgpa: 6.9 },
    { name: 'Fatima Sheikh', email: 'fatima@student.aiia.gov.in', inst: 'aiia-new-delhi', programme: 'BUMS', year: 3, cgpa: 8.1 },
    { name: 'Arjun Menon', email: 'arjun@student.spit.ac.in', inst: 'spit', programme: 'B.Tech', year: 3, cgpa: 8.6 },
    { name: 'Divya Krishnan', email: 'divya@student.gac.ac.in', inst: 'gac-thiruvananthapuram', programme: 'BAMS', year: 3, cgpa: 7.2 },
  ]
  const cohortIds: string[] = []
  for (const student of cohort) {
    const user = await createUser({ email: student.email, name: student.name, role: 'STUDENT' })
    cohortIds.push(user.id)
    await prisma.studentProfile.create({
      data: {
        userId: user.id,
        institutionId: institutions.get(student.inst) ?? null,
        programme: student.programme,
        yearOfStudy: student.year,
        cgpa: student.cgpa,
      },
    })
    // Varied, deterministic skill spread so charts have real shape.
    const slugs = student.programme === 'B.Tech'
      ? ['programming-fundamentals', 'data-structures-algorithms', 'version-control-git', 'problem-solving']
      : ['ayurvedic-diagnostics', 'dravyaguna', 'panchakarma-procedure-planning', 'patient-communication', 'gmp-documentation']
    for (const [index, slug] of slugs.entries()) {
      const skillId = skills.get(slug)
      if (!skillId) continue
      await prisma.userSkill.create({
        data: {
          userId: user.id,
          skillId,
          proficiency: Math.min(5, 1.5 + ((student.cgpa - 6.5) * 0.8) + index * 0.3),
          verificationTier: index < 2 ? 'ASSESSMENT_VERIFIED' : 'SELF_DECLARED',
        },
      })
    }
  }

  /* ---- Dr Meera — the academician track ----------------------------------- */
  const meera = await createUser({
    email: 'meera.iyer@aiia.gov.in',
    name: 'Dr Meera Iyer',
    role: 'ACADEMICIAN',
  })
  await prisma.academicianProfile.create({
    data: {
      userId: meera.id,
      institutionId: institutions.get('aiia-new-delhi') ?? null,
      department: 'Dravyaguna',
      designation: 'Associate Professor',
      qualifications: 'BAMS, MD (Dravyaguna), PhD',
      yearsTeaching: 12,
      industryMonths: 6,
      publications: 23,
      specialisations: JSON.stringify(['Dravyaguna Vigyan', 'Herbal pharmacology', 'Standardisation']),
      researchAreas: JSON.stringify(['Formulation standardisation', 'Pharmacovigilance']),
      isPublic: true,
    },
  })

  /* ---- Vikram — the industry thread --------------------------------------- */
  const vikram = await createUser({
    email: 'vikram@himalayawellness.example',
    name: 'Vikram Joshi',
    role: 'INDUSTRY',
  })
  const himalaya = companies.get('himalaya-wellness-pvt-ltd')
  if (himalaya) {
    await prisma.industryProfile.create({
      data: { userId: vikram.id, companyId: himalaya, jobTitle: 'Head of Quality Assurance' },
    })
  }

  /* ---- Priya — the institution / policy thread ---------------------------- */
  const placementOfficer = await createUser({
    email: 'placements@aiia.gov.in',
    name: 'Priya Menon',
    role: 'INSTITUTION',
  })
  const aiia = institutions.get('aiia-new-delhi')
  if (aiia) {
    await prisma.institutionProfile.create({
      data: {
        userId: placementOfficer.id,
        institutionId: aiia,
        jobTitle: 'Placement & Training Officer',
      },
    })
  }

  /* ---- Admin --------------------------------------------------------------- */
  await createUser({ email: 'admin@kaushalsetu.in', name: 'Platform Admin', role: 'ADMIN' })

  return {
    users: 3 + cohort.length + 4,
    demoPassword: DEMO_PASSWORD,
    ids: { ananya: ananya.id, rahul: rahul.id, meera: meera.id, vikram: vikram.id, cohortIds },
  }
}

export async function seedOpportunities(prisma: PrismaClient) {
  const companies = new Map(
    (await prisma.company.findMany({ select: { id: true, name: true } })).map((c) => [c.name, c.id]),
  )
  const regions = new Map(
    (await prisma.region.findMany({ select: { id: true, slug: true } })).map((r) => [r.slug, r.id]),
  )
  const careers = new Map(
    (await prisma.careerPath.findMany({ select: { id: true, slug: true } })).map((c) => [
      c.slug,
      c.id,
    ]),
  )
  const skills = new Map(
    (await prisma.skill.findMany({ select: { id: true, name: true } })).map((s) => [s.name, s.id]),
  )

  let skillLinks = 0
  for (const opportunity of opportunities) {
    const companyId = companies.get(opportunity.company.name)
    if (!companyId) throw new Error(`Unknown company: ${opportunity.company.name}`)

    const created = await prisma.opportunity.create({
      data: {
        title: opportunity.title,
        slug: opportunity.slug,
        type: opportunity.type,
        status: 'PUBLISHED',
        companyId,
        careerPathId: opportunity.careerSlug ? (careers.get(opportunity.careerSlug) ?? null) : null,
        regionId: regions.get(opportunity.location.city.toLowerCase().replace(/\s+/g, '-')) ?? null,
        city: opportunity.location.city,
        mode: opportunity.mode,
        summary: opportunity.summary,
        responsibilities: JSON.stringify(opportunity.responsibilities),
        stipendMin: opportunity.stipend?.min ?? null,
        stipendMax: opportunity.stipend?.max ?? null,
        stipendPeriod: opportunity.stipend?.period ?? null,
        durationWeeks: opportunity.durationWeeks ?? null,
        openings: opportunity.openings,
        postedAt: new Date(opportunity.postedAt),
        deadline: new Date(opportunity.deadline),
        // Two employers demonstrate blind screening; the rest do not, so the
        // difference is visible in the demo.
        blindScreening: opportunity.type === 'INTERNSHIP' || opportunity.type === 'JOB',
        viewCount: 40 + opportunity.openings * 17,
      },
    })

    await prisma.eligibilityCriteria.create({
      data: {
        opportunityId: created.id,
        programmes: JSON.stringify(opportunity.eligibility.programmes),
        years: JSON.stringify(opportunity.eligibility.years),
        minCgpa: opportunity.eligibility.minCgpa ?? null,
      },
    })

    for (const skill of opportunity.skills) {
      const skillId = skills.get(skill.name)
      if (!skillId) throw new Error(`Opportunity "${opportunity.slug}" needs unknown skill: ${skill.name}`)
      await prisma.opportunitySkill.create({
        data: {
          opportunityId: created.id,
          skillId,
          minProficiency: skill.level,
          weight: skill.mustHave ? 0.9 : 0.5,
          isCritical: skill.mustHave,
        },
      })
      skillLinks++
    }
  }

  return { opportunities: opportunities.length, skillLinks }
}
