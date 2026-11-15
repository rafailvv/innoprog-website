import type { ReactNode } from "react";
import { DirectionArrow } from "./DirectionArrow";
import pythonArtwork from "../MainScreenDesktop/3f6061d637a4cfce23fccae8de31e69e558fd2a8.opt.webp";
import { DirectionHoverOverlay } from "./DirectionHoverOverlay";

export const PYTHON_DIRECTION_TITLE = "Python разработчик";
export const PYTHON_DIRECTION_DESCRIPTION = "Освойте Python с нуля, научитесь писать программы, создавать сайты, ботов и автоматизировать рабочие задачи в проектах";

type CardProps = {
  href: string;
  title: string;
  description: string;
  tagRows: readonly (readonly string[])[];
  action?: string;
  artwork?: string;
};

function PythonArtwork({ layout = "desktop" }: { layout?: "desktop" | "mobile" | "mobile-catalog" }) {
  const mobileStyle = layout === "desktop"
    ? ""
    : `origin-top-left site-smooth-photo site-smooth-photo--top-left-40 ${layout === "mobile-catalog" ? "scale-[0.9]" : "scale-[0.70]"}`;

  return (
    <div aria-hidden="true" className={`absolute h-[284px] left-0 top-0 w-[340px] pointer-events-none ${mobileStyle}`}>
      <div className="absolute inset-0 overflow-hidden">
        <img alt="" decoding="async" loading="lazy" className="absolute h-[223.09%] left-[-52.45%] max-w-none top-[-71.19%] w-[279.52%]" src={pythonArtwork} />
      </div>
    </div>
  );
}

export function PythonDesktopCard({ href, title, description, tagRows, action, artwork, catalog = false }: CardProps & { catalog?: boolean }) {
  const Heading = catalog ? "h2" : "h3";

  return (
    <a
      className={`site-desktop-direction-card bg-[#9c78ff] flex flex-col h-[452px] items-end justify-between overflow-clip p-[24px] relative rounded-[40px] shrink-0 text-white no-underline ${catalog ? "w-full" : "w-[410.667px]"}`}
      data-name="курсы"
      href={href}
    >
      <DirectionArrow />
      <div className="flex flex-col gap-[16px] relative shrink-0 w-full">
        <Heading className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[38px] text-[36px]">{title}</Heading>
        <p className="font-['Manrope:Regular',sans-serif] leading-[22px] text-[20px]">{description}</p>
      </div>
      {artwork ? <img src={artwork} alt="" loading="lazy" decoding="async"
        className="pointer-events-none absolute left-[20px] top-[16px] h-[195px] w-[75%] object-contain object-left" /> : <PythonArtwork />}
      <DirectionHoverOverlay title={title} description={description} tagRows={tagRows} action={action} wrapTags={catalog} showArrow={catalog} />
    </a>
  );
}

export function PythonMobileCard({ href, title, description, tagRows, action, artwork, catalog = false, children }: CardProps & { catalog?: boolean; children?: ReactNode }) {
  const Heading = catalog ? "h2" : "h3";

  return (
    <a
      className={`bg-[#9c78ff] block overflow-clip relative rounded-[40px] shrink-0 text-white no-underline ${catalog ? "min-h-[400px] w-full" : "h-full w-[390px]"}`}
      href={href}
    >
      {artwork ? <img src={artwork} alt="" loading="lazy" decoding="async"
        className="pointer-events-none absolute bottom-[172px] right-[14px] h-[130px] w-[66%] object-contain object-right" />
        : <PythonArtwork layout={catalog ? "mobile-catalog" : "mobile"} />}
      <div className={`flex flex-col items-start justify-between gap-[16px] px-[20px] py-[24px] relative ${catalog ? "min-h-[400px]" : "size-full"}`}>
        <div className={`flex items-start justify-between gap-[8px] w-full ${catalog ? "min-h-[188px]" : ""}`}>
          <div className="flex flex-col items-start gap-[8px]">
            {tagRows.map((row) => (
              <div className="flex flex-wrap items-start gap-[8px]" key={row[0]}>
                {row.map((tag) => (
                  <span className="bg-[#464a6a] rounded-[32px] p-[8px] font-['Manrope:Regular',sans-serif] leading-[18px] text-[16px] tracking-[0.48px]" key={tag}>{tag}</span>
                ))}
              </div>
            ))}
          </div>
          <DirectionArrow mobile />
        </div>
        <div className="flex flex-col gap-[16px] items-start w-full">
          <Heading className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[28px] text-[32px]">{title}</Heading>
          {children ?? <p className="font-['Manrope:Regular',sans-serif] text-[16px] leading-[18px] tracking-[0.48px]">{description}</p>}
          {action && <span className="w-full rounded-[32px] bg-[#464a6a] p-[12px] text-center font-bold">{action}</span>}
        </div>
      </div>
    </a>
  );
}
