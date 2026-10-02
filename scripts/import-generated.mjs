/**
 * Converts the generated art direction stills into web-ready WebP under
 * public/images/generated, and records dimensions + blur placeholders.
 *
 * Run: node scripts/import-generated.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(
  "C:",
  "Users",
  "USER",
  ".cursor",
  "projects",
  "c-Users-USER-OneDrive-Documents-Vibe-Coded-Projects-AUTOBIX",
  "assets",
);
const OUT = path.join(ROOT, "public", "images", "generated");
await mkdir(OUT, { recursive: true });

const map = {
  "ab-hero.jpg": "hero",
  "ab-wash.jpg": "wash",
  "ab-protect.jpg": "protect",
  "ab-detail.jpg": "detail",
  "ab-interior.jpg": "interior",
  "ab-graphene.jpg": "graphene",
  "ab-ppf.jpg": "ppf",
  "ab-film.jpg": "film",
  "ab-wheels.jpg": "wheels",
  "ab-bodykit.jpg": "bodykit",
  "ab-split.jpg": "split",
};

const manifestPath = path.join(ROOT, "lib", "image-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

for (const [file, name] of Object.entries(map)) {
  const buf = await readFile(path.join(SRC, file));
  const { width = 0, height = 0 } = await sharp(buf).metadata();

  await sharp(buf)
    .resize({ width: Math.min(1920, width), withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, `${name}.webp`));

  const blur = await sharp(buf).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();

  manifest[`generated/${name}`] = {
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    generated: true,
  };
  console.log(`ok  generated/${name}  ${width}x${height}`);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nmanifest now has ${Object.keys(manifest).length} entries`);
