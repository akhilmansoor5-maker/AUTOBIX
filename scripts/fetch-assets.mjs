/**
 * Downloads the Google Maps + Instagram photos for AUTOBIX and normalises the
 * owner-supplied GALLERY shots into web-ready WebP in public/images.
 *
 * Run: node scripts/fetch-assets.mjs
 */
import { readFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "images");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

async function ensure(dir) {
  await mkdir(dir, { recursive: true });
}

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "image/*,*/*" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Writes a full-size WebP plus a blur placeholder data URI. */
async function emit(buf, dest, maxW) {
  const img = sharp(buf).rotate();
  const { width = 0, height = 0 } = await img.metadata();
  await img
    .resize({ width: Math.min(maxW, width || maxW), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
  const blur = await sharp(buf).rotate().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  return {
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

const manifest = {};

/* ---------- 1. Google Maps photos (requested at full resolution) ---------- */
const sources = JSON.parse(await readFile(path.join(ROOT, "scripts", "sources.json"), "utf8"));
await ensure(path.join(OUT, "maps"));

for (const [i, base] of sources.maps.entries()) {
  const name = `maps-${String(i + 1).padStart(2, "0")}`;
  const dest = path.join(OUT, "maps", `${name}.webp`);
  try {
    const buf = await get(`${base}=s0`);
    manifest[`maps/${name}`] = await emit(buf, dest, 2000);
    console.log(`ok   maps  ${name}`);
  } catch (err) {
    console.log(`FAIL maps  ${name}: ${err.message}`);
  }
}

/* ---------- 2. Instagram reel covers (640px square, feed strip only) ---------- */
await ensure(path.join(OUT, "instagram"));

for (const [i, url] of sources.instagram.entries()) {
  const name = `ig-${String(i + 1).padStart(2, "0")}`;
  const dest = path.join(OUT, "instagram", `${name}.webp`);
  try {
    const buf = await get(url);
    manifest[`instagram/${name}`] = await emit(buf, dest, 640);
    console.log(`ok   ig    ${name}`);
  } catch (err) {
    console.log(`FAIL ig    ${name}: ${err.message}`);
  }
}

/* ---------- 3. Owner-supplied GALLERY photos ---------- */
const GALLERY = path.join(ROOT, "GALLERY");
if (existsSync(GALLERY)) {
  await ensure(path.join(OUT, "shop"));
  const files = (await readdir(GALLERY)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  for (const [i, file] of files.entries()) {
    const name = `shop-${String(i + 1).padStart(2, "0")}`;
    const dest = path.join(OUT, "shop", `${name}.webp`);
    try {
      const buf = await readFile(path.join(GALLERY, file));
      manifest[`shop/${name}`] = { ...(await emit(buf, dest, 2000)), source: file };
      console.log(`ok   shop  ${name}  <- ${file}`);
    } catch (err) {
      console.log(`FAIL shop  ${name}: ${err.message}`);
    }
  }
}

await writeFile(
  path.join(ROOT, "lib", "image-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(`\nWrote lib/image-manifest.json (${Object.keys(manifest).length} entries)`);
