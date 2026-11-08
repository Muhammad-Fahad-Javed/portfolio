# Troubleshooting

**`npm run build` fails with a TypeScript or lint error after I edited content**
Run `npm run typecheck`. Content files are typed: a required field may be missing or a `type` value may be misspelled (see `src/types/index.ts`).

**Canonical URLs, sitemap or social cards show `localhost` or `example.com`**
Set `NEXT_PUBLIC_SITE_URL` and rebuild. It is read at build time. See `DEPLOYMENT.md`.

**The preset or hero layout didn't change**
They are read from `src/config/site.ts` at build time. Restart `npm run dev` or rebuild. The `/customization` page only previews; it never edits your site.

**The contact form says my message was not sent**
That is the honest fallback when the email service isn't configured. See `CONTACT-SETUP.md`. If you did configure it, all three variables (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) must be set and the sender domain verified.

**Contact form returns "Too many requests"**
One valid submission per IP every 30 seconds is allowed. Wait and retry.

**A new project or article returns 404**
Check that its `slug` is unique and URL-safe (lowercase, hyphens) and restart the dev server. Unknown slugs deliberately return a 404.

**An image doesn't show**
Files must be in `public/` and referenced from the root: `/images/name.png`, not `public/images/...`.

**The resume button is missing**
By design: it only appears when `person.resumeUrl` is set. Add `public/resume/resume.pdf` and set `resumeUrl: "/resume/resume.pdf"`.

**Social link doesn't appear**
Empty strings are hidden. Add the full URL starting with `https://`.

**Command palette doesn't open**
Press `Ctrl+K` (Windows/Linux) or `⌘K` (macOS), or click the button in the header. Some browser extensions capture the shortcut; use the header button instead.

**Link previews on social networks show no image**
The default image is an SVG, which many networks ignore. Use a 1200×630 PNG/JPG and update `src/lib/seo.ts`.

**RTL languages look partly wrong**
Only the foundation is implemented (`lang`/`dir`). See "Multilingual / RTL" in `DOCUMENTATION.md`.

**Port 3000 is in use**
`npm run dev -- -p 3001`
