"use client";
import { childrenCourseNavigation } from "./courses/course-paths";
import Link from "next/link";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SiteHeader } from "../components/ResponsiveSiteHeader";
import { SiteFooter } from "../components/ResponsiveSiteFooter";
import styles from "./school/school.module.css";
function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
function viewport() {
  return window.innerWidth;
}
function serverViewport() {
  return 1440;
}
export default function ChildrenShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const width = useSyncExternalStore(subscribe, viewport, serverViewport);
  const isMobile = width < 768;
  const scale = width / (isMobile ? 390 : 1440);
  const [menu, setMenu] = useState(false);
  return (
    <div className={`${styles.page} ${className}`}>
      <div className={styles.header}>
        <SiteHeader
          childrenHref="/children"
          childrenLinks={childrenCourseNavigation}
          applicationHref="#application"
          renderBoth
          isMobile={isMobile}
          scale={scale}
          mobileMenuOpen={menu}
          onClickCapture={(event) => {
            if (
              (event.target as HTMLElement).closest("[data-mobile-menu-toggle]")
            )
              setMenu(true);
          }}
        />
      </div>
      {children}
      <SiteFooter isMobile={isMobile} scale={scale} />
      <Dialog.Root open={menu} onOpenChange={setMenu}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={`${styles.modal} ${styles.menu}`}>
            <Dialog.Title>ИННОПРОГ</Dialog.Title>
            <Dialog.Description className={styles.srOnly}>
              Навигация по школе программирования
            </Dialog.Description>
            <Dialog.Close className={styles.close} aria-label="Закрыть меню">
              ×
            </Dialog.Close>
            <nav>
              <Link href="/">Для взрослых</Link>
              <Link href="/children">Для детей</Link>
              <Link href="/children#professions">Все направления</Link>
              <Link href="/children#reviews">Истории учеников</Link>
              <Link href="/about">О нас</Link>
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
