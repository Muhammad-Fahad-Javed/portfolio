import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
}

export function formatMonth(iso: string): string {
  if (iso === "Present") return "Present";
  const [year, month] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(year, (month ?? 1) - 1, 1));
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
}
