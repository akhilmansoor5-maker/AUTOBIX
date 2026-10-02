import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServiceTicker } from "@/components/sections/ServiceTicker";
import { Intro } from "@/components/sections/Intro";
import { Pillars } from "@/components/sections/Pillars";
import { Correction } from "@/components/sections/Correction";
import { Comfort } from "@/components/sections/Comfort";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "AUTOBIX AUTO CARE — Car Wash, Detailing & Coating in Theyyala",
  description:
    "Premium car care in Theyyala, Nannambra. Washing, detailing, polishing, ceramic and graphene coating, paint protection film, cooling film, wheel alignment, accessories and body kits — with a coffee shop and salon on site.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceTicker />
      <Intro />
      <Pillars />
      <Correction />
      <Comfort />
      <Process />
      <Gallery limit={6} />
      <InstagramStrip />
      <FinalCta />
    </>
  );
}
