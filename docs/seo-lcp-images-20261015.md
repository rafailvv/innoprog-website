# LCP images review — 15 October 2026

## Confirmed observations

The previous release Lighthouse reports under `workspace/reports/20261015-seo-growth/lighthouse-after-*.json` show the first-screen images already discoverable in server HTML, eagerly loaded and marked `fetchpriority=high`. In those simulated mobile results, element render delay contributes 75–88% of LCP; further image compression alone cannot resolve that delay. The child Python LCP is a text paragraph, not its artwork.

Data Science already provides an 840 px lossless candidate and a 1680 px original. Re-encoding with Pillow method=6 did not reduce the 840 px image and reproduced the existing 1680 px file size. No lossy conversion or smaller high-DPR replacement was introduced.

## Changes

- Home mobile first-screen image receives a responsive 650w candidate plus the unchanged 1300w original. Its CSS canvas is 390 px and artwork width 490 px, so `sizes=125.65vw` matches the existing geometry. Browser selection retains the original for higher DPR / larger displayed widths. The new candidate is resized from the exact existing decoded RGBA image with Lanczos and saved losslessly; it adds no lossy codec stage. Candidate: 85,662 bytes; original: 114,432 bytes. This is a request-size opportunity for suitable lower-DPR screens, not a general LCP guarantee.
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
