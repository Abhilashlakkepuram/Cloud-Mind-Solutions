"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { revealUp, staggerParent, viewportOnce } from "@/lib/motion";

/**
 * Scroll reveal. Motion's `whileInView` already no-ops transforms under
 * prefers-reduced-motion when MotionConfig reducedMotion="user" is set in the
 * root layout, so there is no separate reduced-motion branch here.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variants = revealUp,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variants?: Variants;
}) {
  const Comp = motion[as as "div"] ?? motion.div;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers any `RevealItem` children as the group enters view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: ElementType;
}) {
  const Comp = motion[as as "div"] ?? motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerParent(stagger, delayChildren)}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  variants = revealUp,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
}) {
  const Comp = motion[as as "div"] ?? motion.div;
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
