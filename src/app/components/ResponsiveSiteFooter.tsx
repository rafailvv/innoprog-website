import { SiteFooterContent } from "./SiteFooterContent";

export function ResponsiveSiteFooter({ applicationHref }: { applicationHref?: string } = {}) {
  return (
    <footer className="site-main-footer-surface">
      <SiteFooterContent applicationHref={applicationHref} />
    </footer>
  );
}
