// Reveal a real screen, including a lazy component mounted after hydration.
// Keep the existing bounded fallback if a component cannot finish mounting.
export function observeFirstContent(surface: HTMLElement, reveal: () => void, maxWaitMs: number): () => void {
  let done = false;
  let observer: MutationObserver | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const finish = () => {
    if (done) return;
    done = true;
    observer?.disconnect();
    if (timer !== undefined) clearTimeout(timer);
    reveal();
  };
  const hasContent = () => Boolean(surface.querySelector("h1")?.textContent?.trim());
  if (hasContent()) finish();
  else {
    observer = new MutationObserver(() => { if (hasContent()) finish(); });
    observer.observe(surface, { childList: true, subtree: true, characterData: true });
    timer = setTimeout(finish, maxWaitMs);
  }
  return () => {
    done = true;
    observer?.disconnect();
    if (timer !== undefined) clearTimeout(timer);
  };
}
