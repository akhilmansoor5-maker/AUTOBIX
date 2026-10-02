import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { site, telHref, waHref } from "@/lib/site";

/**
 * Closing CTA. Asymmetric two-column layout: the pitch on the left, and the
 * three things a visitor actually needs stacked as discrete rows on the right,
 * so the block stays dense instead of floating in the middle of the page.
 */
export function FinalCta({
  heading = "Bring the car in.",
  body = "Message us with your model and what you want done. We'll tell you what it needs, how long it takes and what it costs — before you commit to anything.",
  image = "/images/shop/shop-08.webp",
  imageAlt = "The illuminated AUTOBIX AUTO CARE sign glowing at night",
}: {
  heading?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
}) {
  const actions = [
    {
      label: "WhatsApp",
      value: "Fastest reply",
      href: waHref(),
      primary: true,
      icon: (
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22.5l5.7-1.5A9.9 9.9 0 1 0 12.04 2Zm4.6 12c-.07-.12-.26-.2-.55-.34-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.73.9-.89 1.08-.16.19-.32.2-.6.07a6.6 6.6 0 0 1-1.93-1.19 7.3 7.3 0 0 1-1.34-1.67c-.14-.28-.01-.43.13-.57.13-.14.28-.33.42-.5.14-.16.19-.28.28-.46.1-.19.05-.35-.02-.49-.07-.14-.63-1.5-.86-2.05-.18-.44-.37-.44-.51-.45h-.44c-.15 0-.4.06-.6.28-.21.23-.8.78-.8 1.9 0 1.11.81 2.19.92 2.34.12.15 1.6 2.56 3.9 3.49.55.23.97.37 1.31.47.55.17 1.05.15 1.45.09.44-.07 1.37-.56 1.56-1.1.2-.55.2-1.02.13-1.12Z" />
      ),
    },
    {
      label: site.phones[0].display,
      value: "Call the service desk",
      href: telHref(),
      icon: (
        <path d="M6.6 10.8c1.2 2.3 3.1 4.2 5.4 5.4l1.8-1.8c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1A16 16 0 0 1 2 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1l-1.8 1.8Z" />
      ),
    },
    {
      label: "Theyyala, Nannambra",
      value: "Open 7 days · get directions",
      href: site.maps.directions,
      icon: (
        <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
      ),
    },
  ];

  return (
    <section className="ab-grain relative isolate overflow-hidden border-t border-line bg-void">
      <div className="absolute inset-0 -z-10 opacity-40">
        <Img src={image} alt={imageAlt} sizes="100vw" objectPosition="center 35%" />
      </div>
      {/* Weighted to the bottom so the signage never competes with the hours strip. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-black/85 to-black/55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_110%,rgba(252,1,1,0.26),transparent_55%)]"
      />

      <Container className="relative py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <Kicker>Book a slot</Kicker>
            </Reveal>

            <WordReveal
              inView
              as="h2"
              text={heading}
              className="ab-display-tight mt-5 max-w-[16ch] text-[clamp(2.4rem,9.5vw,3.4rem)] text-white lg:text-[clamp(3rem,4.8vw,4.8rem)]"
            />

            <Reveal delay={0.1}>
              <p className="ab-copy mt-5 max-w-md text-chrome">{body}</p>
            </Reveal>
          </div>

          {/* Action rows — each one a full-width hit target. */}
          <ul className="grid gap-px overflow-hidden rounded-sm border border-line-strong bg-line-strong backdrop-blur-sm">
            {actions.map((action, i) => (
              <Reveal as="li" key={action.label} delay={i * 0.07}>
                <a
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 bg-black/80 px-5 py-5 transition-colors duration-300 hover:bg-coal lg:px-6"
                >
                  <span
                    className={
                      action.primary
                        ? "ab-gradient-surface flex size-11 shrink-0 items-center justify-center rounded-full text-white"
                        : "flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-chrome transition-colors group-hover:border-line-strong group-hover:text-white"
                    }
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                      {action.icon}
                    </svg>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="ab-display block truncate text-lg text-white lg:text-xl">
                      {action.label}
                    </span>
                    <span className="ab-kicker mt-1.5 block text-dim">{action.value}</span>
                  </span>

                  <span
                    aria-hidden
                    className="shrink-0 text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-ember"
                  >
                    <svg viewBox="0 0 24 24" className="size-5" fill="none">
                      <path
                        d="M5 12h13m0 0-5-5m5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
            <p className="ab-kicker text-white/50">{site.hoursSummary}</p>
            <p className="ab-kicker text-white/50">{site.hoursSunday}</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ab-kicker text-white/50 transition-colors hover:text-ember"
            >
              Instagram {site.instagram.handle}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
