import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort, per-instance rate limit. On serverless platforms each instance has its own
// memory, so use a shared store (Upstash/Vercel KV) for real protection. See CONTACT-SETUP.md.
const hits = new Map<string, number>();
const WINDOW_MS = 30_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, ts] of hits) if (now - ts > WINDOW_MS * 4) hits.delete(key);
  const last = hits.get(ip) ?? 0;
  if (now - last < WINDOW_MS) return true;
  hits.set(ip, now);
  return false;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const fieldErrors = Object.fromEntries(
      Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Invalid value."])
    );
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot: bots fill it. Pretend success, send nothing.
  if (parsed.data.honeypot) return NextResponse.json({ ok: true });

  // Rate limit only well-formed submissions, so a typo never locks a real visitor out.
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    // Be honest: nothing was sent. The client shows a mailto fallback.
    return NextResponse.json(
      { reason: "not_configured", mailto: `mailto:${siteConfig.person.email}` },
      { status: 503 }
    );
  }

  const { name, email, subject, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`
      })
    });
    if (!res.ok) {
      console.error("Email provider error", res.status);
      return NextResponse.json({ error: "The email provider rejected the request." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact handler error", err);
    return NextResponse.json({ error: "Unexpected error sending the message." }, { status: 500 });
  }
}
