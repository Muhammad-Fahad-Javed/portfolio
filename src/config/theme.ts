export const accentPresets = {
  indigo: { accent: "245 80% 55%", accentHover: "245 80% 48%" },
  emerald: { accent: "158 64% 36%", accentHover: "158 64% 30%" },
  amber: { accent: "28 92% 42%", accentHover: "28 92% 35%" },
  rose: { accent: "350 80% 48%", accentHover: "350 80% 41%" },
  slate: { accent: "220 15% 32%", accentHover: "220 15% 25%" }
} as const;

export type AccentName = keyof typeof accentPresets;

export const radiusOptions = {
  sharp: "0.125rem",
  soft: "0.5rem",
  rounded: "0.75rem"
} as const;

export const widthOptions = {
  narrow: "64rem",
  standard: "72rem",
  wide: "80rem"
} as const;

/** Display fonts available in the template (all loaded via next/font in layout.tsx). */
export const fontOptions = {
  inter: { label: "Inter (sans)", value: "var(--font-inter)" },
  fraunces: { label: "Fraunces (serif)", value: "var(--font-fraunces)" },
  mono: { label: "JetBrains Mono", value: "var(--font-jetbrains)" }
} as const;

export type FontName = keyof typeof fontOptions;
