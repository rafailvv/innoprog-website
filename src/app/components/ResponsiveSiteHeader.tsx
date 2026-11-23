"use client";

import type { CSSProperties, MouseEventHandler } from "react";
import { MainScreenDesktopHeader } from "../../imports/shared/DesktopSiteHeader";
import { MainScreenMobileHeader } from "../../imports/shared/MobileSiteHeader";
import type { CourseAudience } from "../../imports/shared/CourseSectionNav";

const DESKTOP_WIDTH = 1440;
const MOBILE_WIDTH = 390;

export function SiteHeader({
  childrenActive,
  childrenHref,
  childrenLinks,
  courseAudience,
  applicationHref,
  mobileApplicationHref,
  isMobile,
  mobileMenuOpen = false,
  onClickCapture,
  renderBoth = false,
  scale,
}: {
  childrenActive?: boolean;
  childrenHref?: string;
  childrenLinks?: readonly { label: string; href: string }[];
  courseAudience?: CourseAudience;
  applicationHref?: string;
  mobileApplicationHref?: string;
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
          childrenActive={childrenActive}
          childrenHref={childrenHref}
          childrenLinks={childrenLinks}
          courseAudience={courseAudience}
          applicationHref={applicationHref}
          onClickCapture={onClickCapture}
          scale={scale}
          responsive
        />
        <MobileHeaderSurface
          courseAudience={courseAudience}
          applicationHref={mobileApplicationHref}
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
      courseAudience={courseAudience}
      applicationHref={mobileApplicationHref}
      menuOpen={mobileMenuOpen}
      onClickCapture={onClickCapture}
      scale={scale}
    />
  ) : (
    <DesktopHeaderSurface
      childrenActive={childrenActive}
      childrenHref={childrenHref}
      childrenLinks={childrenLinks}
      courseAudience={courseAudience}
      applicationHref={applicationHref}
      onClickCapture={onClickCapture}
      scale={scale}
    />
  );
}

function MobileHeaderSurface({
  courseAudience,
  applicationHref,
  menuOpen,
  onClickCapture,
  responsive = false,
  scale,
}: {
  courseAudience?: CourseAudience;
  applicationHref?: string;
  menuOpen: boolean;
  onClickCapture?: MouseEventHandler<HTMLElement>;
  responsive?: boolean;
  scale: number;
}) {
  const height = courseAudience ? 72 : 112;

  return (
    <header
      className={`site-main-header-surface site-main-header-surface--mobile${responsive ? " site-responsive-header--mobile" : ""}`}
      onClickCapture={onClickCapture}
      style={{ height: `${Math.ceil(height * scale)}px` }}
    >
      <div
        className="site-main-header-surface__mobile-canvas"
        style={{
          height: `${height}px`,
          transform: `scale(${scale})`,
          width: `${MOBILE_WIDTH}px`,
        }}
      >
        <MainScreenMobileHeader menuOpen={menuOpen} applicationHref={applicationHref} courseAudience={courseAudience} />
      </div>
    </header>
  );
}

function DesktopHeaderSurface({
  childrenActive,
  childrenHref,
  childrenLinks,
  courseAudience,
  applicationHref,
  onClickCapture,
  responsive = false,
  scale,
}: {
  childrenActive?: boolean;
  childrenHref?: string;
  childrenLinks?: readonly { label: string; href: string }[];
  courseAudience?: CourseAudience;
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
        childrenActive={childrenActive}
        childrenHref={childrenHref}
        childrenLinks={childrenLinks}
        courseAudience={courseAudience}
        applicationHref={applicationHref}
      />
    </header>
  );
}
