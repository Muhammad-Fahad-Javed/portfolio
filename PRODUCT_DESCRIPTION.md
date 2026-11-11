# FRAME Portfolio — Product Description & Marketplace Copy

## Product Overview
**FRAME** is a premium, performance-engineered developer portfolio website template built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed specifically for software engineers, product designers, and technical consultants, FRAME pairs clean typography and fast page loads with a modular, configuration-driven content system.

No CMS subscriptions, no complex databases, and no heavy animation bloat. Customize your entire identity, case studies, experience timeline, and blog directly from simple, strictly typed TypeScript files.

---

## Key Highlights

- **Next.js 15 App Router & Strict TypeScript:** Built on modern web standards with static pre-rendering (SSG) for instant global edge delivery.
- **Three Distinct Visual Presets:**
  - **Editorial:** Elegant serif typography (Fraunces) with generous spacing and editorial flair.
  - **Minimal:** Clean, balanced sans-serif design (Inter) focused on high-contrast readability.
  - **Technical:** Monospace accents (JetBrains Mono), grid backdrops, and code-oriented badge aesthetics.
- **Light & Dark Themes:** Automatic system preference detection, instant manual toggle, zero flash of unstyled content (FOUC), and persistent theme state.
- **Interactive Command Palette (`Ctrl+K` / `⌘K`):** Spotlight-style quick search across all pages, case studies, and blog articles with direct keyboard shortcuts.
- **Comprehensive Case Study Architecture:** Dedicated project detail pages featuring problem statements, technical architecture breakdowns, results, and technology tags.
- **Technical Blog with Search & Filtering:** Prerendered markdown article reader with category filtering, reading time estimates, share links, and previous/next article traversal.
- **Full-Featured Contact System:** Client and server-side validation with Zod, anti-spam honeypot defense, IP rate limiting, and an automatic `mailto:` fallback when no email provider is configured.
- **Self-Hosted Privacy-Friendly Fonts:** Built-in SIL Open Font License web fonts (Inter, Fraunces, JetBrains Mono) bundled locally — 100% GDPR compliant with zero third-party font tracking calls.
- **SEO & Social Share Ready:** Complete Open Graph metadata, Twitter Cards, dynamic sitemap (`sitemap.xml`), crawler directives (`robots.txt`), and schema.org JSON-LD structured data (Person, WebSite, Article, BreadcrumbList).

---

## Pages & Routes Included

1. **Homepage (`/`):** Hero section (4 selectable layouts: Editorial, Centered, Split, Technical), featured projects grid, technical capabilities, biography preview, experience timeline preview, testimonials, and contact CTA.
2. **About (`/about`):** Detailed background, engineering philosophy, skills matrix, education, and career milestones.
3. **Work & Projects (`/work`):** Complete portfolio gallery with real-time keyword search, category filter pills, and technology tag selectors.
4. **Project Case Studies (`/work/[slug]`):** In-depth technical case studies with image previews, key metrics, architectural challenges, and outcome recaps.
5. **Experience Timeline (`/experience`):** Organized professional history grouped into Work, Education, Certifications, and Achievements.
6. **Blog (`/blog`):** Technical writing archive with search bar, category pills, and featured article highlights.
7. **Blog Article (`/blog/[slug]`):** Clean typography reader with code styling, blockquotes, social sharing buttons, and related article links.
8. **Contact (`/contact`):** Production-ready contact form with validation, status feedback, and direct email copy shortcut.
9. **Customization Playground (`/customization`):** Interactive visual sandbox to test presets, accent colors, fonts, border radii, and container widths with a 1-click code generator.
10. **Style Guide (`/style-guide`):** Complete design system audit page displaying tokens, buttons, inputs, cards, and typography.
11. **Custom 404 (`/_not-found`):** Styled error boundary with 1-click navigation back to home.
12. **Search Engine Feeds (`/sitemap.xml`, `/robots.txt`):** Automatically generated search index files.

---

## Technical Stack

- **Framework:** Next.js 15.5.x (App Router)
- **Library:** React 18.3.x
- **Language:** TypeScript 5.5.x (strict configuration)
- **Styling:** Tailwind CSS 3.4.x with `@tailwindcss/typography` patterns
- **Theme Engine:** `next-themes`
- **Icons:** `lucide-react`
- **Validation:** Zod
- **Typography:** Self-hosted `@fontsource-variable/*` (SIL Open Font License)

---

## What the Buyer Receives

- Full, unminified, clean source code (Next.js App Router project)
- Complete documentation suite:
  - `README.md` (Quick start and overview)
  - `START-HERE.md` (Step-by-step onboarding walkthrough)
  - `CUSTOMIZATION.md` (Comprehensive guide to branding, colors, fonts, and presets)
  - `DOCUMENTATION.md` (Deep dive into project architecture)
  - `DEPLOYMENT.md` (Zero-config deployment guides for Vercel, Netlify, Render, and VPS)
  - `CONTACT-SETUP.md` (Resend email integration guide and rate-limit details)
  - `TROUBLESHOOTING.md` (Frequently asked questions and solutions)
  - `CHANGELOG.md` (Version history)
  - `LICENSE.md` (Commercial single-use license terms)
- Ready-to-use high-resolution social preview image (`og-default.png` 1200×630)
- Complete set of product presentation screenshots (`product-assets/`)

---

## What Is Not Included

- Domain registration or web hosting subscription fees.
- Third-party email API accounts (Resend free tier is recommended and easily configured).
- Custom design or development services beyond the documented codebase.

---

## Installation Requirements

- Node.js 18.18 or newer installed on your machine.
- npm, yarn, or pnpm package manager.
- Any modern web browser.
- Git (recommended for version control).

---

## Support Expectations

- **Included Support:** Bug fixes and verification for issues occurring in the default, unmodified template code as documented.
- **Excluded:** Custom feature development, third-party backend integrations, bespoke redesigns, or general web development tutoring.
