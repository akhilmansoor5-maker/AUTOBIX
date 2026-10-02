import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jet = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Car Wash, Detailing & Coating in Theyyala`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "car wash Theyyala",
    "car detailing Nannambra",
    "ceramic coating Malappuram",
    "graphene coating Kerala",
    "paint protection film Tirurangadi",
    "wheel alignment Nannambra",
    "cooling film tinting Kerala",
    "car accessories Theyyala",
    "AUTOBIX AUTO CARE",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Premium car care in Theyyala`,
    description: site.description,
    images: [
      {
        url: "/images/generated/hero.webp",
        width: 1280,
        height: 720,
        alt: `${site.name} detailing bay`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Premium car care in Theyyala`,
    description: site.description,
    images: ["/images/generated/hero.webp"],
  },
  icons: {
    icon: "/brand/autobix-icon.png",
    apple: "/brand/autobix-icon.png",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${archivo.variable} ${jet.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-clip bg-black font-sans antialiased">
        <JsonLd />
        <SmoothScroll />
        <ScrollProgress />

        <a
          href="#main"
          className="ab-kicker sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-red focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main" className="w-full max-w-full overflow-x-clip">
          {children}
        </main>

        <Footer />

        {/* Keeps the dock from covering the end of the footer on mobile. */}
        <div aria-hidden className="h-[var(--dock-h)] lg:hidden" />
        <MobileDock />
      </body>
    </html>
  );
}
