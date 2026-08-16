import { Container, Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TraceLink } from "@/components/ui/Button";
import { IconNodePath } from "@/components/icons";

/**
 * Proof, for a company that does not yet have outcome data.
 *
 * A new firm cannot honestly show retention rates or multi-year savings, so
 * this band shows the things it CAN be held to on day one: contractual
 * commitments, and the fact that the first deliverable is portable. Replace
 * with real outcome figures once there are audited ones — and only then.
 */

const COMMITMENTS = [
  {
    value: "Yours",
    label: "The assessment document, whether or not you hire us for the build",
    detail: "No dependency created by withholding what we found.",
  },
  {
    value: "Day 1",
    label: "Infrastructure code and runbooks land in your repository",
    detail: "No CloudMind-hosted state, no proprietary wrapper.",
  },
  {
    value: "Fixed",
    label: "Assessment fee, independent of what we find",
    detail: "We do not get paid more for finding more problems.",
  },
  {
    value: "Named",
    label: "The engineer who wrote the plan takes the escalation",
    detail: "There is no second tier here to hand you to.",
  },
];

export function ProofBand() {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div aria-hidden className="circuit-grid absolute inset-0 opacity-30" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[26rem] w-[52rem] -translate-x-1/2 rounded-full opacity-[0.10] blur-[140px]"
        style={{ backgroundImage: "radial-gradient(circle, #38BDF8 0%, transparent 70%)" }}
      />

      <Container width="wide" className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <span className="label-mono text-cyan-bright">Where we stand</span>

            <h2 className="mt-6 text-(length:--text-3xl) text-white">
              We are new, so we will not show you{" "}
              <span className="brand-gradient-text">numbers we have not earned</span>.
            </h2>

            <p className="mt-6 max-w-xl text-(length:--text-lg) leading-relaxed text-white/65">
              Most firms our age would put a retention rate and a cost-saving percentage on this
              page. We have been in the room when those get made up, and you cannot check them
              anyway.
            </p>

            <p className="mt-5 max-w-xl text-(length:--text-lg) leading-relaxed text-white/65">
              What we can offer instead is a set of commitments written into the engagement, each
              of which you could hold us to in the first fortnight — and the founders&rsquo; prior
              work, attributed to the employers where it happened.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              <TraceLink href="/about" tone="light">
                Who we are, plainly
              </TraceLink>
              <TraceLink href="/blog" tone="light">
                Read how we think
              </TraceLink>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 sm:grid-cols-2">
            {COMMITMENTS.map((c) => (
              <RevealItem key={c.value} className="bg-ink-800 p-6 lg:p-7">
                <p className="flex items-baseline gap-2.5">
                  <IconNodePath width={18} height={18} className="shrink-0 translate-y-0.5 text-cyan-bright" />
                  <span className="text-(length:--text-2xl) leading-none text-white [font-family:var(--font-display)] [letter-spacing:-0.035em]">
                    {c.value}
                  </span>
                </p>
                <p className="mt-4 text-[0.9375rem] leading-snug text-white/70">{c.label}</p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-white/40">{c.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
