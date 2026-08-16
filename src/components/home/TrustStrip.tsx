import { Container } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Platform strip.
 *
 * This slot used to hold client logos. A company with no clients yet cannot
 * show a client roster, and a row of grey placeholder rectangles labelled
 * "client" implies one — so it shows the platforms we build on instead, which
 * is true on day one.
 *
 * When there are real, cleared client logos, swap this for the logo strip and
 * move the platform list somewhere it still earns its place.
 */
const PLATFORMS = [
  { name: "AWS", detail: "Landing zones · Control Tower" },
  { name: "Azure", detail: "Entra ID · Hybrid identity" },
  { name: "Google Cloud", detail: "BigQuery · GKE" },
  { name: "Terraform", detail: "Modules you own" },
  { name: "Microsoft 365", detail: "Endpoint · Purview" },
  { name: "Kubernetes", detail: "Where it's warranted" },
];

export function TrustStrip() {
  return (
    <section aria-label="Platforms we work across" className="border-b border-paper-200 bg-white py-14">
      <Container width="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
          <p className="max-w-[15rem] shrink-0 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-slate-gray">
            Platforms we build on and operate day to day
          </p>

          <RevealGroup
            stagger={0.06}
            className="grid w-full grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6"
          >
            {PLATFORMS.map((p) => (
              <RevealItem key={p.name} className="group">
                <span aria-hidden className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-paper-300 transition-colors duration-300 group-hover:bg-blue-primary" />
                  <span className="h-px flex-1 bg-paper-200" />
                </span>
                <p className="mt-3 text-[0.9375rem] font-medium text-navy-ink [font-family:var(--font-display)] [letter-spacing:-0.015em]">
                  {p.name}
                </p>
                <p className="mt-1 font-mono text-[0.625rem] leading-relaxed text-slate-gray">
                  {p.detail}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <p className="mt-9 max-w-3xl text-[0.8125rem] leading-relaxed text-slate-gray/80">
          Platform names are the trademarks of their owners. Listing them means we work with them —
          not that they endorse us, and not that we hold a partner status we have not earned.
        </p>
      </Container>
    </section>
  );
}
