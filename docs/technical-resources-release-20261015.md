# Technical resource delivery — 15 October 2026

Scope: no visible text, metadata, prices, CSS/layout, course content or form workflow changes.

## Confirmed issues and corrections

- Public children/school images and skill-icons SVGs inherited `Cache-Control: no-store`. These stable, unhashed URLs now allow storage but require revalidation (`public, max-age=0, must-revalidate`). ETag conditional requests return304 with no body. This reduces repeated download payload without retaining stale images across releases; it does not reduce cold-visit bytes. HTML, health/service paths and missing assets retain no-store. Hashed Next assets retain existing immutable delivery.
- All18 adult desktop/mobile AI videos eagerly loaded an approximately6.5MB lower-page MP4. They now use the existing LazyAutoplayVideo observer (1000px margin) and omit src until near viewport. Same class, aspect wrapper, source, mute/loop/inline/autoplay/canplay retry and marker value. Python/DS wrapper effects skip videos without src; existing mentor behavior retained.

## Verification

- Full CI: contracts,331tests across34files, production build, Sveden source/routing and40sitemap SEO routes.
- Focused lazy-video tests cover SSR, nonintersection/intersection, canplay mute/retry and observerless fallback.
- HTTP asset tests cover WebP/JPEG/SVG cache policy, ETag304 and empty conditional body; adult/child HTML no-store and missing asset404.
- Independent SSR parity checks40public baseline pages: visible text, metadata/JSON-LD, tags/classes/inline styles and video geometry/attributes preserved, excluding intentional AI src/preload changes.
- Browser desktop Python and mobile DS: missing AI src before approach; original MP4 loaded with readyState4, paused=false and advancing currentTime near viewport. Five representative adult/child pages at390/1440px have no horizontal overflow or broken completed images.

No new Lighthouse or field Core Web Vitals comparison is claimed for this narrow release. Actual indexing/positions and lead delivery remain account-dependent. Existing noindex application canonical inheritance is left unchanged; no confirmed index leak found.

Deployment uses the pushed SHA and the existing blue-green script. Runtime/public release evidence is stored in workspace/reports/20261016-technical-seo outside this repository.
