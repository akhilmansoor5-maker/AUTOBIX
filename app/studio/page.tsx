import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Comfort } from "@/components/sections/Comfort";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

export const metadata: Metadata = {
  title: "The Centre",
  description:
    "Inside AUTOBIX AUTO CARE at Theyyala, Nannambra — dedicated wash and detailing bays, an accessories showroom, an air-conditioned lounge, a coffee shop and a salon under one roof.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        kicker="Theyyala, Nannambra"
        title={"Built to do the\nwhole job."}
        body="Most car washes are one shed and a pressure washer. We built separate bays, a showroom, a lounge, a coffee shop and a salon — so a detailing job doesn't cost you your whole day."
        image="/images/maps/maps-01.webp"
        imageAlt="The AUTOBIX AUTO CARE centre at Theyyala with every bay occupied"
        objectPosition="center 62%"
        tall
      />

      <section className="bg-black py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
            <div>
              <Reveal>
                <Kicker>Who we are</Kicker>
              </Reveal>
              <WordReveal
                inView
                as="h2"
                text={"A car care centre,\nnot a car wash."}
                className="ab-display mt-5 text-[clamp(2.1rem,8vw,2.9rem)] text-white lg:text-[clamp(2.5rem,3.8vw,3.8rem)]"
              />
            </div>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                <p className="ab-copy">
                  AUTOBIX AUTO CARE sits on the Tanur – Venniyur road at Theyyala, Nannambra. The
                  building was laid out around the work: a covered forecourt, dedicated wash and
                  detailing bays, a two-wheeler bay, and a glass-fronted accessories showroom
                  facing the road.
                </p>
                <p className="ab-copy">
                  Inside, the paint work happens away from the wash bays, because grit and
                  polish do not belong in the same room. Finished cars are checked under
                  inspection lighting before anyone is called to collect them.
                </p>
                <p className="ab-copy">
                  The rest of the building exists for the people, not the cars — a lounge with
                  air conditioning, a coffee shop and a salon, so a long job is something you can
                  actually sit through.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Facility strip */}
          <div className="mt-14 grid gap-3 sm:grid-cols-3 lg:mt-20 lg:gap-4">
            {[
              {
                src: "/images/shop/shop-01.webp",
                alt: "Bay 01 at AUTOBIX with a car being worked on under the canopy",
                label: "Bay 01 · Detailing",
              },
              {
                src: "/images/shop/shop-05.webp",
                alt: "The two-wheeler wash bay at AUTOBIX",
                label: "Two-wheeler bay",
              },
              {
                src: "/images/maps/maps-02.webp",
                alt: "Inside the AUTOBIX accessories showroom",
                label: "Accessories showroom",
              },
            ].map((item, i) => (
              <Reveal key={item.src} delay={i * 0.08}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-line sm:aspect-[4/3]">
                  <Img
                    src={item.src}
                    alt={item.alt}
                    sizes="(max-width: 640px) 100vw, 32vw"
                    className="transition-transform duration-[900ms] group-hover:scale-105"
                    objectPosition="center 55%"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                  />
                  <figcaption className="ab-kicker absolute bottom-4 left-4 text-white/85">
                    {item.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Comfort />
      <Process />
      <Gallery showCta={false} heading={"Every corner\nof the place."} />
      <InstagramStrip />
      <FinalCta
        heading="Come and see it."
        body="Open seven days a week. Drop in, look at the bays, and ask anything you want before you leave your car with us."
      />
    </>
  );
}
