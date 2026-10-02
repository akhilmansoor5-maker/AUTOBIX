/**
 * Single source of truth for AUTOBIX AUTO CARE.
 *
 * Every business fact below was taken from first-party sources:
 *  - Google Maps listing "Autobix autocare Theyyalingal"
 *  - the on-site pylon sign (public/images/maps/maps-03.webp)
 *  - the Instagram bio for @auto_bix_
 */

export const site = {
  name: "AUTOBIX AUTO CARE",
  shortName: "AUTOBIX",
  legalName: "Autobix Autocare Theyyalingal",
  tagline: "Premium car care, Theyyala.",
  description:
    "AUTOBIX AUTO CARE in Theyyala, Nannambra is a full-service car care destination — washing, detailing and polishing, ceramic and graphene coating, paint protection film, cooling film, wheel alignment and premium accessories. With a coffee shop and salon on site, waiting is part of the experience.",

  url: "https://autobixautocare.com",

  address: {
    street: "Theyyala, Theyyalingal",
    locality: "Nannambra",
    region: "Kerala",
    postalCode: "676320",
    country: "IN",
    full: "Theyyala, Theyyalingal, Thayyalingal, Nannambra, Kerala 676320",
    short: "Theyyala, Nannambra, Kerala",
  },

  geo: { lat: 10.9921247, lng: 75.9151749 },
  plusCode: "XWR8+R3 Nannambra, Keralam",

  phones: [
    { label: "Service desk", display: "+91 81378 33933", raw: "+918137833933" },
    { label: "Accessories", display: "+91 81378 44944", raw: "+918137844944" },
  ],

  whatsapp: "918137833933",

  hours: [
    { day: "Monday", open: "8:30 am", close: "7:30 pm" },
    { day: "Tuesday", open: "8:30 am", close: "7:30 pm" },
    { day: "Wednesday", open: "8:30 am", close: "7:30 pm" },
    { day: "Thursday", open: "8:30 am", close: "7:30 pm" },
    { day: "Friday", open: "8:30 am", close: "7:30 pm" },
    { day: "Saturday", open: "8:30 am", close: "7:30 pm" },
    { day: "Sunday", open: "8:30 am", close: "1:00 pm" },
  ],
  hoursSummary: "Mon – Sat · 8:30 am – 7:30 pm",
  hoursSunday: "Sunday · 8:30 am – 1:00 pm",

  instagram: { handle: "@auto_bix_", url: "https://www.instagram.com/auto_bix_/" },
  maps: {
    url: "https://maps.app.goo.gl/SE8KCmGpvg6NGk986",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=10.9921247,75.9151749&destination_place_id=ChIJOZsDOCOzpzsRhi2o_myuVf0",
  },

  rating: { value: 5.0, count: 1 },
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "The Centre", href: "/studio" },
  { label: "Visit", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Service pillars — the four reasons a car comes in                   */
/* ------------------------------------------------------------------ */

export type Pillar = {
  id: string;
  index: string;
  title: string;
  lead: string;
  body: string;
  items: readonly string[];
  image: string;
  imageAlt: string;
};

export const pillars: readonly Pillar[] = [
  {
    id: "wash",
    index: "01",
    title: "Wash & Detail",
    lead: "The weekly reset.",
    body: "Foam wash, underbody rinse, interior deep clean and a machine polish that brings the gloss back. Separate tools and towels for paint, glass, wheels and cabin — nothing cross-contaminates.",
    items: [
      "Foam wash & underbody",
      "Interior deep clean",
      "Machine polishing",
      "Headlight restoration",
      "Engine bay cleaning",
    ],
    image: "/images/generated/wash.webp",
    imageAlt: "Foam-covered car under the wash bay lights at AUTOBIX AUTO CARE",
  },
  {
    id: "protect",
    index: "02",
    title: "Coat & Protect",
    lead: "Make it last.",
    body: "Ceramic and graphene coatings for depth and chemical resistance, paint protection film where the road throws the worst at you, and cooling film that takes the heat out of the cabin.",
    items: [
      "Ceramic coating",
      "Graphene coating",
      "Paint protection film (PPF)",
      "Cooling film & tinting",
      "Teflon treatment",
    ],
    image: "/images/generated/protect.webp",
    imageAlt: "Technician applying ceramic coating to a dark car panel",
  },
  {
    id: "wheels",
    index: "03",
    title: "Wheels & Alignment",
    lead: "Straight, balanced, quiet.",
    body: "Computerised wheel alignment and balancing on calibrated equipment. If the steering pulls, the tyres feather or the cabin hums at speed, this is where it gets fixed.",
    items: [
      "Computerised alignment",
      "Wheel balancing",
      "Tyre rotation & fitting",
      "Alloy wheel fitment",
      "Nitrogen inflation",
    ],
    image: "/images/generated/wheels.webp",
    imageAlt: "Alloy wheel on the alignment rig inside the AUTOBIX workshop",
  },
  {
    id: "upgrade",
    index: "04",
    title: "Accessories & Kits",
    lead: "Make it yours.",
    body: "A full accessories showroom on site — alloys, 7D floor mats, seat covers, Android stereo and CarPlay units, ambient lighting and body kits for every popular model.",
    items: [
      "Alloy wheels",
      "7D floor mats & seat covers",
      "Android stereo / CarPlay",
      "Ambient & auxiliary lighting",
      "Body kits — all models",
    ],
    image: "/images/maps/maps-02.webp",
    imageAlt: "The AUTOBIX accessories showroom stocked with mats, wipers and care products",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Full service catalogue (services page)                              */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  group: string;
  title: string;
  summary: string;
  detail: readonly string[];
  duration: string;
  image: string;
  imageAlt: string;
};

export const services: readonly Service[] = [
  {
    id: "car-wash",
    group: "Wash & Detail",
    title: "Car Wash",
    summary:
      "A proper hand wash, not a drive-through. pH-neutral foam, two-bucket method, microfibre dry and a dressed finish on tyres and trim.",
    detail: [
      "Pre-rinse and snow-foam soak",
      "Two-bucket contact wash with grit guards",
      "Wheel faces, barrels and arches",
      "Underbody rinse",
      "Glass, door shuts and tyre dressing",
    ],
    duration: "45 – 60 min",
    image: "/images/generated/wash.webp",
    imageAlt: "Snow foam being applied to a car at AUTOBIX AUTO CARE",
  },
  {
    id: "detailing",
    group: "Wash & Detail",
    title: "Detailing & Polishing",
    summary:
      "Decontamination and machine correction that removes swirls and oxidation, then refines the paint until reflections go sharp.",
    detail: [
      "Iron fallout and tar removal",
      "Clay bar decontamination",
      "Compounding and multi-stage polish",
      "Paint depth checked before correction",
      "Protected with a sealant on completion",
    ],
    duration: "4 – 8 hrs",
    image: "/images/generated/detail.webp",
    imageAlt: "Dual-action polisher refining a glossy black bonnet",
  },
  {
    id: "interior",
    group: "Wash & Detail",
    title: "Interior Deep Clean",
    summary:
      "Seats, carpets, roof lining and vents taken back to clean. Extraction on fabric, conditioning on leather, and an AC treatment that kills the smell at the source.",
    detail: [
      "Full vacuum including under seats",
      "Fabric shampoo and hot-water extraction",
      "Leather clean and condition",
      "Dashboard, console and vent detailing",
      "AC disinfection and odour treatment",
    ],
    duration: "3 – 5 hrs",
    image: "/images/generated/interior.webp",
    imageAlt: "Clean detailed car interior with conditioned leather seats",
  },
  {
    id: "ceramic",
    group: "Coat & Protect",
    title: "Ceramic Coating",
    summary:
      "A hard, hydrophobic layer bonded to corrected paint. Deeper gloss, far easier washing, and real resistance to Kerala's sun and monsoon.",
    detail: [
      "Mandatory paint correction first",
      "Panel-wipe and IPA prep",
      "Multi-layer application, controlled cure",
      "Glass and alloy coating available",
      "Aftercare guidance on handover",
    ],
    duration: "1 – 2 days",
    image: "/images/generated/protect.webp",
    imageAlt: "Ceramic coating being levelled on a dark car panel",
  },
  {
    id: "graphene",
    group: "Coat & Protect",
    title: "Graphene Coating",
    summary:
      "A step beyond ceramic — better heat dispersion, less water spotting and a slicker, longer-lasting surface on dark paint.",
    detail: [
      "Graphene-infused formulation",
      "Reduced water spotting in hard-water areas",
      "Improved heat dissipation",
      "Slicker, candy-like finish",
      "Best paired with full correction",
    ],
    duration: "1 – 2 days",
    image: "/images/generated/graphene.webp",
    imageAlt: "Water beading tightly on a freshly graphene-coated surface",
  },
  {
    id: "ppf",
    group: "Coat & Protect",
    title: "Paint Protection Film",
    summary:
      "Self-healing urethane film over the panels that take the hits. Invisible once fitted, and it keeps the paint underneath factory-fresh.",
    detail: [
      "Full front, partial front or full body",
      "Self-healing top coat",
      "Wrapped edges, no visible seams",
      "Gloss or matte finish",
      "Protects resale value",
    ],
    duration: "2 – 4 days",
    image: "/images/generated/ppf.webp",
    imageAlt: "Paint protection film being squeegeed onto a car bonnet",
  },
  {
    id: "cooling-film",
    group: "Coat & Protect",
    title: "Cooling Film & Tinting",
    summary:
      "Heat-rejecting window film that drops cabin temperature, cuts glare and blocks UV — fitted to legal visible-light limits.",
    detail: [
      "High infrared-rejection film",
      "99% UV block",
      "Noticeably cooler cabin, less AC load",
      "Windscreen and sunroof options",
      "RTO-compliant VLT on side glass",
    ],
    duration: "2 – 3 hrs",
    image: "/images/generated/film.webp",
    imageAlt: "Window film being applied to a car's side glass",
  },
  {
    id: "alignment",
    group: "Wheels & Tyres",
    title: "Wheel Alignment & Balancing",
    summary:
      "Computerised four-wheel alignment and balancing. Fixes steering pull, uneven tyre wear and vibration at highway speed.",
    detail: [
      "Four-wheel computerised alignment",
      "Camber, caster and toe set to spec",
      "Dynamic wheel balancing",
      "Printed before/after report",
      "Tyre wear inspection included",
    ],
    duration: "45 – 90 min",
    image: "/images/generated/wheels.webp",
    imageAlt: "Wheel alignment sensor clamped to an alloy wheel",
  },
  {
    id: "accessories",
    group: "Upgrade",
    title: "Premium Accessories",
    summary:
      "A stocked showroom, not a catalogue order. Alloys, 7D mats, seat covers, Android stereo and CarPlay units, cameras and lighting — fitted in house.",
    detail: [
      "Alloy wheels and wheel caps",
      "7D floor mats and seat covers",
      "Android stereo, CarPlay, reverse cameras",
      "Ambient and auxiliary lighting",
      "Fitted and tested before handover",
    ],
    duration: "Same day",
    image: "/images/maps/maps-02.webp",
    imageAlt: "Shelves of car accessories and care products in the AUTOBIX showroom",
  },
  {
    id: "body-kits",
    group: "Upgrade",
    title: "Body Kits — All Models",
    summary:
      "Bumper lips, spoilers, cladding, grilles and full conversion kits for popular Indian models, finished and colour-matched.",
    detail: [
      "Front lips, spoilers and diffusers",
      "Body cladding and side skirts",
      "Grille and lighting upgrades",
      "Colour-matched paintwork",
      "Fitment on all popular models",
    ],
    duration: "2 – 5 days",
    image: "/images/generated/bodykit.webp",
    imageAlt: "Body kit components fitted to a car in the workshop",
  },
] as const;

export const serviceGroups = [
  "Wash & Detail",
  "Coat & Protect",
  "Wheels & Tyres",
  "Upgrade",
] as const;

/* ------------------------------------------------------------------ */
/* On-site amenities — the differentiator                              */
/* ------------------------------------------------------------------ */

export const amenities = [
  {
    id: "coffee",
    title: "Coffee Shop",
    body: "Proper coffee on site. Order, sit down and watch your car being worked on through the glass.",
  },
  {
    id: "salon",
    title: "Beauty Salon",
    body: "A salon in the same building. Book an appointment for the same slot and get two things done in one trip.",
  },
  {
    id: "lounge",
    title: "Air-conditioned Lounge",
    body: "Sofas, AC and a television facing the bays — a comfortable place to wait rather than a plastic chair outside.",
  },
  {
    id: "showroom",
    title: "Accessories Showroom",
    body: "Browse alloys, mats, covers and audio while you wait, and have it fitted before you leave.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const process = [
  {
    step: "01",
    title: "Tell us the car",
    body: "Message us on WhatsApp with your model and what's bothering you. We'll tell you what it actually needs.",
  },
  {
    step: "02",
    title: "Inspection on arrival",
    body: "We walk the car with you under light, point out the swirls, chips and wear, and agree the work before anything starts.",
  },
  {
    step: "03",
    title: "Into the bay",
    body: "Your car goes into a dedicated bay with the right tools for the job. You wait in the lounge, or over a coffee.",
  },
  {
    step: "04",
    title: "Checked under light",
    body: "Finished work is inspected under inspection lighting, not daylight. If it isn't right, it goes back.",
  },
  {
    step: "05",
    title: "Handover & aftercare",
    body: "We show you what changed and how to keep it that way — what to use, what to avoid, when to come back.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: services.length, suffix: "", label: "Services under one roof" },
  { value: 7, suffix: "", label: "Days open every week" },
  { value: 11, suffix: "hrs", label: "Open Monday to Saturday" },
  { value: 100, suffix: "%", label: "Work checked before handover" },
] as const;

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export const gallery = [
  {
    src: "/images/maps/maps-01.webp",
    alt: "The AUTOBIX AUTO CARE centre in Theyyala on opening day, bays full and the forecourt packed",
    caption: "Theyyala · opening day",
    span: "wide",
  },
  {
    src: "/images/shop/shop-08.webp",
    alt: "The illuminated AUTOBIX AUTO CARE sign glowing red and white at night",
    caption: "After dark",
    span: "tall",
  },
  {
    src: "/images/maps/maps-02.webp",
    alt: "Inside the AUTOBIX accessories showroom",
    caption: "Accessories showroom",
    span: "normal",
  },
  {
    src: "/images/shop/shop-01.webp",
    alt: "Bay 01 at AUTOBIX with a car being detailed under the canopy",
    caption: "Bay 01",
    span: "normal",
  },
  {
    src: "/images/maps/maps-05.webp",
    alt: "The air-conditioned customer lounge at AUTOBIX",
    caption: "The lounge",
    span: "normal",
  },
  {
    src: "/images/shop/shop-03.webp",
    alt: "The accessories and lounge frontage at AUTOBIX AUTO CARE",
    caption: "Frontage",
    span: "wide",
  },
  {
    src: "/images/maps/maps-03.webp",
    alt: "The AUTOBIX pylon sign listing every service offered at the centre",
    caption: "Everything we do",
    span: "tall",
  },
  {
    src: "/images/shop/shop-05.webp",
    alt: "Two-wheeler wash bay at AUTOBIX AUTO CARE",
    caption: "Two-wheeler bay",
    span: "normal",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Instagram strip (reel covers pulled from @auto_bix_)                */
/* ------------------------------------------------------------------ */

export const instagramPosts = [
  { src: "/images/instagram/ig-02.webp", alt: "Black Mahindra Thar detailed at AUTOBIX" },
  { src: "/images/instagram/ig-11.webp", alt: "SUV after a wash at AUTOBIX" },
  { src: "/images/instagram/ig-04.webp", alt: "Car finished and ready for handover at AUTOBIX" },
  { src: "/images/instagram/ig-05.webp", alt: "Detailing work in progress at AUTOBIX" },
  { src: "/images/instagram/ig-08.webp", alt: "Sedan treated at AUTOBIX AUTO CARE" },
  { src: "/images/instagram/ig-10.webp", alt: "Car floor mats available at AUTOBIX" },
  { src: "/images/instagram/ig-09.webp", alt: "Interior and dashboard detail at AUTOBIX" },
  { src: "/images/instagram/ig-07.webp", alt: "CarPlay and Android stereo fitment at AUTOBIX" },
] as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function waHref(message?: string) {
  const text = message ?? `Hi AUTOBIX, I'd like to book my car in.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telHref(raw: string = site.phones[0].raw) {
  return `tel:${raw}`;
}
