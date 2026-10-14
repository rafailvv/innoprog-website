"use client";
import ChildrenMobileMenu from "../ChildrenMobileMenu";
import { childrenCourseNavigation } from "../courses/course-paths";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SiteHeader } from "../../components/ResponsiveSiteHeader";
import { SiteFooter } from "../../components/ResponsiveSiteFooter";
import data from "../school/source-data.json";
import school from "../school/school.module.css";
import styles from "./story.module.css";
import { storySlugs, storyTitles } from "./story-data";
const slugs = storySlugs;
const titles = storyTitles;
function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
function snapshot() {
  return window.innerWidth;
}
function serverSnapshot() {
  return 1440;
}
export default function StoryPage({ index }: { index: number }) {
  const item = data.reviews[index];
  const width = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const isMobile = width < 768;
  const scale = width / (isMobile ? 390 : 1440);
  const [menu, setMenu] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const paragraphs = item.text.split(/(?<=\.)\s+(?=[А-ЯЁ])/u);
  return (
    <div className={school.page}>
      <div className={school.header}>
        <SiteHeader
          childrenHref="/children"
          childrenLinks={childrenCourseNavigation}
          applicationHref="/children#tariff"
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
      <main className={styles.main}>
        <div className={school.container}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/children">Школа программирования</Link>
            <span aria-hidden="true">/</span>
            <span>Истории учеников</span>
          </nav>
          <section className={styles.hero}>
            <div>
              <span className={styles.tag}>{item.course}</span>
              <h1>{titles[index]}</h1>
              <p className={styles.name}>{item.name}</p>
              <p>История ученика ИННОПРОГ</p>
            </div>
            <img
              src={item.image}
              alt={item.name}
              width={620}
              height={430}
              fetchPriority="high"
            />
          </section>
          <section className={styles.story}>
            <div>
              <h2>Словами ученика</h2>
              <p>Как начиналось обучение и что получилось создать</p>
            </div>
            <blockquote>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </blockquote>
          </section>
          <section className={styles.gallery}>
            <div className={styles.galleryHeading}>
              <h2>Фотографии и проекты</h2>
              <span>Все {item.gallery.length} фотографий из истории</span>
            </div>
            <div className={styles.photoGrid}>
              {item.gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setPhoto(i)}
                  aria-label={`Открыть фотографию ${i + 1} из истории ${item.name}`}
                >
                  <img
                    src={src}
                    alt={`${item.name}: фотография ${i + 1}`}
                    width={600}
                    height={450}
                    loading="lazy"
                  />
                  <span>{String(i + 1).padStart(2, "0")} ↗</span>
                </button>
              ))}
            </div>
          </section>
          <section className={styles.cta}>
            <div>
              <h2>
                Первый проект вашего ребёнка —<br /> уже на вводном занятии
              </h2>
              <p>
              Познакомимся, выберем интересное направление и начнём создавать
              </p>
            </div>
            <Link className={school.button} href="/children#tariff">
              Записаться на бесплатное занятие
            </Link>
          </section>
          <section className={styles.other}>
            <h2>Ещё истории учеников</h2>
            <div>
              {data.reviews.map((r, i) =>
                i === index ? null : (
                  <Link key={r.name} href={`/children/stories/${slugs[i]}`}>
                    <img
                      src={r.image}
                      alt={r.name}
                      width={380}
                      height={240}
                      loading="lazy"
                    />
                    <span>{r.course}</span>
                    <h3>{r.name}</h3>
                    <p>{titles[i]} →</p>
                  </Link>
                ),
              )}
            </div>
          </section>
          <Link className={styles.back} href="/children#reviews">
            ← Все отзывы и курсы для детей
          </Link>
        </div>
      </main>
      <SiteFooter isMobile={isMobile} scale={scale} />
      <ChildrenMobileMenu open={menu} onOpenChange={setMenu} applicationHref="/children#tariff" />
      <Dialog.Root
        open={photo !== null}
        onOpenChange={(open) => {
          if (!open) setPhoto(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={school.overlay} />
          <Dialog.Content className={styles.lightbox}>
            <Dialog.Title className={school.srOnly}>
              {item.name} — фотографии
            </Dialog.Title>
            <Dialog.Description className={school.srOnly}>
              Фотографии ученика и его проектов
            </Dialog.Description>
            <Dialog.Close
              className={school.close}
              aria-label="Закрыть фотографию"
            >
              ×
            </Dialog.Close>
            {photo !== null ? (
              <>
                <img
                  src={item.gallery[photo]}
                  alt={`${item.name}: фотография ${photo + 1}`}
                />
                <div className={school.galleryControls}>
                  <button
                    aria-label="Предыдущее фото"
                    onClick={() =>
                      setPhoto(
                        (photo + item.gallery.length - 1) % item.gallery.length,
                      )
                    }
                  >
                    ←
                  </button>
                  <span>
                    {photo + 1} / {item.gallery.length}
                  </span>
                  <button
                    aria-label="Следующее фото"
                    onClick={() => setPhoto((photo + 1) % item.gallery.length)}
                  >
                    →
                  </button>
                </div>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
