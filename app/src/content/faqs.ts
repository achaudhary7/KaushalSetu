/**
 * FAQ content.
 *
 * Written as genuine question/answer pairs rather than keyword bait — per
 * ../SEO IMPs/Snipet.txt, well-structured direct answers are what become featured
 * snippets and People-Also-Ask entries. There is no markup that requests one.
 *
 * Any page rendering a set must also emit faqJsonLd() for it.
 */

export interface Faq {
  question: string
  answer: string
}

export const generalFaqs: Faq[] = [
  {
    question: 'What is KaushalSetu?',
    answer:
      'A single platform connecting students, industry, academicians and institutions. Students assess their skills, see exactly which ones industry wants and how to close the gap, then find and apply for internships and jobs matched to their verified profile. Industry posts opportunities and screens candidates on evidence rather than college name. Institutions see what their students are actually missing.',
  },
  {
    question: 'Does it cost anything?',
    answer:
      'It is free for students, academicians and institutions. Industry pays for hiring features on larger plans; posting a limited number of internships is free.',
  },
  {
    question: 'How is a match score calculated?',
    answer:
      "Weighted cosine similarity between your skill profile and the role's requirements, adjusted for how much of the requirement you cover, whether you meet every must-have skill, and how many of your matched skills are verified rather than self-declared. It is arithmetic, not a model — the same inputs always produce the same score, and every recommendation shows you the full calculation.",
  },
  {
    question: 'Do you use AI?',
    answer:
      'Not for matching, deliberately. The recommendation engine is a transparent, reproducible calculation you can inspect on screen. AI is being added later as an optional enhancement layer — for resume parsing and synonym matching — and the platform works completely without it.',
  },
  {
    question: 'Is this only for Ayush students?',
    answer:
      'No. The skill taxonomy is data, not code, so the same platform serves any institution. It ships Ayush-first — with career paths, skills and internship categories built for BAMS, BHMS, BUMS and BNYS graduates — because that content barely exists anywhere else. Engineering, IT, management and soft-skill branches ship alongside it.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Academic records, resumes and certificates are treated as sensitive: stored outside the web root, reachable only through an authorised route, and every access is logged. We collect the minimum needed to match you, and you can export or delete everything from your account settings.',
  },
]

export const studentFaqs: Faq[] = [
  {
    question: 'What does the skill assessment involve?',
    answer:
      'Sections covering technical skills, domain knowledge, aptitude and soft skills — roughly 40 questions using criteria supplied by industry. It saves as you go, so you can stop and resume. You get a skill profile with proficiency per skill, your strengths, and your gaps ranked by how much they actually matter for the roles you want.',
  },
  {
    question: 'What is a verified skill?',
    answer:
      'There are three tiers. Self-declared is what you typed. Assessment-verified is earned by completing a KaushalSetu assessment and links back to your attempt and score. Employer-endorsed is vouched for by a verified company after you worked with them. Recruiters can filter to verified skills only, and verified skills score higher in matching — so the tiers are worth earning.',
  },
  {
    question: 'I am in first year. Is there anything for me?',
    answer:
      'Yes — micro-internships. They are short, paid, one to four week pieces of real work designed so you build a portfolio early instead of waiting until final year. Alumni mentorship is also open from year one.',
  },
  {
    question: 'What can I actually do with a BAMS degree?',
    answer:
      'Far more than clinical practice. Ayush pharmaceutical manufacturing under GMP, panchakarma and wellness centre management, clinical research and CTRI trials, regulatory affairs, medical writing and pharmacovigilance, medical tourism, and the emerging Ayush informatics field. Most graduates are never told these paths exist, which is why competition for them is thin. Our career explorer covers each one with the skills, entry routes and salary bands.',
  },
  {
    question: 'Do the recommended courses cost money?',
    answer:
      "No. Every skill gap maps to specific free courses on SWAYAM and NPTEL — government platforms, no fees. We link to them directly; we do not host our own courses or resell anyone else's.",
  },
  {
    question: 'How do I know an internship listing is genuine?',
    answer:
      'Every employer is verified before a listing goes live, and verified employers carry a badge. If a listing asks you to pay a fee for a certificate or placement, report it — there is a report button on every listing and reports go straight to our admin queue.',
  },
]

export const industryFaqs: Faq[] = [
  {
    question: "How do you verify candidates' skills?",
    answer:
      'Three tiers, and you can filter on them. Assessment-verified skills come from a scored KaushalSetu assessment you can inspect. Employer-endorsed skills were vouched for by another verified company after real work. Self-declared skills are shown as exactly that — visibly weaker, and weighted lower in the match score.',
  },
  {
    question: 'What is blind shortlisting?',
    answer:
      'A toggle that hides candidate name, gender, photo and college during your first screening pass, showing only skills, match score and verified evidence. Identity is revealed when you shortlist. It is enforced on the server — the hidden fields are not in the response at all, not merely hidden in the page — and the platform records that you screened blind, so you can demonstrate it.',
  },
  {
    question: 'Why do we have to be verified before posting?',
    answer:
      'Because fake internship listings that charge students a certificate fee are a real and widespread problem. We verify company registration before any listing goes live. It costs you one submission and it is the reason students trust the listings they see here.',
  },
  {
    question: 'Can we issue internship certificates through the platform?',
    answer:
      'Yes, and they are verifiable. Each certificate carries a unique code and QR that resolves to a public page showing the issuer, the recipient, the dates and whether it has been revoked. Anyone can check it in seconds without an account.',
  },
]

export const institutionFaqs: Faq[] = [
  {
    question: 'What does the institution dashboard show?',
    answer:
      'Skill development across your cohort, internship participation by department and year, and a placement readiness funnel from profiled through assessed, recommended, applied, shortlisted, interviewed and offered — with drop-off visible at each stage. The drop-off is usually the useful part.',
  },
  {
    question: 'What is the reverse skill-gap report?',
    answer:
      'We aggregate the skills employers actually ask for across every posting reaching your students, compare that to what your syllabus covers, and produce three ranked lists: covered and demanded, demanded but not covered, and covered but not demanded. It also folds in anonymised rejection reasons — the skills your students are genuinely being turned down for, which is a sharper signal than job descriptions alone. It is delivered as a termly report.',
  },
  {
    question: 'Do you track what happens after placement?',
    answer:
      'Yes. Automated six- and twelve-month surveys ask whether the graduate is still employed, whether the role is relevant to their qualification, and how satisfied they are. It turns "we placed 200 students" into "we placed 200 students and 84% were still in a relevant role a year later" — which is the sentence worth reporting.',
  },
  {
    question: 'Can we import our existing student records?',
    answer:
      'Via CSV import today. A direct API integration with institutional ERP and AISHE data is specified but not built — we would rather say that plainly than imply an integration that does not exist.',
  },
]

export const academicianFaqs: Faq[] = [
  {
    question: 'What is on the platform for faculty?',
    answer:
      'A dedicated track: faculty internships in industry, industrial training, Faculty Development Programmes with registration and completion certificates, consultancy opportunities posted by companies, and collaborative research matched to your expertise.',
  },
  {
    question: 'How are research collaborations matched?',
    answer:
      'Your expertise is tagged against the same skill taxonomy students use, so industry research needs are matched to faculty expertise by the same engine — and the match is explainable the same way.',
  },
  {
    question: 'Does my institution need to approve an industry engagement?',
    answer:
      'Where your institution requires it, yes — the approval step is built in, because that is how colleges actually work. Your institution sees and approves faculty industry engagements from its own dashboard.',
  },
]
