import { Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { hasResume } from "@/lib/social";

/** Renders nothing when no resume is configured. */
export function ResumeButton({ className = "btn btn-secondary" }: { className?: string }) {
  if (!hasResume()) return null;
  return (
    <a href={siteConfig.person.resumeUrl} download className={className}>
      <Download className="h-4 w-4" aria-hidden /> Résumé (PDF)
    </a>
  );
}
