# Deployment

Requires Node.js 18.18+. The template needs **no network access at build time** (fonts are self-hosted).

## Vercel (recommended)

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Vercel choose **Add New → Project** and import the repository. The Next.js preset is detected automatically.
3. Add environment variables (below).
4. Deploy.

## Any Node.js host

```bash
npm ci
npm run build
npm run start      # listens on PORT, default 3000
```

The contact form uses an API route, so a **static export is not supported**. Use a host that can run `next start` (Vercel, Render, Railway, Fly.io, a VPS, Docker).

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Strongly recommended** | Canonical site URL, e.g. `https://your-domain.com` (no trailing slash). Used for canonical links, sitemap, Open Graph and structured data. |
| `RESEND_API_KEY` | Optional | Enables the contact form to send email |
| `CONTACT_FROM_EMAIL` | Optional | Verified sender address |
| `CONTACT_TO_EMAIL` | Optional | Inbox that receives messages |

`NEXT_PUBLIC_SITE_URL` is read at **build time**. Set it before building and rebuild after changing it.

### How the site URL is chosen

1. `NEXT_PUBLIC_SITE_URL`, if set
2. On Vercel **production**: the project's production domain
3. On Vercel **previews**: that deployment's own URL (previews never claim your real domain as canonical)
4. Otherwise `http://localhost:3000`

If you build on a non-Vercel host without `NEXT_PUBLIC_SITE_URL`, canonicals will point at `localhost`. Always set it.

## After deploying

- Open `/sitemap.xml` and `/robots.txt` and confirm the domain is yours.
- Submit the sitemap in Google Search Console.
- Replace the Open Graph image with a PNG/JPG and test it in a link-preview tool.
- Run Lighthouse on the live URL and record your own scores. This template does not ship with benchmark numbers.
