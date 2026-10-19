import { afterEach, describe, expect, it, vi } from "vitest";
import { observeFirstContent } from "./firstContentReady";
afterEach(() => { vi.useRealTimers(); document.body.innerHTML = ""; });
describe("first meaningful content", () => {
  it("keeps covering a slow screen past the deadline and reveals when its heading arrives", async () => {
    vi.useFakeTimers();
    const surface = document.createElement("main");
    const reveal = vi.fn();
    const cleanup = observeFirstContent(surface, reveal, 2600, { allowEmptyFallback: false });
    vi.advanceTimersByTime(4000);
    expect(reveal).not.toHaveBeenCalled();
    surface.innerHTML = '<h1>Настольный курс</h1><img src="/still-loading.webp">';
    await Promise.resolve();
    expect(reveal).toHaveBeenCalledTimes(1);
    cleanup();
  });
  it("reveals existing SSR heading without waiting for images or fonts", () => {
    const surface = document.createElement("main");
    surface.innerHTML = '<h1>Курс Python</h1><img src="/not-loaded.webp">';
    const reveal = vi.fn(); const cleanup = observeFirstContent(surface, reveal, 2600);
    expect(reveal).toHaveBeenCalledTimes(1); cleanup();
  });
  it("waits for a deferred screen, then reveals once and cancels fallback", async () => {
    vi.useFakeTimers(); const surface = document.createElement("main");
    const reveal = vi.fn(); const cleanup = observeFirstContent(surface, reveal, 2600);
    expect(reveal).not.toHaveBeenCalled();
    surface.innerHTML = '<h1>Детские курсы</h1>'; await Promise.resolve();
    expect(reveal).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(2600); expect(reveal).toHaveBeenCalledTimes(1); cleanup();
  });
  it("retains bounded recovery if a screen fails to mount", () => {
    vi.useFakeTimers(); const reveal = vi.fn();
    const cleanup = observeFirstContent(document.createElement("main"), reveal, 2600);
    vi.advanceTimersByTime(2599); expect(reveal).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1); expect(reveal).toHaveBeenCalledTimes(1); cleanup();
  });
  it("does not reveal an unmounted screen from a late observer or timer", async () => {
    vi.useFakeTimers(); const surface = document.createElement("main"); const reveal = vi.fn();
    const cleanup = observeFirstContent(surface, reveal, 2600); cleanup();
    surface.innerHTML = '<h1>Поздний экран</h1>'; await Promise.resolve();
    vi.runAllTimers(); expect(reveal).not.toHaveBeenCalled();
  });
});
