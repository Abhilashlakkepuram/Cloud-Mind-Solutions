import type { ReactNode } from "react";
import { Container, SectionLabel } from "@/components/ui/Section";

/**
 * Shared hero for every inner page.
 *
 * The site header is fixed and transparent until scroll, so all page heroes are
 * dark by rule (see DESIGN-SYSTEM.md §1). Copy is left-aligned in a 7–8 column
 * span; the right column stays empty or carries the spec strip, which keeps the
 * asymmetry consistent with the home page.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  specs,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Mono fact strip — three hard facts, not marketing claims. */
  specs?: { k: string; v: string }[];
  children?: ReactNode;
  align?: "left" | "wide";
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pb-(--spacing-section-sm) pt-32 lg:pt-40">
      <div aria-hidden className="circuit-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-[10%] -top-[25%] h-[38rem] w-[38rem] rounded-full opacity-[0.14] blur-[130px]"
        style={{ backgroundImage: "radial-gradient(circle, #38BDF8 0%, transparent 68%)" }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-900" />

      <Container width="wide" className="relative">
        <SectionLabel tone="light">{eyebrow}</SectionLabel>

        <h1
          className={[
            "mt-7 text-(length:--text-4xl) text-white",
            align === "wide" ? "max-w-5xl" : "max-w-3xl",
          ].join(" ")}
        >
          {title}
        </h1>

        {lede && (
          <p className="mt-7 max-w-2xl text-(length:--text-lg) leading-relaxed text-white/65">{lede}</p>
        )}

        {children}

        {specs && (
          <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 sm:grid-cols-3 lg:max-w-3xl">
            {specs.map((s) => (
              <div key={s.k} className="bg-ink-850 px-5 py-4">
                <dt className="label-mono text-white/40">{s.k}</dt>
                <dd className="mt-2 font-mono text-[0.875rem] text-cyan-bright">{s.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
