import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTicker } from "@/components/sections/ServiceTicker";
import { ServiceCatalogue } from "@/components/sections/ServiceCatalogue";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Car wash, detailing and polishing, interior deep clean, ceramic and graphene coating, paint protection film, cooling film and tinting, wheel alignment and balancing, premium accessories and body kits at AUTOBIX AUTO CARE, Theyyala.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Everything we do"
        title={"Nine services,\none address."}
        body="From a weekly wash to a multi-day coating job. Every service below is carried out in house at Theyyala — nothing gets sent elsewhere."
        image="/images/generated/bodykit.webp"
        imageAlt="A car fitted with a body kit inside the AUTOBIX workshop"
        objectPosition="center 55%"
      />
      <ServiceTicker />
      <ServiceCatalogue />
      <Process />
      <FinalCta
        heading="Not sure what it needs?"
        body="Send us a photo of the paint and tell us the model. We'll tell you honestly whether it needs a polish, a coating, or just a proper wash."
        image="/images/generated/graphene.webp"
        imageAlt="Water beading on a freshly coated car panel"
      />
    </>
  );
}
