import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { cn } from "@/lib/cn";

export function PageHero({
  kicker,
  title,
  body,
  image,
  imageAlt,
  objectPosition = "center 50%",
  tall = false,
}: {
  kicker: string;
  title: string;
  body?: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  tall?: boolean;
}) {
  return (
    <section
      className={cn(
        "ab-grain relative isolate flex items-end overflow-hidden bg-void pb-12 pt-[calc(var(--nav-h)+var(--safe-top)+3rem)] lg:pb-16 lg:pt-[calc(var(--nav-h)+5rem)]",
        tall ? "min-h-[72svh] lg:min-h-[80svh]" : "min-h-[56svh] lg:min-h-[64svh]",
      )}
    >
      <div className="absolute inset-0 -z-10">
        <Img
          src={image}
          alt={imageAlt}
          priority
          sizes="100vw"
          objectPosition={objectPosition}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_100%,rgba(252,1,1,0.22),transparent_55%)]"
      />

      <Container className="relative">
        <Reveal>
          <Kicker tone="white">{kicker}</Kicker>
        </Reveal>

        <WordReveal
          as="h1"
          text={title}
          delay={0.12}
          className="ab-display-tight mt-5 max-w-[22ch] text-[clamp(2.7rem,11vw,4rem)] text-white lg:mt-7 lg:text-[clamp(3.6rem,6.4vw,6.4rem)]"
        />

        {body && (
          <Reveal delay={0.25}>
            <p className="ab-copy mt-6 max-w-xl text-chrome lg:mt-8 lg:text-lg">{body}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
