"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { Counter } from "@/components/motion/Counter";
import { Button } from "@/components/ui/Button";
import { stats } from "@/lib/site";

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1]);

  return (
    <section className="relative overflow-hidden bg-black py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.08fr_1fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <Kicker>Why AUTOBIX</Kicker>
            </Reveal>

            <WordReveal
              inView
              as="h2"
              text={"More than\na car wash."}
              className="ab-display mt-5 text-[clamp(2.2rem,8.5vw,3rem)] text-white lg:text-[clamp(2.6rem,4vw,4rem)]"
            />

            <Reveal delay={0.1}>
              <div className="ab-rule mt-7 w-28" />
              <p className="ab-copy mt-7 max-w-xl">
                Most places in the area will wash your car. Very few will decontaminate the
                paint first, correct it under proper light, and then protect it so the finish
                actually survives a Kerala monsoon. We built AUTOBIX to do the whole job in one
                place — and to do the unglamorous parts properly.
              </p>
              <p className="ab-copy mt-5 max-w-xl">
                Separate tools for paint, glass, wheels and cabin. Dedicated bays so nothing is
                rushed. Everything checked under inspection lighting before we hand the keys
                back. And if something isn&apos;t right, it goes back in.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-9">
              <Button href="/services" variant="ghost">
                All services
              </Button>
            </Reveal>
          </div>

          <div ref={ref} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line lg:aspect-[4/4.05]">
              <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
                <Img
                  src="/images/generated/detail.webp"
                  alt="A dual-action polisher refining the paint on a deep red bonnet"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5 lg:inset-x-7 lg:bottom-7">
                <p className="ab-kicker text-white/60">Stage 02 · Paint correction</p>
                <p className="ab-display mt-2 text-2xl text-white lg:text-3xl">
                  Corrected, then coated
                </p>
              </div>
            </div>

            {/* Rating badge, anchored to the image corner. */}
            <div className="absolute -left-2 -top-2 flex items-center gap-2.5 rounded-full border border-line-strong bg-black/85 px-4 py-2.5 backdrop-blur-md lg:-left-6 lg:-top-6">
              <span className="text-amber" aria-hidden>
                ★★★★★
              </span>
              <span className="ab-kicker text-white">5.0 on Google</span>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-line pt-10 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 0.07}>
              <p className="ab-display-tight ab-gradient-text text-[2.75rem] lg:text-[4rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="ab-kicker mt-3 text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
