import MainScreen from "../imports/MainScreenDesktop/MainScreenDesktop";
import heroBackgroundUrl from "../imports/MainScreenDesktop/559076f97b29b552f98b8ef64abca31d3d16d281.png";
import heroPersonUrl from "../imports/MainScreenDesktop/a9544174871795971e5fb7802195e10ce3fa4432.png";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 14507;

const scrollTargets = {
  adults: 3436,
  children: 3436,
  directions: 3436,
  mentor: 5476,
  teachers: 7166,
  support: 8020,
  reviews: 10300,
  about: 11980,
  form: 13167,
};

const CRITICAL_ASSETS = ["/logo_education.png", heroPersonUrl, heroBackgroundUrl];
const LOADER_MIN_MS = 650;
const LOADER_MAX_MS = 2200;

function getCanvasScale() {
  if (typeof window === "undefined") {
    return 1;
  }

  return window.innerWidth / DESIGN_WIDTH;
}

function getClickedText(target: EventTarget | null, root: HTMLElement) {
  let element = target instanceof Element ? target : null;

  while (element && element !== root) {
    const text = element.textContent?.replace(/\s+/g, " ").trim().toLowerCase();

    if (text) {
      return text;
    }

    element = element.parentElement;
  }

  return "";
}

function scrollCarousel(id: string, direction: number) {
  const carousel = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);

  if (!carousel) {
    return;
  }

  const items = Array.from(carousel.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const current = carousel.scrollLeft;
  const item = direction > 0
    ? items.find((child) => child.offsetLeft > current + 8)
    : items.findLast((child) => child.offsetLeft < current - 8);

  carousel.scrollTo({
    left: item?.offsetLeft ?? (direction > 0 ? carousel.scrollWidth : 0),
    behavior: "smooth",
  });
}

function canScrollCarousel(carousel: HTMLElement, delta: number) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  if (maxScrollLeft <= 0) {
    return false;
  }

  if (delta > 0) {
    return carousel.scrollLeft < maxScrollLeft - 1;
  }

  if (delta < 0) {
    return carousel.scrollLeft > 1;
  }

  return false;
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();

    image.decoding = "async";
    image.onload = () => {
      if (typeof image.decode === "function") {
        image.decode().then(() => resolve()).catch(() => resolve());
        return;
      }

      resolve();
    };
    image.onerror = () => resolve();
    image.src = src;
  });
}

export default function App() {
  const [scale, setScale] = useState(getCanvasScale);
  const [leadStatus, setLeadStatus] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();
    const maxTimer = window.setTimeout(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    }, LOADER_MAX_MS);

    Promise.all(CRITICAL_ASSETS.map(preloadImage)).then(() => {
      const elapsed = performance.now() - startedAt;
      const delay = Math.max(0, LOADER_MIN_MS - elapsed);

      window.setTimeout(() => {
        if (!cancelled) {
          window.clearTimeout(maxTimer);
          window.requestAnimationFrame(() => setIsReady(true));
        }
      }, delay);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScale(getCanvasScale());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const carousel = target?.closest<HTMLElement>("[data-carousel]");

      if (!carousel || carousel.scrollWidth <= carousel.clientWidth) {
        return;
      }

      if (carousel.dataset.carousel === "teachers") {
        return;
      }

      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      const delta = event.deltaY;

      if (!canScrollCarousel(carousel, delta)) {
        return;
      }

      carousel.scrollLeft += delta;
      event.preventDefault();
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scrollToDesignY = (y: number) => {
    window.scrollTo({
      top: Math.round(y * scale),
      behavior: "smooth",
    });
  };

  const handleSiteClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target : null;
    const carouselControl = target?.closest<HTMLElement>("[data-carousel-action]");

    if (carouselControl) {
      event.preventDefault();
      scrollCarousel(
        carouselControl.dataset.carouselTarget || "reviews",
        carouselControl.dataset.carouselAction === "prev" ? -1 : 1,
      );
      return;
    }

    const text = getClickedText(event.target, event.currentTarget);

    if (!text) {
      return;
    }

    if (text.includes("для взрослых")) {
      scrollToDesignY(scrollTargets.adults);
      return;
    }

    if (text.includes("для детей")) {
      scrollToDesignY(scrollTargets.children);
      return;
    }

    if (text === "отзывы" || text.includes("смотреть все отзывы")) {
      scrollToDesignY(scrollTargets.reviews);
      return;
    }

    if (text === "о нас") {
      scrollToDesignY(scrollTargets.about);
      return;
    }

    if (text.includes("подобрать направление")) {
      scrollToDesignY(scrollTargets.directions);
      return;
    }

    if (text.includes("получить консультацию")) {
      scrollToDesignY(scrollTargets.form);
      return;
    }

    if (text.includes("начать обучение")) {
      scrollToDesignY(scrollTargets.directions);
      return;
    }

    if (text.includes("отправить заявку")) {
      event.preventDefault();
      setLeadStatus("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      window.setTimeout(() => setLeadStatus(""), 3500);
    }
  };

  return (
    <main
      aria-busy={!isReady}
      className={`site-shell${isReady ? " site-shell--ready" : ""}`}
      onClick={handleSiteClick}
      style={{ height: `${Math.ceil(DESIGN_HEIGHT * scale)}px` }}
    >
      <div
        className="site-canvas"
        style={{
          width: `${DESIGN_WIDTH}px`,
          height: `${DESIGN_HEIGHT}px`,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        <MainScreen />
      </div>
      <div className="site-loader" aria-hidden={isReady}>
        <img
          alt=""
          className="site-loader__logo"
          decoding="async"
          src="/logo_education.png"
        />
        <div className="site-loader__bar">
          <div className="site-loader__bar-fill" />
        </div>
      </div>
      {leadStatus ? (
        <div className="site-toast" role="status">
          {leadStatus}
        </div>
      ) : null}
    </main>
  );
}
