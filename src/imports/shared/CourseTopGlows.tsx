import courseLowerGlow from "./course-lower-glow.webp";
import courseUpperGlow from "./course-upper-glow.webp";

export function CourseTopGlows() {
  return (
    <>
      <div className="absolute h-[686px] left-[80px] top-[1710px] w-[1280px]">
        <div className="absolute inset-[-29.15%_-15.63%]">
          <img alt="" className="block size-full" decoding="async" src={courseLowerGlow} />
        </div>
      </div>
      <div className="absolute h-[1007px] left-[94px] top-[186px] w-[1236px]">
        <div className="absolute inset-[-19.86%_-16.18%]">
          <img alt="" className="block size-full" decoding="async" src={courseUpperGlow} />
        </div>
      </div>
    </>
  );
}
