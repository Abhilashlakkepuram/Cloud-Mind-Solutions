import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { addressLine } from "@/lib/site";

/**
 * The one centred composition on the site. Everything else is left-aligned and
 * asymmetric, so centring here reads as a deliberate stop rather than a default.
 */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-white py-(--spacing-section)">
      <Container width="default">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          {/* Conductor entering the block from above — the page's signal
              terminating at the call to action. */}
          <svg aria-hidden viewBox="0 0 2 64" className="mx-auto mb-10 h-16 w-0.5 overflow-visible">
            <line x1="1" y1="0" x2="1" y2="52" stroke="#2E6DF6" strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="1" cy="58" r="3.5" fill="#2E6DF6" />
            <circle cx="1" cy="58" r="7" fill="none" stroke="#2E6DF6" strokeOpacity="0.3" />
          </svg>

          <h2 className="text-(length:--text-4xl) text-navy-ink">
            Start with the assessment. Decide about the rest afterwards.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-(length:--text-lg) leading-relaxed text-slate-gray">
            Two weeks, fixed fee, no commitment to a build. You end up with a written inventory of
            what you run and a costed plan — yours to keep even if you take it to someone else.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact#consultation" variant="gradient" size="lg" withArrow>
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Read what each practice covers
            </ButtonLink>
          </div>

          <p className="mt-10 font-mono text-[0.6875rem] tracking-wide text-slate-gray/70">
            {addressLine}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
