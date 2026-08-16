import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TraceLink } from "@/components/ui/Button";
import { industryIcons } from "@/components/icons";
import { industries } from "@/lib/industries";

export function IndustriesTeaser() {
  return (
    <Section tone="light">
      <Container width="wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Industries"
            title="The constraint comes first. The architecture follows."
            lede="We don't have a healthcare version of a generic platform. We have a different first question for each sector — and it usually isn't a technical one."
          />
          <Reveal className="shrink-0 lg:pb-2">
            <TraceLink href="/industries">How we work in each sector</TraceLink>
          </Reveal>
        </div>

        {/* A definition list, not a card grid — the constraint is the point,
            so it gets the type hierarchy. */}
        <RevealGroup className="mt-14 divide-y divide-paper-200 border-y border-paper-200">
          {industries.map((ind) => {
            const SectorIcon = industryIcons[ind.slug as keyof typeof industryIcons];
            return (
            <RevealItem key={ind.slug}>
              <Link
                href={`/industries#${ind.slug}`}
                className="group grid cursor-pointer items-center gap-2 py-7 transition-colors duration-300 hover:bg-paper-50 md:grid-cols-[13rem_1fr_auto] md:gap-8 md:px-2"
              >
                <span className="flex items-center gap-3">
                  <SectorIcon
                    width={20}
                    className="shrink-0 text-slate-gray transition-colors duration-300 group-hover:text-blue-primary"
                  />
                  <span className="text-(length:--text-xl) font-semibold text-navy-ink [font-family:var(--font-display)]">
                    {ind.name}
                  </span>
                </span>

                <span className="text-[1.0625rem] leading-relaxed text-slate-gray md:pl-0">
                  {ind.constraint}
                </span>

                <span className="label-mono whitespace-nowrap text-slate-gray transition-colors duration-300 group-hover:text-blue-deep">
                  {ind.constraintLabel}
                </span>
              </Link>
            </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
