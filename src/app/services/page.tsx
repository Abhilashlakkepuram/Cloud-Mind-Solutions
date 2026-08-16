import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading, SectionLabel } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { serviceIcons, IconArrowRight, IconNodePath } from "@/components/icons";
import { services, siteUrl } from "@/lib/site";
import { serviceDetails } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five practices — AI consulting, cloud and infrastructure, cybersecurity, software consulting, and managed IT — sharing one operating model, one set of engineers, and one escalation path.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — CloudMind Solutions",
    description:
      "AI, cloud, security, software, and managed IT. One operating model, one escalation path.",
    url: `${siteUrl}/services`,
  },
};

/** What every practice shares. This is the reason for the five-in-one structure. */
const SHARED = [
  {
    title: "A fixed-scope assessment first",
    body: "Every practice opens the same way: a short, fixed-fee engagement that produces a written account of what you run and a costed plan. You own the document whether or not you continue.",
  },
  {
    title: "The same engineers through delivery",
    body: "The people who write the assessment are the people who do the build and the people who take the escalation. There is no handover to a delivery team that has never read the report.",
  },
  {
    title: "Artifacts in your repository",
    body: "Infrastructure code, runbooks, decision records, and test suites live in your version control from the first commit. Leaving us should be a decision, not an extraction.",
  },
  {
    title: "Increments you can stop at",
    body: "Work lands in slices that each end with something running. If budget freezes or priorities move, you stop at a boundary rather than mid-cutover.",
  },
];

/** Honest routing help — a decision aid rather than a sales funnel. */
const ROUTING = [
  { symptom: "“We don't know what we're running any more.”", go: "cloud-infrastructure" as const },
  { symptom: "“A client or insurer is asking for evidence we can't produce.”", go: "cybersecurity" as const },
  { symptom: "“One person understands the system that runs the business.”", go: "software-consulting" as const },
  { symptom: "“Our team spends all day in the ticket queue.”", go: "managed-it" as const },
  { symptom: "“We have an AI pilot that nobody will approve for production.”", go: "ai-consulting" as const },
];

export default function ServicesHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five practices, one operating model."
        lede="These problems rarely arrive alone — one usually turns out to be attached to two others. The practices are separately scoped and separately priced, but they share the same engineers, the same monitoring, and the same conventions, so the seams between them don't leak."
        align="wide"
        specs={[
          { k: "engagements start at", v: "2-week assessment" },
          { k: "delivery", v: "2-week increments" },
          { k: "artifacts", v: "Your repository" },
        ]}
      />

      {/* ── The five practices ───────────────────────────────────────────── */}
      <Section tone="light">
        <Container width="wide">
          <SectionHeading
            label="Practices"
            title="What each practice takes on."
            lede="Read the one that matches the problem in front of you. Each page covers scope, how the engagement runs, a worked example, and the questions clients ask before signing."
          />

          <RevealGroup stagger={0.07} className="mt-14 divide-y divide-paper-200 border-y border-paper-200">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug];
              const detail = serviceDetails[s.slug];
              return (
                <RevealItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group grid cursor-pointer gap-6 py-9 transition-colors duration-300 hover:bg-paper-50 md:grid-cols-[3.5rem_1fr_auto] md:items-start md:gap-8 md:px-3"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-paper-300 bg-paper-100 text-blue-primary transition-[border-color,background-color] duration-300 group-hover:border-blue-primary/35 group-hover:bg-blue-primary/[0.07]">
                      <Icon width={26} height={26} />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-(length:--text-2xl) font-semibold text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.03em]">
                        {s.name}
                      </span>
                      <span className="mt-3 block max-w-2xl text-[1.0625rem] leading-relaxed text-slate-gray">
                        {s.blurb}
                      </span>
                      <span className="mt-5 block max-w-2xl text-[0.9375rem] leading-relaxed text-navy-ink/70">
                        {detail.premise.title}
                      </span>
                      <span className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                        {s.capabilities.map((c) => (
                          <span
                            key={c}
                            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate-gray"
                          >
                            {c}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="flex items-center gap-2 self-center whitespace-nowrap text-[0.875rem] font-medium text-blue-deep">
                      Read the practice
                      <IconArrowRight
                        width={16}
                        height={16}
                        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      <TraceDivider tone="light" className="bg-white" />

      {/* ── What they share ──────────────────────────────────────────────── */}
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
        <Container width="wide" className="relative">
          <SectionHeading
            tone="light"
            label="Common ground"
            title="The four things that don't change between practices."
            lede="A firm that does five things badly is worse than a firm that does one well. These are the commitments that make the five defensible."
          />

          <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 md:grid-cols-2">
            {SHARED.map((item) => (
              <RevealItem key={item.title} className="bg-ink-800 p-7 lg:p-9">
                <span aria-hidden className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-bright" />
                  <span className="h-px flex-1 bg-gradient-to-r from-cyan-bright/40 to-transparent" />
                </span>
                <h3 className="mt-5 text-(length:--text-xl) text-white">{item.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Routing aid ──────────────────────────────────────────────────── */}
      <Section tone="paper">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Where to start</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
                Start from the sentence that sounds most like your week.
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-gray">
                Nobody arrives asking for a landing zone. They arrive because something is
                costing them time, money, or sleep. These five are what the practices were built
                around.
              </p>
            </Reveal>

            <RevealGroup className="divide-y divide-paper-300 border-y border-paper-300">
              {ROUTING.map((r) => {
                const target = services.find((s) => s.slug === r.go)!;
                return (
                  <RevealItem key={r.go}>
                    <Link
                      href={`/services/${r.go}`}
                      className="group flex flex-col gap-3 py-6 transition-colors duration-300 hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-3"
                    >
                      <span className="flex items-start gap-3.5 text-(length:--text-lg) leading-snug text-navy-ink">
                        <IconNodePath width={19} height={19} className="mt-1 shrink-0 text-blue-primary" />
                        {r.symptom}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 pl-8 text-[0.875rem] font-medium text-blue-deep sm:pl-0">
                        {target.navLabel}
                        <IconArrowRight
                          width={15}
                          height={15}
                          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Not sure which practice you need? Neither are most people."
        lede="The assessment is deliberately practice-agnostic. We look at what you run, tell you where the risk and the cost actually sit, and you decide what to do about it."
        secondary={{ href: "/industries", label: "How we work by sector" }}
      />
    </>
  );
}
