# Documentation

## Project structure

```text
src/
├── app/            Routes (App Router), globals.css, sitemap, robots, API route
├── components/     UI and interactive components
├── config/         site.ts, theme.ts, presets.ts, i18n.ts
├── content/        projects, experience, skills, about, testimonials, blog
├── lib/            seo.ts, utils.ts, markdown.tsx, validation.ts, social.ts
└── types/          Shared TypeScript types
public/
├── images/         Placeholder SVGs (replace them)
└── resume/         Put resume.pdf here
```

## Configuration: `src/config/site.ts`

| Key | Purpose |
| --- | --- |
| `name`, `tagline` | Product/brand name shown in the nav and footer |
| `url` | Resolved automatically (see `DEPLOYMENT.md`) |
| `locale` | `"en"`, `"ur"` or `"ar"` (sets `lang` and `dir`) |
| `person.*` | Name, title, bios, email, location, avatar, `resumeUrl` |
| `social` | Only non-empty entries are shown (GitHub, LinkedIn, X, Instagram, Dribbble, Behance, YouTube, website) |
| `availability.status` | `"available"`, `"open"` or `"unavailable"` |
| `defaults.preset` | `"editorial"`, `"minimal"` or `"technical"` |
| `defaults.heroLayout` | `"editorial"`, `"centered"`, `"split"` or `"technical"` |
| `defaults.theme` | First-visit theme: `"light"`, `"dark"` or `"system"` |
| `navigation` | Header/footer links |
| `sections` | Turn homepage sections on or off |
| `aboutSections` | Turn About-page sections on or off |
| `seo` | Default title, title template, description |

## Content

- **Projects**: `src/content/projects.ts`. Required: `slug`, `title`, `summary`, `category`, `tags`, `cover`, `year`. Everything else is optional; sections without content are not rendered. `featured: true` shows the project on the homepage. Don't invent results: leave `outcomes` out if you have none.
- **Experience**: `src/content/experience.ts`. Entries are grouped automatically into Work, Education, Certifications and Achievements by `type`. Use `end: "Present"` for current roles.
- **Skills and capabilities**: `src/content/skills.ts`.
- **About page text**: `src/content/about.ts`.
- **Testimonials**: `src/content/testimonials.ts`. The demo entries are marked `demo: true`. Replace them with real ones or set `sections.testimonials = false`.
- **Blog**: `src/content/blog.ts`. Add an object to `posts`. `body` supports `##`/`###` headings, paragraphs, `-` and `1.` lists, `**bold**`, `*italic*`, `` `code` ``, `> quotes` and `[links](https://…)`. Links with unsafe schemes (e.g. `javascript:`) are dropped. Reading time is set manually via `readingTimeMinutes`.

After adding a project or article, the new page, sitemap entry, search results and command-palette entry appear automatically.

## Presets

Switch with `defaults.preset`. The value is written to `<html data-preset>` and `src/app/globals.css` applies overrides:

| | Editorial | Minimal | Technical |
| --- | --- | --- | --- |
| Display font | Fraunces (serif) | Inter | JetBrains Mono |
| Radius | sharp | medium | very sharp |
| Content width | wide | narrower | wide |
| Section spacing | airy | tight | medium |
| Details | wide-tracked labels, italic accents | plain sentence-case labels | grid backdrop, `//` label prefix, mono chips |

Presets are chosen at build time. The preset is not user-switchable by visitors.

## Theme tokens

Colours are HSL triplets in `:root` (light) and `.dark` (dark) in `src/app/globals.css`, and are mapped to Tailwind colours in `tailwind.config.ts`. Dark mode is tuned separately (not an inversion). Accent swatches used by the playground live in `src/config/theme.ts`.

## Customization playground (`/customization`)

A live preview of preset, hero layout, accent, display font, radius and content width, with **Reset** and **Copy configuration**. It previews inside a box and produces a snippet telling you which values to paste into `src/config/site.ts` and `src/app/globals.css`. It does **not** modify or export your site. The page is hidden from navigation and from search engines.

## Style guide (`/style-guide`)

Colour tokens, typography, buttons, links, cards, badges, forms, navigation, spacing and radii. Hidden from navigation and search engines.

## Contact form

See `CONTACT-SETUP.md`.

## SEO

- Metadata helper: `buildMetadata()` in `src/lib/seo.ts`
- JSON-LD: Person and WebSite on every page, Article and BreadcrumbList on articles, BreadcrumbList on projects
- `sitemap.xml` and `robots.txt` are generated from your content
- Default Open Graph image is `public/images/og-default.svg`. **Many social networks do not render SVG previews.** Replace it with a 1200×630 PNG or JPG and update the path in `src/lib/seo.ts`.

## Multilingual / RTL: what exists and what doesn't

**Works:** `siteConfig.locale` sets `<html lang>` and `<html dir>` (`rtl` for Urdu and Arabic); UI strings for the skip link and menu are centralized in `src/config/i18n.ts`; much of the layout uses logical properties (`ps-`, `ms-`, `start-`), so it mirrors in RTL.

**Not implemented:** per-language routes (`/ar/...`), translated content files, a language switcher, an Urdu/Arabic font, and conversion of every remaining physical utility (some `text-center`/flex alignment and arrows will not mirror). Treat RTL as a foundation to build on, not finished support.

## Resume

Add `public/resume/resume.pdf` and set `person.resumeUrl: "/resume/resume.pdf"`. While it is empty, every resume button is hidden.

## Limitations

- No MDX; the blog uses a small markdown subset.
- Presets are build-time only.
- The playground is a preview/config generator, not an exporter.
- Animation-intensity and navigation-style options are not implemented (motion is minimal CSS and respects `prefers-reduced-motion`).
- Rate limiting is per server instance (see `CONTACT-SETUP.md`).
- Placeholder images are simple SVG illustrations.
