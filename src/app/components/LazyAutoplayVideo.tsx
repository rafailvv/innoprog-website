"use client";

import { useEffect, useRef, useState } from "react";

type LazyAutoplayVideoProps = {
  className: string;
  src: string;
  courseAutoplay?: boolean;
};

export function LazyAutoplayVideo({ className, src, courseAutoplay = false }: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "1000px 0px" },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      aria-hidden={courseAutoplay ? undefined : true}
      autoPlay
      className={className}
      data-course-autoplay-video={courseAutoplay ? true : undefined}
      loop
      muted
      onCanPlay={courseAutoplay ? (event) => {
        event.currentTarget.defaultMuted = true;
        event.currentTarget.muted = true;
        if (event.currentTarget.paused) {
          void event.currentTarget.play().catch(() => undefined);
        }
      } : undefined}
      playsInline
      preload="none"
      ref={videoRef}
      src={shouldLoad ? src : undefined}
    />
  );
}
