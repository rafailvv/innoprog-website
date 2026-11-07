import homeResultsBackground from "./home-results-background.webp";

export function ResultsBackground({ eager = false }: { eager?: boolean }) {
  return (
    <div className="absolute h-[968px] left-[-80px] opacity-70 overflow-clip rounded-[40px] top-[-104px] w-[1440px]" style={{ backgroundImage: "linear-gradient(213.954deg, rgb(66, 190, 248) 10.648%, rgb(255, 255, 255) 8.7589%, rgb(156, 120, 255) 45.956%, rgb(66, 190, 248) 73.988%, rgb(156, 120, 255) 101.48%)" }} data-name="слово дня">
      <img alt="" className="absolute inset-0 size-full pointer-events-none" decoding="async" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "low" : undefined} src={homeResultsBackground} />
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[1022px] w-[1086px]">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1086 1">
            <path d="M0 0.5H1086" stroke="var(--stroke-0, white)" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[normal] left-[943px] text-[#f9f9f9] text-[24px] top-[968px] whitespace-nowrap">{`{//}`}</p>
    </div>
  );
}
