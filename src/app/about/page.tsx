import type { Metadata } from "next";
import { Container, Section, SectionHeading, SectionLabel } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck, IconClose, IconNodePath, IconPin } from "@/components/icons";
import { addressLine, company, siteUrl } from "@/lib/site";
import {
  aboutSpecs,
  beingNew,
  founded,
  principles,
  priorWork,
  story,
  team,
} from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "CloudMind Solutions is a new AI and IT consultancy in St. Petersburg, Florida, built so the engineers who write the assessment are the ones who take the 3am page.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — CloudMind Solutions",
    description:
      "A small, senior-only AI and IT consultancy in St. Petersburg, Florida. Founded 2026.",
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A new firm, built around the one thing mid-market companies cannot buy."
        lede="Continuity. The same senior engineers from the first interview through to the escalation call — because at our size there is nobody else to send."
        specs={aboutSpecs}
        align="wide"
      />

      {/* ── Founding story ───────────────────────────────────────────────── */}
      <Section tone="light">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Why we started</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">{story.title}</h2>
              <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-gray">
                Founded {founded.year} · {founded.city}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="max-w-2xl">
              {story.body.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mb-6 text-(length:--text-lg) leading-relaxed text-slate-gray last:mb-0"
                >
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      <TraceDivider tone="light" className="bg-white" />

      {/* ── The honest section ───────────────────────────────────────────────
          Two ledgers separated by a conductor. The right-hand column is the
          point of the page: a new firm that hides its newness gets found out
          at the first reference check. */}
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
        <Container width="wide" className="relative">
          <SectionHeading tone="light" label="Plainly" title={beingNew.title} lede={beingNew.lede} />

          <div className="relative mt-16 grid gap-10 lg:grid-cols-2 lg:gap-0">
            {/* Conductor dividing the two ledgers */}
            <span
              aria-hidden
              className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 lg:block"
              style={{ backgroundImage: "linear-gradient(to bottom, transparent, rgba(56,189,248,0.4), transparent)" }}
            />

            <RevealGroup className="lg:pr-14">
              <RevealItem>
                <h3 className="flex items-center gap-3 text-(length:--text-xl) text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-bright/40 bg-cyan-bright/10 text-cyan-bright">
                    <IconCheck width={15} height={15} />
                  </span>
                  {beingNew.gains.heading}
                </h3>
              </RevealItem>
              <ul className="mt-7 grid gap-5">
                {beingNew.gains.items.map((item) => (
                  <RevealItem as="li" key={item.slice(0, 40)} className="flex gap-3.5">
                    <IconNodePath width={19} height={19} className="mt-1 shrink-0 text-cyan-bright" />
                    <span className="text-[1.0625rem] leading-relaxed text-white/70">{item}</span>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>

            <RevealGroup className="lg:pl-14">
              <RevealItem>
                <h3 className="flex items-center gap-3 text-(length:--text-xl) text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/20 bg-white/[0.06] text-white/60">
                    <IconClose width={15} height={15} />
                  </span>
                  {beingNew.costs.heading}
                </h3>
              </RevealItem>
              <ul className="mt-7 grid gap-5">
                {beingNew.costs.items.map((item) => (
                  <RevealItem as="li" key={item.slice(0, 40)} className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30"
                    />
                    <span className="text-[1.0625rem] leading-relaxed text-white/50">{item}</span>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* ── Operating principles ─────────────────────────────────────────── */}
      <Section tone="paper">
        <Container width="wide">
          <SectionHeading
            label="How we operate"
            title="Six commitments you can check on day one."
            lede="Not values. Values are unfalsifiable. These are specific enough that you would notice immediately if we broke one."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-lg border border-paper-300 bg-paper-300 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <RevealItem key={p.title} className="group bg-white p-7 transition-colors duration-300 hover:bg-paper-50 lg:p-8">
                <span className="label-mono text-slate-gray/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-paper-300 transition-colors duration-300 group-hover:bg-blue-primary" />
                  <span className="h-px flex-1 bg-paper-200" />
                </span>
                <h3 className="mt-5 text-(length:--text-lg) leading-snug text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-gray">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <Section tone="light">
        <Container width="wide">
          <SectionHeading
            label="The team"
            title="Everyone you will work with is on this page."
            lede="There is no second tier. If we grow past the point where that sentence stays true, we will have broken the thing that makes us worth hiring."
          />

          <RevealGroup stagger={0.08} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <RevealItem key={m.role}>
                <article className="group h-full">
                  <ImagePlaceholder
                    label={m.photo.label}
                    width={m.photo.width}
                    height={m.photo.height}
                    context="About · team grid"
                    className="rounded-lg"
                  />
                  <h3 className="mt-5 text-(length:--text-lg) text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                    {m.name}
                  </h3>
                  <p className="label-mono mt-2 text-blue-deep">{m.role}</p>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-navy-ink/75">{m.focus}</p>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-slate-gray">{m.background}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Prior work — attributed, never claimed as CloudMind's ────────── */}
      <Section tone="paper" size="sm">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Track record</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">{priorWork.title}</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-gray">{priorWork.lede}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="grid gap-4 border-t border-paper-300 pt-8">
                {priorWork.items.map((item) => (
                  <li key={item.slice(0, 40)} className="flex gap-3.5">
                    <IconNodePath width={19} height={19} className="mt-1 shrink-0 text-blue-primary" />
                    <span className="text-[1.0625rem] leading-relaxed text-navy-ink/85">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[0.625rem] leading-relaxed text-slate-gray/70">
                {priorWork.note}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Office ───────────────────────────────────────────────────────── */}
      <Section tone="light" size="sm">
        <Container width="wide">
          <Reveal className="grid items-center gap-10 rounded-lg border border-paper-300 bg-paper-100 p-8 lg:grid-cols-[1fr_22rem] lg:gap-16 lg:p-10">
            <div>
              <SectionLabel>Where we are</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
                One office, in St. Petersburg.
              </h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-slate-gray">
                We work on-site across the Tampa Bay area and remotely everywhere else. For
                assessments we would rather spend the first week in the room with your team —
                the undocumented systems tend to surface in conversation, not in a questionnaire.
              </p>

              <address className="mt-7 flex items-start gap-3 not-italic">
                <IconPin width={18} height={18} className="mt-1 shrink-0 text-blue-primary" />
                <span className="text-[1.0625rem] leading-relaxed text-navy-ink">
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.state} {company.address.zip}
                </span>
              </address>

              <ButtonLink href="/contact" variant="outline" size="md" withArrow className="mt-8">
                Get in touch
              </ButtonLink>
            </div>

            <ImagePlaceholder
              label="Office exterior or team working, St. Petersburg"
              width={640}
              height={480}
              context="About · office callout"
              className="rounded-lg"
            />
          </Reveal>
          <span className="sr-only">{addressLine}</span>
        </Container>
      </Section>

      <CtaSection
        tone="paper"
        title="Early clients get the version of us that is trying hardest."
        lede="We are taking on a small first cohort. If the fit is wrong we will say so on the first call — that is cheaper for both of us than finding out in month three."
        secondary={{ href: "/services", label: "See what we do" }}
      />
    </>
  );
}
