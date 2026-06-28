import { useState, type CSSProperties, type ReactNode } from "react";
import svgPaths from "./svg-egdjewsyn7";
import imgFocus from "./9748a62f98f2fa651b919d513ca6b44cb04d3882.opt.webp";
import imgUnrealEngineHero from "./unreal-engine-course-hero-main.png";
import imgImage119 from "./personal-mentor.gif";
import imgRectangle40112 from "./5c407d7588fb3a05c9bbdf356d2803639f0ccff7.png";
import imgRectangle40113 from "./77c2af5c9c78b8253a92ca77339d6e448645843a.opt.webp";
import imgCollabration from "./0ddae1105f6319bcc13e96735e2d30ab76fbfe3d.png";
import imgFrame700 from "./be4bcdab4e03df29cf083299f1a129432fb6cfb8.opt.webp";
import imgRectangle40091 from "./b3b6b9e6c7b7057cd9decf85d4436740e0aace34.opt.webp";
import imgImage52 from "./438bc548f7863d8ef2b783a4cb669ce08d59b346.png";
import imgBalance from "./7c7f9895d31d45c04affa2dd30f717ed232ed528.png";
import imgImage46 from "./40ec54b08771963beaaad715c22e691c4519e3d3.opt.webp";
import imgRectangle40094 from "./401f5acc82f0b1eb082db219ab3471a1ef5fab51.png";
import imgRectangle40093 from "./c5868c6b299d567b64d10ff0d69c0d1a0b46230c.png";
import imgRectangle40095 from "./eb997e5032ab41f0b8c6c533fe59612a169fb82b.opt.webp";
import imgImage115 from "./6f7c219f8f920445932a5ab496a09907db2bd7ae.opt.webp";
import imgCircleStackSwirl from "../MainScreenDesktop/circle-stack-swirl.opt.webp";
import imgGroup6821 from "../MainScreenDesktop/bced4fe251202675be6f268fb651a981a420eb8a.opt.webp";
import imgDiplomProf1 from "../MainScreenDesktop/diplom-prof.opt.webp";
import imgContraBluestar1 from "./8f9d493ec8bd19b806c3ba56b61df7f250ca9d00.png";
import imgRectangle40082 from "./100b51f7b19a210b3de8eadf6abcf10392a9da09.opt.webp";
import imgRectangle40083 from "./9fd4f9c316d21dbd728b3436e79074f22de66286.opt.webp";
import imgRectangle40084 from "./7acb4e33ed51de43d739015d7960455a7f71dbc8.opt.webp";
import imgRectangle40085 from "./e23105f42bc682ba6a00ca8960747d189f0366a0.opt.webp";
import imgRectangle40086 from "./b1f967bb9c7ae9c25195d8f4a73fc5847efd16f6.opt.webp";
import imgRectangle40087 from "./2cbe57953beca1178afd27d1f71884d7d612b585.opt.webp";
import imgRectangle40088 from "./accce48d175d044546f06312eec0a082304225b6.opt.webp";
import imgRectangle40089 from "./0637a0266dd99580004167f3ae3ffee5b51608c3.opt.webp";
import imgClonedCircles2 from "./004036d2f412af879a4069e312c6af83af5e08a1.png";
import { imgGroup } from "./svg-0m3gv";
import imgBenefitIconsChatTableau from "../MainScreenDesktop/benefit-icons-chat-figma.webp";
import imgBenefitDocumentSolid from "../MainScreenDesktop/benefit-document-figma.svg";
import imgBenefitCard1Tableau from "../MainScreenDesktop/benefit-card1-figma.png";
import { courseFaqItems } from "../courseFaqData";
import { unrealEngineCourseProgramModules, type CourseProgramModule } from "../courseProgramData";
import { CourseProgramTagIcon } from "../courseProgramIcons";
import { unrealEngineProjectVisualImages } from "../unrealEngineProjectVisualImages";

const projectVisuals = [
  { title: "Collect the coin", code: "collect-the-coin/" },
  { title: "Drone shooter", code: "drone-shooter/" },
  { title: "Wave arena", code: "wave-arena/" },
  { title: "Puzzle room", code: "puzzle-room/" },
  { title: "Obstacle platformer", code: "obstacle-platformer/" },
  { title: "Educational 3D scene", code: "educational-3d-scene/" },
];

const unrealEngineProjects = [
  {
    title: "Collect the coin",
    description:
      "Соберете игру со сбором предметов, счетом, таймером, уровнем, UI, победой, поражением и перезапуском",
  },
  {
    title: "Шутер с летающим дроном",
    description:
      "Разработаете игру с управляемым дроном, камерой, стрельбой, целями, попаданиями, UI, простым AI и финальным состоянием",
  },
  {
    title: "Мини-арена с волнами противников",
    description:
      "Создадите прототип арены с персонажем, волнами противников, State Tree-поведением, счетом, здоровьем и экраном результата",
  },
  {
    title: "Пазл-комната с интерактивными объектами",
    description:
      "Соберете уровень с кнопками, дверями, рычагами, коллизиями, условиями решения и визуальной обратной связью",
  },
  {
    title: "Платформер с препятствиями",
    description:
      "Разработаете прототип с персонажем, прыжками, платформами, collectables, таймером, падением, победой и поражением",
  },
  {
    title: "Образовательная 3D-сцена",
    description:
      "Создадите интерактивную сцену с объектами, подсказками, UI, маршрутом пользователя и проверяемым сценарием взаимодействия",
  },
];

function ProjectVisual({ index, compact = false }: { index: number; compact?: boolean }) {
  const item = projectVisuals[index] ?? projectVisuals[0];
  const image = unrealEngineProjectVisualImages[index] ?? unrealEngineProjectVisualImages[0];
  const heightClass = compact ? "h-[195px] rounded-[32px]" : "h-[300px] rounded-[40px]";

  return (
    <div className={heightClass + " bg-[#eee8ff] overflow-hidden relative shrink-0 w-full site-course-project-visual"}>
      <img
        alt={item.title}
        className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
        decoding="async"
        loading="lazy"
        src={image}
      />
    </div>
  );
}

function ProjectCard({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[465px]">
      <ProjectVisual index={index} />
      {children}
    </div>
  );
}

function UnrealEngineProjectCard({ project, index }: { project: typeof unrealEngineProjects[number]; index: number }) {
  return (
    <ProjectCard index={index}>
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">{project.title}</p>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">{project.description}</p>
      </div>
    </ProjectCard>
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
  const paddingLeft = Number.parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
  const activeAnchor = isCenterAligned ? carousel.clientWidth / 2 : paddingLeft;
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
    : item.offsetLeft - paddingLeft;

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

function Group1() {
  return (
    <div className="col-1 h-[52.018px] ml-[148.57px] mt-0 relative row-1 w-[122.433px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.433 52.0181">
        <g id="Group">
          <path d={svgPaths.p28c29de0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p17db4f80} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p5cd0d00} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 h-[61.618px] ml-0 mt-[3.38px] relative row-1 w-[271px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 271 61.6182">
        <g id="Group">
          <path d={svgPaths.p2271ac00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3291b280} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p3e776800} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p26588c00} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p5147f80} fill="var(--fill-0, black)" id="Vector_5" />
          <path d={svgPaths.p2443ed80} fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p51dcc00} fill="var(--fill-0, black)" id="Vector_7" />
          <path d={svgPaths.p12e1d700} fill="var(--fill-0, black)" id="Vector_8" />
          <path d={svgPaths.p3ff2e500} fill="var(--fill-0, black)" id="Vector_9" />
          <path d={svgPaths.pe65d800} fill="var(--fill-0, black)" id="Vector_10" />
          <path d={svgPaths.p1c5cb600} fill="var(--fill-0, black)" id="Vector_11" />
          <path d={svgPaths.p2669d300} fill="var(--fill-0, black)" id="Vector_12" />
          <path d={svgPaths.p3d987380} fill="var(--fill-0, black)" id="Vector_13" />
          <path d={svgPaths.p2f64c280} fill="var(--fill-0, black)" id="Vector_14" />
          <path d={svgPaths.p29246180} fill="var(--fill-0, black)" id="Vector_15" />
          <path d={svgPaths.p1907f500} fill="var(--fill-0, black)" id="Vector_16" />
          <path d={svgPaths.p11714f00} fill="var(--fill-0, black)" id="Vector_17" />
          <path d={svgPaths.p13ca2100} fill="var(--fill-0, black)" id="Vector_18" />
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

function Frame26() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-center p-[32px] relative rounded-[40px] shrink-0">
      <div className="h-[17px] relative shrink-0 w-[154px]" data-name="Text">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal inset-0 leading-[30px] text-[24px] text-black whitespace-nowrap">для взрослых</p>
      </div>
      <div className="h-[17px] relative shrink-0 w-[114px]" data-name="Text">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal inset-0 leading-[30px] text-[24px] text-black whitespace-nowrap">для детей</p>
      </div>
      <div className="h-[17px] relative shrink-0 w-[83px]" data-name="Text">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal inset-0 leading-[30px] text-[24px] text-black whitespace-nowrap">отзывы</p>
      </div>
      <div className="h-[17px] relative shrink-0 w-[63px]" data-name="Text">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Regular',sans-serif] font-normal inset-0 leading-[30px] text-[24px] text-black whitespace-nowrap">о нас</p>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <button className="bg-transparent border-0 cursor-pointer h-[17px] opacity-40 p-0 relative shrink-0 w-[121px]" data-name="главная" data-site-home type="button">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Bold',sans-serif] font-bold inset-0 leading-[31px] text-[24px] text-black text-center uppercase whitespace-nowrap">{`главная/ `}</p>
      </button>
      <button className="block cursor-pointer h-[17px] relative shrink-0 w-[177px]" data-name="главная">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:Bold',sans-serif] font-bold inset-0 leading-[31px] text-[24px] text-black text-center uppercase whitespace-nowrap">направление</p>
      </button>
    </div>
  );
}

function Frame165() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 text-white uppercase w-[1280px]">
      <div className="relative self-end shrink-0">
        <Frame67 />
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[42px] relative shrink-0 text-[40px] translate-x-[4px]">Курс</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[97px] relative shrink-0 text-[96px] w-full">Unreal Engine</p>
    </div>
  );
}

function Frame226() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame165 />
    </div>
  );
}

function Frame201() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame226 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center p-[8px] relative rounded-[32px] shrink-0">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[20px] text-black uppercase whitespace-nowrap">
        <p className="leading-[22px] mb-0">Образовательная лицензия</p>
        <p className="leading-[22px]">министерства образования и науки</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border-4 border-[#9c78ff] border-solid inset-[-4px] pointer-events-none rounded-[36px]" />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Платформа, наставник и практика в одном формате ИННОПРОГ</p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border-4 border-[#9c78ff] border-solid inset-[-4px] pointer-events-none rounded-[36px]" />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Индивидуальное обучение с наставником</p>
    </div>
  );
}

function Frame164() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0">
      <Frame1 />
      <Frame55 />
    </div>
  );
}

function Frame228() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame54 />
      <Frame164 />
    </div>
  );
}

function Frame271() {
  return (
    <div className="absolute inset-[0_48.15%_7.41%_0]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 25">
        <g clipPath="url(#clip0_1_2629)" id="Frame 843">
          <path d={svgPaths.p39e5b900} fill="var(--fill-0, #9C78FF)" id="Star 2" />
        </g>
        <defs>
          <clipPath id="clip0_1_2629">
            <rect fill="white" height="25" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame209() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap w-[64px]">4.9</p>
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
        <Frame271 />
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-[#9c78ff] cursor-pointer relative rounded-[40px] shrink-0 w-full z-20" data-application-open role="button" tabIndex={0}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[35px] relative shrink-0 text-[32px] text-white whitespace-nowrap">Открыт набор на обучение</p>
        </div>
      </div>
    </div>
  );
}

function Frame227() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-end relative shrink-0 w-[462px]">
      <Frame209 />
      <Frame73 />
    </div>
  );
}

function Frame229() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] h-[599px] relative rounded-[40px] shrink-0 w-full">
      <div className="flex flex-col items-end justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end justify-between p-[24px] relative size-full">
          <div className="absolute h-[1012px] left-[-123px] top-[-258px] w-[1048px]" data-name="ChatGPT Image 30 апр. 2026 г., 11_32_21_Nero_AI_Image_Upscaler_Photo_Face_Nero_AI_Background_Remover_transparent 1">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgUnrealEngineHero} />
          </div>
          <Frame228 />
          <Frame227 />
        </div>
      </div>
    </div>
  );
}

function Frame230() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[1280.001px]">
      <Frame201 />
      <Frame229 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div>
        <div className="site-course-feature-card__content site-course-feature-card__content--clean">
          <p>
            <strong className="site-course-feature-line">Индивидуальная программа</strong>
            <span className="site-course-feature-line">обучения под ваш уровень подготовки,</span>
            <span className="site-course-feature-line">цели и темп</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div>
        <div className="site-course-feature-card__content site-course-feature-card__content--clean">
          <p>
            <strong className="site-course-feature-line">Живые занятия с преподавателем,</strong>
            <span className="site-course-feature-line">а не только материалы в записи</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div>
        <div className="site-course-feature-card__content site-course-feature-card__content--clean">
          <p>
            <span className="site-course-feature-line"><strong>Обучение с экспертами</strong> из Сбера,</span>
            <span className="site-course-feature-line">Яндекса, МТС, Точки и других компаний</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div>
        <div className="site-course-feature-card__content site-course-feature-card__content--clean">
          <p>
            <strong className="site-course-feature-line">Практика на платформе Иннопрог,</strong>
            <span className="site-course-feature-line">работа над проектами и сопровождение</span>
            <span className="site-course-feature-line">наставника на протяжении всего обучения</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="site-course-feature-card bg-[rgba(255,255,255,0.8)] relative rounded-[16px] shrink-0 w-full">
      <div>
        <div className="site-course-feature-card__content site-course-feature-card__content--clean">
          <p>
            <span className="site-course-feature-line">После завершения обучения —</span>
            <strong className="site-course-feature-line">возможность пройти стажировку</strong>
            <span className="site-course-feature-line">и применить навыки на практике</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="site-course-feature-list bg-[rgba(70,74,106,0.5)] content-stretch flex flex-col gap-[16px] items-start p-[40px] relative rounded-[40px] shrink-0 w-[628px]">
      <Frame70 />
      <Frame72 />
      <Frame71 />
      <Frame69 />
      <Frame68 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[465px]">
      <div className="bg-[#464a6a] relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[32px] text-white whitespace-nowrap">начать обучение</p>
            <div className="bg-white content-stretch flex items-center justify-center p-[12px] relative rounded-[40px] shrink-0" data-name="Frame 40/Frame 707">
              <div className="relative shrink-0 size-[32px]">
                <div className="absolute inset-[-1.98%_-4.04%_-1.98%_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.2913 33.2654">
                    <path d={svgPaths.p3b802100} id="Vector 121" stroke="var(--stroke-0, #464A6A)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="bg-[rgba(255,255,255,0.8)] cursor-pointer relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div aria-hidden className="absolute border-3 border-[rgba(0,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[40px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[28px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[35px] relative shrink-0 text-[32px] text-black text-left whitespace-nowrap">получить консультацию</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[628px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[40px] text-white uppercase w-[min-content]">
        <p className="leading-[42px] mb-0">За 28 недель освоите</p>
        <p className="leading-[42px]">Blueprint, UMG, State Tree и игровые механики</p>
      </div>
      <Frame76 />
    </div>
  );
}

function Frame166() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[24px] items-start px-[80px] relative size-full">
        <Frame74 />
        <Frame77 />
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="site-course-advantage-card site-course-advantage-card--platform bg-[rgba(70,74,106,0.6)] col-1 content-stretch flex flex-col gap-[24px] items-start ml-0 mt-[482px] p-[40px] relative rounded-[40px] row-1 text-white w-[50.59%]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[30px] relative shrink-0 text-[32px] w-full">Обучающая платформа</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Закрепляйте полученные навык</p>
        <p className="leading-[30px]">на нашей платформе, решая реальные практические задачи</p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[124px] items-start justify-end relative rounded-[40px] shrink-0 w-[482px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[30px] relative shrink-0 text-[32px] w-full">Преподаватели-практики</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Занимайтесь, общаетесь и практикуйтесь</p>
        <p className="leading-[30px]">с реальными разработчиками, получайте опыт от профессионалов</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] h-[124px] items-start justify-end min-w-px relative rounded-[40px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[30px] relative shrink-0 text-[32px] w-full">Индивидуальные занятия</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Еженедельные персональные занятия</p>
        <p className="leading-[30px] mb-0">с наставниками для быстрого роста</p>
        <p className="leading-[30px]">и получения только актуальных навыков</p>
      </div>
    </div>
  );
}

function Frame167() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <Frame37 />
      <Frame36 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-end relative rounded-[40px] shrink-0 w-[482px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[30px] relative shrink-0 text-[32px] w-full">Два диплома</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Диплом о профпереподготовке и диплом ИННОПРОГ, сведения вносятся</p>
        <p className="leading-[30px]">в государственный реестр</p>
      </div>
    </div>
  );
}

function Frame169() {
  return (
    <div className="site-course-advantage-card site-course-advantage-card--white bg-[rgba(255,255,255,0.6)] col-1 content-stretch flex flex-col gap-[40px] items-start ml-0 mt-0 p-[40px] relative rounded-[40px] row-1 text-black w-[87.25%]">
      <Frame167 />
      <Frame38 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative rounded-[40px] shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] relative shrink-0 text-[36px] w-full">Налоговый вычет</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] w-full">По окончании обучения вы сможете оформить налоговый вычет и вернуть 13% от стоимости обучения</p>
    </div>
  );
}

function Frame168() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative rounded-[40px] shrink-0 w-[628px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[30px] relative shrink-0 text-[32px] w-full">Стажировка</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">По окончании обучения лучших учеников</p>
        <p className="leading-[30px]">мы рекомендуем нашим партнёрам для прохождения стажировки в ИТ-компаниях</p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="site-course-advantage-card site-course-advantage-card--purple bg-[rgba(156,120,255,0.5)] col-1 content-stretch flex flex-col gap-[40px] items-start ml-[42.96%] mt-[216px] p-[40px] relative rounded-[40px] row-1 text-white w-[57.04%]">
      <Frame41 />
      <Frame168 />
    </div>
  );
}

function Group12() {
  return (
    <div className="[word-break:break-word] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame39 />
      <Frame169 />
      <Frame40 />
    </div>
  );
}

function Frame231() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Group12 />
    </div>
  );
}

function Frame191() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[40px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] uppercase w-full">
        Unreal Engine-разработчик создает игровые прототипы и интерактивные 3D-сцены, проектирует уровни, Blueprint-логику, персонажей, UI и простой AI по данным{" "}
        <a className="site-course-inline-link" href="https://career.hh.ru/profession/14" rel="noopener noreferrer" target="_blank">hh.ru</a>
      </p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">На курсе вы проходите полный цикл разработки в Unreal Engine 5: от идеи и уровня до Blueprint-механик, персонажа, UI, State Tree, оптимизации и публикации</p>
        <p className="leading-[30px]">Программа помогает собрать портфолио из игровых проектов и подготовиться к первым задачам Unreal Engine-разработчика</p>
      </div>
    </div>
  );
}

function Frame190() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full">
      <Frame191 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="уровень дохода">
      <Frame190 />
    </div>
  );
}

function Frame255() {
  return (
    <div className="bg-gradient-to-b flex-[1_0_0] from-[rgba(191,167,255,0.6)] h-[162px] min-w-px relative rounded-tl-[30px] rounded-tr-[30px] shadow-[15px_0px_80px_0px_rgba(156,120,255,0.2)] to-[78.365%] to-[rgba(156,120,255,0.8)]">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center justify-end p-[24px] relative size-full text-white uppercase whitespace-nowrap">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px]">{`от 100 000 ₽`}</p>
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px]">Junior (начальный)</p>
        </div>
      </div>
    </div>
  );
}

function Frame256() {
  return (
    <div className="bg-gradient-to-b drop-shadow-[15px_0px_40px_rgba(156,120,255,0.2)] flex-[1_0_0] from-[#ae90ff] h-[342px] min-w-px relative rounded-tl-[30px] rounded-tr-[30px] to-[#8559ff]">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center justify-end p-[24px] relative size-full text-white uppercase whitespace-nowrap">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px]">{`от 158 600 ₽`}</p>
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px]">Middle (средний)</p>
        </div>
      </div>
    </div>
  );
}

function Frame257() {
  return (
    <div className="bg-gradient-to-b drop-shadow-[15px_0px_40px_rgba(70,74,106,0.2)] flex-[1_0_0] from-[#7f87cd] h-[562px] min-w-px relative rounded-tl-[30px] rounded-tr-[30px] to-[#464a6a]">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center justify-end p-[24px] relative size-full text-white uppercase whitespace-nowrap">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px]">{`от 235 000 ₽`}</p>
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[20px]">Senior (старший)</p>
        </div>
      </div>
    </div>
  );
}

function Frame250() {
  return (
    <div className="content-stretch flex gap-[80px] h-[562px] items-end justify-center relative shrink-0 w-full">
      <Frame255 />
      <Frame256 />
      <Frame257 />
    </div>
  );
}

function Frame258() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-full">
      <Component1 />
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[64px] text-black uppercase w-full">
        <p className="leading-[75px] mb-0">Уровень дохода</p>
        <p className="leading-[75px]">Unreal Engine</p>
      </div>
      <Frame250 />
    </div>
  );
}

function Frame251() {
  return (
    <div className="content-stretch flex flex-col gap-[184px] items-start relative shrink-0 w-full">
      <Frame231 />
      <Frame258 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#9c78ff] content-stretch flex items-center justify-center p-[24px] relative rounded-[40px] shrink-0">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[47px] relative shrink-0 text-[40px] text-white uppercase whitespace-nowrap">Во всех тарифах</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col font-['Raleway:Bold',sans-serif] font-bold gap-[24px] items-center relative shrink-0 text-black text-center uppercase w-full">
      <p className="leading-[97px] relative shrink-0 text-[96px] w-full">{`Личный наставник `}</p>
      <p className="leading-[47px] relative shrink-0 text-[48px] w-full">на всём пути обучения</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-[1078px]">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">Поддержка</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">Уверенный выход на работу</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">Индивидуальный маршрут</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">Разбор кейсов</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">Подготовка к собеседованию</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 text-[24px] text-black uppercase whitespace-nowrap">Сильное резюме</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame6 />
      <Frame5 />
      <Frame15 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center relative shrink-0 w-full">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black text-center w-[949px]">На протяжении всего обучения вас будет сопровождать эксперт из индустрии, который помог многим начинающим специалистам</p>
      <Frame12 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-center relative shrink-0 w-full">
      <Frame4 />
      <Frame13 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[1280px]" data-name="наставник">
      <Frame14 />
      <div className="h-[735px] overflow-hidden relative rounded-[40px] shrink-0 w-[1280px] site-course-mentor-media" data-name="image 119">
        <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[40px] size-full" src={imgImage119} />
      </div>
    </div>
  );
}

function Frame248() {
  return (
    <div className="content-stretch flex flex-col font-['Raleway:Bold',sans-serif] font-bold gap-[20px] items-end leading-[0] relative shrink-0 uppercase w-[918px]">
      <p className="relative shrink-0 text-[#9c78ff] text-[0px] whitespace-nowrap w-full">
        <span className="leading-[52px] text-[74px]">{`Вас ждет более `}</span>
        <span className="font-['Manrope:Bold',sans-serif] leading-[97px] text-[122px]">40+</span>
        <span className="leading-[52px] text-[74px]">{` `}</span>
      </p>
      <div className="relative shrink-0 text-[#464a6a] text-[48px] w-full">
        <p className="leading-[52px] mb-0">персональных онлайн встреч</p>
        <p className="leading-[52px]">с наставником</p>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-end relative shrink-0 text-[24px] text-right text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 uppercase w-full">{`Онлайн занятия `}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 w-full">онлайн занятия каждую неделю</p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-end relative shrink-0 text-[24px] text-right text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 uppercase w-full">стажировка</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 w-full">
        <p className="leading-[30px] mb-0">в реальных проектах</p>
        <p className="leading-[30px]">после обучения</p>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-end relative shrink-0 text-[24px] text-right text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 uppercase w-full">Поддержка и помощь</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 w-full">вам не нужно переживать о том, что, где и когда</p>
    </div>
  );
}

function MentorBenefitBriefcaseIcon() {
  return (
    <div aria-hidden="true" className="absolute h-[122px] left-[4px] pointer-events-none top-[-6px] w-[160px]">
      <svg className="block size-full" fill="none" viewBox="0 0 102 78">
        <defs>
          <linearGradient id="mentor-briefcase-body-course" x1="20" x2="78" y1="10" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D9CDFE" />
            <stop offset="0.55" stopColor="#9B73FF" />
            <stop offset="1" stopColor="#7D4CFF" />
          </linearGradient>
          <linearGradient id="mentor-briefcase-flap-course" x1="22" x2="81" y1="6" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BEA7FF" />
            <stop offset="1" stopColor="#6E35F8" />
          </linearGradient>
        </defs>
        <g opacity="0.9">
          <path d="M36 19.5C36 12.6 41.6 7 48.5 7H56C62.9 7 68.5 12.6 68.5 19.5V23H59.8V19.5C59.8 17.4 58.1 15.7 56 15.7H48.5C46.4 15.7 44.7 17.4 44.7 19.5V23H36V19.5Z" fill="#7E46FF" />
          <rect fill="url(#mentor-briefcase-body-course)" height="44" rx="12" width="76" x="13" y="23" />
          <path d="M13 34.5C13 28.1 18.1 23 24.5 23H77.5C83.9 23 89 28.1 89 34.5V39.8L51 53L13 39.8V34.5Z" fill="url(#mentor-briefcase-flap-course)" />
          <circle cx="51" cy="41" fill="#956AFF" r="6.3" stroke="#7742F6" strokeOpacity="0.45" strokeWidth="1.1" />
        </g>
      </svg>
    </div>
  );
}

function MentorBenefitSupportIcon() {
  return (
    <div aria-hidden="true" className="absolute h-[122px] left-[2px] pointer-events-none top-[-3px] w-[160px]">
      <svg className="block size-full" fill="none" viewBox="0 0 116 88">
        <defs>
          <linearGradient id="mentor-support-front-course" x1="20" x2="79" y1="12" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2D7FF" />
            <stop offset="0.58" stopColor="#AE8FFF" />
            <stop offset="1" stopColor="#8352FF" />
          </linearGradient>
          <linearGradient id="mentor-support-back-course" x1="61" x2="108" y1="11" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B08DFF" />
            <stop offset="1" stopColor="#6F32F3" />
          </linearGradient>
          <filter id="mentor-support-shadow-course" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="88" width="112" x="2" y="0">
            <feDropShadow dx="0" dy="8" floodColor="#6D35FF" floodOpacity="0.24" stdDeviation="8" />
          </filter>
        </defs>
        <g filter="url(#mentor-support-shadow-course)" opacity="0.88">
          <circle cx="72" cy="30" fill="url(#mentor-support-back-course)" r="24" />
          <path d="M47 82C47 65.4 60.4 52 77 52H80C96.6 52 110 65.4 110 82V84H47V82Z" fill="url(#mentor-support-back-course)" />
          <circle cx="36" cy="33" fill="url(#mentor-support-front-course)" r="26" />
          <path d="M8 86C8 67.8 22.8 53 41 53H45C63.2 53 78 67.8 78 86V88H8V86Z" fill="url(#mentor-support-front-course)" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <div className="bg-[#9c78ff] content-stretch flex flex-col h-[275px] items-end justify-between p-[24px] relative rounded-[32px] shrink-0 w-[302px]">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] min-w-full relative shrink-0 text-[32px] text-right text-white w-[min-content]">(1)</p>
        <Frame61 />
        <div className="absolute h-[122px] left-0 overflow-hidden pointer-events-none rounded-tl-[32px] top-0 w-[163px]">
          <img alt="" className="absolute h-[275px] left-0 max-w-none top-0 w-[302px]" src={imgBenefitCard1Tableau} />
        </div>
      </div>
      <div className="bg-[#9c78ff] content-stretch flex flex-col h-[275px] items-end justify-between p-[24px] relative rounded-[32px] shrink-0 w-[465px]">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] min-w-full relative shrink-0 text-[32px] text-right text-white w-[min-content]">(2)</p>
        <Frame62 />
        <MentorBenefitBriefcaseIcon />
      </div>
      <div className="bg-[#9c78ff] content-stretch flex flex-col h-[275px] items-end justify-between p-[24px] relative rounded-[32px] shrink-0 w-[465px]">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] min-w-full relative shrink-0 text-[32px] text-right text-white w-[min-content]">(3)</p>
        <Frame64 />
        <div className="absolute h-[122px] left-0 rounded-[40px] top-0 w-[163px]">
          <div className="absolute inset-0 mix-blend-color-burn opacity-60 overflow-hidden pointer-events-none rounded-[40px]">
            <img alt="" className="absolute h-[392.05%] left-[-263.81%] max-w-none top-[-139.73%] w-[391.24%]" src={imgBenefitIconsChatTableau} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <Frame16 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-end relative shrink-0 text-[24px] text-right text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 uppercase w-full">Личный чат</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 w-full">
        <p className="leading-[30px] mb-0">с наставником для вопросов</p>
        <p className="leading-[30px]">вне уроков</p>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-end relative shrink-0 text-[24px] text-right text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Bold',sans-serif] font-bold leading-[31px] relative shrink-0 uppercase w-full">Мок-интервью</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 w-full"> в формате реального собеседования</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <div className="bg-[#9c78ff] content-stretch flex flex-1 flex-col h-[275px] items-end justify-between min-w-0 p-[24px] relative rounded-[32px]">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] min-w-full relative shrink-0 text-[32px] text-right text-white w-[min-content]">(4)</p>
        <Frame63 />
        <MentorBenefitSupportIcon />
      </div>
      <div className="bg-[#9c78ff] content-stretch flex flex-1 flex-col h-[275px] items-end justify-between min-w-0 overflow-hidden p-[24px] relative rounded-[32px] text-right text-white">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] min-w-full relative shrink-0 text-[32px] w-[min-content]">(5)</p>
        <Frame65 />
        <div className="absolute h-[275px] left-[0] overflow-hidden pointer-events-none rounded-[32px] top-0 w-full">
          <div className="absolute flex items-center justify-center left-[-25px] size-[221.664px] top-[-46px]">
            <div className="flex-none rotate-[30.43deg]">
              <div className="relative size-[161.947px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBenefitDocumentSolid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-end relative shrink-0 w-full">
      <Frame18 />
      <Frame17 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start justify-center relative shrink-0 w-[1280px]">
      <Frame248 />
      <Frame19 />
    </div>
  );
}

function Frame161() {
  return (
    <div className="site-internship-title content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="site-internship-title__line site-internship-title__line--black">пройдёте стажировку</p>
      <p className="site-internship-title__line site-internship-title__line--brand">
        <span className="site-internship-title__prefix">в</span>
        <span className="site-internship-title__brand">иннопрог проджектс</span>
      </p>
      <p className="site-internship-title__line site-internship-title__line--black">уже во время обучения</p>
      <div className="absolute flex h-[1582.241px] items-center justify-center left-[-10px] top-[95px] w-[1322.689px]">
        <div className="flex-none rotate-[-2.14deg]">
          <div className="h-[1535.986px] relative w-[1266.158px]" data-name="Collabration">
            <img alt="" className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full" src={imgCollabration} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center leading-[0] min-w-px relative text-center text-white">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[36px] w-full">
        <p className="leading-[38px] mb-0">1. Всё как</p>
        <p className="leading-[38px]">в реальной команде</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Вы проходите собеседование</p>
        <p className="leading-[30px] mb-0">и попадаете в рабочий процесс, максимально приближенный</p>
        <p className="leading-[30px]">к реальной ИТ-среде</p>
      </div>
    </div>
  );
}

function Frame95() {
  return (
    <div className="site-internship-card site-internship-card--purple bg-[rgba(156,120,255,0.6)] col-1 content-stretch flex items-center ml-0 mt-[15px] p-[40px] relative rounded-[40px] row-1 w-[464px]">
      <Frame />
    </div>
  );
}

function Frame94() {
  return (
    <div className="site-internship-card site-internship-card--purple [word-break:break-word] bg-[rgba(156,120,255,0.6)] col-1 content-stretch flex flex-col gap-[24px] items-center ml-[651px] mt-0 p-[40px] relative rounded-[40px] row-1 text-center text-white w-[628px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold h-[68px] relative shrink-0 text-[36px] w-full">
        <p className="leading-[38px] mb-0">2. Профессиональные</p>
        <p className="leading-[38px]">ИТ-инструменты</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Работа над проектом ведется в современных рабочих сервисах: вы учитесь ставить задачи, вести разработку и взаимодействовать</p>
        <p className="leading-[30px]">с командой в привычной для индустрии среде</p>
      </div>
    </div>
  );
}

function Frame96() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center leading-[0] relative shrink-0 text-center text-white w-[555px]">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[36px] w-full">
        <p className="leading-[38px] mb-0">5. Итоговый проект</p>
        <p className="leading-[38px]">и кейс в портфолио</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">По завершении стажировки у вас будет готовый кейс, который можно добавить в портфолио</p>
        <p className="leading-[30px]">и использовать как подтверждение практического опыта</p>
      </div>
    </div>
  );
}

function Frame233() {
  return (
    <div className="site-internship-card site-internship-card--purple bg-[rgba(156,120,255,0.6)] col-1 content-stretch flex items-start ml-[488px] mt-[759px] p-[40px] relative rounded-[40px] row-1 w-[628px]">
      <Frame96 />
    </div>
  );
}

function Frame170() {
  return (
    <div className="site-internship-card site-internship-card--gray [word-break:break-word] bg-[rgba(84,110,122,0.8)] col-1 content-stretch flex flex-col gap-[24px] items-center ml-0 mt-[502px] p-[40px] relative rounded-[40px] row-1 text-center text-white w-[627px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] relative shrink-0 text-[36px] w-full">4. Поддержка от наставников и команды</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Во время работы над проектом вы можете задавать вопросы, получать обратную связь</p>
        <p className="leading-[30px] mb-0">и разбирать возникающие сложности</p>
        <p className="leading-[30px]">вместе с наставниками и другими участниками</p>
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="site-internship-card site-internship-card--white [word-break:break-word] bg-[rgba(255,255,255,0.6)] col-1 content-stretch flex flex-col gap-[24px] items-center ml-[325px] mt-[255px] p-[40px] relative rounded-[40px] row-1 text-[#464a6a] text-center w-[628.5px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] relative shrink-0 text-[36px] w-full">3. Проект под ваш уровень подготовки</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Мы подбираем задачи и формат участия</p>
        <p className="leading-[30px] mb-0">с учетом ваших текущих навыков,</p>
        <p className="leading-[30px] mb-0">чтобы вы могли постепенно включаться</p>
        <p className="leading-[30px]">в командную работу</p>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame95 />
      <Frame94 />
      <Frame233 />
      <Frame170 />
      <Frame97 />
    </div>
  );
}

function Frame234() {
  return (
    <div className="h-[628px] relative rounded-[40px] shrink-0 w-full">
      <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[40px] size-full" src={imgFrame700} />
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end px-[32px] py-[40px] relative size-full">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-white">
            <span className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] text-[40px] uppercase">{` ИННОПРОГ ПРОДЖЕКТС`}</span>
            <span className="leading-[30px] text-[24px]">{` `}</span>
            <span className="font-['Manrope:Medium',sans-serif] font-medium leading-[41px] text-[32px]">— среда, где ученики и наставники объединяются в команду и получают опыт работы над реальными ИТ-проектами</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame235() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame161 />
      <Group13 />
      <Frame234 />
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] relative shrink-0 text-[#9c78ff] text-[36px] w-full">Unreal Engine</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase w-full">Иванов Иван</p>
    </div>
  );
}

function Frame128() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[32px] h-[124px] items-center relative shrink-0 w-[465px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Light',sans-serif] font-light leading-[35px] relative shrink-0 text-[32px] text-black w-full">Junior (начальный)</p>
      <Frame127 />
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex gap-[24px] items-end justify-center relative shrink-0">
      <div className="bg-[#9c78ff] h-[152px] overflow-hidden relative rounded-[28px] shrink-0 w-[194px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover object-top pointer-events-none rounded-[28px] size-full" src={imgRectangle40091} />
      </div>
      <Frame128 />
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-right w-[290px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[24px] text-black w-full">{`Желаемая зарплата `}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[#9c78ff] text-[40px] uppercase whitespace-nowrap w-full">от 100 000 ₽</p>
    </div>
  );
}

function Frame130() {
  return (
    <div className="relative rounded-[40px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[40px]" />
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex items-end justify-between p-[32px] relative size-full">
          <Frame129 />
          <Frame98 />
        </div>
      </div>
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[64px] text-black uppercase w-full">
        <span className="leading-[97px]">Ваше</span>
        <span className="leading-[97px] text-[#bfbfbf]">{` `}</span>
        <span className="leading-[97px] text-[#9c78ff]">резюме</span>
        <span className="leading-[97px]">{` после курса`}</span>
      </p>
      <Frame130 />
    </div>
  );
}

function Frame133() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Проектирую игровую идею, core loop и критерии готовности</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Создаю уровни, actors, components, свет и материалы</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Проектирую Blueprint-логику, функции и компоненты</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Настраиваю коллизии, trace-проверки и взаимодействие объектов</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Создаю персонажа, управление, камеру и базовые игровые механики</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Проверяю игровой сценарий, сборку и стабильность прототипа</span>
        </li>
      </ul>
    </div>
  );
}

function Frame134() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Использую Unreal Engine 5, Blueprint, UMG и State Tree</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Отлаживаю Blueprint-графы и исправляю типовые ошибки логики</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Готовлю build, README и демонстрацию проекта</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Профилирую проект и исправляю проблемы производительности</span>
        </li>
      </ul>
      <ul className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] block relative shrink-0 w-full">
        <li className="list-disc ms-[36px]">
          <span className="leading-[30px]">Публикую проект на itch.io или другой площадке</span>
        </li>
      </ul>
    </div>
  );
}

function Frame135() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Manrope:Regular',sans-serif] font-normal gap-[24px] items-start leading-[0] relative shrink-0 text-[24px] text-black w-full">
      <Frame133 />
      <Frame134 />
    </div>
  );
}

const unrealEngineTechColors: Record<string, string> = {
  "Unreal Engine 5": "#0f172a",
  Blueprint: "#2563eb",
  UMG: "#7c3aed",
  "State Tree": "#111827",
  Actors: "#9c78ff",
  Collision: "#16a34a",
  "Level Design": "#003b57",
  Profiling: "#f97316",
  "itch.io": "#ff5a5f",
  Git: "#f05032",
};

function UnrealEngineTechChip({ label, short }: { label: string; short: string }) {
  const color = unrealEngineTechColors[label] || "#9c78ff";
  const textColor = label === "itch.io" ? "#111827" : "#ffffff";

  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div
        aria-hidden="true"
        className="content-stretch flex items-center justify-center relative rounded-[7px] shrink-0 size-[24px]"
        style={{ backgroundColor: color, color: textColor }}
      >
        <span className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[1] text-[9px]">{short}</span>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">{label}</p>
    </div>
  );
}

function MaterialIconThemePython() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-icon-theme:python">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-icon-theme:python">
          <path d={svgPaths.pfbed5b0} fill="var(--fill-0, #0288D1)" id="Vector" />
          <path d={svgPaths.p3df67d80} fill="var(--fill-0, #FDD835)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame136() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="devicon:postgresql">
        <div className="absolute inset-[5.88%_7.14%_5.88%_7.54%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.4769 21.1768">
            <path d={svgPaths.p3e3c080} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[2.14%_3.39%_2.14%_3.8%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2755 22.9709">
            <path d={svgPaths.p293f4780} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[5.88%_7.14%_5.87%_7.54%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.4774 21.1795">
            <path d={svgPaths.p1e83cc80} fill="var(--fill-0, #336791)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[4.5%_5.97%_4.45%_6.21%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0756 21.852">
            <path d={svgPaths.p8fa6540} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Linux</p>
    </div>
  );
}

function MaterialIconThemeGit() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="material-icon-theme:git">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="material-icon-theme:git">
          <path d={svgPaths.p3468f880} fill="var(--fill-0, #E64A19)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame138() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeGit />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Git</p>
    </div>
  );
}

function MaterialIconThemeMetabase() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-icon-theme:django">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-icon-theme:django">
          <path d={svgPaths.p2102a200} fill="var(--fill-0, #43A047)" id="Vector" />
          <path d={svgPaths.pc25a500} fill="var(--fill-0, #43A047)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame139() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeMetabase />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Git</p>
    </div>
  );
}

function LogosPycharm() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="logos:pycharm">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_2552)" id="logos:pycharm">
          <path d={svgPaths.p348e5a00} fill="url(#paint0_linear_1_2552)" id="Vector" />
          <path d={svgPaths.p2d4e5880} fill="url(#paint1_linear_1_2552)" id="Vector_2" />
          <path d={svgPaths.p1a252b00} fill="url(#paint2_linear_1_2552)" id="Vector_3" />
          <path d={svgPaths.p3b5c8170} fill="url(#paint3_linear_1_2552)" id="Vector_4" />
          <path d={svgPaths.p32729700} fill="url(#paint4_linear_1_2552)" id="Vector_5" />
          <path d="M4.5 4.5H19.5V19.5H4.5V4.5Z" fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p2c8bdac0} fill="var(--fill-0, white)" id="Vector_7" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_2552" x1="8.56968" x2="22.8522" y1="9.27209" y2="9.27209">
            <stop stopColor="#21D789" />
            <stop offset="1" stopColor="#07C3F2" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_2552" x1="-3.00477" x2="20.0657" y1="20.255" y2="3.22479">
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
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_2552" x1="4.40141" x2="9.03619" y1="26.6218" y2="12.0768">
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
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_2552" x1="9.69449" x2="17.779" y1="9.48975" y2="-1.38038">
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
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_2552" x1="25.0095" x2="5.55924" y1="15.0679" y2="14.8869">
            <stop offset="0.39" stopColor="#FCF84A" />
            <stop offset="0.46" stopColor="#ECF74C" />
            <stop offset="0.61" stopColor="#C1F451" />
            <stop offset="0.82" stopColor="#7EEF5A" />
            <stop offset="1" stopColor="#3BEA62" />
          </linearGradient>
          <clipPath id="clip0_1_2552">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame140() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LogosPycharm />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">PyCharm</p>
    </div>
  );
}

function Frame153() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="relative shrink-0 size-[24px]" data-name="image 52">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage52} />
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Matplotlib</p>
    </div>
  );
}

function DeviconJwt() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="devicon:jwt">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g clipPath="url(#clip0_1_2536)" id="devicon:jwt">
          <path d={svgPaths.p3760fc00} fill="var(--fill-0, #546E7A)" id="Vector" />
          <path d={svgPaths.p98f6e80} fill="var(--fill-0, #F50057)" id="Vector_2" />
          <path d={svgPaths.p1a320f80} fill="var(--fill-0, #D500F9)" id="Vector_3" />
          <path d={svgPaths.p1e4ee80} fill="var(--fill-0, #29B6F6)" id="Vector_4" />
          <path d={svgPaths.p9f897f0} fill="var(--fill-0, #00E5FF)" id="Vector_5" />
          <path d={svgPaths.pe89e300} fill="var(--fill-0, #546E7A)" id="Vector_6" />
          <path d={svgPaths.pe51fb80} fill="var(--fill-0, #F50057)" id="Vector_7" />
          <path d={svgPaths.p2c291d80} fill="var(--fill-0, #D500F9)" id="Vector_8" />
          <path d={svgPaths.p3c9c2380} fill="var(--fill-0, #29B6F6)" id="Vector_9" />
          <path d={svgPaths.p36f6a80} fill="var(--fill-0, #00E5FF)" id="Vector_10" />
        </g>
        <defs>
          <clipPath id="clip0_1_2536">
            <rect fill="white" height="23" width="23" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame152() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconJwt />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">SQL</p>
    </div>
  );
}

function DeviconSqlalchemy() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="devicon:sqlalchemy">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_2532)" id="devicon:sqlalchemy">
          <path d={svgPaths.pc0788f0} fill="var(--fill-0, #333333)" id="Vector" />
          <path d={svgPaths.p3996d400} fill="var(--fill-0, #CA2727)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_2532">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame151() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconSqlalchemy />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">PostgreSQL</p>
    </div>
  );
}

function Frame154() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0">
      <UnrealEngineTechChip label="Blueprint" short="Blueprint" />
      <UnrealEngineTechChip label="Unreal Engine 5" short="UE5" />
      <UnrealEngineTechChip label="UMG" short="AN" />
      <UnrealEngineTechChip label="State Tree" short="State Tree" />
      <UnrealEngineTechChip label="Git" short="Git" />
      <UnrealEngineTechChip label="Collision" short="COL" />
    </div>
  );
}

function LogosWebsocket() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="logos:websocket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="logos:websocket">
          <path d={svgPaths.p8877e80} fill="var(--fill-0, #231F20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame150() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <LogosWebsocket />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">WebSocket</p>
    </div>
  );
}

function MaterialIconThemeDocker() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-icon-theme:docker">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-icon-theme:docker">
          <path d={svgPaths.p3a8e9e00} fill="var(--fill-0, #0288D1)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame146() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeDocker />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Docker</p>
    </div>
  );
}

function VscodeIconsFileTypePytest() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="vscode-icons:file-type-pytest">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="vscode-icons:file-type-pytest">
          <path d={svgPaths.p3e501700} fill="var(--fill-0, #696969)" id="Vector" />
          <path d={svgPaths.p2759d900} fill="var(--fill-0, #009FE3)" id="Vector_2" />
          <path d={svgPaths.p2f5ecd00} fill="var(--fill-0, #C7D302)" id="Vector_3" />
          <path d={svgPaths.p1d84ec0} fill="var(--fill-0, #F07E16)" id="Vector_4" />
          <path d={svgPaths.p10bef00} fill="var(--fill-0, #DF2815)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Frame145() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <VscodeIconsFileTypePytest />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black w-[92px]">PostgreSQL</p>
    </div>
  );
}

function FlatColorIconsLinux() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="flat-color-icons:linux">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_2616)" id="flat-color-icons:linux">
          <path d={svgPaths.p16f05300} fill="var(--fill-0, #ECEFF1)" id="Vector" />
          <path d={svgPaths.p3f62b880} fill="var(--fill-0, #263238)" id="Vector_2" />
          <g id="Group">
            <path d={svgPaths.p29071a00} fill="var(--fill-0, #ECEFF1)" id="Vector_3" />
            <path d={svgPaths.p25013100} fill="var(--fill-0, #ECEFF1)" id="Vector_4" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.p1b055300} fill="var(--fill-0, #212121)" id="Vector_5" />
            <path d={svgPaths.p14a7cc00} fill="var(--fill-0, #212121)" id="Vector_6" />
          </g>
          <path d={svgPaths.p366016f0} fill="var(--fill-0, #FFC107)" id="Vector_7" />
          <path d={svgPaths.p293a0500} fill="var(--fill-0, #634703)" id="Vector_8" />
          <path d={svgPaths.p11b7f100} fill="var(--fill-0, #455A64)" id="Vector_9" />
        </g>
        <defs>
          <clipPath id="clip0_1_2616">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame141() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <FlatColorIconsLinux />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Linux</p>
    </div>
  );
}

function MaterialIconThemeMetabase1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-icon-theme:django">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-icon-theme:django">
          <path d={svgPaths.p2102a200} fill="var(--fill-0, #43A047)" id="Vector" />
          <path d={svgPaths.pc25a500} fill="var(--fill-0, #43A047)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame142() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeMetabase1 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Многопоточность</p>
    </div>
  );
}

function DashiconsRestApi() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="dashicons:rest-api">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="dashicons:rest-api">
          <path d={svgPaths.p3b8ac100} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame144() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DashiconsRestApi />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Rest API</p>
    </div>
  );
}

function DeviconFastapi() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="devicon:fastapi">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_2488)" id="devicon:fastapi">
          <path d={svgPaths.p2ed9f6b0} fill="var(--fill-0, #049688)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2488">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame148() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconFastapi />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Git</p>
    </div>
  );
}

function Frame155() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <UnrealEngineTechChip label="Unit tests" short="UT" />
      <UnrealEngineTechChip label="Git" short="Git" />
      <UnrealEngineTechChip label="ООП" short="OOP" />
      <UnrealEngineTechChip label="Алгоритмы" short="ALG" />
      <UnrealEngineTechChip label="(10) Проектная практика" short="M" />
      <UnrealEngineTechChip label="Отладка" short="DBG" />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[0.26%_0_0.26%_-0.06%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.016px_0px] mask-size-[25px_24.871px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <div className="absolute inset-[-4.19%_-4.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0991 26.955">
          <g id="Group">
            <path d={svgPaths.p391dd700} fill="var(--fill-0, #0065A9)" id="Vector" />
            <g filter="url(#filter0_d_1_2599)" id="Group_2">
              <path d={svgPaths.p1f009080} fill="var(--fill-0, #007ACC)" id="Vector_2" />
            </g>
            <g filter="url(#filter1_d_1_2599)" id="Group_3">
              <path d={svgPaths.p741100} fill="var(--fill-0, #1F9CF0)" id="Vector_3" />
            </g>
            <path clipRule="evenodd" d={svgPaths.p1a242b80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_4" opacity="0.25" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20.9785" id="filter0_d_1_2599" width="27.0987" x="0" y="5.97656">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.520875" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_2599" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_2599" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="26.9543" id="filter1_d_1_2599" width="9.896" x="17.2031" y="-4.59196e-10">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.520875" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_2599" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_2599" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[0.26%_0]" data-name="Mask group">
      <Group3 />
    </div>
  );
}

function DeviconVscode() {
  return (
    <div className="overflow-clip relative shrink-0 size-[25px]" data-name="devicon:vscode">
      <MaskGroup />
    </div>
  );
}

function Frame147() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconVscode />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Bash</p>
    </div>
  );
}

function MaterialIconThemeNginx({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0 size-[24px]"} data-name="material-icon-theme:nginx">
      <div className="absolute inset-[0_6.25%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 24">
          <path d={svgPaths.p106cdb00} fill="var(--fill-0, #43A047)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame143() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <MaterialIconThemeNginx />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Nginx</p>
    </div>
  );
}

function DeviconBash({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0 size-[23px]"} data-name="devicon:bash">
      <div className="-translate-y-1/2 absolute aspect-[14.00012493133545/16] left-[6.25%] right-[6.25%] top-[calc(50%+0.5px)]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1252 23">
          <path d={svgPaths.p12296df0} fill="var(--fill-0, #293138)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[72.31%_20.24%_20.09%_71.16%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.97782 1.74925">
          <path d={svgPaths.p39284600} fill="var(--fill-0, #4FA847)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame149() {
  return (
    <div className="content-stretch flex gap-[16px] h-[40px] items-center p-[8px] relative rounded-[16px] shrink-0">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[16px]" />
      <DeviconBash />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-black whitespace-nowrap">Bash</p>
    </div>
  );
}

function Frame267() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame143 />
      <Frame149 />
    </div>
  );
}

function Frame156() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <UnrealEngineTechChip label="Санитайзеры" short="SAN" />
      <UnrealEngineTechChip label="SQL" short="SQL" />
      <UnrealEngineTechChip label="Bash" short="SH" />
    </div>
  );
}

function Frame157() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame154 />
      <Frame155 />
      <Frame156 />
    </div>
  );
}

function Frame158() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame135 />
      <Frame157 />
    </div>
  );
}

function Frame159() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] relative shrink-0 text-[#9c78ff] text-[36px] w-full">{` НАВЫКИ`}</p>
      <Frame158 />
    </div>
  );
}

function Frame160() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-full">
      <Frame131 />
      <Frame159 />
    </div>
  );
}

function Frame163() {
  return (
    <div className="content-stretch flex flex-col gap-[208px] items-start relative shrink-0 w-[1280px]">
      <Frame235 />
      <Frame160 />
    </div>
  );
}

function Frame193() {
  return (
    <div className="content-stretch flex flex-col gap-[208px] items-start relative shrink-0 w-[1280px]">
      <Frame258 />
      <Component2 />
      <Frame20 />
      <Frame163 />
    </div>
  );
}

function Frame100() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[40px] uppercase w-full">
        <p className="leading-[44px] mb-0">40+ индивидуальных встреч</p>
        <p className="leading-[44px]">с наставником</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] w-full">Вы занимаетесь один на один с наставником, последовательно проходите программу, разбираете сложные темы, получаете ответы на вопросы и двигаетесь в комфортном для себя темпе</p>
    </div>
  );
}

function Frame104() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center p-[24px] relative size-full">
          <Frame100 />
          <div className="aspect-[800/450] overflow-hidden relative rounded-[24px] shrink-0 w-full" data-name="image 46">
            <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage46} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame101() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Medium',sans-serif] font-medium relative shrink-0 text-[40px] uppercase w-full">
        <p className="leading-[44px] mb-0">150+ теоретических материалов</p>
        <p className="leading-[44px]">с практическими примерами</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">Теорию вы изучаете в удобном формате видеоуроков</p>
        <p className="leading-[30px] mb-0">и не только: с объяснением ключевых тем, примерами кода</p>
        <p className="leading-[30px]">и дополнительными материалами для закрепления</p>
      </div>
    </div>
  );
}

function Frame105() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center p-[24px] relative size-full">
          <Frame101 />
          <div className="aspect-[1148/720] overflow-hidden relative rounded-[24px] shrink-0 w-full">
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
      </div>
    </div>
  );
}

function Frame103() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[40px] uppercase w-full whitespace-pre-wrap">
        <p className="leading-[44px] mb-0">{`6 игровых проектов `}</p>
        <p className="leading-[44px]">для портфолио</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] w-full">Во время обучения вы работаете над проектами разного уровня сложности, закрепляете навыки на практике и постепенно собираете портфолио</p>
    </div>
  );
}

function Frame107() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center p-[24px] relative size-full">
          <Frame103 />
          <div className="aspect-[3024/1790] overflow-hidden relative rounded-[24px] shrink-0 w-full" data-name="3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle40094} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame102() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[40px] uppercase w-full">
        <p className="leading-[44px] mb-0">Личный чат с наставником</p>
        <p className="leading-[44px]">и обратная связь</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] w-full">У вас будет личный чат с наставником, где можно задавать вопросы вне занятий, отправлять домашние задания и получать подробную обратную связь по выполненной работе</p>
    </div>
  );
}

function Frame106() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <Frame102 />
          <div className="h-[617px] overflow-hidden relative rounded-[24px] shrink-0 w-full">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
              <img alt="" className="absolute h-full left-[0.15%] max-w-none top-0 w-[99.73%]" src={imgRectangle40093} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame109() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Medium',sans-serif] font-medium relative shrink-0 text-[40px] uppercase w-full">
        <p className="leading-[44px] mb-0">Платформа-тренажёр</p>
        <p className="leading-[44px]">для отработки навыков</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[24px] w-full">
        <p className="leading-[30px] mb-0">На платформе вы решаете практические задания, отрабатываете навыки и закрепляете материал</p>
        <p className="leading-[30px]">в интерактивном формате — без необходимости использовать сторонние сервисы</p>
      </div>
    </div>
  );
}

function Frame108() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center p-[24px] relative size-full">
          <Frame109 />
          <div className="h-[427px] overflow-hidden relative rounded-[24px] shrink-0 w-full">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
              <img alt="" className="absolute h-[98.49%] left-0 max-w-none top-[0.17%] w-full" src={imgRectangle40095} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame125() {
  return (
    <div className="site-course-structure__details content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[791px]">
      <Frame104 />
      <Frame105 />
      <Frame107 />
      <Frame106 />
      <Frame108 />
    </div>
  );
}

function Component3() {
  return (
    <div className="site-course-structure bg-[#9c78ff] content-stretch flex gap-[24px] items-start min-h-[3805px] p-[80px] relative rounded-[80px] shrink-0" data-name="структура курса">
      <div className="site-course-structure__clip-bg" aria-hidden="true">
        <div className="absolute bg-[#9c78ff] inset-0" />
      </div>
      <div className="site-course-structure__sticky-side relative shrink-0 w-[465px]">
        <div className="site-course-structure__sticky-balance-art" aria-hidden="true">
          <div className="flex-none rotate-[22.09deg]">
            <div
              className="h-[1333.056px] opacity-90 pointer-events-none relative w-[1527.983px]"
              data-name="Balance"
              style={{
                background: `url(${imgBalance}) #9c78ff 50% / cover no-repeat`,
                backgroundBlendMode: "color-burn",
              }}
            />
          </div>
        </div>
        <div className="site-course-structure__sticky-title [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[97px] relative shrink-0 text-[96px] text-white uppercase w-[465px]">
          <p className="mb-0 whitespace-nowrap">Курс</p>
          <p className="mb-0 whitespace-nowrap">состоит</p>
          <p className="whitespace-nowrap">из</p>
        </div>
        <div className="site-course-structure__sticky-arrow absolute h-[147px] left-[157px] top-[188px] w-[291px]" data-name="image 115">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[156.46%] left-[-9.28%] max-w-none top-[-25.17%] w-[118.56%]" src={imgImage115} />
          </div>
        </div>
      </div>
      <Frame125 />
    </div>
  );
}

function Frame259() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Raleway:Bold',sans-serif] font-bold gap-[24px] items-start px-[80px] relative shrink-0 uppercase w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[0] relative shrink-0 text-[#9c78ff] text-[0px] w-full">
        <span className="leading-[97px] text-[128px]">13</span>
        <span className="leading-[97px] text-[96px]">{` проектных работ`}</span>
      </p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[57px] relative shrink-0 text-[64px] text-black w-full">которые вы создадите на курсе</p>
    </div>
  );
}

function Frame79() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">Система учёта фруктов на складе</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Разработаете программу для учёта товаров</p>
        <p className="leading-[22px] mb-0">на складе: добавление позиций, контроль остатков, обновление количества</p>
        <p className="leading-[22px] mb-0">и формирование понятного отчёта</p>
        <p className="leading-[22px]">по доступной продукции</p>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">База зарплат сотрудников</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] w-full whitespace-pre-wrap">
        <p className="leading-[22px] mb-0">{`Создадите удобную систему для хранения данных о сотрудниках, управления зарплатами и быстрого поиска информации, `}</p>
        <p className="leading-[22px] mb-0">которая поможет автоматизировать базовые</p>
        <p className="leading-[22px]">HR- и бухгалтерские процессы</p>
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold relative shrink-0 text-[32px] uppercase w-full">
        <p className="leading-[33px] mb-0">Менеджер задач</p>
        <p className="leading-[33px]">в консоли</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Разработаете игровой прототип для постановки, отслеживания и закрытия задач,</p>
        <p className="leading-[22px]">которое позволит удобно управлять личными или рабочими делами в одном месте</p>
      </div>
    </div>
  );
}

function Frame82() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">Телеграм-бот для управления задачами</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Создадите Telegram-бота, с помощью</p>
        <p className="leading-[22px]">которого пользователи смогут добавлять задачи, просматривать список дел и отмечать выполненные пункты прямо в мессенджере</p>
      </div>
    </div>
  );
}

function Frame83() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">Сервис бронирования поездок</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Разработаете систему для оформления поездок, учёта клиентов и транспорта,</p>
        <p className="leading-[22px]">который помогает выбрать услугу, специалиста, дату и время, проверить доступность и подтвердить запись</p>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">Сервис управления пассажирскими перевозками</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Разработаете интерфейс бронирования услуг с выбором специалиста, даты, времени, формой клиента и подтверждением записи</p>
    </div>
  );
}

function Frame86() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">Складской менеджер товаров</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Разработаете систему управления ассортиментом магазина с учётом остатков, цен и доступности товаров, которая поможет быстро находить нужные позиции</p>
        <p className="leading-[22px]">и контролировать склад</p>
      </div>
    </div>
  );
}

function Frame87() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold relative shrink-0 text-[32px] uppercase w-full">
        <p className="leading-[33px] mb-0">Key-Value хранилище</p>
        <p className="leading-[33px]">на дереве поиска</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Создадите собственную систему хранения данных с быстрым добавлением, поиском, обновлением и удалением записей,</p>
        <p className="leading-[22px] mb-0">чтобы глубже понять работу алгоритмов</p>
        <p className="leading-[22px]">и структур данных на практике</p>
      </div>
    </div>
  );
}

function Frame88() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">Веб-игровой прототип прогноза погоды</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Разработаете современный сайт, который показывает актуальную погоду по выбранному городу, используя внешние API, удобный интерфейс и понятное отображение данных</p>
        <p className="leading-[22px]">для пользователя</p>
      </div>
    </div>
  );
}

function Frame89() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold relative shrink-0 text-[32px] uppercase w-full">
        <p className="leading-[33px] mb-0">Telegram-бот</p>
        <p className="leading-[33px]">с прогнозом погоды</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Создадите бота, который по запросу пользователя показывает прогноз погоды, помогает быстро получать нужную информацию и демонстрирует работу с API</p>
        <p className="leading-[22px]">и Telegram-интерфейсом</p>
      </div>
    </div>
  );
}

function Frame90() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">Telegram-бот для бронирования столиков</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Разработаете бота для ресторанов и кафе, через которого клиенты смогут выбрать дату, время и количество гостей, а бизнес — удобно принимать и обрабатывать заявки</p>
    </div>
  );
}

function Frame91() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[32px] uppercase w-full">
        <p className="leading-[33px] mb-0">Telegram-магазин</p>
        <p className="leading-[33px]">с каталогом и корзиной</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Создадите Telegram-бота с каталогом товаров, карточками, корзиной и логикой оформления заказа, который станет удобным инструментом для продаж прямо в мессенджере</p>
    </div>
  );
}

function Frame92() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[33px] relative shrink-0 text-[32px] uppercase w-full">(10) Проектная практика-игровой прототип интернет-магазина</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Разработаете клиентскую часть интернет-магазина с каталогом товаров, карточками, корзиной и структурированной базой данных для удобного управления ассортиментом</p>
    </div>
  );
}

function Frame93() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[32px] uppercase w-full">
        <p className="leading-[33px] mb-0">Интернет-магазин</p>
        <p className="leading-[33px] mb-0">с регистрацией</p>
        <p className="leading-[33px]">и корзиной</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Создадите более продвинутый e-commerce проект с авторизацией пользователей, корзиной, добавлением и удалением товаров, что приблизит проект к реальной коммерческой разработке</p>
    </div>
  );
}

function Frame99() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-black w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold relative shrink-0 text-[32px] uppercase w-full">
        <p className="leading-[33px] mb-0">Итоговый игровой прототип</p>
        <p className="leading-[33px]">для портфолио</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[20px] w-full">
        <p className="leading-[22px] mb-0">Разработаете полноценный игровой проект</p>
        <p className="leading-[22px] mb-0">с архитектурой, тестами, README, сборкой и релизной конфигурацией</p>
        <p className="leading-[22px]">с логичной архитектурой, приближенной к реальным требованиям разработки игр на Unreal Engine</p>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full site-carousel site-course-projects-carousel" data-carousel="python-projects">
      {unrealEngineProjects.map((project, index) => (
        <UnrealEngineProjectCard index={index} key={project.title} project={project} />
      ))}
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 site-course-carousel-actions site-course-carousel-actions--projects">
      <button aria-label="Предыдущие проекты" className="bg-transparent flex items-center justify-center p-0 relative shrink-0" data-carousel-action="prev" data-carousel-target="python-projects" onClick={(event) => handleCourseCarouselClick(event, "python-projects", -1)} type="button">
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
      <button aria-label="Следующие проекты" className="bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-center justify-center p-[12px] relative rounded-[32px] shrink-0 size-[44px]" data-carousel-action="next" data-carousel-target="python-projects" onClick={(event) => handleCourseCarouselClick(event, "python-projects", 1)} type="button">
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

function Frame249() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame84 />
      <Frame25 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-[1440px] site-course-render-section site-course-after-results-section">
      <Frame259 />
      <Frame249 />
    </div>
  );
}

function Component5() {
  return (
    <div className="absolute h-[968px] left-[-80px] opacity-70 overflow-clip rounded-[40px] top-[-104px] w-[1440px]" style={{ backgroundImage: "linear-gradient(213.954deg, rgb(66, 190, 248) 10.648%, rgb(255, 255, 255) 8.7589%, rgb(156, 120, 255) 45.956%, rgb(66, 190, 248) 73.988%, rgb(156, 120, 255) 101.48%)" }} data-name="слово дня">
      <div className="absolute left-0 size-[1304px] top-[-135px]" />
      <div className="absolute blur-[37.15px] h-[1191px] left-[-66px] top-[-56px] w-[1242px]" style={{ backgroundImage: "linear-gradient(135.943deg, rgb(255, 255, 255) 3.2894%, rgba(137, 101, 234, 0.67) 51.298%)" }} />
      <div className="absolute flex h-[3865.744px] items-center justify-center left-[-1014px] top-[-1556px] w-[3914.288px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[13.7deg]">
          <div className="h-[3186.072px] relative rounded-[40px] w-[3252.149px]" data-name="Circle_Stack_Swirl">
            <img alt="" decoding="async" loading="eager" className="absolute inset-0 max-w-none object-cover opacity-60 pointer-events-none rounded-[40px] size-full" src={imgCircleStackSwirl} />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[1022px] w-[1086px]">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1086 1">
            <path d="M0 0.5H1086" id="Vector 12" stroke="var(--stroke-0, white)" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[normal] left-[943px] text-[#f9f9f9] text-[24px] top-[968px] whitespace-nowrap">{`{//}`}</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end justify-center relative shrink-0 w-full">
      <Component5 />
      <p className="font-['Raleway:Bold',sans-serif] font-bold h-[80px] leading-[97px] min-w-full relative shrink-0 text-[96px] text-white uppercase w-[min-content]">Что вы получите</p>
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[97px] relative shrink-0 text-[64px] text-right text-white uppercase whitespace-nowrap">после обучения</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[1116px]">
      <div className="h-[329px] relative shrink-0 w-[465px]" data-name="Group 682 1">
        <img alt="" decoding="async" loading="eager" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGroup6821} />
      </div>
      <div className="h-[329px] relative shrink-0 w-[494px]" data-name="diplom_prof 1">
        <img alt="" decoding="async" loading="eager" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDiplomProf1} />
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex font-['Manrope:Regular',sans-serif] font-normal items-center justify-between leading-[0] relative shrink-0 text-[24px] text-white w-full">
      <div className="relative shrink-0 w-[628px]">
        <p className="leading-[30px] mb-0">(1) Официальный диплом ИТ-школы ИННОПРОГ подтверждает уровень квалификации и помогает</p>
        <p className="leading-[30px]">в трудоустройстве</p>
      </div>
      <div className="relative shrink-0 w-[628px]">
        <p className="leading-[30px] mb-0">(2) Удостоверение о повышении квалификации</p>
        <p className="leading-[30px]">и диплом о профпереподготовке установленного образца</p>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-[1280px]">
      <Frame21 />
      <Frame43 />
    </div>
  );
}

function Component4() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[rgba(156,120,255,0.8)] gap-[80px] items-center mb-[-40px] pb-[144px] pt-[104px] px-[80px] relative rounded-tl-[40px] rounded-tr-[40px] shrink-0 to-[rgba(112,60,255,0.8)] w-[1440px]" data-name="документы">
      <Frame42 />
      <Frame44 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="site-course-pdf-download--hidden bg-[#9c78ff] content-stretch flex items-center justify-center p-[16px] relative rounded-[40px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">скачать полную версию в PDF</p>
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

function Frame56() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
      <IconParkOutlinePersonalPrivacy />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[20px] text-white whitespace-nowrap">40+ индивидуальных встреч</p>
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

function Frame114() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
      <TdesignTaskDouble />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[20px] text-white whitespace-nowrap">150+ теоретических материалов</p>
    </div>
  );
}

function GrommetIconsTask() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="grommet-icons:task">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2466)" id="grommet-icons:task">
          <path d={svgPaths.p1c012980} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_1_2466">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[16px] relative rounded-[32px] shrink-0">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[32px]" />
      <GrommetIconsTask />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[20px] text-white whitespace-nowrap">6 игровых проектов</p>
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame56 />
      <Frame114 />
      <Frame113 />
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[972px]">
      <Frame75 />
      <Frame115 />
    </div>
  );
}

function Frame172() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[1280px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[97px] min-w-full relative shrink-0 text-[96px] text-white uppercase w-[min-content]">Программа обучения</p>
      <Frame116 />
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">(1) Введение в профессию и организация обучения</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">{`(2) Знакомство с Unreal Engine 5 `}</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">{`(3) Визуальное программирование Blueprint `}</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">(4) Разработка базовых механик игры</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">{`(5) Моделирование, свет и базовый шейдер `}</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">(6) Кастомный персонаж, управление и камера</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">(7) Коллизии и взаимодействие объектов</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">(8) Основы AI с использованием State Tree</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">(9) UMG и User Widget</p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
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
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[0] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">
        <span className="leading-[53px]">{`(10) `}</span>
        <span className="leading-[53px]">созда</span>
        <span className="leading-[53px]">{`ние `}</span>
        <span className="leading-[53px]">Telegram-бот</span>
        <span className="leading-[53px]">а</span>
      </p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[0] mr-[-28px] relative shrink-0 text-[40px] text-left text-white uppercase w-[1280px]">
        <span className="leading-[53px]">{`(11) `}</span>
        <span className="leading-[53px]">(10) Проектная практика</span>
      </p>
      <div className="flex items-center justify-center relative shrink-0 size-[28px]">
        <div className="flex-none rotate-90">
          <div className="relative size-[28px]">
            <div className="absolute inset-[-2.6%_-5.21%_-2.6%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                <path d={svgPaths.p3133300} id="Vector 119" stroke="var(--stroke-0, white)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseProgramTopics({ topics }: { topics: string[] }) {
  const columns = [
    topics.filter((_, index) => index % 2 === 0),
    topics.filter((_, index) => index % 2 === 1),
  ];

  return (
    <div className="site-course-program-topics">
      {columns.map((column, columnIndex) => (
        <ul className="site-course-program-topics-column" key={columnIndex}>
          {column.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function CourseProgramModuleCard({
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
    <div className={`site-course-program-module ${isOpen ? "is-open" : ""}`}>
      <button
        aria-expanded={isOpen}
        className="site-course-program-toggle"
        onClick={onToggle}
        type="button"
      >
        <span className="site-course-program-title">{`(${index + 1}) ${module.title}`}</span>
        <span className="site-course-program-chevron" aria-hidden>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
            <path d={svgPaths.p3133300} stroke="currentColor" strokeWidth="2" />
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
            <CourseProgramTopics topics={module.topics} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame110() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="site-course-program-list site-course-program-list--desktop">
      {unrealEngineCourseProgramModules.map((module, index) => (
        <CourseProgramModuleCard
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

function Component6() {
  return (
    <div className="bg-[#464a6a] content-stretch flex flex-col gap-[80px] items-center overflow-hidden py-[80px] relative rounded-[40px] shrink-0 w-full site-course-render-section site-course-program-section" data-name="программа">
      <div className="absolute flex h-[2579.243px] items-center justify-center left-[-228px] pointer-events-none top-[-849px] w-[2601.092px] site-course-program-star-wrap">
        <div className="-rotate-30 flex-none">
          <div
            className="h-[1866.288px] relative w-[1925.98px] site-course-program-star"
            data-name="contra-bluestar-1"
            style={{ backgroundImage: `url(${imgContraBluestar1})` }}
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover opacity-0 pointer-events-none size-full" src={imgContraBluestar1} />
          </div>
        </div>
      </div>
      <Frame172 />
      <Frame110 />
    </div>
  );
}

function Frame262() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Component4 />
      <Component6 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[40px] uppercase w-full">Сергей Попкович</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[40px] uppercase w-full">Данила Дробышев</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">С++ разработчик</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[40px] uppercase w-full">Григорий Чепель</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[40px] uppercase w-full">
        <p className="leading-[36px] mb-0">Алан</p>
        <p className="leading-[36px]">Агузаров</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Data Scientist</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[40px] uppercase w-full">Паавел Мягчилов</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[40px] uppercase w-full">Джамбулат Таджидинов</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Unreal Engine разработчик</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[36px] w-full">
        <p className="leading-[38px] mb-0">Полина</p>
        <p className="leading-[38px]">Караева</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] h-[104px] items-start relative shrink-0 text-center text-white w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[40px] uppercase w-full whitespace-pre-wrap">
        <p className="leading-[36px] mb-0">{`Лев `}</p>
        <p className="leading-[36px]">Быков</p>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-full">Java-разработчик</p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full site-carousel site-teachers-carousel site-course-teachers-carousel" data-carousel="python-teachers" data-carousel-loop="true" tabIndex={0}>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Сергей Попкович">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(156,120,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" className="absolute h-[112.27%] left-[-26.49%] max-w-none top-[-12.31%] w-[160.6%]" src={imgRectangle40082} />
            </div>
          </div>
        </div>
        <Frame45 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Данила Дробышев">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <img alt="" className="absolute max-w-none object-bottom rounded-[32px] size-full" src={imgRectangle40083} />
          </div>
        </div>
        <Frame46 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Григорий Чепель">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" className="absolute h-[107.41%] left-[-7.76%] max-w-none top-[-1.29%] w-[115.23%]" src={imgRectangle40084} />
            </div>
          </div>
        </div>
        <Frame47 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Алан Агузаров">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <img alt="" className="absolute max-w-none object-bottom rounded-[32px] size-full" src={imgRectangle40085} />
          </div>
        </div>
        <Frame48 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Павел Мягчилов">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" className="absolute h-[134.96%] left-0 max-w-none top-[-13.66%] w-full" src={imgRectangle40086} />
            </div>
          </div>
        </div>
        <Frame49 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Джамбулат Таджидинов">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" className="absolute h-[124.27%] left-[0.11%] max-w-none top-[-14.44%] w-[99.89%]" src={imgRectangle40087} />
            </div>
          </div>
        </div>
        <Frame50 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Полина Караева">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-[302px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(156,120,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[119.16%] left-[6.78%] max-w-none top-[-5.89%] w-[85.23%]" src={imgRectangle40088} />
            </div>
          </div>
        </div>
        <Frame52 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[302px]" data-name="Лев Быков">
        <div className="h-[324px] relative rounded-[32px] shrink-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 302 324\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(9.2461e-16 16.2 -15.1 9.9196e-16 151 162)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[139.81%] left-[-0.08%] max-w-none top-[-12.58%] w-full" src={imgRectangle40089} />
            </div>
          </div>
        </div>
        <Frame53 />
      </div>
    </div>
  );
}

function CourseTeachersCarouselActions() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full site-teachers-carousel-actions">
      <button aria-label="Предыдущие преподаватели" className="bg-transparent flex items-center justify-center p-0 relative shrink-0" data-carousel-action="prev" data-carousel-target="python-teachers" onClick={(event) => handleCourseCarouselClick(event, "python-teachers", -1)} type="button">
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
      <button aria-label="Следующие преподаватели" className="bg-[rgba(255,255,255,0.4)] content-stretch flex flex-col items-center justify-center p-[12px] relative rounded-[32px] shrink-0 size-[44px]" data-carousel-action="next" data-carousel-target="python-teachers" onClick={(event) => handleCourseCarouselClick(event, "python-teachers", 1)} type="button">
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

function CourseTeachersCarouselBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Frame51 />
      <CourseTeachersCarouselActions />
    </div>
  );
}

function Component7() {
  return (
    <div className="bg-[#464a6a] content-stretch flex flex-col gap-[80px] items-center py-[80px] relative rounded-[40px] shrink-0 w-[1440px] site-course-render-section site-course-teachers-section" data-name="преподаватели">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[96px] text-center text-white uppercase w-[1280px] site-course-teachers-title">
        <span className="leading-[97px] text-[rgba(255,255,255,0.4)]">наши</span>
        <span className="leading-[97px]">{` преподаватели`}</span>
      </p>
      <CourseTeachersCarouselBlock />
    </div>
  );
}

function Frame212() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start relative shrink-0 uppercase w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:Bold',sans-serif] font-bold leading-[97px] relative shrink-0 text-[96px] text-white w-full">Отзывы учеников</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] text-[rgba(255,255,255,0.6)] w-full">о курсе Python-разработчик</p>
    </div>
  );
}

function Frame210() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap w-[64px]">4.9</p>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame208() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap">ВИЛЬДАН С.</p>
      <Frame210 />
    </div>
  );
}

function Frame204() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame208 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.4)] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame205() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[24px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[22px] relative shrink-0 text-[20px] text-black w-full">Уже рассматриваю переход на новое место работы</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] bg-clip-text h-[192px] leading-[20px] relative shrink-0 text-[16px] text-[transparent] tracking-[0.48px] w-full" style={{ backgroundImage: "linear-gradient(179.851deg, rgb(0, 0, 0) 0.27047%, rgb(33, 33, 33) 67.631%, rgb(255, 255, 255) 99.73%)" }}>
        Всё нравится, обучаюсь с удовольствием, спустя 2-3 месяца появилось понимание того, чем именно хотел бы заниматься дальше в разработке. Преподаватель Артемий всё разжевывает и объясняет. Администрация школы очень отзывчивая, если вдруг возникают вопросы отвечают развернуто и без затягиваний. На данный момент уже рассматриваю переход на новое место работы, сейчас готовлюсь к ...
      </p>
    </div>
  );
}

function Frame238() {
  return (
    <div className="content-stretch flex flex-col h-[230px] items-start relative shrink-0 w-full">
      <Frame205 />
    </div>
  );
}

function Frame239() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <Frame238 />
    </div>
  );
}

function Frame206() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame204 />
      <Frame239 />
    </div>
  );
}

function Frame214() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap w-[64px]">5.0</p>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame213() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap">ВЕНИАМИН</p>
      <Frame214 />
    </div>
  );
}

function Frame211() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame213 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.4)] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame215() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[24px] items-start overflow-clip relative shrink-0 text-black w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[22px] relative shrink-0 text-[20px] w-full">Нравится, что преподаватели работают здесь не только «за деньги», а за идею</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] h-[192px] leading-[20px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Изначально искал репетитора или наставника для самостоятельного изучения Python. Очень скиптически отношусь к курсам, где тебе дают доступ к урокам и пдфкам. Благо в данной школе всё совмещается, занятия и платформа, да и в целом прогресс пошел заметно быстрее. Нравится, что преподаватели работают здесь не только «за деньги», а за идею</p>
    </div>
  );
}

function Frame207() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame211 />
      <Frame215 />
    </div>
  );
}

function Frame219() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap w-[64px]">4.9</p>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame218() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap">Илья</p>
      <Frame219 />
    </div>
  );
}

function Frame217() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame218 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.4)] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame220() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[24px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[22px] relative shrink-0 text-[20px] text-black w-full">Результатом доволен, собес удалось пройти, сейчас стажируюсь</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] bg-clip-text h-[192px] leading-[20px] relative shrink-0 text-[16px] text-[transparent] tracking-[0.48px] w-full" style={{ backgroundImage: "linear-gradient(179.851deg, rgb(0, 0, 0) 0.27047%, rgb(33, 33, 33) 67.631%, rgb(255, 255, 255) 99.73%)" }}>
        Выбрал данную школу для подготовки к отбору на стажировку в Яндекс нужно было подтянуть алгоритмы и задачи, которые обычно дают на тех. секции. На занятиях много решали задач, разбирали разные подходы к их решению и учились правильно объяснять ход мыслей как это требуется на собесе. Постепенно стало намного легче ориентироваться в алгоритмических задачах. Результатом доволен, собес удалось ...
      </p>
    </div>
  );
}

function Frame241() {
  return (
    <div className="content-stretch flex flex-col h-[230px] items-start relative shrink-0 w-full">
      <Frame220 />
    </div>
  );
}

function Frame240() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <Frame241 />
    </div>
  );
}

function Frame216() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame217 />
      <Frame240 />
    </div>
  );
}

function Frame224() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap w-[64px]">4.8</p>
      <div className="relative shrink-0 size-[27px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6785 24.4217">
            <path d={svgPaths.p1080600} fill="var(--fill-0, #9747FF)" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame223() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[41px] relative shrink-0 text-[32px] text-black uppercase whitespace-nowrap">АНДРЕЙ</p>
      <Frame224 />
    </div>
  );
}

function Frame222() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame223 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.4)] w-full">курс: Python-разработчик</p>
    </div>
  );
}

function Frame225() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[24px] items-start relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[22px] relative shrink-0 text-[20px] text-black w-full">Обучением полностью доволен</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] bg-clip-text h-[192px] leading-[20px] relative shrink-0 text-[16px] text-[transparent] tracking-[0.48px] w-full" style={{ backgroundImage: "linear-gradient(179.851deg, rgb(0, 0, 0) 0.27047%, rgb(33, 33, 33) 67.631%, rgb(255, 255, 255) 99.73%)" }}>{`В связи с тем, что самостоятельное изучение Python обернулось неудачей принял решение записаться на занятия, чтобы перенимать опыт из "первых" рук. Обучением полностью доволен, каждый урок теория и практика, и ещё ДЗ; постоянная обратная связь по любым вопросам как со стороны администрации, так и преподавателя. Спасибо администрации школы за организацию и курирование обучения, а преподавателю Сергею - за интересные...`}</p>
    </div>
  );
}

function Frame243() {
  return (
    <div className="content-stretch flex flex-col h-[230px] items-start relative shrink-0 w-full">
      <Frame225 />
    </div>
  );
}

function Frame242() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <Frame243 />
    </div>
  );
}

function Frame221() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame222 />
      <Frame242 />
    </div>
  );
}

function Group6() {
  return (
    <div className="relative size-full" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 290.859 290.824">
        <g id="Group">
          <path d={svgPaths.p18267cf0} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p3e050700} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.pa4e4700} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
          <path d={svgPaths.p2e3ae300} fill="var(--fill-0, #9C78FF)" id="Vector_4" />
          <path d={svgPaths.p98afe80} fill="var(--fill-0, #9C78FF)" id="Vector_5" />
          <path d={svgPaths.p2b861570} fill="var(--fill-0, #9C78FF)" id="Vector_6" />
          <path d={svgPaths.p224c2400} fill="var(--fill-0, #9C78FF)" id="Vector_7" />
          <path d={svgPaths.p2df88ef1} fill="var(--fill-0, #9C78FF)" id="Vector_8" />
          <path d={svgPaths.p39cb9af0} fill="var(--fill-0, #9C78FF)" id="Vector_9" />
          <path d={svgPaths.pfd76b00} fill="var(--fill-0, #9C78FF)" id="Vector_10" />
          <path d={svgPaths.p119c8300} fill="var(--fill-0, #9C78FF)" id="Vector_11" />
          <path d={svgPaths.p284c4170} fill="var(--fill-0, #9C78FF)" id="Vector_12" />
          <path d={svgPaths.p25de6f00} fill="var(--fill-0, #9C78FF)" id="Vector_13" />
          <path d={svgPaths.p3814a500} fill="var(--fill-0, #9C78FF)" id="Vector_14" />
          <path d={svgPaths.p2d129140} fill="var(--fill-0, #9C78FF)" id="Vector_15" />
          <path d={svgPaths.p1263bf00} fill="var(--fill-0, #9C78FF)" id="Vector_16" />
          <path d={svgPaths.p2696b700} fill="var(--fill-0, #9C78FF)" id="Vector_17" />
          <path d={svgPaths.p1197f900} fill="var(--fill-0, #9C78FF)" id="Vector_18" />
          <path d={svgPaths.p20587300} fill="var(--fill-0, #9C78FF)" id="Vector_19" />
          <path d={svgPaths.p3b34b200} fill="var(--fill-0, #9C78FF)" id="Vector_20" />
          <path d={svgPaths.p3ccd7280} fill="var(--fill-0, #9C78FF)" id="Vector_21" />
          <path d={svgPaths.p29ccbe00} fill="var(--fill-0, #9C78FF)" id="Vector_22" />
          <path d={svgPaths.p1b52c480} fill="var(--fill-0, #9C78FF)" id="Vector_23" />
          <path d={svgPaths.p1e75eb80} fill="var(--fill-0, #9C78FF)" id="Vector_24" />
          <path d={svgPaths.p11748700} fill="var(--fill-0, #9C78FF)" id="Vector_25" />
          <path d={svgPaths.pcd03700} fill="var(--fill-0, #9C78FF)" id="Vector_26" />
          <path d={svgPaths.p7822980} fill="var(--fill-0, #9C78FF)" id="Vector_27" />
          <path d={svgPaths.p8b90600} fill="var(--fill-0, #9C78FF)" id="Vector_28" />
          <path d={svgPaths.p39ee6df0} fill="var(--fill-0, #9C78FF)" id="Vector_29" />
          <path d={svgPaths.p1082cf80} fill="var(--fill-0, #9C78FF)" id="Vector_30" />
          <path d={svgPaths.p24418960} fill="var(--fill-0, #9C78FF)" id="Vector_31" />
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
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 opacity-20 overflow-clip size-[334px] top-[calc(50%+0.5px)]" data-name="avatar">
      <div className="absolute flex inset-[-4.44%_-4.48%_-4.48%_-4.43%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-76.3833cqw,23.6122cqh)] rotate-[72.82deg] w-[hypot(23.6167cqw,76.3878cqh)]">
          <Group6 />
        </div>
      </div>
      <Group7 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col h-[330px] items-center justify-between relative shrink-0 w-[429px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] min-w-full relative shrink-0 text-[36px] text-black text-center w-[min-content]">Мы ценим каждого</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Bold',sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[24px] text-black text-center uppercase w-[min-content]">
        <p className="leading-[31px] mb-0">Вдохновляйтесь историями успеха реальных людей</p>
        <p className="leading-[31px]">Их результат может стать вашим</p>
      </div>
      <div className="bg-[#9c78ff] content-stretch cursor-pointer flex items-center justify-center p-[16px] relative rounded-[40px] shrink-0 w-[362px]" data-name="Frame 40/дефолт/фиолетовый" data-reviews-all="python" role="button" tabIndex={0}>
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[32px] text-white whitespace-pre">{`смотреть все  отзывы`}</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[101px] items-center justify-center min-h-px relative w-full">
      <Avatar />
      <Frame23 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-white drop-shadow-[6px_6px_10px_rgba(0,0,0,0.17)] relative rounded-bl-[40px] rounded-tl-[40px] rounded-tr-[40px] self-stretch shrink-0 w-[610px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[40px] relative size-full">
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full site-carousel site-course-reviews-carousel" data-carousel="python-reviews" data-name="сами отзывы">
      <a className="bg-white cursor-pointer no-underline relative rounded-[40px] shrink-0 text-inherit w-[465px]" data-course-review="vildan" draggable={false} href="/python-course/reviews/vildan">
        <div className="content-stretch flex flex-col gap-[20px] items-end overflow-clip p-[32px] relative rounded-[inherit] size-full">
          <Frame206 />
          <span className="bg-transparent border-0 cursor-pointer block h-[12px] p-0 relative shrink-0 w-[417px]" data-name="читать полностью">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:ExtraLight',sans-serif] font-extralight inset-0 leading-[20px] text-[16px] text-black text-right">{`читать полностью `}</p>
          </span>
        </div>
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
      </a>
      <a className="bg-white content-stretch cursor-pointer flex flex-col items-end no-underline p-[32px] relative rounded-[40px] shrink-0 text-inherit w-[465px]" data-course-review="veniamin" draggable={false} href="/python-course/reviews/veniamin">
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
        <Frame207 />
      </a>
      <a className="bg-white cursor-pointer no-underline relative rounded-[40px] shrink-0 text-inherit w-[465px]" data-course-review="ilya" draggable={false} href="/python-course/reviews/ilya">
        <div className="content-stretch flex flex-col gap-[20px] items-end overflow-clip p-[32px] relative rounded-[inherit] size-full">
          <Frame216 />
          <span className="bg-transparent border-0 cursor-pointer block h-[12px] p-0 relative shrink-0 w-[417px]" data-name="читать полностью">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:ExtraLight',sans-serif] font-extralight inset-0 leading-[20px] text-[16px] text-black text-right">{`читать полностью `}</p>
          </span>
        </div>
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
      </a>
      <a className="bg-white cursor-pointer no-underline relative rounded-[40px] shrink-0 text-inherit w-[465px]" data-course-review="andrey" draggable={false} href="/python-course/reviews/andrey">
        <div className="content-stretch flex flex-col gap-[20px] items-end overflow-clip p-[32px] relative rounded-[inherit] size-full">
          <Frame221 />
          <span className="bg-transparent border-0 cursor-pointer block h-[12px] p-0 relative shrink-0 w-[417px]" data-name="читать полностью">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Manrope:ExtraLight',sans-serif] font-extralight inset-0 leading-[20px] text-[16px] text-black text-right">{`читать полностью `}</p>
          </span>
        </div>
        <div aria-hidden className="absolute border border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
      </a>
      <Frame22 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full site-course-carousel-actions">
      <button aria-label="Предыдущие отзывы" className="bg-transparent flex items-center justify-center p-0 relative shrink-0" data-carousel-action="prev" data-carousel-target="python-reviews" onClick={(event) => handleCourseCarouselClick(event, "python-reviews", -1)} type="button">
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
      <button aria-label="Следующие отзывы" className="bg-[rgba(255,255,255,0.4)] content-stretch flex flex-col items-center justify-center p-[12px] relative rounded-[32px] shrink-0 size-[44px]" data-carousel-action="next" data-carousel-target="python-reviews" onClick={(event) => handleCourseCarouselClick(event, "python-reviews", 1)} type="button">
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

function Component8() {
  return (
    <div className="bg-[#9c78ff] content-stretch flex flex-col gap-[80px] items-start py-[80px] relative rounded-[40px] shrink-0 w-[1440px] site-course-render-section site-course-reviews-section" data-name="отзывы">
      <div className="absolute flex h-[1305.563px] items-center justify-center left-[-318px] top-[-150px] w-[2187.149px] site-course-reviews-bg">
        <div className="flex-none rotate-[-100.48deg]">
          <div className="h-[2048.76px] relative w-[948.755px]" data-name="Cloned_Circles_2">
            <img alt="" className="absolute inset-0 max-w-none mix-blend-lighten object-cover pointer-events-none size-full" src={imgClonedCircles2} />
          </div>
        </div>
      </div>
      <div className="px-[80px] relative shrink-0 w-full">
        <Frame212 />
      </div>
      <Component9 />
      <Frame66 />
    </div>
  );
}

function Frame203() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Raleway:Bold',sans-serif] font-bold gap-[16px] items-center relative shrink-0 text-center uppercase">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[97px] relative shrink-0 text-[#9c78ff] text-[96px] top-[-10px] w-[916px]">Выгодные</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[33px] relative shrink-0 text-[85px] text-black whitespace-nowrap">условия</p>
    </div>
  );
}

function Frame174() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[40px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center justify-center p-[32px] relative size-full text-black text-center">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase w-full">Оплата по факту обучения</p>
          <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
            <p className="leading-[30px] mb-0">Без кредитов, рассрочек</p>
            <p className="leading-[30px]">и скрытых обязательств</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame175() {
  return (
    <div className="flex-[1_0_0] h-[196px] min-w-px relative rounded-[40px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center justify-center p-[32px] relative size-full text-black text-center">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase w-full">Можно вернуть до 13% от цены курса</p>
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] w-full">Воспользуйтесь налоговым вычетом</p>
        </div>
      </div>
    </div>
  );
}

function Frame179() {
  return (
    <div className="content-stretch flex gap-[40px] items-center justify-center relative rounded-[40px] shrink-0 w-full">
      <div aria-hidden className="absolute border-5 border-[#9c78ff] border-solid inset-[-5px] pointer-events-none rounded-[45px]" />
      <Frame174 />
      <div className="flex h-[124px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[124px]">
            <div className="absolute inset-[-3px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124 3">
                <line id="Line 1" stroke="var(--stroke-0, black)" strokeWidth="3" x2="124" y1="1.5" y2="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame175 />
    </div>
  );
}

function Frame260() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-center px-[8px] py-[12px] relative rounded-[20px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#9c78ff] text-[16px] tracking-[0.48px] whitespace-nowrap">-36%</p>
    </div>
  );
}

function Frame261() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Manrope:Bold',sans-serif] font-bold leading-[31px] line-through relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] uppercase whitespace-nowrap">12 590 ₽/мес.</p>
      <Frame260 />
    </div>
  );
}

function Frame176() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
      <Frame261 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] text-white uppercase whitespace-nowrap">7 990 ₽/мес.</p>
    </div>
  );
}

function Frame178() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Frame176 />
      <div className="bg-white relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[20px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[35px] relative shrink-0 text-[32px] text-black whitespace-nowrap">записаться</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeuiDone2Filled() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled1() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled2() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled3() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled4() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled5() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled6() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame236() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[26px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">-</p>
    </div>
  );
}

function Frame237() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[26px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">-</p>
    </div>
  );
}

function Frame244() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[26px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">-</p>
    </div>
  );
}

function Frame245() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[26px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">-</p>
    </div>
  );
}

function Frame186() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full">
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Bold',sans-serif] font-bold leading-[22px] min-w-px relative text-[20px] text-white">4 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЯ В МЕСЯЦ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled1 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Доступ к учебной платформе ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled2 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">6 игровых проектов в портфолио</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled3 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Домашние задания и проверка кода преподавателем</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled4 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Ежедневная поддержка куратора в чате</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled5 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Записи ваших индивидуальных занятий с преподавателем навсегда</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled6 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Диплом ИТ-школы ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <Frame236 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-[rgba(0,0,0,0.6)]">Диплом о профессиональной переподготовке</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <Frame237 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-[rgba(0,0,0,0.6)]">Стажировка после обучения</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <Frame244 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-[rgba(0,0,0,0.6)]">{` 2 тестовых технических собеседования`}</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <Frame245 />
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[20px] text-[rgba(0,0,0,0.6)]">
          <p className="leading-[22px] mb-0">Подготовка резюме</p>
          <p className="leading-[22px]">с HR-специалистом</p>
        </div>
      </div>
    </div>
  );
}

function Frame264() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[8px] py-[12px] relative rounded-[20px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">-38%</p>
    </div>
  );
}

function Frame263() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Manrope:Bold',sans-serif] font-bold leading-[31px] line-through relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] uppercase whitespace-nowrap">23 590 ₽/мес.</p>
      <Frame264 />
    </div>
  );
}

function Frame177() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
      <Frame263 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[#9c78ff] text-[40px] uppercase whitespace-nowrap">14 390 ₽/мес.</p>
    </div>
  );
}

function Frame180() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Frame177 />
      <div className="bg-[rgba(156,120,255,0.6)] relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[20px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[35px] relative shrink-0 text-[32px] text-white whitespace-nowrap">записаться</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeuiDone2Filled7() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled8() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled9() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled10() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled11() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled12() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled13() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled14() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled15() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame246() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[26px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">-</p>
    </div>
  );
}

function Frame247() {
  return (
    <div className="bg-[rgba(84,110,122,0.8)] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[32px] shrink-0 size-[26px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">-</p>
    </div>
  );
}

function Frame187() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full">
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled7 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Bold',sans-serif] font-bold leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">8 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЙ В МЕСЯЦ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled8 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">Доступ к учебной платформе ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled9 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">6 игровых проектов в портфолио</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled10 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">Домашние задания и проверка кода преподавателем</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled11 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">Ежедневная поддержка куратора в чате</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled12 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">Записи ваших индивидуальных занятий с преподавателем навсегда</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled13 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">Диплом ИТ-школы ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled14 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">Диплом о профессиональной переподготовке</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled15 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[#464a6a] text-[20px]">Стажировка после обучения</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <Frame246 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-[rgba(84,110,122,0.8)]">{` 2 тестовых технических собеседования`}</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <Frame247 />
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[20px] text-[rgba(84,110,122,0.8)]">
          <p className="leading-[22px] mb-0">Подготовка резюме</p>
          <p className="leading-[22px]">с HR-специалистом</p>
        </div>
      </div>
    </div>
  );
}

function Frame266() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-center px-[8px] py-[12px] relative rounded-[20px] shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#9c78ff] text-[16px] tracking-[0.48px] whitespace-nowrap">-41%</p>
    </div>
  );
}

function Frame265() {
  return (
    <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Manrope:Bold',sans-serif] font-bold leading-[31px] line-through relative shrink-0 text-[24px] text-[rgba(0,0,0,0.4)] uppercase whitespace-nowrap">31 950 ₽/мес.</p>
      <Frame266 />
    </div>
  );
}

function Frame182() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
      <Frame265 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] text-white uppercase whitespace-nowrap">18 890 ₽/мес.</p>
    </div>
  );
}

function Frame181() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Frame182 />
      <div className="bg-white relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[20px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[35px] relative shrink-0 text-[32px] text-black whitespace-nowrap">записаться</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeuiDone2Filled16() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled17() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled18() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled19() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled20() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled21() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled22() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled23() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled24() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled25() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WeuiDone2Filled26() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="weui:done2-filled">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g clipPath="url(#clip0_1_2567)" id="weui:done2-filled">
          <path clipRule="evenodd" d={svgPaths.p202a7510} fill="var(--fill-0, #9C78FF)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2567">
            <rect fill="white" height="26" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame188() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full">
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled16 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Bold',sans-serif] font-bold leading-[22px] min-w-px relative text-[20px] text-white">12 ИНДИВИДУАЛЬНЫХ ЗАНЯТИЙ В МЕСЯЦ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled17 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Доступ к учебной платформе ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled18 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">6 игровых проектов в портфолио</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled19 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Домашние задания и проверка кода преподавателем</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <WeuiDone2Filled20 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Ежедневная поддержка куратора в чате</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled21 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Записи ваших индивидуальных занятий с преподавателем навсегда</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled22 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Диплом ИТ-школы ИННОПРОГ</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled23 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Диплом о профессиональной переподготовке</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled24 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">Стажировка после обучения</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled25 />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[22px] min-w-px relative text-[20px] text-white">{` 2 тестовых технических собеседования`}</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <WeuiDone2Filled26 />
        <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[20px] text-white">
          <p className="leading-[22px] mb-0">Подготовка резюме</p>
          <p className="leading-[22px]">с HR-специалистом</p>
        </div>
      </div>
    </div>
  );
}

function Frame252() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-[1280px]">
      <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex flex-col gap-[40px] items-center p-[32px] relative rounded-[40px] shrink-0 w-[411px]" data-name="тариф/актив">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[47px] relative shrink-0 text-[40px] text-white uppercase whitespace-nowrap">Базовый</p>
        <Frame178 />
        <Frame186 />
      </div>
      <div className="content-stretch flex flex-col gap-[40px] items-start p-[32px] relative rounded-[40px] shrink-0 w-[410px]" data-name="тариф/актив">
        <div aria-hidden className="absolute border-5 border-[#9c78ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[47px] relative shrink-0 text-[#9c78ff] text-[40px] uppercase whitespace-nowrap">РАСШИРЕННЫЙ</p>
        <Frame180 />
        <Frame187 />
      </div>
      <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex flex-col gap-[40px] items-start p-[32px] relative rounded-[40px] shrink-0 w-[411px]" data-name="тариф/актив">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Bold',sans-serif] font-bold leading-[47px] relative shrink-0 text-[40px] text-white uppercase whitespace-nowrap">персональный</p>
        <Frame181 />
        <Frame188 />
      </div>
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center relative shrink-0 w-[1280px] site-course-render-section" data-name="тариф">
      <Frame203 />
      <Frame179 />
      <Frame252 />
    </div>
  );
}

function Frame253() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Raleway:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[64px] uppercase w-full">
        <p className="leading-[68px] mb-0">Не уверены, что вам</p>
        <p className="leading-[68px]">это подходит?</p>
      </div>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] w-full">
        <p className="leading-[33px] mb-0">Оставьте заявку — мы обо всем расскажем</p>
        <p className="leading-[33px]">подробнее</p>
      </div>
    </div>
  );
}

function Frame192() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center px-[20px] py-[16px] relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase">172</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[32px]">
        <p className="leading-[30px] mb-0">интерактивных</p>
        <p className="leading-[30px]">урока</p>
      </div>
    </div>
  );
}

function Frame196() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center px-[20px] py-[16px] relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase">194</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[32px]">
        <p className="leading-[30px] mb-0">практических</p>
        <p className="leading-[30px]">задания</p>
      </div>
    </div>
  );
}

function Frame197() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center px-[20px] py-[16px] relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase">{`70% `}</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[32px]">
        <p className="leading-[30px] mb-0">обучения</p>
        <p className="leading-[30px]">— практика</p>
      </div>
    </div>
  );
}

function Frame268() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-[324px]">
      <Frame192 />
      <Frame196 />
      <Frame197 />
    </div>
  );
}

function Frame198() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center px-[20px] py-[16px] relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase">6</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[32px]">
        <p className="leading-[30px] mb-0 whitespace-pre">{`игровых проектов `}</p>
        <p className="leading-[30px] whitespace-pre">в портфолио</p>
      </div>
    </div>
  );
}

function Frame199() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center px-[20px] py-[16px] relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase">28</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[32px]">
        <p className="leading-[30px] mb-0 whitespace-pre">{`учебных `}</p>
        <p className="leading-[30px] whitespace-pre">недель</p>
      </div>
    </div>
  );
}

function Frame200() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center px-[20px] py-[16px] relative shrink-0">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[40px] relative shrink-0 text-[40px] uppercase">560</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[32px]">
        <p className="leading-[30px] mb-0 whitespace-pre">{`академических `}</p>
        <p className="leading-[30px] whitespace-pre">часов</p>
      </div>
    </div>
  );
}

function Frame269() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0">
      <Frame198 />
      <Frame199 />
      <Frame200 />
    </div>
  );
}

function Frame270() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center py-[32px] relative rounded-[32px] shrink-0 w-full whitespace-nowrap" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 792 486\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.6000000238418579\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.05 33.277 -54.23 14.999 360 243)\\'><stop stop-color=\\'rgba(213,197,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(183,166,230,1)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(153,135,204,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(123,103,179,1)\\' offset=\\'0.75\\'/><stop stop-color=\\'rgba(94,72,153,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
      <Frame268 />
      <Frame269 />
    </div>
  );
}

function Frame254() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[40px] items-start relative shrink-0 text-white w-[792px]">
      <Frame253 />
      <Frame270 />
    </div>
  );
}

function Frame189() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <input aria-label="Ваше имя" autoComplete="name" className="site-course-lead-input site-course-lead-input--desktop" name="name" placeholder="Ваше имя" type="text" />
      <input aria-label="Номер телефона" autoComplete="tel" className="site-course-lead-input site-course-lead-input--desktop" inputMode="tel" name="phone" placeholder="+7(000)-000-00-00" type="tel" />
      <input aria-label="Почта" autoComplete="email" className="site-course-lead-input site-course-lead-input--desktop" name="email" placeholder="Почта" type="email" />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame189 />
    </div>
  );
}

function Frame58() {
  return (
    <div aria-checked="false" className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full site-consent site-course-consent" data-consent-toggle role="checkbox" tabIndex={0}>
      <div className="relative rounded-[2px] shrink-0 size-[24px] site-consent__box" data-name="чекбокс">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[2px] site-consent__border" />
        <svg aria-hidden="true" className="site-consent__check" fill="none" viewBox="0 0 24 24">
          <path d="M5 12.5L10 17.5L19 7" />
        </svg>
      </div>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-white">
        <span className="leading-[20px] text-[16px]">Нажимая на кнопку, вы даете </span>
        <a className="cursor-pointer font-['Manrope:Bold',sans-serif] font-bold leading-[20px] site-consent__link text-[16px]" href="https://api.innoprog.ru/files/documents/consent_to_personal_data_processing.pdf" rel="noopener noreferrer" target="_blank">
          <span>согласие на обработку персональных данных</span>
        </a>
        <span className="leading-[20px] text-[16px]">{` и соглашаетесь с `}</span>
        <a className="cursor-pointer font-['Manrope:Bold',sans-serif] font-bold leading-[20px] site-consent__link text-[16px]" href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">
          <span>политикой конфиденциальности</span>
        </a>
      </p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame58 />
      <button className="bg-white cursor-pointer relative rounded-[40px] shrink-0 w-full site-course-lead-submit" data-name="кнопки пд" type="button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[28px] relative size-full">
            <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[32px] text-black whitespace-nowrap">начать обучение</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-col gap-[48px] items-start relative shrink-0 w-[464px]">
      <Frame57 />
      <textarea aria-label="Ваш вопрос" className="site-course-lead-input site-course-lead-input--desktop site-course-lead-input--question" name="question" placeholder="Ваш вопрос" />
      <Frame59 />
    </div>
  );
}

function Component11() {
  return (
    <div className="bg-[#464a6a] relative rounded-[40px] shrink-0 w-full site-course-render-section" data-name="заявка">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex items-end justify-between px-[80px] py-[104px] relative size-full">
          <Frame254 />
          <Frame60 />
        </div>
      </div>
    </div>
  );
}

function Frame132() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Raleway:Bold',sans-serif] font-bold gap-[29px] items-start leading-[97px] relative shrink-0 uppercase w-[1280px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[96px] text-black top-[-20px] w-full">{`Часто задаваемые `}</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[#9c78ff] text-[199px] text-right w-full">вопросы</p>
    </div>
  );
}

function Frame162() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-w-px relative">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex-[1_0_0] font-['Raleway:Medium',sans-serif] font-medium leading-[0] min-w-px relative text-[40px] text-black text-left uppercase">
        <p className="leading-[53px] mb-0">Слышал, что Unreal Engine 5 - это слишком сложно</p>
        <p className="leading-[53px]">{`что я буду учить на курсе? `}</p>
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

function Frame171() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-black text-left uppercase w-[1280px]">{`Есть ли программы рассрочки, или нужно оплатить курс сразу? `}</p>
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

function Frame173() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[0] mr-[-28px] relative shrink-0 text-[40px] text-black text-left uppercase w-[1280px]">
        <p className="leading-[53px] mb-0">Как будет устроена практика</p>
        <p className="leading-[53px]">{`и сколько проектных работ я сделаю? `}</p>
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

function Frame183() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-black text-left uppercase w-[1280px]">{`Смогу ли совмещать обучение с работой? `}</p>
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

function Frame184() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-black text-left uppercase w-[1280px]">{`Помогаете ли вы с резюме и собеседованиями? `}</p>
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

function Frame185() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Raleway:Medium',sans-serif] font-medium leading-[53px] mr-[-28px] relative shrink-0 text-[40px] text-black text-left uppercase w-[1280px]">Что будет после окончания курса?</p>
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

function Frame137() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="site-course-faq-list site-course-faq-list--desktop content-stretch flex flex-col items-start relative shrink-0 w-full">
      {courseFaqItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div className={`site-course-faq-item site-course-faq-item--desktop relative shrink-0 w-full${isOpen ? " is-open" : ""}`} key={item.question}>
            <button
              aria-expanded={isOpen}
              className="site-course-faq-trigger site-course-faq-trigger--desktop"
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              type="button"
            >
              <span className="site-course-faq-question site-course-faq-question--desktop">{item.question}</span>
              <span aria-hidden className="site-course-faq-arrow">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.4591 29.4564">
                  <path d={svgPaths.p3133300} stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </button>
            <div className="site-course-faq-answer-shell" aria-hidden={!isOpen}>
              <div className="site-course-faq-answer site-course-faq-answer--desktop">
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

function Component12() {
  return (
    <div className="content-stretch flex flex-col gap-[104px] items-center relative shrink-0 w-full" data-name="вопросы">
      <Frame132 />
      <Frame137 />
    </div>
  );
}

function Group9() {
  return (
    <div className="col-1 h-[244.958px] ml-[700.63px] mt-0 relative row-1 w-[577.376px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 577.375 244.958">
        <g id="Group">
          <path d={svgPaths.p23edab00} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p4043300} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p30941380} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="col-1 h-[290.17px] ml-0 mt-[15.92px] relative row-1 w-[1278px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1278 290.17">
        <g id="Group">
          <path d={svgPaths.p1e692d80} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p34305180} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p3b8f9400} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
          <path d={svgPaths.p2b6c6b0} fill="var(--fill-0, #9C78FF)" id="Vector_4" />
          <path d={svgPaths.p2a30380} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p376d2400} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p29fbf380} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p24ca3e00} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p259c9e00} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p847f400} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p1cb57300} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.p391bde80} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p2cbc4300} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p7ccf500} fill="var(--fill-0, white)" id="Vector_14" />
          <path d={svgPaths.p25b8d000} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p16f9d200} fill="var(--fill-0, white)" id="Vector_16" />
          <path d={svgPaths.p10852a80} fill="var(--fill-0, white)" id="Vector_17" />
          <path d={svgPaths.p264827f0} fill="var(--fill-0, white)" id="Vector_18" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[81px] mt-[210px] opacity-30 place-items-start relative row-1" data-name="Group">
      <Group9 />
      <Group10 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Light',sans-serif] font-light gap-[24px] items-start relative shrink-0 text-[20px] text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">Тел: +7 (958) 606-79-80</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">Email: education@innoprog.ru</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">Telegram: @innoprog_admin</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start leading-[30px] relative shrink-0 w-[302px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#9c78ff] text-[32px] w-full">Контакты</p>
      <Frame27 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Light',sans-serif] font-light gap-[24px] items-start relative shrink-0 text-[20px] text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">г. Иннополис, ул. Университетская, д.5, пом.115, м.15/2</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 w-full">420500 Республика Татарстан, Верхнеуслонский р-он,</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start leading-[30px] relative shrink-0 w-[302px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#9c78ff] text-[32px] w-full">Адреса</p>
      <Frame28 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Light',sans-serif] font-light gap-[24px] items-start relative shrink-0 text-[20px] text-white w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[30px] relative shrink-0 w-full">Политика конфиденциальности</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[30px] relative shrink-0 w-full">Публичная оферта</p>
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] leading-[0] relative shrink-0 w-full">
        <p className="leading-[30px] mb-0">Выписка из реестра лицензий</p>
        <p className="leading-[30px]">на образовательную деятельность</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[302px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['Manrope:SemiBold',sans-serif] font-semibold leading-[30px] relative shrink-0 text-[#9c78ff] text-[32px] w-full">Правовая информация</p>
      <Frame29 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[24px] items-start relative shrink-0 w-[954px]">
      <Frame33 />
      <Frame32 />
      <Frame31 />
    </div>
  );
}

function MaterialSymbolsMailOutline() {
  return (
    <div className="relative shrink-0 size-[85px]" data-name="material-symbols:mail-outline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 85">
        <g id="material-symbols:mail-outline">
          <rect fill="var(--fill-0, #D9D9D9)" height="85" rx="40" width="85" />
          <path d={svgPaths.p36270580} fill="var(--fill-0, #464A6A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TablerPhoneCall() {
  return (
    <div className="relative shrink-0 size-[85px]" data-name="tabler:phone-call">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 85">
        <g id="tabler:phone-call">
          <path d={svgPaths.p12eb5e80} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.p3f181b00} id="Vector" stroke="var(--stroke-0, #464A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function IcBaselineWhatsapp() {
  return (
    <div className="h-[83px] relative shrink-0 w-[85px]" data-name="ic:baseline-whatsapp">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 83">
        <g id="ic:baseline-whatsapp">
          <path d={svgPaths.p1c2b1d80} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.pf349600} fill="var(--fill-0, #464A6A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MynauiTelegram() {
  return (
    <div className="relative shrink-0 size-[85px]" data-name="mynaui:telegram">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 85">
        <g id="mynaui:telegram">
          <path d={svgPaths.p12eb5e80} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.pf565fa0} id="Vector" stroke="var(--stroke-0, #464A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0">
      <MaterialSymbolsMailOutline />
      <TablerPhoneCall />
      <IcBaselineWhatsapp />
      <MynauiTelegram />
    </div>
  );
}

function Frame35() {
  return (
    <div className="col-1 content-stretch flex gap-[239px] h-[373px] items-start ml-[80px] mt-[80px] relative row-1 w-[1280px]">
      <Frame34 />
      <Frame30 />
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#464a6a] col-1 h-[533px] ml-0 mt-0 relative rounded-tl-[48px] rounded-tr-[48px] row-1 w-[1440px]" />
      <Group8 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] col-1 font-['Manrope:Regular',sans-serif] font-normal leading-[19px] ml-[180px] mt-[482px] relative row-1 text-[15px] text-center text-white tracking-[0.18px] w-[1080px]">
        ООО «ИННОПРОГ» · ИНН 1683011286 · ОГРН 1221600105440
        <br aria-hidden />
        ОКВЭД: 62.09 (основной), 62.02 · ИТ-коды: 16.01 (основной), 1.01, 1.12
      </p>
      <Frame35 />
    </div>
  );
}

function Frame194() {
  return (
    <div className="content-stretch flex flex-col gap-[208px] h-[9734px] items-center relative shrink-0 w-full">
      <Frame262 />
      <Component7 />
      <Component8 />
      <Component10 />
      <Component11 />
      <Component12 />
      <Group11 />
    </div>
  );
}

function Frame195() {
  return (
    <div className="content-stretch flex flex-col gap-[208px] h-[22718px] items-center relative shrink-0 w-full">
      <Frame193 />
      <Component3 />
      <Frame78 />
      <Frame194 />
    </div>
  );
}

function Frame202() {
  return (
    <div className="content-stretch flex flex-col gap-[104px] h-[21265px] items-center relative shrink-0 w-full">
      <Frame230 />
      <Frame166 />
      <Frame195 />
    </div>
  );
}

function Frame232() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[80px] h-[21550px] items-center left-1/2 top-[24px] w-[1440px]">
      <div className="content-stretch flex items-center justify-between relative rounded-[40px] shrink-0 w-[1280px]">
        <Group />
        <Frame26 />
        <div className="flex flex-row items-center self-stretch">
          <div className="bg-[#464a6a] h-full relative rounded-[40px] shrink-0" data-name="кнопки пд">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative size-full">
                <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium leading-[35px] relative shrink-0 text-[24px] text-white whitespace-nowrap">подобрать направление</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame202 />
    </div>
  );
}

function Frame194WithoutFooter() {
  return (
    <div className="content-stretch flex flex-col gap-[208px] items-center relative shrink-0 w-full">
      <Frame262 />
      <Component7 />
      <Component8 />
      <Component10 />
      <Component11 />
      <Component12 />
    </div>
  );
}

function Frame195WithoutFooter() {
  return (
    <div className="content-stretch flex flex-col gap-[208px] items-center relative shrink-0 w-full">
      <Frame193 />
      <Component3 />
      <Frame78 />
      <Frame194WithoutFooter />
    </div>
  );
}

function Frame202WithoutHeaderFooter() {
  return (
    <div className="content-stretch flex flex-col gap-[104px] items-center relative shrink-0 w-full">
      <CourseTopSurface />
      <Frame195WithoutFooter />
    </div>
  );
}

function CourseTopBackground() {
  return (
    <>
      <div className="absolute bg-[#9c78ff] inset-0" />
      <div className="absolute flex h-[2878.892px] items-center justify-center left-[-396px] top-[254px] w-[2836.465px]">
        <div className="flex-none rotate-[-23.78deg]">
          <div
            className="h-[2209.064px] opacity-90 pointer-events-none relative w-[2126.168px]"
            data-name="Focus"
            style={{
              background: `url(${imgFocus}) #9c78ff 50% / cover no-repeat`,
              backgroundBlendMode: "color-burn",
            }}
          />
        </div>
      </div>
      <div className="absolute h-[686px] left-[80px] top-[1710px] w-[1280px]">
        <div className="absolute inset-[-29.15%_-15.63%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1680 1086">
            <g filter="url(#filter0_f_1_2632)" id="Ellipse 7">
              <ellipse cx="840" cy="543" fill="var(--fill-0, white)" fillOpacity="0.4" rx="640" ry="343" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1086" id="filter0_f_1_2632" width="1680" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_2632" stdDeviation="100" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[1007px] left-[94px] top-[186px] w-[1236px]">
        <div className="absolute inset-[-19.86%_-16.18%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1636 1407">
            <g filter="url(#filter0_f_1_2491)" id="Ellipse 6">
              <ellipse cx="818" cy="703.5" fill="var(--fill-0, white)" fillOpacity="0.4" rx="618" ry="503.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1407" id="filter0_f_1_2491" width="1636" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_2491" stdDeviation="100" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}

function CourseTopSurface() {
  return (
    <section className="site-python-course-top-surface">
      <CourseTopBackground />
      <div className="site-python-course-top-surface__content">
        <Frame230 />
        <Frame166 />
        <div className="site-python-course-top-surface__advantages">
          <Frame231 />
        </div>
      </div>
    </section>
  );
}

export default function UnrealEngineCourseDesktop() {
  return (
    <div className="bg-white overflow-visible relative w-[1440px]" data-name="python course desktop">
      <div className="content-stretch flex flex-col items-center pb-[104px] relative w-full">
        <Frame202WithoutHeaderFooter />
      </div>
    </div>
  );
}
