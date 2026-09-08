'use client'

import { useState } from 'react'

import {
  AwardIcon,
  BriefcaseIcon,
  DownloadIcon,
  GraduationCapIcon,
  LightbulbIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
} from '@/components/icons'
import * as Icons from '@/components/icons'
import {
  AssessmentScene,
  BridgeScene,
  CollaborationScene,
  EmptyScene,
  GrowthScene,
  MatchingScene,
  NotFoundScene,
  VerificationScene,
} from '@/components/illustrations'
import { Container, Grid, PageHeader, Section } from '@/components/layout/container'
import { Logo } from '@/components/Logo'
import { Avatar, AvatarGroup } from '@/components/ui/avatar'
import { Badge, Chip, SkillBadge, tierMeta, type VerificationTier } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StatTile,
} from '@/components/ui/card'
import { Rating, Separator, Timeline } from '@/components/ui/data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/disclosure'
import {
  Alert,
  Callout,
  EmptyState,
  ErrorState,
  Progress,
  ProgressRing,
  Skeleton,
  Spinner,
} from '@/components/ui/feedback'
import { Field, FileInput, Input, NativeSelect, Textarea } from '@/components/ui/input'
import { Breadcrumbs, Pagination, Stepper } from '@/components/ui/navigation'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
  Tooltip,
} from '@/components/ui/overlay'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { Checkbox, Radio, RadioGroup, Slider, Switch } from '@/components/ui/toggle'

/**
 * The design system reference.
 *
 * A component that is not on this page does not exist. It is also the regression test:
 * every variant and state renders here, so a styling break is visible immediately.
 *
 * This is the one page in the product that is a Client Component wholesale. It exists to
 * exercise interactive components, it is noindex, and it ships to nobody but us - so the
 * server-first rule is relaxed here deliberately rather than accidentally.
 */

function Block({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-20 border-t border-[color:var(--color-border)] py-10">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-1 max-w-2xl text-sm text-[color:var(--color-fg-muted)]">{description}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      {label ? (
        <p className="mb-2 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

const iconEntries = Object.entries(Icons).filter(
  ([name]) => name.endsWith('Icon') && name !== 'Icon',
) as [string, React.ComponentType<{ size?: number }>][]

export default function StyleGuidePage() {
  const { toast } = useToast()
  const [sliderValue, setSliderValue] = useState([60])
  const [step, setStep] = useState(1)

  return (
    <Section spacing="md">
      <Container>
        <PageHeader
          title="Design system"
          description="Every component, every variant, every state. Switch the theme in the header — nothing here should break, and every text pair should stay readable."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Design system' }]}
        />

        {/* ---- Brand ---------------------------------------------------- */}
        <Block
          title="Brand"
          description="The mark reads two ways on purpose: a setu (bridge) between academia and industry, and an ascending trajectory ending at a destination."
        >
          <Row label="Lockups">
            <Logo variant="horizontal" size="lg" />
            <Logo variant="stacked" size="md" />
            <Logo variant="mark" size="lg" />
          </Row>
          <Row label="Sizes">
            <Logo variant="horizontal" size="sm" />
            <Logo variant="horizontal" size="md" />
            <Logo variant="horizontal" size="xl" />
          </Row>
          <Row label="Tones">
            <span className="rounded-[var(--radius-md)] bg-[color:var(--color-surface-sunken)] p-3">
              <Logo variant="horizontal" tone="mono" />
            </span>
            <span className="rounded-[var(--radius-md)] bg-[color:var(--color-primary-900)] p-3 text-white">
              <Logo variant="horizontal" tone="inverse" />
            </span>
          </Row>
          <Row label="At favicon size">
            <Logo variant="mark" size="sm" />
            <span className="text-xs text-[color:var(--color-fg-muted)]">
              The pylons must still read at 16–24px.
            </span>
          </Row>
        </Block>

        {/* ---- Colour --------------------------------------------------- */}
        <Block
          title="Colour"
          description="Tokens only — no component writes a hex value. Each pair below must hold 4.5:1 for body text in both themes."
        >
          {[
            { name: 'Primary — trust, institution', prefix: 'primary' },
            { name: 'Accent — Ayush, growth, verified', prefix: 'accent' },
            { name: 'Highlight — CTA, Indian identity', prefix: 'highlight' },
            { name: 'Neutral', prefix: 'neutral' },
          ].map((ramp) => (
            <div key={ramp.prefix} className="mb-5">
              <p className="mb-2 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                {ramp.name}
              </p>
              <div className="flex flex-wrap gap-1">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className="size-12 rounded-[var(--radius-sm)] border border-[color:var(--color-border)]"
                      style={{ backgroundColor: `var(--color-${ramp.prefix}-${shade})` }}
                    />
                    <span className="font-mono text-[10px] text-[color:var(--color-fg-subtle)]">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Row label="Semantic">
            {['success', 'warning', 'danger', 'info'].map((tone) => (
              <span
                key={tone}
                className="rounded-[var(--radius-md)] px-3 py-1.5 text-sm font-medium capitalize"
                style={{
                  backgroundColor: `var(--color-${tone}-subtle)`,
                  color: `var(--color-${tone})`,
                }}
              >
                {tone}
              </span>
            ))}
          </Row>
        </Block>

        {/* ---- Typography ----------------------------------------------- */}
        <Block
          title="Typography"
          description="Two families. Inter for everything, JetBrains Mono for codes, IDs and verification hashes."
        >
          <div className="space-y-2">
            <p className="text-5xl font-semibold tracking-tight">Display 5xl</p>
            <p className="text-4xl font-semibold tracking-tight">Heading 4xl</p>
            <p className="text-3xl font-semibold tracking-tight">Heading 3xl</p>
            <p className="text-2xl font-semibold tracking-tight">Heading 2xl</p>
            <p className="text-xl font-medium">Heading xl</p>
            <p className="text-base">
              Body base — the default reading size. Line length is capped near 70 characters so
              long-form pages stay comfortable.
            </p>
            <p className="text-sm text-[color:var(--color-fg-muted)]">
              Small muted — hints, captions and secondary metadata.
            </p>
            <p className="font-mono text-sm">KS-CERT-8F2A-91DC — mono, for codes and IDs</p>
          </div>
        </Block>

        {/* ---- Verification tiers --------------------------------------- */}
        <Block
          title="Skill verification tiers"
          description="The product's credibility mechanism (ADR-006). Distinguishable at a glance and in greyscale — icon and border weight differ, not just colour."
        >
          <Row>
            <SkillBadge skill="Panchakarma procedures" tier="SELF_DECLARED" proficiency={3} />
            <SkillBadge skill="Dravyaguna" tier="ASSESSMENT_VERIFIED" proficiency={4} />
            <SkillBadge
              skill="GMP documentation"
              tier="EMPLOYER_ENDORSED"
              proficiency={4}
              endorsedBy="Himalaya Wellness"
            />
          </Row>
          <Grid cols={3} className="mt-4">
            {(Object.keys(tierMeta) as VerificationTier[]).map((tier) => (
              <Card key={tier}>
                <CardBody>
                  <SkillBadge skill="Clinical research" tier={tier} />
                  <p className="mt-3 text-sm font-medium">{tierMeta[tier].label}</p>
                  <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                    {tierMeta[tier].description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Block>

        {/* ---- Buttons -------------------------------------------------- */}
        <Block
          title="Button"
          description="One button component. Variants via props, never via a copied file."
        >
          <Row label="Variants">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add">
              <PlusIcon />
            </Button>
            <Button size="icon-sm" aria-label="Search">
              <SearchIcon />
            </Button>
          </Row>
          <Row label="States">
            <Button disabled>Disabled</Button>
            <Button loading>Saving</Button>
            <Button variant="outline" loading>
              Loading
            </Button>
          </Row>
          <Row label="With icons">
            <Button>
              <PlusIcon /> Post opportunity
            </Button>
            <Button variant="outline">
              <DownloadIcon /> Download resume
            </Button>
          </Row>
        </Block>

        {/* ---- Forms ---------------------------------------------------- */}
        <Block
          title="Form controls"
          description="Every text control lives inside a Field, which owns the id and wires aria-describedby to the hint and error. Errors are announced and carry an icon — never colour alone."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" hint="As it appears on your academic records" required>
              <Input placeholder="Ananya Sharma" />
            </Field>
            <Field label="Email" error="Enter a valid institutional email address" required>
              <Input type="email" defaultValue="ananya@" />
            </Field>
            <Field label="Programme">
              <NativeSelect defaultValue="bams">
                <option value="bams">BAMS — Ayurveda</option>
                <option value="bhms">BHMS — Homoeopathy</option>
                <option value="bums">BUMS — Unani</option>
                <option value="other">Other</option>
              </NativeSelect>
            </Field>
            <Field label="Year of study" hint="Used for eligibility matching">
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First year</SelectItem>
                  <SelectItem value="2">Second year</SelectItem>
                  <SelectItem value="3" description="Eligible for most internships">
                    Third year
                  </SelectItem>
                  <SelectItem value="4">Final year</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field
              label="About you"
              hint="A short summary for your public portfolio"
              className="sm:col-span-2"
            >
              <Textarea placeholder="Third-year BAMS student interested in clinical research…" />
            </Field>
            <Field label="Upload resume" hint="PDF, up to 5 MB">
              <FileInput accept=".pdf" />
            </Field>
            <Field label="Disabled" hint="Not editable in this state">
              <Input disabled defaultValue="Locked value" />
            </Field>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                Checkbox
              </p>
              <div className="flex flex-col gap-3">
                <Checkbox label="Remote only" defaultChecked />
                <Checkbox label="Verified employers" description="Recommended" />
                <Checkbox label="Disabled option" disabled />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                Radio
              </p>
              <RadioGroup defaultValue="internship">
                <Radio value="internship" label="Internship" />
                <Radio value="micro" label="Micro-internship" description="1–4 weeks, paid" />
                <Radio value="job" label="Entry-level job" />
              </RadioGroup>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                Switch &amp; slider
              </p>
              <div className="flex flex-col gap-4">
                <Switch
                  label="Blind shortlisting"
                  description="Hide identity in first pass"
                  defaultChecked
                />
                <Switch label="Email alerts" />
                <div>
                  <p className="mb-2 text-sm">Minimum match score: {sliderValue[0]}%</p>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={5}
                    aria-label="Minimum match score"
                  />
                </div>
              </div>
            </div>
          </div>
        </Block>

        {/* ---- Cards & stats -------------------------------------------- */}
        <Block title="Card &amp; StatTile">
          <Grid cols={3}>
            <Card>
              <CardHeader>
                <CardTitle>Bordered</CardTitle>
                <CardDescription>The default surface for grouped content.</CardDescription>
              </CardHeader>
              <CardBody className="pt-3 text-sm text-[color:var(--color-fg-muted)]">
                Borders do most of the separation work; shadows only signal elevation.
              </CardBody>
              <CardFooter>
                <Button size="sm">Action</Button>
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
              </CardFooter>
            </Card>
            <Card variant="raised" interactive>
              <CardHeader>
                <CardTitle>Raised &amp; interactive</CardTitle>
                <CardDescription>Lifts on hover and on focus-within.</CardDescription>
              </CardHeader>
              <CardBody className="pt-3 text-sm text-[color:var(--color-fg-muted)]">
                Used for clickable listing cards.
              </CardBody>
            </Card>
            <Card variant="flat">
              <CardHeader>
                <CardTitle>Flat</CardTitle>
                <CardDescription>Quiet grouping with no border.</CardDescription>
              </CardHeader>
              <CardBody className="pt-3 text-sm text-[color:var(--color-fg-muted)]">
                For nested content inside another card.
              </CardBody>
            </Card>
          </Grid>

          <Grid cols={4} className="mt-5">
            <StatTile
              label="Assessments completed"
              value="1,284"
              icon={<GraduationCapIcon />}
              trend={{ direction: 'up', label: '+12%' }}
              hint="this term"
            />
            <StatTile
              label="Placement rate"
              value="76%"
              icon={<BriefcaseIcon />}
              trend={{ direction: 'up', label: '+4pt' }}
              hint="vs. last year"
            />
            <StatTile
              label="Verified employers"
              value="38"
              icon={<UsersIcon />}
              trend={{ direction: 'flat', label: 'steady' }}
            />
            <StatTile
              label="Certificates verified"
              value="512"
              icon={<AwardIcon />}
              trend={{ direction: 'up', label: '+31%' }}
            />
          </Grid>
        </Block>

        {/* ---- Badges --------------------------------------------------- */}
        <Block title="Badge &amp; Chip">
          <Row label="Variants">
            <Badge>Neutral</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Verified</Badge>
            <Badge variant="warning">Pending review</Badge>
            <Badge variant="danger">Rejected</Badge>
            <Badge variant="info">Shortlisted</Badge>
            <Badge variant="outline">Outline</Badge>
          </Row>
          <Row label="Chips (removable filters)">
            <Chip onRemove={() => {}}>Remote</Chip>
            <Chip onRemove={() => {}}>Ayurveda</Chip>
            <Chip onRemove={() => {}}>Stipend ≥ ₹10,000</Chip>
            <Chip>Not removable</Chip>
          </Row>
        </Block>

        {/* ---- Avatars -------------------------------------------------- */}
        <Block
          title="Avatar"
          description="Initials and a deterministic hue derived from the name — every user has a stable, distinct avatar with no uploaded file and no third-party service."
        >
          <Row label="Sizes">
            <Avatar name="Ananya Sharma" size="xs" />
            <Avatar name="Ananya Sharma" size="sm" />
            <Avatar name="Ananya Sharma" size="md" />
            <Avatar name="Ananya Sharma" size="lg" />
            <Avatar name="Ananya Sharma" size="xl" />
          </Row>
          <Row label="Distinct hues">
            <Avatar name="Rahul Verma" />
            <Avatar name="Meera Iyer" />
            <Avatar name="Himalaya Wellness" />
            <Avatar name="AIIA New Delhi" />
          </Row>
          <Row label="Group">
            <AvatarGroup
              people={[
                { name: 'Ananya Sharma' },
                { name: 'Rahul Verma' },
                { name: 'Meera Iyer' },
                { name: 'Karthik Nair' },
                { name: 'Priya Das' },
                { name: 'Sanjay Rao' },
              ]}
            />
          </Row>
        </Block>

        {/* ---- Feedback ------------------------------------------------- */}
        <Block title="Feedback">
          <Row label="Alerts">
            <div className="flex w-full flex-col gap-3">
              <Alert tone="info" title="Assessment available">
                Your skill profile is 14 days old. Retake the assessment to refresh your matches.
              </Alert>
              <Alert tone="success" title="Certificate issued">
                Himalaya Wellness issued your internship certificate. It is now publicly verifiable.
              </Alert>
              <Alert tone="warning" title="Verification pending">
                Your company cannot publish opportunities until registration is verified.
              </Alert>
              <Alert tone="danger" title="Application failed">
                This opportunity closed before your application was submitted.
              </Alert>
            </div>
          </Row>
          <Row label="Callout">
            <Callout icon={<LightbulbIcon />} title="How is this calculated?" className="w-full">
              Your match score is weighted cosine similarity over the skill vector, adjusted for
              coverage and verification. Every term is shown in the explanation panel.
            </Callout>
          </Row>
          <Row label="Progress">
            <div className="flex w-full flex-wrap items-center gap-8">
              <div className="min-w-56 flex-1">
                <Progress value={72} label="Profile completeness" showValue />
              </div>
              <div className="min-w-56 flex-1">
                <Progress
                  value={45}
                  tone="warning"
                  label="Skill coverage for target role"
                  showValue
                />
              </div>
              <ProgressRing value={86} label="Match score" />
              <ProgressRing value={34} size={48} strokeWidth={5} label="Coverage" />
            </div>
          </Row>
          <Row label="Loading">
            <Spinner />
            <Spinner label="Calculating matches" />
            <div className="w-full max-w-sm space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </Row>
          <Row label="Toasts">
            <Button variant="outline" onClick={() => toast({ title: 'Saved', tone: 'success' })}>
              Success toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Could not submit',
                  description: 'The deadline for this opportunity has passed.',
                  tone: 'danger',
                })
              }
            >
              Error toast
            </Button>
          </Row>
        </Block>

        {/* ---- Empty & error -------------------------------------------- */}
        <Block
          title="Empty &amp; error states"
          description="Every data view in this product ships all three: loading, empty, error. No exceptions."
        >
          <Grid cols={2}>
            <EmptyState
              illustration={<EmptyScene className="w-32" />}
              title="No applications yet"
              description="When you apply to an opportunity it will appear here with its full status trail."
              action={<Button size="sm">Browse opportunities</Button>}
            />
            <ErrorState
              description="We could not load your recommendations. Your skill profile is safe."
              action={
                <Button size="sm" variant="outline">
                  Try again
                </Button>
              }
            />
          </Grid>
        </Block>

        {/* ---- Disclosure ----------------------------------------------- */}
        <Block title="Tabs &amp; Accordion">
          <Tabs defaultValue="opportunities">
            <TabsList>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="careers">Career paths</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
            </TabsList>
            <TabsContent
              value="opportunities"
              className="text-sm text-[color:var(--color-fg-muted)]"
            >
              Ranked by match score, with the full explanation available on every card.
            </TabsContent>
            <TabsContent value="careers" className="text-sm text-[color:var(--color-fg-muted)]">
              Where a BAMS can actually go: clinical practice, GMP manufacturing, regulatory
              affairs, clinical research, medical writing.
            </TabsContent>
            <TabsContent value="learning" className="text-sm text-[color:var(--color-fg-muted)]">
              Every gap maps to specific free SWAYAM and NPTEL courses.
            </TabsContent>
          </Tabs>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="a">
              <AccordionTrigger>How is a match score calculated?</AccordionTrigger>
              <AccordionContent>
                Weighted cosine similarity over the skill vector, plus a coverage term, a
                critical-skill gate and a verification weighting. It is arithmetic, not a model, so
                the same inputs always produce the same score.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>What makes a skill &ldquo;verified&rdquo;?</AccordionTrigger>
              <AccordionContent>
                Three tiers. Self-declared is what the student typed. Assessment-verified is earned
                through a platform assessment. Employer-endorsed is vouched for by a verified
                company after an internship.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Can a certificate be faked?</AccordionTrigger>
              <AccordionContent>
                Every certificate carries a QR resolving to a public verification page showing the
                issuer, the recipient and whether it has been revoked.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Block>

        {/* ---- Overlays ------------------------------------------------- */}
        <Block
          title="Overlays"
          description="All on Radix — focus trapping, escape handling and correct ARIA come for free."
        >
          <Row>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent
                title="Withdraw application"
                description="This cannot be undone. The recruiter will see that you withdrew."
              >
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="ghost">Keep it</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="danger">Withdraw</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open sheet</Button>
              </SheetTrigger>
              <SheetContent title="Filters" description="Narrow the opportunity list">
                <div className="flex flex-col gap-3">
                  <Checkbox label="Remote" />
                  <Checkbox label="Paid only" defaultChecked />
                  <Checkbox label="Verified employers" defaultChecked />
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Dropdown menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <DownloadIcon /> Download resume
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SparklesIcon /> Improve my match
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Withdraw</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="font-medium">Coverage</p>
                <p className="mt-1 text-[color:var(--color-fg-muted)]">
                  How much of the requirement your current proficiency meets, before weighting.
                </p>
              </PopoverContent>
            </Popover>

            <Tooltip content="Verified by assessment on 12 Aug 2026">
              <Button variant="outline">Hover for tooltip</Button>
            </Tooltip>
          </Row>
        </Block>

        {/* ---- Navigation ----------------------------------------------- */}
        <Block
          title="Navigation"
          description="Breadcrumbs emit BreadcrumbList structured data from the same array they render — the two can never drift."
        >
          <Row label="Breadcrumbs">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Opportunities', href: '/opportunities' },
                { label: 'Ayurvedic QA Intern' },
              ]}
            />
          </Row>
          <Row label="Pagination">
            <Pagination page={4} totalPages={12} hrefFor={(p) => `/style-guide?page=${p}`} />
          </Row>
          <div className="mb-5">
            <p className="mb-3 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
              Stepper
            </p>
            <Stepper
              current={step}
              steps={[
                { label: 'Your details', description: 'Name and institution' },
                { label: 'Skills', description: 'Self-declare what you know' },
                { label: 'Assessment', description: 'Verify them' },
                { label: 'Done' },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <Button size="sm" onClick={() => setStep((s) => Math.min(3, s + 1))}>
                Next
              </Button>
            </div>
          </div>
        </Block>

        {/* ---- Data ----------------------------------------------------- */}
        <Block title="Table &amp; Timeline">
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Candidate</TableHeaderCell>
                  <TableHeaderCell sortable>Match</TableHeaderCell>
                  <TableHeaderCell>Verified skills</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    name: 'Candidate 4821',
                    match: 92,
                    skills: 7,
                    status: 'Shortlisted',
                    tone: 'info',
                  },
                  {
                    name: 'Candidate 3390',
                    match: 84,
                    skills: 5,
                    status: 'Under review',
                    tone: 'neutral',
                  },
                  {
                    name: 'Candidate 7712',
                    match: 71,
                    skills: 3,
                    status: 'Applied',
                    tone: 'neutral',
                  },
                ].map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="tabular-nums">{row.match}%</TableCell>
                    <TableCell>{row.skills}</TableCell>
                    <TableCell>
                      <Badge variant={row.tone as 'info' | 'neutral'}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
          <p className="mt-2 text-xs text-[color:var(--color-fg-subtle)]">
            Names are withheld here because blind shortlisting is on — enforced server-side, not
            hidden in the DOM (ADR-008).
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                Timeline
              </p>
              <Timeline
                entries={[
                  { title: 'Applied', timestamp: '02 Sep', state: 'done' },
                  { title: 'Under review', timestamp: '04 Sep', state: 'done' },
                  {
                    title: 'Shortlisted',
                    description: 'Blind screening passed',
                    timestamp: '06 Sep',
                    state: 'current',
                  },
                  { title: 'Interview', state: 'upcoming' },
                  { title: 'Offer', state: 'upcoming' },
                ]}
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-wider text-[color:var(--color-fg-subtle)] uppercase">
                Rating
              </p>
              <div className="flex flex-col gap-3">
                <Rating value={4.6} label="Mentor rating: 4.6 out of 5" />
                <Rating value={3.2} />
                <Rating value={5} />
              </div>
            </div>
          </div>
        </Block>

        {/* ---- Icons ---------------------------------------------------- */}
        <Block
          title={`Icons (${iconEntries.length})`}
          description="Inline SVG on a 24px grid with 1.5px strokes. No icon font, no sprite fetch — they inherit currentColor, so theming and disabled states are free."
        >
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8">
            {iconEntries.map(([name, IconComponent]) => (
              <div
                key={name}
                className="flex flex-col items-center gap-1.5 rounded-[var(--radius-md)] border border-[color:var(--color-border)] p-3"
              >
                <IconComponent size={20} />
                <span className="w-full truncate text-center font-mono text-[10px] text-[color:var(--color-fg-subtle)]">
                  {name.replace(/Icon$/, '')}
                </span>
              </div>
            ))}
          </div>
        </Block>

        {/* ---- Illustrations -------------------------------------------- */}
        <Block
          title="Illustrations"
          description="Geometric and abstract, drawn from design tokens so every scene themes automatically. No raster assets anywhere in this product."
        >
          <Grid cols={2}>
            {[
              ['Bridge — hero', <BridgeScene key="b" />],
              ['Assessment', <AssessmentScene key="a" />],
              ['Matching', <MatchingScene key="m" />],
              ['Verification', <VerificationScene key="v" />],
              ['Growth', <GrowthScene key="g" />],
              ['Collaboration', <CollaborationScene key="c" />],
              ['Not found', <NotFoundScene key="n" />],
              ['Empty', <EmptyScene key="e" />],
            ].map(([label, scene]) => (
              <Card key={label as string}>
                <CardBody>
                  <div className="grid min-h-40 place-items-center">{scene as React.ReactNode}</div>
                  <p className="mt-3 text-center text-xs text-[color:var(--color-fg-subtle)]">
                    {label as string}
                  </p>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Block>

        {/* ---- Accessibility -------------------------------------------- */}
        <Block
          title="Accessibility floor"
          description="What every component in this system is held to. Verified again in Phase 12 with axe and a screen reader."
        >
          <ul className="grid gap-2 text-sm text-[color:var(--color-fg-muted)] sm:grid-cols-2">
            {[
              'Contrast 4.5:1 body text, 3:1 large text and UI boundaries — in both themes',
              'Every interactive element reachable by keyboard, with a visible focus ring',
              'Focus rings are never removed; :focus-visible is styled globally',
              'One h1 per page, headings in order, real landmarks, skip-to-content link',
              'Errors announced via role="alert", associated with their field, never colour alone',
              'Touch targets 44×44 minimum',
              'Usable at 200% zoom with no loss of content or function',
              'prefers-reduced-motion honoured globally in globals.css',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <TrendingUpIcon
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-success)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </Block>
      </Container>
    </Section>
  )
}
