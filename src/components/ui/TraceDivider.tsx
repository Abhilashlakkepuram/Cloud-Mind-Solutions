"use client";

import { motion } from "motion/react";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Structural section divider.
 *
 * A single conductor routed with 45° jogs and three nodes on it. The line
 * draws itself and the nodes light up in sequence as the divider enters view,
 * so moving between sections reads as a signal continuing down the page rather
 * than as a decorative rule.
 */
export function TraceDivider({
  tone = "light",
  className,
  flip = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  /** Mirrors the route so consecutive dividers don't repeat the same shape. */
  flip?: boolean;
}) {
  const stroke = tone === "dark" ? "#38BDF8" : "#2E6DF6";
  const nodes = [
    { cx: 232, cy: flip ? 12 : 36 },
    { cx: 600, cy: 24 },
    { cx: 968, cy: flip ? 36 : 12 },
  ];

  const d = flip
    ? "M0 12h208l24 0 24 24h320l24-12 24 12h320l24 0h232"
    : "M0 36h208l24 0 24-24h320l24 12 24-12h320l24 0h232";

  return (
    <div aria-hidden className={["relative w-full overflow-hidden", className ?? ""].join(" ")}>
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="h-12 w-full">
        <motion.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          strokeOpacity={tone === "dark" ? 0.5 : 0.35}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: EASE_EXPO }}
        />
      </svg>

      {/* Nodes sit in their own non-scaling layer so they stay circular
          regardless of the stretched viewBox. */}
      <svg viewBox="0 0 1200 48" className="absolute inset-0 h-12 w-full">
        {nodes.map((n, i) => (
          <motion.circle
            key={n.cx}
            cx={n.cx}
            cy={n.cy}
            r={3}
            fill={stroke}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.18, ease: EASE_EXPO }}
          />
        ))}
      </svg>
    </div>
  );
}
