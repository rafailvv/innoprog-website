"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import { MainScreenDesktopFooter } from "../../imports/MainScreenDesktop/MainScreenDesktop";
import { MainScreenMobileFooter } from "../../imports/MainScreenMobile/MainScreenMobile";

const DESKTOP_WIDTH = 1440;
const MOBILE_WIDTH = 390;
const MOBILE_BREAKPOINT = 768;
const MOBILE_FOOTER_HEIGHT = 940;

function subscribeViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportSnapshot() {
  return String(window.innerWidth || document.documentElement.clientWidth);
}

function getServerViewportSnapshot() {
  return String(MOBILE_WIDTH);
}

export function SiteFooter({ isMobile, scale }: { isMobile: boolean; scale: number }) {
  if (isMobile) {
    return (
      <footer className="site-main-footer-surface site-main-footer-surface--mobile" style={{ height: `${Math.ceil(MOBILE_FOOTER_HEIGHT * scale)}px` }}>
        <div
          className="site-main-footer-surface__mobile-canvas"
          style={{ height: `${MOBILE_FOOTER_HEIGHT}px`, transform: `scale(${scale})`, width: `${MOBILE_WIDTH}px` }}
        >
          <MainScreenMobileFooter />
        </div>
      </footer>
    );
  }

  const footerStyle = {
    width: `${DESKTOP_WIDTH}px`,
    zoom: scale,
  } as CSSProperties & { zoom?: number };

  return (
    <footer className="site-main-footer-surface site-main-footer-surface--desktop" style={footerStyle}>
      <MainScreenDesktopFooter />
    </footer>
  );
}

export function ResponsiveSiteFooter() {
  const viewportWidth = Number(useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  ));
  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  const scale = viewportWidth / (isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH);

  return <SiteFooter isMobile={isMobile} scale={scale} />;
}
