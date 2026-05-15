import MainScreen from "../imports/MainScreenDesktop/MainScreenDesktop";
import heroBackgroundUrl from "../imports/MainScreenDesktop/559076f97b29b552f98b8ef64abca31d3d16d281.opt.webp";
import heroPersonUrl from "../imports/MainScreenDesktop/a9544174871795971e5fb7802195e10ce3fa4432.opt.webp";
import MainScreenMobile from "../imports/MainScreenMobile/MainScreenMobile";
import platformLaptopUrl from "../imports/MainScreenDesktop/apple-mockup-pro-drive-air.opt.webp";
import platformScreenUrl from "../imports/MainScreenDesktop/8203cbb984ade08a409e3cb123b62173d36af946.opt.webp";
import heroMobileUrl from "../imports/MainScreenMobile/hero-mobile.webp";
import { useEffect, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";

const DESKTOP_DESIGN = {
  width: 1440,
  height: 14457,
};

const MOBILE_DESIGN = {
  width: 390,
  height: 9082,
};

const MOBILE_BREAKPOINT = 768;

const desktopScrollTargets = {
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

const mobileScrollTargets = {
  adults: 2922,
  children: 2922,
  directions: 2922,
  mentor: 3536,
  teachers: 4206,
  support: 5046,
  reviews: 6912,
  about: 7630,
  form: 8113,
};

const LOADER_MIN_MS = 650;
const LOADER_MAX_MS = 2600;
const LOADED_STORAGE_KEY = "innoprog-site-loaded";
const LOADER_EXIT_MS = 700;

function getViewportState() {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      scale: 1,
      design: DESKTOP_DESIGN,
    };
  }

  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const design = isMobile ? MOBILE_DESIGN : DESKTOP_DESIGN;

  return {
    isMobile,
    scale: window.innerWidth / design.width,
    design,
  };
}

function getCriticalAssets(isMobile: boolean) {
  return isMobile
    ? ["/logo_education.png", heroMobileUrl, platformLaptopUrl, platformScreenUrl]
    : ["/logo_education.png", heroPersonUrl, heroBackgroundUrl];
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

function scrollCarouselTo(id: string, index: number) {
  const carousel = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);

  if (!carousel) {
    return;
  }

  const items = Array.from(carousel.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const item = items[index];

  if (!item) {
    return;
  }

  carousel.scrollTo({
    left: item.offsetLeft,
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

function hasLoadedInSession() {
  try {
    return window.sessionStorage.getItem(LOADED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberLoadedInSession() {
  try {
    window.sessionStorage.setItem(LOADED_STORAGE_KEY, "true");
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

function waitForCriticalAssets(isMobile: boolean) {
  const images = Array.from(document.images);
  const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
  const loaderLogo = images.find((image) => image.src.endsWith("/logo_education.png"));

  return Promise.all([
    ...getCriticalAssets(isMobile).map(preloadImage),
    loaderLogo && !loaderLogo.complete ? preloadImage(loaderLogo.src) : Promise.resolve(),
    fonts?.ready.catch(() => undefined) ?? Promise.resolve(),
  ]).then(() => undefined);
}

export default function App() {
  const [viewport, setViewport] = useState(getViewportState);
  const [leadStatus, setLeadStatus] = useState("");
  const [isReady, setIsReady] = useState(hasLoadedInSession);
  const [shouldShowLoader, setShouldShowLoader] = useState(() => !hasLoadedInSession());
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isConsentError, setIsConsentError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isReady) {
      rememberLoadedInSession();
      return;
    }

    let cancelled = false;
    const startedAt = performance.now();
    const maxTimer = window.setTimeout(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    }, LOADER_MAX_MS);

    waitForCriticalAssets(viewport.isMobile).then(() => {
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
  }, [isReady, viewport.isMobile]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    rememberLoadedInSession();
    const hideTimer = window.setTimeout(() => setShouldShowLoader(false), LOADER_EXIT_MS);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [isReady]);

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewportState());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!viewport.isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [viewport.isMobile]);

  useEffect(() => {
    const carousels = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-carousel]:not([data-carousel="teachers"]):not([data-carousel="mobile-teachers"]):not([data-carousel="mobile-directions"])',
      ),
    );

    const handleWheel = (event: WheelEvent) => {
      const carousel = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;

      if (!carousel || carousel.scrollWidth <= carousel.clientWidth) {
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

    carousels.forEach((carousel) => {
      carousel.addEventListener("wheel", handleWheel, { passive: false });
    });

    return () => {
      carousels.forEach((carousel) => {
        carousel.removeEventListener("wheel", handleWheel);
      });
    };
  }, [viewport.isMobile]);

  useEffect(() => {
    const carousels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-carousel][data-carousel-sync]"),
    );

    const syncCarouselDots = (carousel: HTMLElement) => {
      const id = carousel.dataset.carousel;

      if (!id) {
        return;
      }

      const items = Array.from(carousel.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement,
      );
      let activeIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const distance = Math.abs(item.offsetLeft - carousel.scrollLeft);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          activeIndex = index;
        }
      });

      document
        .querySelectorAll<HTMLElement>(`[data-carousel-dot][data-carousel-target="${id}"]`)
        .forEach((dot, index) => {
          const isActive = index === activeIndex;

          dot.dataset.active = String(isActive);
          dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
    };

    const cleanups = carousels.map((carousel) => {
      let frame = 0;
      const handleScroll = () => {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => syncCarouselDots(carousel));
      };

      syncCarouselDots(carousel);
      carousel.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.cancelAnimationFrame(frame);
        carousel.removeEventListener("scroll", handleScroll);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [viewport.isMobile]);

  useEffect(() => {
    document
      .querySelectorAll("[data-consent-toggle]")
      .forEach((toggle) => toggle.setAttribute("aria-checked", String(isConsentChecked)));
  }, [isConsentChecked, viewport.isMobile]);

  useEffect(() => {
    const handleConsentClick = (event: globalThis.MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const consentToggle = target?.closest("[data-consent-toggle]");

      if (!consentToggle || target?.closest("a")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setIsConsentChecked((checked) => {
        const nextChecked = !checked;

        if (nextChecked) {
          setIsConsentError(false);
        }

        return nextChecked;
      });
    };

    const handleConsentKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (
        !target?.closest("[data-consent-toggle]") ||
        (event.key !== "Enter" && event.key !== " ")
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setIsConsentChecked((checked) => {
        const nextChecked = !checked;

        if (nextChecked) {
          setIsConsentError(false);
        }

        return nextChecked;
      });
    };

    document.addEventListener("click", handleConsentClick, true);
    document.addEventListener("keydown", handleConsentKeyDown, true);

    return () => {
      document.removeEventListener("click", handleConsentClick, true);
      document.removeEventListener("keydown", handleConsentKeyDown, true);
    };
  }, []);

  const scrollToDesignY = (y: number) => {
    window.scrollTo({
      top: Math.round(y * viewport.scale),
      behavior: "smooth",
    });
  };

  const toggleConsent = () => {
    setIsConsentChecked((checked) => {
      const nextChecked = !checked;

      if (nextChecked) {
        setIsConsentError(false);
      }

      return nextChecked;
    });
  };

  const handleSiteClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target : null;
    const activeScrollTargets = viewport.isMobile ? mobileScrollTargets : desktopScrollTargets;
    const mobileMenuToggle = target?.closest<HTMLElement>("[data-mobile-menu-toggle]");

    if (mobileMenuToggle) {
      event.preventDefault();
      setIsMobileMenuOpen((open) => !open);
      return;
    }

    const mobileMenuLink = target?.closest<HTMLElement>("[data-mobile-menu-link]");

    if (mobileMenuLink?.dataset.scrollTarget) {
      event.preventDefault();
      const key = mobileMenuLink.dataset.scrollTarget as keyof typeof mobileScrollTargets;

      scrollToDesignY(activeScrollTargets[key]);
      setIsMobileMenuOpen(false);
      return;
    }

    const carouselControl = target?.closest<HTMLElement>("[data-carousel-action]");

    if (carouselControl) {
      event.preventDefault();
      scrollCarousel(
        carouselControl.dataset.carouselTarget || "reviews",
        carouselControl.dataset.carouselAction === "prev" ? -1 : 1,
      );
      return;
    }

    const carouselIndexControl = target?.closest<HTMLElement>(
      "[data-carousel-index][data-carousel-target]",
    );

    if (carouselIndexControl) {
      event.preventDefault();
      const index = Number(carouselIndexControl.dataset.carouselIndex);

      if (Number.isFinite(index)) {
        scrollCarouselTo(carouselIndexControl.dataset.carouselTarget || "", index);
      }

      return;
    }

    const mobileDirectionsCarousel = target?.closest<HTMLElement>(
      '[data-carousel="mobile-directions"]',
    );
    const mobileDirectionsArrow = target?.closest<HTMLElement>('[class*="size-[39px]"]');

    if (
      mobileDirectionsCarousel &&
      mobileDirectionsArrow &&
      mobileDirectionsCarousel.contains(mobileDirectionsArrow)
    ) {
      event.preventDefault();
      scrollCarousel("mobile-directions", 1);
      return;
    }

    const consentToggle = target?.closest<HTMLElement>("[data-consent-toggle]");

    if (consentToggle && !target?.closest("a")) {
      event.preventDefault();
      toggleConsent();
      return;
    }

    const text = getClickedText(event.target, event.currentTarget);

    if (!text) {
      return;
    }

    if (text.includes("для взрослых")) {
      scrollToDesignY(activeScrollTargets.adults);
      return;
    }

    if (text.includes("для детей")) {
      scrollToDesignY(activeScrollTargets.children);
      return;
    }

    if (text === "отзывы" || text.includes("смотреть все отзывы")) {
      scrollToDesignY(activeScrollTargets.reviews);
      return;
    }

    if (text === "о нас") {
      scrollToDesignY(activeScrollTargets.about);
      return;
    }

    if (text.includes("подобрать направление")) {
      scrollToDesignY(activeScrollTargets.directions);
      return;
    }

    if (text.includes("получить консультацию")) {
      scrollToDesignY(activeScrollTargets.form);
      return;
    }

    if (text.includes("начать обучение")) {
      scrollToDesignY(activeScrollTargets.directions);
      return;
    }

    if (text.includes("отправить заявку")) {
      event.preventDefault();

      if (!isConsentChecked) {
        setIsConsentError(true);
        setLeadStatus("");
        return;
      }

      setLeadStatus("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      window.setTimeout(() => setLeadStatus(""), 3500);
    }
  };

  const handleSiteKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target : null;

    if (
      target?.closest("[data-consent-toggle]") &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      toggleConsent();
    }
  };

  const activeDesign = viewport.design;
  const canvasStyle = viewport.isMobile
    ? ({
      width: `${activeDesign.width}px`,
      height: `${activeDesign.height}px`,
      transform: "none",
      zoom: viewport.scale,
    } as CSSProperties & { zoom: number })
    : {
      width: `${activeDesign.width}px`,
      height: `${activeDesign.height}px`,
      transform: `translateX(-50%) scale(${viewport.scale})`,
    };

  return (
    <main
      aria-busy={!isReady}
      className={[
        "site-shell",
        isReady ? "site-shell--ready" : "",
        viewport.isMobile ? "site-shell--mobile" : "",
        isConsentChecked ? "site-shell--consent-checked" : "",
        isConsentError ? "site-shell--consent-error" : "",
      ].filter(Boolean).join(" ")}
      onClick={handleSiteClick}
      onKeyDown={handleSiteKeyDown}
      style={{ height: `${Math.ceil(activeDesign.height * viewport.scale)}px` }}
    >
      <div
        className={["site-canvas", viewport.isMobile ? "site-canvas--mobile" : ""]
          .filter(Boolean)
          .join(" ")}
        style={canvasStyle}
      >
        {viewport.isMobile ? <MainScreenMobile /> : <MainScreen />}
      </div>
      {viewport.isMobile && isMobileMenuOpen ? (
        <nav className="site-mobile-menu" aria-label="Мобильное меню">
          <button data-mobile-menu-link data-scroll-target="directions" type="button">направления</button>
          <button data-mobile-menu-link data-scroll-target="teachers" type="button">преподаватели</button>
          <button data-mobile-menu-link data-scroll-target="reviews" type="button">отзывы</button>
          <button data-mobile-menu-link data-scroll-target="about" type="button">о нас</button>
          <button data-mobile-menu-link data-scroll-target="form" type="button">подобрать направление</button>
        </nav>
      ) : null}
      {shouldShowLoader ? (
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
      ) : null}
      {leadStatus ? (
        <div className="site-toast" role="status">
          {leadStatus}
        </div>
      ) : null}
    </main>
  );
}
