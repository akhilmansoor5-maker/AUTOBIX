import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { pillars, site, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit & Contact",
  description:
    "AUTOBIX AUTO CARE, Theyyala, Theyyalingal, Nannambra, Kerala 676320. Call +91 81378 33933 or message on WhatsApp. Open Monday to Saturday 8:30 am – 7:30 pm, Sunday 8:30 am – 1 pm.",
  alternates: { canonical: "/contact" },
};

const mapEmbed = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Visit us"
        title={"Theyyala.\nSeven days a week."}
        body="On the Tanur – Venniyur road. If you can see the illuminated sign, you have found it."
        image="/images/shop/shop-07.webp"
        imageAlt="The illuminated AUTOBIX AUTO CARE sign at night"
        objectPosition="center 55%"
      />

      <section className="bg-black py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* Details column */}
            <div>
              <Reveal>
                <Kicker>Get in touch</Kicker>
              </Reveal>
              <WordReveal
                inView
                as="h2"
                text={"Message first,\nsave the trip."}
                className="ab-display mt-5 text-[clamp(2rem,7.5vw,2.7rem)] text-white lg:text-[clamp(2.3rem,3.4vw,3.4rem)]"
              />
              <Reveal delay={0.1}>
                <p className="ab-copy mt-5 max-w-md">
                  Tell us the model and what you want done, and we&apos;ll confirm a slot and a
                  price before you drive over. Coating and PPF jobs need booking ahead.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href={waHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ab-gradient-surface ab-kicker inline-flex items-center rounded-full px-7 py-4 text-white transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    WhatsApp us
                  </a>
                  <a
                    href={site.maps.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ab-kicker inline-flex items-center rounded-full border border-line-strong px-7 py-4 text-white transition-colors hover:border-white/40"
                  >
                    Get directions
                  </a>
                </div>
              </Reveal>

              {/* Fact rows */}
              <dl className="mt-12 divide-y divide-line border-y border-line">
                <Reveal delay={0.05}>
                  <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:gap-8">
                    <dt className="ab-kicker w-28 shrink-0 pt-1 text-dim">Address</dt>
                    <dd className="text-sm leading-relaxed text-chrome">
                      <a
                        href={site.maps.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-white"
                      >
                        {site.address.full}
                      </a>
                      <span className="mt-1.5 block text-xs text-dim">
                        Plus code {site.plusCode}
                      </span>
                    </dd>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:gap-8">
                    <dt className="ab-kicker w-28 shrink-0 pt-1 text-dim">Phone</dt>
                    <dd className="space-y-1.5 text-sm text-chrome">
                      {site.phones.map((p) => (
                        <a
                          key={p.raw}
                          href={telHref(p.raw)}
                          className="block transition-colors hover:text-white"
                        >
                          {p.display}
                          <span className="ml-2 text-xs text-dim">{p.label}</span>
                        </a>
                      ))}
                    </dd>
                  </div>
                </Reveal>

                <Reveal delay={0.11}>
                  <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:gap-8">
                    <dt className="ab-kicker w-28 shrink-0 pt-1 text-dim">Hours</dt>
                    <dd className="w-full text-sm text-chrome">
                      <ul className="space-y-1.5">
                        {site.hours.map((h) => (
                          <li key={h.day} className="flex justify-between gap-4 sm:max-w-xs">
                            <span className={h.day === "Sunday" ? "text-ember" : undefined}>
                              {h.day}
                            </span>
                            <span className="text-muted">
                              {h.open} – {h.close}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:gap-8">
                    <dt className="ab-kicker w-28 shrink-0 pt-1 text-dim">Social</dt>
                    <dd className="text-sm text-chrome">
                      <a
                        href={site.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-white"
                      >
                        Instagram {site.instagram.handle}
                      </a>
                    </dd>
                  </div>
                </Reveal>
              </dl>
            </div>

            {/* Map + photo column */}
            <div className="space-y-4">
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line lg:aspect-[4/3.2]">
                  <iframe
                    title={`Map showing ${site.name} at ${site.address.short}`}
                    src={mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="size-full border-0 grayscale-[0.45] contrast-[1.1] invert-[0.92] hue-rotate-180"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-line">
                  <Img
                    src="/images/maps/maps-03.webp"
                    alt="The AUTOBIX pylon sign on the roadside listing every service offered"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    objectPosition="center 32%"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                  />
                  <p className="ab-kicker absolute bottom-4 left-4 text-white/85">
                    Look for this sign
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* What you can get done here */}
          <div className="mt-16 border-t border-line pt-12 lg:mt-24">
            <Reveal>
              <Kicker>While you&apos;re here</Kicker>
            </Reveal>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => (
                <Reveal as="li" key={pillar.id} delay={i * 0.06} className="bg-black p-6">
                  <span className="ab-display-tight ab-gradient-text text-3xl">
                    {pillar.index}
                  </span>
                  <h3 className="ab-display mt-3 text-lg text-white">{pillar.title}</h3>
                  <p className="ab-copy mt-2 text-sm">{pillar.lead}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <InstagramStrip />
    </>
  );
}
