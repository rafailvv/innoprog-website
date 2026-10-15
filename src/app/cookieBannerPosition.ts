type Rectangle = Pick<DOMRect, "left" | "right" | "top" | "bottom" | "height">;

// Keep the existing notice dimensions and default position unless it covers CTA.
export function cookieBannerBottom(banner: Rectangle, cta: Rectangle, viewportHeight: number): number | undefined {
  const overlaps = banner.left < cta.right && banner.right > cta.left && banner.top < cta.bottom && banner.bottom > cta.top;
  if (!overlaps) return undefined;
  const bottom = viewportHeight - cta.top + 12;
  return viewportHeight - bottom - banner.height >= 12 ? bottom : undefined;
}
