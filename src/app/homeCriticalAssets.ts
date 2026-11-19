import heroImage from "../imports/MainScreenDesktop/home-hero.webp";
import backgroundImage from "../imports/MainScreenDesktop/home-background.opt.webp";

// Both responsive home surfaces use these exact files. Keep the hero first so
// its existing request priority is preserved before the background preload.
export const HOME_CRITICAL_IMAGE_URLS = [heroImage, backgroundImage] as const;
