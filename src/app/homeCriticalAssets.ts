import heroImage from "../imports/MainScreenDesktop/a9544174871795971e5fb7802195e10ce3fa4432.opt.webp";
import mobileHeroImage from "../imports/MainScreenMobile/hero-person-650.lossless.webp";
import backgroundImage from "../imports/MainScreenDesktop/home-background.opt.webp";

export const HOME_HERO_IMAGE_URL = heroImage;
export const HOME_HERO_IMAGE_SRCSET = `${mobileHeroImage} 650w, ${heroImage} 1300w`;
// The mobile canvas is 390px wide; its fixed hero artwork is 490px wide.
export const HOME_HERO_IMAGE_SIZES = "125.65vw";
export const HOME_BACKGROUND_IMAGE_URL = backgroundImage;

// Retain the existing URL list for consumers that need the original assets.
export const HOME_CRITICAL_IMAGE_URLS = [heroImage, backgroundImage] as const;
