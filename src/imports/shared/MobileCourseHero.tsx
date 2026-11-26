import type { ImgHTMLAttributes, ReactElement } from "react";

const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function MobileCourseHero({
  avifSrcSet,
  children,
}: {
  avifSrcSet?: string;
  children: ReactElement<ImgHTMLAttributes<HTMLImageElement>>;
}) {
  // Desktop clients replace the mobile SSR tree. Skip fetching its hero.
  return (
    <picture className="contents">
      <source media="(min-width: 768px)" srcSet={TRANSPARENT_PIXEL} />
      {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={children.props.sizes} />}
      {children}
    </picture>
  );
}
