import { siteConfig } from "@/config/site";
import type { SocialKey } from "@/types";

export const socialLabels: Record<SocialKey, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
  dribbble: "Dribbble",
  behance: "Behance",
  youtube: "YouTube",
  website: "Website"
};

/** Only configured (non-empty) social links. */
export function activeSocials(): { key: SocialKey; label: string; url: string }[] {
  return (Object.keys(socialLabels) as SocialKey[])
    .map((key) => ({ key, label: socialLabels[key], url: siteConfig.social[key]?.trim() ?? "" }))
    .filter((s) => s.url.length > 0);
}

export function hasResume(): boolean {
  return siteConfig.person.resumeUrl.trim().length > 0;
}
