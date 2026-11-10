"use client";

import { useEffect, useRef, useState } from "react";

type LazyAutoplayVideoProps = {
  className: string;
  src: string;
  courseAutoplay?: boolean;
};

type VideoQuality = "lite" | "standard" | "high";
type VideoVariants = Record<VideoQuality, string>;

const adaptiveVideos: Partial<Record<string, VideoVariants>> = {
  "/videos/personal-mentor-hq.mp4": {
    lite: "/videos/personal-mentor-lite-v1.mp4",
    standard: "/videos/personal-mentor-hd-v1.mp4",
    high: "/videos/personal-mentor-hd-v1.mp4",
  },
  "/videos/frontend-mentor-hd-v2.mp4": {
    lite: "/videos/frontend-mentor-lite-v2.mp4",
    standard: "/videos/frontend-mentor-hd-v2.mp4",
    high: "/videos/frontend-mentor-hd-v2.mp4",
  },
  "/videos/flutter-mentor-hd-v1.mp4": {
    lite: "/videos/flutter-mentor-lite-v1.mp4",
    standard: "/videos/flutter-mentor-hd-v1.mp4",
    high: "/videos/flutter-mentor-hd-v1.mp4",
  },
  "/videos/python-mentor-hd-v2.mp4": {
    lite: "/videos/python-mentor-lite-v2.mp4",
    standard: "/videos/python-mentor-hd-v2.mp4",
    high: "/videos/python-mentor-hd-v2.mp4",
  },
  "/videos/java-mentor-hd-v1.mp4": {
    lite: "/videos/java-mentor-lite-v1.mp4",
    standard: "/videos/java-mentor-hd-v1.mp4",
    high: "/videos/java-mentor-hd-v1.mp4",
  },
  "/videos/cpp-mentor.mp4": {
    lite: "/videos/cpp-mentor.mp4",
    standard: "/videos/cpp-mentor-hd-v1.mp4",
    high: "/videos/cpp-mentor-hd-v1.mp4",
  },
  "/videos/unreal-engine-mentor.mp4": {
    lite: "/videos/unreal-engine-mentor-lite-v4.mp4",
    standard: "/videos/unreal-engine-mentor-hd-v4.mp4",
    high: "/videos/unreal-engine-mentor-hd-v4.mp4",
  },
  "/videos/course-ai-autoplay.mp4": {
    lite: "/videos/course-ai-lite-v1.mp4",
    standard: "/videos/course-ai-standard-v1.mp4",
    high: "/videos/course-ai-autoplay.mp4",
  },
};

function connectionQuality(): VideoQuality {
  const { connection } = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
  };

  if (!connection) return "standard";

  const { saveData, effectiveType, downlink } = connection;
  if (saveData || (effectiveType && effectiveType !== "4g") || (downlink !== undefined && downlink < 1.5)) {
    return "lite";
  }
  return downlink !== undefined && downlink >= 4 ? "high" : "standard";
}

export function LazyAutoplayVideo({ className, src, courseAutoplay = false }: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [quality, setQuality] = useState<VideoQuality>();
  const variants = adaptiveVideos[src];

  useEffect(() => {
    const video = videoRef.current;
    const startLoading = () => setQuality(variants ? connectionQuality() : "standard");

    if (!video || typeof IntersectionObserver === "undefined") {
      startLoading();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        startLoading();
        observer.disconnect();
      },
      { rootMargin: variants ? "250px 0px" : "1000px 0px" },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [variants]);

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
      src={quality ? (variants?.[quality] ?? src) : undefined}
    />
  );
}
