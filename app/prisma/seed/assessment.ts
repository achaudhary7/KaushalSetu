import type { PrismaClient } from '../../src/generated/prisma/client'

/**
 * The assessment question bank.
 *
 * Sections mirror the Phase 5 spec: domain, technical, aptitude and soft skills. Domain
 * questions are genuinely Ayush — a generic aptitude test would have told us nothing
 * about a BAMS student, and would have made the Ayush positioning hollow.
 *
 * Scoring is deterministic and explainable (ADR-002): each option carries a score, each
 * question carries a weight, and a skill's proficiency is the weighted mean normalised
 * to 0-5. No model, no randomness, same answers always produce the same profile.
 */

type QType = 'SINGLE_CHOICE' | 'MULTI_CHOICE' | 'LIKERT' | 'SCENARIO' | 'NUMERIC' | 'ORDERING'

interface Q {
  section: string
  skill?: string
  type: QType
  prompt: string
  options?: { id: string; label: string; score: number }[]
  correct?: string[]
  weight?: number
  difficulty?: number
  isReversed?: boolean
}

/** Four-point scale used for most knowledge questions. */
function choices(labels: [string, string, string, string], scores = [0, 0.33, 0.67, 1]): Q['options'] {
  return labels.map((label, i) => ({ id: `o${i + 1}`, label, score: scores[i] ?? 0 }))
}

const LIKERT = [
  { id: 'l1', label: 'Strongly disagree', score: 0 },
  { id: 'l2', label: 'Disagree', score: 0.25 },
  { id: 'l3', label: 'Neutral', score: 0.5 },
  { id: 'l4', label: 'Agree', score: 0.75 },
  { id: 'l5', label: 'Strongly agree', score: 1 },
]

const questions: Q[] = [
  /* ==== Domain: Ayurveda clinical ======================================== */
  { section: 'Domain — Ayurveda', skill: 'ayurvedic-diagnostics', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'A patient presents with a light, irregular pulse, dry skin and disturbed sleep. Which dosha predominance does this pattern most suggest?',
    options: choices(['Kapha', 'Pitta', 'Vata', 'Equal tridosha']), correct: ['o3'] },
  { section: 'Domain — Ayurveda', skill: 'ayurvedic-diagnostics', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'Which of these best describes the distinction between prakriti and vikriti?',
    options: choices([
      'They are interchangeable terms for constitution',
      'Prakriti is the current imbalance; vikriti is the inherited constitution',
      'Prakriti is the constitution established at conception; vikriti is the current deviation from it',
      'Vikriti applies only to chronic disease',
    ]), correct: ['o3'] },
  { section: 'Domain — Ayurveda', skill: 'ayurvedic-diagnostics', type: 'MULTI_CHOICE', difficulty: 3, weight: 1.2,
    prompt: 'Which of the following form part of ashtavidha pariksha? Select all that apply.',
    options: [
      { id: 'o1', label: 'Nadi (pulse)', score: 1 },
      { id: 'o2', label: 'Mutra (urine)', score: 1 },
      { id: 'o3', label: 'Serum electrolytes', score: 0 },
      { id: 'o4', label: 'Jihva (tongue)', score: 1 },
    ], correct: ['o1', 'o2', 'o4'] },
  { section: 'Domain — Ayurveda', skill: 'bhaishajya-kalpana', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'What is the primary purpose of anupana in a classical prescription?',
    options: choices([
      'To improve taste only',
      'To act as a preservative',
      'To serve as a vehicle that directs and enhances the action of the medicine',
      'To reduce the cost of the formulation',
    ]), correct: ['o3'] },
  { section: 'Domain — Ayurveda', skill: 'bhaishajya-kalpana', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'Kwatha and churna differ principally in which respect?',
    options: choices([
      'The plant part used',
      'The dosage form and method of preparation',
      'The season of collection',
      'The regulatory category',
    ]), correct: ['o2'] },
  { section: 'Domain — Ayurveda', skill: 'dravyaguna', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1.2,
    prompt: 'You are handed a batch of raw drug labelled Ashwagandha. What is the first step in authenticating it?',
    options: choices([
      'Send it directly for HPTLC fingerprinting',
      'Check the supplier invoice',
      'Macroscopic and organoleptic examination against pharmacopoeial description',
      'Weigh the consignment',
    ]), correct: ['o3'] },
  { section: 'Domain — Ayurveda', skill: 'panchakarma-procedure-planning', type: 'ORDERING', difficulty: 3, weight: 1,
    prompt: 'Place these panchakarma stages in the correct sequence.',
    options: [
      { id: 'o1', label: 'Purvakarma (preparation)', score: 1 },
      { id: 'o2', label: 'Pradhankarma (main procedure)', score: 1 },
      { id: 'o3', label: 'Paschatkarma (post-procedure care)', score: 1 },
    ], correct: ['o1', 'o2', 'o3'] },
  { section: 'Domain — Ayurveda', skill: 'panchakarma-procedure-planning', type: 'SCENARIO', difficulty: 4, weight: 1.3,
    prompt: 'A patient scheduled for virechana reports acute fever on the morning of the procedure. What is the appropriate action?',
    options: choices([
      'Proceed as planned; fever is unrelated',
      'Reduce the dose and proceed',
      'Postpone the procedure and reassess, since acute illness is a contraindication',
      'Substitute vamana instead',
    ]), correct: ['o3'] },

  /* ==== Domain: Manufacturing, regulatory, safety ========================= */
  { section: 'Domain — Manufacturing & Regulatory', skill: 'gmp-documentation', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1.2,
    prompt: 'What is the primary purpose of a Batch Manufacturing Record?',
    options: choices([
      'To calculate profit per batch',
      'To satisfy the marketing team',
      'To allow a batch to be fully reconstructed and defended years after production',
      'To track employee attendance',
    ]), correct: ['o3'] },
  { section: 'Domain — Manufacturing & Regulatory', skill: 'gmp-documentation', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'You notice a corrected entry in a batch record covered with correction fluid. What is the correct GMP practice?',
    options: choices([
      'Acceptable if the correction is legible',
      'Acceptable if the supervisor approves afterwards',
      'Never acceptable — errors are struck through once, initialled and dated, leaving the original readable',
      'Acceptable for non-critical fields only',
    ]), correct: ['o3'] },
  { section: 'Domain — Manufacturing & Regulatory', skill: 'api-standards', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'The Ayurvedic Pharmacopoeia of India primarily specifies:',
    options: choices([
      'Retail pricing for classical formulations',
      'Identity, purity and quality standards for Ayurvedic drugs',
      'Clinical treatment protocols',
      'Export tariffs',
    ]), correct: ['o2'] },
  { section: 'Domain — Manufacturing & Regulatory', skill: 'ayush-regulatory-framework', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1.2,
    prompt: 'Which schedule of the Drugs and Cosmetics Rules sets out GMP requirements for Ayurvedic, Siddha and Unani medicines?',
    options: choices(['Schedule M', 'Schedule T', 'Schedule Y', 'Schedule H']), correct: ['o2'] },
  { section: 'Domain — Manufacturing & Regulatory', skill: 'ayush-regulatory-framework', type: 'SCENARIO', difficulty: 4, weight: 1.3,
    prompt: 'Marketing proposes labelling a product "cures diabetes". As the regulatory contact, what is your response?',
    options: choices([
      'Approve it if a clinical study supports it',
      'Approve it with a disclaimer',
      'Reject it — disease-cure claims of this kind are not permissible on Ayush product labels',
      'Escalate to the managing director for a decision',
    ]), correct: ['o3'] },
  { section: 'Domain — Manufacturing & Regulatory', skill: 'pharmacovigilance', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'What does causality assessment in pharmacovigilance determine?',
    options: choices([
      'Whether the patient can afford the medicine',
      'The likelihood that a product caused the observed adverse event',
      'Whether the batch was profitable',
      'The correct retail price',
    ]), correct: ['o2'] },

  /* ==== Technical: research, writing, data =============================== */
  { section: 'Technical', skill: 'clinical-research-methodology', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1.2,
    prompt: 'What is the principal purpose of randomisation in a clinical trial?',
    options: choices([
      'To make recruitment faster',
      'To reduce the sample size needed',
      'To balance known and unknown confounders across groups',
      'To satisfy the ethics committee',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'clinical-research-methodology', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'A trial of a classical formulation cannot blind participants because of the preparation\'s distinctive taste. What is the most appropriate mitigation?',
    options: choices([
      'Abandon the trial',
      'Claim the trial is double-blind anyway',
      'Blind the outcome assessors and analysts, and report the limitation explicitly',
      'Use only subjective outcome measures',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'good-clinical-practice', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'Informed consent must be obtained:',
    options: choices([
      'At any point during the study',
      'Before any study-specific procedure is performed',
      'Only for invasive procedures',
      'After the first follow-up visit',
    ]), correct: ['o2'] },
  { section: 'Technical', skill: 'good-clinical-practice', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'Where should Indian clinical trials be prospectively registered?',
    options: choices(['CTRI', 'PubMed', 'ClinicalTrials.gov only', 'No registration is required']), correct: ['o1'] },
  { section: 'Technical', skill: 'biostatistics', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'A p-value of 0.03 means:',
    options: choices([
      'There is a 3% chance the hypothesis is wrong',
      'The effect is clinically important',
      'If the null hypothesis were true, data this extreme would occur about 3% of the time',
      'The study is 97% accurate',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'scientific-writing', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'Which sentence is most appropriate for the results section of a study report?',
    options: choices([
      'The remarkable improvement proves the formulation works',
      'Patients felt much better after treatment',
      'Mean pain score fell from 6.8 (SD 1.2) to 3.1 (SD 1.4) at week 8 (p = 0.002)',
      'This is the best result ever recorded for this condition',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'scientific-writing', type: 'SCENARIO', difficulty: 3, weight: 1.1,
    prompt: 'Your draft states a formulation "significantly improved" outcomes, but the confidence interval crosses the null. What should you do?',
    options: choices([
      'Leave it — significance is a matter of interpretation',
      'Remove the confidence interval',
      'Rewrite the claim to reflect what the data actually supports, and state the uncertainty',
      'Report only the subgroup where the result was significant',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'literature-appraisal', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.9,
    prompt: 'Which source carries the most weight when appraising evidence for an intervention?',
    options: choices([
      'A manufacturer\'s brochure',
      'A single case report',
      'A systematic review of randomised trials',
      'A widely shared social media post',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'sql-and-data-querying', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'Which SQL clause filters rows AFTER aggregation has been applied?',
    options: choices(['WHERE', 'HAVING', 'ORDER BY', 'LIMIT']), correct: ['o2'] },
  { section: 'Technical', skill: 'health-informatics', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'What is the purpose of the NAMASTE terminology?',
    options: choices([
      'To translate Sanskrit texts into English',
      'To standardise coding of Ayush diagnoses and interventions for digital health records',
      'To rank Ayush colleges',
      'To register practitioners',
    ]), correct: ['o2'] },
  { section: 'Technical', skill: 'data-analysis', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.9,
    prompt: 'Your dataset has 12% missing values in one column. What is the responsible first step?',
    options: choices([
      'Delete the column',
      'Fill the gaps with zero',
      'Investigate why the values are missing before deciding how to handle them',
      'Fill the gaps with the column mean without checking',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'programming-fundamentals', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'What is the time complexity of binary search on a sorted array of n elements?',
    options: choices(['O(n)', 'O(n log n)', 'O(log n)', 'O(1)']), correct: ['o3'] },
  { section: 'Technical', skill: 'version-control-git', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.8,
    prompt: 'What does a merge conflict indicate?',
    options: choices([
      'The repository is corrupted',
      'Two branches changed the same lines and Git cannot decide which to keep',
      'You lack permission to push',
      'The remote is unreachable',
    ]), correct: ['o2'] },

  /* ==== Aptitude ========================================================== */
  { section: 'Aptitude', type: 'NUMERIC', difficulty: 2, weight: 0.8,
    prompt: 'A formulation requires 3 parts of drug A to 5 parts of drug B. To make 2.4 kg of the mixture, how many grams of drug A are needed?',
    correct: ['900'] },
  { section: 'Aptitude', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.8,
    prompt: 'A batch of 480 units has a 2.5% rejection rate. How many units are rejected?',
    options: choices(['10', '12', '15', '24'], [0, 1, 0, 0]), correct: ['o2'] },
  { section: 'Aptitude', type: 'SINGLE_CHOICE', difficulty: 3, weight: 0.8,
    prompt: 'All GMP-certified units maintain batch records. Unit X does not maintain batch records. Which conclusion follows?',
    options: choices([
      'Unit X is GMP certified',
      'Unit X is not GMP certified',
      'Unit X may or may not be GMP certified',
      'No conclusion is possible',
    ]), correct: ['o2'] },
  { section: 'Aptitude', type: 'SINGLE_CHOICE', difficulty: 3, weight: 0.8,
    prompt: 'Stipend rose from ₹12,000 to ₹15,000. What is the percentage increase?',
    options: choices(['20%', '25%', '30%', '33%'], [0, 1, 0, 0]), correct: ['o2'] },
  { section: 'Domain — Ayurveda', skill: 'ayurvedic-diet-counselling', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.9,
    prompt: 'A patient with strong Pitta aggravation asks about diet. Which recommendation is most consistent with classical guidance?',
    options: choices([
      'Increase pungent, sour and salty foods',
      'Favour cooling, sweet and bitter foods and avoid excessive heat-producing items',
      'Fast completely for three days',
      'Diet has no bearing on dosha balance',
    ]), correct: ['o2'] },
  { section: 'Domain — Ayurveda', skill: 'clinical-documentation', type: 'SINGLE_CHOICE', difficulty: 2, weight: 1,
    prompt: 'Why does consistent case documentation matter beyond the individual patient?',
    options: choices([
      'It is only required for insurance',
      'It makes consultations faster',
      'It is the raw material for outcome tracking, audit and any future evidence generation',
      'It is not important in Ayurvedic practice',
    ]), correct: ['o3'] },
  { section: 'Domain — Ayurveda', skill: 'medical-ethics', type: 'SCENARIO', difficulty: 3, weight: 1.1,
    prompt: 'A patient asks you to backdate a medical certificate by one week. What do you do?',
    options: choices([
      'Backdate it — it is a minor favour',
      'Backdate it but note the real date privately',
      'Decline, explain why, and offer a correctly dated certificate',
      'Refer them to a colleague who might agree',
    ]), correct: ['o3'] },
  { section: 'Domain — Manufacturing & Regulatory', skill: 'quality-systems', type: 'SINGLE_CHOICE', difficulty: 3, weight: 1,
    prompt: 'During an internal audit you find an SOP that has not been reviewed for four years. This is:',
    options: choices([
      'Acceptable if nothing has changed',
      'A finding requiring corrective action, since SOPs must be periodically reviewed',
      'Only a problem if a regulator notices',
      'Outside the scope of an internal audit',
    ]), correct: ['o2'] },
  { section: 'Domain — Manufacturing & Regulatory', skill: 'analytical-instrumentation', type: 'SINGLE_CHOICE', difficulty: 3, weight: 0.9,
    prompt: 'HPTLC is most commonly used in Ayush quality control to:',
    options: choices([
      'Measure the weight of a batch',
      'Generate a chromatographic fingerprint for identity and consistency checks',
      'Sterilise raw material',
      'Determine retail shelf placement',
    ]), correct: ['o2'] },
  { section: 'Domain — Ayurveda', skill: 'infection-control', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.9,
    prompt: 'Between two patients receiving abhyanga, reusable linen should be:',
    options: choices([
      'Reused if it looks clean',
      'Aired for ten minutes',
      'Laundered before reuse, without exception',
      'Reused for the same dosha type only',
    ]), correct: ['o3'] },
  { section: 'Technical', skill: 'data-management', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.9,
    prompt: 'What is the purpose of an audit trail in a clinical data system?',
    options: choices([
      'To speed up data entry',
      'To record who changed what and when, so any value can be traced back',
      'To compress the database',
      'To generate reports automatically',
    ]), correct: ['o2'] },
  { section: 'Technical', skill: 'requirements-gathering', type: 'SCENARIO', difficulty: 3, weight: 1,
    prompt: 'A clinician says the EMR "needs to be faster". What is the most useful next step?',
    options: choices([
      'Add a loading spinner',
      'Buy a bigger server',
      'Observe their actual workflow and identify which specific step is slow and why',
      'Tell them the system meets its performance targets',
    ]), correct: ['o3'] },
  { section: 'Aptitude', type: 'SINGLE_CHOICE', difficulty: 3, weight: 0.8,
    prompt: 'A 24-week internship began on 15 January. In which month does it end?',
    options: choices(['May', 'June', 'July', 'August'], [0, 0, 1, 0]), correct: ['o3'] },
  { section: 'Aptitude', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.7,
    prompt: 'Which does NOT belong with the others?',
    options: choices(['Protocol', 'Consent form', 'Case report form', 'Invoice'], [0, 0, 0, 1]), correct: ['o4'] },

  { section: 'Aptitude', type: 'SINGLE_CHOICE', difficulty: 2, weight: 0.7,
    prompt: 'Choose the word closest in meaning to "efficacious".',
    options: choices(['Expensive', 'Effective', 'Elaborate', 'Experimental'], [0, 1, 0, 0]), correct: ['o2'] },
]

/** Soft-skill Likert items, including reverse-coded pairs for the consistency check. */
const softSkillItems: { skill: string; prompt: string; reversed?: boolean }[] = [
  { skill: 'patient-communication', prompt: 'I check that a patient has understood my instructions before ending a consultation.' },
  { skill: 'patient-communication', prompt: 'I find it difficult to explain a diagnosis without using technical terms.', reversed: true },
  { skill: 'english-written-communication', prompt: 'I can write a clear summary of a complex topic for a non-specialist reader.' },
  { skill: 'written-communication', prompt: 'I review what I have written before sending it.' },
  { skill: 'teamwork', prompt: 'I actively seek input from colleagues before finalising a decision that affects them.' },
  { skill: 'teamwork', prompt: 'I prefer to complete tasks alone rather than coordinate with others.', reversed: true },
  { skill: 'problem-solving', prompt: 'When something fails, I look for the underlying cause rather than the quickest workaround.' },
  { skill: 'problem-solving', prompt: 'I tend to give up on a problem if the first two approaches do not work.', reversed: true },
  { skill: 'adaptability', prompt: 'I adjust my approach readily when circumstances change.' },
  { skill: 'adaptability', prompt: 'Unexpected changes to a plan leave me unable to make progress.', reversed: true },
  { skill: 'time-management', prompt: 'I plan my work so that deadlines are met without a last-minute rush.' },
  { skill: 'time-management', prompt: 'I frequently submit work close to or after the deadline.', reversed: true },
  { skill: 'attention-to-detail', prompt: 'I double-check records and figures before signing them off.' },
  { skill: 'attention-to-detail', prompt: 'Small discrepancies in documentation do not concern me much.', reversed: true },
  { skill: 'professional-ethics', prompt: 'I would raise a concern about a documentation irregularity even if it was inconvenient.' },
  { skill: 'professional-ethics', prompt: 'I would overlook a minor rule if it helped meet a deadline.', reversed: true },
  { skill: 'learning-agility', prompt: 'I regularly teach myself skills that my course does not cover.' },
  { skill: 'learning-agility', prompt: 'I wait to be taught something formally before attempting it.', reversed: true },
  { skill: 'team-coordination', prompt: 'Colleagues come to me to unblock or coordinate work.' },
  { skill: 'therapist-supervision', prompt: 'I am comfortable giving corrective feedback to someone I supervise.' },
  { skill: 'guest-experience', prompt: 'I adapt how I communicate when working with people from a different background.' },
]

export async function seedAssessment(prisma: PrismaClient) {
  const skills = new Map(
    (await prisma.skill.findMany({ select: { id: true, slug: true } })).map((s) => [s.slug, s.id]),
  )

  const assessment = await prisma.assessment.create({
    data: {
      title: 'Core Skill Assessment',
      slug: 'core-skill-assessment',
      description:
        'Technical, domain, aptitude and soft-skill sections built from criteria supplied by industry. Autosaves; roughly 45 minutes.',
      programmes: JSON.stringify(['BAMS', 'BHMS', 'BUMS', 'BNYS', 'B.Pharm (Ayurveda)', 'B.Tech']),
      durationMins: 45,
      cooldownDays: 30,
    },
  })

  let order = 0
  for (const q of questions) {
    await prisma.question.create({
      data: {
        assessmentId: assessment.id,
        skillId: q.skill ? (skills.get(q.skill) ?? null) : null,
        section: q.section,
        type: q.type,
        prompt: q.prompt,
        options: q.options ? JSON.stringify(q.options) : null,
        correct: q.correct ? JSON.stringify(q.correct) : null,
        weight: q.weight ?? 1,
        difficulty: q.difficulty ?? 2,
        sortOrder: order++,
      },
    })
  }

  for (const item of softSkillItems) {
    await prisma.question.create({
      data: {
        assessmentId: assessment.id,
        skillId: skills.get(item.skill) ?? null,
        section: 'Soft skills',
        type: 'LIKERT',
        prompt: item.prompt,
        options: JSON.stringify(LIKERT),
        weight: 1,
        difficulty: 1,
        isReversed: Boolean(item.reversed),
        sortOrder: order++,
      },
    })
  }

  return { assessments: 1, questions: questions.length + softSkillItems.length }
}
