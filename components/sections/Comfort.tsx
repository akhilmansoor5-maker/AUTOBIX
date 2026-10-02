"use client";

import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { amenities } from "@/lib/site";

const icons: Record<string, React.ReactNode> = {
  coffee: (
    <path d="M4 7h11v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7Zm11 1h2.5a2.5 2.5 0 0 1 0 5H15M3 20h13" />
  ),
  salon: <path d="M7.5 4 16 15m0-11L7.5 15M6 18.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Zm7 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" />,
  lounge: (
    <path d="M4 11V8a2 2 0 0 1 4 0v3m8 0V8a2 2 0 0 1 4 0v3M3 12h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z" />
  ),
  showroom: <path d="M3 9l1.5-4h15L21 9M3 9h18v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Zm5 0v10m8-10v10" />,
};

export function Comfort() {
  return (
    <section className="ab-grain relative overflow-hidden bg-black py-16 lg:py-24">
      {/* Warm amber wash — the one place on the site that isn't red. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(253,111,33,0.14),transparent_55%)]"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.08fr] lg:items-start lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <Reveal className="col-span-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line">
                  <Img
                    src="/images/maps/maps-05.webp"
                    alt="The air-conditioned customer lounge at AUTOBIX AUTO CARE, with sofas facing the bays"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    objectPosition="center 40%"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  />
                  <p className="ab-kicker absolute bottom-4 left-4 text-white/80">
                    The lounge
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative aspect-square overflow-hidden rounded-sm border border-line">
                  <Img
                    src="/images/maps/maps-02.webp"
                    alt="Accessories and car care products on display in the AUTOBIX showroom"
                    sizes="(max-width: 1024px) 50vw, 24vw"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="relative aspect-square overflow-hidden rounded-sm border border-line">
                  <Img
                    src="/images/shop/shop-06.webp"
                    alt="The glass-fronted lounge and accessories entrance at AUTOBIX"
                    sizes="(max-width: 1024px) 50vw, 24vw"
                    objectPosition="center 45%"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Kicker>While you wait</Kicker>
            </Reveal>

            <WordReveal
              inView
              as="h2"
              text={"Nobody should\nwait in a\nplastic chair."}
              className="ab-display mt-5 text-[clamp(2.1rem,8vw,2.9rem)] text-white lg:text-[clamp(2.5rem,3.8vw,3.7rem)]"
            />

            <Reveal delay={0.1}>
              <p className="ab-copy mt-6 max-w-lg">
                Good detailing takes hours, and that is usually the worst part of the
                experience. So we built the rest of the building around it — a coffee shop, a
                salon, an air-conditioned lounge and an accessories showroom, all under the same
                roof. Drop the car off, get something else done, and collect it finished.
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {amenities.map((item, i) => (
                <Reveal as="li" key={item.id} delay={0.12 + i * 0.06} className="bg-black p-6">
                  <span className="text-ember" aria-hidden>
                    <svg
                      viewBox="0 0 24 24"
                      className="size-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icons[item.id]}
                    </svg>
                  </span>
                  <h3 className="ab-display mt-4 text-lg text-white">{item.title}</h3>
                  <p className="ab-copy mt-2 text-sm">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
