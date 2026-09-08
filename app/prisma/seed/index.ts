import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import 'dotenv/config'

import { PrismaClient } from '../../src/generated/prisma/client'
import { seedAssessment } from './assessment'
import { seedOpportunities, seedOrganisations, seedPeople } from './demo-world'
import { seedAnalytics, seedPipeline } from './pipeline'
import { seedCareers, seedLearning, seedRegions } from './reference'
import { seedTaxonomy } from './taxonomy'

/**
 * Seed orchestrator.
 *
 * Order matters — each step depends on the ids created by the one before it. The whole
 * run must complete in under 20 seconds so `npm run db:reset` is genuinely usable as a
 * "reset the demo" command between rehearsals.
 */

const url = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url }) })

/** Reverse dependency order, so foreign keys never block a wipe. */
async function wipe() {
  await prisma.certificateVerificationLog.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.outcomeSurvey.deleteMany()
  await prisma.placementRecord.deleteMany()
  await prisma.rejectionReason.deleteMany()
  await prisma.applicationEvent.deleteMany()
  await prisma.interview.deleteMany()
  await prisma.offer.deleteMany()
  await prisma.application.deleteMany()
  await prisma.opportunityReport.deleteMany()
  await prisma.eligibilityCriteria.deleteMany()
  await prisma.opportunitySkill.deleteMany()
  await prisma.opportunity.deleteMany()
  await prisma.endorsement.deleteMany()
  await prisma.skillScore.deleteMany()
  await prisma.answer.deleteMany()
  await prisma.assessmentAttempt.deleteMany()
  await prisma.question.deleteMany()
  await prisma.assessment.deleteMany()
  await prisma.userSkill.deleteMany()
  await prisma.learningPathItem.deleteMany()
  await prisma.learningPath.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.skillResourceMap.deleteMany()
  await prisma.learningResource.deleteMany()
  await prisma.curriculumSkillCoverage.deleteMany()
  await prisma.skillDemandSnapshot.deleteMany()
  await prisma.challengeSubmission.deleteMany()
  await prisma.eventRegistration.deleteMany()
  await prisma.event.deleteMany()
  await prisma.mentorshipSession.deleteMany()
  await prisma.mentorship.deleteMany()
  await prisma.message.deleteMany()
  await prisma.thread.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.document.deleteMany()
  await prisma.auditLog.deleteMany()
  await prisma.project.deleteMany()
  await prisma.achievement.deleteMany()
  await prisma.education.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.portfolioSettings.deleteMany()
  await prisma.roleSkillRequirement.deleteMany()
  await prisma.jobRole.deleteMany()
  await prisma.careerPath.deleteMany()
  await prisma.skillRelation.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.skillCategory.deleteMany()
  await prisma.studentProfile.deleteMany()
  await prisma.academicianProfile.deleteMany()
  await prisma.industryProfile.deleteMany()
  await prisma.institutionProfile.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()
  await prisma.company.deleteMany()
  await prisma.institution.deleteMany()
  await prisma.region.deleteMany()
}

async function main() {
  const startedAt = Date.now()
  console.log('Seeding KaushalSetu…\n')

  console.log('  wiping existing data')
  await wipe()

  const regions = await seedRegions(prisma)
  console.log(`  regions          ${regions.regions}`)

  const taxonomy = await seedTaxonomy(prisma)
  console.log(
    `  taxonomy         ${taxonomy.categories} categories, ${taxonomy.skills} skills, ${taxonomy.relations} relations`,
  )

  const careers = await seedCareers(prisma)
  console.log(
    `  careers          ${careers.careerPaths} paths, ${careers.roles} roles, ${careers.requirements} skill requirements`,
  )

  const learning = await seedLearning(prisma)
  console.log(`  learning         ${learning.resources} free courses, ${learning.mappings} skill mappings`)

  const orgs = await seedOrganisations(prisma)
  console.log(`  organisations    ${orgs.institutions} institutions, ${orgs.companies} companies`)

  const people = await seedPeople(prisma)
  console.log(`  people           ${people.users} users across all five roles`)

  const opportunities = await seedOpportunities(prisma)
  console.log(
    `  opportunities    ${opportunities.opportunities} listings, ${opportunities.skillLinks} skill requirements`,
  )

  const assessment = await seedAssessment(prisma)
  console.log(`  assessment       ${assessment.questions} questions`)

  const pipeline = await seedPipeline(prisma)
  console.log(
    `  pipeline         ${pipeline.applications} applications, ${pipeline.events} status events, ${pipeline.rejections} coded rejections`,
  )
  console.log(`  outcomes         ${pipeline.surveys} surveys across both windows`)

  const analytics = await seedAnalytics(prisma)
  console.log(
    `  analytics        ${analytics.snapshots} demand snapshots, ${analytics.coverage} curriculum coverage rows`,
  )

  console.log(`\nDone in ${((Date.now() - startedAt) / 1000).toFixed(1)}s\n`)

  console.log('Demo accounts — password for all:', people.demoPassword)
  console.log('  student       ananya@student.aiia.gov.in      (3rd-year BAMS, the main thread)')
  console.log('  student       rahul@student.spit.ac.in        (1st year, micro-internship story)')
  console.log('  academician   meera.iyer@aiia.gov.in          (Associate Professor, Dravyaguna)')
  console.log('  industry      vikram@himalayawellness.example (verified employer)')
  console.log('  institution   placements@aiia.gov.in          (placement officer)')
  console.log('  admin         admin@kaushalsetu.in')

  if (pipeline.certificates.length > 0) {
    console.log('\nVerifiable certificate codes (try them at /verify):')
    for (const certificate of pipeline.certificates) {
      console.log(`  ${certificate.code}  ${certificate.recipient}`)
    }
  }
}

main()
  .catch((error) => {
    console.error('\nSeed failed:\n', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
