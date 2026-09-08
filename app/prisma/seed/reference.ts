import type { PrismaClient } from '../../src/generated/prisma/client'
import { careerPaths } from '../../src/content/careers'
import { skillDefinitions } from '../../src/content/skills'

/**
 * Reference data: regions, career paths and free learning resources.
 *
 * Career paths and their skill requirements come straight from src/content/careers.ts,
 * which is the Phase 2 content contract. Transforming rather than retyping means the
 * public pages and the database can never disagree about what a role requires.
 */

/* ---- Regions -------------------------------------------------------------- */

const regions: { name: string; state: string; district?: string; slug: string }[] = [
  { name: 'Kerala', state: 'Kerala', slug: 'kerala' },
  { name: 'Kochi', state: 'Kerala', district: 'Ernakulam', slug: 'kochi' },
  { name: 'Thiruvananthapuram', state: 'Kerala', district: 'Thiruvananthapuram', slug: 'thiruvananthapuram' },
  { name: 'Uttarakhand', state: 'Uttarakhand', slug: 'uttarakhand' },
  { name: 'Dehradun', state: 'Uttarakhand', district: 'Dehradun', slug: 'dehradun' },
  { name: 'Haridwar', state: 'Uttarakhand', district: 'Haridwar', slug: 'haridwar' },
  { name: 'Gujarat', state: 'Gujarat', slug: 'gujarat' },
  { name: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Maharashtra', state: 'Maharashtra', slug: 'maharashtra' },
  { name: 'Pune', state: 'Maharashtra', district: 'Pune', slug: 'pune' },
  { name: 'Karnataka', state: 'Karnataka', slug: 'karnataka' },
  { name: 'Bengaluru', state: 'Karnataka', district: 'Bengaluru Urban', slug: 'bengaluru' },
  { name: 'Delhi NCR', state: 'Delhi', slug: 'delhi-ncr' },
  { name: 'New Delhi', state: 'Delhi', district: 'New Delhi', slug: 'new-delhi' },
  { name: 'Telangana', state: 'Telangana', slug: 'telangana' },
  { name: 'Tamil Nadu', state: 'Tamil Nadu', slug: 'tamil-nadu' },
  { name: 'Madhya Pradesh', state: 'Madhya Pradesh', slug: 'madhya-pradesh' },
  { name: 'Rajasthan', state: 'Rajasthan', slug: 'rajasthan' },
  { name: 'Goa', state: 'Goa', slug: 'goa' },
  { name: 'Himachal Pradesh', state: 'Himachal Pradesh', slug: 'himachal-pradesh' },
  { name: 'Remote', state: 'India', slug: 'remote' },
]

export async function seedRegions(prisma: PrismaClient) {
  for (const region of regions) {
    await prisma.region.create({ data: region })
  }
  return { regions: regions.length }
}

/* ---- Career paths --------------------------------------------------------- */

const domainMap = {
  ayush: 'AYUSH',
  technology: 'TECHNOLOGY',
  business: 'BUSINESS',
} as const

const demandMap = {
  growing: 'GROWING',
  steady: 'STEADY',
  emerging: 'EMERGING',
} as const

export async function seedCareers(prisma: PrismaClient) {
  const skillIds = new Map(
    (await prisma.skill.findMany({ select: { id: true, name: true } })).map((s) => [s.name, s.id]),
  )

  let roleCount = 0
  let requirementCount = 0

  for (const [index, path] of careerPaths.entries()) {
    const career = await prisma.careerPath.create({
      data: {
        title: path.title,
        slug: path.slug,
        description: path.description,
        summary: path.summary,
        domain: domainMap[path.domain],
        programmes: JSON.stringify(path.programmes),
        dayToDay: JSON.stringify(path.dayToDay),
        entryRoutes: JSON.stringify(path.entryRoutes),
        salaryMin: path.salary.min,
        salaryMax: path.salary.max,
        salaryNote: path.salary.note,
        demand: demandMap[path.demand],
        regions: JSON.stringify(path.regions),
        sortOrder: index,
      },
    })

    // One entry-level JobRole per path for now. Phase 7 adds seniority variants;
    // the matching engine reads RoleSkillRequirement either way.
    const role = await prisma.jobRole.create({
      data: {
        title: path.title,
        slug: `${path.slug}-entry`,
        careerPathId: career.id,
        description: path.summary,
        seniority: 'ENTRY',
      },
    })
    roleCount++

    for (const requirement of path.skills) {
      const skillId = skillIds.get(requirement.skill)
      if (!skillId) throw new Error(`Career "${path.slug}" needs unknown skill: ${requirement.skill}`)

      await prisma.roleSkillRequirement.create({
        data: {
          jobRoleId: role.id,
          skillId,
          weight: requirement.weight,
          minProficiency: requirement.level,
          isCritical: Boolean(requirement.critical),
        },
      })
      requirementCount++
    }
  }

  return { careerPaths: careerPaths.length, roles: roleCount, requirements: requirementCount }
}

/* ---- Learning resources --------------------------------------------------- */

export async function seedLearning(prisma: PrismaClient) {
  const skillIds = new Map(
    (await prisma.skill.findMany({ select: { id: true, name: true, slug: true } })).map((s) => [
      s.name,
      s.id,
    ]),
  )
  const skillIdsBySlug = new Map(
    (await prisma.skill.findMany({ select: { id: true, slug: true } })).map((s) => [s.slug, s.id]),
  )

  // Collect every course referenced across careers and skill hubs, deduplicated by URL.
  const byUrl = new Map<
    string,
    { title: string; provider: 'SWAYAM' | 'NPTEL' | 'OTHER'; url: string; skills: Set<string> }
  >()

  function add(
    title: string,
    provider: string,
    url: string,
    skillId: string | undefined,
  ) {
    const normalisedProvider =
      provider === 'SWAYAM' || provider === 'NPTEL' ? provider : 'OTHER'
    const existing = byUrl.get(url)
    if (existing) {
      if (skillId) existing.skills.add(skillId)
      return
    }
    byUrl.set(url, {
      title,
      provider: normalisedProvider,
      url,
      skills: new Set(skillId ? [skillId] : []),
    })
  }

  // Courses attached to a specific skill hub map cleanly to that skill.
  for (const definition of skillDefinitions) {
    const skillId = skillIds.get(definition.name)
    for (const course of definition.howToLearn) {
      add(course.title, course.provider, course.url, skillId)
    }
  }

  // Courses attached to a career map to that career's critical skills.
  for (const path of careerPaths) {
    const criticalSkillIds = path.skills
      .filter((s) => s.critical)
      .map((s) => skillIds.get(s.skill))
      .filter((id): id is string => Boolean(id))

    for (const course of path.learning) {
      add(course.title, course.provider, course.url, criticalSkillIds[0])
      const entry = byUrl.get(course.url)
      if (entry) for (const id of criticalSkillIds) entry.skills.add(id)
    }
  }

  let mappingCount = 0
  for (const resource of byUrl.values()) {
    const created = await prisma.learningResource.create({
      data: {
        title: resource.title,
        provider: resource.provider,
        url: resource.url,
        isFree: true,
        description: `Free course on ${resource.provider}. Government platform, no fees.`,
      },
    })
    for (const skillId of resource.skills) {
      await prisma.skillResourceMap.create({
        data: { skillId, resourceId: created.id, relevance: 1 },
      })
      mappingCount++
    }
  }

  // A couple of extra soft-skill resources so the professional-skills branch is not bare.
  const softSkillCourse = await prisma.learningResource.create({
    data: {
      title: 'Soft Skills Development',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/courses/109104107',
      isFree: true,
      description: 'Free course on NPTEL. Government platform, no fees.',
    },
  })
  for (const slug of ['teamwork', 'adaptability', 'time-management', 'team-coordination']) {
    const skillId = skillIdsBySlug.get(slug)
    if (skillId) {
      await prisma.skillResourceMap.create({
        data: { skillId, resourceId: softSkillCourse.id, relevance: 0.7 },
      })
      mappingCount++
    }
  }

  return { resources: byUrl.size + 1, mappings: mappingCount }
}
