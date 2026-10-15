import { MobileTeacherCarousel, type TeacherRole } from "./TeacherCarousels";

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="преподаватели">
      <h2 className="font-['Raleway:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px] text-white uppercase w-[349px] site-mobile-teachers-title">
        <span className="block leading-[43px] text-[40px] text-[rgba(255,255,255,0.4)]">{`наши `}</span>
        <span className="block leading-[40px] text-[36px]">преподаватели</span>
      </h2>
    </div>
  );
}

function Frame155({ preferredRole }: { preferredRole?: TeacherRole }) {
  return (
    <div className="bg-[#464a6a] content-stretch flex flex-col gap-[40px] h-[780px] items-center mt-[12px] py-[40px] relative rounded-[40px] shrink-0 w-[390px]">
      <Component1 />
      <MobileTeacherCarousel preferredRole={preferredRole} />
    </div>
  );
}

export function MainScreenMobileTeachersSection({ preferredRole }: { preferredRole?: TeacherRole } = {}) {
  return <Frame155 preferredRole={preferredRole} />;
}
