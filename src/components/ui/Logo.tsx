import Image from "next/image";
import { company } from "@/lib/site";

/**
 * CloudMind logo.
 *
 * Source artwork: public/assets/logo/e0262132-8b83-4283-94a9-d5d9b0276262.png
 * (1536×1024 RGBA, transparent background, stacked lockup with tagline).
 *
 * Derived variants live alongside it. Two things are worth knowing before
 * changing any of this:
 *
 * 1. The supplied artwork is built for LIGHT backgrounds — its circuit strokes
 *    are #001551, which measures 1.15:1 against our ink-900 header and would be
 *    invisible there. The `-ondark` variants lift those strokes to white
 *    (19.14:1) and leave the blue cloud gradient untouched. Use the right
 *    variant for the surface; do not put the light one on a dark background.
 *
 * 2. The supplied lockup is STACKED (mark above wordmark, 1.48:1). At header
 *    height that makes the wordmark ~10px tall and unreadable, so the header
 *    pairs the mark with live type instead. The full lockup is used in the
 *    footer, where there is vertical room for it.
 */

const MARK_RATIO = 512 / 335; // 1.5284
const LOCKUP_RATIO = 900 / 609; // 1.4778

export function LogoMark({
  className,
  size = 32,
  tone = "light",
  priority,
}: {
  className?: string;
  /** Rendered height in px. */
  size?: number;
  /** Surface the mark sits on: `light` = dark UI, `dark` = light UI. */
  tone?: "dark" | "light";
  priority?: boolean;
}) {
  const onDark = tone === "light";
  return (
    <Image
      src={onDark ? "/assets/logo/cloudmind-mark-ondark.png" : "/assets/logo/cloudmind-mark.png"}
      alt=""
      aria-hidden
      width={Math.round(size * MARK_RATIO)}
      height={size}
      priority={priority}
      className={className}
    />
  );
}

/**
 * Horizontal lockup for the header: real mark + live wordmark.
 * The wordmark is type rather than artwork so it stays crisp at 30px and can
 * be read by search engines and screen readers.
 */
export function Logo({
  className,
  tone = "dark",
  priority,
}: {
  className?: string;
  tone?: "dark" | "light";
  priority?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={30} tone={tone} priority={priority} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-semibold tracking-[-0.02em] ${
            tone === "light" ? "text-white" : "text-navy-ink"
          }`}
        >
          Cloud<span className={tone === "light" ? "text-blue-primary" : "text-blue-deep"}>Mind</span>
        </span>
        <span
          className={`label-mono mt-1 text-[0.5625rem] ${
            tone === "light" ? "text-cyan-bright/70" : "text-slate-gray"
          }`}
        >
          Solutions
        </span>
      </span>
      <span className="sr-only">{company.legalName}</span>
    </span>
  );
}

/**
 * Full stacked lockup as supplied (mark + wordmark + SOLUTIONS rule).
 * Only use where there is vertical room — the footer, or a large placement.
 */
export function LogoLockup({
  className,
  width = 220,
  tone = "light",
}: {
  className?: string;
  width?: number;
  tone?: "dark" | "light";
}) {
  const onDark = tone === "light";
  return (
    <Image
      src={onDark ? "/assets/logo/cloudmind-lockup-ondark.png" : "/assets/logo/cloudmind-lockup.png"}
      alt={company.legalName}
      width={width}
      height={Math.round(width / LOCKUP_RATIO)}
      className={className}
    />
  );
}
