import { IconCheck, IconClose, IconNodePath, IconPlus } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import type { Opening } from "@/lib/careers-content";

/**
 * Openings list.
 *
 * Ships in its empty state and stays useful there: a candidate who arrives to
 * find nothing open should still know what the bar is and how to register
 * interest, rather than bouncing off a "check back later".
 *
 * Add entries to `openings` in careers-content.ts and this renders a listing
 * with no other changes.
 */
export function OpeningsList({ openings }: { openings: Opening[] }) {
  if (openings.length === 0) {
    return (
      <div className="rounded-lg border border-white/12 bg-white/[0.03] p-8 lg:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-cyan-bright"
          >
            <IconNodePath width={22} height={22} />
          </span>

          <div className="min-w-0">
            <h3 className="text-(length:--text-2xl) text-white">
              No open roles right now.
            </h3>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/60">
              We hire when there is work to justify it, not on a schedule — so this page is
              genuinely empty rather than collecting applications against roles that do not exist.
            </p>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/60">
              That said, we read every speculative application and we have hired from them before.
              If the standing bar below describes you, send something. The worst outcome is a
              specific no.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#what-we-look-for" variant="onDark" size="md">
                What we look for
              </ButtonLink>
              <ButtonLink href="#apply" variant="gradient" size="md" withArrow>
                Register interest
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {openings.map((role) => (
        <details key={role.id} className="group/role">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
            <div className="min-w-0">
              <h3 className="text-(length:--text-xl) text-white transition-colors duration-200 group-hover/role:text-cyan-bright [font-family:var(--font-display)] [letter-spacing:-0.02em]">
                {role.title}
              </h3>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {[role.practice, role.location, role.type].map((meta) => (
                  <span
                    key={meta}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/45"
                  >
                    {meta}
                  </span>
                ))}
              </p>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white/60">
                {role.summary}
              </p>
            </div>

            <span
              aria-hidden
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 text-cyan-bright transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-open/role:rotate-45 group-open/role:border-cyan-bright/50 group-open/role:bg-cyan-bright/10"
            >
              <IconPlus width={16} height={16} />
            </span>
          </summary>

          <div className="grid gap-10 pb-9 lg:grid-cols-3">
            <div>
              <h4 className="label-mono text-cyan-bright">What you&rsquo;d do</h4>
              <ul className="mt-5 grid gap-3">
                {role.responsibilities.map((r) => (
                  <li key={r.slice(0, 30)} className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/65">
                    <IconNodePath width={17} height={17} className="mt-1 shrink-0 text-cyan-bright" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-mono text-cyan-bright">What we need</h4>
              <ul className="mt-5 grid gap-3">
                {role.requirements.map((r) => (
                  <li key={r.slice(0, 30)} className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/65">
                    <IconCheck width={17} height={17} className="mt-1 shrink-0 text-cyan-bright" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stated up front rather than discovered at offer stage. */}
            <div>
              <h4 className="label-mono text-white/40">Not for you if</h4>
              <ul className="mt-5 grid gap-3">
                {role.notForYouIf.map((r) => (
                  <li key={r.slice(0, 30)} className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/45">
                    <IconClose width={17} height={17} className="mt-1 shrink-0 text-white/30" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ButtonLink href="#apply" variant="onDark" size="sm" withArrow className="mb-9">
            Apply for {role.title}
          </ButtonLink>
        </details>
      ))}
    </div>
  );
}
