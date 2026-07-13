import { useState, type CSSProperties, type ReactNode } from "react";
import svgPaths from "./svg-5im7jl6ott";
import imgDataScienceHero from "../DataScienceCourseDesktop/data-science-hero-2x.png";
import { LazyAutoplayVideo } from "../../app/components/LazyAutoplayVideo";
const imgImage119 = "/videos/personal-mentor.mp4";
import imgBenefitCard1 from "../MainScreenDesktop/benefit-card1-figma.png";
import imgBenefitIconsChat from "../MainScreenDesktop/benefit-icons-chat-figma.webp";
import imgFrame700 from "./be4bcdab4e03df29cf083299f1a129432fb6cfb8.opt.webp";
import imgRectangle40091 from "./b3b6b9e6c7b7057cd9decf85d4436740e0aace34.opt.webp";
import imgImage52 from "./438bc548f7863d8ef2b783a4cb669ce08d59b346.png";
import imgCourseStructureArrowFull from "./course-structure-arrow-full.png";
import img18001 from "./40ec54b08771963beaaad715c22e691c4519e3d3.opt.webp";
import img335 from "./401f5acc82f0b1eb082db219ab3471a1ef5fab51.png";
import img420501 from "./c5868c6b299d567b64d10ff0d69c0d1a0b46230c.png";
import img5134 from "./eb997e5032ab41f0b8c6c533fe59612a169fb82b.opt.webp";
import imgGroup6821 from "../MainScreenDesktop/bced4fe251202675be6f268fb651a981a420eb8a.opt.webp";
import imgDiplomProf1 from "../MainScreenDesktop/diplom-prof.opt.webp";
import imgRectangle40082 from "./100b51f7b19a210b3de8eadf6abcf10392a9da09.opt.webp";
import imgRectangle40083 from "./004de5560ec5b2aefa2edb08a745b9f1e187ccf7.opt.webp";
import imgRectangle40084 from "./b1f967bb9c7ae9c25195d8f4a73fc5847efd16f6.opt.webp";
import imgRectangle40085 from "./2cbe57953beca1178afd27d1f71884d7d612b585.opt.webp";
import imgRectangle40086 from "./9fd4f9c316d21dbd728b3436e79074f22de66286.opt.webp";
import imgRectangle40087 from "./dffabcf9253f8840fc97552d03f9a59b8a13fb24.opt.webp";
import imgRectangle40088 from "./accce48d175d044546f06312eec0a082304225b6.opt.webp";
import imgRectangle40089 from "./0637a0266dd99580004167f3ae3ffee5b51608c3.opt.webp";
import { imgGroup } from "./svg-htygp";
import { courseFaqItems } from "../courseFaqData";
import { dataScienceCourseProgramModules, type CourseProgramModule } from "../courseProgramData";
import { CourseProgramTagIcon } from "../courseProgramIcons";
import { dataScienceProjectVisualImages } from "../dataScienceProjectVisualImages";
import { MainScreenMobileTeachersSection } from "../MainScreenMobile/MainScreenMobile";

const mobileProjectVisuals = [
  { title: "Executive sales analytics", code: "sales_insights.ipynb" },
  { title: "Customer data mart", code: "customer_mart.sql" },
  { title: "Data quality audit", code: "quality_audit.ipynb" },
  { title: "A/B experiment report", code: "ab_experiment.ipynb" },
  { title: "Product metrics dashboard", code: "product_metrics.ipynb" },
  { title: "Demand forecasting model", code: "demand_forecast.py" },
  { title: "Lead scoring model", code: "lead_scoring.py" },
  { title: "Customer segmentation", code: "segments.ipynb" },
  { title: "Revenue time series", code: "revenue_forecast.ipynb" },
  { title: "Support NLP triage", code: "support_nlp.py" },
  { title: "Visual quality control", code: "vision_qc.py" },
  { title: "ML API service", code: "ml_service/" },
  { title: "Churn prevention system", code: "churn_system/" },
];

const dataScienceMobileProjects = [
  {
    title: "Аналитика продаж для руководителя",
    description: "Соберете отчет по продажам: очистите данные, найдете провалы и точки роста, рассчитаете выручку, средний чек, повторные покупки и подготовите выводы для бизнеса",
  },
  {
    title: "SQL-витрина клиентских транзакций",
    description: "Спроектируете витрину в PostgreSQL: объедините заказы, клиентов и платежи, примените оконные функции, посчитаете RFM-показатели и подготовите данные для аналитики",
  },
  {
    title: "Аудит качества данных перед моделированием",
    description: "Проведете диагностику датасета: найдете пропуски, дубли, выбросы, утечки и перекосы выборки, а затем оформите понятный data quality report",
  },
  {
    title: "A/B-тест продуктовой гипотезы",
    description: "Разберете эксперимент как продуктовый аналитик: выберете метрики, проверите корректность групп, оцените статистическую значимость и сформулируете решение по запуску",
  },
  {
    title: "Дашборд продуктовых и бизнес-метрик",
    description: "Соберете управленческий дашборд с выручкой, конверсией, retention и сегментами пользователей, чтобы команда могла быстро видеть состояние продукта",
  },
  {
    title: "Модель прогнозирования спроса",
    description: "Построите модель, которая прогнозирует спрос по истории продаж, сезонности, акциям и внешним факторам, сравните baseline и ML-подход и разберете ошибки прогноза",
  },
  {
    title: "Скоринг заявок и лидов",
    description: "Обучите модель, которая оценивает вероятность целевого действия: подготовите признаки, сравните ROC AUC и F1, настроите порог и объясните важные факторы",
  },
  {
    title: "Сегментация клиентской базы",
    description: "Разделите клиентов на поведенческие группы, опишете профиль каждого сегмента и предложите персональные сценарии коммуникации, продаж или удержания",
  },
  {
    title: "Прогноз выручки по временным рядам",
    description: "Соберете прогноз по дневной или недельной выручке: учтете тренд, сезонность и лаги, проведете backtesting и оцените качество на будущих периодах",
  },
  {
    title: "NLP-система анализа обращений",
    description: "Создадите классификатор обращений или отзывов: очистите тексты, выделите темы и тональность, обучите модель и покажете, какие проблемы чаще всего волнуют клиентов",
  },
  {
    title: "CV-прототип контроля качества",
    description: "Соберете прототип компьютерного зрения для классификации изображений: примените transfer learning, оцените качество и опишете ограничения данных и модели",
  },
  {
    title: "ML-сервис с API и Docker",
    description: "Превратите модель в сервис: сохраните артефакты, обернете инференс в FastAPI, добавите Docker, логирование, тестовый запрос и инструкцию запуска",
  },
  {
    title: "Система прогнозирования оттока клиентов",
    description: "Соберете прикладную систему удержания: обучите модель риска оттока, объясните причины ухода клиентов и подготовите список действий для менеджеров или CRM-кампаний",
  },
];

function MobileProjectVisual({ index }: { index: number }) {
  const item = mobileProjectVisuals[index] ?? mobileProjectVisuals[0];
  const image = dataScienceProjectVisualImages[index] ?? dataScienceProjectVisualImages[0];

  return (
    <div className="bg-[#eee8ff] h-[195px] overflow-hidden relative rounded-[32px] shrink-0 w-full site-course-mobile-project-visual">
      <img
        alt={item.title} title={item.title}
        className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
        decoding="async"
        loading="lazy"
        src={image}
      />
    </div>
  );
}

function MobileProjectCard({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[351px]">
      <MobileProjectVisual index={index} />
      {children}
    </div>
  );
}

function DataScienceMobileProjectCard({ project, index }: { project: typeof dataScienceMobileProjects[number]; index: number }) {
  return (
    <MobileProjectCard index={index}>
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">{project.title}</p>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">{project.description}</p>
      </div>
    </MobileProjectCard>
  );
}

function shouldLoopCarousel(carousel: HTMLElement) {
  return carousel.dataset.carouselLoop === "true";
}

function scrollCourseCarousel(id: string, direction: number) {
  const carousel = document.querySelector<HTMLElement>(`[data-carousel="${id}"]`);

  if (!carousel) {
    return;
  }

  const items = Array.from(carousel.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

  if (!items.length) {
    return;
  }

  const isCenterAligned = carousel.dataset.carouselAlign === "center";
  const isMobileFullBleedCarousel = carousel.classList.contains("site-course-projects-carousel")
    || carousel.classList.contains("site-course-reviews-carousel");
  const paddingLeft = Number.parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
  const activeAnchor = isCenterAligned ? carousel.clientWidth / 2 : 0;
  const activeIndex = items.reduce((nearestIndex, item, index) => {
    const itemAnchor = isCenterAligned
      ? item.offsetLeft + (item.offsetWidth / 2) - carousel.scrollLeft
      : item.offsetLeft - carousel.scrollLeft;
    const nearestItem = items[nearestIndex];
    const nearestAnchor = isCenterAligned
      ? nearestItem.offsetLeft + (nearestItem.offsetWidth / 2) - carousel.scrollLeft
      : nearestItem.offsetLeft - carousel.scrollLeft;

    return Math.abs(itemAnchor - activeAnchor) < Math.abs(nearestAnchor - activeAnchor)
      ? index
      : nearestIndex;
  }, 0);
  const isLooping = shouldLoopCarousel(carousel);
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const rawTargetIndex = isLooping && direction > 0 && carousel.scrollLeft >= maxScrollLeft - 1
    ? items.length
    : isLooping && direction < 0 && carousel.scrollLeft <= 1
      ? -1
      : activeIndex + direction;
  const isLoopWrap = isLooping && (rawTargetIndex < 0 || rawTargetIndex >= items.length);
  const targetIndex = isLooping
    ? (rawTargetIndex + items.length) % items.length
    : Math.max(0, Math.min(items.length - 1, rawTargetIndex));
  const item = items[targetIndex];
  const targetLeft = isCenterAligned
    ? item.offsetLeft - ((carousel.clientWidth - item.offsetWidth) / 2)
    : targetIndex === 0
      ? item.offsetLeft - paddingLeft
      : item.offsetLeft - (isMobileFullBleedCarousel ? 0 : paddingLeft);

  carousel.scrollTo({
    left: Math.max(0, Math.min(maxScrollLeft, targetLeft)),
    behavior: isLoopWrap ? "auto" : "smooth",
  });
}

function handleCourseCarouselClick(
  event: { preventDefault: () => void; stopPropagation: () => void },
  id: string,
  direction: number,
) {
  event.preventDefault();
  event.stopPropagation();
  scrollCourseCarousel(id, direction);
}

function Frame180() {
  return <div className="-translate-x-1/2 absolute bg-[#9c78ff] h-[2234px] left-1/2 rounded-bl-[40px] rounded-br-[40px] top-0 w-[390px]" />;
}

function Group1() {
  return (
    <div className="col-1 h-[32.011px] ml-[93.2px] mt-0 relative row-1 w-[76.802px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76.802 32.0109">
        <g id="Group">
          <path d={svgPaths.p39be0c00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p2bfc1ff0} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p1c4d1070} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 h-[37.92px] ml-0 mt-[2.08px] relative row-1 w-[169.995px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169.995 37.92">
        <g id="Group">
          <path d={svgPaths.p380e3480} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3615c580} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p240de3c0} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p1ccccd00} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p39592ff0} fill="var(--fill-0, black)" id="Vector_5" />
          <path d={svgPaths.p2dcf8680} fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p185f4180} fill="var(--fill-0, black)" id="Vector_7" />
          <path d={svgPaths.p1aaec400} fill="var(--fill-0, black)" id="Vector_8" />
          <path d={svgPaths.p9387d00} fill="var(--fill-0, black)" id="Vector_9" />
          <path d={svgPaths.p2dc2e0c0} fill="var(--fill-0, black)" id="Vector_10" />
          <path d={svgPaths.p343d4900} fill="var(--fill-0, black)" id="Vector_11" />
          <path d={svgPaths.p2df68bf2} fill="var(--fill-0, black)" id="Vector_12" />
          <path d={svgPaths.p6361100} fill="var(--fill-0, black)" id="Vector_13" />
          <path d={svgPaths.p1c8ff40} fill="var(--fill-0, black)" id="Vector_14" />
          <path d={svgPaths.p27239080} fill="var(--fill-0, black)" id="Vector_15" />
          <path d={svgPaths.p3d204e00} fill="var(--fill-0, black)" id="Vector_16" />
          <path d={svgPaths.p20957100} fill="var(--fill-0, black)" id="Vector_17" />
          <path d={svgPaths.p30672800} fill="var(--fill-0, black)" id="Vector_18" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Group1 />
      <Group2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <div className="absolute inset-[-6.25%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 17">
          <g id="Frame 64">
            <line id="Line 18" stroke="var(--stroke-0, black)" strokeLinecap="round" x1="0.5" x2="15.5" y1="0.5" y2="0.5" />
            <line id="Line 19" stroke="var(--stroke-0, black)" strokeLinecap="round" x1="0.5" x2="15.5" y1="8.5" y2="8.5" />
            <line id="Line 20" stroke="var(--stroke-0, black)" strokeLinecap="round" x1="0.5" x2="15.5" y1="16.5" y2="16.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame148() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white uppercase w-[350px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] pl-[2px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Курс</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[40px] w-full">
        <p className="leading-[43px] whitespace-nowrap">Data Science</p>
      </div>
    </div>
  );
}

function Frame237() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] col-1 content-stretch flex flex-col h-[537px] items-end justify-between ml-0 mt-0 overflow-clip p-[24px] relative rounded-[40px] row-1 w-[350px]">
      <div className="absolute h-[393px] left-[-127px] top-[72px] w-[407px]" data-name="ChatGPT Image 30 апр. 2026 г., 11_32_21_Nero_AI_Image_Upscaler_Photo_Face_Nero_AI_Background_Remover_transparent 1">
        <img alt="Курс Data Science в ИННОПРОГ" title="Курс Data Science в ИННОПРОГ" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgDataScienceHero} />
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame237 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[32px] shrink-0">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[10px] text-black text-center tracking-[0.3px] uppercase whitespace-nowrap">
        <p className="leading-[14px] mb-0">Образовательная лицензия</p>
        <p className="leading-[14px]">{`министерства образования и науки `}</p>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-black text-center tracking-[0.42px] w-[289px]">
            <p className="leading-[17px] mb-0">Платформа, наставник и практика</p>
            <p className="leading-[17px]">в одном формате ИННОПРОГ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[14px] text-black text-center tracking-[0.42px]">
            <p className="leading-[17px] mb-0">Индивидуальное обучение</p>
            <p className="leading-[17px]">с наставником</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame286() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame46 />
      <Frame2 />
    </div>
  );
}

function Frame147() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[16px] top-[139px] w-[318px]">
      <Frame45 />
      <Frame286 />
    </div>
  );
}

function Frame238() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame148 />
      <Group13 />
      <Frame147 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="site-course-feature-card__content content-stretch flex items-center justify-center p-[20px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-black text-center tracking-[0.48px]">
            <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] mb-0 text-[#9c78ff] text-[16px] uppercase">Индивидуальная программа</p>
            <p className="leading-[18px] mb-0 text-[16px]">обучения под ваш уровень</p>
            <p className="leading-[18px] text-[16px]">подготовки, цели и темп</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="site-course-feature-card__content content-stretch flex items-center justify-center p-[20px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-black text-center tracking-[0.48px] whitespace-pre-wrap">
            <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] mb-0 text-[#9c78ff] text-[16px] uppercase">Живые занятия</p>
            <p className="mb-0 text-[16px]">
              <span className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] text-[#9c78ff] tracking-[0.48px] uppercase">с преподавателем</span>
              <span className="leading-[18px]">{`, `}</span>
            </p>
            <p className="leading-[18px] text-[16px]">а не только материалы в записи</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="site-course-feature-card__content content-stretch flex items-center justify-center p-[20px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-black text-center tracking-[0.48px]">
            <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] mb-0 text-[#9c78ff] text-[16px] uppercase">Обучение с экспертами</p>
            <p className="leading-[18px] mb-0 text-[16px]">из Сбера, Яндекса, МТС, Точки</p>
            <p className="leading-[18px] text-[16px]">и других компаний</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="site-course-feature-card__content content-stretch flex items-center justify-center p-[20px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-black text-center tracking-[0.48px]">
            <p className="mb-0 text-[16px]">
              <span className="[word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] text-[#9c78ff] tracking-[0.48px] uppercase">Практика на платформе INNOPROG</span>
              <span className="leading-[18px]">, работа над проектами и сопровождение наставника</span>
            </p>
            <p className="leading-[18px] text-[16px]">на протяжении всего обучения</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="site-course-feature-card__content content-stretch flex items-center justify-center p-[20px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-black text-center tracking-[0.48px]">
            <p className="leading-[18px] mb-0 text-[16px]">После завершения обучения —</p>
            <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] mb-0 text-[#9c78ff] text-[16px] uppercase">возможность пройти стажировку</p>
            <p className="leading-[18px] text-[16px]">и применить полученные навыки на практике</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="site-course-feature-list site-course-feature-list--mobile bg-[rgba(70,74,106,0.5)] relative rounded-[40px] shrink-0 w-full">
      <div className="site-course-feature-list__inner content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <Frame61 />
        <Frame63 />
        <Frame62 />
        <Frame60 />
        <Frame59 />
      </div>
    </div>
  );
}

function Frame181() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-[#464a6a] relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">начать обучение</p>
            <div className="bg-white content-stretch flex items-center justify-center p-[12px] relative rounded-[40px] shrink-0 size-[36px]" data-name="Frame 40/Frame 707">
              <div className="relative shrink-0 size-[16px]">
                <div className="absolute inset-[-1.98%_-4.04%_-1.98%_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6457 16.6327">
                    <path d={svgPaths.p2b850d80} id="Vector 121" stroke="var(--stroke-0, #464A6A)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="bg-[rgba(255,255,255,0.8)] cursor-pointer h-[46px] relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div aria-hidden className="absolute border-3 border-[rgba(0,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[40px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-black text-left whitespace-nowrap">получить консультацию</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame182() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] text-center text-white uppercase w-[350px]">
        <p className="leading-[20px] mb-0">За 28 недель освоите с нуля</p>
        <p className="leading-[20px] mb-0">анализ данных</p>
        <p className="leading-[20px]">ML и Python</p>
      </div>
      <Frame65 />
      <Frame181 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start justify-end relative rounded-[40px] shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[16px] uppercase w-full">Преподаватели-практики</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[17px] mb-0">Занимайтесь, общаетесь и практикуйтесь</p>
        <p className="leading-[17px] mb-0">с реальными разработчиками. Получаете опыт</p>
        <p className="leading-[17px]">от профессионалов</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start justify-end relative rounded-[40px] shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[16px] uppercase whitespace-nowrap">Индивидуальные занятия</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[12px] tracking-[0.36px] w-[min-content]">
        <p className="leading-[17px] mb-0">Еженедельные персональные занятия</p>
        <p className="leading-[17px]">с наставниками для быстрого роста и получения только актуальных навыков</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start justify-end min-w-px relative rounded-[40px] text-black">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[16px] uppercase w-full">Два диплома</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[17px] relative shrink-0 text-[12px] tracking-[0.36px] w-full">Диплом о профпереподготовке и диплом ИННОПРОГ. Сведения вносятся в государственный реестр</p>
    </div>
  );
}

function Frame149() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame29 />
    </div>
  );
}

function Frame151() {
  return (
    <div className="site-course-advantage-card site-course-advantage-card--white bg-[rgba(255,255,255,0.6)] col-1 content-stretch flex flex-col gap-[16px] items-start ml-0 mt-0 p-[16px] relative rounded-[32px] row-1 w-[350px]">
      <Frame28 />
      <Frame27 />
      <Frame149 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="site-course-advantage-card site-course-advantage-card--platform [word-break:break-word] bg-[rgba(70,74,106,0.6)] col-1 content-stretch flex flex-col gap-[12px] items-start ml-0 mt-[431px] px-[20px] py-[16px] relative rounded-[32px] row-1 text-white w-[259px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[16px] uppercase w-full">Обучающая платформа</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[17px] mb-0">Закрепляйте полученные навыки</p>
        <p className="leading-[17px]">на нашей платформе, решая реальные практические задачи</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative rounded-[40px] shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[16px] uppercase w-full">Налоговый вычет</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[17px] relative shrink-0 text-[12px] tracking-[0.36px] w-full">По окончании обучения вы сможете оформить налоговый вычет и вернуть 13% от стоимости обучения</p>
    </div>
  );
}

function Frame150() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative rounded-[40px] shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[16px] uppercase w-full">Стажировка</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[17px] relative shrink-0 text-[12px] tracking-[0.36px] w-full">По окончании обучения лучших учеников мы рекомендуем нашим партнёрам для прохождения стажировки в ИТ-компаниях</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="site-course-advantage-card site-course-advantage-card--purple [word-break:break-word] col-1 content-stretch flex flex-col gap-[16px] items-start ml-[54.15px] mt-[258px] px-[20px] py-[16px] relative rounded-[32px] row-1 text-white w-[295.845px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 295.85 182\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.4000000059604645\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.0576e-16 9.1 -14.792 5.5721e-16 147.92 91)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0.26442\\'/><stop stop-color=\\'rgba(206,188,255,1)\\' offset=\\'0.63221\\'/><stop stop-color=\\'rgba(181,154,255,1)\\' offset=\\'0.81611\\'/><stop stop-color=\\'rgba(156,120,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
      <Frame32 />
      <Frame150 />
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame151 />
      <Frame30 />
      <Frame31 />
    </div>
  );
}

function Frame183() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[20px] top-[120px] w-[350px]">
      <Frame238 />
      <Frame182 />
      <Group11 />
    </div>
  );
}

function Frame281() {
  return (
    <div className="absolute inset-[0_48.15%_7.41%_0]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 25">
        <g clipPath="url(#clip0_1_2479)" id="Frame 843">
          <path d={svgPaths.p39e5b900} fill="var(--fill-0, #9C78FF)" id="Star 2" />
        </g>
        <defs>
          <clipPath id="clip0_1_2479">
            <rect fill="white" height="25" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame219() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase w-[47px]">4.9</p>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9C78FF)" id="Star 1" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9C78FF)" id="Star 1" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9C78FF)" id="Star 1" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9C78FF)" id="Star 1" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, white)" id="Star 1" />
          </svg>
        </div>
        <Frame281 />
      </div>
    </div>
  );
}

function Frame269() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-[294px]">
      <Frame219 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="bg-[#9c78ff] cursor-pointer relative rounded-[40px] shrink-0 w-full z-20" data-application-open role="button" tabIndex={0}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-white tracking-[0.48px] uppercase whitespace-nowrap">Открыт набор на обучение</p>
        </div>
      </div>
    </div>
  );
}

function Frame236() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[16px] items-center justify-center left-1/2 top-[677px] w-[318px]">
      <Frame269 />
      <Frame64 />
    </div>
  );
}

function Frame278() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[20px] uppercase w-full">
        <p className="leading-[20px]"><span>Data Science объединяет аналитику данных, Python, SQL</span><br /><span>и машинное обучение</span></p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full whitespace-pre-wrap">
        <p className="leading-[18px]"><span>На курсе вы проходите полный цикл работы с данными: сбор, очистку, исследование, статистику</span><br /><span>обучение моделей и подготовку результата для бизнеса.</span><br /><span>Программа помогает собрать портфолио и подготовиться к первым задачам Data Science специалиста.</span></p>
      </div>
    </div>
  );
}

function Frame275() {
  return (
    <div className="content-stretch flex gap-[8px] h-[221px] items-end relative shrink-0 w-full">
      <div className="bg-gradient-to-b flex-[1_0_0] from-[rgba(191,167,255,0.6)] h-[72px] min-w-px relative rounded-tl-[10px] rounded-tr-[10px] shadow-[15px_0px_80px_0px_rgba(156,120,255,0.2)] to-[78.365%] to-[rgba(156,120,255,0.8)]" />
      <div className="bg-gradient-to-b flex-[1_0_0] from-[#ae90ff] h-[131px] min-w-px relative rounded-tl-[10px] rounded-tr-[10px] shadow-[15px_0px_80px_0px_rgba(156,120,255,0.2)] to-[#8559ff]" />
      <div className="bg-gradient-to-b from-[#7f87cd] h-full relative rounded-tl-[10px] rounded-tr-[10px] shadow-[15px_0px_80px_0px_rgba(70,74,106,0.2)] shrink-0 to-[#464a6a] w-[111px]" />
    </div>
  );
}

function Frame276() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Manrope:ExtraBold',sans-serif] font-extrabold items-center justify-between leading-[20px] relative shrink-0 text-[#464a6a] text-[16px] text-center tracking-[0.48px] uppercase w-[350px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-[111px]">{`от 108 700 ₽`}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-[114px]">{`от 200 500 ₽`}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-[111px]">{`от 396 700 ₽`}</p>
    </div>
  );
}

function Frame277() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame275 />
      <Frame276 />
    </div>
  );
}

function Frame168() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame278 />
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[32px] text-black uppercase w-full">
        <p className="leading-[32px] mb-0">Уровень дохода Data Science специалиста</p>
        <p className="leading-[32px]">
          по данным{" "}
          <a className="site-course-inline-link" href="https://career.hh.ru/profession/1" rel="noopener noreferrer" target="_blank">hh.ru</a>
        </p>
      </div>
      <Frame277 />
    </div>
  );
}

function Frame184() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[350px]">
      <Frame168 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[12px] relative rounded-[40px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">Во всех тарифах</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 text-black text-center w-[355px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[32px] relative shrink-0 text-[32px] uppercase w-full">{`Личный наставник `}</p>
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[20px] w-full">на всём пути обучения</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <Frame3 />
      <Frame4 />
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black text-center tracking-[0.48px] w-[349px]">
        <p className="leading-[18px] mb-0">На протяжении всего обучения</p>
        <p className="leading-[18px] mb-0">вас будет сопровождать эксперт</p>
        <p className="leading-[18px]">из индустрии, который помог многим начинающим специалистам</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[139px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Сильное резюме</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame10 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[202px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Индивидуальный маршрут</p>
    </div>
  );
}

function Frame171() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame12 />
      <Frame9 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[218px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black text-center tracking-[0.42px] whitespace-nowrap">Уверенный выход на работу</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[123px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Разбор кейсов</p>
    </div>
  );
}

function Frame170() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame8 />
      <Frame7 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[112px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Поддержка</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame13 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[229px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black text-center tracking-[0.42px] whitespace-nowrap">Подготовка к собеседованию</p>
    </div>
  );
}

function Frame169() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame11 />
      <Frame6 />
    </div>
  );
}

function Frame172() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[349px] site-mobile-mentor-tags">
      <Frame171 />
      <Frame170 />
      <Frame169 />
    </div>
  );
}

function Frame173() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame172 />
      <div className="h-[201px] overflow-hidden relative rounded-[24px] shrink-0 w-[349px] site-course-mentor-media site-course-mentor-media--mobile" data-name="image 119">
        <LazyAutoplayVideo className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage119} />
      </div>
    </div>
  );
}

function Frame274() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0">
      <Frame5 />
      <Frame173 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-end relative shrink-0 text-right text-white w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">онлайн занятия</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px] w-full">онлайн занятия каждую неделю</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-end relative shrink-0 text-right text-white w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">стажировка</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px] w-full">в реальных проектах после обучения</p>
    </div>
  );
}

function MentorBenefitDocumentIcon({ className = "absolute left-[214px] pointer-events-none size-[82px] top-[347px]" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg className="block size-full" fill="none" viewBox="0 0 82 82">
        <defs>
          <linearGradient id="course-mentor-document-body" x1="20" x2="64" y1="8" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CAB9FF" />
            <stop offset="0.6" stopColor="#966EFF" />
            <stop offset="1" stopColor="#7844F5" />
          </linearGradient>
          <linearGradient id="course-mentor-document-fold" x1="52" x2="74" y1="7" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BDA3FF" />
            <stop offset="1" stopColor="#6B35F0" />
          </linearGradient>
          <filter id="course-mentor-document-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" width="82" x="0" y="0">
            <feDropShadow dx="0" dy="8" floodColor="#6932F2" floodOpacity="0.18" stdDeviation="7" />
          </filter>
        </defs>
        <g filter="url(#course-mentor-document-shadow)" opacity="0.62">
          <path d="M19 12C19 8.7 21.7 6 25 6H50L67 23V69C67 72.3 64.3 75 61 75H25C21.7 75 19 72.3 19 69V12Z" fill="url(#course-mentor-document-body)" />
          <path d="M50 6V20C50 22.2 51.8 24 54 24H67L50 6Z" fill="url(#course-mentor-document-fold)" />
          <rect fill="#6535E6" fillOpacity="0.52" height="5" rx="2.5" width="31" x="28" y="39" />
          <rect fill="#6535E6" fillOpacity="0.52" height="5" rx="2.5" width="24" x="28" y="53" />
        </g>
      </svg>
    </div>
  );
}

function MentorBenefitIcon({ variant }: { variant: "online" | "internship" | "support" | "chat" | "interview" }) {
  if (variant === "online") {
    return (
      <div className="absolute h-[122px] left-0 origin-top-left overflow-hidden pointer-events-none rounded-tl-[32px] top-0 scale-[0.68] w-[163px]">
        <img alt="" decoding="async" loading="lazy" className="absolute h-[275px] left-0 max-w-none top-0 w-[302px]" src={imgBenefitCard1} />
      </div>
    );
  }

  if (variant === "internship") {
    return (
      <div className="absolute h-[78px] left-[8px] pointer-events-none top-[-5px] w-[102px]">
        <svg aria-hidden="true" className="block size-full" fill="none" viewBox="0 0 102 78">
          <defs>
            <linearGradient id="course-mentor-briefcase-body" x1="20" x2="78" y1="10" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D9CDFE" />
              <stop offset="0.55" stopColor="#9B73FF" />
              <stop offset="1" stopColor="#7D4CFF" />
            </linearGradient>
            <linearGradient id="course-mentor-briefcase-flap" x1="22" x2="81" y1="6" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BEA7FF" />
              <stop offset="1" stopColor="#6E35F8" />
            </linearGradient>
            <filter id="course-mentor-briefcase-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="68" width="90" x="6" y="8">
              <feDropShadow dx="0" dy="8" floodColor="#6D35FF" floodOpacity="0.32" stdDeviation="8" />
            </filter>
          </defs>
          <g filter="url(#course-mentor-briefcase-shadow)" opacity="0.9">
            <path d="M36 19.5C36 12.6 41.6 7 48.5 7H56C62.9 7 68.5 12.6 68.5 19.5V23H59.8V19.5C59.8 17.4 58.1 15.7 56 15.7H48.5C46.4 15.7 44.7 17.4 44.7 19.5V23H36V19.5Z" fill="#7E46FF" />
            <rect fill="url(#course-mentor-briefcase-body)" height="44" rx="12" width="76" x="13" y="23" />
            <path d="M13 34.5C13 28.1 18.1 23 24.5 23H77.5C83.9 23 89 28.1 89 34.5V39.8L51 53L13 39.8V34.5Z" fill="url(#course-mentor-briefcase-flap)" />
            <circle cx="51" cy="41" fill="#956AFF" r="6.3" stroke="#7742F6" strokeOpacity="0.45" strokeWidth="1.1" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "support") {
    return (
      <div className="absolute h-[88px] left-[7px] pointer-events-none top-[8px] w-[116px]">
        <svg aria-hidden="true" className="block size-full" fill="none" viewBox="0 0 116 88">
          <defs>
            <linearGradient id="course-mentor-support-front" x1="20" x2="79" y1="12" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2D7FF" />
              <stop offset="0.58" stopColor="#AE8FFF" />
              <stop offset="1" stopColor="#8352FF" />
            </linearGradient>
            <linearGradient id="course-mentor-support-back" x1="61" x2="108" y1="11" y2="76" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B08DFF" />
              <stop offset="1" stopColor="#6F32F3" />
            </linearGradient>
            <filter id="course-mentor-support-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="88" width="112" x="2" y="0">
              <feDropShadow dx="0" dy="8" floodColor="#6D35FF" floodOpacity="0.24" stdDeviation="8" />
            </filter>
          </defs>
          <g filter="url(#course-mentor-support-shadow)" opacity="0.88">
            <circle cx="72" cy="30" fill="url(#course-mentor-support-back)" r="24" />
            <path d="M47 82C47 65.4 60.4 52 77 52H80C96.6 52 110 65.4 110 82V84H47V82Z" fill="url(#course-mentor-support-back)" />
            <circle cx="36" cy="33" fill="url(#course-mentor-support-front)" r="26" />
            <path d="M8 86C8 67.8 22.8 53 41 53H45C63.2 53 78 67.8 78 86V88H8V86Z" fill="url(#course-mentor-support-front)" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "interview") {
    return <MentorBenefitDocumentIcon className="absolute left-[8px] pointer-events-none size-[102px] top-[-8px]" />;
  }

  return (
    <div className="absolute h-[122px] left-0 rounded-[40px] top-0 w-[163px]">
      <div className="absolute inset-0 mix-blend-color-burn opacity-60 overflow-hidden pointer-events-none rounded-[40px]">
        <img alt="" decoding="async" loading="lazy" className="absolute h-[392.05%] left-[-263.81%] max-w-none top-[-139.73%] w-[391.24%]" src={imgBenefitIconsChat} />
      </div>
    </div>
  );
}

function Frame176() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-[#9c78ff] flex-[1_0_0] min-w-px overflow-hidden relative rounded-[32px] self-stretch">
        <MentorBenefitIcon variant="online" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[24px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(1)</p>
            <Frame53 />
          </div>
        </div>
      </div>
      <div className="bg-[#9c78ff] flex-[1_0_0] h-[175px] min-w-px overflow-hidden relative rounded-[32px]">
        <MentorBenefitIcon variant="internship" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[34px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(2)</p>
            <Frame54 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-end relative shrink-0 text-right text-white w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">поддержка и помощь</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px] w-full site-mobile-mentor-support-copy">вам не нужно переживать о том что где и когда</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-end relative shrink-0 text-right text-white w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">личный чат</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full site-mobile-mentor-chat-copy">
        <p className="leading-[16px] mb-0">с наставником для</p>
        <p className="leading-[16px]">вопросов вне уроков</p>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-end relative shrink-0 text-right text-white w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">Мок-интервью</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full site-mobile-mentor-interview-copy">
        <p className="leading-[16px] mb-0">в формате реального</p>
        <p className="leading-[16px]">собеседования</p>
      </div>
    </div>
  );
}

function Frame177() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-[#9c78ff] flex-[1_0_0] min-w-px overflow-hidden relative rounded-[32px] self-stretch">
        <MentorBenefitIcon variant="chat" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[24px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(4)</p>
            <Frame56 />
          </div>
        </div>
      </div>
      <div className="bg-[#9c78ff] flex-[1_0_0] min-w-px overflow-hidden relative rounded-[32px]">
        <MentorBenefitIcon variant="interview" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[36px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(5)</p>
            <Frame57 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame178() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full site-mobile-mentor-cards">
      <Frame176 />
      <div className="bg-[#9c78ff] h-[163px] overflow-hidden relative rounded-[32px] shrink-0 w-full">
        <MentorBenefitIcon variant="support" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[42px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(3)</p>
            <Frame55 />
          </div>
        </div>
      </div>
      <Frame177 />
    </div>
  );
}

function Frame273() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[350px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[0px] text-black uppercase w-[351px]">
        <p className="mb-0 text-[32px]">
          <span className="leading-[32px] text-[#9c78ff]">{`Вас ждет более 40+ `}</span>
          <span className="leading-[32px]">персональных онлайн встреч</span>
        </p>
        <p className="leading-[32px] text-[32px]">с наставником:</p>
      </div>
      <Frame178 />
    </div>
  );
}

function Frame145() {
  return (
    <div className="site-internship-title site-internship-title--mobile content-stretch flex flex-col items-start relative shrink-0 w-[350px]">
      <p className="site-internship-title__line site-internship-title__line--black">пройдёте стажировку</p>
      <p className="site-internship-title__line site-internship-title__line--brand">
        <span className="site-internship-title__prefix">в</span>
        <span className="site-internship-title__brand">иннопрог проджектс</span>
      </p>
      <p className="site-internship-title__line site-internship-title__line--black">уже во время обучения</p>
    </div>
  );
}

function Frame83() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center leading-[0] min-w-px relative text-center text-white">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">5. Итоговый проект</p>
        <p className="leading-[18px]">и кейс в портфолио</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[12px] tracking-[0.36px] w-full whitespace-pre-wrap">
        <p className="leading-[16px] mb-0">По завершению стажировки</p>
        <p className="leading-[16px] mb-0">{`у вас будет готовый кейс, который можно добавить в портфолио `}</p>
        <p className="leading-[16px]">и использовать как подтверждение практического опыта</p>
      </div>
    </div>
  );
}

function Frame239() {
  return (
    <div className="site-internship-card site-internship-card--purple bg-[rgba(156,120,255,0.6)] col-1 content-stretch flex items-center justify-center ml-0 mt-[619px] p-[20px] relative rounded-[32px] row-1 w-[276px]">
      <Frame83 />
    </div>
  );
}

function Frame146() {
  return (
    <div className="site-internship-card site-internship-card--gray [word-break:break-word] bg-[rgba(84,110,122,0.8)] col-1 content-stretch flex flex-col gap-[16px] items-center ml-[91px] mt-[432px] p-[20px] relative rounded-[32px] row-1 text-center text-white w-[259px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">4. Поддержка</p>
        <p className="leading-[18px] mb-0">от наставников</p>
        <p className="leading-[18px]">и команды</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[16px] mb-0">Во время работы над проектом</p>
        <p className="leading-[16px] mb-0">вы можете задавать вопросы, получать обратную связь</p>
        <p className="leading-[16px]">и разбирать возникающие сложности вместе с наставниками и другими участниками</p>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="site-internship-card site-internship-card--purple [word-break:break-word] bg-[rgba(156,120,255,0.6)] col-1 content-stretch flex flex-col gap-[16px] items-center ml-0 mt-[298px] p-[20px] relative rounded-[32px] row-1 text-center text-white w-[350px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">2. Профессиональные</p>
        <p className="leading-[18px]">ИТ-инструменты</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[16px] mb-0">Работа над проектом ведется в современных рабочих сервисах: вы учитесь ставить задачи, вести разработку и взаимодействовать</p>
        <p className="leading-[16px]">с командой в привычной для индустрии среде</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center min-w-px relative text-center text-white">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[20px] w-full">1. Всё как в реальной команде</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[16px] mb-0">Вы проходите собеседование</p>
        <p className="leading-[16px] mb-0">и попадаете в рабочий процесс, максимально приближенный</p>
        <p className="leading-[16px]">к реальной ИТ-среде</p>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="site-internship-card site-internship-card--purple bg-[rgba(156,120,255,0.6)] col-1 content-stretch flex items-center ml-[92px] mt-0 p-[20px] relative rounded-[32px] row-1 w-[258px]">
      <Frame />
    </div>
  );
}

function Frame86() {
  return (
    <div className="site-internship-card site-internship-card--white [word-break:break-word] bg-[rgba(255,255,255,0.6)] col-1 content-stretch flex flex-col gap-[16px] items-center ml-0 mt-[141px] p-[20px] relative rounded-[32px] row-1 text-[#464a6a] text-center w-[259px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[20px] w-full">3. Проект под ваш уровень подготовки</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[16px] mb-0">Мы подбираем задачи и формат участия с учетом ваших текущих навыков, чтобы вы могли постепенно включаться</p>
        <p className="leading-[16px]">в командную работу</p>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame239 />
      <Frame146 />
      <Frame84 />
      <Frame85 />
      <Frame86 />
    </div>
  );
}

function Frame240() {
  return (
    <div className="content-stretch flex h-[272px] items-end p-[24px] relative rounded-[40px] shrink-0 w-[350px]">
      <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[40px] size-full" src={imgFrame700} />
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[16px] text-white tracking-[0.48px] whitespace-pre-wrap">
        <p className="leading-[18px] mb-0">ИННОПРОГ ПРОДЖЕКТС — среда,</p>
        <p className="leading-[18px] mb-0">{`где ученики и наставники объединяются в команду и получают опыт работы над реальными `}</p>
        <p className="leading-[18px]">ИТ-проектами</p>
      </div>
    </div>
  );
}

function Frame243() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Group12 />
      <Frame240 />
    </div>
  );
}

function Frame241() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0">
      <Frame145 />
      <Frame243 />
    </div>
  );
}

function Frame193() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[350px]">
      <Frame241 />
    </div>
  );
}

function Frame114() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Bold',sans-serif] font-bold gap-[8px] items-start relative shrink-0 w-[131px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[18px] relative shrink-0 w-full">Data Science</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[15px] relative shrink-0 uppercase w-full">Иванов Иван</p>
    </div>
  );
}

function Frame115() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[12px] text-black">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Light',sans-serif] font-light leading-[35px] relative shrink-0 whitespace-nowrap">Junior (начальный)</p>
      <Frame114 />
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex gap-[8px] items-end justify-center relative shrink-0">
      <div className="bg-[#9c78ff] overflow-hidden relative rounded-[16px] shrink-0 size-[51px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover object-top pointer-events-none rounded-[16px] size-full" src={imgRectangle40091} />
      </div>
      <Frame115 />
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[20px] relative shrink-0 text-black text-right w-[128px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Light',sans-serif] font-light relative shrink-0 text-[10px] tracking-[0.3px] w-full">{`Желаемая зарплата `}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[14px] uppercase whitespace-nowrap w-full">от 108 700 ₽</p>
    </div>
  );
}

function Frame117() {
  return (
    <div className="relative rounded-[25px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[25px]" />
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[8px] items-end p-[16px] relative size-full">
          <Frame116 />
          <Frame87 />
        </div>
      </div>
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Работаю с системой контроля версий Git</span>
          </li>
        </ul>
        <p className="leading-[19px]">и сервисом совместной разработки GitHub</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Настраиваю пайплайны для сборки,</span>
          </li>
        </ul>
        <p className="leading-[19px]">тестирования и подключения внешней базы данных</p>
      </div>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[21px]">
          <span className="leading-[19px]">Работаю с системой контейнеризации Docker</span>
        </li>
      </ul>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Провожу Unit-тестирование с помощью</span>
          </li>
        </ul>
        <p className="leading-[19px]">PyTest и интеграционное тестирование</p>
      </div>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[21px]">
          <span className="leading-[19px]">Работаю с Linux</span>
        </li>
      </ul>
    </div>
  );
}

function Frame120() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[14px] text-black tracking-[0.42px] w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Анализирую данные и готовлю датасеты</span>
          </li>
        </ul>
        <p className="leading-[19px]">для моделей машинного обучения</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Пишу чистый Python-код для анализа</span>
          </li>
        </ul>
        <p className="leading-[19px]">данных, ML и автоматизации</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Строю ML-модели и оцениваю</span>
          </li>
        </ul>
        <p className="leading-[19px]">качество по метрикам</p>
      </div>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[21px]">
          <span className="leading-[19px]">Пишу SQL-запросы и работаю с PostgreSQL</span>
        </li>
      </ul>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Разрабатываю API для веб-приложений</span>
          </li>
        </ul>
        <p className="leading-[19px]">и подключаю API сторонних сервисов</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">
        <ul className="mb-0">
          <li className="list-disc ms-[21px]">
            <span className="leading-[19px]">Работаю по правилам чистого кода:</span>
          </li>
        </ul>
        <p className="leading-[19px]">ревью, рефакторинг и оптимизация кода</p>
      </div>
      <Frame121 />
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame120 />
    </div>
  );
}

function Frame192() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame117 />
      <Frame122 />
    </div>
  );
}

function MaterialIconThemePython() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="material-icon-theme:python">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="material-icon-theme:python">
          <path d={svgPaths.pd1d9880} fill="var(--fill-0, #0288D1)" id="Vector" />
          <path d={svgPaths.pb1f3280} fill="var(--fill-0, #FDD835)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MaterialIconThemeDocker() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="material-icon-theme:docker">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="material-icon-theme:docker">
          <path d={svgPaths.p1e33100} fill="var(--fill-0, #0288D1)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame133() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeDocker />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Docker</p>
    </div>
  );
}

function DeviconFastapi() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="devicon:fastapi">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2532)" id="devicon:fastapi">
          <path d={svgPaths.p177adc80} fill="var(--fill-0, #049688)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2532">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame135() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconFastapi />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">FastAPI</p>
    </div>
  );
}

function Frame185() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="content-stretch flex gap-[16px] h-[32px] items-center p-[8px] relative rounded-[16px] shrink-0 w-[105px]">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
        <MaterialIconThemePython />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Python</p>
      </div>
      <Frame133 />
      <Frame135 />
    </div>
  );
}

function MaterialIconThemeDjango() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="material-icon-theme:django">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="material-icon-theme:django">
          <path d={svgPaths.p11947880} fill="var(--fill-0, #43A047)" id="Vector" />
          <path d={svgPaths.p4a76f40} fill="var(--fill-0, #43A047)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeDjango />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">pandas</p>
    </div>
  );
}

function DeviconSqlalchemy() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="devicon:sqlalchemy">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2299)" id="devicon:sqlalchemy">
          <path d={svgPaths.p317830f2} fill="var(--fill-0, #333333)" id="Vector" />
          <path d={svgPaths.p2943a780} fill="var(--fill-0, #CA2727)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_2299">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame138() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconSqlalchemy />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">NumPy</p>
    </div>
  );
}

function Frame140() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="relative shrink-0 size-[16px]" data-name="image 52">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Matplotlib</p>
    </div>
  );
}

function Frame186() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame126 />
      <Frame138 />
      <Frame140 />
    </div>
  );
}

function DeviconJwt() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="devicon:jwt">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2412)" id="devicon:jwt">
          <path d={svgPaths.p3a0e7380} fill="var(--fill-0, #546E7A)" id="Vector" />
          <path d={svgPaths.p3c6caa00} fill="var(--fill-0, #F50057)" id="Vector_2" />
          <path d={svgPaths.p24b59800} fill="var(--fill-0, #D500F9)" id="Vector_3" />
          <path d={svgPaths.p30089e00} fill="var(--fill-0, #29B6F6)" id="Vector_4" />
          <path d={svgPaths.p340e86c0} fill="var(--fill-0, #00E5FF)" id="Vector_5" />
          <path d={svgPaths.p3f5f3d40} fill="var(--fill-0, #546E7A)" id="Vector_6" />
          <path d={svgPaths.p83b0880} fill="var(--fill-0, #F50057)" id="Vector_7" />
          <path d={svgPaths.p8e49870} fill="var(--fill-0, #D500F9)" id="Vector_8" />
          <path d={svgPaths.p43719f0} fill="var(--fill-0, #29B6F6)" id="Vector_9" />
          <path d={svgPaths.p38639800} fill="var(--fill-0, #00E5FF)" id="Vector_10" />
        </g>
        <defs>
          <clipPath id="clip0_1_2412">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame139() {
  return (
    <div className="content-stretch flex gap-[8px] items-center mr-[-0.333px] p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconJwt />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">SQL</p>
    </div>
  );
}

function MaterialIconThemeGit() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="material-icon-theme:git">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2482)" id="material-icon-theme:git">
          <path d={svgPaths.pd198b00} fill="var(--fill-0, #E64A19)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2482">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex gap-[8px] items-center mr-[-0.333px] p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeGit />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Git</p>
    </div>
  );
}

function FlatColorIconsLinux() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="flat-color-icons:linux">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2434)" id="flat-color-icons:linux">
          <path d={svgPaths.p778c0f0} fill="var(--fill-0, #ECEFF1)" id="Vector" />
          <path d={svgPaths.p3b5e8380} fill="var(--fill-0, #263238)" id="Vector_2" />
          <g id="Group">
            <path d={svgPaths.p581a600} fill="var(--fill-0, #ECEFF1)" id="Vector_3" />
            <path d={svgPaths.p135fde00} fill="var(--fill-0, #ECEFF1)" id="Vector_4" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.p1c13f480} fill="var(--fill-0, #212121)" id="Vector_5" />
            <path d={svgPaths.p1d914b00} fill="var(--fill-0, #212121)" id="Vector_6" />
          </g>
          <path d={svgPaths.p279cd680} fill="var(--fill-0, #FFC107)" id="Vector_7" />
          <path d={svgPaths.p299e5c30} fill="var(--fill-0, #634703)" id="Vector_8" />
          <path d={svgPaths.p16ed1d00} fill="var(--fill-0, #455A64)" id="Vector_9" />
        </g>
        <defs>
          <clipPath id="clip0_1_2434">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex gap-[8px] items-center mr-[-0.333px] p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <FlatColorIconsLinux />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Linux</p>
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="devicon:postgresql">
        <div className="absolute inset-[5.88%_7.14%_5.88%_7.54%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6513 14.1178">
            <path d={svgPaths.p199fbf80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[2.14%_3.39%_2.14%_3.8%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8503 15.314">
            <path d={svgPaths.p16518500} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[5.88%_7.14%_5.87%_7.54%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6516 14.1197">
            <path d={svgPaths.p15857200} fill="var(--fill-0, #336791)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[4.5%_5.97%_4.45%_6.21%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0504 14.568">
            <path d={svgPaths.p31f76900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">PostgreSQL</p>
    </div>
  );
}

function Frame187() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame139 />
      <Frame125 />
      <Frame128 />
      <Frame123 />
    </div>
  );
}

function VscodeIconsFileTypePytest() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="vscode-icons:file-type-pytest">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="vscode-icons:file-type-pytest">
          <path d={svgPaths.p2a415f00} fill="var(--fill-0, #696969)" id="Vector" />
          <path d={svgPaths.p87aa200} fill="var(--fill-0, #009FE3)" id="Vector_2" />
          <path d={svgPaths.p20331f00} fill="var(--fill-0, #C7D302)" id="Vector_3" />
          <path d={svgPaths.p3f3f9a70} fill="var(--fill-0, #F07E16)" id="Vector_4" />
          <path d={svgPaths.p3ac73600} fill="var(--fill-0, #DF2815)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <VscodeIconsFileTypePytest />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">MLflow</p>
    </div>
  );
}

function MaterialIconThemeDjango1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="material-icon-theme:django">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="material-icon-theme:django">
          <path d={svgPaths.p11947880} fill="var(--fill-0, #43A047)" id="Vector" />
          <path d={svgPaths.p1debccf0} fill="var(--fill-0, #43A047)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeDjango1 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">scikit-learn</p>
    </div>
  );
}

function Frame188() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame132 />
      <Frame129 />
    </div>
  );
}

function LogosPycharm() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="logos:pycharm">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2376)" id="logos:pycharm">
          <path d={svgPaths.p3dbcd1c0} fill="url(#paint0_linear_1_2376)" id="Vector" />
          <path d={svgPaths.p2d7ca780} fill="url(#paint1_linear_1_2376)" id="Vector_2" />
          <path d={svgPaths.p55c2600} fill="url(#paint2_linear_1_2376)" id="Vector_3" />
          <path d={svgPaths.p980c300} fill="url(#paint3_linear_1_2376)" id="Vector_4" />
          <path d={svgPaths.p37981400} fill="url(#paint4_linear_1_2376)" id="Vector_5" />
          <path d="M3 3H13V13H3V3Z" fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p2c739300} fill="var(--fill-0, white)" id="Vector_7" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_2376" x1="5.71312" x2="15.2348" y1="6.18107" y2="6.18107">
            <stop stopColor="#21D789" />
            <stop offset="1" stopColor="#07C3F2" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_2376" x1="-2.00318" x2="13.3772" y1="13.5033" y2="2.14986">
            <stop offset="0.01" stopColor="#FCF84A" />
            <stop offset="0.11" stopColor="#A7EB62" />
            <stop offset="0.21" stopColor="#5FE077" />
            <stop offset="0.27" stopColor="#32DA84" />
            <stop offset="0.31" stopColor="#21D789" />
            <stop offset="0.58" stopColor="#21D789" />
            <stop offset="0.6" stopColor="#21D789" />
            <stop offset="0.69" stopColor="#20D68C" />
            <stop offset="0.76" stopColor="#1ED497" />
            <stop offset="0.83" stopColor="#19D1A9" />
            <stop offset="0.9" stopColor="#13CCC2" />
            <stop offset="0.97" stopColor="#0BC6E1" />
            <stop offset="1" stopColor="#07C3F2" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_2376" x1="2.93427" x2="6.02413" y1="17.7484" y2="8.05174">
            <stop stopColor="#21D789" />
            <stop offset="0.16" stopColor="#24D888" />
            <stop offset="0.3" stopColor="#2FD985" />
            <stop offset="0.43" stopColor="#41DC80" />
            <stop offset="0.55" stopColor="#5AE079" />
            <stop offset="0.67" stopColor="#7AE46F" />
            <stop offset="0.79" stopColor="#A1EA64" />
            <stop offset="0.9" stopColor="#CFF157" />
            <stop offset="1" stopColor="#FCF84A" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_2376" x1="6.46364" x2="11.8533" y1="6.3265" y2="-0.920252">
            <stop stopColor="#21D789" />
            <stop offset="0.09" stopColor="#23D986" />
            <stop offset="0.17" stopColor="#2ADE7B" />
            <stop offset="0.25" stopColor="#36E669" />
            <stop offset="0.27" stopColor="#3BEA62" />
            <stop offset="0.35" stopColor="#47EB61" />
            <stop offset="0.49" stopColor="#67ED5D" />
            <stop offset="0.69" stopColor="#9AF156" />
            <stop offset="0.92" stopColor="#E0F64D" />
            <stop offset="1" stopColor="#FCF84A" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_2376" x1="16.673" x2="3.70616" y1="10.0449" y2="9.92429">
            <stop offset="0.39" stopColor="#FCF84A" />
            <stop offset="0.46" stopColor="#ECF74C" />
            <stop offset="0.61" stopColor="#C1F451" />
            <stop offset="0.82" stopColor="#7EEF5A" />
            <stop offset="1" stopColor="#3BEA62" />
          </linearGradient>
          <clipPath id="clip0_1_2376">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LogosPycharm />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">PyCharm</p>
    </div>
  );
}

function DashiconsRestApi() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dashicons:rest-api">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2368)" id="dashicons:rest-api">
          <path d={svgPaths.p262ec200} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2368">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DashiconsRestApi />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Rest API</p>
    </div>
  );
}

function LogosWebsocket() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="logos:websocket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="logos:websocket">
          <path d={svgPaths.p59a4e80} fill="var(--fill-0, #231F20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame137() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LogosWebsocket />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">WebSocket</p>
    </div>
  );
}

function Frame189() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame127 />
      <Frame131 />
      <Frame137 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[0.26%_0_-0.26%_-0.07%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.012px_0px] mask-size-[16px_16px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <div className="absolute inset-[-6.51%_-6.49%_-6.51%_-6.51%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0933 18.0848">
          <g id="Group">
            <path d={svgPaths.p3d32e600} fill="var(--fill-0, #0065A9)" id="Vector" />
            <g filter="url(#filter0_d_1_2341)" id="Group_2">
              <path d={svgPaths.p347de700} fill="var(--fill-0, #007ACC)" id="Vector_2" />
            </g>
            <g filter="url(#filter1_d_1_2341)" id="Group_3">
              <path d={svgPaths.p6f25200} fill="var(--fill-0, #1F9CF0)" id="Vector_3" />
            </g>
            <path clipRule="evenodd" d={svgPaths.p217d0600} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_4" opacity="0.25" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="14.2391" id="filter0_d_1_2341" width="18.0932" x="0" y="3.8457">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.520875" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_2341" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_2341" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="18.0836" id="filter1_d_1_2341" width="7.08349" x="11.0098" y="5.00757e-10">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.520875" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_2341" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_2341" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[0.26%_0_-0.26%_0]" data-name="Mask group">
      <Group3 />
    </div>
  );
}

function DeviconVscode() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="devicon:vscode">
      <MaskGroup />
    </div>
  );
}

function Frame134() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconVscode />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">VS Code</p>
    </div>
  );
}

function Frame136() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="relative shrink-0 size-[16px]" data-name="devicon:bash">
        <div className="-translate-y-1/2 absolute aspect-[14.00012493133545/16] left-[6.25%] right-[6.25%] top-[calc(50%+0.5px)]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0001 16">
            <path d={svgPaths.p65cd980} fill="var(--fill-0, #293138)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[72.31%_20.24%_20.09%_71.16%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.37588 1.21687">
            <path d={svgPaths.p1f9cf0c0} fill="var(--fill-0, #4FA847)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Bash</p>
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="relative shrink-0 size-[16px]" data-name="material-icon-theme:nginx">
        <div className="absolute inset-[0_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
            <path d={svgPaths.p3bbc1700} fill="var(--fill-0, #43A047)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Nginx</p>
    </div>
  );
}

function Frame190() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame134 />
      <Frame136 />
      <Frame130 />
    </div>
  );
}

function PythonTechChip() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center p-[8px] relative rounded-[16px] shrink-0 w-[105px]">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemePython />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-black tracking-[0.48px] whitespace-nowrap">Python</p>
    </div>
  );
}

function Frame191() {
  return (
    <div className="site-course-tech-stack content-stretch flex flex-wrap gap-[8px] items-center justify-center relative shrink-0 w-[350px]">
      <div className="site-course-tech-row relative shrink-0">
        <PythonTechChip />
        <Frame135 />
        <Frame138 />
      </div>
      <div className="site-course-tech-row relative shrink-0">
        <Frame133 />
        <Frame123 />
        <Frame131 />
      </div>
      <div className="site-course-tech-row relative shrink-0">
        <Frame126 />
        <Frame125 />
        <Frame128 />
        <Frame136 />
      </div>
      <div className="site-course-tech-row relative shrink-0">
        <Frame129 />
        <Frame137 />
      </div>
      <div className="site-course-tech-row relative shrink-0">
        <Frame140 />
        <Frame127 />
        <Frame134 />
      </div>
      <div className="site-course-tech-row site-course-tech-row--last relative shrink-0">
        <Frame139 />
        <Frame132 />
        <Frame130 />
      </div>
    </div>
  );
}

function Frame285() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[20px] relative size-full">
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px] text-black uppercase whitespace-nowrap">
            <p className="mb-0 text-[40px]">
              <span className="leading-[43px]">Ваше</span>
              <span className="leading-[43px] text-[#bfbfbf]">{` `}</span>
              <span className="leading-[43px] text-[#9c78ff]">резюме</span>
            </p>
            <p className="leading-[43px] text-[40px]">после курса</p>
          </div>
          <Frame192 />
          <Frame191 />
        </div>
      </div>
    </div>
  );
}

function Frame88() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">40+ индивидуальных встреч с наставником</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full whitespace-pre-wrap">
        <p className="leading-[18px] mb-0">Вы занимаетесь один на один</p>
        <p className="leading-[18px] mb-0">{`с наставником, последовательно проходите программу, разбираете сложные темы, получаете ответы на вопросы и двигаетесь в комфортном `}</p>
        <p className="leading-[18px]">для себя темпе</p>
      </div>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame88 />
      <div className="aspect-[1584/849] overflow-hidden relative rounded-[16px] shrink-0 w-full" data-name="1 8001">
        <img alt="Пример проектной работы на курсе ИННОПРОГ" title="Пример проектной работы на курсе ИННОПРОГ" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img18001} />
      </div>
    </div>
  );
}

function Frame89() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">150+ теоретических материалов</p>
        <p className="leading-[27px]">с практическими примерами</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Теорию вы изучаете в удобном формате видеоуроков и не только: с объяснением ключевых тем, примерами кода</p>
        <p className="leading-[18px] mb-0">и дополнительными материалами</p>
        <p className="leading-[18px]">для закрепления</p>
      </div>
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame89 />
      <div className="aspect-[1148/720] overflow-hidden relative rounded-[16px] shrink-0 w-full">
        <video
          autoPlay
          className="absolute inset-0 size-full object-contain"
          data-course-autoplay-video
          loop
          muted
          onCanPlay={(event) => {
            event.currentTarget.defaultMuted = true;
            event.currentTarget.muted = true;
            if (event.currentTarget.paused) {
              void event.currentTarget.play().catch(() => undefined);
            }
          }}
          playsInline
          preload="auto"
          src="/videos/course-ai-autoplay.mp4"
        />
      </div>
    </div>
  );
}

function Frame91() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">13 проектных работ</p>
        <p className="leading-[27px]">для портфолио</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Во время обучения вы работаете</p>
        <p className="leading-[18px] mb-0">над проектами разного уровня сложности, закрепляете навыки на практике</p>
        <p className="leading-[18px]">и постепенно собираете портфолио</p>
      </div>
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Frame91 />
      <div className="aspect-[3024/1790] overflow-hidden relative rounded-[16px] shrink-0 w-full" data-name="3 35">
        <img alt="Проект ученика ИННОПРОГ в портфолио" title="Проект ученика ИННОПРОГ в портфолио" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img335} />
      </div>
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[24px] text-white uppercase w-full">
        <p className="leading-[27px] mb-0">Личный чат</p>
        <p className="leading-[27px] mb-0">с наставником</p>
        <p className="leading-[27px]">и обратная связь</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-white tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">У вас будет личный чат с наставником,</p>
        <p className="leading-[18px] mb-0">где можно задавать вопросы вне занятий, отправлять домашние задания и получать подробную обратную связь</p>
        <p className="leading-[18px]">по выполненной работе</p>
      </div>
      <div className="aspect-[1936/1674] overflow-hidden relative rounded-[16px] shrink-0 w-full" data-name="4 20501">
        <img alt="Практический проект на платформе ИННОПРОГ" title="Практический проект на платформе ИННОПРОГ" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img420501} />
      </div>
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame90 />
    </div>
  );
}

function Frame97() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">Платформа-тренажёр</p>
        <p className="leading-[27px]">для отработки навыков</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">На платформе вы решаете практические задания, отрабатываете навыки</p>
        <p className="leading-[18px]">и закрепляете материал в интерактивном формате — без необходимости использовать сторонние сервисы</p>
      </div>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Frame97 />
      <div className="aspect-[2894/1638] overflow-hidden relative rounded-[16px] shrink-0 w-full" data-name="5 134">
        <img alt="Пример результата проектной работы ИННОПРОГ" title="Пример результата проектной работы ИННОПРОГ" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5134} />
      </div>
    </div>
  );
}

function Frame242() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame92 />
      <Frame93 />
      <Frame95 />
      <Frame94 />
      <Frame96 />
    </div>
  );
}

function Frame112() {
  return (
    <div className="bg-[#9c78ff] min-h-[2324px] relative rounded-[40px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] w-full">
        <div className="site-course-structure-mobile-stage content-stretch flex flex-col gap-[16px] items-start px-[20px] py-[32px] relative w-full">
          <div className="site-course-structure-mobile-title [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[43px] min-w-full relative shrink-0 text-[#464a6a] text-[40px] uppercase w-[min-content]">
            <p className="mb-0 whitespace-nowrap">Курс состоит</p>
            <p className="whitespace-nowrap">из</p>
          </div>
          <div className="site-course-structure-mobile-arrow-slot h-[128px] mt-[-48px] relative shrink-0 w-full" aria-hidden="true">
            <img
              alt=""
              className="site-course-structure-mobile-arrow block h-full mx-auto object-contain pointer-events-none w-auto"
              data-name="image 123"
              decoding="sync"
              fetchPriority="high"
              height={128}
              loading="eager"
              src={imgCourseStructureArrowFull}
              width={116}
            />
          </div>
          <Frame242 />
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-bold gap-[16px] items-start leading-[0] relative shrink-0 uppercase w-[350px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] relative shrink-0 text-[#9c78ff] text-[0px] w-full">
        <span className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] text-[40px]">13</span>
        <span className="leading-[43px] text-[40px]">{` проектных работ`}</span>
      </p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] relative shrink-0 text-[20px] text-black w-full">
        <p className="leading-[20px] mb-0">которые вы создадите</p>
        <p className="leading-[20px]">на курсе</p>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">Система учёта фруктов на складе</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Разработаете программу для учёта товаров на складе: добавление позиций, контроль остатков, обновление количества и формирование понятного отчёта по доступной продукции</p>
    </div>
  );
}

function Frame69() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">База зарплат сотрудников</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Создадите удобную систему для хранения данных о сотрудниках, управления зарплатами и быстрого поиска информации, которая поможет автоматизировать базовые HR-</p>
        <p className="leading-[18px]">и бухгалтерские процессы</p>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">Менеджер задач</p>
        <p className="leading-[27px]">в консоли</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Разработаете приложение для постановки, отслеживания и закрытия задач,</p>
        <p className="leading-[18px]">которое позволит удобно управлять личными или рабочими делами в одном месте</p>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">{`Телеграм-бот для управления задачами `}</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Создадите Telegram-бота, с помощью которого пользователи смогут добавлять задачи, просматривать список дел</p>
        <p className="leading-[18px] mb-0">и отмечать выполненные пункты прямо</p>
        <p className="leading-[18px]">в мессенджер</p>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">Сервис бронирования поездок</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Разработаете систему для оформления поездок, учёта клиентов и транспорта,</p>
        <p className="leading-[18px]">которая моделирует работу небольшого сервиса заказа машин и помогает автоматизировать процесс бронирования</p>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">Сервис управления пассажирскими перевозками</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Создадите приложение для учёта транспорта, вместимости и пассажиров, которое позволяет моделировать посадку, контролировать загрузку и отслеживать доступные места</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">Складской менеджер товаров</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Разработаете систему управления ассортиментом магазина с учётом остатков, цен и доступности товаров, которая поможет быстро находить нужные позиции и контролировать склад</p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">Key-Value хранилище</p>
        <p className="leading-[27px]">на дереве поиска</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Создадите собственную систему хранения данных с быстрым добавлением, поиском, обновлением и удалением записей,</p>
        <p className="leading-[18px] mb-0">чтобы глубже понять работу алгоритмов</p>
        <p className="leading-[18px]">и структур данных на практике</p>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">Веб-приложение прогноза погоды</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Разработаете современный сайт, который показывает актуальную погоду</p>
        <p className="leading-[18px]">по выбранному городу, используя внешние API, удобный интерфейс и понятное отображение данных для пользователя</p>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">Telegram-бот</p>
        <p className="leading-[27px]">с прогнозом погоды</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Создадите бота, который по запросу пользователя показывает прогноз погоды, помогает быстро получать нужную информацию и демонстрирует работу</p>
        <p className="leading-[18px]">с API и Telegram-интерфейсом</p>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[24px] uppercase w-full whitespace-pre-wrap">
        <p className="leading-[27px] mb-0">{`Telegram-бот для `}</p>
        <p className="leading-[27px]">бронирования столиков</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Разработаете бота для ресторанов и кафе, через которого клиенты смогут выбрать дату, время и количество гостей, а бизнес — удобно принимать и обрабатывать заявки</p>
    </div>
  );
}

function Frame79() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">Telegram-магазин</p>
        <p className="leading-[27px]">с каталогом и корзиной</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Создадите Telegram-бота с каталогом товаров, карточками, корзиной и логикой оформления заказа, который станет удобным инструментом для продаж прямо в мессенджере</p>
    </div>
  );
}

function Frame80() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] relative shrink-0 text-[24px] uppercase w-full">Django-приложение интернет-магазина</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Разработаете полноценный интернет-магазин на Django с каталогом товаров, карточками, изображениями</p>
        <p className="leading-[18px] mb-0">и структурированной базой данных</p>
        <p className="leading-[18px]">для удобного управления ассортиментом</p>
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">Интернет-магазин</p>
        <p className="leading-[27px] mb-0">с регистрацией</p>
        <p className="leading-[27px]">и корзиной</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full whitespace-pre-wrap">
        <p className="leading-[18px] mb-0">{`Создадите более продвинутый `}</p>
        <p className="leading-[18px] mb-0">{`e-commerce проект с авторизацией пользователей, корзиной, добавлением `}</p>
        <p className="leading-[18px]">и удалением товаров, что приблизит проект к реальной коммерческой разработке</p>
      </div>
    </div>
  );
}

function Frame82() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[24px] uppercase w-full">
        <p className="leading-[27px] mb-0">Продакшн-версия интернет-магазина</p>
        <p className="leading-[27px]">на Django</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Разработаете полноценный веб-проект</p>
        <p className="leading-[18px] mb-0">с Django, PostgreSQL, административной панелью, серверной настройкой, деплоем</p>
        <p className="leading-[18px]">на Linux и полноценной архитектурой, приближенной к реальным требованиям бизнес</p>
      </div>
    </div>
  );
}

function Frame197() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full site-carousel site-course-projects-carousel" data-carousel="python-mobile-projects">
      {dataScienceMobileProjects.map((project, index) => (
        <DataScienceMobileProjectCard index={index} key={project.title} project={project} />
      ))}
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 site-course-carousel-actions site-course-carousel-actions--projects">
      <button aria-label="Предыдущие проекты" className="bg-transparent flex items-center justify-center p-0 relative shrink-0" data-carousel-action="prev" data-carousel-target="python-mobile-projects" onClick={(event) => handleCourseCarouselClick(event, "python-mobile-projects", -1)} type="button">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-center justify-center p-[12px] relative rounded-[32px] size-[44px]">
            <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[32px]" />
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="absolute inset-[-1.82%_-3.65%_-1.82%_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7295 20.7282">
                  <path d={svgPaths.p50fce00} id="Vector 119" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button aria-label="Следующие проекты" className="bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-center justify-center p-[12px] relative rounded-[32px] shrink-0 size-[44px]" data-carousel-action="next" data-carousel-target="python-mobile-projects" onClick={(event) => handleCourseCarouselClick(event, "python-mobile-projects", 1)} type="button">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.82%_-3.65%_-1.82%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7295 20.7282">
              <path d={svgPaths.p50fce00} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame199() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[5913px]">
      <Frame18 />
    </div>
  );
}

function Frame279() {
  return (
    <div className="site-course-mobile-projects-list-wrap content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame197 />
      <Frame199 />
    </div>
  );
}

function Frame198() {
  return (
    <div className="site-course-mobile-projects-section content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[350px]">
      <Frame67 />
      <Frame279 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold gap-[8px] items-end justify-center leading-[28px] relative shrink-0 text-[32px] text-white uppercase whitespace-nowrap">
      <p className="relative shrink-0">Что вы получите</p>
      <p className="relative shrink-0 text-right">после обучения</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[345px]">
      <div className="h-[110px] relative shrink-0 w-[165px]" data-name="Group 682 1">
        <img alt="Официальный диплом ИТ-школы ИННОПРОГ" title="Официальный диплом ИТ-школы ИННОПРОГ" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGroup6821} />
      </div>
      <div className="h-[110px] relative shrink-0 w-[164px]" data-name="diplom_prof 1">
        <img alt="Диплом о профессиональной переподготовке ИННОПРОГ" title="Диплом о профессиональной переподготовке ИННОПРОГ" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDiplomProf1} />
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex font-['Manrope:Regular',sans-serif] font-normal gap-[16px] items-start leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.36px] w-full">
      <div className="relative shrink-0 w-[167px]">
        <p className="leading-[16px] mb-0">(1) Официальный диплом ИТ-школы ИННОПРОГ подтверждает уровень квалификации и помогает</p>
        <p className="leading-[16px]">в трудоустройстве</p>
      </div>
      <div className="flex-[1_0_0] min-w-px relative">
        <p className="leading-[16px] mb-0">(2) Удостоверение</p>
        <p className="leading-[16px] mb-0">о повышении квалификации и диплом</p>
        <p className="leading-[16px]">о профпереподготовке установленного образца</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame14 />
      <Frame34 />
    </div>
  );
}

function Frame179() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Frame33 />
      <Frame35 />
    </div>
  );
}

function Component1() {
  return (
    <div className="bg-gradient-to-b from-[rgba(156,120,255,0.8)] h-[413px] mb-[-40px] overflow-hidden relative rounded-tl-[40px] rounded-tr-[40px] shrink-0 to-[rgba(112,60,255,0.8)] w-[390px]" data-name="документы">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[20px] py-[40px] relative size-full">
          <Frame179 />
        </div>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="site-course-pdf-download--hidden bg-[#9c78ff] content-stretch flex items-center justify-center p-[12px] relative rounded-[40px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">скачать полную версию в PDF</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[8.34%_14.58%_14.58%_8.34%]" data-name="Group">
      <div className="absolute inset-[-6.08%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8333 13.8333">
          <g id="Group">
            <path d={svgPaths.p339c2e40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1ce54200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconParkOutlinePersonalPrivacy() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon-park-outline:personal-privacy">
      <Group4 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
      <IconParkOutlinePersonalPrivacy />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Индивидуальные занятия</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[4.16%_16.68%_8.34%_12.5%]" data-name="Group">
      <div className="absolute inset-[-5.36%_-6.64%_-5.36%_-6.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8327 15.5">
          <g id="Group">
            <g id="Vector" />
            <path d={svgPaths.p36570a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
            <path d="M0.75 4.75V14.75H8.08333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TdesignTaskDouble() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="tdesign:task-double">
      <Group5 />
    </div>
  );
}

function Frame101() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
      <TdesignTaskDouble />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">38 теоретических материалов</p>
    </div>
  );
}

function GrommetIconsTask() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="grommet-icons:task">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2274)" id="grommet-icons:task">
          <path d={svgPaths.p1c012980} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_2274">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
      <GrommetIconsTask />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">300 практических работ</p>
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
      <Frame47 />
      <Frame101 />
      <Frame100 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <Frame66 />
      <Frame102 />
    </div>
  );
}

function Frame202() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[350px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[40px] text-white uppercase w-[min-content]">
        <p className="leading-[43px] mb-0">Программа</p>
        <p className="leading-[43px]">обучения</p>
      </div>
      <Frame103 />
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(1) Python начальный</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(2) Python продвинутый</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">
        <p className="leading-[20px] mb-0">(3) Алгоритмы и структуры</p>
        <p className="leading-[20px]">{`данных `}</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(4) Git и GitHub</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame106() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-pre">{`(5) основы языка SQL  `}</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(6) PostgreSQL</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(7) HTML/CSS/JavaScript</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(8) Linux</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">
        <p className="leading-[20px] mb-0">(9) АЛГоритмы и структуры</p>
        <p className="leading-[20px]">данных</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(10) создание Telegram-бота</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-left text-white tracking-[0.48px] uppercase whitespace-nowrap">(11) Django</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-1.3%_-2.61%_-1.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
                <path d={svgPaths.p16c30c80} id="Vector 119" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCourseProgramModuleCard({
  module,
  index,
  isOpen,
  onToggle,
}: {
  module: CourseProgramModule;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`site-course-program-module site-course-program-module--mobile ${isOpen ? "is-open" : ""}`}>
      <button
        aria-expanded={isOpen}
        className="site-course-program-toggle"
        onClick={onToggle}
        type="button"
      >
        <span className="site-course-program-title">{`(${index + 1}) ${module.title}`}</span>
        <span className="site-course-program-chevron" aria-hidden>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7295 28.7282">
            <path d={svgPaths.p16c30c80} stroke="currentColor" />
          </svg>
        </span>
      </button>
      <div aria-hidden={!isOpen} className="site-course-program-panel-shell">
        <div className="site-course-program-panel">
          <div className="site-course-program-panel-inner">
            <div className="site-course-program-tags">
              {module.tags.map((tag) => (
                <span className="site-course-program-tag" key={tag}>
                  <CourseProgramTagIcon tag={tag} />
                  <span className="site-course-program-tag-label">{tag}</span>
                </span>
              ))}
            </div>
            <p className="site-course-program-description">{module.description}</p>
            <ul className="site-course-program-topics">
              {module.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame201() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="site-course-program-list site-course-program-list--mobile">
      {dataScienceCourseProgramModules.map((module, index) => (
        <MobileCourseProgramModuleCard
          key={module.title}
          index={index}
          isOpen={openIndex === index}
          module={module}
          onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
        />
      ))}
    </div>
  );
}

function Frame203() {
  return (
    <div className="bg-[#464a6a] content-stretch flex flex-col gap-[40px] items-center py-[40px] relative rounded-[24px] shrink-0 w-[390px] z-10">
      <Frame202 />
      <Frame201 />
    </div>
  );
}

function Frame280() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[390px]">
      <Component1 />
      <Frame203 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 site-course-render-section site-course-teachers-section" data-name="преподаватели">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px] text-white uppercase w-[349px] site-mobile-teachers-title">
        <p className="leading-[43px] mb-0 text-[40px] text-[rgba(255,255,255,0.4)]">наши</p>
        <p className="leading-[40px] text-[36px]">преподаватели</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Сергей</p>
        <p className="leading-[18px]">Попкович</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Григорий</p>
        <p className="leading-[18px]">Чепель</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Павел</p>
        <p className="leading-[18px]">Мягчилов</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Джамбулат</p>
        <p className="leading-[18px]">Таджидинов</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Unreal Engine разработчик</p>
    </div>
  );
}

function Frame174() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="Преподаватель Сергей Попкович" title="Преподаватель Сергей Попкович" className="absolute h-[112.27%] left-[-26.49%] max-w-none top-[-12.31%] w-[160.6%]" src={imgRectangle40082} />
            </div>
          </div>
        </div>
        <Frame36 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="Преподаватель Данила Дробышев" title="Преподаватель Данила Дробышев" className="absolute h-full left-[-3.59%] max-w-none top-[2.23%] w-[107.19%]" src={imgRectangle40083} />
            </div>
          </div>
        </div>
        <Frame37 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="Преподаватель Григорий Чепель" title="Преподаватель Григорий Чепель" className="absolute h-[134.96%] left-0 max-w-none top-[-13.66%] w-full" src={imgRectangle40084} />
            </div>
          </div>
        </div>
        <Frame38 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="Преподаватель Алан Агузаров" title="Преподаватель Алан Агузаров" className="absolute h-[121.53%] left-[2.4%] max-w-none top-[-18.12%] w-[97.68%]" src={imgRectangle40085} />
            </div>
          </div>
        </div>
        <Frame39 />
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Данила</p>
        <p className="leading-[18px]">Дробышев</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">С++ разработчик</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Алан</p>
        <p className="leading-[18px]">Агузаров</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Data Scientist</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">ПОЛИНА</p>
        <p className="leading-[18px]">КАРАЕВА</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full whitespace-pre-wrap">
        <p className="leading-[18px] mb-0">{`Лев `}</p>
        <p className="leading-[18px]">Быков</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Java-разработчик</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <img alt="Преподаватель Павел Мягчилов" title="Преподаватель Павел Мягчилов" className="absolute max-w-none object-bottom rounded-[32px] size-full" src={imgRectangle40086} />
          </div>
        </div>
        <Frame40 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <img alt="Преподаватель Джамбулат Таджидинов" title="Преподаватель Джамбулат Таджидинов" className="absolute max-w-none object-bottom rounded-[32px] size-full" src={imgRectangle40087} />
          </div>
        </div>
        <Frame41 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="Преподаватель Полина Караева" title="Преподаватель Полина Караева" decoding="async" loading="lazy" className="absolute h-[123.09%] left-[5.67%] max-w-none top-[-7.86%] w-[87.96%]" src={imgRectangle40088} />
            </div>
          </div>
        </div>
        <Frame43 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="Преподаватель Лев Быков" title="Преподаватель Лев Быков" decoding="async" loading="lazy" className="absolute h-[139.81%] left-[-0.08%] max-w-none top-[-12.58%] w-full" src={imgRectangle40089} />
            </div>
          </div>
        </div>
        <Frame44 />
      </div>
    </div>
  );
}

function Frame175() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[350px]">
      <Frame174 />
      <Frame42 />
    </div>
  );
}

function Frame244() {
  return (
    <div className="bg-[#464a6a] content-stretch flex flex-col gap-[40px] items-center py-[40px] relative rounded-[40px] shrink-0 w-[390px]">
      <Component2 />
      <Frame175 />
    </div>
  );
}

function Frame200() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center relative shrink-0 w-full">
      <Frame184 />
      <Frame274 />
      <Frame273 />
      <Frame193 />
      <Frame285 />
      <Frame112 />
      <Frame198 />
      <Frame280 />
      <MainScreenMobileTeachersSection />
      <div className="-translate-x-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[75.5px] text-[14px] text-center text-white top-[612px] tracking-[0.42px] w-[91px]">
        <p className="leading-[18px] mb-0">Junior</p>
        <p className="leading-[18px]">(начальный)</p>
      </div>
      <div className="-translate-x-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[193px] text-[14px] text-center text-white top-[612px] tracking-[0.42px] w-[78px]">
        <p className="leading-[18px] mb-0">Middle</p>
        <p className="leading-[18px]">(средний)</p>
      </div>
      <div className="-translate-x-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal leading-[0] left-[312.5px] text-[14px] text-center text-white top-[612px] tracking-[0.42px] w-[76px]">
        <p className="leading-[18px] mb-0">Senior</p>
        <p className="leading-[18px]">(старший)</p>
      </div>
    </div>
  );
}

function Frame222() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 uppercase w-[348px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[32px] relative shrink-0 text-[32px] text-white w-full">Отзывы учеников</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] tracking-[0.48px] w-full">о курсе Data Science</p>
    </div>
  );
}

function Frame220() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">4.9</p>
      <div className="relative shrink-0 size-[18px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.119 16.2812">
            <path d={svgPaths.p32db9e00} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame218() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] text-black uppercase whitespace-nowrap">ВИЛЬДАН С.</p>
      <Frame220 />
    </div>
  );
}

function Frame214() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame218 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] tracking-[0.48px] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame253() {
  return (
    <div className="content-stretch flex flex-col h-[214px] items-center overflow-clip relative shrink-0 w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-black tracking-[0.42px] w-full">
        <p className="leading-[20px] mb-0">Всё нравится, обучаюсь</p>
        <p className="leading-[20px] mb-0">с удовольствием, спустя 2-3 месяца появилось понимание того, чем именно хотел бы заниматься дальше</p>
        <p className="leading-[20px] mb-0">в разработке. Преподаватель Артемий всё разжевывает</p>
        <p className="leading-[20px]">и объясняет. Администрация школы очень отзывчивая, если вдруг возникают вопросы отвечают развернуто и без затягиваний. На данный момент уже рассматриваю переход на новое место работы, сейчас готовлюсь к ...</p>
      </div>
    </div>
  );
}

function Frame250() {
  return (
    <span className="bg-transparent border-0 content-stretch cursor-pointer flex items-center justify-center p-0 py-[8px] relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:ExtraLight',sans-serif] font-extralight leading-[20px] min-w-px relative text-[14px] text-black text-right">{`читать полностью `}</p>
    </span>
  );
}

function Frame249() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame253 />
      <Frame250 />
    </div>
  );
}

function Frame215() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">Уже рассматриваю переход на новое место работы</p>
      <Frame249 />
    </div>
  );
}

function Frame216() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame214 />
      <Frame215 />
    </div>
  );
}

function Frame224() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">5.0</p>
      <div className="relative shrink-0 size-[18px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.119 16.2812">
            <path d={svgPaths.p32db9e00} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame223() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] text-black uppercase whitespace-nowrap">ВЕНИАМИН</p>
      <Frame224 />
    </div>
  );
}

function Frame221() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame223 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] tracking-[0.48px] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame255() {
  return (
    <div className="content-stretch flex flex-col h-[214px] items-center overflow-clip relative shrink-0 w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-black tracking-[0.42px] w-full whitespace-pre-wrap">
        <p className="leading-[20px] mb-0">{`Изначально искал репетитора или наставника для самостоятельного изучения Python. Очень скиптически отношусь к курсам, где тебе дают доступ к урокам и пдфкам. Благо в данной школе всё совмещается, занятия и платформа, да и в целом прогресс пошел заметно быстрее. Нравится, что преподаватели работают здесь не только «за деньги», `}</p>
        <p className="leading-[20px]">а за идею</p>
      </div>
    </div>
  );
}

function Frame256() {
  return (
    <span className="bg-transparent border-0 content-stretch cursor-pointer flex items-center justify-center p-0 py-[8px] relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:ExtraLight',sans-serif] font-extralight leading-[20px] min-w-px relative text-[14px] text-black text-right">{`читать полностью `}</p>
    </span>
  );
}

function Frame254() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame255 />
      <Frame256 />
    </div>
  );
}

function Frame225() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">
        <p className="leading-[19px] mb-0">Преподаватели работают здесь не только</p>
        <p className="leading-[19px]">«за деньги», а за идею</p>
      </div>
      <Frame254 />
    </div>
  );
}

function Frame217() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame221 />
      <Frame225 />
    </div>
  );
}

function Frame229() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">4.9</p>
      <div className="relative shrink-0 size-[18px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.119 16.2812">
            <path d={svgPaths.p32db9e00} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame228() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] text-black uppercase whitespace-nowrap">Илья</p>
      <Frame229 />
    </div>
  );
}

function Frame227() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame228 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] tracking-[0.48px] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame258() {
  return (
    <div className="content-stretch flex flex-col h-[214px] items-center overflow-clip relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">Выбрал данную школу для подготовки к отбору на стажировку в Яндекс нужно было подтянуть алгоритмы и задачи, которые обычно дают на тех. секции. На занятиях много решали задач, разбирали разные подходы к их решению и учились правильно объяснять ход мыслей как это требуется на собесе. Постепенно стало намного легче ориентироваться в алгоритмических задачах. Результатом доволен, собес удалось ...</p>
    </div>
  );
}

function Frame259() {
  return (
    <span className="bg-transparent border-0 content-stretch cursor-pointer flex items-center justify-center p-0 py-[8px] relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:ExtraLight',sans-serif] font-extralight leading-[20px] min-w-px relative text-[14px] text-black text-right">{`читать полностью `}</p>
    </span>
  );
}

function Frame257() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame258 />
      <Frame259 />
    </div>
  );
}

function Frame230() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[19px] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">Результатом доволен, собес удалось пройти, сейчас стажируюсь</p>
      <Frame257 />
    </div>
  );
}

function Frame226() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame227 />
      <Frame230 />
    </div>
  );
}

function Frame234() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">4.8</p>
      <div className="relative shrink-0 size-[18px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.119 16.2812">
            <path d={svgPaths.p32db9e00} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame233() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] text-black uppercase whitespace-nowrap">андрей</p>
      <Frame234 />
    </div>
  );
}

function Frame232() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame233 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] tracking-[0.48px] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame261() {
  return (
    <div className="content-stretch flex flex-col h-[214px] items-center overflow-clip relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">{`В связи с тем, что самостоятельное изучение Python обернулось неудачей принял решение записаться на занятия, чтобы перенимать опыт из "первых" рук. Обучением полностью доволен, каждый урок теория и практика, и ещё ДЗ; постоянная обратная связь по любым вопросам как со стороны администрации, так и преподавателя. Спасибо администрации школы за организацию и курирование обучения, а преподавателю Сергею - за интересные...`}</p>
    </div>
  );
}

function Frame262() {
  return (
    <span className="bg-transparent border-0 content-stretch cursor-pointer flex items-center justify-center p-0 py-[8px] relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:ExtraLight',sans-serif] font-extralight leading-[20px] min-w-px relative text-[14px] text-black text-right">{`читать полностью `}</p>
    </span>
  );
}

function Frame260() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame261 />
      <Frame262 />
    </div>
  );
}

function Frame235() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[19px] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">Обучением полностью доволен</p>
      <Frame260 />
    </div>
  );
}

function Frame231() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame232 />
      <Frame235 />
    </div>
  );
}

function Group6() {
  return (
    <div className="relative size-full" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 290.859 290.824">
        <g id="Group">
          <path d={svgPaths.p18267cf0} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p106d400} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.pa4e4700} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
          <path d={svgPaths.p3c909300} fill="var(--fill-0, #9C78FF)" id="Vector_4" />
          <path d={svgPaths.p15faad00} fill="var(--fill-0, #9C78FF)" id="Vector_5" />
          <path d={svgPaths.p2b861570} fill="var(--fill-0, #9C78FF)" id="Vector_6" />
          <path d={svgPaths.p224c2400} fill="var(--fill-0, #9C78FF)" id="Vector_7" />
          <path d={svgPaths.p23ecd200} fill="var(--fill-0, #9C78FF)" id="Vector_8" />
          <path d={svgPaths.p39cb9af0} fill="var(--fill-0, #9C78FF)" id="Vector_9" />
          <path d={svgPaths.pbb57c80} fill="var(--fill-0, #9C78FF)" id="Vector_10" />
          <path d={svgPaths.p119c8300} fill="var(--fill-0, #9C78FF)" id="Vector_11" />
          <path d={svgPaths.p10695480} fill="var(--fill-0, #9C78FF)" id="Vector_12" />
          <path d={svgPaths.p256c7780} fill="var(--fill-0, #9C78FF)" id="Vector_13" />
          <path d={svgPaths.p3814a500} fill="var(--fill-0, #9C78FF)" id="Vector_14" />
          <path d={svgPaths.p2d129140} fill="var(--fill-0, #9C78FF)" id="Vector_15" />
          <path d={svgPaths.p872ed00} fill="var(--fill-0, #9C78FF)" id="Vector_16" />
          <path d={svgPaths.p2a438c70} fill="var(--fill-0, #9C78FF)" id="Vector_17" />
          <path d={svgPaths.p1197f900} fill="var(--fill-0, #9C78FF)" id="Vector_18" />
          <path d={svgPaths.p23b26c00} fill="var(--fill-0, #9C78FF)" id="Vector_19" />
          <path d={svgPaths.p3b34b200} fill="var(--fill-0, #9C78FF)" id="Vector_20" />
          <path d={svgPaths.p37850380} fill="var(--fill-0, #9C78FF)" id="Vector_21" />
          <path d={svgPaths.p3321c300} fill="var(--fill-0, #9C78FF)" id="Vector_22" />
          <path d={svgPaths.p1b52c480} fill="var(--fill-0, #9C78FF)" id="Vector_23" />
          <path d={svgPaths.p1bf385f0} fill="var(--fill-0, #9C78FF)" id="Vector_24" />
          <path d={svgPaths.p475ca80} fill="var(--fill-0, #9C78FF)" id="Vector_25" />
          <path d={svgPaths.pcd03700} fill="var(--fill-0, #9C78FF)" id="Vector_26" />
          <path d={svgPaths.p7f9de00} fill="var(--fill-0, #9C78FF)" id="Vector_27" />
          <path d={svgPaths.p8b90600} fill="var(--fill-0, #9C78FF)" id="Vector_28" />
          <path d={svgPaths.p2529c500} fill="var(--fill-0, #9C78FF)" id="Vector_29" />
          <path d={svgPaths.p4a88100} fill="var(--fill-0, #9C78FF)" id="Vector_30" />
          <path d={svgPaths.p2a3e4800} fill="var(--fill-0, #9C78FF)" id="Vector_31" />
          <path d={svgPaths.p155a4500} fill="var(--fill-0, #9C78FF)" id="Vector_32" />
          <path d={svgPaths.p2f1c6400} fill="var(--fill-0, #9C78FF)" id="Vector_33" />
          <path d={svgPaths.p1bcafe80} fill="var(--fill-0, #9C78FF)" id="Vector_34" />
          <path d={svgPaths.p8458000} fill="var(--fill-0, #9C78FF)" id="Vector_35" />
          <path d={svgPaths.p7121180} fill="var(--fill-0, #9C78FF)" id="Vector_36" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[16.76%_15.75%_17.88%_16.47%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 226.383 218.291">
        <g id="Group">
          <path d={svgPaths.p1e050a00} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <g id="Group_2">
            <g id="Vector_2" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p27dcea80} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.pe7ac00} fill="var(--fill-0, black)" id="Vector_4" />
          </g>
          <path d={svgPaths.p26939880} fill="var(--fill-0, black)" id="Vector_5" />
          <g id="Group_4">
            <path d={svgPaths.p1280e500} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p14d0cc00} fill="var(--fill-0, black)" id="Vector_7" />
          </g>
          <g id="Group_5">
            <path d={svgPaths.p28412c80} fill="var(--fill-0, black)" id="Vector_8" />
          </g>
          <g id="Group_6">
            <path d={svgPaths.p1becc480} fill="var(--fill-0, #9C78FF)" id="Vector_9" />
            <path d={svgPaths.p384e640} fill="var(--fill-0, #9C78FF)" id="Vector_10" />
            <path d={svgPaths.p1f6bda80} fill="var(--fill-0, #9C78FF)" id="Vector_11" />
            <path d={svgPaths.p2a26d000} fill="var(--fill-0, #9C78FF)" id="Vector_12" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] opacity-10 overflow-clip size-[334px] top-[calc(50%+0.5px)]" data-name="avatar">
      <div className="absolute flex inset-[-4.44%_-4.48%_-4.48%_-4.43%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-76.3834cqw,23.6123cqh)] rotate-[72.82deg] w-[hypot(23.6166cqw,76.3877cqh)]">
          <Group6 />
        </div>
      </div>
      <Group7 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black text-center uppercase whitespace-nowrap">Мы ценим каждого</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[0] min-w-full relative shrink-0 text-[16px] text-black text-center tracking-[0.48px] uppercase w-[min-content]">
        <p className="leading-[20px] mb-0">Вдохновляйтесь историями успеха реальных людей</p>
        <p className="leading-[20px]">Их результат может стать вашим</p>
      </div>
      <button className="bg-[rgba(156,120,255,0.6)] content-stretch cursor-pointer flex items-center justify-center p-[16px] relative rounded-[40px] shrink-0" data-name="кнопки пд" data-reviews-all="python" type="button">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-left text-white whitespace-pre">{`смотреть все  отзывы`}</p>
      </button>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
      <Avatar />
      <Frame16 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white drop-shadow-[6px_6px_10px_rgba(0,0,0,0.17)] h-full relative rounded-bl-[40px] rounded-tl-[40px] rounded-tr-[40px] shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[40px] relative size-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Frame248() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full site-carousel site-course-reviews-carousel" data-carousel="python-mobile-reviews">
      <a className="bg-white cursor-pointer no-underline relative rounded-[32px] shrink-0 text-inherit w-[258px]" data-course-review="vildan" data-name="отзвывы все" draggable={false} href="/reviews?direction=python#review-vildan">
        <div className="content-stretch flex flex-col items-end overflow-clip px-[20px] py-[24px] relative rounded-[inherit] size-full">
          <Frame216 />
        </div>
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[32px]" />
      </a>
      <a className="bg-white cursor-pointer no-underline relative rounded-[32px] shrink-0 text-inherit w-[258px]" data-course-review="veniamin" data-name="отзвывы все" draggable={false} href="/reviews?direction=python#review-veniamin">
        <div className="content-stretch flex flex-col items-end overflow-clip px-[20px] py-[24px] relative rounded-[inherit] size-full">
          <Frame217 />
        </div>
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[32px]" />
      </a>
      <a className="bg-white cursor-pointer no-underline relative rounded-[32px] shrink-0 text-inherit w-[258px]" data-course-review="ilya" data-name="отзвывы все" draggable={false} href="/reviews?direction=python#review-ilya">
        <div className="content-stretch flex flex-col items-end overflow-clip px-[20px] py-[24px] relative rounded-[inherit] size-full">
          <Frame226 />
        </div>
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[32px]" />
      </a>
      <a className="bg-white cursor-pointer no-underline relative rounded-[32px] shrink-0 text-inherit w-[258px]" data-course-review="andrey" data-name="отзвывы все" draggable={false} href="/reviews?direction=python#review-andrey">
        <div className="content-stretch flex flex-col items-end overflow-clip px-[20px] py-[24px] relative rounded-[inherit] size-full">
          <Frame231 />
        </div>
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[32px]" />
      </a>
      <div className="flex flex-row items-center self-stretch">
        <Frame15 />
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-[348px] site-course-carousel-actions">
      <button aria-label="Предыдущие отзывы" className="bg-transparent flex items-center justify-center p-0 relative shrink-0" data-carousel-action="prev" data-carousel-target="python-mobile-reviews" onClick={(event) => handleCourseCarouselClick(event, "python-mobile-reviews", -1)} type="button">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex flex-col items-center justify-center p-[12px] relative rounded-[32px] size-[44px]">
            <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
            <div className="flex-[1_0_0] min-h-px relative w-full">
              <div className="absolute inset-[-1.82%_-3.65%_-1.82%_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7295 20.7282">
                  <path d={svgPaths.p50fce00} id="Vector 119" stroke="var(--stroke-0, white)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button aria-label="Следующие отзывы" className="bg-[rgba(255,255,255,0.4)] content-stretch flex flex-col items-center justify-center p-[12px] relative rounded-[32px] shrink-0 size-[44px]" data-carousel-action="next" data-carousel-target="python-mobile-reviews" onClick={(event) => handleCourseCarouselClick(event, "python-mobile-reviews", 1)} type="button">
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.82%_-3.65%_-1.82%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7295 20.7282">
              <path d={svgPaths.p50fce00} id="Vector 119" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame252() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame248 />
      <Frame58 />
    </div>
  );
}

function Frame251() {
  return (
    <div className="bg-[#9c78ff] content-stretch flex flex-col gap-[40px] items-start px-[20px] py-[40px] relative rounded-[40px] shrink-0 w-[390px]">
      <Frame222 />
      <Frame252 />
    </div>
  );
}

function Frame152() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center relative shrink-0 text-black whitespace-nowrap">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] uppercase">Оплата по факту обучения</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-center tracking-[0.48px]">
        <p className="leading-[18px] mb-0">Без кредитов, рассрочек</p>
        <p className="leading-[18px]">и скрытых обязательств</p>
      </div>
    </div>
  );
}

function Frame153() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center relative shrink-0 text-black text-center w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] uppercase w-full">
        <p className="leading-[20px] mb-0">Можно вернуть до 13%</p>
        <p className="leading-[20px]">от цены курса</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Воспользуйтесь налоговым вычетом</p>
    </div>
  );
}

function Frame157() {
  return (
    <div className="relative rounded-[20px] shrink-0 w-full">
      <div aria-hidden className="absolute border-5 border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center px-[16px] py-[20px] relative size-full">
          <Frame152 />
          <div className="flex h-[0.902px] items-center justify-center relative shrink-0 w-[155.5px]">
            <div className="flex-none rotate-[0.33deg]">
              <div className="h-0 relative w-[155.503px]">
                <div className="absolute inset-[-1.5px_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155.503 3">
                    <path d="M0 1.5H155.503" id="Line 2" stroke="var(--stroke-0, black)" strokeWidth="3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Frame153 />
        </div>
      </div>
    </div>
  );
}

function Frame204() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-[350px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[0px] text-black text-center uppercase w-[301px]">
        <p className="leading-[32px] mb-0 relative text-[#9c78ff] text-[51px] top-[-6px]">Выгодные</p>
        <p className="leading-[32px] text-[32px]">условия</p>
      </div>
      <Frame157 />
    </div>
  );
}

function Frame270() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-center p-[8px] relative rounded-[20px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#9c78ff] text-[14px] tracking-[0.42px] whitespace-nowrap">-36%</p>
    </div>
  );
}

function Frame282() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[27px] line-through relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] text-center uppercase whitespace-nowrap">12 590 ₽/мес.</p>
      <Frame270 />
    </div>
  );
}

function Frame154() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
      <Frame282 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[40px] text-center text-white whitespace-nowrap">7 990 ₽/мес.</p>
    </div>
  );
}

function Frame156() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[32px] relative shrink-0 text-[32px] text-white uppercase whitespace-nowrap">Базовый</p>
      <Frame154 />
      <div className="relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div aria-hidden className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">начать обучение</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame263() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] relative rounded-[32px] shrink-0 size-[18px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal h-[15px] leading-[30px] relative shrink-0 text-[20px] text-white w-[9px]">-</p>
        </div>
      </div>
    </div>
  );
}

function Frame264() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] relative rounded-[32px] shrink-0 size-[18px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal h-[15px] leading-[30px] relative shrink-0 text-[20px] text-white w-[9px]">-</p>
        </div>
      </div>
    </div>
  );
}

function Frame265() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] relative rounded-[32px] shrink-0 size-[18px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal h-[15px] leading-[30px] relative shrink-0 text-[20px] text-white w-[9px]">-</p>
        </div>
      </div>
    </div>
  );
}

function Frame266() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] relative rounded-[32px] shrink-0 size-[18px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal h-[15px] leading-[30px] relative shrink-0 text-[20px] text-white w-[9px]">-</p>
        </div>
      </div>
    </div>
  );
}

function Frame194() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[350px]">
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Bold',sans-serif] font-bold leading-[0] min-w-px relative text-[16px] text-white tracking-[0.48px]">
          <p className="leading-[18px] mb-0">4 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЯ</p>
          <p className="leading-[18px]">В МЕСЯЦ</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Доступ к учебной платформе ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">13 проектных работ в портфолио</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Домашние задания и проверка кода преподавателем</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Ежедневная поддержка куратора в чате</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Записи ваших индивидуальных занятий с преподавателем навсегда</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Диплом ИТ-школы ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
        <Frame263 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px]">Диплом о профессиональной переподготовке</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
        <Frame264 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px]">Стажировка после обучения</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
        <Frame265 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px]">2 тестовых технических собеседования</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
        <Frame266 />
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px]">
          <p className="leading-[18px] mb-0">Подготовка резюме</p>
          <p className="leading-[18px]">с HR-специалистом</p>
        </div>
      </div>
    </div>
  );
}

function Frame205() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] relative rounded-[40px] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[20px] relative size-full">
        <Frame156 />
        <Frame194 />
      </div>
    </div>
  );
}

function Frame271() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center p-[8px] relative rounded-[20px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[14px] text-white tracking-[0.42px] whitespace-nowrap">-38%</p>
    </div>
  );
}

function Frame283() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Manrope:Bold',sans-serif] font-bold leading-[31px] line-through relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] text-center uppercase whitespace-nowrap">23 590 ₽/мес.</p>
      <Frame271 />
    </div>
  );
}

function Frame155() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
      <Frame283 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[#9c78ff] text-[40px] text-center uppercase whitespace-nowrap">14 390 ₽/мес.</p>
    </div>
  );
}

function Frame158() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[32px] relative shrink-0 text-[#9c78ff] text-[32px] uppercase whitespace-nowrap">расширенный</p>
      <Frame155 />
      <div className="relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div aria-hidden className="absolute border-2 border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#9c78ff] text-[20px] whitespace-nowrap">начать обучение</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame267() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] relative rounded-[32px] shrink-0 size-[18px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal h-[15px] leading-[30px] relative shrink-0 text-[20px] text-white w-[9px]">-</p>
        </div>
      </div>
    </div>
  );
}

function Frame268() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] relative rounded-[32px] shrink-0 size-[18px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal h-[15px] leading-[30px] relative shrink-0 text-[20px] text-white w-[9px]">-</p>
        </div>
      </div>
    </div>
  );
}

function Frame195() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[350px]">
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Bold',sans-serif] font-bold leading-[0] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">
          <p className="leading-[18px] mb-0">8 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЙ</p>
          <p className="leading-[18px]">В МЕСЯЦ</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">Доступ к учебной платформе ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">13 проектных работ в портфолио</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">Домашние задания и проверка кода преподавателем</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px] whitespace-pre-wrap">
          <p className="leading-[18px] mb-0">{`Ежедневная поддержка куратора `}</p>
          <p className="leading-[18px]">в чате</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">Записи ваших индивидуальных занятий с преподавателем навсегда</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">Диплом ИТ-школы ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">2 тестовых собеседования</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">Диплом о профессиональной переподготовке</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[#464a6a] text-[16px] tracking-[0.48px]">Стажировка после обучения</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
        <Frame267 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px]">2 тестовых технических собеседования</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
        <Frame268 />
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px]">
          <p className="leading-[18px] mb-0">Подготовка резюме</p>
          <p className="leading-[18px]">с HR-специалистом</p>
        </div>
      </div>
    </div>
  );
}

function Frame206() {
  return (
    <div className="relative rounded-[40px] shrink-0 w-full">
      <div aria-hidden className="absolute border-5 border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[20px] py-[24px] relative size-full">
        <Frame158 />
        <Frame195 />
      </div>
    </div>
  );
}

function Frame272() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-center p-[8px] relative rounded-[20px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#9c78ff] text-[14px] tracking-[0.42px] whitespace-nowrap">-41%</p>
    </div>
  );
}

function Frame284() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Manrope:Bold',sans-serif] font-bold leading-[31px] line-through relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] text-center uppercase whitespace-nowrap">31 950 ₽/мес.</p>
      <Frame272 />
    </div>
  );
}

function Frame160() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
      <Frame284 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] text-center text-white uppercase w-[312px]">18 890 ₽/мес.</p>
    </div>
  );
}

function Frame159() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[32px] min-w-full relative shrink-0 text-[32px] text-center text-white uppercase w-[min-content]">пЕРСОНАЛЬНЫЙ</p>
      <Frame160 />
      <div className="relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div aria-hidden className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">начать обучение</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame196() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[350px]">
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Bold',sans-serif] font-bold leading-[0] min-w-px relative text-[16px] text-white tracking-[0.48px] whitespace-pre-wrap">
          <p className="leading-[18px] mb-0">{`12 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЙ  `}</p>
          <p className="leading-[18px]">В МЕСЯЦ</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Доступ к учебной платформе ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">13 проектных работ в портфолио</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Домашние задания и проверка кода преподавателем</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Ежедневная поддержка куратора в чате</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Записи ваших индивидуальных занятий с преподавателем навсегда</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Диплом ИТ-школы ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">2 тестовых собеседования</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Диплом о профессиональной переподготовке</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">Стажировка после обучения</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] min-w-px relative text-[16px] text-white tracking-[0.48px]">2 тестовых технических собеседования</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[18px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p3d65f800} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[16px] text-white tracking-[0.48px]">
          <p className="leading-[18px] mb-0">Подготовка резюме</p>
          <p className="leading-[18px]">с HR-специалистом</p>
        </div>
      </div>
    </div>
  );
}

function Frame207() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] relative rounded-[40px] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[20px] relative size-full">
        <Frame159 />
        <Frame196 />
      </div>
    </div>
  );
}

function Frame208() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame205 />
      <Frame206 />
      <Frame207 />
    </div>
  );
}

function Frame212() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Frame204 />
      <Frame208 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-end relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[40px] uppercase w-[346px]">
        <p className="leading-[43px] mb-0">Не уверены,</p>
        <p className="leading-[43px] mb-0">что вам</p>
        <p className="leading-[43px]">это подходит?</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[16px] tracking-[0.48px] w-[min-content]">
        <p className="leading-[18px] mb-0">Оставьте заявку — мы обо всем расскажем</p>
        <p className="leading-[18px]">подробнее</p>
      </div>
    </div>
  );
}

function Frame164() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[40px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] uppercase">172</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px]">
        <p className="leading-[16px] mb-0">интерактивных</p>
        <p className="leading-[16px]">урока</p>
      </div>
    </div>
  );
}

function Frame165() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[40px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] uppercase">194</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px]">практических задания</p>
    </div>
  );
}

function Frame167() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[40px] shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] uppercase">{`70% `}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px]">обучения — практика</p>
    </div>
  );
}

function Frame245() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame164 />
      <Frame165 />
      <Frame167 />
    </div>
  );
}

function Frame166() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[40px] shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] uppercase">13</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px]">
        <p className="leading-[16px] mb-0">проектных работ</p>
        <p className="leading-[16px]">в портфолио</p>
      </div>
    </div>
  );
}

function Frame162() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[40px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] uppercase">28</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px]">учебных недель</p>
    </div>
  );
}

function Frame163() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[40px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px] uppercase">560</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px]">академических часов</p>
    </div>
  );
}

function Frame246() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame166 />
      <Frame162 />
      <Frame163 />
    </div>
  );
}

function Frame247() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-start justify-between p-[20px] relative rounded-[24px] shrink-0 text-white w-[350px] whitespace-nowrap" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 350 197\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.6000000238418579\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(2.2317 13.489 -23.965 6.0796 159.09 98.5)\\'><stop stop-color=\\'rgba(213,197,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(183,166,230,1)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(153,135,204,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(123,103,179,1)\\' offset=\\'0.75\\'/><stop stop-color=\\'rgba(94,72,153,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
      <Frame245 />
      <Frame246 />
    </div>
  );
}

function Frame161() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <input aria-label="Ваше имя" autoComplete="name" className="site-course-lead-input site-course-lead-input--mobile" name="name" placeholder="Ваше имя" type="text" />
      <input aria-label="Номер телефона" autoComplete="tel" className="site-course-lead-input site-course-lead-input--mobile" inputMode="tel" name="phone" placeholder="+7(000)-000-00-00" type="tel" />
      <input aria-label="Почта" autoComplete="email" className="site-course-lead-input site-course-lead-input--mobile" name="email" placeholder="Почта" type="email" />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame161 />
      <textarea aria-label="Ваш вопрос" className="site-course-lead-input site-course-lead-input--mobile site-course-lead-input--question" name="question" placeholder="Ваш вопрос" />
    </div>
  );
}

function Frame50() {
  return (
    <div aria-checked="false" className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full site-consent site-course-consent" data-consent-toggle role="checkbox" tabIndex={0}>
      <div className="relative rounded-[2px] shrink-0 size-[24px] site-consent__box" data-name="чекбокс">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[2px] site-consent__border" />
        <svg aria-hidden="true" className="site-consent__check" fill="none" viewBox="0 0 24 24">
          <path d="M5 12.5L10 17.5L19 7" />
        </svg>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-white">
        <span className="leading-[16px] text-[12px]">Нажимая на кнопку, вы даете </span>
        <a className="cursor-pointer font-['Manrope:Bold',sans-serif] font-bold leading-[16px] site-consent__link text-[12px]" href="https://api.innoprog.ru/files/documents/consent_to_personal_data_processing.pdf" rel="noopener noreferrer" target="_blank">
          <span>согласие на обработку персональных данных</span>
        </a>
        <span className="leading-[16px] text-[12px]">{` и соглашаетесь с `}</span>
        <a className="cursor-pointer font-['Manrope:Bold',sans-serif] font-bold leading-[16px] site-consent__link text-[12px]" href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">
          <span>политикой конфиденциальности</span>
        </a>
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame50 />
      <button aria-busy="false" aria-disabled="true" className="content-stretch cursor-pointer flex items-center justify-center p-[16px] relative rounded-[40px] shrink-0 w-[350px] site-course-lead-submit site-course-lead-submit--mobile" data-name="кнопки пд" disabled type="button">
        <div aria-hidden className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">начать обучение</p>
      </button>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame49 />
      <Frame51 />
    </div>
  );
}

function Frame209() {
  return (
    <div className="bg-[#464a6a] relative rounded-[24px] shrink-0 w-full" data-name="заявка">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[20px] py-[40px] relative size-full">
          <Frame48 />
          <Frame247 />
          <Frame52 />
        </div>
      </div>
    </div>
  );
}

function Frame118() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 uppercase w-[349px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[32px] min-w-full relative shrink-0 text-[32px] text-black top-[-8px] w-[min-content]">{`Часто задаваемые `}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[43px] relative shrink-0 text-[#9c78ff] text-[40px] text-right whitespace-nowrap">вопросы</p>
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[0] min-w-px relative text-[20px] text-black text-left uppercase">
        <p className="leading-[22px] mb-0">Слышал, что Python -</p>
        <p className="leading-[22px] mb-0">это про алгоритмы</p>
        <p className="leading-[22px]">{`и нейросети. Что я буду учить на курсе? `}</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, black)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame124() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[22px] min-w-px relative text-[20px] text-black text-left uppercase">{`Есть ли программы рассрочки, или нужно оплатить курс сразу? `}</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, black)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame141() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[22px] min-w-px relative text-[20px] text-black text-left uppercase">{`Как будет устроена практика и сколько проектных работ я сделаю? `}</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, black)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame142() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[22px] min-w-px relative text-[20px] text-black text-left uppercase">{`Смогу ли совмещать обучение с работой? `}</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, black)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame143() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[20px] text-black text-left uppercase whitespace-nowrap">
        <p className="leading-[22px] mb-0">Помогаете ли вы с резюме</p>
        <p className="leading-[22px]">{`и собеседованиями? `}</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, black)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame144() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Medium',sans-serif] font-medium leading-[0] min-w-px relative text-[20px] text-black text-left uppercase">
        <p className="leading-[22px] mb-0">Что будет после</p>
        <p className="leading-[22px]">окончания курса?</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, black)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame210() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="site-course-faq-list site-course-faq-list--mobile content-stretch flex flex-col items-start relative shrink-0 w-full">
      {courseFaqItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div className={`site-course-faq-item site-course-faq-item--mobile relative shrink-0 w-full${isOpen ? " is-open" : ""}`} key={item.question}>
            <button
              aria-expanded={isOpen}
              className="site-course-faq-trigger site-course-faq-trigger--mobile"
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              type="button"
            >
              <span className="site-course-faq-question site-course-faq-question--mobile">{item.question}</span>
              <span aria-hidden className="site-course-faq-arrow">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                  <path d={svgPaths.p3133300} stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </button>
            <div className="site-course-faq-answer-shell" aria-hidden={!isOpen}>
              <div className="site-course-faq-answer site-course-faq-answer--mobile">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Frame211() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Frame118 />
      <Frame210 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[16px] items-start leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] w-full">
      <a className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full no-underline" href="tel:+79586067980">Тел: +7 (958) 606-79-80</a>
      <a className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full no-underline" href="mailto:education@innoprog.ru">Email: education@innoprog.ru</a>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">Telegram: @innoprog_admin</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[302px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[#9c78ff] text-[32px] w-full">Контакты</p>
      <Frame19 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[16px] items-start leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">г. Иннополис, ул. Университетская, д.5, пом.115, м.15/2</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">420500 Республика Татарстан, Верхнеуслонский р-он,</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[302px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[#9c78ff] text-[32px] w-full">Адреса</p>
      <Frame20 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold gap-[24px] items-start relative shrink-0 text-[16px] text-white tracking-[0.48px] uppercase w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[20px] relative shrink-0 w-full">Политика конфиденциальности</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[20px] relative shrink-0 w-full">Публичная оферта</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[0] relative shrink-0 w-full">
        <p className="leading-[20px] mb-0">Выписка из реестра лицензий</p>
        <p className="leading-[20px]">на образовательную деятельность</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[302px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[#9c78ff] text-[32px] w-full">Правовая информация</p>
      <Frame21 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame25 />
      <Frame24 />
      <Frame23 />
    </div>
  );
}

function MaterialSymbolsMailOutline() {
  return (
    <div className="relative shrink-0 size-[76px]" data-name="material-symbols:mail-outline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 76">
        <g id="material-symbols:mail-outline">
          <rect fill="var(--fill-0, #D9D9D9)" height="76" rx="38" width="76" />
          <path d={svgPaths.p1a9e2200} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TablerPhoneCall() {
  return (
    <div className="relative shrink-0 size-[75px]" data-name="tabler:phone-call">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 75">
        <g id="tabler:phone-call">
          <path d={svgPaths.p2ae92c80} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.p1d06b620} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function IcBaselineWhatsapp() {
  return (
    <div className="relative shrink-0 size-[76px]" data-name="ic:baseline-whatsapp">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 76">
        <g id="ic:baseline-whatsapp">
          <path d={svgPaths.p1458ef0} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.p36f53980} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MynauiTelegram() {
  return (
    <div className="relative shrink-0 size-[75px]" data-name="mynaui:telegram">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 75">
        <g id="mynaui:telegram">
          <path d={svgPaths.p2ae92c80} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.p32992140} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <MaterialSymbolsMailOutline />
      <TablerPhoneCall />
      <IcBaselineWhatsapp />
      <MynauiTelegram />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[87.27%_5.13%_3.92%_54.33%] opacity-30" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158.124 76.8275">
        <g id="Group">
          <path d={svgPaths.p395a3880} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p30a3fd00} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p35dfae00} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[87.84%_5.13%_1.72%_5.13%] opacity-30" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350.003 91.0073">
        <g id="Group">
          <path d={svgPaths.p203db300} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p17d90180} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p28e3d70} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
          <path d={svgPaths.p37d0e200} fill="var(--fill-0, #9C78FF)" id="Vector_4" />
          <path d={svgPaths.p3b992800} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p2838400} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p33f972c0} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p24604e00} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.pb8f4180} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p2550b8f0} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p2b0a63f2} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.pb894000} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p205b7700} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p31216b80} fill="var(--fill-0, white)" id="Vector_14" />
          <path d={svgPaths.p1cab2200} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p21fdd800} fill="var(--fill-0, white)" id="Vector_16" />
          <path d={svgPaths.p1f6905c0} fill="var(--fill-0, white)" id="Vector_17" />
          <path d={svgPaths.p260aea00} fill="var(--fill-0, white)" id="Vector_18" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[87.27%_5.13%_1.72%_5.13%]" data-name="Group">
      <Group9 />
      <Group10 />
    </div>
  );
}

function Frame213() {
  return (
    <div className="site-course-mobile-content-flow content-stretch flex flex-col gap-[80px] items-start pt-[2314px] relative shrink-0 w-[390px]">
      <Frame200 />
      <Frame251 />
      <Frame212 />
      <Frame209 />
      <Frame211 />
    </div>
  );
}

export default function DataScienceCourseMobile() {
  return (
    <div className="bg-white relative w-[390px]" data-name="напр-ие М">
      <Frame180 />
      <Frame183 />
      <Frame236 />
      <Frame213 />
    </div>
  );
}
