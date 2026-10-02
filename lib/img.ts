import manifest from "./image-manifest.json";

type Entry = {
  width: number;
  height: number;
  blurDataURL: string;
  generated?: boolean;
  source?: string;
};

const entries = manifest as Record<string, Entry>;

/**
 * Looks up the build-time dimensions and blur placeholder for an image in
 * /public/images, so <Image> never needs `fill` guesswork and never flashes.
 *
 * `src` is the public path, e.g. "/images/generated/hero.webp".
 */
export function imgMeta(src: string) {
  const key = src.replace(/^\/images\//, "").replace(/\.webp$/, "");
  const entry = entries[key];
  if (!entry) return undefined;
  return {
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blurDataURL,
  };
}
