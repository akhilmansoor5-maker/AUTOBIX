/** Prefixes a public-folder path with /AUTOBIX when the Pages build sets it. */
export function assetSrc(src: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || src.startsWith("http://") || src.startsWith("https://") || src.startsWith(base + "/")) {
    return src;
  }
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}
