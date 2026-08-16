"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * The engagement path.
 *
 * A single conductor runs the length of the section and is scrubbed by scroll
 * position — the fill is scroll-linked, not time-based, so it tracks the
 * reader exactly. Each node powers on as the fill reaches it.
 *
 * Stages are labelled by elapsed time rather than 01/02/03 badges: the number
 * carries no information, the schedule does.
 */

const STAGES = [
  {
    when: "Week 1–2",
    title: "We map what you actually run",
    body:
      "Read-only access, interviews with the people who carry the pager, and a written inventory of systems, contracts, and the three things everyone already knows are broken. You get the document whether or not you hire us for the build.",
    output: "Systems inventory + risk register",
  },
  {
    when: "Week 3",
    title: "A costed plan, sequenced by risk",
    body:
      "Every recommendation carries an estimate, a dependency, and what happens if you defer it. Nothing is bundled — you can approve the security workstream and defer the migration, and the plan still holds together.",
    output: "Costed roadmap + decision log",
  },
  {
    when: "Week 4 onward",
    title: "Build in increments you can stop",
    body:
      "Work lands in two-week slices behind feature flags and reversible migrations. If priorities move or budget freezes, you stop at a slice boundary with something running — not a half-finished cutover.",
    output: "Working increments + runbooks",
  },
  {
    when: "Ongoing",
    title: "We stay on the pager",
    body:
      "Monitoring, escalation, and a named engineer who has seen your stack before. Runbooks stay in your repository, so switching away from us is a decision, not an extraction.",
    output: "24/7 monitoring + named escalation",
  },
];

export function HowWeWork() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scrub the conductor fill against scroll position.
        gsap.fromTo(
          ".conductor-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".conductor-track",
              start: "top 72%",
              end: "bottom 82%",
              scrub: 0.4,
            },
          },
        );

        // Each node powers on when the fill front reaches it.
        gsap.utils.toArray<HTMLElement>(".stage-node").forEach((node) => {
          gsap.to(node, {
            "--node-on": 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Copy blocks arrive just behind their node.
        gsap.utils.toArray<HTMLElement>(".stage-copy").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
        });
      });

      // Reduced motion: show the finished state, skip the choreography.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".conductor-fill", { scaleY: 1 });
        gsap.set(".stage-node", { "--node-on": 1 });
      });
    },
    { scope: root },
  );

  return (
    <Section tone="dark" id="approach" className="overflow-hidden">
      <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
      <Container width="wide" className="relative">
        <div ref={root}>
          <SectionHeading
            tone="light"
            label="How we work"
            title="Four stages. You can leave at the end of any of them."
            lede="Consulting engagements fail at the handover. Ours are built so each stage produces something you keep — a document, a running increment, a runbook — before the next one starts."
          />

          <div className="conductor-track relative mt-16 lg:mt-24">
            {/* Conductor: 1px track + scrubbed gradient fill */}
            <div aria-hidden className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-white/12 lg:left-[9.5rem]">
              <div
                className="conductor-fill absolute inset-0 origin-top"
                style={{ backgroundImage: "linear-gradient(to bottom, #1E4FD6, #38BDF8)" }}
              />
            </div>

            <ol className="grid gap-14 lg:gap-20">
              {STAGES.map((s) => (
                <li key={s.title} className="relative pl-10 lg:grid lg:grid-cols-[8rem_1fr] lg:gap-16 lg:pl-0">
                  {/* When — mono, sits left of the conductor on desktop */}
                  <div className="lg:pt-1 lg:text-right">
                    <span className="label-mono text-cyan-bright">{s.when}</span>
                  </div>

                  {/* Node */}
                  <span
                    aria-hidden
                    className="stage-node absolute left-[0.375rem] top-1.5 lg:left-[9.1875rem]"
                    style={{ ["--node-on" as string]: 0 }}
                  >
                    <span
                      className="block h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: "color-mix(in srgb, #38BDF8 calc(var(--node-on) * 100%), rgba(255,255,255,0.28))",
                        boxShadow: "0 0 0 calc(var(--node-on) * 6px) rgba(56,189,248,0.14)",
                        transform: "scale(calc(1 + var(--node-on) * 0.25))",
                      }}
                    />
                  </span>

                  <div className="stage-copy lg:pl-4">
                    <h3 className="text-(length:--text-2xl) text-white">{s.title}</h3>
                    <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-white/60">{s.body}</p>
                    <p className="mt-5 inline-flex items-center gap-2.5 rounded-md border border-white/12 bg-white/[0.03] px-3.5 py-2">
                      <span className="label-mono text-white/40">You keep</span>
                      <span className="font-mono text-[0.75rem] text-cyan-bright">{s.output}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 pl-10 lg:mt-20 lg:pl-[12rem]">
            <ButtonLink href="/contact#consultation" variant="onDark" size="md" withArrow>
              Start with an assessment
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
