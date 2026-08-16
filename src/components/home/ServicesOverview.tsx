import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TraceLink } from "@/components/ui/Button";
import { serviceIcons, IconArrowUpRight } from "@/components/icons";
import { services } from "@/lib/site";

/**
 * Hover conductor: a trace that routes out of the card corner and draws itself
 * when the card is hovered or focused. pathLength=1 normalises the dash maths
 * so one CSS transition covers any path length.
 */
function CornerTrace() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 60"
      className="pointer-events-none absolute right-0 top-0 h-[60px] w-[120px] text-blue-primary"
    >
      <path
        d="M120 14H86L70 30H36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        className="transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [.group:focus-within_&]:[stroke-dashoffset:0] [.group:hover_&]:[stroke-dashoffset:0]"
      />
      <circle
        cx="36"
        cy="30"
        r="2.5"
        fill="currentColor"
        className="origin-center scale-0 opacity-0 transition-[transform,opacity] delay-200 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [.group:focus-within_&]:scale-100 [.group:focus-within_&]:opacity-100 [.group:hover_&]:scale-100 [.group:hover_&]:opacity-100"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

function ServiceCard({
  slug,
  name,
  blurb,
  capabilities,
  featured = false,
}: {
  slug: keyof typeof serviceIcons;
  name: string;
  blurb: string;
  capabilities: string[];
  featured?: boolean;
}) {
  const Icon = serviceIcons[slug];

  return (
    <article
      className={[
        "group relative isolate flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "border-paper-300 hover:-translate-y-0.5 hover:border-blue-primary/40 hover:shadow-[0_18px_44px_-24px_rgba(11,30,61,0.4)] focus-within:border-blue-primary/40",
        featured ? "p-8 lg:p-10" : "p-7",
      ].join(" ")}
    >
      <CornerTrace />

      <span
        className={[
          "flex items-center justify-center rounded-md border border-paper-300 bg-paper-100 text-blue-primary transition-[border-color,background-color,color] duration-300",
          "group-hover:border-blue-primary/35 group-hover:bg-blue-primary/[0.07]",
          featured ? "h-14 w-14" : "h-12 w-12",
        ].join(" ")}
      >
        <Icon width={featured ? 26 : 22} height={featured ? 26 : 22} />
      </span>

      <h3
        className={[
          "mt-6 text-navy-ink",
          featured ? "text-(length:--text-2xl)" : "text-(length:--text-xl)",
        ].join(" ")}
      >
        {/* Whole-card link target — the heading anchor stretches over the card. */}
        <Link href={`/services/${slug}`} className="after:absolute after:inset-0 after:content-['']">
          {name}
        </Link>
      </h3>

      <p
        className={[
          "mt-3 leading-relaxed text-slate-gray",
          featured ? "max-w-lg text-[1.0625rem]" : "text-[0.9375rem]",
        ].join(" ")}
      >
        {blurb}
      </p>

      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-paper-200 pt-5">
        {capabilities.map((c) => (
          <li key={c} className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate-gray/80">
            {c}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-blue-deep">
        Explore {name.split(" ")[0].toLowerCase()} work
        <IconArrowUpRight
          width={15}
          height={15}
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </article>
  );
}

export function ServicesOverview() {
  const [featured, ...rest] = services;

  return (
    <Section tone="paper" id="services">
      <Container width="wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="What we do"
            title="Five practices, one operating model."
            lede="Work rarely stays inside one practice for long. They share the same engineers, the same monitoring, and the same runbook conventions — so the seams don't leak when it moves."
          />
          <Reveal className="shrink-0 lg:pb-2">
            <TraceLink href="/services">All services</TraceLink>
          </Reveal>
        </div>

        {/* Asymmetric: the lead practice takes a wider, taller cell; the rest
            sit in a 2×2 beside it. No row of identical cards. */}
        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-5">
          <RevealItem className="lg:col-span-1 lg:row-span-2">
            <ServiceCard
              slug={featured.slug}
              name={featured.name}
              blurb={featured.blurb}
              capabilities={featured.capabilities}
              featured
            />
          </RevealItem>

          {rest.map((s) => (
            <RevealItem key={s.slug}>
              <ServiceCard
                slug={s.slug}
                name={s.name}
                blurb={s.blurb}
                capabilities={s.capabilities}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
