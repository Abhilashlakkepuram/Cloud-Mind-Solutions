import { IconArrowUpRight, IconPin } from "@/components/icons";
import { addressLine, company } from "@/lib/site";

const mapsQuery = encodeURIComponent(
  `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`,
);
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

/**
 * Office map.
 *
 * Renders a branded stand-in by default rather than a third-party iframe: an
 * embed loads Google's scripts and cookies for every visitor before they have
 * consented to anything, which is a decision the client should make knowingly.
 *
 * To switch to a real embed, pass `embedSrc` with a Google Maps / OpenStreetMap
 * embed URL — the surrounding layout is unchanged.
 */
export function MapPanel({ embedSrc }: { embedSrc?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/12 bg-ink-850">
      <div className="relative aspect-[4/3] w-full">
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title={`Map showing ${company.legalName} at ${addressLine}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            {/* Abstract street grid drawn in the circuit vocabulary — orthogonal
                and 45° routes only, same rule as the icon set. */}
            <svg
              aria-hidden
              viewBox="0 0 400 300"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              <rect width="400" height="300" fill="#081629" />
              <g stroke="#38BDF8" strokeOpacity="0.14" strokeWidth="1">
                <path d="M0 70h400M0 140h400M0 212h400M0 268h400" />
                <path d="M58 0v300M132 0v300M214 0v300M296 0v300M358 0v300" />
              </g>
              {/* Two arterial routes, weighted heavier */}
              <path d="M0 140h400" stroke="#38BDF8" strokeOpacity="0.32" strokeWidth="2.5" />
              <path d="M214 0v300" stroke="#38BDF8" strokeOpacity="0.32" strokeWidth="2.5" />
              <path d="M296 300 296 196 358 134 358 0" stroke="#1E4FD6" strokeOpacity="0.4" strokeWidth="2" fill="none" />
              {/* Water body, bottom-left — St. Petersburg sits on a peninsula */}
              <path d="M0 300 0 240 Q46 232 58 250 Q74 274 132 268 L132 300Z" fill="#1E4FD6" fillOpacity="0.14" />
            </svg>

            {/* Office marker */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden className="absolute -inset-6 rounded-full bg-cyan-bright/10 blur-md" />
              <span
                aria-hidden
                className="absolute -inset-3 rounded-full border border-cyan-bright/40 motion-safe:animate-ping"
                style={{ animationDuration: "2.6s" }}
              />
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan-bright/60 bg-ink-900 text-cyan-bright">
                <IconPin width={17} height={17} />
              </span>
            </span>

            <span className="absolute bottom-3 left-3 font-mono text-[0.625rem] tracking-wide text-white/35">
              [PLACEHOLDER] Illustrative map — pass `embedSrc` for a live embed
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 p-6 sm:flex-row sm:items-end sm:justify-between">
        <address className="flex items-start gap-3 not-italic">
          <IconPin width={17} height={17} className="mt-1 shrink-0 text-cyan-bright" />
          <span className="text-[0.9375rem] leading-relaxed text-white/70">
            {company.address.street}
            <br />
            {company.address.city}, {company.address.state} {company.address.zip}
          </span>
        </address>

        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 text-[0.875rem] font-medium text-cyan-bright transition-colors duration-200 hover:text-white"
        >
          Open in Maps
          <IconArrowUpRight
            width={15}
            height={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </div>
  );
}
