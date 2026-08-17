import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { addressLine } from "@/lib/site";

/* TODO: swap for the real asset paths once the clip is encoded. */
const CTA_VIDEO_WEBM = "/videos/cta-band.webm";
const CTA_VIDEO_MP4 = "/videos/cta-band.mp4";
const CTA_VIDEO_POSTER = "/videos/cta-band-poster.jpg";

type CtaBandProps = {
  /** Preferred source. Smaller than mp4 — served first where supported. */
  videoWebm?: string;
  /** Fallback source for Safari/older browsers. */
  videoMp4?: string;
  /** First frame. Also the entire background when motion is reduced. */
  poster?: string;
};

/**
 * The one centred composition on the site. Everything else is left-aligned and
 * asymmetric, so centring here reads as a deliberate stop rather than a default.
 *
 * The background video is decorative: muted, looping, inert to assistive tech and
 * to the tab order. Under `prefers-reduced-motion` it is swapped for the poster
 * still, which keeps this a server component — no client hook needed.
 */
export function CtaBand({
  videoWebm = CTA_VIDEO_WEBM,
  videoMp4 = "/assets/banner/CatBanner.mp4",
  poster = CTA_VIDEO_POSTER,
}: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-ink py-(--spacing-section)">
      <video
        aria-hidden
        tabIndex={-1}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src={videoWebm} type="video/webm" />
        <source src={videoMp4} type="video/mp4" />
      </video>

      {/* Reduced-motion / no-video-support fallback. */}
      <img
        aria-hidden
        src={poster}
        alt=""
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover motion-reduce:block"
      />

      {/* Scrim. Two layers: a flat floor for contrast, then a vertical gradient
          so the band still fades into the sections above and below it. */}
      <div aria-hidden className="absolute inset-0 -z-10 " />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-ink via-navy-ink/40 to-navy-ink"
      />

      <Container width="default">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          {/* Conductor entering the block from above — the page's signal
              terminating at the call to action. */}
          <svg aria-hidden viewBox="0 0 2 64" className="mx-auto mb-10 h-16 w-0.5 overflow-visible">
            <line x1="1" y1="0" x2="1" y2="52" stroke="#5B92FF" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="1" cy="58" r="3.5" fill="#5B92FF" />
            <circle cx="1" cy="58" r="7" fill="none" stroke="#5B92FF" strokeOpacity="0.4" />
          </svg>

          <h2 className="text-(length:--text-4xl) text-white">
            Start with the assessment. Decide about the rest afterwards.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-(length:--text-lg) leading-relaxed text-white/75">
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

          <p className="mt-10 font-mono text-[0.6875rem] tracking-wide text-white/55">
            {addressLine}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}