import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { IconArrowRight } from "@/components/icons";

type Variant = "gradient" | "solid" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Signature gradient — reserved for the single primary action per view.
  gradient:
    "brand-gradient text-white shadow-[0_1px_2px_rgba(11,30,61,0.28)] hover:shadow-[0_6px_28px_-6px_rgba(56,189,248,0.6)] hover:-translate-y-px",
  solid:
    "bg-blue-primary text-white hover:bg-blue-deep hover:-translate-y-px hover:shadow-[0_6px_24px_-8px_rgba(46,109,246,0.65)]",
  outline:
    "border border-paper-300 bg-white text-navy-ink hover:border-blue-primary hover:text-blue-primary",
  ghost: "text-navy-ink hover:bg-paper-200",
  onDark:
    "border border-white/20 bg-white/[0.04] text-white backdrop-blur-sm hover:border-cyan-bright/60 hover:bg-white/[0.09] hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Appends the arrow that slides on hover. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

function inner(children: ReactNode, withArrow?: boolean) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <IconArrowRight
          width={16}
          height={16}
          className="relative z-10 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  withArrow,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={[base, variants[variant], sizes[size], className ?? ""].join(" ")}
      {...rest}
    >
      {inner(children, withArrow)}
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  withArrow,
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={[base, variants[variant], sizes[size], className ?? ""].join(" ")}
      {...rest}
    >
      {inner(children, withArrow)}
    </button>
  );
}

/**
 * Text link that draws its underline from left to right on hover — the
 * "line drawing itself" gesture borrowed from the signal-path motif.
 */
export function TraceLink({
  href,
  children,
  className,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={[
        "group/trace inline-flex cursor-pointer items-center gap-1.5 text-[0.9375rem] font-medium",
        // See Section.tsx — blue-deep is the text-on-light action colour.
        tone === "light" ? "text-cyan-bright" : "text-blue-deep",
        className ?? "",
      ].join(" ")}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/trace:scale-x-100" />
      </span>
      <IconArrowRight
        width={15}
        height={15}
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/trace:translate-x-1"
      />
    </Link>
  );
}
