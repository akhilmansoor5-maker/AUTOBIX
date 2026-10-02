# AUTOBIX AUTO CARE — website

Marketing site for **AUTOBIX AUTO CARE**, a car care centre at Theyyala, Nannambra, Kerala.

Live business details, services and imagery were taken from first-party sources: the
Google Maps listing, the on-site pylon sign, and the [@auto_bix_](https://www.instagram.com/auto_bix_/)
Instagram account.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Animation | Motion (`motion/react`) |
| Smooth scroll | Lenis |
| Images | `next/image` + build-time WebP and blur placeholders via sharp |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, pillars, paint-correction proof, amenities, process, gallery |
| `/services` | Full catalogue of nine services, grouped into four pillars |
| `/studio` | The Centre — facility, amenities, gallery |
| `/contact` | Visit & contact — address, phones, hours, map |

## Content

All copy, services, hours, phone numbers and image references live in a single file:

```
lib/site.ts
```

Change the business facts there and they propagate across every page, the footer, and the
`LocalBusiness` / `AutoRepair` JSON-LD in `components/seo/JsonLd.tsx`.

## Images

```
public/images/shop/        owner-supplied photos (shopfront, signage, bays)
public/images/maps/        photos from the Google Maps listing
public/images/instagram/   reel covers from @auto_bix_
public/images/generated/   art-direction stills — SEE NOTE BELOW
public/brand/              logo + icon derived from the supplied artwork
```

> **Note on `public/images/generated/`**
> These eleven images are AI-generated art direction placeholders used for the hero and
> service cards, because the available real photography is phone-shot and not hero grade.
> They depict representative car-care work, not AUTOBIX's own jobs. Replace them with real
> photography of the centre's work when it is available — drop a same-named `.webp` into the
> folder and re-run `node scripts/import-generated.mjs` (or update the paths in `lib/site.ts`).

### Asset scripts

```bash
node scripts/fetch-assets.mjs       # re-download Maps + Instagram photos, process GALLERY/
node scripts/brand-assets.mjs       # rebuild logo/icon and re-sample brand colours
node scripts/import-generated.mjs   # convert art-direction stills to WebP + blur data
```

Each writes dimensions and blur placeholders into `lib/image-manifest.json`, which
`lib/img.ts` reads so no image ever causes layout shift.

## Design tokens

Defined in `app/globals.css`. The palette was sampled directly from the illuminated
signage:

| Token | Value |
| --- | --- |
| `--ab-red` | `#fc0101` |
| `--ab-ember` | `#fd6f21` |
| `--ab-amber` | `#ffb020` |
| `--ab-black` | `#050506` |

Type: Archivo (display), Inter (body), JetBrains Mono (labels).

## Accessibility

- Every animation is gated behind `prefers-reduced-motion`, including Lenis.
- Skip link, focus-visible outlines, labelled icon buttons, `aria-current` nav state.
- Mobile dock exposes call / WhatsApp / directions as real links.

---

Made by [Akhil Mansoor](https://akhilmansoor.com)
