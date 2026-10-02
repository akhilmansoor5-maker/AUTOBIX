import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";

export default function NotFound() {
  return (
    <section className="ab-grain relative flex min-h-[80svh] items-center bg-void">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(252,1,1,0.18),transparent_60%)]"
      />
      <Container className="relative py-28 text-center">
        <div className="flex justify-center">
          <Kicker>Error 404</Kicker>
        </div>
        <p className="ab-display-tight ab-gradient-text mt-6 text-[clamp(4.5rem,22vw,11rem)]">
          404
        </p>
        <h1 className="ab-display mt-2 text-[clamp(1.6rem,6vw,2.25rem)] text-white">
          This page took a wrong turn.
        </h1>
        <p className="ab-copy mx-auto mt-5 max-w-sm">
          The page you were looking for isn&apos;t here. Head back and start again.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="ghost">
            See services
          </Button>
        </div>
      </Container>
    </section>
  );
}
