"use client";

import type { CSSProperties, MouseEventHandler } from "react";
import { MainScreenDesktopHeader } from "../../imports/shared/DesktopSiteHeader";
import { MainScreenMobileHeader } from "../../imports/shared/MobileSiteHeader";

const DESKTOP_WIDTH = 1440;
const MOBILE_WIDTH = 390;

export function SiteHeader({
  childrenHref,
  childrenLinks,
  applicationHref,
  isMobile,
  mobileMenuOpen = false,
  onClickCapture,
  renderBoth = false,
  scale,
}: {
  childrenHref?: string;
  childrenLinks?: readonly { label: string; href: string }[];
  applicationHref?: string;
  isMobile: boolean;
  mobileMenuOpen?: boolean;
  onClickCapture?: MouseEventHandler<HTMLElement>;
  renderBoth?: boolean;
  scale: number;
}) {
  if (renderBoth) {
    return (
      <>
        <DesktopHeaderSurface
          childrenHref={childrenHref}
          childrenLinks={childrenLinks}
          applicationHref={applicationHref}
          onClickCapture={onClickCapture}
          scale={scale}
          responsive
        />
        <MobileHeaderSurface
          menuOpen={mobileMenuOpen}
          onClickCapture={onClickCapture}
          scale={scale}
          responsive
        />
      </>
    );
  }

  return isMobile ? (
    <MobileHeaderSurface
      menuOpen={mobileMenuOpen}
      onClickCapture={onClickCapture}
      scale={scale}
    />
  ) : (
    <DesktopHeaderSurface
      childrenHref={childrenHref}
      childrenLinks={childrenLinks}
      applicationHref={applicationHref}
      onClickCapture={onClickCapture}
      scale={scale}
    />
  );
}

function MobileHeaderSurface({
  menuOpen,
  onClickCapture,
  responsive = false,
  scale,
}: {
  menuOpen: boolean;
  onClickCapture?: MouseEventHandler<HTMLElement>;
  responsive?: boolean;
  scale: number;
}) {
  return (
    <header
      className={`site-main-header-surface site-main-header-surface--mobile${responsive ? " site-responsive-header--mobile" : ""}`}
      onClickCapture={onClickCapture}
      style={{ height: `${Math.ceil(112 * scale)}px` }}
    >
      <div
        className="site-main-header-surface__mobile-canvas"
        style={{
          height: "112px",
          transform: `scale(${scale})`,
          width: `${MOBILE_WIDTH}px`,
        }}
      >
        <MainScreenMobileHeader menuOpen={menuOpen} />
      </div>
    </header>
  );
}

function DesktopHeaderSurface({
  childrenHref,
  childrenLinks,
  applicationHref,
  onClickCapture,
  responsive = false,
  scale,
}: {
  childrenHref?: string;
  childrenLinks?: readonly { label: string; href: string }[];
  applicationHref?: string;
  onClickCapture?: MouseEventHandler<HTMLElement>;
  responsive?: boolean;
  scale: number;
}) {
  const surfaceStyle = {
    width: `${DESKTOP_WIDTH}px`,
    zoom: scale,
  } as CSSProperties & { zoom?: number };

  return (
    <header
      className={`site-main-header-surface site-main-header-surface--desktop${responsive ? " site-responsive-header--desktop" : ""}`}
      onClickCapture={onClickCapture}
      style={surfaceStyle}
    >
      <MainScreenDesktopHeader
        childrenHref={childrenHref}
        childrenLinks={childrenLinks}
        applicationHref={applicationHref}
      />
    </header>
  );
}
