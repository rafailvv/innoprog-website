import focusArt from "../PythonCourseDesktop/9748a62f98f2fa651b919d513ca6b44cb04d3882.opt.webp";
import balanceArt from "./course-structure-balance.webp";

export function CourseStructureBackdrop() {
  return (
    <div
      className="isolate h-[1333.056px] w-[1527.983px] bg-[#9c78ff] opacity-90 pointer-events-none relative"
      data-name="Balance"
    >
      <img
        alt=""
        className="absolute inset-0 size-full object-cover mix-blend-color-burn"
        decoding="async"
        loading="lazy"
        src={balanceArt}
      />
    </div>
  );
}

export function CourseHeroBackdrop() {
  return (
    <div
      className="isolate h-[2209.064px] w-[2126.168px] bg-[#9c78ff] opacity-90 pointer-events-none relative"
      data-name="Focus"
    >
      <img
        alt=""
        className="absolute inset-0 size-full object-cover mix-blend-color-burn"
        decoding="async"
        fetchPriority="low"
        src={focusArt}
      />
    </div>
  );
}
