"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Headline reveal: each word rides up from behind a clipping mask so the
 * line assembles itself. Falls back to plain text when motion is reduced.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  inView = false,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Trigger on scroll instead of on mount. */
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

  let index = 0;

  return (
    <Tag className={cn(className)}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word) => {
            const i = index++;
            return (
              <span
                key={`${li}-${i}`}
                className="inline-block overflow-hidden align-bottom pb-[0.08em]"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  {...(inView
                    ? { whileInView: { y: 0 }, viewport: { once: true, amount: 0.4 } }
                    : { animate: { y: 0 } })}
                  transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
                >
                  {word}
                  {/* Non-breaking space keeps the inline-block words apart. */}
                  <span className="inline-block w-[0.26em]" />
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
