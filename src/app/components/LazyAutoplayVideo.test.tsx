import React from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LazyAutoplayVideo } from "./LazyAutoplayVideo";

const src = "/videos/course-ai-autoplay.mp4";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("deferred course video", () => {
  it("omits the lower-page video URL from server HTML while preserving its presentation", () => {
    const html = renderToStaticMarkup(<LazyAutoplayVideo className="absolute inset-0 size-full object-contain" src={src} courseAutoplay />);
    const video = new DOMParser().parseFromString(html, "text/html").querySelector("video")!;
    expect(video.hasAttribute("src")).toBe(false);
    expect(video.getAttribute("preload")).toBe("none");
    expect(video.getAttribute("class")).toBe("absolute inset-0 size-full object-contain");
    for (const attribute of ["autoplay", "loop", "muted", "playsinline", "data-course-autoplay-video"]) {
      expect(video.hasAttribute(attribute)).toBe(true);
    }
    expect(video.hasAttribute("aria-hidden")).toBe(false);
  });

  it("loads once near the viewport, then preserves muted autoplay and canplay retry", () => {
    let intersect: IntersectionObserverCallback;
    const disconnect = vi.fn();
    const observe = vi.fn();
    const observer = { observe, disconnect };
    vi.stubGlobal("IntersectionObserver", vi.fn(function (callback: IntersectionObserverCallback, options: IntersectionObserverInit) {
      intersect = callback;
      expect(options.rootMargin).toBe("1000px 0px");
      return observer;
    }));
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const { container } = render(<LazyAutoplayVideo className="ai-video" src={src} courseAutoplay />);
    const video = container.querySelector("video")!;
    expect(observe).toHaveBeenCalledWith(video);
    expect(video.hasAttribute("src")).toBe(false);
    expect(play).not.toHaveBeenCalled();
    act(() => intersect!([{ isIntersecting: false } as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
    expect(video.hasAttribute("src")).toBe(false);
    act(() => intersect!([{ isIntersecting: true } as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
    expect(video.getAttribute("src")).toBe(src);
    expect(disconnect).toHaveBeenCalledOnce();
    fireEvent.canPlay(video);
    expect(video.muted).toBe(true);
    expect(video.defaultMuted).toBe(true);
    expect(play).toHaveBeenCalledOnce();
  });

  it("falls back to loading when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<LazyAutoplayVideo className="ai-video" src={src} courseAutoplay />);
    expect(container.querySelector("video")?.getAttribute("src")).toBe(src);
  });

  it("preserves the existing mentor video attributes without adding course retry behavior", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const { container } = render(<LazyAutoplayVideo className="mentor-video" src="/videos/personal-mentor-hq.mp4" />);
    const video = container.querySelector("video")!;
    expect(video.getAttribute("aria-hidden")).toBe("true");
    expect(video.hasAttribute("data-course-autoplay-video")).toBe(false);
    fireEvent.canPlay(video);
    expect(play).not.toHaveBeenCalled();
  });
});
