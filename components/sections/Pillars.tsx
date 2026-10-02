"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { cn } from "@/lib/cn";
import { pillars, waHref } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Pillars() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Split the pinned scroll distance evenly between the pillars.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(pillars.length - 1, Math.floor(p * pillars.length));
    setActive((cur) => (cur === next ? cur : next));
  });

  return (
    <section className="relative bg-coal">
      <Container className="pt-16 lg:pt-24">
        <Reveal>
          <Kicker>What we do</Kicker>
        </Reveal>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <WordReveal
            inView
            as="h2"
            text={"Four reasons\na car comes in."}
            className="ab-display max-w-[16ch] text-[clamp(2.2rem,8.5vw,3rem)] text-white lg:text-[clamp(2.6rem,4vw,3.9rem)]"
          />
          <Reveal delay={0.1}>
            <p className="ab-copy max-w-sm lg:text-right">
              Pick the one that matches your problem — or message us and we&apos;ll tell you
              which it actually is.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* ---------------- Mobile: snap rail ---------------- */}
      <div className="mt-12 lg:hidden">
        <div className="ab-rail gap-4 px-5 pb-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="w-[82vw] max-w-sm overflow-hidden rounded-sm border border-line bg-black"
            >
              <div className="relative aspect-[4/3]">
                <Img
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  sizes="82vw"
                  objectPosition="center 55%"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"
                />
                <span className="ab-kicker absolute left-4 top-4 rounded-full border border-line-strong bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
                  {pillar.index}
                </span>
              </div>
              <div className="p-5">
                <p className="ab-kicker text-ember">{pillar.lead}</p>
                <h3 className="ab-display mt-2.5 text-[1.75rem] text-white">{pillar.title}</h3>
                <p className="ab-copy mt-3 text-sm">{pillar.body}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-chrome">
                      <span className="ab-gradient-surface size-1 shrink-0 rotate-45" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="ab-kicker px-5 text-dim">Swipe →</p>
      </div>

      {/* ---------------- Desktop: pinned image, scrolling copy ---------------- */}
      <div ref={ref} className="relative mt-14 hidden lg:block">
        <Container>
          <div className="grid grid-cols-[1fr_1.05fr] gap-14">
            {/* Pinned visual column — offset by the navbar so it never tucks under it. */}
            <div className="sticky top-[var(--nav-h)] h-[calc(100svh-var(--nav-h))] py-10">
              <div className="relative h-full overflow-hidden rounded-sm border border-line">
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={pillar.id}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 1.06,
                    }}
                    transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
                  >
                    <Img
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      sizes="48vw"
                      objectPosition="center 55%"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
                    />
                  </motion.div>
                ))}

                {/* Step indicator over the image. */}
                <div className="absolute inset-x-8 bottom-8 flex items-end justify-between">
                  <div>
                    <p className="ab-kicker text-white/60">
                      {pillars[active].index} / 0{pillars.length}
                    </p>
                    <p className="ab-display mt-2 text-4xl text-white">
                      {pillars[active].title}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {pillars.map((p, i) => (
                      <span
                        key={p.id}
                        className={cn(
                          "h-0.5 w-8 transition-colors duration-500",
                          active === i ? "ab-gradient-surface" : "bg-white/20",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling copy column — one tall block per pillar. */}
            <div>
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.id}
                  className="flex min-h-[calc(100svh-var(--nav-h))] flex-col justify-center py-10"
                >
                  <motion.div
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0.28 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="ab-display-tight ab-gradient-text text-6xl">
                        {pillar.index}
                      </span>
                      <span className="ab-rule w-full" />
                    </div>

                    <p className="ab-kicker mt-6 text-ember">{pillar.lead}</p>
                    <h3 className="ab-display mt-3 text-[clamp(2.1rem,3.2vw,3.1rem)] text-white">
                      {pillar.title}
                    </h3>
                    <p className="ab-copy mt-4 max-w-lg text-base">{pillar.body}</p>

                    <ul className="mt-7 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6">
                      {pillar.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-sm text-chrome"
                        >
                          <span
                            className="ab-gradient-surface size-1 shrink-0 rotate-45"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={waHref(
                        `Hi AUTOBIX, I'd like to ask about ${pillar.title.toLowerCase()} for my car.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ab-kicker group mt-7 inline-flex items-center gap-3 text-white"
                    >
                      Enquire about {pillar.title}
                      <span className="ab-gradient-surface flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1">
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                          <path
                            d="M5 12h13m0 0-5-5m5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
