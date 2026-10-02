import { cn } from "@/lib/cn";

/**
 * Small technical label that sits above section headings. The leading dash
 * is drawn with the brand gradient so it reads as a signature detail.
 */
export function Kicker({
  children,
  className,
  tone = "gradient",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gradient" | "muted" | "white";
}) {
  return (
    <span className={cn("ab-kicker inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          tone === "gradient" && "ab-gradient-surface",
          tone === "muted" && "bg-white/25",
          tone === "white" && "bg-white/60",
        )}
      />
      <span
        className={
          tone === "muted" ? "text-muted" : tone === "white" ? "text-white/70" : "text-ember"
        }
      >
        {children}
      </span>
    </span>
  );
}
