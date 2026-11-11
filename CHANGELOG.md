# Changelog

All notable changes to the **FRAME Portfolio** template are documented here.

## [1.0.0] — 2026-11-08

### Added
- Commercial Single-End-Product License Agreement (`LICENSE.md`) and seller review guide (`LICENSE_REVIEW.md`).
- Onboarding guide for new buyers (`START-HERE.md`).
- Marketplace product copy and specifications (`PRODUCT_DESCRIPTION.md`).
- High-resolution 1200×630 raster social preview (`public/og-default.png` and `public/images/og-default.png`).
- Open Graph generator script (`scripts/generate-og-image.js`).
- Full product presentation suite with 10 high-resolution screenshots in `product-assets/`.
- Automated screenshot generator (`scripts/capture-screenshots.js`).
- Complete verified audit documentation (`RELEASE_AUDIT.md` and `RELEASE_NOTES.md`).

### Upgraded
- Upgraded Next.js to stable secure release `15.5.29`.
- Migrated dynamic route parameters to Next 15 `Promise<Params>` in `/work/[slug]` and `/blog/[slug]`.
- Updated metadata generator to use `og-default.png` for reliable social card previews on Twitter/X and LinkedIn.

### Verified
- Zero TypeScript strict compilation errors (`npm run typecheck`).
- Zero ESLint linting warnings (`npm run lint`).
- Full production build with 22 static pages generated (`npm run build`).
- Clean installation test from scratch in isolated directory.
- Contact form Zod validation, honeypot spam protection, rate limiting, and mailto fallback.
