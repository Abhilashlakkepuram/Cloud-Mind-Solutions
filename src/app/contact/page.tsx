import type { Metadata } from "next";
import { Container, Section, SectionLabel } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPanel } from "@/components/contact/MapPanel";
import { IconClock, IconMail, IconNodePath, IconPhone } from "@/components/icons";
import { company, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the founders directly. CloudMind Solutions, 7901 4th St N, Ste 300, St. Petersburg, FL 33702. We reply to everything within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — CloudMind Solutions",
    description: "Talk to the founders directly. St. Petersburg, Florida.",
    url: `${siteUrl}/contact`,
  },
};

/** What actually happens after you press send — removes the usual black box. */
const WHAT_HAPPENS = [
  "A founder reads it. Not a form router, and not a salesperson — there isn't one.",
  "You get a reply within one business day, even if that reply is that we're the wrong firm for this.",
  "If it looks like a fit, we book 30 minutes to work out whether an assessment is worth your money.",
  "No mailing list, no drip sequence, no follow-up cadence. If you go quiet, we assume the answer is no.",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="You'll be talking to the people who would do the work."
        lede="We're small enough that this is still true. Tell us what's happening and we'll tell you honestly whether we can help — including when the answer is no."
        specs={[
          { k: "reply time", v: "1 business day" },
          { k: "you'll speak to", v: "A founder" },
          { k: "sales team", v: "None" },
        ]}
        align="wide"
      />

      <Section tone="light">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            {/* ── Form ─────────────────────────────────────────────────── */}
            <div id="consultation" className="scroll-mt-28">
              <Reveal>
              <SectionLabel>Book a consultation</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-navy-ink">
                Tell us what&rsquo;s actually going on.
              </h2>
              <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-slate-gray">
                The more specific you are, the more useful our first reply will be. Rough problems
                are fine — &ldquo;something is wrong with our costs and nobody can explain it&rdquo;
                is a real starting point.
              </p>

                <div className="mt-10">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            {/* ── Direct details ───────────────────────────────────────── */}
            <Reveal delay={0.1}>
              <div className="grid gap-6">
                <div className="rounded-lg border border-paper-300 bg-paper-100 p-7">
                  <h2 className="label-mono text-slate-gray">Prefer not to use a form</h2>
                  <ul className="mt-5 grid gap-4">
                    <li className="flex items-start gap-3">
                      <IconMail width={18} height={18} className="mt-1 shrink-0 text-blue-primary" />
                      <a
                        href={`mailto:${company.email}`}
                        className="group text-[1.0625rem] text-navy-ink transition-colors duration-200 hover:text-blue-deep"
                      >
                        <span className="relative">
                          {company.email}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                        </span>
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <IconPhone width={18} height={18} className="mt-1 shrink-0 text-blue-primary" />
                      <a
                        href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}
                        className="group text-[1.0625rem] text-navy-ink transition-colors duration-200 hover:text-blue-deep"
                      >
                        <span className="relative">
                          {company.phone}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="mt-5 font-mono text-[0.625rem] leading-relaxed text-slate-gray/70">
                    [PLACEHOLDER] Confirm the published phone number and inbox before launch.
                  </p>
                </div>

                {/* Scheduling — placeholder for a real booking embed */}
                <div className="rounded-lg border border-blue-primary/25 bg-blue-primary/[0.04] p-7">
                  <h2 className="label-mono text-blue-deep">Rather just book a slot</h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-navy-ink">
                    30 minutes, no deck, no discovery script. We ask what you run and what
                    hurts, and you decide from there.
                  </p>
                  <div className="mt-5 rounded-md border border-dashed border-blue-primary/35 bg-white/60 px-4 py-5 text-center">
                    <p className="font-mono text-[0.6875rem] leading-relaxed text-slate-gray">
                      [PLACEHOLDER: Scheduling embed]
                      <br />
                      Drop a Cal.com or Calendly inline widget here — the container is already
                      sized for it.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-paper-300 bg-white p-7">
                  <h2 className="flex items-center gap-2.5 label-mono text-slate-gray">
                    <IconClock width={15} height={15} className="text-blue-primary" />
                    Business hours
                  </h2>
                  <dl className="mt-5 grid gap-3">
                    {company.hours.map((h) => (
                      <div key={h.days} className="flex flex-wrap items-baseline justify-between gap-3">
                        <dt className="text-[0.9375rem] text-navy-ink">{h.days}</dt>
                        <dd className="font-mono text-[0.8125rem] text-slate-gray">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Map + what happens next ──────────────────────────────────────── */}
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
        <Container width="wide" className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <SectionLabel tone="light">The office</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-white">
                St. Petersburg, and on-site across Tampa Bay.
              </h2>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/60">
                For assessments we would rather spend the first week in the room with your team.
                The systems nobody documented tend to come up in conversation, not in a
                questionnaire.
              </p>
              <div className="mt-8">
                <MapPanel />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionLabel tone="light">After you press send</SectionLabel>
              <h2 className="mt-6 text-(length:--text-2xl) text-white">
                No black box. Here is the whole process.
              </h2>

              <ol className="relative mt-9 grid gap-7 pl-9">
                <span
                  aria-hidden
                  className="absolute bottom-2 left-[0.4375rem] top-2 w-px"
                  style={{ backgroundImage: "linear-gradient(to bottom, #1E4FD6, #38BDF8, transparent)" }}
                />
                {WHAT_HAPPENS.map((step) => (
                  <li key={step.slice(0, 30)} className="relative">
                    <IconNodePath
                      width={18}
                      height={18}
                      aria-hidden
                      className="absolute -left-9 top-0.5 text-cyan-bright"
                    />
                    <p className="text-[1.0625rem] leading-relaxed text-white/70">{step}</p>
                  </li>
                ))}
              </ol>

              <p className="mt-10 rounded-lg border border-white/12 bg-white/[0.03] p-6 text-[0.9375rem] leading-relaxed text-white/55">
                If you are an existing managed client with something broken right now, do not use
                this form — call the escalation number in your runbook. It reaches an on-call
                engineer directly.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
