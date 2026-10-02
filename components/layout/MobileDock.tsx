"use client";

import { site, telHref, waHref } from "@/lib/site";

const actions = [
  {
    label: "Call",
    href: telHref(),
    icon: (
      <path d="M6.6 10.8c1.2 2.3 3.1 4.2 5.4 5.4l1.8-1.8c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1A16 16 0 0 1 2 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1l-1.8 1.8Z" />
    ),
  },
  {
    label: "WhatsApp",
    href: waHref(),
    primary: true,
    icon: (
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22.5l5.7-1.5A9.9 9.9 0 1 0 12.04 2Zm4.6 12c-.07-.12-.26-.2-.55-.34-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.73.9-.89 1.08-.16.19-.32.2-.6.07a6.6 6.6 0 0 1-1.93-1.19 7.3 7.3 0 0 1-1.34-1.67c-.14-.28-.01-.43.13-.57.13-.14.28-.33.42-.5.14-.16.19-.28.28-.46.1-.19.05-.35-.02-.49-.07-.14-.63-1.5-.86-2.05-.18-.44-.37-.44-.51-.45h-.44c-.15 0-.4.06-.6.28-.21.23-.8.78-.8 1.9 0 1.11.81 2.19.92 2.34.12.15 1.6 2.56 3.9 3.49.55.23.97.37 1.31.47.55.17 1.05.15 1.45.09.44-.07 1.37-.56 1.56-1.1.2-.55.2-1.02.13-1.12Z" />
    ),
  },
  {
    label: "Directions",
    href: site.maps.directions,
    icon: (
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    ),
  },
];

/**
 * Bottom action bar on mobile. For a walk-in business the three things a
 * visitor actually wants are call, message and directions — so they stay
 * permanently within thumb reach.
 */
export function MobileDock() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-black/90 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <nav aria-label="Quick actions" className="grid grid-cols-3">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.href.startsWith("http") ? "_blank" : undefined}
            rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center justify-center gap-1.5 py-3"
          >
            <span
              className={
                action.primary
                  ? "ab-gradient-surface flex size-9 items-center justify-center rounded-full text-white"
                  : "flex size-9 items-center justify-center rounded-full border border-line text-chrome"
              }
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                {action.icon}
              </svg>
            </span>
            <span className="ab-kicker text-[9px] text-muted">{action.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
