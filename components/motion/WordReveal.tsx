"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Headline reveal: each word rides up from behind a clipping mask so the line
 * assembles itself.
 *
 * A single observer sits on the wrapper and drives the words through variants,
 * rather than giving every word its own IntersectionObserver — cheaper, and it
 * can't leave half a headline stranded off-screen. Falls back to static text
 * when the visitor asks for reduced motion.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  inView = false,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Trigger when scrolled into view instead of on mount. */
  inView?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[Tag];

  const container: Variants = {
    hidden: {},
    shown: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    shown: { y: "0%", transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={container}
      initial="hidden"
      {...(inView
        ? { whileInView: "shown", viewport: { once: true, amount: 0.25 } }
        : { animate: "shown" })}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((w, wi) => (
            <span
              key={`${li}-${wi}`}
              className="inline-block overflow-hidden align-bottom pb-[0.09em]"
            >
              <motion.span className="inline-block" variants={word}>
                {w}
                {/* Keeps inline-block words from colliding. */}
                <span className="inline-block w-[0.26em]" />
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
