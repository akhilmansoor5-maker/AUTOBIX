"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { assetSrc } from "@/lib/asset-src";
import { navLinks, site, telHref, waHref } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 24));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        lifted || open
          ? "border-b border-line bg-black/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="relative z-10 shrink-0"
            aria-label={`${site.name} — home`}
            onClick={() => setOpen(false)}
          >
            <Image
              src={assetSrc("/brand/autobix-logo.png")}
              alt={site.name}
              width={1960}
              height={486}
              priority
              className="h-6 w-auto lg:h-7"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "ab-kicker relative px-4 py-2 transition-colors",
                    active ? "text-white" : "text-muted hover:text-white",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="ab-gradient-surface absolute inset-x-4 -bottom-px h-px"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={telHref()}
              className="ab-kicker text-muted transition-colors hover:text-white"
            >
              {site.phones[0].display}
            </a>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="ab-gradient-surface ab-kicker rounded-full px-5 py-2.5 text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a slot
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 -mr-2 flex size-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <motion.span
                className="absolute left-0 block h-[1.5px] w-6 bg-white"
                animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.span
                className="absolute left-0 block h-[1.5px] w-6 bg-white"
                animate={open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden lg:hidden"
          >
            <Container className="pb-8 pt-2">
              <nav className="flex flex-col" aria-label="Mobile">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-line py-4"
                    >
                      <span className="ab-display text-[1.75rem] text-white">{link.label}</span>
                      <span className="ab-kicker text-dim">
                        0{navLinks.indexOf(link) + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={telHref()}
                  className="ab-kicker flex items-center justify-center rounded-full border border-line-strong py-3.5 text-white"
                >
                  Call
                </a>
                <a
                  href={waHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-gradient-surface ab-kicker flex items-center justify-center rounded-full py-3.5 text-white"
                >
                  WhatsApp
                </a>
              </div>

              <p className="ab-kicker mt-5 text-dim">{site.address.short}</p>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
