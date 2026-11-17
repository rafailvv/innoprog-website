import { useId } from "react";

export function MentorBenefitBriefcaseIcon() {
  const id = useId();
  return (
    <div aria-hidden="true" className="absolute h-[122px] left-[4px] pointer-events-none top-[-6px] w-[160px]">
      <svg className="block size-full" fill="none" viewBox="0 0 102 78">
        <defs>
          <linearGradient id={`${id}-body`} x1="20" x2="78" y1="10" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D9CDFE" />
            <stop offset="0.55" stopColor="#9B73FF" />
            <stop offset="1" stopColor="#7D4CFF" />
          </linearGradient>
          <linearGradient id={`${id}-flap`} x1="22" x2="81" y1="6" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BEA7FF" />
            <stop offset="1" stopColor="#6E35F8" />
          </linearGradient>
        </defs>
        <g opacity="0.9">
          <path d="M36 19.5C36 12.6 41.6 7 48.5 7H56C62.9 7 68.5 12.6 68.5 19.5V23H59.8V19.5C59.8 17.4 58.1 15.7 56 15.7H48.5C46.4 15.7 44.7 17.4 44.7 19.5V23H36V19.5Z" fill="#7E46FF" />
          <rect fill={`url(#${id}-body)`} height="44" rx="12" width="76" x="13" y="23" />
          <path d="M13 34.5C13 28.1 18.1 23 24.5 23H77.5C83.9 23 89 28.1 89 34.5V39.8L51 53L13 39.8V34.5Z" fill={`url(#${id}-flap)`} />
          <circle cx="51" cy="41" fill="#956AFF" r="6.3" stroke="#7742F6" strokeOpacity="0.45" strokeWidth="1.1" />
        </g>
      </svg>
    </div>
  );
}

export function MentorBenefitSupportIcon() {
  const id = useId();
  return (
    <div aria-hidden="true" className="absolute h-[122px] left-[2px] pointer-events-none top-[-3px] w-[160px]">
      <svg className="block size-full" fill="none" viewBox="0 0 116 88">
        <defs>
          <linearGradient id={`${id}-front`} x1="20" x2="79" y1="12" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2D7FF" />
            <stop offset="0.58" stopColor="#AE8FFF" />
            <stop offset="1" stopColor="#8352FF" />
          </linearGradient>
          <linearGradient id={`${id}-back`} x1="61" x2="108" y1="11" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B08DFF" />
            <stop offset="1" stopColor="#6F32F3" />
          </linearGradient>
          <filter id={`${id}-shadow`} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="88" width="112" x="2" y="0">
            <feDropShadow dx="0" dy="8" floodColor="#6D35FF" floodOpacity="0.24" stdDeviation="8" />
          </filter>
        </defs>
        <g filter={`url(#${id}-shadow)`} opacity="0.88">
          <circle cx="72" cy="30" fill={`url(#${id}-back)`} r="24" />
          <path d="M47 82C47 65.4 60.4 52 77 52H80C96.6 52 110 65.4 110 82V84H47V82Z" fill={`url(#${id}-back)`} />
          <circle cx="36" cy="33" fill={`url(#${id}-front)`} r="26" />
          <path d="M8 86C8 67.8 22.8 53 41 53H45C63.2 53 78 67.8 78 86V88H8V86Z" fill={`url(#${id}-front)`} />
        </g>
      </svg>
    </div>
  );
}
