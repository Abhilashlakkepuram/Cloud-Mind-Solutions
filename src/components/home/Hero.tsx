"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_EXPO } from "@/lib/motion";
import { company } from "@/lib/site";

/**
 * Video hero.
 *
 * The footage is a slowly rotating infinity loop in the brand's own blue/cyan
 * range, so the copy is written to what it depicts: continuity, and a system
 * that never stops. That is also the firm's actual differentiator, which is why
 * it earns the space rather than being decoration behind unrelated words.
 *
 * Legibility is handled by a four-layer scrim rather than by dimming the whole
 * video — the loop stays bright on the right where there is no text, and the
 * left is taken down far enough to clear AA on body copy.
 *
 * The source clip carried a "Veo" watermark and letterbox bars; both are cropped
 * out of the encoded asset — see "Hero background video" in
 * public/assets/README.md for the exact ffmpeg command.
 */

const VIDEO_SRC = "/assets/banner/Creating_looping_robot_animation_202608171300.mp4";
const POSTER_SRC = "/assets/banner/home-banner-poster.jpg";

const line = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Copy and footage drift at different rates — depth without a parallax library.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  // Only enough zoom to hide the edges during the parallax drift — more than
  // this and the loop overruns the frame instead of reading as a whole shape.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-ink-900 pb-24 pt-32 lg:min-h-[92svh] lg:pt-36"
    >
      {/* ── Footage ──────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: videoY, scale: videoScale }}
        className="absolute inset-0 -z-20"
      >
        {reduce ? (
          // Reduced motion: the poster frame, never the moving clip.
          <Image
            src={POSTER_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[38%_50%]"
          />
        ) : (
          <video
            className="h-full w-full object-cover object-center lg:object-[38%_50%]"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            // Decorative: the loop carries no information the copy does not.
            aria-hidden
            tabIndex={-1}
          />
        )}
      </motion.div>

      {/* ── Scrims ───────────────────────────────────────────────────────────
          Layered rather than one flat overlay, so the loop keeps its brightness
          on the right while the copy side is dark enough to read. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* 1. Horizontal falloff.
               These stops are not eyeballed. The clip is 8s of moving light, so
               they were solved against all 32 sampled frames: the scrim stays
               ≥0.88 across the full text column (which ends at ~52%) and only
               then clears, which holds worst-case contrast at 12.9:1 for the
               headline, 7.9:1 for the lede and 7.1:1 for the mono line — while
               the loop's right lobe keeps its brightness from ~62% out.
               Re-run scripts/hero-contrast.py if the clip or the copy changes. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #060F20 0%, rgba(6,15,32,0.96) 34%, rgba(6,15,32,0.88) 50%, rgba(6,15,32,0.40) 62%, rgba(6,15,32,0.10) 76%, rgba(6,15,32,0.28) 100%)",
          }}
        />
        {/* 2. Mobile/tablet: the loop is centred, so knock the whole frame back
               further — the copy sits directly over it below lg. */}
        <div className="absolute inset-0 bg-ink-900/55 lg:hidden" />
        {/* 3. Top — keeps the fixed nav legible over bright frames. */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(6,15,32,0.9) 0%, transparent 100%)" }}
        />
        {/* 4. Bottom — hands off to the next section with no visible seam. */}
        <div
          className="absolute inset-x-0 bottom-0 h-56"
          style={{ backgroundImage: "linear-gradient(0deg, #060F20 8%, transparent 100%)" }}
        />
        {/* Brand substrate, barely there, to tie the video to the rest of the site. */}
        <div className="circuit-grid absolute inset-0 opacity-[0.22]" />
      </div>

      {/* ── Copy ─────────────────────────────────────────────────────────── */}
      <Container width="wide" className="relative">
        <motion.div
          style={{ y: copyY }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
          className="max-w-2xl"
        >
          <motion.p
            variants={line}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="label-mono flex items-center gap-3 text-cyan-bright"
          >
            <span aria-hidden className="h-px w-8 bg-current opacity-50" />
            {company.tagline}
          </motion.p>

          <h1 className="mt-5 text-(length:--text-4xl) text-white">
            <motion.span variants={line} transition={{ duration: 0.75, ease: EASE_EXPO }} className="block">
              Your systems never stop.
            </motion.span>
            <motion.span variants={line} transition={{ duration: 0.75, ease: EASE_EXPO }} className="block">
              <span className="brand-gradient-text">Neither do we.</span>
            </motion.span>
          </h1>

          <motion.p
            variants={line}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="mt-7 max-w-xl text-(length:--text-l) leading-relaxed text-white/75"
          >
            Cloud, applied AI, cybersecurity, and managed IT — planned, built, and operated by the
            same senior engineers. No handover at go-live, and no support tier that has never seen
            your stack.
          </motion.p>

          <motion.div
            variants={line}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/contact#consultation" variant="gradient" size="lg" withArrow>
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="#approach" variant="onDark" size="lg">
              See how we work
            </ButtonLink>
          </motion.div>

          <motion.p
            variants={line}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            // white/70, not the /45 used on flat dark sections — over moving
            // footage the measured worst case at /45 was 2.0:1.
            className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] leading-relaxed tracking-wide text-white/70"
          >
            <span>St. Petersburg, FL</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-cyan-bright/60" />
            <span>US-based engineers</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-cyan-bright/60" />
            <span>24/7 named escalation</span>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
