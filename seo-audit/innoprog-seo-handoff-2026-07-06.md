# SEO-бриф по сайту innoprog.ru

Дата подготовки: 2026-07-06  
Проект: `innoprog-website`  
Домен: `https://innoprog.ru`  
Стек: Next.js App Router, React, TypeScript  
Назначение документа: передать SEO-специалисту фактическое состояние сайта, карту страниц, уже реализованные SEO-элементы, зоны риска и список данных, которые нужно проверить внешними инструментами.

## 1. Краткое резюме

Сайт уже имеет базовую и частично расширенную SEO-подготовку:

- настроены уникальные `title`, `description`, canonical, Open Graph и Twitter Card для основных страниц;
- есть `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `llms.txt`;
- сайт русскоязычный, `html lang="ru"`, canonical-домен зафиксирован как `https://innoprog.ru`;
- для основных страниц добавлены JSON-LD schema: `EducationalOrganization`, `WebSite`, `ItemList`, `Course`, `FAQPage`, `WebPage`, `BreadcrumbList`, `Review`;
- есть отдельные посадочные страницы под 9 направлений обучения;
- есть 3 индексируемые страницы историй учеников и 35 отзывов внутри страницы `/reviews`;
- есть набор permanent redirects для старых/коротких URL.

Главные зоны для улучшения:

- проверить фактическую индексацию, Core Web Vitals и сниппеты через Google Search Console, Яндекс Вебмастер, PageSpeed Insights и Rich Results Test;
- расширить sitemap или стратегию индексации для отзывов, если нужны отдельные SEO-страницы под большее число отзывов;
- добавить/уточнить schema для тарифов, отзывов на странице `/reviews`, образовательных программ и FAQ по каждому курсу;
- проверить вес изображений и реальную скорость страниц: в `src/imports` много медиа и сгенерированных ассетов;
- провести контентную кластеризацию: сейчас курсы покрыты посадочными страницами, но нет информационного блога/статей под верхнюю и среднюю воронку.

## 2. Что передать SEO-специалисту

Передайте этот документ и доступы/экспорты:

- доступ к Google Search Console для `https://innoprog.ru`;
- доступ к Яндекс Вебмастеру;
- доступ к аналитике: Яндекс Метрика, GA4, CRM/формы заявок, если используются;
- список приоритетных направлений по бизнесу: какие курсы продвигать в первую очередь;
- актуальные цены, длительность, документы, УТП и ограничения по каждому курсу;
- данные по заявкам и конверсии по страницам;
- список регионов продвижения: РФ в целом или отдельные города/регионы;
- список прямых конкурентов по каждому направлению;
- историю миграций/старых доменов/старых URL, если она есть вне текущего `next.config.mjs`;
- подтверждение, какие страницы с отзывами нужно индексировать: только `/reviews` и 3 истории или отдельные страницы для всех 35 отзывов.

## 3. Инвентаризация страниц

### 3.1 Индексируемые URL в sitemap

В `src/app/sitemap.ts` сейчас 16 URL. Все имеют `lastModified = 2026-07-06`, `changeFrequency`, `priority`, `alternates.languages.ru-RU` и image.

| URL | Тип | Приоритет sitemap | Частота | Статус |
|---|---:|---:|---:|---|
| `/` | главная | 1.0 | weekly | готово |
| `/python-course` | курс | 0.9 | weekly | готово |
| `/data-science-course` | курс | 0.9 | weekly | готово |
| `/frontend-developer-course` | курс | 0.9 | weekly | готово |
| `/data-analyst-course` | курс | 0.9 | weekly | готово |
| `/cpp-developer-course` | курс | 0.9 | weekly | готово |
| `/mobile-developer-course` | курс | 0.9 | weekly | готово |
| `/unreal-engine-course` | курс | 0.9 | weekly | готово |
| `/java-developer-course` | курс | 0.9 | weekly | готово |
| `/ml-engineer-course` | курс | 0.9 | weekly | готово |
| `/tariffs` | тарифы | 0.8 | monthly | готово |
| `/about` | о школе | 0.7 | monthly | готово |
| `/reviews` | отзывы | 0.75 | monthly | готово |
| `/reviews/kirill` | история ученика | 0.7 | monthly | готово |
| `/reviews/anastasia` | история ученика | 0.7 | monthly | готово |
| `/reviews/mikhail` | история ученика | 0.7 | monthly | готово |

### 3.2 Страницы в коде, не являющиеся отдельными индексируемыми URL в sitemap

| Маршрут | Назначение | Текущий SEO-статус |
|---|---|---|
| `/reviews?direction=python` и другие query-фильтры | фильтрация отзывов по направлению | не в sitemap; canonical остается `/reviews`; нормально, если фильтры не продвигаются отдельно |
| `/reviews/text/[review]` | legacy-редирект на `/reviews?...#review-*` | не индексировать как отдельные страницы |
| `/python-course/reviews/[review]` | legacy-редирект Python-отзывов | не индексировать как отдельные страницы |
| `/[course]/reviews/[review]` | legacy-редирект отзывов курсов | не индексировать как отдельные страницы |
| `/api/application/request` | API отправки заявки | закрыто через robots/X-Robots |
| `/application/request` | служебный endpoint | закрыто через robots/X-Robots |
| `/healthz` | healthcheck | закрыто через robots/X-Robots |
| `/oferta` | rewrite на PDF offer | не в sitemap |
| `/privacy` | rewrite на PDF privacy | не в sitemap |

### 3.3 Отзывы

В `src/app/studentReviewsData.ts` есть 35 отзывов:

| Направление | Количество отзывов |
|---|---:|
| Python | 6 |
| Data Science / аналитика | 4 |
| C++ | 5 |
| Java | 4 |
| Frontend | 4 |
| ML | 4 |
| Unreal Engine | 4 |
| Mobile | 4 |

Текущая модель: отзывы собраны на `/reviews`, фильтруются query-параметром и якорями. Отдельными индексируемыми страницами сделаны только 3 storytelling-страницы: Кирилл, Анастасия, Михаил.

Рекомендация: если отзывы важны как SEO-актив, сделать отдельные индексируемые страницы для части или всех отзывов с уникальными `title`, `description`, `Review` schema, хлебными крошками и перелинковкой с курса.

## 4. Метаданные основных страниц

### Главная `/`

- Title: `ИННОПРОГ - онлайн школа программирования`
- Description: `Онлайн школа ИННОПРОГ: курсы программирования для взрослых и детей с практикой, личными наставниками, собственной платформой и поддержкой в обучении`
- Canonical: `https://innoprog.ru/`
- H1: есть скрытый SEO-H1 `ИННОПРОГ - онлайн школа программирования`
- Schema: `EducationalOrganization`, `WebSite`, `SiteNavigationElement`, `Course` catalog, `WebPage`, `BreadcrumbList`
- Статус: готово, но нужно проверить сниппет и фактическую выдачу.

### Курсы

| URL | Title | Основной интент | Schema |
|---|---|---|---|
| `/python-course` | `Курс Python-разработчик с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/data-science-course` | `Курс Data Science с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/frontend-developer-course` | `Курс Frontend-разработчик с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/data-analyst-course` | `Курс Data-аналитик с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/cpp-developer-course` | `Курс C++ разработчик с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/mobile-developer-course` | `Курс Мобильный разработчик с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/unreal-engine-course` | `Курс Unreal Engine с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/java-developer-course` | `Курс Java-разработчик с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |
| `/ml-engineer-course` | `Курс ML-инженер с нуля` | коммерческая посадочная | `Course`, `FAQPage`, `WebPage`, `BreadcrumbList` |

Общее по курсам:

- у каждой страницы есть уникальный title, description, canonical, keyword list, OG image и OG image alt;
- у каждой страницы есть SEO-H1;
- цена в `Course.offers`: `7990 RUB` за месяц;
- длительность у большинства курсов в schema: `P28W`, `PT560H`; для Python schema короче и требует выравнивания с остальными, если данные актуальны;
- все курсы используют общий FAQ-массив `courseFaqItems`.

Рекомендация: SEO-специалисту нужно проверить, не слишком ли одинаковые FAQ и блоки контента между курсами. Для сильного SEO лучше иметь уникальные FAQ/блоки возражений под каждое направление.

### `/tariffs`

- Title: `Тарифы`
- Description: `Тарифы обучения в ИННОПРОГ: форматы занятий с наставником, стоимость программирования онлайн и условия выбора подходящего курса`
- Schema: общий `Course`, `WebPage`, `BreadcrumbList`
- Статус: базово готово.
- Улучшение: добавить более точную schema для коммерческого блока: `Offer`, `PriceSpecification`, возможно `Product`/`Service` по тарифам, если структура тарифов стабильна.

### `/reviews`

- Title: `Отзывы учеников ИННОПРОГ`
- Description: `Отзывы учеников ИННОПРОГ о курсах программирования, наставниках, практических проектах и результатах обучения в онлайн-школе`
- Schema: `WebPage`, `BreadcrumbList`
- Статус: базово готово.
- Улучшение: добавить `ItemList`/`Review` schema для видимых отзывов, если это соответствует правилам разметки и отзывы реально отображаются на странице.

### `/about`

- Title: `О нас`
- Description: `О школе ИННОПРОГ: миссия, документы, юридическая информация и подход к обучению программированию с практикой, наставниками и поддержкой`
- Schema: `EducationalOrganization`, `WebPage`, `BreadcrumbList`
- Статус: готово.
- Улучшение: добавить больше доверительных сигналов: лицензии/документы, команда, преподаватели, юридические реквизиты, ссылки на PDF-документы с понятными anchor-текстами.

### Истории `/reviews/kirill`, `/reviews/anastasia`, `/reviews/mikhail`

- Metadata генерируются динамически из `REVIEW_META`;
- есть `Review` schema, `WebPage`, `BreadcrumbList`;
- невалидные story возвращают `notFound()`;
- страницы включены в sitemap.

Статус: хорошо подготовлены для индексации как страницы кейсов/историй.

## 5. Техническое SEO

### 5.1 Robots

Файл: `src/app/robots.ts`

Текущее правило:

- `Allow: /`
- `Disallow: /api/`
- `Disallow: /application/request`
- `Disallow: /healthz`
- `Sitemap: https://innoprog.ru/sitemap.xml`
- `Host: innoprog.ru`

Статус: готово.

Рекомендации:

- после деплоя открыть `https://innoprog.ru/robots.txt` и проверить, что результат совпадает;
- при необходимости явно описать политику для AI-ботов, если бизнес хочет разрешать/запрещать обучение моделей. Сейчас есть `llms.txt`, но robots не содержит отдельных правил для GPTBot/ClaudeBot/PerplexityBot.

### 5.2 Sitemap

Файл: `src/app/sitemap.ts`

Статус: готово для основных страниц.

Что проверить:

- sitemap доступен по `https://innoprog.ru/sitemap.xml`;
- все URL отдают 200;
- редиректов внутри sitemap нет;
- `lastModified` обновляется при реальных изменениях, а не всегда фиксирован одной датой;
- нужна ли индексация дополнительных отзывов или PDF-документов.

### 5.3 Canonical и hreflang

Генерируются в `createPageMetadata()`:

- canonical абсолютный;
- language alternate: `ru-RU`;
- `metadataBase` задан как `https://innoprog.ru`.

Статус: готово.

Риск: для `/reviews?direction=...` canonical остается `/reviews`. Это нормально, если фильтры не должны индексироваться отдельно.

### 5.4 Редиректы

Файл: `next.config.mjs`

Есть permanent redirects:

- `/python`, `/oop_python`, `/page34389955.html`;
- `/data-scientist`;
- `/frontend`, `/frontend-developer`;
- `/data-analyst`, `/data-analytics`;
- `/cpp`, `/cpp-developer`, `/c-plus-plus`;
- `/mobile-developer`, `/mobile`, `/flutter`;
- `/unreal`, `/unreal-engine`, `/game-development`;
- `/java`, `/java-developer`, `/spring-boot`;
- `/ml`, `/ml-engineer`, `/machine-learning`.

Статус: хорошо.

Рекомендации:

- проверить старые URL из аналитики/Вебмастера и добавить недостающие 301;
- проверить цепочки редиректов: каждый старый URL должен вести напрямую на конечную страницу.

### 5.5 X-Robots-Tag

В `next.config.mjs` для служебных URL:

- `/api/:path*` -> `noindex, nofollow, nosnippet`
- `/application/request` -> `noindex, nofollow, nosnippet`
- `/healthz` -> `noindex, nofollow, nosnippet`

Статус: готово.

### 5.6 Производительность и Core Web Vitals

В репозитории нет замеров PageSpeed/CrUX, поэтому метрики LCP/INP/CLS не подтверждены.

Наблюдения по коду:

- `src/imports` занимает около 927 MB и содержит более 1000 медиафайлов/ассетов;
- много изображений уже в `.webp`/`.opt.webp`;
- есть `loading="lazy"` для части изображений;
- на главной/страницах курсов много визуального контента и Figma-generated разметки;
- на странице `/about` hero image preloaded через `<link rel="preload" as="image">`;
- в `next.config.mjs` `images.disableStaticImages = true`, поэтому Next Image Optimization не используется стандартным способом.

Рекомендации:

- снять PageSpeed Insights по мобильной и desktop версии для 5 URL: `/`, `/python-course`, `/data-science-course`, `/reviews`, `/tariffs`;
- проверить LCP-изображения на главной и курсах: формат, размер, preload/fetchpriority;
- проверить JS bundle и hydration cost;
- рассмотреть удаление/дедупликацию неиспользуемых медиа;
- проверить video assets: `public/videos/course-ai.mp4`, `course-ai-autoplay.mp4`, `course-consists-assets/02-video-lessons.mp4`.

## 6. Структурированные данные

Уже реализовано:

- `EducationalOrganization`;
- `WebSite`;
- `ItemList` для навигации;
- `ItemList` каталога курсов;
- общий `Course` для школы;
- отдельный `Course` для каждого курса;
- `Offer` внутри Course;
- `CourseInstance`;
- `FAQPage` на страницах курсов;
- `WebPage`;
- `BreadcrumbList`;
- `Review` для 3 историй.

Что улучшить:

- проверить все JSON-LD через Rich Results Test;
- добавить `aggregateRating` только если есть юридически корректная и публично подтверждаемая база оценок;
- добавить `Review`/`ItemList` на `/reviews`, если отзывы индексируются как контент страницы;
- уточнить `Course` schema по рекомендациям Google: `hasCourseInstance`, `courseWorkload`, `offers`, provider, duration, language;
- для тарифов добавить более точные `Offer`/`PriceSpecification`.

Важно: не добавлять фиктивные рейтинги, даты, преподавателей или цены. Все значения должны совпадать с публичным контентом.

## 7. Контент и on-page SEO

Что готово:

- у основных страниц есть SEO-H1;
- у страниц курсов есть коммерческие titles/descriptions под интент `курс ... с нуля`;
- есть program/project/teacher/review/price/form sections в курсах;
- есть страница отзывов и истории;
- есть страница о компании с юридической информацией;
- есть PDF-документы: `offer.pdf`, `privacy.pdf`, `functional-characteristics.pdf`, `software-operation-manual.pdf`.

Что проверить и улучшить:

- уникальность текстовых блоков между курсами: сейчас страницы курсов похожи по структуре;
- полнота H2/H3 под каждый курс: программа, проекты, кому подойдет, результат, формат, цена, документы, FAQ;
- отдельные семантические блоки под запросы `с нуля`, `онлайн`, `с наставником`, `проект в портфолио`, `трудоустройство/карьера`, если это соответствует фактам;
- внутреннюю перелинковку между курсами, отзывами, тарифами, о школе и документами;
- отдельные посадочные/статьи под информационные запросы: `как стать Python-разработчиком`, `что должен знать frontend-разработчик`, `Data Science или аналитик данных`, `сколько учиться на Java-разработчика`, и т.п.;
- E-E-A-T: преподаватели, опыт, документы, юридическая информация, реальные кейсы учеников.

## 8. Медиа и изображения

Что готово:

- есть OG-изображения: `/og-home.png` для главной и отдельные изображения для 9 курсов в `/og/*.png`;
- есть favicon и logo;
- много ассетов уже оптимизированы как `.webp`/`.opt.webp`;
- декоративные изображения часто имеют `alt=""`, контентные карточки проектов местами используют `alt={item.title}`.

Что улучшить:

- после обновления от 2026-07-06 уникальные OG images для всех курсов подключены; нужно проверить, как они кадрируются в Telegram, VK и поисковых сниппетах;
- проверить alt-тексты у ключевых изображений: hero, диплом/документы, преподаватели, проекты, отзывы;
- проверить размеры и дубли ассетов, особенно в `src/imports`;
- проверить, что важные изображения не грузятся слишком рано и не ухудшают LCP.

## 9. Индексация и внешние проверки

Эти данные нельзя достоверно получить только из репозитория. SEO-специалисту нужно отдельно проверить:

- количество проиндексированных страниц в Google и Яндексе;
- Coverage/Indexing errors;
- страницы с canonical conflicts;
- 404 и soft 404;
- Core Web Vitals;
- CTR и показы по запросам;
- позиции по приоритетным кластерам;
- корректность сниппетов;
- валидность schema;
- наличие дублей на `www`, http/https, trailing slash;
- серверные security headers и HTTPS/HSTS;
- доступность sitemap/robots после production-деплоя.

## 10. Приоритеты работ

### P0: проверить после деплоя

- `robots.txt` и `sitemap.xml` доступны и корректны;
- все 16 URL из sitemap отдают 200;
- canonical совпадает с текущим URL;
- нет `noindex` на основных страницах;
- JSON-LD валидируется без критических ошибок;
- формы и служебные endpoints не индексируются.

### P1: улучшить коммерческий SEO

- уникализировать тексты и FAQ под каждый курс;
- добавить больше внутренних ссылок: курс -> тарифы -> отзывы -> истории -> о школе -> документы;
- проверить отображение новых OG images в Telegram, VK, WhatsApp и валидаторах Open Graph;
- расширить schema для тарифов и отзывов;
- собрать семантическое ядро по 9 направлениям и сопоставить его с текущими страницами.

### P2: расширить органический охват

- создать контент-план статей под информационные запросы;
- сделать отдельные страницы отзывов/кейсов, если они нужны для SEO;
- добавить страницы сравнения направлений: Python vs Java, Data Analyst vs Data Science, Frontend vs Mobile и т.д.;
- добавить региональные или аудиториальные посадочные только при наличии реальной стратегии и уникального контента.

## 11. Список файлов для SEO-разработчика

| Файл | Зачем смотреть |
|---|---|
| `src/app/seo.tsx` | общие SEO-константы, metadata factory, JSON-LD |
| `src/app/layout.tsx` | глобальные metadata, lang, viewport, fonts |
| `src/app/sitemap.ts` | карта сайта |
| `src/app/robots.ts` | robots.txt |
| `src/app/manifest.ts` | web manifest |
| `next.config.mjs` | redirects, rewrites, headers, X-Robots |
| `public/llms.txt` | AI/LLM discovery-файл |
| `src/app/*/page.tsx` | metadata и schema конкретных страниц |
| `src/app/studentReviewsData.ts` | отзывы, фильтры, legacy paths |
| `src/imports/courseFaqData.ts` | FAQ для course schema |
| `public/documents/*` | юридические PDF-документы |

## 12. Итоговый статус

Готово:

- базовая техническая индексация;
- sitemap/robots;
- canonical;
- Open Graph/Twitter;
- отдельные OG-изображения для всех 9 курсов;
- schema для организации, сайта, курсов, FAQ, хлебных крошек и 3 отзывов;
- 9 коммерческих посадочных страниц курсов;
- redirects для ряда старых/коротких URL;
- закрытие служебных endpoints от индексации;
- `llms.txt`.

Не готово или требует проверки:

- внешние SEO-метрики: индексация, позиции, CTR, Core Web Vitals;
- валидность schema в production;
- уникальность и полнота контента по каждому курсу;
- стратегия индексации 35 отзывов;
- отображение новых OG images в реальных превью соцсетей и мессенджеров;
- расширенная schema для тарифов и списка отзывов;
- контентная стратегия под информационные запросы;
- аудит веса изображений и JS bundle.

## 13. Рекомендуемый план для SEO-специалиста

1. Снять технический baseline: GSC, Яндекс Вебмастер, PageSpeed, Screaming Frog/аналог, Rich Results Test.
2. Проверить 16 URL из sitemap на status code, canonical, title/description, H1, schema, индексируемость.
3. Собрать семантическое ядро по 9 курсам и оценить соответствие текущих titles/H1/блоков.
4. Подготовить карту доработок по курсам: title, description, H2, FAQ, тексты, перелинковка, schema.
5. Решить стратегию отзывов: оставить общей страницей или сделать отдельные индексируемые страницы.
6. Проверить скорость и медиа, определить LCP-ассеты и тяжелые bundles.
7. Составить контент-план для информационного SEO и внутренней перелинковки.
