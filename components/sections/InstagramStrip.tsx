import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { instagramPosts, site } from "@/lib/site";

export function InstagramStrip() {
  return (
    <section className="relative border-t border-line bg-black py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <Kicker>Latest work</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="ab-display mt-5 text-[clamp(1.9rem,7vw,2.4rem)] text-white lg:text-4xl">
                Follow {site.instagram.handle}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ab-kicker group inline-flex items-center gap-3 text-white"
            >
              See the feed
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
          </Reveal>
        </div>
      </Container>

      <div className="ab-rail mt-10 gap-3 px-5 pb-3 sm:px-8 lg:px-12">
        {instagramPosts.map((post, i) => (
          <a
            key={post.src}
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square w-[42vw] max-w-[15rem] shrink-0 overflow-hidden rounded-sm border border-line sm:w-[28vw] lg:w-[14vw]"
            aria-label={`${post.alt} — view on Instagram`}
          >
            <Img
              src={post.src}
              alt={post.alt}
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 14vw"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            {/* Reel badge — every post on the account is a reel. */}
            <span
              aria-hidden
              className="absolute right-2.5 top-2.5 text-white/70 drop-shadow"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                <path d="M8 5v14l11-7-11-7Z" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
