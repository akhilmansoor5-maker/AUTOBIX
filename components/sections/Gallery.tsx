import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { gallery } from "@/lib/site";

/**
 * Desktop tilings that pack with no holes. Each pattern repeats and fills
 * whole rows, so the grid never ends with an empty cell.
 */
const TILINGS: Record<number, { cols: string; pattern: string[] }> = {
  4: {
    cols: "grid-cols-4",
    pattern: ["col-span-2 row-span-2", "col-span-2", "col-span-1", "col-span-1"],
  },
  6: {
    cols: "grid-cols-3",
    pattern: ["col-span-2 row-span-2", "col-span-1", "col-span-1"],
  },
  8: {
    cols: "grid-cols-4",
    pattern: ["col-span-2 row-span-2", "col-span-2", "col-span-1", "col-span-1"],
  },
};

function tilingFor(count: number) {
  return TILINGS[count] ?? { cols: "grid-cols-3", pattern: ["col-span-1"] };
}

/**
 * Real photographs of the centre, in an asymmetric masonry grid on desktop
 * and a snap rail on mobile.
 */
export function Gallery({
  limit,
  showCta = true,
  heading = "Shot at Theyyala.",
}: {
  limit?: number;
  showCta?: boolean;
  heading?: string;
}) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  const tiling = tilingFor(items.length);

  return (
    <section className="relative bg-coal py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Kicker>The centre</Kicker>
            </Reveal>
            <WordReveal
              inView
              as="h2"
              text={heading}
              className="ab-display mt-5 text-[clamp(2.1rem,8vw,2.9rem)] text-white lg:text-[clamp(2.5rem,3.8vw,3.8rem)]"
            />
          </div>
          {showCta && (
            <Reveal delay={0.1} className="hidden lg:block">
              <Button href="/studio" variant="ghost">
                Visit the centre
              </Button>
            </Reveal>
          )}
        </div>
      </Container>

      {/* Mobile rail */}
      <div className="mt-10 lg:hidden">
        <div className="ab-rail gap-3 px-5 pb-4">
          {items.map((item) => (
            <figure
              key={item.src}
              className="relative aspect-[3/4] w-[70vw] max-w-xs overflow-hidden rounded-sm border border-line"
            >
              <Img src={item.src} alt={item.alt} sizes="70vw" />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
              />
              <figcaption className="ab-kicker absolute bottom-4 left-4 text-white/80">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="ab-kicker px-5 text-dim">Swipe →</p>
      </div>

      {/* Desktop masonry */}
      <Container className="mt-11 hidden lg:block">
        <div className={cn("grid auto-rows-[16.5rem] gap-4", tiling.cols)}>
          {items.map((item, i) => (
            <Reveal
              key={item.src}
              className={cn(
                "group relative overflow-hidden rounded-sm border border-line",
                tiling.pattern[i % tiling.pattern.length],
              )}
            >
              <Img
                src={item.src}
                alt={item.alt}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
              />
              <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <span className="ab-kicker text-white/85">{item.caption}</span>
                <span
                  aria-hidden
                  className="ab-gradient-surface h-px w-0 transition-all duration-500 group-hover:w-10"
                />
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>

      {showCta && (
        <Container className="mt-9 lg:hidden">
          <Button href="/studio" variant="ghost">
            Visit the centre
          </Button>
        </Container>
      )}
    </section>
  );
}
