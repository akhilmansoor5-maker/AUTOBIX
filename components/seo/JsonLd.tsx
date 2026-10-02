import { services, site } from "@/lib/site";

const dayMap: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

/** Converts "8:30 am" / "7:30 pm" into the 24h format schema.org expects. */
function to24(time: string) {
  const [clock, meridiem] = time.split(" ");
  const [hRaw, m] = clock.split(":");
  let h = Number(hRaw);
  if (meridiem === "pm" && h !== 12) h += 12;
  if (meridiem === "am" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m}`;
}

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoRepair", "CarWash", "LocalBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        image: `${site.url}/brand/autobix-icon.png`,
        logo: `${site.url}/brand/autobix-icon.png`,
        telephone: site.phones.map((p) => p.display),
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        hasMap: site.maps.url,
        sameAs: [site.instagram.url, site.maps.url],
        openingHoursSpecification: site.hours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${dayMap[h.day]}`,
          opens: to24(h.open),
          closes: to24(h.close),
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.rating.value,
          reviewCount: site.rating.count,
          bestRating: 5,
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Coffee shop", value: true },
          { "@type": "LocationFeatureSpecification", name: "Beauty salon", value: true },
          {
            "@type": "LocationFeatureSpecification",
            name: "Air-conditioned waiting lounge",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Accessories showroom",
            value: true,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Car care services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.summary,
              category: s.group,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#business` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static and contains no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
