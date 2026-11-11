# Getting Started with FRAME Portfolio

Welcome! Thank you for purchasing the **FRAME Portfolio** template. This guide will walk you through setting up, customizing, and deploying your developer portfolio in under 15 minutes.

---

## Step 1: Quick Start (3 Minutes)

Ensure you have **Node.js 18.18 or newer** installed.

1. Open your terminal in this directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Step 2: Customization Roadmap (10 Minutes)

All content is centralized in easy-to-edit TypeScript files with complete autocomplete:

### 1. Personal Identity & Social Links
Open `src/config/site.ts`:
- Change `person.name`, `person.title`, `person.shortBio`, `person.longBio`, `person.email`, and `person.location`.
- Update your social links under `social` (GitHub, LinkedIn, X, etc.). Empty links are hidden automatically.
- Update your availability status (`"available"`, `"open"`, or `"unavailable"`).

### 2. Design Preset & Hero Layout
In `src/config/site.ts`:
- **`defaults.preset`**: Choose `"editorial"`, `"minimal"`, or `"technical"`.
- **`defaults.heroLayout`**: Choose `"editorial"`, `"centered"`, `"split"`, or `"technical"`.
- To preview changes interactively before editing files, visit [http://localhost:3000/customization](http://localhost:3000/customization).

### 3. Case Studies & Projects
Open `src/content/projects.ts`:
- Add your own projects or modify the existing examples.
- Add project cover images to `public/images/` and reference them by path (e.g., `"/images/my-project.png"`).

### 4. Experience & Skills
- **Experience timeline:** Edit `src/content/experience.ts`. Entries are grouped automatically into Work, Education, and Certifications.
- **Skills matrix:** Edit `src/content/skills.ts`.

### 5. Technical Blog
Open `src/content/blog.ts`:
- Add markdown articles to the `posts` array. Headings, code blocks, lists, blockquotes, and bold/italic text are supported out of the box.

### 6. Profile Avatar & Resume
- **Avatar:** Replace `public/images/avatar.svg` (or add a PNG/JPG and update `person.avatar` in `src/config/site.ts`).
- **Resume:** Place your resume PDF in `public/resume/resume.pdf` and set `person.resumeUrl: "/resume/resume.pdf"` in `src/config/site.ts`.

---

## Step 3: Deploying Your Site (2 Minutes)

### Recommended: Deploy to Vercel
1. Push your customized portfolio to a private GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **Add New → Project**.
3. Import your repository (Next.js is detected automatically).
4. In the **Environment Variables** section, set:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com` (your live URL, no trailing slash).
5. Click **Deploy**.

---

## Contact Form Email Delivery (Optional)

By default, if no email service is configured, submissions will gracefully offer visitors a pre-filled `mailto:` link.

To receive direct emails via **Resend**:
1. Get a free API key at [resend.com](https://resend.com) and verify your sending domain.
2. Add these environment variables in your deployment dashboard (or `.env.local` locally):
   ```env
   RESEND_API_KEY="re_your_api_key"
   CONTACT_FROM_EMAIL="contact@your-verified-domain.com"
   CONTACT_TO_EMAIL="your-personal-email@domain.com"
   ```
See `CONTACT-SETUP.md` for full details.

---

## Documentation Index

- `README.md` — Project overview and commands.
- `CUSTOMIZATION.md` — In-depth guide to fonts, colors, and layout presets.
- `DEPLOYMENT.md` — Production hosting instructions for Vercel, Netlify, Render, or VPS.
- `CONTACT-SETUP.md` — Contact form configuration and spam prevention.
- `TROUBLESHOOTING.md` — Solutions to common issues.
- `LICENSE.md` — Commercial license terms.
