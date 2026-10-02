import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { navLinks, site, telHref, waHref } from "@/lib/site";

const serviceLinks = [
  { label: "Car wash", href: "/services#car-wash" },
  { label: "Detailing & polishing", href: "/services#detailing" },
  { label: "Ceramic & graphene", href: "/services#ceramic" },
  { label: "Paint protection film", href: "/services#ppf" },
  { label: "Cooling film & tinting", href: "/services#cooling-film" },
  { label: "Wheel alignment", href: "/services#alignment" },
  { label: "Accessories & body kits", href: "/services#accessories" },
];

export function Footer() {
  return (
    <footer className="ab-grain relative overflow-hidden border-t border-line bg-void">
      {/* Oversized wordmark bleeding off the bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-4 select-none text-center lg:-bottom-10"
      >
        <span className="ab-display-tight block text-[22vw] leading-none text-white/[0.035]">
          AUTOBIX
        </span>
      </div>

      <Container className="relative pb-12 pt-16 lg:pb-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-8">
          <div>
            <Image
              src="/brand/autobix-logo.png"
              alt={site.name}
              width={1960}
              height={486}
              className="h-7 w-auto"
            />
            <p className="ab-copy mt-5 max-w-xs">
              A full car care centre in Theyyala — wash, detail, coat, protect, align and
              upgrade, with a coffee shop and salon on site.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Instagram`}
                className="flex size-10 items-center justify-center rounded-full border border-line text-chrome transition-colors hover:border-line-strong hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.23 1 .5 1.5.95.45.45.72.9.95 1.5.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.23.6-.5 1-.95 1.5-.45.45-.9.72-1.5.95-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.23-1-.5-1.5-.95-.45-.45-.72-.9-.95-1.5-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.23-.6.5-1 .95-1.5.45-.45.9-.72 1.5-.95.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.98c-3.14 0-3.5.01-4.73.07-.92.04-1.4.19-1.7.31-.36.14-.6.3-.86.56-.26.26-.42.5-.56.86-.12.3-.27.78-.31 1.7-.06 1.23-.07 1.6-.07 4.73s.01 3.5.07 4.73c.4.92.19 1.4.31 1.7.14.36.3.6.56.86.26.26.5.42.86.56.3.12.78.27 1.7.31 1.23.06 1.6.07 4.73.07s3.5-.01 4.73-.07c.92-.04 1.4-.19 1.7-.31.36-.14.6-.3.86-.56.26-.26.42-.5.56-.86.12-.3.27-.78.31-1.7.06-1.23.07-1.6.07-4.73s-.01-3.5-.07-4.73c-.04-.92-.19-1.4-.31-1.7a2.3 2.3 0 0 0-.56-.86 2.3 2.3 0 0 0-.86-.56c-.3-.12-.78-.27-1.7-.31-1.23-.06-1.6-.07-4.73-.07Zm0 3.37a4.45 4.45 0 1 1 0 8.9 4.45 4.45 0 0 1 0-8.9Zm0 7.34a2.89 2.89 0 1 0 0-5.78 2.89 2.89 0 0 0 0 5.78Zm5.66-7.53a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0Z" />
                </svg>
              </a>
              <a
                href={waHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${site.name}`}
                className="flex size-10 items-center justify-center rounded-full border border-line text-chrome transition-colors hover:border-line-strong hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22.5l5.7-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.9a8 8 0 1 1-4.06 14.9l-.33-.2-3.1.82.83-3-.2-.33A8 8 0 0 1 12.04 3.9Zm4.6 10.1c-.07-.12-.26-.2-.55-.34-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.73.9-.89 1.08-.16.19-.32.2-.6.07a6.6 6.6 0 0 1-1.93-1.19 7.3 7.3 0 0 1-1.34-1.67c-.14-.28-.01-.43.13-.57.13-.14.28-.33.42-.5.14-.16.19-.28.28-.46.1-.19.05-.35-.02-.49-.07-.14-.63-1.5-.86-2.05-.18-.44-.37-.44-.51-.45h-.44c-.15 0-.4.06-.6.28-.21.23-.8.78-.8 1.9 0 1.11.81 2.19.92 2.34.12.15 1.6 2.56 3.9 3.49.55.23.97.37 1.31.47.55.17 1.05.15 1.45.09.44-.07 1.37-.56 1.56-1.1.2-.55.2-1.02.13-1.12Z" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Footer pages">
            <h2 className="ab-kicker text-dim">Pages</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-chrome transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h2 className="ab-kicker text-dim">Services</h2>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-chrome transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="ab-kicker text-dim">Visit</h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-chrome">
              <a
                href={site.maps.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block max-w-[15rem] transition-colors hover:text-white"
              >
                {site.address.full}
              </a>
              <div className="space-y-1">
                {site.phones.map((p) => (
                  <a
                    key={p.raw}
                    href={telHref(p.raw)}
                    className="block transition-colors hover:text-white"
                  >
                    {p.display}
                    <span className="ml-2 text-xs text-dim">{p.label}</span>
                  </a>
                ))}
              </div>
              <div className="space-y-1 text-muted">
                <p>{site.hoursSummary}</p>
                <p>{site.hoursSunday}</p>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 lg:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <p className="ab-kicker text-dim">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="ab-kicker hidden text-dim lg:block">{site.address.short}</p>
          <p className="ab-kicker text-dim">
            Made by{" "}
            <a
              href="https://akhilmansoor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chrome underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
            >
              Akhil Mansoor
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
