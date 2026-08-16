import Image from "next/image";

interface ImagePlaceholderProps {
  /**
   * Real image path once available (e.g. "/assets/team/hero.jpg").
   * Supplying this is the ONLY change needed to go live — everything else
   * (aspect ratio, sizing, rounding, alt text) is already declared.
   */
  src?: string;
  /** Describes the intended image. Doubles as alt text once `src` is set. */
  label: string;
  width: number;
  height: number;
  /** Where this image sits, shown in the placeholder chrome. */
  context?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** `mark` overlays the circuit motif — use for large hero/feature slots. */
  variant?: "mark" | "plain";
  tone?: "dark" | "light";
}

export function ImagePlaceholder({
  src,
  label,
  width,
  height,
  context,
  className,
  priority,
  sizes = "100vw",
  variant = "mark",
  tone = "dark",
}: ImagePlaceholderProps) {
  const ratio = `${width} / ${height}`;

  if (src) {
    return (
      <Image
        src={src}
        alt={label}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={className}
        style={{ aspectRatio: ratio }}
      />
    );
  }

  const dark = tone === "dark";

  return (
    <div
      role="img"
      aria-label={`Placeholder for ${label}`}
      style={{ aspectRatio: ratio }}
      className={[
        "relative isolate w-full overflow-hidden",
        dark ? "bg-ink-800 text-cyan-bright/70" : "bg-paper-200 text-slate-gray",
        className ?? "",
      ].join(" ")}
    >
      {/* Diagonal hatch — 45° to match the icon-set trunk-line rule. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${
            dark ? "rgba(56,189,248,0.10)" : "rgba(11,30,61,0.055)"
          } 0px, ${
            dark ? "rgba(56,189,248,0.10)" : "rgba(11,30,61,0.055)"
          } 1px, transparent 1px, transparent 11px)`,
        }}
      />

      {variant === "mark" && (
        <svg
          aria-hidden
          viewBox="0 0 100 60"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full opacity-[0.28]"
        >
          <path
            d="M-5 44h22l14-24h26l12 20h36"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="17" cy="44" r="1.6" fill="currentColor" />
          <circle cx="31" cy="20" r="1.6" fill="currentColor" />
          <circle cx="69" cy="40" r="1.6" fill="currentColor" />
        </svg>
      )}

      {/* Corner ticks — reads as a spec/crop mark, not a generic empty box. */}
      <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-current opacity-50" />
      <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-current opacity-50" />
      <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-current opacity-50" />
      <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-current opacity-50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center">
        <span className="label-mono opacity-90">Placeholder</span>
        <span
          className={`max-w-[85%] font-mono text-[0.6875rem] leading-relaxed ${
            dark ? "text-white/80" : "text-navy-ink/75"
          }`}
        >
          {label}
        </span>
        <span className="font-mono text-[0.625rem] opacity-70">
          {width}×{height}
          {context ? ` · ${context}` : ""}
        </span>
      </div>
    </div>
  );
}
