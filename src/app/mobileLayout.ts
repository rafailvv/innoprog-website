export const MOBILE_DESIGN_WIDTH = 390;
export const MOBILE_DESIGN_HEIGHT = 10610;

export const MOBILE_FEATURES_BG_TOP = 701;
export const MOBILE_PLATFORM_TOP = 2216;
// Paint the purple background over the top of the platform without moving its content or bottom edge.
const MOBILE_FEATURES_BG_OVERLAP = 24;
export const MOBILE_FEATURES_BG_HEIGHT = MOBILE_PLATFORM_TOP - MOBILE_FEATURES_BG_TOP + MOBILE_FEATURES_BG_OVERLAP;
export const MOBILE_PLATFORM_HEIGHT = 590;
export const MOBILE_PLATFORM_CONTENT_TOP = MOBILE_PLATFORM_TOP + 74;
export const MOBILE_NEXT_SECTIONS_TOP = MOBILE_PLATFORM_TOP + 638;

export const MOBILE_SCROLL_TARGETS = {
  adults: MOBILE_NEXT_SECTIONS_TOP,
  children: MOBILE_NEXT_SECTIONS_TOP,
  directions: MOBILE_NEXT_SECTIONS_TOP,
  mentor: 3468,
  teachers: 4150,
  support: 4970,
  reviews: 7283,
  about: 8899,
  form: 9392,
};
