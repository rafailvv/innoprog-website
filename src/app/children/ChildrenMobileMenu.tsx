"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ADULT_COURSE_LINKS, ABOUT_SITE_LINKS } from "../courseNavigation";
import { childrenCourseNavigation } from "./courses/course-paths";

export default function ChildrenMobileMenu({ open, onOpenChange, onApplication, applicationHref = "#application" }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplication?: () => void;
  applicationHref?: string;
}) {
  const [group, setGroup] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) setGroup(null); }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOnDesktop = () => { if (window.innerWidth >= 768) onOpenChange(false); };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, [open, onOpenChange]);
  const groups = [
    { key: "adults", label: "для взрослых", href: "/", expand: "Показать направления для взрослых", links: ADULT_COURSE_LINKS },
    { key: "children", label: "для детей", href: "/children", expand: "Показать направления для детей", links: childrenCourseNavigation },
    { key: "about", label: "о нас", href: "/about", expand: "Показать информацию об ИННОПРОГ", links: ABOUT_SITE_LINKS },
  ];
  const close = () => onOpenChange(false);
  const renderGroup = (item: typeof groups[number]) => (
    <div className="site-mobile-menu__nav-group" key={item.key}>
      <div className="site-mobile-menu__nav-row">
        <a href={item.href} onClick={close}>{item.label}</a>
        <button type="button" className="site-mobile-menu__expand" aria-label={item.expand} aria-controls={`children-mobile-${item.key}`} aria-expanded={group === item.key} onClick={() => setGroup(group === item.key ? null : item.key)}><span aria-hidden="true" /></button>
      </div>
      <div className="site-mobile-menu__submenu" id={`children-mobile-${item.key}`} data-open={group === item.key} aria-hidden={group !== item.key}>
        {item.links.map(({ label, href }) => <a key={href} href={href} tabIndex={group === item.key ? undefined : -1} onClick={close}>{label}</a>)}
      </div>
    </div>
  );
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Content ref={contentRef} className="site-mobile-menu site-mobile-menu--open" aria-describedby={undefined} onOpenAutoFocus={(event) => {
          event.preventDefault();
          contentRef.current?.focus();
        }} onCloseAutoFocus={(event) => {
          event.preventDefault();
          document.querySelector<HTMLButtonElement>(".site-responsive-header--mobile [data-mobile-menu-toggle]")?.focus();
        }}>
          <Dialog.Title style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>Мобильное меню</Dialog.Title>
          <div className="site-mobile-menu__top">
            <a aria-label="На главную" className="site-mobile-menu__logo" href="/" onClick={close}><img alt="ИННОПРОГ Education" title="ИННОПРОГ Education" src="/logo-education-360.webp" /></a>
            <Dialog.Close aria-label="Закрыть меню" className="site-mobile-menu__close"><span aria-hidden="true" /></Dialog.Close>
          </div>
          <nav className="site-mobile-menu__links" aria-label="Навигация">
            {renderGroup(groups[0])}
            {renderGroup(groups[1])}
            <a href="/children#reviews" onClick={close}>отзывы</a>
            {renderGroup(groups[2])}
          </nav>
          {onApplication ? <button type="button" className="site-mobile-menu__cta" onClick={() => { close(); onApplication(); }}>подобрать направление</button> : <a className="site-mobile-menu__cta" style={{ textDecoration: "none" }} href={applicationHref} onClick={close}>подобрать направление</a>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
