import type { ReactElement } from "react";

const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function MobileCourseHero({ children }: { children: ReactElement }) {
  // Desktop clients replace the mobile SSR tree. Skip fetching its hero.
  return (
    <picture className="contents">
      <source media="(min-width: 768px)" srcSet={TRANSPARENT_PIXEL} />
      {children}
    </picture>
  );
}
