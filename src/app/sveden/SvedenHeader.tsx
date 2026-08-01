"use client";

import React, { useState } from "react";
import { ADULT_COURSE_LINKS, CHILD_COURSE_LINKS } from "../courseNavigation";
import { EDUCATION_DISCLOSURE_LABEL, LEGAL_LINKS } from "../legalLinks";

type MenuGroup = "adults" | "children" | "about" | null;

export function SvedenHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<MenuGroup>(null);

  const toggleGroup = (group: Exclude<MenuGroup, null>) => {
    setOpenGroup((current) => (current === group ? null : group));
  };

  return (
    <>
      <header className="site-review-page__header site-main-header sveden-site-header">
        <a aria-label="На главную" className="site-review-page__logo" href="/">
          <img alt="ИННОПРОГ Education" src="/logo-education-360.webp" />
        </a>
        <nav className="site-review-page__nav sveden-site-header__nav" aria-label="Основная навигация">
          <div className="site-main-header__nav-group">
            <a aria-haspopup="menu" href="/">для взрослых<span aria-hidden="true" className="site-main-header__nav-arrow" /></a>
            <div aria-label="Направления для взрослых" className="site-main-header__dropdown" role="menu">
              {ADULT_COURSE_LINKS.map(({ label, href }) => <a href={href} key={href} role="menuitem">{label}</a>)}
            </div>
          </div>
          <div className="site-main-header__nav-group">
            <a aria-haspopup="menu" href="https://pages.innoprog.ru/children/school">для детей<span aria-hidden="true" className="site-main-header__nav-arrow" /></a>
            <div aria-label="Направления для детей" className="site-main-header__dropdown site-main-header__dropdown--children" role="menu">
              {CHILD_COURSE_LINKS.map(({ label, href }) => <a href={href} key={label} role="menuitem">{label}</a>)}
            </div>
          </div>
          <a href="/reviews">отзывы</a>
          <div className="site-main-header__nav-group">
            <a aria-haspopup="menu" href="/about">о нас<span aria-hidden="true" className="site-main-header__nav-arrow" /></a>
            <div aria-label="Информация об ИННОПРОГ" className="site-main-header__dropdown sveden-site-header__about-menu" role="menu">
              <a href={LEGAL_LINKS.educationDisclosure} role="menuitem">{EDUCATION_DISCLOSURE_LABEL}</a>
            </div>
          </div>
        </nav>
        <a className="site-review-page__header-cta" href="/application">подобрать курс</a>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          className="site-review-page__mobile-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        ><span aria-hidden="true" /></button>
      </header>

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
