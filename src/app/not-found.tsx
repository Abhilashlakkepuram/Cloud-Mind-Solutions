import { Container } from "@/components/ui/Section";
import { ButtonLink, TraceLink } from "@/components/ui/Button";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink-900 pb-24 pt-40">
      <div aria-hidden className="circuit-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-[10%] top-[10%] h-[34rem] w-[34rem] rounded-full opacity-[0.13] blur-[130px]"
        style={{ backgroundImage: "radial-gradient(circle, #38BDF8 0%, transparent 68%)" }}
      />

      <Container width="wide" className="relative">
        <div className="max-w-2xl">
          {/* A conductor that terminates in nothing — the 404 stated in the
              site's own visual language rather than a giant "404". */}
          <svg aria-hidden viewBox="0 0 260 40" className="h-10 w-[16rem] overflow-visible">
            <path
              d="M0 20h60l24-14h60l24 14h36"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.25"
              strokeOpacity="0.55"
            />
            <circle cx="4" cy="20" r="3.5" fill="#38BDF8" />
            <circle cx="144" cy="20" r="3.5" fill="#38BDF8" />
            <path d="M204 20h20" stroke="#38BDF8" strokeWidth="1.25" strokeOpacity="0.2" strokeDasharray="3 5" />
            <circle cx="232" cy="20" r="4" fill="none" stroke="#6B7280" strokeWidth="1.25" />
            <path d="m229 17 6 6M235 17l-6 6" stroke="#6B7280" strokeWidth="1.25" strokeLinecap="round" />
          </svg>

          <p className="label-mono mt-8 text-cyan-bright">Error 404</p>

          <h1 className="mt-6 text-(length:--text-4xl) text-white">
            That path doesn&rsquo;t terminate anywhere.
          </h1>

          <p className="mt-6 max-w-xl text-(length:--text-lg) leading-relaxed text-white/65">
            The page you asked for either moved or never existed. If you followed a link from
            somewhere on this site, that&rsquo;s our mistake — tell us and we&rsquo;ll fix it.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" variant="gradient" size="lg" withArrow>
              Back to the homepage
            </ButtonLink>
            <ButtonLink href="/contact" variant="onDark" size="lg">
              Report a broken link
            </ButtonLink>
          </div>

          <nav aria-label="Site sections" className="mt-14 border-t border-white/10 pt-8">
            <h2 className="label-mono text-white/40">Or try one of these</h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <TraceLink href={item.href} tone="light">
                    {item.label}
                  </TraceLink>
                </li>
              ))}
              <li>
                <TraceLink href="/contact" tone="light">
                  Contact
                </TraceLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
