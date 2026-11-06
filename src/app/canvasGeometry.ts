/** Layout coordinates deliberately exclude transforms and browser zoom. */
export function getLayoutBottom(element: HTMLElement, ancestor: HTMLElement): number | null {
  let bottom = element.offsetHeight;
  let current: HTMLElement | null = element;
  while (current && current !== ancestor) {
    bottom += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return current === ancestor ? Math.ceil(bottom) : null;
}

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
