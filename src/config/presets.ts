import type { PresetKey } from "@/types";

export const presets: Record<
  PresetKey,
  { label: string; description: string; audience: string }
> = {
  editorial: {
    label: "Editorial",
    description:
      "Large serif display type, magazine-style asymmetry, and generous whitespace. Built for people whose portfolio is a body of work, not a résumé.",
    audience: "Creative developers, designers, freelancers, personal brands."
  },
  minimal: {
    label: "Minimal",
    description:
      "Compact navigation, quiet surfaces, and a strong content hierarchy. Every element earns its place.",
    audience: "Software engineers, backend developers, students, consultants."
  },
  technical: {
    label: "Technical",
    description:
      "Mono display type, a faint grid backdrop, code-style labels, and dense structured information. For work that deserves to be read closely.",
    audience: "Full-stack engineers, DevOps, backend leads, technical founders."
  }
};

export const presetKeys: PresetKey[] = ["editorial", "minimal", "technical"];
