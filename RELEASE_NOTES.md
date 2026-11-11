# Release Notes: FRAME Portfolio v1.0.0 Commercial Release

**Release Version:** 1.0.0  
**Release Date:** 2026-11-08  
**Framework Version:** Next.js `15.5.29`  
**License:** Commercial Single-End-Product License

---

## What's New in v1.0.0

### 1. Framework & Core Upgrades
- **Upgraded to Next.js 15.5.29:** Migrated to the modern, secure stable release of Next.js 15 App Router, resolving upstream security advisories present in Next 14.
- **Async Route Parameters:** Updated dynamic page routes (`/work/[slug]` and `/blog/[slug]`) and metadata generators to use Next 15 `Promise<Params>` syntax with `await params`.
- **Zero TypeScript Errors:** Verified under TypeScript 5.5 in strict mode with zero type errors.
- **Zero ESLint Warnings:** Clean linting pass under Next.js rules.

### 2. Commercial Legal Licensing
- **Commercial Single-End-Product License (`LICENSE.md`):** Replaced placeholder text with a comprehensive legal agreement covering customer rights, single-deployment rules, private Git repository terms, resale restrictions, IP ownership, and third-party open-source attribution.
- **License Decision Guide (`LICENSE_REVIEW.md`):** Created seller guide outlining marketplace alignment options for Gumroad, ThemeForest, and Lemon Squeezy.

### 3. High-Resolution Social Preview Assets
- **1200×630 Raster Open Graph Image (`public/og-default.png`):** Generated a crisp, high-resolution dark aesthetic social card for Twitter/X and LinkedIn previews, overcoming SVG limitations on third-party social networks.
- **Preserved Vector Assets:** Maintained original SVG graphic (`og-default.svg`) in `public/images/`.
- **Automated Generation Script:** Added `scripts/generate-og-image.js` to enable automated regeneration or brand adaptation.

### 4. Commercial Product Presentation Package
- **Product Presentation Directory (`product-assets/`):** Captured 10 high-resolution browser screenshots directly from the running project across desktop, tablet, and mobile viewport widths.
- **Marketplace Listing Copy (`PRODUCT_DESCRIPTION.md`):** Prepared complete store description with feature bullet points, technical specifications, and buyer expectations.

### 5. Verified Clean Installation & Customization
- **Clean Environment Test:** Verified isolated extraction and installation in an independent directory, confirming zero local machine dependency.
- **Reactive Customization:** Validated that changing `src/config/site.ts` immediately updates all pages, metadata titles, sitemap entries, and JSON-LD schema without breaking layout or components.
- **Contact Form Validation:** Re-verified client and server Zod validation, honeypot bot defense, IP sliding-window rate limiting, and graceful mailto fallback.

### 6. Documentation Suite
- Added `START-HERE.md` onboarding guide for quick buyer setup.
- Updated `README.md`, `DEPLOYMENT.md`, `CHANGELOG.md`, and `CONTACT-SETUP.md`.
