import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, SectionHeading, SectionLabel } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/FaqList";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { TraceLink } from "@/components/ui/Button";
import {
  serviceIcons,
  IconNodePath,
  IconArrowRight,
  IconQuote,
  IconSearchCheck,
  IconClipboardList,
  IconWorkflow,
  IconRepeat,
} from "@/components/icons";

/** Stage index → glyph. The four process steps run discover → plan → build → run. */
const PROCESS_STEP_ICONS = [IconSearchCheck, IconClipboardList, IconWorkflow, IconRepeat];
import { services, serviceBySlug, siteUrl, type ServiceKey } from "@/lib/site";
import { serviceDetails } from "@/lib/service-content";

/** Each slug is prerendered to its own static route at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const summary = serviceBySlug(slug);
  const detail = serviceDetails[slug as ServiceKey];
  if (!summary || !detail) return {};

  return {
    title: summary.name,
    description: detail.heroLede.slice(0, 200),
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${summary.name} — CloudMind Solutions`,
      description: detail.heroLede.slice(0, 200),
      url: `${siteUrl}/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const summary = serviceBySlug(slug);
  const detail = serviceDetails[slug as ServiceKey];
  if (!summary || !detail) notFound();

  const Icon = serviceIcons[detail.slug];
  const pairing = serviceBySlug(detail.pairsWith.slug)!;
  const PairIcon = serviceIcons[detail.pairsWith.slug];
  const others = services.filter((s) => s.slug !== detail.slug);

  /** FAQ markup so the questions can surface as rich results. */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: summary.name,
    serviceType: summary.name,
    provider: { "@type": "Organization", name: "CloudMind Solutions Inc." },
    url: `${siteUrl}/services/${slug}`,
    description: detail.heroLede,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageHero
        eyebrow={detail.eyebrow}
        title={detail.heroTitle}
        lede={detail.heroLede}
        specs={detail.specs}
        align="wide"
      >
        <nav aria-label="Breadcrumb" className="sr-only">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li aria-current="page">{summary.name}</li>
          </ol>
        </nav>
      </PageHero>

      {/* ── Premise: the honest framing, before any selling ───────────────── */}
      <Section tone="light" size="sm">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-paper-300 bg-paper-100 text-blue-primary">
                <Icon width={26} height={26} />
              </span>
              <h2 className="mt-7 text-(length:--text-2xl) text-navy-ink">{detail.premise.title}</h2>
            </Reveal>
            <Reveal delay={0.08} className="max-w-2xl">
              {detail.premise.body.map((p) => (
                <p key={p.slice(0, 40)} className="mb-5 text-(length:--text-lg) leading-relaxed text-slate-gray last:mb-0">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      <TraceDivider tone="light" className="bg-white" />

      {/* ── What's included ──────────────────────────────────────────────── */}
      <Section tone="paper">
        <Container width="wide">
          <SectionHeading label="Scope" title={detail.included.title} lede={detail.included.lede} />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-lg border border-paper-300 bg-paper-300 md:grid-cols-2">
            {detail.included.items.map((item) => (
              <RevealItem key={item.name} className="group bg-white p-7 transition-colors duration-300 hover:bg-paper-50 lg:p-8">
                <h3 className="flex items-start gap-3 text-(length:--text-xl) text-navy-ink">
                  <IconNodePath
                    width={20}
                    height={20}
                    className="mt-1 shrink-0 text-blue-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                  />
                  {item.name}
                </h3>
                <p className="mt-4 pl-8 text-[1.0625rem] leading-relaxed text-slate-gray">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
        <Container width="wide" className="relative">
          <SectionHeading tone="light" label="Process" title={detail.process.title} lede={detail.process.lede} />

          <RevealGroup stagger={0.1} className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 lg:grid-cols-4">
            {detail.process.steps.map((step, i) => (
              <RevealItem key={step.title} className="relative flex flex-col bg-ink-800 p-7">
                {/* Conductor running between steps on desktop */}
                {i < detail.process.steps.length - 1 && (
                  <span aria-hidden className="absolute right-0 top-[3.4rem] hidden translate-x-1/2 text-cyan-bright/50 lg:block">
                    <IconArrowRight width={16} height={16} />
                  </span>
                )}
                <span className="label-mono text-cyan-bright">{step.when}</span>
                <span className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/[0.04] text-cyan-bright">
                    {(() => {
                      const StepIcon = PROCESS_STEP_ICONS[i % PROCESS_STEP_ICONS.length];
                      return <StepIcon width={20} />;
                    })()}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-cyan-bright/40 to-transparent" />
                </span>
                <h3 className="mt-5 text-(length:--text-xl) text-white">{step.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Case study ───────────────────────────────────────────────────── */}
      <Section tone="light">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <Reveal>
              <SectionLabel>Worked example · {detail.caseStudy.sector}</SectionLabel>
              <h2 className="mt-6 max-w-2xl text-(length:--text-3xl) text-navy-ink">
                {detail.caseStudy.title}
              </h2>

              {/* Provenance stated before the content, not in a footnote after
                  it. CloudMind is new; this is prior work, and reading it as a
                  client reference would be a misunderstanding we caused. */}
              <p className="mt-6 max-w-2xl rounded-md border border-paper-300 bg-paper-100 px-4 py-3 text-[0.875rem] leading-relaxed text-slate-gray">
                Drawn from engagements the founders ran at previous employers, before CloudMind
                existed. It is not a CloudMind client reference, and we will not present it as one.
              </p>

              <p className="mt-6 max-w-2xl text-(length:--text-lg) leading-relaxed text-slate-gray">
                {detail.caseStudy.context}
              </p>

              <h3 className="label-mono mt-10 text-slate-gray">What we did</h3>
              <ul className="mt-5 grid max-w-2xl gap-4">
                {detail.caseStudy.work.map((w) => (
                  <li key={w.slice(0, 40)} className="flex gap-3.5 text-[1.0625rem] leading-relaxed text-navy-ink/85">
                    <IconNodePath width={19} height={19} className="mt-1 shrink-0 text-blue-primary" />
                    {w}
                  </li>
                ))}
              </ul>

              {detail.caseStudy.quote && (
                <figure className="mt-10 max-w-2xl border-l-2 border-blue-primary pl-6">
                  <blockquote className="text-(length:--text-xl) leading-relaxed text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                    {detail.caseStudy.quote}
                  </blockquote>
                  {/* Attributed to us, not dressed up as a client testimonial. */}
                  <figcaption className="label-mono mt-4 flex items-center gap-2 text-slate-gray">
                    <IconQuote width={14} />
                    What we took away from it
                  </figcaption>
                </figure>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="grid gap-px overflow-hidden rounded-lg border border-paper-300 bg-paper-300">
                {detail.caseStudy.results.map((r) => (
                  <div key={r.label} className="bg-white p-6">
                    <dt className="sr-only">{r.label}</dt>
                    <dd>
                      <span className="block text-(length:--text-3xl) leading-none text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.04em]">
                        {r.value}
                      </span>
                      <span className="mt-3 block text-[0.875rem] leading-snug text-slate-gray">{r.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-mono text-[0.625rem] leading-relaxed text-slate-gray/70">
                [PLACEHOLDER STAT] Figures are illustrative. Replace with real numbers from the
                founder&rsquo;s prior engagement, cleared by that employer and with a contactable
                reference — or remove the section until one exists.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <TraceDivider tone="light" flip className="bg-white" />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section tone="paper">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                label="Questions"
                title="What people ask before they sign."
                lede="If your question is not here, ask it directly — we would rather answer it now than in month three."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <FaqList items={detail.faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Pairs with + other practices ─────────────────────────────────── */}
      <Section tone="light" size="sm">
        <Container width="wide">
          <Reveal>
            <Link
              href={`/services/${pairing.slug}`}
              className="group flex flex-col gap-5 rounded-lg border border-paper-300 bg-paper-100 p-7 transition-[border-color,background-color] duration-300 hover:border-blue-primary/40 hover:bg-white sm:flex-row sm:items-center sm:gap-7 lg:p-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-paper-300 bg-white text-blue-primary transition-colors duration-300 group-hover:border-blue-primary/35">
                <PairIcon width={22} height={22} />
              </span>
              <span className="flex-1">
                <span className="label-mono text-slate-gray">Most often paired with</span>
                <span className="mt-2 block text-(length:--text-xl) text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                  {pairing.name}
                </span>
                <span className="mt-2 block max-w-xl text-[0.9375rem] leading-relaxed text-slate-gray">
                  {detail.pairsWith.reason}
                </span>
              </span>
              <IconArrowRight
                width={20}
                height={20}
                className="hidden shrink-0 text-blue-deep transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 sm:block"
              />
            </Link>
          </Reveal>

          <div className="mt-14">
            <h2 className="label-mono text-slate-gray">Other practices</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((s) => (
                <li key={s.slug}>
                  <TraceLink href={`/services/${s.slug}`}>{s.navLabel}</TraceLink>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaSection
        tone="paper"
        title={`Start with a ${detail.eyebrow.toLowerCase()} assessment.`}
        lede="Two weeks, fixed fee, no commitment to a build. You end up with a written account of what you run today and a costed plan — yours to keep even if you take it elsewhere."
        secondary={{ href: "/services", label: "Compare all practices" }}
      />
    </>
  );
}
