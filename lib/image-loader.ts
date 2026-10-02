/**
 * GitHub Pages serves the site from /<repo>/, and `next/image` with a static
 * export does not prefix that itself. Locally the prefix is empty.
 */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}
