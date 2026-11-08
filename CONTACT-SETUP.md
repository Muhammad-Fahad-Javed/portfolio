# Contact form setup

## Default behaviour (no setup)

Out of the box no email provider is configured. When someone submits a valid form:

- the server answers `503 not_configured`
- the page shows a clear notice that the message has **not** been sent
- a link opens the visitor's email app with the subject and message pre-filled, addressed to `person.email` from `src/config/site.ts`

The site never claims success unless an email was actually handed to a provider.

## Enable email delivery (Resend)

1. Create an account at https://resend.com and verify your sending domain.
2. Create an API key.
3. Set these variables locally in `.env.local` and on your host:

```env
RESEND_API_KEY="re_xxxxxxxx"
CONTACT_FROM_EMAIL="hello@your-verified-domain.com"
CONTACT_TO_EMAIL="you@your-inbox.com"
```

All three must be set. Messages arrive as plain text with the visitor's address as `reply_to`. The API key is only used in `src/app/api/contact/route.ts` on the server and is never sent to the browser.

## Other providers

Replace the single `fetch` call in `src/app/api/contact/route.ts` (Postmark, SendGrid, SES, etc.).

## Protections included

- **Validation**: client-side for quick feedback, and server-side with `zod` (`src/lib/validation.ts`) as the source of truth. Control characters are stripped and line breaks are removed from the subject.
- **Honeypot**: a hidden field; bots that fill it get a fake success and nothing is sent.
- **Rate limit**: one valid submission per IP every 30 seconds. Invalid submissions don't count.

## Rate-limit caveat

The limiter keeps its state in server memory. On serverless platforms each instance has its own memory, and restarts reset it, so it is a speed bump, not a guarantee. For stronger protection use a shared store (Upstash Redis, Vercel KV) or a bot-check service (Turnstile/hCaptcha) in front of the route. These are not included because they need third-party accounts.
