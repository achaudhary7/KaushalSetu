import type { Metadata } from 'next'

import { Container, Section } from '@/components/layout/container'
import { CtaBand, Hero, Prose, StepList } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/json-ld'
import { Card, CardBody } from '@/components/ui/card'
import { Callout } from '@/components/ui/feedback'
import { LightbulbIcon } from '@/components/icons'
import { howToJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'How it works',
  description:
    'How KaushalSetu profiles skills, computes match scores you can audit, maps gaps to free courses, and verifies every credential it issues.',
  path: '/how-it-works',
})

const studentSteps = [
  {
    name: 'Take the assessment',
    text: 'Technical, domain, aptitude and soft-skill sections, built from criteria industry supplied. It autosaves, so a closed tab loses nothing. Roughly 40 questions.',
  },
  {
    name: 'Get a skill profile',
    text: 'Proficiency on a 0–5 scale per skill with named bands, your strengths, and your gaps ranked by how much each one actually matters for the roles you want.',
  },
  {
    name: 'See where you fit',
    text: 'Career paths ranked by fit and by demand, with the two or three skills standing between you and each one named explicitly.',
  },
  {
    name: 'Close the gaps free',
    text: 'Each gap resolves to specific SWAYAM and NPTEL courses, ordered by prerequisite, with the projected effect on your match score.',
  },
  {
    name: 'Apply and track',
    text: "Matched opportunities from verified employers, one-click apply from your portfolio, and a single pipeline showing every application's real status.",
  },
  {
    name: 'Collect the evidence',
    text: 'Assessments verify skills. Employers endorse them. Completion certificates carry a QR anyone can check. Your portfolio accumulates proof, not claims.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={howToJsonLd({
          name: 'How to use KaushalSetu as a student',
          description:
            'Assess your skills, identify gaps against industry demand, close them with free courses, and apply to matched opportunities with a verified portfolio.',
          steps: studentSteps.map((step) => ({ name: step.name, text: step.text })),
        })}
      />

      <Hero
        eyebrow="How it works"
        title="Six steps, and none of them are a black box."
        description="The platform follows the whole lifecycle — assessment, mapping, learning, application, verification and outcome — rather than stopping at a job listing and calling it placement support."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'Explore career paths', href: '/careers' }}
      />

      <StepList
        eyebrow="For students"
        title="From not knowing to demonstrably ready"
        steps={studentSteps}
        surface="raised"
      />

      {/* The explainability section. This is the answer to the question judges ask. */}
      <Section>
        <Container width="prose">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            How a match score is actually calculated
          </h2>
          <Prose className="mt-4">
            <p>
              Every recommendation on this platform can be opened to show its full arithmetic. Not a
              confidence percentage from a model nobody can inspect — the actual calculation, term
              by term.
            </p>
          </Prose>

          <Card className="mt-6">
            <CardBody>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[color:var(--color-fg-muted)]">
                {`Your skills and the role's requirements are both vectors
over the same skill taxonomy.

  base   = cosine_similarity(you, role)        direction of fit
  cover  = Σ min(you, required) / Σ required   how much you meet
  crit   = 1 if every must-have is met, else a penalty
  verif  = share of matched skills that are verified

  score  = (0.45·base + 0.35·cover + 0.20·verif) × crit × eligibility`}
              </pre>
            </CardBody>
          </Card>

          <Prose className="mt-6">
            <p>
              Eligibility — programme, year, CGPA, location — is a hard gate: it is 1 or 0, never a
              soft weighting. And the <strong>verif</strong> term is why the verification tiers
              matter: a verified skill genuinely produces a better match than the same skill
              self-declared, which gives students a reason to earn verification and recruiters a
              reason to trust it.
            </p>
          </Prose>

          <Callout icon={<LightbulbIcon />} title="Why not AI?" className="mt-6">
            Deliberately. This calculation is instant, costs nothing to run, never depends on an
            external service being up, and produces the same answer every time. Most importantly it
            can be explained in thirty seconds — which matters when the person asking is deciding
            whether to trust the recommendation. AI is being added later for resume parsing and
            synonym matching, as an enhancement on top of this. The platform works completely
            without it.
          </Callout>
        </Container>
      </Section>

      <StepList
        eyebrow="For industry"
        title="Post, screen on evidence, endorse"
        surface="raised"
        steps={[
          {
            name: 'Get verified',
            text: 'One submission of your company registration. Nothing publishes until it clears — which is exactly why students trust what they see here.',
          },
          {
            name: 'Post with real skill requirements',
            text: 'Pick skills from the taxonomy with a required level and a must-have flag. That is what the matching engine consumes.',
          },
          {
            name: 'Screen blind',
            text: 'Toggle identity off for the first pass. Name, gender, photo and college are withheld from the response itself, not hidden in the page.',
          },
          {
            name: 'Shortlist and interview',
            text: 'Reveal identity on shortlisting, schedule interviews, and move candidates through a pipeline everyone can see the status of.',
          },
          {
            name: 'Give a reason',
            text: 'Rejections require a coded reason. Anonymised and aggregated, it becomes the sharpest curriculum signal an institution can get.',
          },
          {
            name: 'Endorse and certify',
            text: 'Endorse the specific skills someone demonstrated, and issue a completion certificate that anyone can verify by QR.',
          },
        ]}
      />

      <StepList
        eyebrow="For institutions"
        title="See the cohort, then see the curriculum"
        steps={[
          {
            name: 'Onboard your students',
            text: 'CSV import today; direct ERP integration is specified but not built, and we would rather say so than imply otherwise.',
          },
          {
            name: 'Watch readiness, not just placement',
            text: 'A funnel from profiled through offered, with drop-off visible at each stage.',
          },
          {
            name: 'Read the reverse gap report',
            text: 'Employer demand against syllabus coverage, plus anonymised rejection reasons, delivered termly.',
          },
          {
            name: 'Follow up at 6 and 12 months',
            text: 'Still employed, role relevant, satisfied — the difference between a placement statistic and evidence.',
          },
        ]}
      />

      <CtaBand
        title="Start where it makes sense for you."
        primaryCta={{ label: 'Browse opportunities', href: '/opportunities' }}
        secondaryCta={{ label: 'See all features', href: '/features' }}
      />
    </>
  )
}
