"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "whatsapp" | "quiet";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  icon?: React.ReactNode;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 lg:px-7";

const variants: Record<Variant, string> = {
  primary: "ab-gradient-surface text-white",
  ghost: "border border-line-strong text-white hover:border-white/40",
  whatsapp: "bg-[#25D366] text-[#04301a]",
  quiet: "border border-line text-chrome hover:text-white hover:border-line-strong",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  ariaLabel,
  icon,
}: Props) {
  const reduce = useReducedMotion();
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);

  const inner = (
    <>
      {/* Sheen that sweeps across on hover. */}
      {!reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {icon && <span className="relative shrink-0">{icon}</span>}
    </>
  );

  const classes = cn(base, variants[variant], className);
  const hover = reduce ? undefined : { y: -2 };
  const tap = reduce ? undefined : { scale: 0.975 };

  if (isExternal) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        whileHover={hover}
        whileTap={tap}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div className="inline-flex" whileHover={hover} whileTap={tap}>
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {inner}
      </Link>
    </motion.div>
  );
}
