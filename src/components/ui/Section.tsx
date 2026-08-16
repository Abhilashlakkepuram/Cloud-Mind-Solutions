import type { ReactNode } from "react";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow" | "prose";
}) {
  const widths = {
    narrow: "max-w-3xl",
    prose: "max-w-[42rem]",
    default: "max-w-6xl",
    wide: "max-w-[85rem]",
  } as const;

  return (
    <div className={["mx-auto w-full px-(--spacing-gutter)", widths[width], className ?? ""].join(" ")}>
      {children}
    </div>
  );
}

/**
 * Mono eyebrow preceded by a lit node — the smallest unit of the circuit
 * language, repeated at the head of every section so the motif is structural
 * rather than decorative.
 */
export function SectionLabel({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2.5",
        // blue-deep, not blue-primary: at 11px on paper-100 the lighter blue
        // measures 4.30:1 and fails AA. blue-deep clears it at 6.3:1.
        tone === "light" ? "text-cyan-bright" : "text-blue-deep",
        className ?? "",
      ].join(" ")}
    >
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-40 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span className="label-mono">{children}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-30" />
    </span>
  );
}

export function Section({
  children,
  className,
  tone = "light",
  id,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "paper" | "dark";
  id?: string;
  size?: "default" | "sm";
}) {
  const tones = {
    light: "bg-white text-navy-ink",
    paper: "bg-paper-100 text-navy-ink",
    dark: "bg-ink-800 text-white",
  } as const;

  return (
    <section
      id={id}
      className={[
        "relative",
        size === "sm" ? "py-(--spacing-section-sm)" : "py-(--spacing-section)",
        tones[tone],
        className ?? "",
      ].join(" ")}
    >
      {children}
    </section>
  );
}

/**
 * Section heading block. Deliberately left-aligned and asymmetric by default —
 * centred hero-style headings are reserved for CTA bands only.
 */
export function SectionHeading({
  label,
  title,
  lede,
  tone = "dark",
  align = "left",
  className,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className ?? "",
      ].join(" ")}
    >
      {label && (
        <SectionLabel tone={tone} className={align === "center" ? "justify-center" : ""}>
          {label}
        </SectionLabel>
      )}
      <h2
        className={[
          "mt-5 text-(length:--text-3xl)",
          light ? "text-white" : "text-navy-ink",
        ].join(" ")}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={[
            "mt-4 text-(length:--text-lg) leading-relaxed",
            light ? "text-white/65" : "text-slate-gray",
          ].join(" ")}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
