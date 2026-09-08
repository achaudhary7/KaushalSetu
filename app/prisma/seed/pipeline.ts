import { randomBytes } from 'node:crypto'

import type { PrismaClient } from '../../src/generated/prisma/client'

/**
 * The live pipeline and the analytics inputs.
 *
 * Applications sit at every stage so no recruiter board looks empty, certificates exist
 * so /verify has something real to find, and placements carry outcome surveys at both
 * windows so the longitudinal charts have shape.
 *
 * The two analytics tables here are the inputs to the Phase 10 reverse skill-gap report —
 * the feature that makes this platform interesting to a ministry rather than only to
 * students.
 */

/** KS-XXXX-XXXX-XXXX — the format /verify expects. */
function verificationCode(): string {
  const block = () => randomBytes(2).toString('hex').toUpperCase()
  return `KS-${block()}-${block()}-${block()}`
}

const STATUS_SPREAD = [
  'APPLIED',
  'UNDER_REVIEW',
  'SHORTLISTED',
  'INTERVIEW',
  'OFFERED',
  'ACCEPTED',
  'REJECTED',
] as const

export async function seedPipeline(prisma: PrismaClient) {
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: { id: true, name: true },
    orderBy: { email: 'asc' },
  })
  const opportunities = await prisma.opportunity.findMany({
    select: { id: true, slug: true, title: true, companyId: true, blindScreening: true },
    orderBy: { slug: 'asc' },
  })
  const skills = new Map(
    (await prisma.skill.findMany({ select: { id: true, slug: true } })).map((s) => [s.slug, s.id]),
  )

  if (students.length === 0 || opportunities.length === 0) {
    throw new Error('seedPipeline ran before people and opportunities existed')
  }

  let applicationCount = 0
  let eventCount = 0
  let rejectionCount = 0

  // Deterministic spread: student i applies to opportunity (i + k) at a known status,
  // so the demo looks the same every reset.
  for (const [studentIndex, student] of students.entries()) {
    const applyCount = 1 + (studentIndex % 3)
    for (let k = 0; k < applyCount; k++) {
      const opportunity = opportunities[(studentIndex + k * 3) % opportunities.length]
      if (!opportunity) continue

      const status = STATUS_SPREAD[(studentIndex + k) % STATUS_SPREAD.length] ?? 'APPLIED'
      const matchScore = 52 + ((studentIndex * 7 + k * 11) % 44)

      const existing = await prisma.application.findUnique({
        where: { userId_opportunityId: { userId: student.id, opportunityId: opportunity.id } },
      })
      if (existing) continue

      const application = await prisma.application.create({
        data: {
          userId: student.id,
          opportunityId: opportunity.id,
          status,
          matchScore,
          matchBreakdown: JSON.stringify({
            base: Number((matchScore / 100 - 0.08).toFixed(3)),
            coverage: Number((matchScore / 100 - 0.12).toFixed(3)),
            verification: Number((0.4 + (studentIndex % 5) * 0.12).toFixed(3)),
            criticalMet: status !== 'REJECTED',
            note: 'Seeded breakdown. Phase 6 computes this for real.',
          }),
          appliedAt: new Date(2026, 7, 20 + (studentIndex % 8)),
        },
      })
      applicationCount++

      // The status trail, not just the current value.
      const trail = STATUS_SPREAD.slice(0, STATUS_SPREAD.indexOf(status) + 1)
      let previous: (typeof STATUS_SPREAD)[number] | null = null
      for (const [stepIndex, step] of trail.entries()) {
        if (step === 'REJECTED' && status !== 'REJECTED') continue
        await prisma.applicationEvent.create({
          data: {
            applicationId: application.id,
            fromStatus: previous,
            toStatus: step,
            wasBlind: opportunity.blindScreening && stepIndex <= 2,
            createdAt: new Date(2026, 7, 20 + (studentIndex % 8) + stepIndex),
          },
        })
        previous = step
        eventCount++
      }

      // Rejections must carry a coded reason — this is the input to the curriculum
      // gap report, and the reason text is never shown to the candidate.
      if (status === 'REJECTED') {
        const gapSkills = ['clinical-research-methodology', 'gmp-documentation', 'scientific-writing']
        const chosen = gapSkills[studentIndex % gapSkills.length]
        await prisma.rejectionReason.create({
          data: {
            applicationId: application.id,
            code: 'SKILL_GAP',
            detail: 'Strong clinically but no documented research methods training.',
            skillIds: JSON.stringify([skills.get(chosen ?? '')].filter(Boolean)),
          },
        })
        rejectionCount++
      }
    }
  }

  /* ---- Certificates: something real for /verify to find ------------------- */
  const ananya = students.find((s) => s.name === 'Ananya Sharma')
  const karthik = students.find((s) => s.name === 'Karthik Nair')
  const himalaya = await prisma.company.findFirst({ where: { slug: 'himalaya-wellness-pvt-ltd' } })
  const qaInternship = opportunities.find((o) => o.slug.startsWith('quality-assurance-intern'))

  const certificates: { code: string; recipient: string }[] = []
  if (ananya && himalaya && qaInternship) {
    const code = verificationCode()
    await prisma.certificate.create({
      data: {
        verificationCode: code,
        type: 'INTERNSHIP_COMPLETION',
        recipientId: ananya.id,
        issuerCompanyId: himalaya.id,
        opportunityId: qaInternship.id,
        title: 'Quality Assurance Internship — Completion',
        description:
          'Completed a 24-week quality assurance internship at a GMP-certified Ayush manufacturing unit.',
        skills: JSON.stringify(['GMP documentation and batch records', 'Dravyaguna and raw drug authentication']),
        mentorName: 'Vikram Joshi, Head of Quality Assurance',
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-07-02'),
        issuedAt: new Date('2026-07-05'),
      },
    })
    certificates.push({ code, recipient: 'Ananya Sharma' })
  }

  if (karthik && himalaya) {
    // A revoked certificate, so the revocation path is demonstrable rather than theoretical.
    const code = verificationCode()
    await prisma.certificate.create({
      data: {
        verificationCode: code,
        type: 'PROJECT_COMPLETION',
        recipientId: karthik.id,
        issuerCompanyId: himalaya.id,
        title: 'Formulation Standardisation Project — Completion',
        description: 'Six-week project on standardisation of a classical formulation.',
        skills: JSON.stringify(['Ayurvedic Pharmacopoeia of India standards']),
        issuedAt: new Date('2026-06-10'),
        revokedAt: new Date('2026-08-01'),
        revokeReason: 'Issued in error — the project was not completed to the agreed scope.',
      },
    })
    certificates.push({ code, recipient: 'Karthik Nair (revoked)' })
  }

  /* ---- Endorsements: promote a skill to EMPLOYER_ENDORSED ---------------- */
  const vikram = await prisma.user.findFirst({ where: { email: 'vikram@himalayawellness.example' } })
  if (ananya && vikram && himalaya) {
    const gmpSkillId = skills.get('gmp-documentation')
    if (gmpSkillId) {
      const userSkill = await prisma.userSkill.upsert({
        where: { userId_skillId: { userId: ananya.id, skillId: gmpSkillId } },
        update: { verificationTier: 'EMPLOYER_ENDORSED', proficiency: 3.5 },
        create: {
          userId: ananya.id,
          skillId: gmpSkillId,
          proficiency: 3.5,
          verificationTier: 'EMPLOYER_ENDORSED',
        },
      })
      await prisma.endorsement.create({
        data: {
          userSkillId: userSkill.id,
          skillId: gmpSkillId,
          endorserId: vikram.id,
          companyId: himalaya.id,
          comment:
            'Maintained batch records to audit standard throughout the internship. Would hire.',
        },
      })
    }
  }

  /* ---- Placements + outcome surveys: the longitudinal differentiator ------ */
  const graduates = students.slice(0, 4)
  let surveyCount = 0
  for (const [index, graduate] of graduates.entries()) {
    const placement = await prisma.placementRecord.create({
      data: {
        userId: graduate.id,
        companyName: ['Himalaya Wellness Pvt Ltd', 'Sattva Clinical Research', 'Vaidya Ayurvedics Ltd', 'AyurTech Systems'][index] ?? 'Unknown',
        roleTitle: ['QA Executive', 'Clinical Research Coordinator', 'Regulatory Affairs Trainee', 'Clinical Analyst'][index] ?? 'Associate',
        startedAt: new Date(2025, 6, 1 + index),
        compensation: 420000 + index * 60000,
      },
    })

    // Six-month responses for all; twelve-month for the earlier cohort, and one honest
    // non-response so the dashboards can show a real response rate.
    await prisma.outcomeSurvey.create({
      data: {
        placementRecordId: placement.id,
        window: 'SIX_MONTH',
        sentAt: new Date(2026, 0, 1 + index),
        respondedAt: new Date(2026, 0, 8 + index),
        stillEmployed: true,
        roleRelevant: index !== 3,
        satisfaction: [4, 5, 4, 3][index] ?? 4,
        wouldRecommend: index !== 3,
      },
    })
    surveyCount++

    await prisma.outcomeSurvey.create({
      data: {
        placementRecordId: placement.id,
        window: 'TWELVE_MONTH',
        sentAt: new Date(2026, 6, 1 + index),
        // index 2 never responded — response rates are shown honestly, not hidden.
        respondedAt: index === 2 ? null : new Date(2026, 6, 12 + index),
        stillEmployed: index === 2 ? null : index !== 3,
        roleRelevant: index === 2 ? null : index < 2,
        satisfaction: index === 2 ? null : ([4, 5, null, 2][index] ?? null),
        wouldRecommend: index === 2 ? null : index < 2,
      },
    })
    surveyCount++
  }

  return { applications: applicationCount, events: eventCount, rejections: rejectionCount, certificates, surveys: surveyCount }
}

/**
 * Analytics snapshots.
 *
 * Denormalised deliberately (schema principle 5). These two tables ARE the reverse
 * skill-gap report: demand on one side, curriculum coverage on the other.
 */
export async function seedAnalytics(prisma: PrismaClient) {
  const skills = await prisma.skill.findMany({ select: { id: true, slug: true } })
  const regions = await prisma.region.findMany({
    where: { district: null },
    select: { id: true, slug: true },
  })
  const institutions = await prisma.institution.findMany({ select: { id: true, slug: true } })

  const periods = ['2026-Q1', '2026-Q2', '2026-Q3']
  let snapshotCount = 0

  // Demand is deterministic but shaped: Ayush manufacturing and research skills trend
  // up across the three quarters, which is the story the Ayush career pages tell.
  const trending = new Set([
    'gmp-documentation',
    'ayush-regulatory-framework',
    'clinical-research-methodology',
    'scientific-writing',
    'health-informatics',
    'pharmacovigilance',
  ])

  for (const [periodIndex, period] of periods.entries()) {
    for (const [skillIndex, skill] of skills.entries()) {
      const region = regions[skillIndex % regions.length]
      const base = 4 + (skillIndex % 9)
      const growth = trending.has(skill.slug) ? periodIndex * 6 : periodIndex
      const demandCount = base + growth

      await prisma.skillDemandSnapshot.create({
        data: {
          skillId: skill.id,
          regionId: region?.id ?? null,
          period,
          demandCount,
          demandWeight: Number((demandCount * (trending.has(skill.slug) ? 0.85 : 0.55)).toFixed(2)),
          // Supply lags demand for the trending skills — that gap is the whole point.
          supplyCount: trending.has(skill.slug) ? Math.max(1, demandCount - 8) : demandCount + 3,
        },
      })
      snapshotCount++
    }
  }

  // Curriculum coverage: what the syllabus actually teaches, against which demand is
  // compared. The trending skills are deliberately under-covered.
  let coverageCount = 0
  for (const institution of institutions) {
    const programme = institution.slug === 'spit' ? 'B.Tech' : 'BAMS'
    for (const skill of skills) {
      const covered = !trending.has(skill.slug)
      await prisma.curriculumSkillCoverage.create({
        data: {
          institutionId: institution.id,
          skillId: skill.id,
          programme,
          isCovered: covered,
          depth: covered ? 3 + (skill.slug.length % 2) : skill.slug === 'scientific-writing' ? 1 : 0,
          notes: covered ? null : 'Not covered in the current syllabus.',
        },
      })
      coverageCount++
    }
  }

  return { snapshots: snapshotCount, coverage: coverageCount }
}
