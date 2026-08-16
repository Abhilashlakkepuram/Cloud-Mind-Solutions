import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing CTA for inner pages. The one centred composition per page — see
 * DESIGN-SYSTEM.md §3: centring is a stop, not a default.
 */
export function CtaSection({
  title,
  lede,
  primary = { href: "/contact#consultation", label: "Book a Consultation" },
  secondary,
  tone = "light",
}: {
  title: string;
  lede: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  tone?: "light" | "paper";
}) {
  return (
    <section
      className={[
        "relative overflow-hidden py-(--spacing-section)",
        tone === "paper" ? "bg-paper-100" : "bg-white",
      ].join(" ")}
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <svg aria-hidden viewBox="0 0 2 64" className="mx-auto mb-10 h-16 w-0.5 overflow-visible">
            <line x1="1" y1="0" x2="1" y2="52" stroke="#2E6DF6" strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="1" cy="58" r="3.5" fill="#2E6DF6" />
            <circle cx="1" cy="58" r="7" fill="none" stroke="#2E6DF6" strokeOpacity="0.3" />
          </svg>

          <h2 className="text-(length:--text-3xl) text-navy-ink">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-(length:--text-lg) leading-relaxed text-slate-gray">
            {lede}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primary.href} variant="gradient" size="lg" withArrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline" size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
