# Route-specific CSS delivery, 15 October 2026

## Problem and scope

The root layout imported 176,146 bytes of hand-written global CSS before minification, in addition to Tailwind and theme styles. This included adult course, adult review, about, tariff and standalone application styles on child pages. The delivery change keeps all selectors and declarations; it does not remove CSS using coverage or rewrite components.

- `src/styles/index.css` remains in the root layout: resets, html/body backgrounds, fonts, Tailwind, theme, shared header/footer, 404, shared programme accordion and utility rules.
- `src/styles/adult-pages.css` is imported by `App.tsx`, the common entry point for the home, adult courses, tariffs, about and adult review routes. This also covers transitions handled inside App.
- `src/styles/application.css` is imported by the standalone application route layout.
- Child route CSS modules remain unchanged.

The source partition is conservative: a complete selector list is moved only if every selector starts with an adult-only namespace (`site-course-*` except `site-course-program-*`, `site-python-course-*`, `site-java-hero-*`, `site-tariffs-*`, `site-about-*`, `site-reviews-index-*`, `site-student-review-*`, `site-related-review-*`, `site-lead-modal-*`). Mixed selector lists stay shared. Application selectors are isolated separately. Media/support/container contexts and source order within each stylesheet are retained.

## Dependencies that deliberately remain shared

Child courses reuse `ProgramAccordion` and its global `site-course-program-*` classes, including panel visibility, open states, arrows, tags and topics. Extracting all `site-course-*` styles would break these pages. Both audiences also reuse header/footer components. `site-review-page` primitives remain shared because the root not-found boundary uses them. Attribute-based utility and font rules remain shared.

Moving isolated namespaces after shared CSS can affect cascade order if equal-specificity selectors overlap. The moved scopes are excluded from child components; shared adult-context rules have more specific ancestor selectors. Font attribute utilities were checked against existing generated home, Python, Data Science, reviews, about and tariffs HTML: no overlapping moved `font-family` rule was found before a later shared font utility.

## Source verification

PostCSS AST comparison against commit `0879253` found all 1,219 rules preserved with identical selectors and declaration text, with identical enclosing at-rule contexts and identical relative order within each output group. No declarations, media query thresholds, animations, font imports or URLs were modified. All 219 moved selector anchor classes were also compared with 11 generated child HTML documents: no overlap was found.

Source sizes after partition (not transfer-size claims): shared 82,432 bytes; adult 86,012 bytes; application 7,766 bytes. A production build must establish the actual emitted route CSS; Next.js may consolidate chunks. Visual checks must include initial entry and cross-section navigation, because loaded global CSS may remain cached after navigation.

## Acceptance

Final acceptance is performed on the integrated production build: verify child HTML does not reference the adult/application stylesheet payload, verify adult and application HTML do reference their styles, compare compressed CSS bytes per representative route, and check screenshots/interactive programme accordions/menu/forms at mobile and desktop widths. A smaller source file alone is not evidence of a faster LCP.
