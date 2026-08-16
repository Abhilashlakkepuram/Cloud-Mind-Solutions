import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { company } from "@/lib/site";

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

/**
 * Legal template.
 *
 * Deliberately plain: no scroll reveals, no motion, no decorative devices.
 * These pages exist to be read and cited, so the only design decisions that
 * matter are measure, line-height, and a heading hierarchy you can navigate.
 */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  /** ISO date. Rendered as the effective date. */
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  const updatedLabel = new Date(`${updated}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-32 lg:pt-40">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-50" />
        <Container width="narrow" className="relative">
          <span className="label-mono text-cyan-bright">Legal</span>
          <h1 className="mt-6 text-(length:--text-3xl) text-white">{title}</h1>
          <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/45">
            Effective {updatedLabel}
          </p>
        </Container>
      </section>

      <div className="bg-white py-(--spacing-section-sm)">
        <Container width="narrow">
          <div className="rounded-lg border border-status-error/25 bg-status-error/[0.04] p-5">
            <p className="text-[0.875rem] leading-relaxed text-navy-ink">
              <strong className="font-medium">[PLACEHOLDER — not legal advice.]</strong> This
              document was drafted to describe how this website actually behaves, and it has not
              been reviewed by a lawyer. Have counsel review and adapt it before launch, including
              the state-specific and sector-specific obligations that apply to {company.legalName}.
            </p>
          </div>

          <div className="mt-12 text-[1.0625rem] leading-[1.75] text-navy-ink/85">{intro}</div>

          {/* Contents — legal pages get navigated, not read start to finish. */}
          <nav aria-label="Contents" className="mt-12 rounded-lg border border-paper-300 bg-paper-100 p-6">
            <h2 className="label-mono text-slate-gray">Contents</h2>
            <ol className="mt-4 grid gap-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group inline-flex gap-3 text-[0.9375rem] text-navy-ink transition-colors duration-200 hover:text-blue-deep"
                  >
                    <span className="font-mono text-[0.75rem] text-slate-gray">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {s.heading}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-28 first:mt-0">
                <h2 className="flex gap-3 text-(length:--text-xl) text-navy-ink">
                  <span className="font-mono text-[0.875rem] text-slate-gray">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                <div className="mt-4 grid gap-4 text-[1.0625rem] leading-[1.75] text-navy-ink/85">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-paper-200 pt-8">
            <h2 className="label-mono text-slate-gray">Contact</h2>
            <address className="mt-4 not-italic text-[1.0625rem] leading-[1.75] text-navy-ink/85">
              {company.legalName}
              <br />
              {company.address.street}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
              <br />
              <a href={`mailto:${company.email}`} className="text-blue-deep hover:underline">
                {company.email}
              </a>
            </address>
          </div>
        </Container>
      </div>
    </>
  );
}
