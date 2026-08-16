import type { Transition, Variants } from "motion/react";

/** Mirrors --ease-expo in globals.css so JS and CSS motion agree. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_EXPO = [0.87, 0, 0.13, 1] as const;

export const transition = {
  fast: { duration: 0.16, ease: EASE_EXPO },
  base: { duration: 0.24, ease: EASE_EXPO },
  slow: { duration: 0.42, ease: EASE_EXPO },
  reveal: { duration: 0.7, ease: EASE_EXPO },
} satisfies Record<string, Transition>;

/**
 * Reveals move a short distance and resolve on expo.out so they decelerate
 * hard — the "arrives and settles" feel, not a uniform linear drift.
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.reveal },
};

export const revealFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.reveal },
};

/** Parent that staggers children. Children use `revealUp`. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Viewport config shared by every scroll reveal so thresholds stay uniform. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
