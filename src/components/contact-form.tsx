"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string; fields?: FieldErrors }
  | { kind: "unconfigured"; mailto: string };

function clientValidate(v: Record<string, string>): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.subject.trim()) e.subject = "Please enter a subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? "")
    };

    const fields = clientValidate(values);
    if (Object.keys(fields).length > 0) {
      setState({ kind: "error", message: "Please fix the highlighted fields.", fields });
      return;
    }

    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, honeypot: String(fd.get("website") ?? "") })
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        reason?: string;
        mailto?: string;
        fieldErrors?: FieldErrors;
      };

      if (res.status === 503 && data.reason === "not_configured") {
        const q = new URLSearchParams({ subject: values.subject, body: values.message });
        setState({
          kind: "unconfigured",
          mailto: `${data.mailto ?? `mailto:${fallbackEmail}`}?${q.toString().replace(/\+/g, "%20")}`
        });
        return;
      }
      if (!res.ok) {
        setState({
          kind: "error",
          message: data.error ?? "Something went wrong. Please try again.",
          fields: data.fieldErrors
        });
        return;
      }
      setState({ kind: "success" });
      form.reset();
    } catch {
      setState({
        kind: "error",
        message: "Network error. Check your connection or email me directly."
      });
    }
  }

  const loading = state.kind === "loading";
  const fields = state.kind === "error" ? state.fields : undefined;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate aria-describedby="form-status">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" error={fields?.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" error={fields?.email} />
      </div>
      <Field label="Subject" name="subject" error={fields?.subject} />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-text-secondary">
          Message<span className="text-accent"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="input"
          aria-invalid={fields?.message ? true : undefined}
          aria-describedby={fields?.message ? "message-error" : undefined}
        />
        {fields?.message && (
          <p id="message-error" className="mt-1 text-xs text-error">
            {fields.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {loading ? "Sending…" : "Send message"}
        </button>
      </div>

      <div id="form-status" role="status" aria-live="polite">
        {state.kind === "success" && (
          <p className="flex items-center gap-2 rounded border border-success/40 bg-success/10 px-3 py-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" aria-hidden /> Message sent. Thank you.
          </p>
        )}
        {state.kind === "error" && (
          <p className="flex items-center gap-2 rounded border border-error/40 bg-error/10 px-3 py-2 text-sm text-error">
            <AlertCircle className="h-4 w-4" aria-hidden /> {state.message}
          </p>
        )}
        {state.kind === "unconfigured" && (
          <div className="rounded border border-warning/40 bg-warning/10 px-3 py-3 text-sm text-text">
            <p>
              The email service isn&apos;t set up on this site yet, so your message has{" "}
              <strong>not</strong> been sent.
            </p>
            <a href={state.mailto} className="mt-2 inline-flex items-center gap-1.5 text-accent underline">
              <Mail className="h-4 w-4" aria-hidden /> Open it in your email app instead
            </a>
          </div>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-text-secondary">
        {label}
        <span className="text-accent"> *</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="input"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
