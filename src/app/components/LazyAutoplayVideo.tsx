"use client";

import { useEffect, useRef, useState } from "react";

type LazyAutoplayVideoProps = {
  className: string;
  src: string;
};

export function LazyAutoplayVideo({ className, src }: LazyAutoplayVideoProps) {
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
      aria-hidden="true"
      autoPlay
      className={className}
      loop
      muted
      playsInline
      preload="none"
      ref={videoRef}
      src={shouldLoad ? src : undefined}
    />
  );
}
