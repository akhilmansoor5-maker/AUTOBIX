/**
 * Samples the brand palette out of the AUTOBIX logo and produces web-ready
 * brand assets (trimmed logo + favicon/apple-touch source).
 *
 * Run: node scripts/brand-assets.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "GALLERY", "b524b7c0-1bd8-46bf-af51-0f5327a8e8f7.png");
const BRAND = path.join(ROOT, "public", "brand");
await mkdir(BRAND, { recursive: true });

const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

// Trim the surrounding black so the mark can be positioned precisely.
await sharp(SRC)
  .trim({ threshold: 20 })
  .png()
  .toFile(path.join(BRAND, "autobix-logo.png"));
const trimmed = await sharp(path.join(BRAND, "autobix-logo.png")).metadata();
console.log(`trimmed: ${trimmed.width}x${trimmed.height}`);

// Square icon on black for favicon / PWA / social.
await sharp(SRC)
  .trim({ threshold: 20 })
  .resize({ width: 880, fit: "inside" })
  .extend({
    top: 150,
    bottom: 150,
    left: 72,
    right: 72,
    background: "#000000",
  })
  .resize(512, 512, { fit: "contain", background: "#000000" })
  .png()
  .toFile(path.join(BRAND, "autobix-icon.png"));

// Sample the strongest saturated pixels to recover the real brand hues.
const { data, info } = await sharp(SRC)
  .trim({ threshold: 20 })
  .raw()
  .toBuffer({ resolveWithObject: true });

const buckets = new Map();
for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max < 70) continue; // skip the black field
  const sat = max === 0 ? 0 : (max - min) / max;
  if (sat < 0.45) continue; // skip white/grey type
  const key = `${Math.round(r / 16)},${Math.round(g / 16)},${Math.round(b / 16)}`;
  const cur = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0 };
  buckets.set(key, { r: cur.r + r, g: cur.g + g, b: cur.b + b, n: cur.n + 1 });
}

const hex = (n) => n.toString(16).padStart(2, "0");
const top = [...buckets.values()]
  .sort((a, b) => b.n - a.n)
  .slice(0, 8)
  .map((c) => {
    const r = Math.round(c.r / c.n);
    const g = Math.round(c.g / c.n);
    const b = Math.round(c.b / c.n);
    return { hex: `#${hex(r)}${hex(g)}${hex(b)}`, px: c.n };
  });

console.log("\ndominant saturated brand colours:");
for (const c of top) console.log(`  ${c.hex}  ${c.px} px`);
