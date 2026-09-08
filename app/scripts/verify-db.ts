import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db' }),
})

async function main() {
  const t0 = Date.now()

  console.log('=== Row counts ===')
  const counts = {
    users: await prisma.user.count(),
    skills: await prisma.skill.count(),
    careerPaths: await prisma.careerPath.count(),
    roleRequirements: await prisma.roleSkillRequirement.count(),
    opportunities: await prisma.opportunity.count(),
    applications: await prisma.application.count(),
    certificates: await prisma.certificate.count(),
    demandSnapshots: await prisma.skillDemandSnapshot.count(),
  }
  console.log(counts)

  console.log('\n=== Orphan / integrity checks ===')
  // Every skill must resolve to a category that exists, and every catalogue slug
  // must be unique. categoryId is a required FK so true orphans are impossible;
  // this checks the join actually resolves.
  const allSkills = await prisma.skill.findMany({ select: { slug: true, category: { select: { slug: true } } } })
  const skillsNoCategory = allSkills.filter((s) => !s.category).length
  const slugs = allSkills.map((s) => s.slug)
  const duplicateSkillSlugs = slugs.length - new Set(slugs).size
  const reqBadWeight = await prisma.roleSkillRequirement.count({
    where: { OR: [{ weight: { lt: 0 } }, { weight: { gt: 1 } }] },
  })
  const reqBadProf = await prisma.roleSkillRequirement.count({
    where: { OR: [{ minProficiency: { lt: 0 } }, { minProficiency: { gt: 5 } }] },
  })
  const oppNoEligibility = await prisma.opportunity.count({ where: { eligibility: null } })
  const oppNoSkills = await prisma.opportunity.count({ where: { skills: { none: {} } } })
  const unverifiedPublished = await prisma.opportunity.count({
    where: { status: 'PUBLISHED', company: { verification: { not: 'VERIFIED' } } },
  })
  const rejectedNoReason = await prisma.application.count({
    where: { status: 'REJECTED', rejectionReason: null },
  })
  console.log({ skillsNoCategory, duplicateSkillSlugs, reqBadWeight, reqBadProf, oppNoEligibility, oppNoSkills, unverifiedPublished, rejectedNoReason })
  const failures = skillsNoCategory + duplicateSkillSlugs + reqBadWeight + reqBadProf + oppNoEligibility + oppNoSkills + unverifiedPublished + rejectedNoReason
  console.log(failures === 0 ? '  -> all integrity checks pass' : `  -> ${failures} INTEGRITY FAILURES`)

  console.log('\n=== The matching engine input (Phase 6 reads this) ===')
  const role = await prisma.jobRole.findFirst({
    where: { slug: 'ayush-pharmaceutical-quality-assurance-entry' },
    include: { requirements: { include: { skill: true }, orderBy: { weight: 'desc' } } },
  })
  console.log(`Role: ${role?.title}`)
  for (const r of role?.requirements ?? []) {
    console.log(`  w=${r.weight.toFixed(2)} min=${r.minProficiency}/5 ${r.isCritical ? '[MUST]' : '      '} ${r.skill.name}`)
  }

  console.log('\n=== Verification tiers on the main demo student ===')
  const ananya = await prisma.user.findFirst({
    where: { email: 'ananya@student.aiia.gov.in' },
    include: { skills: { include: { skill: true }, orderBy: { proficiency: 'desc' } } },
  })
  const tiers: Record<string, number> = {}
  for (const s of ananya?.skills ?? []) tiers[s.verificationTier] = (tiers[s.verificationTier] ?? 0) + 1
  console.log(tiers)
  console.log('  gaps (proficiency < 2):', (ananya?.skills ?? []).filter(s => s.proficiency < 2).map(s => s.skill.name))

  console.log('\n=== Reverse skill-gap report inputs ===')
  const demanded = await prisma.skillDemandSnapshot.findMany({
    where: { period: '2026-Q3' }, include: { skill: true },
    orderBy: { demandWeight: 'desc' }, take: 5,
  })
  for (const d of demanded) {
    const cov = await prisma.curriculumSkillCoverage.findFirst({
      where: { skillId: d.skillId, programme: 'BAMS' },
    })
    console.log(`  demand ${String(d.demandWeight).padStart(6)}  covered=${cov?.isCovered ?? '?'}  ${d.skill.name}`)
  }

  console.log('\n=== Certificate lookup (what /verify will do) ===')
  const cert = await prisma.certificate.findFirst({ include: { recipient: true, issuerCompany: true } })
  console.log(`  ${cert?.verificationCode} -> ${cert?.recipient.name} / ${cert?.issuerCompany?.name} / revoked=${Boolean(cert?.revokedAt)}`)

  console.log(`\nAll queries completed in ${Date.now() - t0}ms`)
}
main().finally(() => prisma.$disconnect())
