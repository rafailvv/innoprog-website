import desktopPaths from "../MainScreenDesktop/svg-j2mtrggl1r";
import mobilePaths from "../MainScreenMobile/svg-paths";

export function DirectionArrow({ mobile = false }: { mobile?: boolean }) {
  return (
    <span aria-hidden="true" className={`bg-white border border-[rgba(0,0,0,0.8)] flex items-center justify-center rounded-[32px] shrink-0 ${mobile ? "size-[39px] p-[8px]" : "size-[44px] p-[12px]"}`}>
      <svg className="block size-full" fill="none" viewBox={mobile ? "0 0 23.7295 23.7282" : "0 0 20.7295 20.7282"}>
        <path d={mobile ? mobilePaths.p2f851400 : desktopPaths.p50fce00} stroke="black" />
      </svg>
    </span>
  );
}
