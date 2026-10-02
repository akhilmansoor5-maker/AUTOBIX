import Image from "next/image";
import { cn } from "@/lib/cn";
import { assetSrc } from "@/lib/asset-src";
import { imgMeta } from "@/lib/img";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Render as an absolutely-positioned cover layer inside a relative parent. */
  cover?: boolean;
  objectPosition?: string;
};

/**
 * Thin wrapper over next/image that pulls width/height and the blur
 * placeholder out of the build-time manifest, so every photo on the site
 * fades in from its own colours instead of popping in.
 */
export function Img({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  cover = true,
  objectPosition,
}: Props) {
  const meta = imgMeta(src);

  if (cover) {
    return (
      <Image
        src={assetSrc(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={meta ? "blur" : "empty"}
        blurDataURL={meta?.blurDataURL}
        className={cn("object-cover", className)}
        style={objectPosition ? { objectPosition } : undefined}
      />
    );
  }

  return (
    <Image
      src={assetSrc(src)}
      alt={alt}
      width={meta?.width ?? 1600}
      height={meta?.height ?? 1200}
      sizes={sizes}
      priority={priority}
      placeholder={meta ? "blur" : "empty"}
      blurDataURL={meta?.blurDataURL}
      className={className}
    />
  );
}
