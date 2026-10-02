/**
 * Visual QA harness. Screenshots every page at desktop and mobile, and
 * measures real layout defects in the DOM:
 *
 *  - headings left invisible by a reveal animation that never fired
 *  - dead vertical space between a section's content and its edges
 *  - content tucked under the fixed header
 *  - horizontal overflow
 *  - console errors
 *
 * Run (dev server must be up):  node scripts/visual-qa.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const OUT = path.resolve(import.meta.dirname, "..", ".preview", "qa");
await mkdir(OUT, { recursive: true });

const pages = ["/", "/services", "/studio", "/contact"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

/** Runs in the page: reports concrete layout defects. */
function audit() {
  const out = { headings: [], sections: [], overflow: null, underHeader: [] };

  const navH = 64;

  // 1. Any heading that is effectively invisible (clipped by its mask).
  document.querySelectorAll("h1, h2, h3").forEach((h) => {
    const text = (h.textContent || "").trim().replace(/\s+/g, " ");
    if (!text) return;
    const r = h.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;

    // The reveal wraps each word in an overflow-hidden span; if the inner
    // span is still translated down, nothing is actually painted.
    const inner = h.querySelectorAll("span > span");
    let hidden = 0;
    let total = 0;
    inner.forEach((s) => {
      const st = getComputedStyle(s);
      if (st.display !== "inline-block") return;
      total++;
      const m = new DOMMatrixReadOnly(st.transform);
      if (m.f > 2 || Number(st.opacity) < 0.05) hidden++;
    });
    if (total > 0 && hidden === total) {
      out.headings.push({ text: text.slice(0, 60), hiddenWords: hidden, total });
    }
  });

  // 2. Dead space: compare each section's box with the union of its children.
  document.querySelectorAll("section").forEach((sec) => {
    const sr = sec.getBoundingClientRect();
    if (sr.height < 80) return;

    let top = Infinity;
    let bottom = -Infinity;
    const walk = (el) => {
      for (const c of el.children) {
        const cs = getComputedStyle(c);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        // Decorative scrims are empty and must not count as filled space, but
        // absolutely-positioned photos (hero backdrops, fill-mode next/image,
        // full-bleed rails) very much do.
        if (cs.position === "fixed") continue;
        const cr = c.getBoundingClientRect();
        const hasText = (c.textContent || "").trim().length > 0;
        const isMedia = /^(IMG|SVG|IFRAME|VIDEO)$/.test(c.tagName) || !!c.querySelector("img, iframe, video");
        if (cr.height > 0 && (hasText || isMedia)) {
          top = Math.min(top, cr.top);
          bottom = Math.max(bottom, cr.bottom);
        }
        walk(c);
      }
    };
    walk(sec);
    if (top === Infinity) return;

    const label =
      (sec.querySelector("h1, h2")?.textContent || "").trim().replace(/\s+/g, " ").slice(0, 44) ||
      sec.className.split(" ").slice(0, 2).join(".");

    out.sections.push({
      label,
      height: Math.round(sr.height),
      padTop: Math.round(top - sr.top),
      padBottom: Math.round(sr.bottom - bottom),
    });
  });

  // 3. Content sitting under the fixed header.
  document.querySelectorAll("h1").forEach((h) => {
    const r = h.getBoundingClientRect();
    const absTop = r.top + window.scrollY;
    if (absTop < navH && r.height > 0) {
      out.underHeader.push({
        text: (h.textContent || "").trim().slice(0, 50),
        top: Math.round(absTop),
      });
    }
  });

  // 4. Horizontal overflow.
  const de = document.documentElement;
  out.overflow = {
    scrollW: de.scrollWidth,
    clientW: de.clientWidth,
    overflows: de.scrollWidth > de.clientWidth + 1,
  };

  return out;
}

const browser = await chromium.launch();
const report = [];

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    // Let every reveal animation run.
    reducedMotion: "no-preference",
  });

  for (const route of pages) {
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") errors.push(`[${m.type()}] ${m.text()}`);
    });
    page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));

    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 60_000 });

    // Scroll the whole page so every in-view animation and lazy image fires.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.6);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 600));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    const slug = route === "/" ? "home" : route.replace(/\//g, "");
    const result = await page.evaluate(audit);

    await page.screenshot({
      path: path.join(OUT, `${vp.name}-${slug}-full.png`),
      fullPage: true,
    });
    await page.screenshot({ path: path.join(OUT, `${vp.name}-${slug}-top.png`) });

    const height = await page.evaluate(() => document.body.scrollHeight);
    report.push({ viewport: vp.name, route, height, errors, ...result });
    await page.close();
  }

  await context.close();
}

await browser.close();

/* ---------------- print a readable report ---------------- */
const line = (s = "") => console.log(s);

for (const r of report) {
  line(`\n${"=".repeat(74)}`);
  line(`${r.viewport.toUpperCase()}  ${r.route}   page height ${r.height}px`);
  line("=".repeat(74));

  if (r.headings.length) {
    line("\n  !! INVISIBLE HEADINGS (reveal never fired):");
    for (const h of r.headings) line(`     - "${h.text}"  (${h.hiddenWords}/${h.total} words hidden)`);
  } else {
    line("\n  headings: all visible");
  }

  if (r.underHeader.length) {
    line("\n  !! H1 UNDER FIXED HEADER:");
    for (const u of r.underHeader) line(`     - "${u.text}" at top=${u.top}px`);
  }

  if (r.overflow?.overflows) {
    line(`\n  !! HORIZONTAL OVERFLOW: scrollWidth ${r.overflow.scrollW} > clientWidth ${r.overflow.clientW}`);
  }

  const bad = r.sections.filter((s) => s.padTop > 170 || s.padBottom > 170);
  if (bad.length) {
    line("\n  !! DEAD VERTICAL SPACE (>170px of empty padding):");
    for (const s of bad) {
      const parts = [];
      if (s.padTop > 170) parts.push(`top ${s.padTop}px`);
      if (s.padBottom > 170) parts.push(`bottom ${s.padBottom}px`);
      line(`     - "${s.label}"  h=${s.height}px  →  ${parts.join(", ")}`);
    }
  } else {
    line("\n  spacing: no section has >170px of dead padding");
  }

  if (r.errors.length) {
    line("\n  console:");
    for (const e of [...new Set(r.errors)].slice(0, 12)) line(`     ${e}`);
  }
}

await writeFile(path.join(OUT, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
line(`\n\nScreenshots + report.json written to .preview/qa/\n`);
