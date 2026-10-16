import type { ReactNode } from "react";
import "../../styles/adult-pages.css";
import { SvedenHeader as SiteNavigation } from "../sveden/SvedenHeader";
import { ResponsiveSiteFooter } from "../components/ResponsiveSiteFooter";
import styles from "./blog.module.css";

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#blog-main">Перейти к содержанию</a>
      <SiteNavigation />
      <main className={styles.main} id="blog-main">{children}</main>
      <ResponsiveSiteFooter />
    </div>
  );
}
