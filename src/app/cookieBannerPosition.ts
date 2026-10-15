type Rectangle = Pick<DOMRect, "left" | "right" | "top" | "bottom" | "height">;

// Keep the existing notice dimensions and default position unless it covers CTA.
export function cookieBannerBottom(banner: Rectangle, cta: Rectangle, viewportHeight: number): number | undefined {
  const overlaps = banner.left < cta.right && banner.right > cta.left && banner.top < cta.bottom && banner.bottom > cta.top;
  if (!overlaps) return undefined;
  const bottom = viewportHeight - cta.top + 12;
  return viewportHeight - bottom - banner.height >= 12 ? bottom : undefined;
}


// Called in a layout effect: position before the first visible paint, including
// when a home screen chunk appears later during client navigation.
export function observeCookieBannerPosition(banner: HTMLElement, canvas: HTMLElement): () => void {
  let cta: HTMLElement | null = null;
  let frame = 0;
  const position = () => {
    banner.style.removeProperty("bottom");
    if (!cta?.isConnected) return;
    const bottom = cookieBannerBottom(banner.getBoundingClientRect(), cta.getBoundingClientRect(), window.innerHeight);
    if (bottom !== undefined) banner.style.bottom = `${bottom}px`;
  };
  const schedule = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(position);
  };
  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
  observer?.observe(banner);
  // Watch only the home canvas until its dynamically loaded CTA appears.
  const watchForCta = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => attachCta());
  const attachCta = () => {
    const nextCta = canvas.querySelector<HTMLElement>(".site-start-button, .site-mobile-hero-start-button");
    if (!nextCta) return false;
    cta = nextCta;
    observer?.observe(cta);
    watchForCta?.disconnect();
    position();
    return true;
  };
  if (!attachCta()) watchForCta?.observe(canvas, { childList: true, subtree: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("scroll", schedule, { passive: true });
  return () => {
    banner.style.removeProperty("bottom");
    observer?.disconnect();
    watchForCta?.disconnect();
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("scroll", schedule);
  };
}
