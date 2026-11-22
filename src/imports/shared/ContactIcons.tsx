const svgPaths = {
  p12eb5e80: "M0 40C0 17.9086 17.9086 0 40 0H45C67.0914 0 85 17.9086 85 40V45C85 67.0914 67.0914 85 45 85H40C17.9086 85 0 67.0914 0 45V40Z",
  p36270580: "M26.1 59C24.9725 59 24.0076 58.5964 23.2054 57.7893C22.4032 56.9822 22.0014 56.0107 22 54.875V30.125C22 28.9906 22.4018 28.0199 23.2054 27.2127C24.009 26.4056 24.9739 26.0014 26.1 26H58.9C60.0275 26 60.993 26.4042 61.7966 27.2127C62.6002 28.0212 63.0014 28.992 63 30.125V54.875C63 56.0094 62.5989 56.9808 61.7966 57.7893C60.9944 58.5978 60.0289 59.0014 58.9 59H26.1ZM42.5 44.5625L26.1 34.25V54.875H58.9V34.25L42.5 44.5625ZM42.5 40.4375L58.9 30.125H26.1L42.5 40.4375ZM26.1 34.25V30.125V54.875V34.25Z",
  p3f181b00: "M49.3333 31.1111C50.5415 31.1111 51.7003 31.5911 52.5546 32.4454C53.4089 33.2997 53.8889 34.4585 53.8889 35.6667M49.3333 22C52.958 22 56.4341 23.4399 58.9971 26.0029C61.5601 28.5659 63 32.042 63 35.6667M26.5556 24.2778H35.6667L40.2222 35.6667L34.5278 39.0833C36.9672 44.0296 40.9704 48.0328 45.9167 50.4722L49.3333 44.7778L60.7222 49.3333V58.4444C60.7222 59.6527 60.2423 60.8114 59.3879 61.6657C58.5336 62.52 57.3749 63 56.1667 63C47.2817 62.4601 38.9015 58.687 32.6072 52.3928C26.313 46.0985 22.5399 37.7183 22 28.8333C22 27.6251 22.48 26.4664 23.3343 25.6121C24.1886 24.7577 25.3473 24.2778 26.5556 24.2778Z",
  pf565fa0: "M38.6576 47.5L48.2254 53.56L55.7332 58.45C56.2866 58.81 56.5634 58.99 56.8119 58.99C56.9192 58.9907 57.0255 58.9695 57.1239 58.9277C57.2223 58.886 57.3107 58.8246 57.3833 58.7475C57.555 58.575 57.6062 58.2575 57.7087 57.6225L63 25L23.7242 40.9325C22.7121 41.3425 22.2073 41.55 22.0766 41.8175C22.0199 41.9318 21.994 42.0583 22.0012 42.1851C22.0083 42.312 22.0484 42.4349 22.1176 42.5425C22.279 42.7925 22.8043 42.9425 23.86 43.245L38.6576 47.5ZM63 25L38.6576 47.5M38.6576 47.5L39.0573 58.25C39.0573 59.085 39.0573 59.5025 39.2341 59.7125C39.3879 59.8975 39.6185 60.0025 39.8645 60C40.1463 59.9975 40.4794 59.73 41.1457 59.2L48.2254 53.56",
};

export function MaterialSymbolsMailOutline() {
  return (
    <div className="relative shrink-0 size-[85px]" data-name="material-symbols:mail-outline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 85">
        <g>
          <rect fill="var(--fill-0, #D9D9D9)" height="85" rx="40" width="85" />
          <path d={svgPaths.p36270580} fill="var(--fill-0, black)" />
        </g>
      </svg>
    </div>
  );
}

export function TablerPhoneCall() {
  return (
    <div className="relative shrink-0 size-[85px]" data-name="tabler:phone-call">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 85">
        <g>
          <path d={svgPaths.p12eb5e80} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.p3f181b00} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

export function MynauiTelegram() {
  return (
    <div className="relative shrink-0 size-[85px]" data-name="mynaui:telegram">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 85">
        <g>
          <path d={svgPaths.p12eb5e80} fill="var(--fill-0, #D9D9D9)" />
          <path d={svgPaths.pf565fa0} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}
