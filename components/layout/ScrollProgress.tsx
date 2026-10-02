"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline reading-progress bar pinned under the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="ab-gradient-surface fixed left-0 top-0 z-[60] h-[2px] w-full origin-left"
      style={{ scaleX: width }}
    />
  );
}
