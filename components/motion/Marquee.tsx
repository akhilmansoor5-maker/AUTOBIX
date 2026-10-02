import { cn } from "@/lib/cn";

/**
 * CSS-driven infinite marquee. The track is duplicated and translated -50%,
 * so the loop is seamless with no JS and no layout thrash.
 */
export function Marquee({
  items,
  className,
  separator,
}: {
  items: readonly string[];
  className?: string;
  separator?: React.ReactNode;
}) {
  const dot = separator ?? (
    <span aria-hidden className="ab-gradient-surface size-1.5 shrink-0 rotate-45" />
  );

  const track = (
    <div className="ab-marquee flex shrink-0 items-center gap-7 pr-7 lg:gap-12 lg:pr-12">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-7 lg:gap-12">
          <span className="ab-kicker whitespace-nowrap text-chrome">{item}</span>
          {dot}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      aria-hidden
      role="presentation"
    >
      {/* Fade the edges into the page so the loop point is invisible. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent lg:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent lg:w-28" />
      {track}
    </div>
  );
}
