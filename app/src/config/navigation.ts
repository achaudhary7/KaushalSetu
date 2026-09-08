/**
 * Navigation, defined once.
 *
 * Header, footer, mobile menu, sitemap page and per-role dashboard sidebars all read from
 * here. A route added to this file appears everywhere it should, and nowhere it should not.
 *
 * Routes are declared ahead of the phase that builds them (see docs/SITEMAP.md); anything
 * not yet built is marked `planned` and filtered out of the rendered navigation.
 */

export interface NavItem {
  label: string
  href: string
  description?: string
  /** Not yet built. Hidden from navigation until its phase lands. */
  planned?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

/* ---- Primary navigation (header) ----------------------------------------- */

export const audienceNav: NavGroup = {
  label: 'Who it is for',
  items: [
    {
      label: 'Students',
      href: '/for-students',
      description: 'Assess your skills, close the gaps, find internships',
      planned: true,
    },
    {
      label: 'Industry',
      href: '/for-industry',
      description: 'Post roles, screen on verified skills, hire faster',
      planned: true,
    },
    {
      label: 'Institutions',
      href: '/for-institutions',
      description: 'Track readiness, see the curriculum gap, prove outcomes',
      planned: true,
    },
    {
      label: 'Academicians',
      href: '/for-academicians',
      description: 'FDPs, faculty internships, consultancy and research',
      planned: true,
    },
  ],
}

export const exploreNav: NavGroup = {
  label: 'Explore',
  items: [
    {
      label: 'Opportunities',
      href: '/opportunities',
      description: 'Internships, jobs, micro-internships and live projects',
      planned: true,
    },
    {
      label: 'Career paths',
      href: '/careers',
      description: 'Where a qualification can actually take you',
      planned: true,
    },
    {
      label: 'Skills',
      href: '/skills',
      description: 'What each skill is, who wants it, where to learn it free',
      planned: true,
    },
    {
      label: 'Ayush careers',
      href: '/ayush',
      description: 'BAMS, BHMS and BUMS routes into industry',
      planned: true,
    },
    {
      label: 'Verify a certificate',
      href: '/verify',
      description: 'Check any KaushalSetu certificate in seconds',
      planned: true,
    },
  ],
}

export const primaryNav: NavItem[] = [
  { label: 'How it works', href: '/how-it-works', planned: true },
  { label: 'Features', href: '/features', planned: true },
  { label: 'Resources', href: '/resources', planned: true },
  { label: 'About', href: '/about', planned: true },
]

/* ---- Footer -------------------------------------------------------------- */

export const footerNav: NavGroup[] = [
  {
    label: 'Platform',
    items: [
      { label: 'How it works', href: '/how-it-works', planned: true },
      { label: 'Features', href: '/features', planned: true },
      { label: 'Opportunities', href: '/opportunities', planned: true },
      { label: 'Career paths', href: '/careers', planned: true },
      { label: 'Skills', href: '/skills', planned: true },
      { label: 'Pricing', href: '/pricing', planned: true },
    ],
  },
  {
    label: 'Who it is for',
    items: audienceNav.items,
  },
  {
    label: 'Resources',
    items: [
      { label: 'Insights', href: '/resources', planned: true },
      { label: 'Help centre', href: '/help', planned: true },
      { label: 'FAQ', href: '/faq', planned: true },
      { label: 'Verify a certificate', href: '/verify', planned: true },
      { label: 'Ayush careers', href: '/ayush', planned: true },
      { label: 'Design system', href: '/style-guide' },
    ],
  },
  {
    label: 'Legal & trust',
    items: [
      { label: 'Privacy policy', href: '/privacy', planned: true },
      { label: 'Terms of use', href: '/terms', planned: true },
      { label: 'Cookie policy', href: '/cookies', planned: true },
      { label: 'Accessibility', href: '/accessibility', planned: true },
      { label: 'Grievance officer', href: '/grievance', planned: true },
      { label: 'Security disclosure', href: '/security', planned: true },
    ],
  },
]

/* ---- Dashboard sidebars, by role ----------------------------------------- */

export const dashboardNav: Record<string, NavGroup[]> = {
  student: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', href: '/dashboard/student', planned: true },
        { label: 'My skills', href: '/dashboard/student/skills', planned: true },
        { label: 'Assessment', href: '/dashboard/student/assessment', planned: true },
      ],
    },
    {
      label: 'Opportunities',
      items: [
        { label: 'Recommended', href: '/dashboard/student/recommendations', planned: true },
        { label: 'Browse', href: '/dashboard/student/opportunities', planned: true },
        { label: 'Applications', href: '/dashboard/student/applications', planned: true },
      ],
    },
    {
      label: 'Growth',
      items: [
        { label: 'Portfolio', href: '/dashboard/student/portfolio', planned: true },
        { label: 'Certificates', href: '/dashboard/student/certificates', planned: true },
        { label: 'Learning', href: '/dashboard/student/learning', planned: true },
        { label: 'Mentorship', href: '/dashboard/student/mentorship', planned: true },
      ],
    },
  ],
  industry: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', href: '/dashboard/industry', planned: true },
        { label: 'Company profile', href: '/dashboard/industry/company', planned: true },
      ],
    },
    {
      label: 'Hiring',
      items: [
        { label: 'Opportunities', href: '/dashboard/industry/opportunities', planned: true },
        { label: 'Candidates', href: '/dashboard/industry/candidates', planned: true },
        { label: 'Interviews', href: '/dashboard/industry/interviews', planned: true },
      ],
    },
    {
      label: 'Engagement',
      items: [
        { label: 'Live projects', href: '/dashboard/industry/projects', planned: true },
        { label: 'Mentorship', href: '/dashboard/industry/mentorship', planned: true },
        { label: 'Certificates', href: '/dashboard/industry/certificates', planned: true },
        { label: 'Analytics', href: '/dashboard/industry/analytics', planned: true },
      ],
    },
  ],
  academician: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', href: '/dashboard/academician', planned: true },
        { label: 'Profile', href: '/dashboard/academician/profile', planned: true },
      ],
    },
    {
      label: 'Opportunities',
      items: [
        { label: 'Browse', href: '/dashboard/academician/opportunities', planned: true },
        { label: 'FDPs', href: '/dashboard/academician/programmes', planned: true },
        { label: 'Research', href: '/dashboard/academician/research', planned: true },
        { label: 'Applications', href: '/dashboard/academician/applications', planned: true },
      ],
    },
  ],
  institution: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', href: '/dashboard/institution', planned: true },
        { label: 'Students', href: '/dashboard/institution/students', planned: true },
        { label: 'Faculty', href: '/dashboard/institution/faculty', planned: true },
      ],
    },
    {
      label: 'Insight',
      items: [
        { label: 'Placements', href: '/dashboard/institution/placements', planned: true },
        { label: 'Analytics', href: '/dashboard/institution/analytics', planned: true },
        { label: 'Curriculum gap', href: '/dashboard/institution/curriculum-gap', planned: true },
        { label: 'Outcomes', href: '/dashboard/institution/outcomes', planned: true },
      ],
    },
  ],
  admin: [
    {
      label: 'Administration',
      items: [
        { label: 'Overview', href: '/admin', planned: true },
        { label: 'Users', href: '/admin/users', planned: true },
        { label: 'Employer verification', href: '/admin/verifications', planned: true },
        { label: 'Reported listings', href: '/admin/reports', planned: true },
        { label: 'Skill taxonomy', href: '/admin/taxonomy', planned: true },
        { label: 'Insights', href: '/admin/insights', planned: true },
        { label: 'Audit log', href: '/admin/audit', planned: true },
      ],
    },
  ],
}

/** Drops routes whose phase has not landed yet, so navigation never links to a 404. */
export function live(items: NavItem[]): NavItem[] {
  return items.filter((item) => !item.planned)
}
