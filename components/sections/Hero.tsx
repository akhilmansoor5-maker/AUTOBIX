"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { WordReveal } from "@/components/motion/WordReveal";
import { site, telHref, waHref } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const chips = ["Wash & detail", "Ceramic & graphene", "PPF & cooling film", "Alignment"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Photo drifts and dims as the copy scrolls away over it.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="ab-grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-void pb-[calc(var(--dock-h)+1.75rem)] pt-[calc(var(--nav-h)+var(--safe-top)+1.5rem)] lg:justify-center lg:pb-24 lg:pt-[calc(var(--nav-h)+4rem)]"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y, scale }}
      >
        <Img
          src="/images/generated/hero.webp"
          alt="A detailed SUV under the lights in the AUTOBIX AUTO CARE bay"
          priority
          sizes="100vw"
          objectPosition="70% 42%"
        />
      </motion.div>

      {/* Grading stack: darken for contrast, then warm the lower left. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/15 lg:bg-gradient-to-r lg:from-black lg:via-black/75 lg:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_85%,rgba(252,1,1,0.2),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black to-transparent"
      />

      <Container className="relative">
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="ab-gradient-surface size-1.5 rotate-45" aria-hidden />
          <p className="ab-kicker text-white/70">
            Theyyala, Nannambra
            <span className="hidden sm:inline"> · Open today till 7:30 pm</span>
          </p>
        </motion.div>

        <WordReveal
          as="h1"
          text={"Your car,\ngiven back"}
          delay={0.15}
          className="ab-display-tight mt-4 max-w-[20ch] text-[clamp(2.9rem,12.5vw,4.8rem)] text-white lg:mt-5 lg:max-w-none lg:text-[clamp(3.8rem,6.8vw,7rem)]"
        />
        <WordReveal
          as="p"
          text="better."
          delay={0.55}
          className="ab-display-tight ab-gradient-text text-[clamp(2.9rem,12.5vw,4.8rem)] lg:text-[clamp(3.8rem,6.8vw,7rem)]"
        />

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          className="ab-copy mt-5 max-w-sm text-chrome lg:mt-6 lg:max-w-lg lg:text-base"
        >
          Washing, detailing, ceramic and graphene coating, paint protection, cooling film,
          alignment and accessories — all in one centre. With a coffee shop and salon on site,
          so the wait is the easy part.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.88, ease: EASE }}
          className="mt-7 flex flex-wrap items-center gap-3 lg:mt-8"
        >
          <a
            href={waHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="ab-gradient-surface ab-kicker group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="relative">Book on WhatsApp</span>
            <svg viewBox="0 0 24 24" className="relative size-3.5" fill="none" aria-hidden>
              <path
                d="M5 12h13m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={telHref()}
            className="ab-kicker inline-flex items-center gap-2.5 rounded-full border border-line-strong px-7 py-4 text-white transition-colors duration-300 hover:border-white/40"
          >
            {site.phones[0].display}
          </a>
        </motion.div>

        <motion.ul
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
          className="mt-7 flex flex-wrap gap-2 lg:mt-9"
        >
          {chips.map((chip) => (
            <li
              key={chip}
              className="ab-kicker rounded-full border border-line px-3.5 py-2 text-white/60 backdrop-blur-sm"
            >
              {chip}
            </li>
          ))}
        </motion.ul>
      </Container>

      {/* Scroll cue — desktop only, fades out as you leave the hero. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { opacity: fade }}
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="ab-kicker text-dim">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="ab-gradient-surface absolute inset-x-0 h-5"
            animate={{ y: [-20, 48] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
