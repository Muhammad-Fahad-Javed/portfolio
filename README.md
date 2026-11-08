# FRAME: Premium Developer Portfolio System

A customizable developer portfolio template built with **Next.js 14 (App Router)**, **TypeScript** and **Tailwind CSS**. One content system, three visual presets, light and dark themes, a blog, project case studies, a command palette and a contact form with an honest fallback.

> All names, projects, articles, testimonials and employers in the demo are **fictional placeholder content**. Replace them with your own before publishing.

## Features

- Routes: `/`, `/about`, `/work`, `/work/[slug]`, `/experience`, `/blog`, `/blog/[slug]`, `/contact`, `/style-guide`, `/customization`, custom 404, `sitemap.xml`, `robots.txt`
- Three presets (**Editorial**, **Minimal**, **Technical**) that change typography, spacing, radius, width and decorative details, not just colour
- Four hero layouts: editorial, centered, split, technical
- Light and dark themes with persistence, system preference and no flash on load
- Command palette (`Ctrl+K` / `⌘K`) searching pages, projects and articles, with a copy-email action
- Project and blog filtering plus search; empty states for no results
- Case-study pages where every section is optional and empty sections are hidden
- Contact form: client and server validation, honeypot, rate limit, success/error/loading states, and a mailto fallback when no email provider is configured
- SEO: per-page metadata, canonical URLs, Open Graph/Twitter, sitemap, robots, JSON-LD (Person, WebSite, Article, BreadcrumbList)
- Accessibility basics: semantic HTML, skip link, focus styles, labelled forms, `aria-current`, dialog behaviour, reduced-motion support
- Self-hosted fonts (no Google Fonts request, works offline)
- Translation-ready foundation (`lang` and `dir` for English, Urdu, Arabic). See "Limitations" in `DOCUMENTATION.md`.

## Tech stack

Next.js 14, React 18, TypeScript (strict), Tailwind CSS 3, `next-themes`, `lucide-react`, `zod`, `clsx`, `tailwind-merge`, `@fontsource-variable/*`. No animation library and no CMS; all motion is CSS.

## Quick start

Requires Node.js 18.18 or newer.

```bash
npm install
cp .env.example .env.local   # optional: the site runs without it
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

## Make it yours (5 minutes)

1. Edit `src/config/site.ts`: name, title, bio, email, social links, availability, preset.
2. Edit the files in `src/content/`: projects, experience, skills, blog posts, testimonials.
3. Replace `public/images/avatar.svg` and the project images.
4. Set `NEXT_PUBLIC_SITE_URL` to your real domain (see `DEPLOYMENT.md`).

Full guides: `CUSTOMIZATION.md`, `DOCUMENTATION.md`, `DEPLOYMENT.md`, `CONTACT-SETUP.md`, `TROUBLESHOOTING.md`.

## License

`LICENSE.md` is a placeholder. Choose and verify a license before distributing.
