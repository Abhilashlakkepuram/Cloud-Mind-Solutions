import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { addressLine } from "@/lib/site";

const CTA_VIDEO_MP4 = "/assets/banner/cta-band.mp4";
const CTA_VIDEO_POSTER = "/assets/banner/cta-band-poster.jpg";

type CtaBandProps = {
  videoMp4?: string;
  /** First frame. Also the entire background when motion is reduced. */
  poster?: string;
};

/**
 * Closing call to action — the one centred composition on the site. Everything
 * else is left-aligned and asymmetric, so centring here reads as a deliberate
 * stop rather than a default.
 *
 * ── Why this band is LIGHT ────────────────────────────────────────────────
 * The clip is a light-ground brand animation (white field, soft blue waves, the
 * cloud mark). Two things follow:
 *
 * 1. It cannot sit under a navy scrim with white text. A near-white clip pushed
 *    behind navy goes muddy, and white type over it fails wherever the scrim
 *    thins.
 * 2. A dark band here would butt straight into the dark footer with no
 *    boundary. Light-on-dark is the separation — see DESIGN-SYSTEM.md §1, no
 *    two adjacent sections share a background.
 *
 * ── Why the copy sits on an opaque card ───────────────────────────────────
 * Measured across all 64 frames, slate-gray body text tops out at 3.63:1 over
 * this footage even under an 80% white wash — the blue waves land at a similar
 * luminance to the text. No translucent scrim makes it safe. The opaque panel
 * gives the palette's guaranteed 16.6:1 / 4.8:1 while the video plays around
 * it, which also makes the band read as a distinct component rather than
 * bleeding into its neighbours.
 *
 * Server component: the reduced-motion swap is CSS, not a hook.
 */
export function CtaBand({
  videoMp4 = CTA_VIDEO_MP4,
  poster = CTA_VIDEO_POSTER,
}: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-paper-100 py-(--spacing-section)">
      <video
        aria-hidden
        tabIndex={-1}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        src={videoMp4}
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
      />

      {/* Reduced motion, and any browser that will not play the clip. */}
      <Image
        aria-hidden
        src={poster}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 hidden object-cover motion-reduce:block"
      />

      {/* Wash — sets the footage back so the panel is clearly the subject. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-paper-100/45" />

      {/* Edge fades. The band is light and both neighbours are dark, so these
          soften the seam without blurring the boundary itself. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-24"
        style={{ backgroundImage: "linear-gradient(180deg, #F7F9FC 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24"
        style={{ backgroundImage: "linear-gradient(0deg, #F7F9FC 0%, transparent 100%)" }}
      />

      <Container width="default">
        <Reveal className="relative mx-auto max-w-3xl">
          <div className="rounded-lg border border-paper-300 bg-white px-6 py-12 text-center shadow-[0_24px_60px_-32px_rgba(11,30,61,0.35)] sm:px-12 lg:px-16">
            {/* Conductor entering the block from above — the page's signal
                terminating at the call to action. */}
            <svg aria-hidden viewBox="0 0 2 64" className="mx-auto mb-9 h-16 w-0.5 overflow-visible">
              <line x1="1" y1="0" x2="1" y2="52" stroke="#2E6DF6" strokeWidth="1" strokeOpacity="0.35" />
              <circle cx="1" cy="58" r="3.5" fill="#2E6DF6" />
              <circle cx="1" cy="58" r="7" fill="none" stroke="#2E6DF6" strokeOpacity="0.3" />
            </svg>

            <h2 className="text-(length:--text-3xl) text-navy-ink">
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

            <p className="mt-10 font-mono text-[0.6875rem] tracking-wide text-slate-gray">
              {addressLine}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
