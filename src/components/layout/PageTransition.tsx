"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Route transition.
 *
 * Enter-only by design: App Router unmounts the outgoing tree before
 * AnimatePresence can run an exit, so a paired exit animation would either
 * flash or require freezing the old render. A fast enter keyed on pathname
 * gives the cohesive single-app feel without that fragility.
 *
 * 320ms — inside the brief's sub-400ms budget.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
