"use client";

import React, { useEffect, useState, useSyncExternalStore, type MouseEvent } from "react";
import { SiteHeader } from "../components/ResponsiveSiteHeader";
import { ADULT_COURSE_LINKS, CHILD_COURSE_LINKS } from "../courseNavigation";
import { EDUCATION_DISCLOSURE_LABEL, LEGAL_LINKS } from "../legalLinks";

type MenuGroup = "adults" | "children" | "about" | null;

const MOBILE_BREAKPOINT = 768;
const MOBILE_DESIGN_WIDTH = 390;
const DESKTOP_DESIGN_WIDTH = 1440;

function subscribeViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportSnapshot() {
  return String(window.innerWidth || document.documentElement.clientWidth);
}

function getServerViewportSnapshot() {
  return String(MOBILE_DESIGN_WIDTH);
}

export function SvedenHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<MenuGroup>(null);
  const viewportWidth = Number(useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  ));
  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  const headerScale = viewportWidth / (isMobile ? MOBILE_DESIGN_WIDTH : DESKTOP_DESIGN_WIDTH);
  const toggleGroup = (group: Exclude<MenuGroup, null>) => {
    setOpenGroup((current) => (current === group ? null : group));
  };

  const handleHeaderClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target : null;

    if (target?.closest("[data-mobile-menu-toggle]")) {
      event.preventDefault();
      setMenuOpen((current) => !current);
      return;
    }

    if (target?.closest("[data-site-home]")) {
      event.preventDefault();
      window.location.assign("/");
      return;
    }

    if (target?.closest('[data-name="кнопки пд"]')) {
      event.preventDefault();
      window.location.assign("/application");
    }
  };

  return (
    <>
      <SiteHeader
        isMobile={isMobile}
        mobileMenuOpen={menuOpen}
        onClickCapture={handleHeaderClick}
        renderBoth
        scale={headerScale}
      />

      {menuOpen ? (
        <nav aria-label="Мобильное меню" className="site-mobile-menu site-mobile-menu--open sveden-mobile-menu">
          <div className="site-mobile-menu__top">
            <a aria-label="На главную" className="site-mobile-menu__logo" href="/"><img alt="ИННОПРОГ Education" src="/logo-education-360.webp" /></a>
            <button aria-label="Закрыть меню" className="site-mobile-menu__close" onClick={() => setMenuOpen(false)} type="button"><span aria-hidden="true" /></button>
          </div>
          <div className="site-mobile-menu__links">
            <MobileGroup
              href="/"
              id="sveden-mobile-adults"
              label="для взрослых"
              links={ADULT_COURSE_LINKS}
              open={openGroup === "adults"}
              onToggle={() => toggleGroup("adults")}
            />
            <MobileGroup
              href="https://pages.innoprog.ru/children/school"
              id="sveden-mobile-children"
              label="для детей"
              links={CHILD_COURSE_LINKS}
              open={openGroup === "children"}
              onToggle={() => toggleGroup("children")}
            />
            <a href="/reviews">отзывы</a>
            <MobileGroup
              href="/about"
              id="sveden-mobile-about"
              label="о нас"
              links={[{ label: EDUCATION_DISCLOSURE_LABEL, href: LEGAL_LINKS.educationDisclosure }]}
              open={openGroup === "about"}
              onToggle={() => toggleGroup("about")}
            />
          </div>
          <a className="site-mobile-menu__cta" href="/application">подобрать направление</a>
        </nav>
      ) : null}
    </>
  );
}

export function SvedenAccessibilityToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("sveden-accessible") === "true";
    setEnabled(stored);
    document.documentElement.classList.toggle("sveden-accessible", stored);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle("sveden-accessible", next);
    window.localStorage.setItem("sveden-accessible", String(next));
  };

  return (
    <button aria-pressed={enabled} className={className} itemProp="copy" onClick={toggle} type="button">
      {enabled ? "Обычная версия" : "Версия для слабовидящих"}
    </button>
  );
}

function MobileGroup({
  href,
  id,
  label,
  links,
  onToggle,
  open,
}: {
  href: string;
  id: string;
  label: string;
  links: ReadonlyArray<{ label: string; href: string }>;
  onToggle: () => void;
  open: boolean;
}) {
  return (
    <div className="site-mobile-menu__nav-group">
      <div className="site-mobile-menu__nav-row">
        <a href={href}>{label}</a>
        <button
          aria-controls={id}
          aria-expanded={open}
          aria-label={`Показать разделы: ${label}`}
          className="site-mobile-menu__expand"
          onClick={onToggle}
          type="button"
        ><span aria-hidden="true" /></button>
      </div>
      <div aria-hidden={!open} className="site-mobile-menu__submenu" data-open={open} hidden={!open} id={id}>
        {links.map((link) => <a href={link.href} key={`${id}-${link.href}`}>{link.label}</a>)}
      </div>
    </div>
  );
}
