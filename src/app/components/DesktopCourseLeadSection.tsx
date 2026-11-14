import type { ReactNode } from "react";
import { CaptchaNotice } from "./CaptchaNotice";
import { InlineLeadForm } from "./InlineLeadForm";
import styles from "./DesktopCourseLeadSection.module.css";

export function DesktopCourseLeadSection({ intro, highlights }: { intro: ReactNode; highlights: ReactNode }) {
  return (
    <div className={`site-course-render-section ${styles.section}`} data-name="заявка">
      <div className={styles.intro}>{intro}</div>
      <div className={styles.highlights}>{highlights}</div>
      <InlineLeadForm course separateCaptchaNotice />
      <CaptchaNotice />
    </div>
  );
}
