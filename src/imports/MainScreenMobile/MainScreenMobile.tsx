import svgPaths from "./svg-paths";
import imgGain from "../MainScreenDesktop/559076f97b29b552f98b8ef64abca31d3d16d281.opt.webp";
import imgCoursePython from "../MainScreenDesktop/3f6061d637a4cfce23fccae8de31e69e558fd2a8.opt.webp";
import imgCourseDataScience from "../MainScreenDesktop/653b7bc37f655916fe3ab94dc7fa4c9a87a9cee1.opt.webp";
import imgCourseFrontend from "../MainScreenDesktop/c6d3c38bc41dfc3341159f2554b64cfeaf3c7d6f.opt.webp";
import imgCourseCpp from "../MainScreenDesktop/8f047d89405d2f6d6d082c02c38bf64691b762d4.opt.webp";
import imgCourseMobile from "../MainScreenDesktop/e9d641090abdd6bedcdf1c20f8131589dc50f9cf.opt.webp";
import imgCourseUnreal from "../MainScreenDesktop/e6d0013835ce90ccca46f42fb5480d9fab91d85f.opt.webp";
import imgCourseJava from "../MainScreenDesktop/3351f7e9c2b3bf5e23666740f3bf50accd535675.opt.webp";
import imgCourseMl from "../MainScreenDesktop/c6e1c119abfe305878a91ba9294aa2ea1250aa7e.opt.webp";
import img70211AppleMockupProDriveAirLaptopsDisc1 from "../MainScreenDesktop/apple-mockup-pro-drive-air.opt.webp";
import imgImage118 from "../MainScreenDesktop/8203cbb984ade08a409e3cb123b62173d36af946.opt.webp";
import imgImage120 from "../MainScreenDesktop/7e04d2ff334c194bc04be7de134120846fa4b54a.opt.webp";
import imgPhoneFrame from "../MainScreenDesktop/6397a5e6c95741194ffcda7e9dcc26be72b64572.opt.webp";
import imgWithUsArrow from "../MainScreenDesktop/031fb2cc26a5ba0b51db501faeceecc6efad82f1.opt.webp";
import imgImage119 from "../MainScreenDesktop/ba565c24ba9ea8905f81d42c3313cf70fe810e53.opt.webp";
import imgProblemStudent from "../MainScreenDesktop/b0e157afc5f21ed21c0695f850461b4b7de165b5.opt.webp";
import imgProblemArrow from "../MainScreenDesktop/52099641dea92d64016f12ac74714b5a956fb8b3.opt.webp";
import imgBenefitCard1 from "../MainScreenDesktop/benefit-card1-figma.png";
import imgBenefitIconsChat from "../MainScreenDesktop/benefit-icons-chat-figma.webp";
import imgRectangle40082 from "../MainScreenDesktop/100b51f7b19a210b3de8eadf6abcf10392a9da09.teacher.webp";
import imgRectangle40083 from "./teacher-grigoriy-mobile.webp";
import imgRectangle40084 from "../MainScreenDesktop/b1f967bb9c7ae9c25195d8f4a73fc5847efd16f6.teacher.webp";
import imgRectangle40085 from "../MainScreenDesktop/2cbe57953beca1178afd27d1f71884d7d612b585.teacher.webp";
import imgRectangle40086 from "../MainScreenDesktop/9fd4f9c316d21dbd728b3436e79074f22de66286.teacher.webp";
import imgRectangle40087 from "./teacher-alan-mobile.webp";
import imgRectangle40088 from "../MainScreenDesktop/accce48d175d044546f06312eec0a082304225b6.teacher.webp";
import imgRectangle40089 from "../MainScreenDesktop/0637a0266dd99580004167f3ae3ffee5b51608c3.teacher.webp";
import imgReviewKirill from "../MainScreenDesktop/review-kirill.png";
import imgReviewAnastasia from "../MainScreenDesktop/review-anastasia-high.webp";
import imgReviewMikhail from "../MainScreenDesktop/review-mikhail-high.webp";
import imgReviewKirillHero from "../MainScreenDesktop/review-story-kirill-hero.webp";
import imgGroup6821 from "../MainScreenDesktop/bced4fe251202675be6f268fb651a981a420eb8a.opt.webp";
import imgDiplomProf1 from "../MainScreenDesktop/diplom-prof.opt.webp";
import imgImg29491 from "./hero-mobile.webp";
import {
  MOBILE_FEATURES_BG_HEIGHT,
  MOBILE_FEATURES_BG_TOP,
  MOBILE_NEXT_SECTIONS_TOP,
  MOBILE_PLATFORM_CONTENT_TOP,
  MOBILE_PLATFORM_HEIGHT,
  MOBILE_PLATFORM_TOP,
} from "../../app/mobileLayout";

type CourseCardVisual = {
  src: string;
  imageClassName: string;
  direct?: boolean;
};

const COURSE_CARD_VISUALS: CourseCardVisual[] = [
  {
    src: imgCoursePython,
    imageClassName: "absolute h-[223.09%] left-[-52.45%] max-w-none top-[-71.19%] w-[279.52%]",
  },
  {
    src: imgCourseDataScience,
    imageClassName: "absolute h-[170.12%] left-[-36.21%] max-w-none top-[-36.44%] w-[142.1%]",
  },
  {
    src: imgCourseFrontend,
    imageClassName: "mix-blend-lighten",
    direct: true,
  },
  {
    src: imgCourseDataScience,
    imageClassName: "absolute h-[178.17%] left-[-40.88%] max-w-none top-[-39.08%] w-[148.82%]",
  },
  {
    src: imgCourseCpp,
    imageClassName: "absolute h-[169.72%] left-[-31.18%] max-w-none top-[-39.2%] w-[141.76%]",
  },
  {
    src: imgCourseMobile,
    imageClassName: "",
    direct: true,
  },
  {
    src: imgCourseUnreal,
    imageClassName: "absolute h-[186.62%] left-[-41.59%] max-w-none top-[-43.31%] w-[155.88%]",
  },
  {
    src: imgCourseJava,
    imageClassName: "mix-blend-lighten",
    direct: true,
  },
  {
    src: imgCourseMl,
    imageClassName: "absolute h-[196.66%] left-[-47.33%] max-w-none top-[-48.17%] w-[164.27%]",
  },
];

function CourseCardImage({ index }: { index: number }) {
  const visual = COURSE_CARD_VISUALS[index];

  if (!visual) {
    return null;
  }

  return (
    <div aria-hidden="true" className="absolute h-[284px] left-0 origin-top-left pointer-events-none rounded-tl-[40px] top-0 scale-[0.74] w-[340px]">
      {visual.direct ? (
        <img alt="" decoding="async" loading="lazy" className={`absolute inset-0 max-w-none object-bottom pointer-events-none rounded-tl-[40px] size-full ${visual.imageClassName}`} src={visual.src} />
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[40px]">
          <img alt="" decoding="async" loading="lazy" className={visual.imageClassName} src={visual.src} />
        </div>
      )}
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 h-[32.011px] ml-[93.2px] mt-0 relative row-1 w-[76.802px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76.802 32.0109">
        <g id="Group">
          <path d={svgPaths.p39be0c00} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p2bfc1ff0} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p1c4d1070} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
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
          <path d={svgPaths.p380e3480} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p3615c580} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p240de3c0} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
          <path d={svgPaths.p1ccccd00} fill="var(--fill-0, #9C78FF)" id="Vector_4" />
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

function Frame5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <div className="absolute inset-[-6.25%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 17">
          <g id="Frame 64">
            <line id="Line 18" stroke="var(--stroke-0, white)" strokeLinecap="round" x1="0.5" x2="15.5" y1="0.5" y2="0.5" />
            <line id="Line 19" stroke="var(--stroke-0, white)" strokeLinecap="round" x1="0.5" x2="15.5" y1="8.5" y2="8.5" />
            <line id="Line 20" stroke="var(--stroke-0, white)" strokeLinecap="round" x1="0.5" x2="15.5" y1="16.5" y2="16.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col font-['Raleway:Bold',sans-serif] font-bold gap-[8px] items-center leading-[43px] relative shrink-0 uppercase w-full">
      <p className="relative shrink-0 text-[56px] text-center whitespace-nowrap w-full">обучаем</p>
      <p className="relative shrink-0 text-[26px] text-center w-full">программированию</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-center relative shrink-0 text-[#464a6a] text-center w-full">
      <Frame55 />
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] w-[345px]">
        <p className="mb-0">с упором на практику</p>
        <p>и персональное обучение</p>
      </div>
    </div>
  );
}

function Frame101() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame56 />
    </div>
  );
}

function Frame194() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-[126px] w-[350px]">
      <Frame101 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="font-['Manrope:Regular',sans-serif] font-normal h-[130px] leading-[20px] relative shrink-0 site-mobile-readable-copy text-[16px] text-white tracking-[0.48px] w-[351px]">
      <p className="relative shrink-0 w-full">
        <span className="font-['Manrope:Bold',sans-serif] font-bold text-[20px]">ИННОПРОГ</span>
        <span>{` — это онлайн`}</span>
      </p>
      <p className="relative shrink-0 w-full">образовательная платформа для изучения</p>
      <p className="relative shrink-0 w-full">ИТ-профессий.</p>
      <p className="relative shrink-0 w-full">Пошаговое обучение, индивидуальные</p>
      <p className="relative shrink-0 w-full">занятия с преподавателями</p>
      <p className="relative shrink-0 w-full">и круглосуточная поддержка в чате</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0 w-[167px]">
      <div className="font-['Raleway:Bold',sans-serif] font-bold min-w-full relative shrink-0 uppercase w-[min-content]">
        <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] mb-0 text-[36px]">450+</p>
        <p className="font-['Manrope:Bold',sans-serif] leading-[20px] text-[20px]">{`студентов `}</p>
      </div>
      <div className="font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] tracking-[0.48px] w-[168px]">
        <p className="leading-[18px] mb-0">ежегодно достигают своих целей</p>
        <p className="leading-[18px]">и становятся специалистами</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[167px]">
      <div className="font-['Manrope:ExtraBold',sans-serif] font-extrabold relative shrink-0 w-full">
        <p className="leading-[38px] mb-0 text-[36px]">{`18000+`}</p>
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[20px] text-[20px]">занятий</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">преподаватели нашей школы проводят ежегодно со студентами</p>
    </div>
  );
}

function Frame143() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] relative shrink-0 text-[36px] w-full whitespace-pre-wrap">
        <span>{`72% `}</span>
        <span className="font-['Manrope:Bold',sans-serif] font-bold text-[20px]">выпускников</span>
      </p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        после обучения успешно начинают
        <br aria-hidden="true" />
        карьеру в IT
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 text-white w-full">
      <Frame143 />
      <Frame2 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[28px] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[#9c78ff] text-[20px] w-full">Индивидуальные занятия</p>
        <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full whitespace-pre-wrap">
          <p className="leading-[20px] mb-0">{`Еженедельные персональные занятия с наставниками `}</p>
          <p className="leading-[20px]">для быстрого роста и получения только актуальных навыков</p>
        </div>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[28px] shadow-[6px_9px_18.5px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[#9c78ff] text-[20px] w-full">Два диплома</p>
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">
          Диплом о профпереподготовке
          <br aria-hidden="true" />
          и диплом ИННОПРОГ. Сведения
          <br aria-hidden="true" />
          вносятся в государственный реестр
        </p>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[28px] shadow-[6px_9px_18.5px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start leading-[20px] p-[24px] relative size-full">
        <p className="font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[#9c78ff] text-[20px] w-full">Стажировка</p>
        <p className="font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">По окончании обучения лучших учеников мы рекомендуем нашим партнёрам для прохождения стажировки в ИТ-компаниях</p>
      </div>
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[350px]">
      <div className="absolute flex h-[971.778px] items-center justify-center left-[-208px] top-[-602px] w-[875.083px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
        <div className="flex-none rotate-[157.91deg]">
          <div className="h-[796.709px] relative w-[621.1px]" data-name="Gain">
            <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none mix-blend-color-burn object-cover opacity-70 pointer-events-none size-full" src={imgGain} style={{ filter: "hue-rotate(250deg) saturate(1.15)" }} />
          </div>
        </div>
      </div>
      <Frame74 />
      <Frame76 />
      <Frame78 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[40px] shadow-[6px_9px_18.5px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[#9c78ff] text-[20px] w-full">Преподаватели-практики</p>
        <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">
          <p className="leading-[20px] mb-0">Занимайтесь, общайтесь</p>
          <p className="leading-[20px] mb-0">и практикуйтесь с реальными разработчиками. Получайте опыт</p>
          <p className="leading-[20px]">от профессионалов</p>
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[28px] shadow-[6px_9px_18.5px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[#9c78ff] text-[20px] w-full">Обучающая платформа</p>
        <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">
          <p className="leading-[20px] mb-0">Закрепляйте полученные навыки</p>
          <p className="leading-[20px]">на нашей платформе, решая реальные практические задачи</p>
        </div>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[28px] shadow-[6px_9px_18.5px_0px_rgba(0,0,0,0.25)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start leading-[20px] p-[24px] relative size-full">
        <p className="font-['Manrope:Bold',sans-serif] font-bold relative shrink-0 text-[#9c78ff] text-[20px] w-full">Налоговый вычет</p>
        <p className="font-['Manrope:Regular',sans-serif] font-normal relative shrink-0 text-[16px] text-black tracking-[0.48px] w-full">По окончании обучения вы сможете оформить налоговый вычет и вернуть 13% от стоимости обучения</p>
      </div>
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[12px] relative shrink-0 w-full site-mobile-readable-copy">
      <Frame90 />
      <Frame75 />
      <Frame77 />
      <Frame79 />
    </div>
  );
}

function Frame144() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <div className="relative z-10 w-full">
        <Frame4 />
      </div>
      <div className="relative z-10 w-full">
        <Frame3 />
      </div>
      <Frame91 />
    </div>
  );
}

function Frame145() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[20px] top-[735px] w-[350px]">
      <Frame144 />
    </div>
  );
}

function Frame141() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px] text-black text-center uppercase w-full whitespace-pre-wrap">
        <span className="leading-[43px] text-[40px] text-[rgba(255,255,255,0.4)]">{`у нас `}</span>
        <span className="leading-[43px] text-[40px]">{` `}</span>
        <span className="leading-[43px] text-[40px] text-white">собственная платформа</span>
      </p>
    </div>
  );
}

function Group8() {
  return (
    <div className="h-[217px] leading-[0] relative shrink-0 translate-x-[18px] w-[350px]">
      <div className="absolute h-[148.743px] left-[49px] top-[68px] w-[274px]" data-name="70211-apple-mockup-pro-drive-air-laptops-disc 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" decoding="async" fetchPriority="high" loading="eager" className="absolute h-[155.61%] left-[-9.24%] max-w-none top-[-27.19%] w-[118.48%]" src={img70211AppleMockupProDriveAirLaptopsDisc1} />
        </div>
      </div>
      <div className="absolute h-[122.126px] left-[83px] top-[77px] w-[205.891px]" data-name="image 118">
        <img alt="" decoding="async" fetchPriority="high" loading="eager" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage118} />
      </div>
      <div className="absolute h-[193.242px] left-[-3.14px] rounded-[8px] top-[4.14px] w-[89.157px]" data-name="image 120">
        <img alt="" decoding="async" fetchPriority="high" loading="eager" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgImage120} />
      </div>
      <div className="absolute h-[197.383px] left-[-7px] top-0 w-[98px]" data-name="айфон">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" decoding="async" fetchPriority="high" loading="eager" className="absolute h-[106.63%] left-[-111.41%] max-w-none top-[-4.2%] w-[322.52%]" src={imgPhoneFrame} />
        </div>
      </div>
    </div>
  );
}

function Frame146() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame141 />
      <Group8 />
    </div>
  );
}

function Frame147() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[20px] w-[350px]" style={{ top: MOBILE_PLATFORM_CONTENT_TOP }}>
      <div aria-hidden="true" className="-translate-x-1/2 absolute h-[360px] left-1/2 pointer-events-none rounded-full site-platform-glow top-[32px] w-[430px]" />
      <Frame146 />
      <MobilePlatformStartButton />
    </div>
  );
}

function MobilePlatformStartButton() {
  return (
    <button className="bg-transparent border-[3px] border-solid border-white content-stretch cursor-pointer flex items-center justify-center p-[16px] relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд" type="button">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">начать бесплатно</p>
    </button>
  );
}

function Frame7() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame7 />
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame185() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame104 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Python разработчик</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Освойте Python с нуля, научитесь писать программы, создавать сайты, ботов</p>
        <p className="leading-[18px] mb-0">и автоматизировать рабочие задачи</p>
        <p className="leading-[18px]">в проектах</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame10 />
      <Frame14 />
    </div>
  );
}

function Frame186() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame105 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Data Science</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Научитесь работать с данными, Python, статистикой и моделями ИИ, чтобы находить закономерности и решать бизнес-задачи</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame106() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame16 />
      <Frame19 />
    </div>
  );
}

function Frame187() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame106 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Фронтенд разработчик</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Освойте современную фронтенд-разработку, React, TypeScript и работу</p>
        <p className="leading-[18px] mb-0">с API, чтобы создавать полноценные</p>
        <p className="leading-[18px]">веб-приложения</p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame22 />
      <Frame23 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame21 />
      <Frame24 />
    </div>
  );
}

function Frame188() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame107 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Data-аналитик</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Научитесь работать с данными, Python, статистикой и моделями ИИ,</p>
        <p className="leading-[18px] mb-0">чтобы находить закономерности</p>
        <p className="leading-[18px]">и решать бизнес-задачи</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame27 />
      <Frame28 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame26 />
      <Frame29 />
    </div>
  );
}

function Frame189() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame108 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Разработчик С++</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Освойте C++, алгоритмы, структуры данных и принципы разработки быстрых программ, игр и технически сложных решений на практике</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame32 />
      <Frame33 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame31 />
      <Frame34 />
    </div>
  );
}

function Frame190() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame109 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Мобильный разработчик</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Научитесь создавать мобильные приложения, проектировать экраны</p>
        <p className="leading-[18px]">и запускать удобные цифровые продукты для пользователей</p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame36 />
      <Frame39 />
    </div>
  );
}

function Frame191() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame110 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Unreal Engine</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Освойте разработку игр и 3D-миров</p>
        <p className="leading-[18px]">на Unreal Engine, работая с визуальной логикой, объектами и игровыми механиками</p>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame42 />
      <Frame43 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame41 />
      <Frame44 />
    </div>
  );
}

function Frame192() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame111 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">Java разработчик</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full whitespace-pre-wrap">
        <p className="leading-[18px] mb-0">{`Изучите Java, ООП и backend-разработку, чтобы создавать приложения, сервисы `}</p>
        <p className="leading-[18px]">и надежную логику проектов на сервере</p>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">≈10 месяцев</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">Стажировка</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame47 />
      <Frame48 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[8px] relative rounded-[32px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] whitespace-nowrap">С наставником</p>
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame46 />
      <Frame49 />
    </div>
  );
}

function Frame193() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[350px]">
      <Frame112 />
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[32px] shrink-0 size-[39px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.8)] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="absolute inset-[-1.58%_-3.17%_-1.58%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7295 23.7282">
              <path d={svgPaths.p2f851400} id="Vector 119" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[350px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">ML-инженер</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] tracking-[0.48px] w-full">
        <p className="leading-[18px] mb-0">Разберитесь в машинном обучении</p>
        <p className="leading-[18px] mb-0">и нейросетях, научитесь обучать модели</p>
        <p className="leading-[18px]">и применять их для прогнозирования</p>
      </div>
    </div>
  );
}

function Frame184() {
  return (
    <div className="content-stretch flex h-[301px] items-center relative shrink-0 w-full site-carousel site-mobile-directions-carousel" data-carousel="mobile-directions" data-carousel-sync>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#9c78ff] h-full overflow-clip relative rounded-[40px] shrink-0 w-[390px]">
          <CourseCardImage index={0} />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-between px-[20px] py-[24px] relative size-full">
              <Frame185 />
              <Frame11 />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#9c78ff] h-full overflow-clip relative rounded-[40px] shrink-0 w-[390px]">
          <CourseCardImage index={1} />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-between px-[20px] py-[24px] relative size-full">
              <Frame186 />
              <Frame15 />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#9c78ff] h-full overflow-clip relative rounded-[40px] shrink-0 w-[390px]">
          <CourseCardImage index={2} />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-between px-[20px] py-[24px] relative size-full">
              <Frame187 />
              <Frame20 />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#9c78ff] h-full overflow-clip relative rounded-[40px] shrink-0 w-[390px]">
          <CourseCardImage index={3} />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-between px-[20px] py-[24px] relative size-full">
              <Frame188 />
              <Frame25 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#9c78ff] content-stretch flex flex-col h-[301px] items-start justify-between overflow-clip px-[20px] py-[24px] relative rounded-[40px] shrink-0 w-[390px]">
        <CourseCardImage index={4} />
        <Frame189 />
        <Frame30 />
      </div>
      <div className="bg-[#9c78ff] content-stretch flex flex-col h-[301px] items-start justify-between overflow-clip px-[20px] py-[24px] relative rounded-[40px] shrink-0 w-[390px]">
        <CourseCardImage index={5} />
        <Frame190 />
        <Frame35 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#9c78ff] h-full overflow-clip relative rounded-[40px] shrink-0 w-[390px]">
          <CourseCardImage index={6} />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-between px-[20px] py-[24px] relative size-full">
              <Frame191 />
              <Frame40 />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#9c78ff] h-full overflow-clip relative rounded-[40px] shrink-0 w-[390px]">
          <CourseCardImage index={7} />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-between px-[20px] py-[24px] relative size-full">
              <Frame192 />
              <Frame45 />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#9c78ff] h-full overflow-clip relative rounded-[40px] shrink-0 w-[390px]">
          <CourseCardImage index={8} />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-between px-[20px] py-[24px] relative size-full">
              <Frame193 />
              <Frame50 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionDot({ index }: { index: number }) {
  return (
    <button
      aria-current={index === 0 ? "true" : "false"}
      aria-label={`Показать курс ${index + 1}`}
      className={`${index === 8 ? "" : "mr-[-1px]"} content-stretch flex items-center p-[4px] relative shrink-0 site-mobile-direction-dot`}
      data-active={index === 0 ? "true" : "false"}
      data-carousel-dot
      data-carousel-index={index}
      data-carousel-target="mobile-directions"
      type="button"
    >
      <span aria-hidden="true" className="relative shrink-0 size-[32px]" />
    </button>
  );
}

function Frame183() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex items-end justify-center px-[20px] relative size-full">
          {Array.from({ length: 9 }, (_, index) => (
            <DirectionDot key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Frame171() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start justify-center relative shrink-0 w-full">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[43px] min-w-full relative shrink-0 text-[40px] text-black text-center uppercase w-[min-content]">курсы</p>
      <Frame184 />
      <Frame183 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="bg-[#464a6a] content-stretch flex items-center justify-center p-[12px] relative rounded-[40px] shrink-0">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">Во всех тарифах</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 text-black text-center w-[355px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[32px] relative shrink-0 text-[32px] uppercase w-full">{`Личный наставник `}</p>
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[20px] w-full">на всём пути обучения</p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <Frame52 />
      <Frame53 />
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black text-center tracking-[0.48px] w-[349px]">
        <p className="leading-[18px] mb-0">На протяжении всего обучения</p>
        <p className="leading-[18px] mb-0">вас будет сопровождать эксперт</p>
        <p className="leading-[18px]">из индустрии, который помог многим начинающим специалистам</p>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[139px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Сильное резюме</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame57 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[202px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Индивидуальный маршрут</p>
    </div>
  );
}

function Frame150() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame54 />
      <Frame58 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[218px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black text-center tracking-[0.42px] whitespace-nowrap">Уверенный выход на работу</p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[123px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Разбор кейсов</p>
    </div>
  );
}

function Frame149() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame59 />
      <Frame60 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[112px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black tracking-[0.42px] whitespace-nowrap">Поддержка</p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame62 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="bg-[rgba(156,120,255,0.6)] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[32px] shrink-0 w-[229px] site-mobile-mentor-tag">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[14px] text-black text-center tracking-[0.42px] whitespace-nowrap">Подготовка к собеседованию</p>
    </div>
  );
}

function Frame148() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame61 />
      <Frame63 />
    </div>
  );
}

function Frame151() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[349px] site-mobile-mentor-tags">
      <Frame150 />
      <Frame149 />
      <Frame148 />
    </div>
  );
}

function Frame152() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame151 />
      <div className="h-[201px] relative shrink-0 w-[349px]" data-name="image 119">
        <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage119} />
      </div>
    </div>
  );
}

function Frame197() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0">
      <Frame51 />
      <Frame152 />
    </div>
  );
}

function Frame196() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Frame197 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="преподаватели">
      <div className="font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px] text-white uppercase w-[349px] site-mobile-teachers-title">
        <p className="leading-[43px] mb-0 text-[40px] text-[rgba(255,255,255,0.4)]">наши</p>
        <p className="leading-[43px] text-[39px]">преподаватели</p>
      </div>
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Сергей</p>
        <p className="leading-[18px]">Попкович</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Григорий</p>
        <p className="leading-[18px]">Чепель</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Павел</p>
        <p className="leading-[18px]">Мягчилов</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-full">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Джамбулат</p>
        <p className="leading-[18px]">Таджидинов</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Unreal Engine разработчик</p>
    </div>
  );
}

function Frame153() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[112.27%] left-[-26.49%] max-w-none top-[-12.31%] w-[160.6%]" src={imgRectangle40082} />
            </div>
          </div>
        </div>
        <Frame93 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-full left-[-3.59%] max-w-none top-[2.23%] w-[107.19%]" src={imgRectangle40083} />
            </div>
          </div>
        </div>
        <Frame94 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[134.96%] left-0 max-w-none top-[-13.66%] w-full" src={imgRectangle40084} />
            </div>
          </div>
        </div>
        <Frame95 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[121.53%] left-[2.4%] max-w-none top-[-18.12%] w-[97.68%]" src={imgRectangle40085} />
            </div>
          </div>
        </div>
        <Frame96 />
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Данила</p>
        <p className="leading-[18px]">Дробышев</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">С++ разработчик</p>
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Алан</p>
        <p className="leading-[18px]">Агузаров</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Data Scientist</p>
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-full">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">Полина</p>
        <p className="leading-[18px]">Караева</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Python-разработчик</p>
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 text-center text-white w-[120px]">
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full whitespace-pre-wrap">
        <p className="leading-[18px] mb-0">{`Лев `}</p>
        <p className="leading-[18px]">Быков</p>
      </div>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[16px] tracking-[0.48px] w-full">Java-разработчик</p>
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <img alt="" decoding="async" loading="lazy" className="absolute max-w-none object-bottom rounded-[32px] size-full" src={imgRectangle40086} />
          </div>
        </div>
        <Frame97 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <img alt="" decoding="async" loading="lazy" className="absolute max-w-none object-bottom rounded-[32px] size-full" src={imgRectangle40087} />
          </div>
        </div>
        <Frame98 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[123.09%] left-[5.67%] max-w-none top-[-7.86%] w-[87.96%]" src={imgRectangle40088} />
            </div>
          </div>
        </div>
        <Frame100 />
      </div>
      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
        <div className="h-[179px] relative rounded-[32px] shrink-0 w-[167px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
            <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 167 179\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.1129e-16 8.95 -8.35 5.4803e-16 83.5 89.5)\\'><stop stop-color=\\'rgba(151,71,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(151,71,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[139.81%] left-[-0.08%] max-w-none top-[-12.58%] w-full" src={imgRectangle40089} />
            </div>
          </div>
        </div>
        <Frame102 />
      </div>
    </div>
  );
}

function Frame154() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[350px] site-carousel site-mobile-teachers-carousel" data-carousel="mobile-teachers">
      <Frame153 />
      <Frame99 />
    </div>
  );
}

function Frame155() {
  return (
    <div className="bg-[#464a6a] content-stretch flex flex-col gap-[40px] h-[780px] items-center mt-[12px] py-[40px] relative rounded-[40px] shrink-0 w-[390px]">
      <Component1 />
      <Frame154 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[24px] w-full">Платформа</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[16px] text-black w-full">Выполняйте домашние задания и закрепляйте навыки на платформе. Материал и задания построены так, чтобы сложные темы становились понятными и применимыми на практике</p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[166px]">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[24px] w-full">Куратор</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[16px] text-black w-full">Куратор поможет найти удобное решение и скорректировать темп обучения под ваш график, если возникают сложности с расписанием занятий</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[167px]">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[24px] w-full">Преподаватель</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[16px] text-black w-full">Если возникнут сложности с домашними заданиями или с практикой, преподаватель поможет разобраться и подскажет решение</p>
    </div>
  );
}

function ProblemSupportImage() {
  return (
    <div className="h-[292px] relative shrink-0 w-[350px]">
      <div className="absolute flex h-[130px] items-center justify-center left-[31px] top-[13px] w-[106px]">
        <div className="-scale-y-100 flex-none rotate-90">
          <div className="h-[106px] relative w-[130px]" data-name="image 107">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[164.77%] left-[-18.84%] max-w-none top-[-33.39%] w-[126.55%]" src={imgProblemArrow} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[156.799px] items-center justify-center left-[165px] top-0 w-[165.583px]">
        <div className="-rotate-150 -scale-y-100 flex-none">
          <div className="h-[106px] relative w-[130px]" data-name="image 106">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[156.04%] left-[-19.05%] max-w-none top-[-30.25%] w-[126.65%]" src={imgProblemArrow} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[141px] left-[60px] top-[35px] w-[212px]" data-name="e6c1b488-1338-4d0e-af55-9017eea41f83 1">
        <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProblemStudent} />
      </div>
      <div className="absolute flex h-[156.799px] items-center justify-center left-[83px] top-[135px] w-[165.583px]">
        <div className="-rotate-30 -scale-y-100 flex-none">
          <div className="h-[106px] relative w-[130px]" data-name="image 105">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" decoding="async" loading="lazy" className="absolute h-[164.77%] left-[-18.84%] max-w-none top-[-33.39%] w-[126.55%]" src={imgProblemArrow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex items-start justify-between mt-[-34px] relative shrink-0 w-full">
      <Frame66 />
      <Frame67 />
    </div>
  );
}

function ProblemSupportCta() {
  return (
    <div className="bg-[#464a6a] h-[68px] relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative size-full">
          <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">подобрать направление</p>
        </div>
      </div>
    </div>
  );
}

function Frame157() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[34px] relative shrink-0 text-[36px] w-full">
        <span className="text-black">Наши ученики </span>
        <span className="text-[#9c78ff]">никогда не остаются 1 на 1 с проблемой</span>
      </p>
      <Frame65 />
      <ProblemSupportImage />
      <Frame64 />
      <ProblemSupportCta />
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
            <linearGradient id="mentor-briefcase-body" x1="20" x2="78" y1="10" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D9CDFE" />
              <stop offset="0.55" stopColor="#9B73FF" />
              <stop offset="1" stopColor="#7D4CFF" />
            </linearGradient>
            <linearGradient id="mentor-briefcase-flap" x1="22" x2="81" y1="6" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BEA7FF" />
              <stop offset="1" stopColor="#6E35F8" />
            </linearGradient>
            <filter id="mentor-briefcase-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="68" width="90" x="6" y="8">
              <feDropShadow dx="0" dy="8" floodColor="#6D35FF" floodOpacity="0.32" stdDeviation="8" />
            </filter>
          </defs>
          <g filter="url(#mentor-briefcase-shadow)" opacity="0.9">
            <path d="M36 19.5C36 12.6 41.6 7 48.5 7H56C62.9 7 68.5 12.6 68.5 19.5V23H59.8V19.5C59.8 17.4 58.1 15.7 56 15.7H48.5C46.4 15.7 44.7 17.4 44.7 19.5V23H36V19.5Z" fill="#7E46FF" />
            <rect fill="url(#mentor-briefcase-body)" height="44" rx="12" width="76" x="13" y="23" />
            <path d="M13 34.5C13 28.1 18.1 23 24.5 23H77.5C83.9 23 89 28.1 89 34.5V39.8L51 53L13 39.8V34.5Z" fill="url(#mentor-briefcase-flap)" />
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
            <linearGradient id="mentor-support-front" x1="20" x2="79" y1="12" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2D7FF" />
              <stop offset="0.58" stopColor="#AE8FFF" />
              <stop offset="1" stopColor="#8352FF" />
            </linearGradient>
            <linearGradient id="mentor-support-back" x1="61" x2="108" y1="11" y2="76" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B08DFF" />
              <stop offset="1" stopColor="#6F32F3" />
            </linearGradient>
            <filter id="mentor-support-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="88" width="112" x="2" y="0">
              <feDropShadow dx="0" dy="8" floodColor="#6D35FF" floodOpacity="0.24" stdDeviation="8" />
            </filter>
          </defs>
          <g filter="url(#mentor-support-shadow)" opacity="0.88">
            <circle cx="72" cy="30" fill="url(#mentor-support-back)" r="24" />
            <path d="M47 82C47 65.4 60.4 52 77 52H80C96.6 52 110 65.4 110 82V84H47V82Z" fill="url(#mentor-support-back)" />
            <circle cx="36" cy="33" fill="url(#mentor-support-front)" r="26" />
            <path d="M8 86C8 67.8 22.8 53 41 53H45C63.2 53 78 67.8 78 86V88H8V86Z" fill="url(#mentor-support-front)" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "interview") {
    return <MentorBenefitDocumentIcon className="absolute left-[8px] pointer-events-none size-[102px] top-[-8px]" />;
  }

  return (
    <div className="absolute h-[122px] left-0 origin-top-left pointer-events-none rounded-[40px] top-0 scale-[0.68] w-[163px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[40px]">
        <img alt="" decoding="async" loading="lazy" className="absolute h-[392.05%] left-[-263.81%] max-w-none top-[-139.73%] w-[391.24%]" src={imgBenefitIconsChat} />
      </div>
    </div>
  );
}

function MentorBenefitDocumentIcon({ className = "absolute left-[214px] pointer-events-none size-[82px] top-[347px]" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg className="block size-full" fill="none" viewBox="0 0 82 82">
        <defs>
          <linearGradient id="mentor-document-body" x1="20" x2="64" y1="8" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CAB9FF" />
            <stop offset="0.6" stopColor="#966EFF" />
            <stop offset="1" stopColor="#7844F5" />
          </linearGradient>
          <linearGradient id="mentor-document-fold" x1="52" x2="74" y1="7" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BDA3FF" />
            <stop offset="1" stopColor="#6B35F0" />
          </linearGradient>
          <filter id="mentor-document-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" width="82" x="0" y="0">
            <feDropShadow dx="0" dy="8" floodColor="#6932F2" floodOpacity="0.18" stdDeviation="7" />
          </filter>
        </defs>
        <g filter="url(#mentor-document-shadow)" opacity="0.62">
          <path d="M19 12C19 8.7 21.7 6 25 6H50L67 23V69C67 72.3 64.3 75 61 75H25C21.7 75 19 72.3 19 69V12Z" fill="url(#mentor-document-body)" />
          <path d="M50 6V20C50 22.2 51.8 24 54 24H67L50 6Z" fill="url(#mentor-document-fold)" />
          <rect fill="#6535E6" fillOpacity="0.52" height="5" rx="2.5" width="31" x="28" y="39" />
          <rect fill="#6535E6" fillOpacity="0.52" height="5" rx="2.5" width="24" x="28" y="53" />
        </g>
      </svg>
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">онлайн занятия</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[16px] mb-0">онлайн занятия</p>
        <p className="leading-[16px]">каждую неделю</p>
      </div>
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">стажировка</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full">
        <p className="leading-[16px] mb-0">в реальных проектах</p>
        <p className="leading-[16px]">после обучения</p>
      </div>
    </div>
  );
}

function Frame158() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-[#9c78ff] flex-[1_0_0] min-w-px overflow-hidden relative rounded-[32px] self-stretch">
        <MentorBenefitIcon variant="online" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[24px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(1)</p>
            <Frame126 />
          </div>
        </div>
      </div>
      <div className="bg-[#9c78ff] flex-[1_0_0] h-[175px] min-w-px overflow-hidden relative rounded-[32px]">
        <MentorBenefitIcon variant="internship" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[34px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(2)</p>
            <Frame127 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">поддержка и помощь</p>
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] tracking-[0.36px] w-full site-mobile-mentor-support-copy">вам не нужно переживать о том что где и когда</p>
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase w-full">личный чат</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full site-mobile-mentor-chat-copy">
        <p className="leading-[16px] mb-0">с наставником для</p>
        <p className="leading-[16px]">вопросов вне уроков</p>
      </div>
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] uppercase whitespace-nowrap w-full">Мок-интервью</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] tracking-[0.36px] w-full site-mobile-mentor-interview-copy">
        <p className="leading-[16px] mb-0">в формате реального</p>
        <p className="leading-[16px]">собеседования</p>
      </div>
    </div>
  );
}

function Frame159() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-[#9c78ff] flex-[1_0_0] min-w-px overflow-hidden relative rounded-[32px] self-stretch">
        <MentorBenefitIcon variant="chat" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[24px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(4)</p>
            <Frame129 />
          </div>
        </div>
      </div>
      <div className="bg-[#9c78ff] flex-[1_0_0] min-w-px overflow-hidden relative rounded-[32px]">
        <MentorBenefitIcon variant="interview" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[36px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(5)</p>
            <Frame130 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame160() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full site-mobile-mentor-cards">
      <Frame158 />
      <div className="bg-[#9c78ff] h-[163px] overflow-hidden relative rounded-[32px] shrink-0 w-full">
        <MentorBenefitIcon variant="support" />
        <div className="flex flex-col items-end size-full">
          <div className="content-stretch flex flex-col gap-[42px] items-end p-[16px] relative size-full text-right text-white">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[35px] relative shrink-0 text-[20px] w-full">(3)</p>
            <Frame128 />
          </div>
        </div>
      </div>
      <Frame159 />
    </div>
  );
}

function Frame177() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <div className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[32px] text-black uppercase w-[351px] site-mobile-mentor-heading">
        <p className="mb-0">
          <span className="leading-[32px] text-[#9c78ff]">Вас ждет более 40+ </span>
          <span className="leading-[32px]">персональных онлайн встреч</span>
        </p>
        <p className="leading-[32px]">с наставником:</p>
      </div>
      <Frame160 />
    </div>
  );
}

function Frame172() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-[350px]">
      <Frame157 />
      <Frame177 />
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:ExtraBold',sans-serif] font-extrabold gap-[8px] items-end justify-center leading-[28px] relative shrink-0 text-[32px] text-white uppercase whitespace-nowrap">
      <p className="relative shrink-0">Что вы получите</p>
      <p className="relative shrink-0 text-right">после обучения</p>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[345px]">
      <div className="h-[110px] relative shrink-0 w-[165px]" data-name="Group 682 1">
        <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGroup6821} />
      </div>
      <div className="h-[110px] relative shrink-0 w-[164px]" data-name="diplom_prof 1">
        <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDiplomProf1} />
      </div>
    </div>
  );
}

function Frame86() {
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

function Frame87() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame68 />
      <Frame86 />
    </div>
  );
}

function Frame161() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Frame85 />
      <Frame87 />
    </div>
  );
}

function Component2() {
  return (
    <div className="bg-gradient-to-b from-[rgba(156,120,255,0.8)] min-h-[373px] relative rounded-tl-[40px] rounded-tr-[40px] shrink-0 to-[rgba(112,60,255,0.8)] w-full" data-name="документы">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[20px] py-[40px] relative size-full">
          <Frame161 />
        </div>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[32px] w-full">91%</p>
      <div className="font-['Manrope:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] w-full">
        <p className="leading-[18px] mb-0">студентов довольны</p>
        <p className="leading-[18px]">своими результатами</p>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[43px] relative shrink-0 text-[40px] uppercase w-full">Отзывы:</p>
      <Frame70 />
    </div>
  );
}

const MOBILE_REVIEWS = [
  {
    avatar: imgReviewKirillHero,
    avatarClassName: "site-review-avatar-img--kirill",
    name: "Кирилл",
    course: ["Python-", "разработчик"],
    transition: "Из HR → в ИТ",
    quote: "Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование...",
  },
  {
    avatar: imgReviewAnastasia,
    avatarClassName: "site-review-avatar-img--anastasia",
    name: "Анастасия",
    course: ["Data Science"],
    transition: "Из 1С → в Product",
    quote: "Больше всего мне запомнилось, что обучение было сбалансированным. Почти каждую тему мы старались привязать к реальным задачам, по типу как анализировать данные, как искать зависимости, как оценивать результат, как не тупо построить модель, а понять, зачем она нужна и какую пользу может дать продукту.",
  },
  {
    avatar: imgReviewMikhail,
    avatarClassName: "site-review-avatar-img--mikhail",
    name: "Михаил",
    course: ["Python-", "разработчик"],
    transition: "Веб-приложение для сервиса",
    quote: "Очень помогали разборы с наставником. Когда код ломался, мы вместе находили причину ошибки и разбирали, как её избежать в следующий раз. Постепенно я начал меньше паниковать при ошибках и адекватно искать решение.",
  },
] as const;

function MobileReviewCard({ review }: { review: (typeof MOBILE_REVIEWS)[number] }) {
  return (
    <div className="bg-white relative rounded-[40px] shrink-0 w-full" data-name="отзыв">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[16px] py-[24px] relative size-full">
          <div className="content-stretch flex gap-[32px] items-end relative shrink-0">
            <div className="bg-[#e9e1ff] overflow-hidden relative rounded-full shrink-0 size-[89px]">
              <img alt="" decoding="async" loading="lazy" className={`absolute inset-0 max-w-none object-cover size-full ${review.avatarClassName}`} src={review.avatar} />
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-start justify-end relative shrink-0">
              <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[35px] relative shrink-0 text-[19px] text-black text-center whitespace-nowrap">{review.name}</p>
              <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0">
                <p className="leading-[16px] relative shrink-0 text-[17px] text-black tracking-[0.51px] whitespace-nowrap">{`Выпускник курса: `}</p>
                <div className="leading-[0] min-w-full relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px] w-[min-content]">
                  {review.course.map((line) => (
                    <p className="leading-[18px] mb-0" key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
            <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[0.6px] w-full whitespace-nowrap">{review.transition}</p>
            <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full">
              <p className="relative shrink-0 site-mobile-review-quote text-black text-center w-full">{review.quote}</p>
              <div className="content-stretch cursor-pointer flex items-center relative shrink-0" data-review-story={review.name.toLowerCase()} role="button" tabIndex={0}>
                <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#9c78ff] text-[20px] text-center tracking-[0.6px] whitespace-nowrap">ЧИТАТЬ ПОЛНОСТЬЮ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="bg-[#e9e1ff] overflow-hidden relative rounded-full shrink-0 size-[89px]">
      <img alt="" decoding="async" loading="lazy" className="absolute inset-0 max-w-none object-cover size-full" src={imgReviewKirill} />
    </div>
  );
}

function Frame165() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0">
      <p className="leading-[16px] relative shrink-0 text-[17px] text-black tracking-[0.51px] whitespace-nowrap">{`Выпускник курса: `}</p>
      <p className="leading-[18px] min-w-full relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px] w-[min-content]">Python-разработчик</p>
    </div>
  );
}

function Frame162() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-end relative shrink-0">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[35px] relative shrink-0 text-[19px] text-black text-center whitespace-nowrap">Кирилл</p>
      <Frame165 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[32px] items-end relative shrink-0">
      <Frame72 />
      <Frame162 />
    </div>
  );
}

function Frame163() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full">
      <p className="relative shrink-0 site-mobile-review-quote text-black text-center w-full">Обучение проходило постепенно, от базовых тем к более сложным задачам. Больше всего мне запомнились именно сложные задания, потому что через них лучше всего начинаешь понимать программирование...</p>
      <div className="content-stretch flex items-center relative shrink-0">
        <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#9c78ff] text-[20px] text-center tracking-[0.6px] whitespace-nowrap">ЧИТАТЬ ПОЛНОСТЬЮ</p>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[0.6px] w-full whitespace-nowrap">Из HR → в ИТ</p>
      <Frame163 />
    </div>
  );
}

function Frame81() {
  return (
    <div className="relative shrink-0 size-[89px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 89">
        <g id="Frame 118">
          <circle cx="44.5" cy="44.5" fill="var(--fill-0, #BFBFBF)" id="Ellipse 2" r="44.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame169() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0">
      <p className="leading-[16px] relative shrink-0 text-[17px] text-black tracking-[0.51px] whitespace-nowrap">{`Выпускник курса: `}</p>
      <p className="leading-[18px] min-w-full relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px] w-[min-content]">Бухгалтер</p>
    </div>
  );
}

function Frame164() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-end relative shrink-0">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[35px] relative shrink-0 text-[19px] text-black text-center whitespace-nowrap">Сергей</p>
      <Frame169 />
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex gap-[32px] items-end relative shrink-0">
      <Frame81 />
      <Frame164 />
    </div>
  );
}

function Frame170() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['Segoe_UI:Light_Italic',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[16px] text-black text-center w-[min-content]">“ Если встретить правильного преподавателя и пройти по протоптанной дорожке — и работа найдётся, и с отчётами всё сложится”.</p>
      <div className="content-stretch flex items-center relative shrink-0">
        <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#9c78ff] text-[14px] text-center tracking-[0.42px] whitespace-nowrap">читать полностью</p>
      </div>
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[14px] text-black text-center tracking-[0.42px] w-full">Из маркетплейсов → в бухгалтерию</p>
      <Frame170 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="relative shrink-0 size-[89px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 89">
        <g id="Frame 118">
          <circle cx="44.5" cy="44.5" fill="var(--fill-0, #BFBFBF)" id="Ellipse 2" r="44.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame178() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0">
      <p className="leading-[16px] relative shrink-0 text-[17px] text-black tracking-[0.51px] whitespace-nowrap">{`Выпускник курса: `}</p>
      <p className="leading-[18px] min-w-full relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] tracking-[0.48px] w-[min-content]">Бухгалтер</p>
    </div>
  );
}

function Frame174() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-end relative shrink-0">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[35px] relative shrink-0 text-[19px] text-black text-center whitespace-nowrap">Сергей</p>
      <Frame178 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex gap-[32px] items-end relative shrink-0">
      <Frame84 />
      <Frame174 />
    </div>
  );
}

function Frame179() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['Segoe_UI:Light_Italic',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[16px] text-black text-center w-[min-content]">“ Если встретить правильного преподавателя и пройти по протоптанной дорожке — и работа найдётся, и с отчётами всё сложится”.</p>
      <div className="content-stretch flex items-center relative shrink-0">
        <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#9c78ff] text-[14px] text-center tracking-[0.42px] whitespace-nowrap">читать полностью</p>
      </div>
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[14px] text-black text-center tracking-[0.42px] w-full">Из маркетплейсов → в бухгалтерию</p>
      <Frame179 />
    </div>
  );
}

function Frame166() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      {MOBILE_REVIEWS.map((review) => (
        <MobileReviewCard key={review.name} review={review} />
      ))}
    </div>
  );
}

function Frame167() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame166 />
      <div className="h-[46px] relative rounded-[40px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-3 border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-white whitespace-nowrap">больше отзывов</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame168() {
  return (
    <div className="bg-[#464a6a] relative rounded-bl-[40px] rounded-br-[40px] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[40px] items-start px-[20px] py-[40px] relative size-full">
        <Frame69 />
        <Frame167 />
      </div>
    </div>
  );
}

function Frame175() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Component2 />
      <Frame168 />
    </div>
  );
}

function Frame195() {
  return (
    <div className="content-stretch flex font-['Manrope:Bold',sans-serif] font-bold items-start justify-between leading-[20px] relative shrink-0 text-[#464a6a] text-[20px] text-center uppercase w-[262px] whitespace-nowrap site-mobile-comparison-title">
      <p className="relative shrink-0">{`без нас `}</p>
      <p className="relative shrink-0">{`с нами `}</p>
    </div>
  );
}

function Frame89() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex h-[38.999px] items-center justify-center p-[8px] relative rounded-[32px] w-[105.336px]">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[13px] relative shrink-0 text-[11px] text-center text-white uppercase whitespace-pre">{`Теория\nбез практики`}</p>
    </div>
  );
}

function Frame131() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex h-[39.024px] items-center justify-center p-[8px] relative rounded-[32px] w-[111.463px]">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[13px] relative shrink-0 text-[11px] text-center text-white uppercase whitespace-pre">{`Нет видимого\nпрогресса`}</p>
    </div>
  );
}

function Frame124() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex h-[39.049px] items-center justify-center p-[8px] relative rounded-[32px] w-[111.396px]">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[13px] relative shrink-0 text-[11px] text-center text-white uppercase whitespace-pre">{`Не знает\nс чего начать`}</p>
    </div>
  );
}

function Frame125() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex h-[25.102px] items-center justify-center p-[8px] relative rounded-[32px] w-[155.334px]">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">{` Бросает на полпути`}</p>
    </div>
  );
}

function Frame132() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex h-[25.025px] items-center justify-center p-[8px] relative rounded-[32px] w-[104.2px]">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">Нет системы</p>
    </div>
  );
}

function Frame133() {
  return (
    <div className="bg-[rgba(156,120,255,0.4)] content-stretch flex h-[38.951px] items-center justify-center p-[8px] relative rounded-[32px] w-[113.737px]">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[13px] relative shrink-0 text-[11px] text-center text-white uppercase whitespace-pre">{`Ошибки никто\nне объясняет`}</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-17.5px] place-items-start relative shrink-0">
      <div className="col-1 flex h-[41.501px] items-center justify-center ml-[49.75px] mt-0 relative row-1 w-[106.457px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "36" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.37deg] skew-x-[-0.32deg]">
          <Frame89 />
        </div>
      </div>
      <div className="col-1 flex h-[53.313px] items-center justify-center ml-0 mt-[138px] relative row-1 w-[115.973px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "36" } as React.CSSProperties}>
        <div className="flex-none rotate-[-7.57deg] skew-x-[0.51deg]">
          <Frame131 />
        </div>
      </div>
      <div className="col-1 flex h-[59.254px] items-center justify-center ml-[49.75px] mt-[53px] relative row-1 w-[117.247px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "36" } as React.CSSProperties}>
        <div className="flex-none rotate-[-10.87deg] skew-x-[0.73deg]">
          <Frame124 />
        </div>
      </div>
      <div className="col-1 flex h-[76.338px] items-center justify-center ml-[0.02px] mt-[86px] relative row-1 w-[155.099px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
        <div className="flex-none rotate-[19.92deg] skew-x-[-1.24deg]">
          <Frame125 />
        </div>
      </div>
      <div className="col-1 flex h-[42.179px] items-center justify-center ml-[3.17px] mt-[30px] relative row-1 w-[107.193px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
        <div className="flex-none rotate-[9.7deg] skew-x-[-0.62deg]">
          <Frame132 />
        </div>
      </div>
      <div className="col-1 flex h-[46.089px] items-center justify-center ml-[19.05px] mt-[180.7px] relative row-1 w-[115.794px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "36" } as React.CSSProperties}>
        <div className="flex-none rotate-[3.63deg] skew-x-[0.27deg]">
          <Frame133 />
        </div>
      </div>
    </div>
  );
}

function Frame121() {
  return <div className="h-[28px] mr-[-17.5px] relative shrink-0 w-[51px]" />;
}

function Frame134() {
  return (
    <div className="bg-[rgba(156,120,255,0.8)] h-[25px] relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[5.5px] relative size-full">
          <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">Системное обучение</p>
        </div>
      </div>
    </div>
  );
}

function Frame135() {
  return (
    <div className="bg-[rgba(156,120,255,0.8)] h-[25px] relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[5.5px] relative size-full">
          <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">Регулярные занятия</p>
        </div>
      </div>
    </div>
  );
}

function Frame136() {
  return (
    <div className="bg-[rgba(156,120,255,0.8)] h-[25px] relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[5.5px] relative size-full">
          <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">Постоянная практика</p>
        </div>
      </div>
    </div>
  );
}

function Frame137() {
  return (
    <div className="bg-[rgba(156,120,255,0.8)] h-[39px] relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[5.5px] relative size-full">
          <div className="font-['Manrope:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">
            <p className="leading-[14px] mb-0">{` Поддержка`}</p>
            <p className="leading-[14px]">наставника</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame138() {
  return (
    <div className="bg-[rgba(156,120,255,0.8)] h-[25px] relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[5.5px] relative size-full">
          <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">{` Разбор ошибок`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame139() {
  return (
    <div className="bg-[rgba(156,120,255,0.8)] h-[39px] relative rounded-[32px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[5.5px] relative size-full">
          <div className="font-['Manrope:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] text-white uppercase whitespace-nowrap">
            <p className="leading-[14px] mb-0">Видимый прогресс</p>
            <p className="leading-[14px]">каждый месяц</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame140() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] h-[258px] items-start ml-0 mt-0 relative row-1 w-[167px]">
      <Frame134 />
      <Frame135 />
      <Frame136 />
      <Frame137 />
      <Frame138 />
      <Frame139 />
    </div>
  );
}

function WithUsArrow({ top }: { top: number }) {
  return (
    <div className="absolute flex h-[28px] items-center justify-center left-[75.5px] pointer-events-none w-[15.5px]" style={{ top }}>
      <div className="flex-none rotate-90">
        <div className="h-[15.5px] relative w-[28px]" data-name="image 112">
          <img alt="" decoding="async" loading="eager" className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full" src={imgWithUsArrow} />
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame140 />
      <WithUsArrow top={19} />
      <WithUsArrow top={60} />
      <WithUsArrow top={101} />
      <WithUsArrow top={156} />
      <WithUsArrow top={197} />
    </div>
  );
}

function Frame181() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Group7 />
      <Frame121 />
      <Group6 />
      <p className="-translate-x-1/2 absolute font-['Raleway:Bold',sans-serif] font-bold leading-[43px] left-[171.5px] text-[40px] text-black text-center top-[115px] uppercase whitespace-nowrap">VS</p>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="выбор за вами">
      <p className="font-['Raleway:Bold',sans-serif] font-bold leading-[43px] relative shrink-0 text-[#9c78ff] text-[40px] text-center uppercase whitespace-nowrap">Выбор за вами</p>
    </div>
  );
}

function Frame180() {
  return (
    <div className="content-stretch flex flex-col gap-[26px] items-center mt-[12px] relative shrink-0 w-[350px]">
      <Frame195 />
      <Frame181 />
      <Component3 />
    </div>
  );
}

function Frame142() {
  return (
    <div className="content-stretch flex flex-col font-['Raleway:Bold',sans-serif] font-bold gap-0 items-center leading-[39px] relative shrink-0 text-[40px] uppercase">
      <p className="relative shrink-0">{`заявка `}</p>
      <p className="relative shrink-0">на обучение</p>
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white whitespace-nowrap">
      <Frame142 />
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[20px]">
        <p className="leading-[22px] mb-0">Оставьте заявку, и мы свяжемся</p>
        <p className="leading-[22px]">с Вами в ближайшее время</p>
      </div>
    </div>
  );
}

function Frame198() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <input aria-label="Ваше имя" autoComplete="name" className="site-lead-input site-lead-input--mobile" name="name" placeholder="Ваше имя" type="text" />
      <input aria-label="Номер телефона" autoComplete="tel" className="site-lead-input site-lead-input--mobile" inputMode="tel" name="phone" placeholder="+7(000)-000-00-00" type="tel" />
    </div>
  );
}

function Frame114() {
  return (
    <div aria-checked="false" className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full site-consent" data-consent-toggle role="checkbox" tabIndex={0}>
      <div className="relative rounded-[2px] shrink-0 size-[39px] site-consent__box" data-name="чекбокс">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[2px] site-consent__border" />
        <svg aria-hidden="true" className="site-consent__check" fill="none" viewBox="0 0 24 24">
          <path d="M5 12.5 10 17l9-10" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[0px] text-white">
        <span className="leading-[15px] text-[12px]">Нажимая на кнопку, вы даете </span>
        <a className="cursor-pointer font-['Manrope:Bold',sans-serif] font-bold leading-[15px] site-consent__link text-[12px]" href="https://api.innoprog.ru/files/documents/consent_to_personal_data_processing.pdf" rel="noopener noreferrer" target="_blank">
          согласие на обработку персональных данных
        </a>
        <span className="leading-[15px] text-[12px]">{` и соглашаетесь с `}</span>
        <a className="cursor-pointer font-['Manrope:Bold',sans-serif] font-bold leading-[15px] site-consent__link text-[12px]" href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">
          политикой конфиденциальности
        </a>
      </p>
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame114 />
      <div className="bg-[rgba(255,255,255,0.8)] relative rounded-[40px] shrink-0 w-full" data-name="кнопки пд">
        <div aria-hidden="true" className="absolute border-3 border-[rgba(0,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[40px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
            <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.4)] whitespace-nowrap">отправить заявку</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-[350px]">
      <Frame198 />
      <Frame115 />
    </div>
  );
}

function Component4() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ae90ff] gap-[40px] h-[515px] items-center justify-center pb-[56px] pt-[64px] relative rounded-tl-[40px] rounded-tr-[40px] shrink-0 to-[#8559ff] w-full" data-name="заявка">
      <Frame113 />
      <Frame116 />
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[16px] items-start leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] w-full">
      <a className="no-underline relative shrink-0 w-full" href="tel:+79586067980">Тел: +7 (958) 606-79-80</a>
      <a className="no-underline relative shrink-0 w-full" href="mailto:educatio@innoprog.ru">Email: educatio@innoprog.ru</a>
      <a className="no-underline relative shrink-0 w-full" href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank">Telegram: @innoprog_admin</a>
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[302px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[#9c78ff] text-[32px] w-full">Контакты</p>
      <Frame117 />
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:Regular',sans-serif] font-normal gap-[16px] items-start leading-[18px] relative shrink-0 text-[16px] text-white tracking-[0.48px] w-full">
      <p className="relative shrink-0 w-full">г. Иннополис, ул. Университетская, д.5, пом.115, м.15/2</p>
      <p className="relative shrink-0 w-full">420500 Республика Татарстан, Верхнеуслонский р-он,</p>
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[302px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[#9c78ff] text-[32px] w-full">Адреса</p>
      <Frame119 />
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold gap-[24px] items-start relative shrink-0 text-[16px] text-white tracking-[0.48px] uppercase w-full">
      <a className="leading-[20px] relative shrink-0 w-full" href="https://api.innoprog.ru/files/documents/privacy_policy.pdf" rel="noopener noreferrer" target="_blank">Политика конфиденциальности</a>
      <a className="leading-[20px] relative shrink-0 w-full" href="https://api.innoprog.ru/files/documents/contract_offer.pdf" rel="noopener noreferrer" target="_blank">Публичная оферта</a>
      <a className="leading-[22px] relative shrink-0 w-full" href="https://api.innoprog.ru/files/documents/license.pdf" rel="noopener noreferrer" target="_blank">
        Выписка из реестра лицензий
        <br aria-hidden="true" />
        на образовательную деятельность
      </a>
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[302px]">
      <p className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] relative shrink-0 text-[#9c78ff] text-[32px] w-full">Правовая информация</p>
      <Frame122 />
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <Frame103 />
      <Frame118 />
      <Frame120 />
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

function Frame123() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <a aria-label="Написать на почту" className="block" href="mailto:educatio@innoprog.ru">
        <MaterialSymbolsMailOutline />
      </a>
      <a aria-label="Позвонить" className="block" href="tel:+79586067980">
        <TablerPhoneCall />
      </a>
      <a aria-label="Написать в WhatsApp" className="block" href="https://wa.me/79934099057?text=Добрый%20день%21%20Хочу%20приобрести%20обучение%20по%20профессии%20Python-разработчик" rel="noopener noreferrer" target="_blank">
        <IcBaselineWhatsapp />
      </a>
      <a aria-label="Написать в Telegram" className="block" href="https://t.me/innoprog_admin" rel="noopener noreferrer" target="_blank">
        <MynauiTelegram />
      </a>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[87.27%_5.13%_3.92%_54.33%] opacity-30" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158.124 76.8275">
        <g id="Group">
          <path d={svgPaths.p395a3880} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p349883f0} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p35dfae00} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[87.84%_5.13%_1.72%_5.13%] opacity-30" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350.001 91.0073">
        <g id="Group">
          <path d={svgPaths.p1ffff600} fill="var(--fill-0, #9C78FF)" id="Vector" />
          <path d={svgPaths.p31dd82f2} fill="var(--fill-0, #9C78FF)" id="Vector_2" />
          <path d={svgPaths.p4f93a00} fill="var(--fill-0, #9C78FF)" id="Vector_3" />
          <path d={svgPaths.p21b68f80} fill="var(--fill-0, #9C78FF)" id="Vector_4" />
          <path d={svgPaths.p28fa8d00} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p22adff80} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.pb57f200} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p1ca71300} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p6d17800} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.pfe08ab0} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p3353cd00} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.pf31280} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p2cd73e00} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p280d3e80} fill="var(--fill-0, white)" id="Vector_14" />
          <path d={svgPaths.p27609700} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p21fdd800} fill="var(--fill-0, white)" id="Vector_16" />
          <path d={svgPaths.ped7cc80} fill="var(--fill-0, white)" id="Vector_17" />
          <path d={svgPaths.pbb0ce00} fill="var(--fill-0, white)" id="Vector_18" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[87.27%_5.13%_1.72%_5.13%]" data-name="Group">
      <Group4 />
      <Group5 />
    </div>
  );
}

function Frame182() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[390px]">
      <Component4 />
      <div className="bg-[#464a6a] h-[912px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pb-[20px] pt-[40px] px-[20px] relative size-full">
          <Frame92 />
          <Frame123 />
          <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[12px] text-center text-white tracking-[0.36px] w-[min-content]">
            {`Общество с ограниченной ответственностью "ИННОПРОГ"`}
            <br aria-hidden="true" />
            ИНН 1683011286 ОГРН 1221600105440
          </p>
          <Group3 />
        </div>
      </div>
    </div>
  );
}

function Frame176() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center relative shrink-0 w-[390px]">
      <Frame172 />
      <Frame175 />
      <Frame180 />
      <Frame182 />
    </div>
  );
}

function Frame173() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[80px] items-center left-0 w-[390px]" style={{ top: MOBILE_NEXT_SECTIONS_TOP }}>
      <Frame171 />
      <Frame196 />
      <Frame155 />
      <Frame176 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="гланый экран М">
      <div className="absolute bg-[#464a6a] left-0 rounded-bl-[40px] rounded-br-[40px] w-[390px]" style={{ height: MOBILE_PLATFORM_HEIGHT, top: MOBILE_PLATFORM_TOP }} />
      <div className="absolute content-stretch flex items-start justify-between left-[23px] site-main-header site-main-header--mobile top-[40px] w-[350px]" data-name="хедер М">
        <Group />
        <button aria-label="Открыть меню" className="bg-[#9c78ff] content-stretch cursor-pointer flex flex-col items-center justify-center p-[12px] relative rounded-[32px] shrink-0 size-[40px]" data-mobile-menu-toggle type="button">
          <Frame5 />
        </button>
      </div>
      <Frame194 />
      <div className="absolute bg-[#9c78ff] left-0 w-[390px]" style={{ height: MOBILE_FEATURES_BG_HEIGHT, top: MOBILE_FEATURES_BG_TOP }} />
      <Frame145 />
      <Frame147 />
      <Frame173 />
      <div className="absolute h-[410px] left-[-57px] top-[330px] w-[490px]" data-name="IMG_2949 1">
        <img alt="" decoding="async" loading="eager" className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full" src={imgImg29491} />
      </div>
      <div className="-translate-x-1/2 absolute left-1/2 site-mobile-hero-start-button top-[607px]" data-name="кнопки пд">
        <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[24px] text-white whitespace-nowrap">начать обучение</p>
        <div className="bg-white content-stretch flex items-center justify-center p-[12px] relative rounded-[40px] shrink-0 size-[36px]" data-name="Frame 40/Frame 707">
          <div className="relative shrink-0 size-[16px]">
            <div className="absolute inset-[-1.98%_-4.04%_-1.98%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6457 16.6327">
                <path d={svgPaths.p2b850d80} id="Vector 121" stroke="var(--stroke-0, #9C78FF)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
