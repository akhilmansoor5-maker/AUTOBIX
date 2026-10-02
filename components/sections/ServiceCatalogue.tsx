import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { serviceGroups, services, waHref } from "@/lib/site";

/**
 * Full catalogue, grouped by pillar. Rows alternate image side on desktop so
 * the page reads as an editorial list rather than a grid of cards.
 */
export function ServiceCatalogue() {
  return (
    <div className="bg-black">
      {serviceGroups.map((group, groupIndex) => {
        const items = services.filter((s) => s.group === group);
        if (items.length === 0) return null;

        return (
          <section
            key={group}
            aria-labelledby={`group-${groupIndex}`}
            className={cn(
              "border-t border-line py-14 lg:py-20",
              groupIndex % 2 === 1 ? "bg-coal" : "bg-black",
            )}
          >
            <Container>
              <div className="flex items-center gap-5">
                <Kicker>{`0${groupIndex + 1}`}</Kicker>
                <h2
                  id={`group-${groupIndex}`}
                  className="ab-display text-[clamp(1.6rem,6vw,2rem)] text-white lg:text-3xl"
                >
                  {group}
                </h2>
                <span aria-hidden className="ab-rule hidden flex-1 lg:block" />
                <span className="ab-kicker hidden text-dim lg:block">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </span>
              </div>

              <div className="mt-10 space-y-12 lg:mt-14 lg:space-y-20">
                {items.map((service, i) => (
                  <Reveal key={service.id}>
                    <article
                      id={service.id}
                      className="grid scroll-mt-28 gap-6 lg:grid-cols-2 lg:items-center lg:gap-14"
                    >
                      <div
                        className={cn(
                          "relative aspect-[4/3] overflow-hidden rounded-sm border border-line",
                          i % 2 === 1 && "lg:order-2",
                        )}
                      >
                        <Img
                          src={service.image}
                          alt={service.imageAlt}
                          sizes="(max-width: 1024px) 100vw, 46vw"
                          objectPosition="center 55%"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                        />
                        <span className="ab-kicker absolute bottom-4 left-4 rounded-full border border-line-strong bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
                          {service.duration}
                        </span>
                      </div>

                      <div className={cn(i % 2 === 1 && "lg:order-1")}>
                        <h3 className="ab-display text-[clamp(1.75rem,7vw,2.25rem)] text-white lg:text-[clamp(2rem,2.8vw,2.75rem)]">
                          {service.title}
                        </h3>
                        <p className="ab-copy mt-4 max-w-lg">{service.summary}</p>

                        <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                          {service.detail.map((line) => (
                            <li
                              key={line}
                              className="flex items-start gap-3 text-sm text-chrome"
                            >
                              <span
                                aria-hidden
                                className="ab-gradient-surface mt-[0.45rem] size-1 shrink-0 rotate-45"
                              />
                              {line}
                            </li>
                          ))}
                        </ul>

                        <a
                          href={waHref(
                            `Hi AUTOBIX, I'd like a quote for ${service.title}. My car is a `,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ab-kicker group mt-8 inline-flex items-center gap-3 text-white"
                        >
                          Get a quote
                          <span className="ab-gradient-surface flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1">
                            <svg
                              viewBox="0 0 24 24"
                              className="size-3.5"
                              fill="none"
                              aria-hidden
                            >
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
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
