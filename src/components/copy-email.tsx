"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "manual";

function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = legacyCopy(email);
    }
    setStatus(ok ? "copied" : "manual");
    window.setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <button type="button" onClick={copy} className="btn btn-secondary">
        {status === "copied" ? (
          <Check className="h-4 w-4 text-success" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="text-xs text-muted">
        {status === "copied" && "Email address copied to clipboard."}
        {status === "manual" && (
          <>
            Copy manually: <span className="select-all font-mono">{email}</span>
          </>
        )}
      </span>
    </span>
  );
}
