# Customization guide

You do not need to touch components to personalize FRAME. Edit these files.

## 1. Your identity: `src/config/site.ts`

```ts
person: {
  name: "Your Name",
  title: "Your Professional Title",
  shortBio: "One or two sentences for the hero.",
  longBio: "A paragraph for the About page and homepage.",
  email: "you@yourdomain.com",
  location: "Your City, Country",
  avatar: "/images/avatar.svg",   // replace the file or change the path
  resumeUrl: ""                    // "/resume/resume.pdf" after adding the file
},
```

Change the brand name shown in the header (default `FRAME`) with `name: "YourBrand"` at the top of the same file. Also update `seo.defaultTitle`, `seo.titleTemplate` and `seo.description`.

## 2. Social links

```ts
social: {
  github: "https://github.com/you",
  linkedin: "https://linkedin.com/in/you",
  x: "",          // empty = not shown
},
```

## 3. Availability

```ts
availability: { status: "open", ... }   // "available" | "open" | "unavailable"
```

## 4. Look and feel

```ts
defaults: {
  preset: "technical",     // editorial | minimal | technical
  heroLayout: "split",     // editorial | centered | split | technical
  theme: "system",         // light | dark | system
}
```

Open `/customization` while running the site to try options and **Copy configuration**. Paste the first block into `src/config/site.ts` and the second into `src/app/globals.css` inside `:root { … }`.

**Accent colour only:** edit `--accent` and `--accent-hover` in `:root`, and the matching dark values in `.dark`, inside `src/app/globals.css`. Dark values should be lighter so text stays readable.

## 5. Show or hide sections

```ts
sections: { testimonials: false, techStack: true, ... }
aboutSections: { interests: false, ... }
```

## 6. Add a project

Open `src/content/projects.ts` and add an object to `projects`:

```ts
{
  slug: "my-project",            // becomes /work/my-project
  title: "My Project",
  summary: "One sentence shown on cards.",
  category: "Full-Stack",
  tags: ["Next.js", "TypeScript"],
  cover: "/images/my-project.png",   // file in public/images/
  year: "2025",
  featured: true,                    // show on the homepage
  liveUrl: "https://…",              // optional
  sourceUrl: "https://github.com/…", // optional
  overview: "…",                     // everything below is optional
  problem: "…",
  goals: ["…"],
  solution: "…",
}
```

Only fill in what is true. Empty sections are hidden, and nothing is invented for you.

## 7. Add a blog article

Open `src/content/blog.ts` and add an object to `posts` (see the existing three). The URL is `/blog/<slug>`. Delete the demo articles when you publish your own.

## 8. Experience, skills, About text

- `src/content/experience.ts`
- `src/content/skills.ts`
- `src/content/about.ts`

## 9. Images

Put files in `public/images/` and reference them as `/images/file-name.ext`. Use JPG/PNG/WebP photos (Next optimizes them) or SVG. Give every image meaningful alt text where a field exists (for example `gallery: [{ src, alt }]`).

## 10. Replace demo content checklist

- [ ] Name, title, bios, email, location
- [ ] Social links
- [ ] Projects (and delete the five demo projects)
- [ ] Experience (all demo entries are fictional)
- [ ] Testimonials: real ones only, or hide the section
- [ ] Blog posts
- [ ] Avatar and project images
- [ ] Resume PDF
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] Open Graph image (PNG/JPG, 1200×630)
