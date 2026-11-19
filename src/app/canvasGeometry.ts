export function getRenderedScale(element: HTMLElement): number {
  const scale = element.getBoundingClientRect().width / element.offsetWidth;
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

export function getVisibleCarouselCenter(element: HTMLElement, viewportWidth: number): number {
  const rect = element.getBoundingClientRect();
  const left = Math.max(rect.left, 0);
  const right = Math.min(rect.right, viewportWidth);
  return right > left
    ? ((left + right) / 2 - rect.left) / getRenderedScale(element)
    : element.clientWidth / 2;
}
