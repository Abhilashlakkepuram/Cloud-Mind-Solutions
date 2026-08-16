import type { Metadata } from "next";
import { Container, Section, SectionLabel } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/layout/CtaSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TraceDivider } from "@/components/ui/TraceDivider";
import { IconNodePath, IconHelp, industryIcons } from "@/components/icons";
import { industries } from "@/lib/industries";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Healthcare, finance, legal, retail, and manufacturing. The compliance and technical constraint that shapes each sector — and what we do differently because of it.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries We Serve — CloudMind Solutions",
    description:
      "Five sectors, chosen deliberately. HIPAA, PCI DSS, privilege, peak load, and the OT/IT boundary.",
    url: `${siteUrl}/industries`,
  },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Five sectors. Chosen because we have shipped in them, not because the list looks better long."
        lede="A new firm claiming depth across twelve industries is claiming depth in none. These are the five where the founders have production experience and where we can name the constraint before you explain it to us."
        align="wide"
        specs={[
          { k: "sectors", v: "5, deliberately" },
          { k: "first question", v: "Never technical" },
          { k: "outside these", v: "We'll say so" },
        ]}
      />

      {/* ── Index ────────────────────────────────────────────────────────── */}
      <Section tone="light" size="sm">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <SectionLabel>The pattern</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
                In every sector, the binding constraint is a rule, not a technology.
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-gray">
                The architecture falls out of the constraint once you have named it correctly.
                Getting that first step wrong is what produces systems that are technically sound
                and legally unusable.
              </p>
            </Reveal>

            <RevealGroup className="divide-y divide-paper-200 border-y border-paper-200">
              {industries.map((ind) => {
                const SectorIcon = industryIcons[ind.slug as keyof typeof industryIcons];
                return (
                <RevealItem key={ind.slug}>
                  <a
                    href={`#${ind.slug}`}
                    className="group grid cursor-pointer items-center gap-2 py-6 transition-colors duration-300 hover:bg-paper-50 md:grid-cols-[12rem_1fr_auto] md:gap-8 md:px-3"
                  >
                    <span className="flex items-center gap-3">
                      <SectorIcon
                        width={19}
                        className="shrink-0 text-slate-gray transition-colors duration-300 group-hover:text-blue-primary"
                      />
                      <span className="text-(length:--text-lg) font-semibold text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                        {ind.name}
                      </span>
                    </span>
                    <span className="text-[1.0625rem] leading-relaxed text-slate-gray">
                      {ind.constraint}
                    </span>
                    <span className="label-mono whitespace-nowrap text-slate-gray transition-colors duration-300 group-hover:text-blue-deep">
                      {ind.constraintLabel}
                    </span>
                  </a>
                </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <TraceDivider tone="light" className="bg-white" />

      {/* ── Per-sector detail ────────────────────────────────────────────── */}
      {industries.map((ind, i) => {
        const dark = i % 2 === 1;
        const SectorIcon = industryIcons[ind.slug as keyof typeof industryIcons];
        return (
          <Section
            key={ind.slug}
            id={ind.slug}
            tone={dark ? "dark" : "paper"}
            className={dark ? "overflow-hidden" : undefined}
          >
            {dark && <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />}

            <Container width="wide" className="relative">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
                {/* Left: identity + the constraint */}
                <Reveal>
                  <SectionLabel tone={dark ? "light" : "dark"}>
                    {String(i + 1).padStart(2, "0")} · Sector
                  </SectionLabel>

                  <span
                    className={[
                      "mt-6 flex h-14 w-14 items-center justify-center rounded-lg border",
                      dark
                        ? "border-white/12 bg-white/[0.04] text-cyan-bright"
                        : "border-paper-300 bg-white text-blue-primary",
                    ].join(" ")}
                  >
                    <SectorIcon width={26} />
                  </span>

                  <h2
                    className={[
                      "mt-6 text-(length:--text-3xl)",
                      dark ? "text-white" : "text-navy-ink",
                    ].join(" ")}
                  >
                    {ind.name}
                  </h2>

                  <p
                    className={[
                      "mt-6 text-(length:--text-xl) leading-snug [font-family:var(--font-display)] [letter-spacing:-0.02em]",
                      dark ? "text-cyan-bright" : "text-blue-deep",
                    ].join(" ")}
                  >
                    {ind.constraint}
                  </p>

                  <p
                    className={[
                      "mt-6 text-[1.0625rem] leading-relaxed",
                      dark ? "text-white/60" : "text-slate-gray",
                    ].join(" ")}
                  >
                    {ind.summary}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {ind.regulations.map((r) => (
                      <li
                        key={r}
                        className={[
                          "rounded-sm border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide",
                          dark
                            ? "border-white/15 bg-white/[0.04] text-white/60"
                            : "border-paper-300 bg-white text-slate-gray",
                        ].join(" ")}
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Right: first question, systems, what we do */}
                <Reveal delay={0.08}>
                  <div
                    className={[
                      "rounded-lg border p-6 lg:p-7",
                      dark
                        ? "border-cyan-bright/25 bg-cyan-bright/[0.06]"
                        : "border-blue-primary/25 bg-blue-primary/[0.04]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "label-mono flex items-center gap-2",
                        dark ? "text-cyan-bright" : "text-blue-deep",
                      ].join(" ")}
                    >
                      <IconHelp width={14} />
                      The first thing we ask
                    </span>
                    <p
                      className={[
                        "mt-3 text-(length:--text-lg) leading-snug",
                        dark ? "text-white" : "text-navy-ink",
                      ].join(" ")}
                    >
                      {ind.firstQuestion}
                    </p>
                  </div>

                  <h3 className={["label-mono mt-10", dark ? "text-white/40" : "text-slate-gray"].join(" ")}>
                    Systems we expect to find
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {ind.systems.map((s) => (
                      <li
                        key={s}
                        className={[
                          "font-mono text-[0.75rem]",
                          dark ? "text-white/55" : "text-navy-ink/70",
                        ].join(" ")}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <h3 className={["label-mono mt-10", dark ? "text-white/40" : "text-slate-gray"].join(" ")}>
                    What we do differently here
                  </h3>
                  <ul
                    className={[
                      "mt-5 grid gap-4 border-t pt-6",
                      dark ? "border-white/10" : "border-paper-300",
                    ].join(" ")}
                  >
                    {ind.points.map((p) => (
                      <li key={p.slice(0, 40)} className="flex gap-3.5">
                        <IconNodePath
                          width={19}
                          height={19}
                          className={["mt-1 shrink-0", dark ? "text-cyan-bright" : "text-blue-primary"].join(" ")}
                        />
                        <span
                          className={[
                            "text-[1.0625rem] leading-relaxed",
                            dark ? "text-white/70" : "text-navy-ink/85",
                          ].join(" ")}
                        >
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* ── Outside these five ───────────────────────────────────────────── */}
      <Section tone="light" size="sm">
        <Container width="wide">
          <Reveal className="mx-auto max-w-3xl rounded-lg border border-paper-300 bg-paper-100 p-8 lg:p-10">
            <SectionLabel>If you are not on this list</SectionLabel>
            <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
              Most of what we do is sector-agnostic. Say which one you are in and we will tell you
              honestly whether it matters.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-gray">
              Cloud migration, modernization, and day-two operations look broadly the same in
              professional services, education, or non-profits. Where a specific regulator or a
              specific class of system is central — clinical trials, defense contracting, gaming —
              domain experience matters a great deal, and we will tell you if we do not have it
              rather than learning on your budget.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        tone="paper"
        title="Bring the constraint. We will bring the architecture."
        lede="The assessment starts with your regulatory and operational limits, not with a technology recommendation. It is the only order that produces a plan you can actually deploy."
        secondary={{ href: "/services", label: "See the five practices" }}
      />
    </>
  );
}
