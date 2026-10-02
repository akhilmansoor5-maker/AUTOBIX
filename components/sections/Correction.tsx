"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

/**
 * Full-bleed 50/50 paint-correction shot. The image is deliberately the
 * argument: left half uncorrected, right half finished.
 */
export function Correction() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // No bottom padding: the full-bleed image butts straight into the next
  // section, which supplies its own breathing room.
  return (
    <section className="relative overflow-hidden bg-coal pb-0 pt-16 lg:pt-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Kicker>The part nobody sees</Kicker>
            </Reveal>
            <WordReveal
              inView
              as="h2"
              text={"A coating over\nbad paint just\nlocks it in."}
              className="ab-display mt-5 max-w-[18ch] text-[clamp(2.1rem,8vw,2.9rem)] text-white lg:text-[clamp(2.5rem,3.8vw,3.8rem)]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="ab-copy max-w-md lg:text-right">
              Swirls, oxidation and water etching have to come out <em>before</em> anything goes
              on top. We correct first and seal second — in that order, every time.
            </p>
          </Reveal>
        </div>
      </Container>

      <Reveal delay={0.15} className="mt-10 lg:mt-14">
        <div
          ref={ref}
          className="relative aspect-[16/11] overflow-hidden border-y border-line sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          <motion.div className="absolute inset-[-6%]" style={reduce ? undefined : { y }}>
            <Img
              src="/images/generated/split.webp"
              alt="A black bonnet split by masking tape: dull swirled paint on the left, mirror-gloss corrected paint on the right"
              sizes="100vw"
            />
          </motion.div>

          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
          />

          {/* Labels pinned to each half. */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 lg:p-10">
            <div className="rounded-sm border border-line-strong bg-black/60 px-4 py-3 backdrop-blur-md">
              <p className="ab-kicker text-white/50">Before</p>
              <p className="mt-1.5 text-sm text-chrome">Swirled & oxidised</p>
            </div>
            <div className="ab-glow-red rounded-sm border border-red/40 bg-black/60 px-4 py-3 backdrop-blur-md">
              <p className="ab-kicker ab-gradient-text">After</p>
              <p className="mt-1.5 text-sm text-white">Corrected & sealed</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
