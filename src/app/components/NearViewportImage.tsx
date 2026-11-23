"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

export default function NearViewportImage({ src, srcSet, ...props }: ComponentPropsWithoutRef<"img">) {
  const image = useRef<HTMLImageElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const element = image.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setNearViewport(true);
      observer.disconnect();
    }, { rootMargin: "220px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      {...props}
      ref={image}
      srcSet={nearViewport ? srcSet : undefined}
      src={nearViewport ? src : undefined}
    />
  );
}
