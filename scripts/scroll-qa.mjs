/**
 * Captures viewport-sized frames stepping down each page, which is what the
 * user actually sees. Full-page screenshots lie about fixed headers and
 * scroll-driven pinned sections.
 *
 * Run: node scripts/scroll-qa.mjs [route] [desktop|mobile]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const OUT = path.resolve(import.meta.dirname, "..", ".preview", "scroll");

const ROUTES = { home: "/", services: "/services", studio: "/studio", contact: "/contact" };
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};

const onlyRoute = process.argv[2];
const onlyVp = process.argv[3];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  if (onlyVp && vpName !== onlyVp) continue;

  const ctx = await browser.newContext({ viewport, reducedMotion: "no-preference" });
  const page = await ctx.newPage();

  for (const [routeName, route] of Object.entries(ROUTES)) {
    if (onlyRoute && routeName !== onlyRoute) continue;

    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.round(viewport.height * 0.9);
    const frames = Math.ceil((height - viewport.height) / step) + 1;

    for (let i = 0; i < frames; i++) {
      const y = Math.min(i * step, height - viewport.height);
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      // let Lenis settle + in-view animations finish
      await page.waitForTimeout(950);

      const png = await page.screenshot();
      const name = `${vpName}-${routeName}-${String(i + 1).padStart(2, "0")}-y${y}.jpg`;
      await sharp(png)
        .resize({ width: Math.min(1100, viewport.width), withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(path.join(OUT, name));
    }

    console.log(`${vpName} ${route}  ${height}px  ->  ${frames} frames`);
  }

  await ctx.close();
}

await browser.close();
console.log(`\nFrames written to .preview/scroll/`);
