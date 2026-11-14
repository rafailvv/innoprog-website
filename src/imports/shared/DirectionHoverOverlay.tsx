import svgPaths from "../MainScreenDesktop/svg-j2mtrggl1r";

export function DirectionHoverOverlay({
  title,
  description,
  period = "≈10 месяцев",
  showArrow = false,
  tagRows = [[period, "С наставником"], ["Стажировка"]],
  wrapTags = false,
  action = "подробнее",
}: {
  title: string;
  description: string;
  period?: string;
  showArrow?: boolean;
  tagRows?: readonly (readonly string[])[];
  wrapTags?: boolean;
  action?: string;
}) {
  return (
    <div aria-hidden="true" className="site-desktop-direction-hover">
      <div className="site-desktop-direction-hover__top">
        <div className={`site-desktop-direction-hover__tags ${wrapTags ? "site-desktop-direction-hover__tags--compact" : ""}`}>
          {tagRows.map((row) => (
            <div className="site-desktop-direction-hover__tag-row" key={row[0]}>
              {row.map((label) => <span key={label}>{label}</span>)}
            </div>
          ))}
        </div>
        {showArrow ? (
          <div className="site-desktop-direction-hover__arrow">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7295 20.7282">
              <path d={svgPaths.p50fce00} stroke="black" />
            </svg>
          </div>
        ) : null}
      </div>
      <div className="site-desktop-direction-hover__bottom">
        <div className="site-desktop-direction-hover__copy">
          <p className="site-desktop-direction-hover__title">{title}</p>
          <p className="site-desktop-direction-hover__description">{description}</p>
        </div>
        <span className="site-desktop-direction-hover__button">{action}</span>
      </div>
    </div>
  );
}
