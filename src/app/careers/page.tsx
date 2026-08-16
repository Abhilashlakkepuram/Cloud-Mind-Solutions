import type { Metadata } from "next";
import { Container, Section, SectionHeading, SectionLabel } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { OpeningsList } from "@/components/careers/OpeningsList";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import {
  IconBadgeDollar,
  IconCheck,
  IconClock,
  IconClose,
  IconGraduation,
  IconHandshake,
  IconHeartPulse,
  IconLaptop,
  IconMegaphone,
  IconMessage,
  IconNodePath,
  IconPenLine,
  IconTerminal,
} from "@/components/icons";

/** Content declares an intent; the page maps it to a glyph. */
const PROCESS_ICONS = {
  conversation: IconMessage,
  write: IconPenLine,
  terminal: IconTerminal,
  offer: IconHandshake,
} as const;

const BENEFIT_ICONS = {
  health: IconHeartPulse,
  pay: IconBadgeDollar,
  time: IconClock,
  learn: IconGraduation,
  speak: IconMegaphone,
  kit: IconLaptop,
} as const;
import {
  benefits,
  careerSpecs,
  hiringProcess,
  lookFor,
  openings,
  whyHere,
} from "@/lib/careers-content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "A small, senior-only AI and IT consultancy in St. Petersburg, Florida. Paid written exercises, feedback either way, and an honest account of who this suits.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — CloudMind Solutions",
    description: "Small team, senior only, client-facing from day one. Here's who it suits.",
    url: `${siteUrl}/careers`,
  },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Small team, senior only, client-facing from the first week."
        lede="There is no delivery tier here to be promoted out of, and none to hide behind either. That is the whole proposition, and it will not suit everyone."
        specs={careerSpecs}
        align="wide"
      />

      {/* ── Openings ─────────────────────────────────────────────────────── */}
      <Section tone="dark" id="openings" className="overflow-hidden">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
        <Container width="wide" className="relative">
          <SectionHeading
            tone="light"
            label="Open roles"
            title={openings.length > 0 ? "What we're hiring for." : "Where things stand."}
            lede={
              openings.length > 0
                ? "Each role lists what you would do, what we need, and who it would not suit. That last part is not filler."
                : undefined
            }
          />
          <div className="mt-12">
            <OpeningsList openings={openings} />
          </div>
        </Container>
      </Section>

      {/* ── Why here / why not ───────────────────────────────────────────── */}
      <Section tone="light">
        <Container width="wide">
          <SectionHeading label="Straight version" title={whyHere.title} lede={whyHere.lede} />

          <div className="relative mt-14 grid gap-10 lg:grid-cols-2 lg:gap-0">
            <span
              aria-hidden
              className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 lg:block"
              style={{
                backgroundImage: "linear-gradient(to bottom, transparent, rgba(46,109,246,0.35), transparent)",
              }}
            />

            <RevealGroup className="lg:pr-14">
              <RevealItem>
                <h3 className="flex items-center gap-3 text-(length:--text-xl) text-navy-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-primary/35 bg-blue-primary/[0.07] text-blue-deep">
                    <IconCheck width={15} height={15} />
                  </span>
                  {whyHere.gains.heading}
                </h3>
              </RevealItem>
              <ul className="mt-7 grid gap-5">
                {whyHere.gains.items.map((item) => (
                  <RevealItem as="li" key={item.slice(0, 40)} className="flex gap-3.5">
                    <IconNodePath width={19} height={19} className="mt-1 shrink-0 text-blue-primary" />
                    <span className="text-[1.0625rem] leading-relaxed text-navy-ink/85">{item}</span>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>

            <RevealGroup className="lg:pl-14">
              <RevealItem>
                <h3 className="flex items-center gap-3 text-(length:--text-xl) text-navy-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-paper-300 bg-paper-100 text-slate-gray">
                    <IconClose width={15} height={15} />
                  </span>
                  {whyHere.costs.heading}
                </h3>
              </RevealItem>
              <ul className="mt-7 grid gap-5">
                {whyHere.costs.items.map((item) => (
                  <RevealItem as="li" key={item.slice(0, 40)} className="flex gap-3.5">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-paper-300" />
                    <span className="text-[1.0625rem] leading-relaxed text-slate-gray">{item}</span>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <TraceDivider tone="light" className="bg-white" />

      {/* ── The standing bar ─────────────────────────────────────────────── */}
      <Section tone="paper" id="what-we-look-for">
        <Container width="wide">
          <SectionHeading
            label="What we look for"
            title="The bar, whether or not something is open."
            lede="None of these are about a language or a platform. Those are learnable on the job; these are not."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-lg border border-paper-300 bg-paper-300 md:grid-cols-2 lg:grid-cols-3">
            {lookFor.map((item) => (
              <RevealItem
                key={item.title}
                className="group bg-white p-7 transition-colors duration-300 hover:bg-paper-50 lg:p-8"
              >
                <span aria-hidden className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-paper-300 transition-colors duration-300 group-hover:bg-blue-primary" />
                  <span className="h-px flex-1 bg-paper-200" />
                </span>
                <h3 className="mt-5 text-(length:--text-lg) leading-snug text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-gray">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Hiring process ───────────────────────────────────────────────── */}
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
        <Container width="wide" className="relative">
          <SectionHeading
            tone="light"
            label="Hiring process"
            title="Four steps, and we pay for the one that costs you an evening."
            lede="No algorithm whiteboards, no unpaid take-homes, and no six-round loop. You will know where you stand within a week of each stage."
          />

          <RevealGroup
            stagger={0.1}
            className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 lg:grid-cols-4"
          >
            {hiringProcess.map((step) => {
              const StepIcon = PROCESS_ICONS[step.icon];
              return (
              <RevealItem key={step.title} className="bg-ink-800 p-7">
                <span className="label-mono text-cyan-bright">{step.when}</span>
                <span className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] text-cyan-bright">
                    <StepIcon width={20} />
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-cyan-bright/40 to-transparent" />
                </span>
                <h3 className="mt-5 text-(length:--text-lg) text-white [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">{step.body}</p>
              </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <Section tone="light" size="sm">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Benefits</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
                A short list, because we would rather not pad it.
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-gray">
                No sabbatical policy we have never tested and no unlimited leave that nobody takes.
                These are the things that exist today.
              </p>
            </Reveal>

            <RevealGroup className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {benefits.map((b) => {
                const BenefitIcon = BENEFIT_ICONS[b.icon];
                return (
                  <RevealItem key={b.title}>
                    <h3 className="flex items-start gap-3 text-(length:--text-lg) text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                      <BenefitIcon width={20} className="mt-0.5 shrink-0 text-blue-primary" />
                      {b.title}
                    </h3>
                    <p className="mt-3 pl-8 text-[0.9375rem] leading-relaxed text-slate-gray">{b.body}</p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* ── Application form ─────────────────────────────────────────────── */}
      <Section tone="paper" id="apply">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <SectionLabel>Apply</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
                {openings.length > 0 ? "Apply for a role." : "Register interest."}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-gray">
                A founder reads every one. You will hear back within a week either way, and a no
                comes with a reason rather than a template.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <ApplicationForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
