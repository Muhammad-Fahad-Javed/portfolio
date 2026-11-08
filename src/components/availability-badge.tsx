import { availabilityLabel, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const dot = {
  available: "bg-success",
  open: "bg-warning",
  unavailable: "bg-error"
} as const;

export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[siteConfig.availability.status])} aria-hidden />
      {availabilityLabel()}
    </span>
  );
}
