# LCP images review — 15 October 2026

## Confirmed observations

The previous release Lighthouse reports under `workspace/reports/20261015-seo-growth/lighthouse-after-*.json` show the first-screen images already discoverable in server HTML, eagerly loaded and marked `fetchpriority=high`. In those simulated mobile results, element render delay contributes 75–88% of LCP; further image compression alone cannot resolve that delay. The child Python LCP is a text paragraph, not its artwork.

Data Science already provides an 840 px lossless candidate and a 1680 px original. Re-encoding with Pillow method=6 did not reduce the 840 px image and reproduced the existing 1680 px file size. No lossy conversion or smaller high-DPR replacement was introduced.

## Changes

- A 650w mobile home candidate was trialled (85662 bytes versus 114432 bytes original) and its single-request responsive preload verified at mobile DPR1/2 and desktop. It is **not retained in the release**: repeated simulated results did not establish an LCP benefit. Home first-screen src and explicit hero-first/background-second preload now match the baseline. The unused newly introduced home candidate is removed; original artwork remains unchanged.
- Seven additional adult mobile courses now provide a 420 px high candidate, alongside each unchanged original. Their `sizes` values follow the actual CSS artwork width divided by the 390 px canvas; they deliberately include parts clipped by the card so the browser does not underestimate the required resolution. Originals remain untouched for DPR2 and desktop.

| Mobile course | Original bytes | Compact bytes | Original / compact width | sizes |
|---|---:|---:|---|---|
| C++ | 323136 | 180064 | 909 / 637 | 153.077vw |
| Java | 196204 | 120140 | 925 / 649 | 155.641vw |
| Data analyst | 306142 | 170878 | 938 / 658 | 157.949vw |
| Mobile developer | 248098 | 143190 | 1280 / 897 | 215.385vw |
| Frontend | 248030 | 146622 | 840 / 589 | 141.282vw |
| Unreal Engine | 334008 | 191332 | 1167 / 818 | 196.410vw |
| ML engineer | 216764 | 123348 | 1025 / 719 | 172.564vw |

- Data Science receives a 480 px wide lossless candidate (132356 bytes) before its existing 840w and 1680w candidates. Higher-density choices remain available. Python artwork is already only 23980 bytes on mobile; it was left unchanged.
- Loader logo has a separate lossless WebP: 8,676 bytes versus PNG 24,287 bytes. Dimensions remain 1255 × 301. Decoded RGBA bytes, including transparent pixels, are identical. The old PNG remains available for older releases/caches. App.tsx references are integrated by the main agent.
- The children school Telegram icon, far below the first screen, is now lazy loaded instead of eagerly competing with initial resources.
- Existing lazy-loaded lower images on the child school and course pages decode asynchronously. First-screen child artwork and its priority remain unchanged.

## SEO review

Adult FAQ already contains programme-specific explanations, comparison paragraphs, links to relevant adult courses and tariff conditions. Child FAQ already contains unique programme answers and links between relevant directions. These source facts are maintained in shared data consumed by visible HTML and JSON-LD. No redundant text, blocks, speculative claims or new URLs were added in this package.

## Verification

- Pillow decoded-RGBA equality: PNG versus loader WebP, exact.
- Pillow decoded-RGBA equality: every deterministic Lanczos resized RGBA candidate versus decoded responsive WebP, exact; no extra lossy encoding stage. Integer rounding preserves the aspect ratio to within one source pixel; fixed container geometry/object-fit are unchanged.
- Existing original images, first-screen eager/high attributes, geometry/classes, alt text, link targets and form logic preserved.
- Integrated production build, first-screen/browser verification and repeated comparable performance runs are performed by the main agent before deployment. Source-byte savings are not presented as measured LCP gains.

## Home responsive trial and narrow fallback

The initial responsive trial required matching media/imageSrcSet preloads to avoid fetching an unused full-size fallback. A shared srcSet/sizes implementation was verified with one actual hero request on mobile DPR1/2 and desktop. Nevertheless, the integrated simulated home median remained approximately 4882 ms LCP versus 4744 ms baseline, and 1505 ms FCP versus 1208 ms baseline. Restoring hero-first order alone did not improve that result. These observations do not prove the responsive image caused the entire difference; bundle/CSS work also changed the page.

Because this home-specific candidate saved only about 28.8 KB and did not demonstrate earlier content, it was narrowly reverted. Page metadata, adult responsive image candidates, child loading changes, shared-component extraction, CSS work and the lossless loader logo are preserved. The updated SSR regression test enforces the original image src without srcset, exact hero-first/background-second preloads and no alternate media/srcset preload. Final integrated home measurements are recorded in the release report; no improvement is claimed solely from the fallback.
