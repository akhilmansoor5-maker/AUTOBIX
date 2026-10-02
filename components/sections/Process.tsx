import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { process } from "@/lib/site";

export function Process() {
  return (
    <section className="relative bg-black py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Kicker>How it works</Kicker>
            </Reveal>
            <WordReveal
              inView
              as="h2"
              text={"Five steps,\nno surprises."}
              className="ab-display mt-5 text-[clamp(2.1rem,8vw,2.9rem)] text-white lg:text-[clamp(2.5rem,3.8vw,3.8rem)]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="ab-copy max-w-sm lg:text-right">
              You always know what is being done, why, and what it costs before the first drop
              of water touches the car.
            </p>
          </Reveal>
        </div>

        {/* Mobile: stacked with a connecting spine. Desktop: 5 columns. */}
        <ol className="mt-11 grid gap-px overflow-hidden rounded-sm border border-line bg-line lg:mt-14 lg:grid-cols-5">
          {process.map((item, i) => (
            <Reveal
              as="li"
              key={item.step}
              delay={i * 0.07}
              className="group relative bg-black p-6 transition-colors duration-500 hover:bg-coal lg:p-7"
            >
              <span className="ab-display-tight block text-5xl text-white/10 transition-colors duration-500 group-hover:text-white/20 lg:text-6xl">
                {item.step}
              </span>
              <span
                aria-hidden
                className="ab-gradient-surface mt-5 block h-px w-0 transition-all duration-500 group-hover:w-10"
              />
              <h3 className="ab-display mt-5 text-lg text-white lg:text-xl">{item.title}</h3>
              <p className="ab-copy mt-3 text-sm">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
