import mobileHomePaths from "../../../imports/MainScreenMobile/svg-paths";
import school from "../school/school.module.css";
import styles from "./course.module.css";

export default function CourseArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`${school.heroCtaIcon} ${styles.courseArrow} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 16.65 16.64" fill="none">
        <path d={mobileHomePaths.p2b850d80} stroke="currentColor" />
      </svg>
    </span>
  );
}
