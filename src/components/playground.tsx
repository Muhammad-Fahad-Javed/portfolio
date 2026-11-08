"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { presetKeys, presets } from "@/config/presets";
import { accentPresets, fontOptions, radiusOptions, widthOptions } from "@/config/theme";
import type { AccentName, FontName } from "@/config/theme";
import { siteConfig } from "@/config/site";
import type { HeroLayout, PresetKey } from "@/types";
import { cn } from "@/lib/utils";

const DEFAULTS = {
  preset: siteConfig.defaults.preset as PresetKey,
  hero: siteConfig.defaults.heroLayout as HeroLayout,
  accent: "indigo" as AccentName,
  font: "inter" as FontName,
  radius: "soft" as keyof typeof radiusOptions,
  width: "standard" as keyof typeof widthOptions
};

const heroLayouts: HeroLayout[] = ["editorial", "centered", "split", "technical"];

export function Playground() {
  const [cfg, setCfg] = useState(DEFAULTS);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const set = <K extends keyof typeof DEFAULTS>(k: K, v: (typeof DEFAULTS)[K]) =>
    setCfg((c) => ({ ...c, [k]: v }));

  const snippet = `// 1) src/config/site.ts
defaults: {
  theme: "system",
  preset: "${cfg.preset}",
  heroLayout: "${cfg.hero}"
},

// 2) src/app/globals.css, inside :root { ... }
--accent: ${accentPresets[cfg.accent].accent};
--accent-hover: ${accentPresets[cfg.accent].accentHover};
--radius: ${radiusOptions[cfg.radius]};
--max-width: ${widthOptions[cfg.width]};
--font-display: ${fontOptions[cfg.font].value}, system-ui, sans-serif;`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    window.setTimeout(() => setCopied("idle"), 2500);
  }

  const previewStyle = {
    "--radius": radiusOptions[cfg.radius],
    "--accent": accentPresets[cfg.accent].accent,
    "--accent-hover": accentPresets[cfg.accent].accentHover,
    "--font-display": `${fontOptions[cfg.font].value}, system-ui, sans-serif`,
    maxWidth: widthOptions[cfg.width]
  } as React.CSSProperties;

  const centered = cfg.hero === "centered";

  return (
    <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
      <div className="space-y-6">
        <fieldset>
          <legend className="eyebrow mb-2">Preset</legend>
          <div className="space-y-2">
            {presetKeys.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={cfg.preset === p}
                onClick={() => set("preset", p)}
                className={cn(
                  "w-full rounded border px-3 py-2 text-start text-sm",
                  cfg.preset === p ? "border-accent bg-accent/10" : "border-border bg-surface"
                )}
              >
                <span className="block font-medium">{presets[p].label}</span>
                <span className="mt-0.5 block text-xs text-text-secondary">{presets[p].audience}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-2">Hero layout</legend>
          <div className="flex flex-wrap gap-2">
            {heroLayouts.map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={cfg.hero === h}
                onClick={() => set("hero", h)}
                className={cn(
                  "rounded border px-3 py-1.5 text-xs capitalize",
                  cfg.hero === h ? "border-accent bg-accent/10" : "border-border bg-surface"
                )}
              >
                {h}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-2">Accent</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(accentPresets) as AccentName[]).map((name) => (
              <button
                key={name}
                type="button"
                aria-label={`${name} accent`}
                aria-pressed={cfg.accent === name}
                onClick={() => set("accent", name)}
                style={{ backgroundColor: `hsl(${accentPresets[name].accent})` }}
                className={cn(
                  "h-8 w-8 rounded-full border-2",
                  cfg.accent === name ? "border-text" : "border-transparent"
                )}
              />
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="pg-font" className="eyebrow mb-2 block">Display font</label>
          <select id="pg-font" value={cfg.font} onChange={(e) => set("font", e.target.value as FontName)} className="input">
            {(Object.keys(fontOptions) as FontName[]).map((f) => (
              <option key={f} value={f}>{fontOptions[f].label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pg-radius" className="eyebrow mb-2 block">Border radius</label>
          <select id="pg-radius" value={cfg.radius} onChange={(e) => set("radius", e.target.value as keyof typeof radiusOptions)} className="input">
            <option value="sharp">Sharp</option>
            <option value="soft">Soft</option>
            <option value="rounded">Rounded</option>
          </select>
        </div>

        <div>
          <label htmlFor="pg-width" className="eyebrow mb-2 block">Content width</label>
          <select id="pg-width" value={cfg.width} onChange={(e) => set("width", e.target.value as keyof typeof widthOptions)} className="input">
            <option value="narrow">Narrow</option>
            <option value="standard">Standard</option>
            <option value="wide">Wide</option>
          </select>
        </div>

        <button type="button" onClick={() => setCfg(DEFAULTS)} className="btn btn-secondary">
          <RotateCcw className="h-4 w-4" aria-hidden /> Reset to defaults
        </button>
      </div>

      <div className="min-w-0">
        <div data-preset={cfg.preset} className="rounded border border-border bg-bg p-4 sm:p-8">
          <div style={previewStyle} className={cn("mx-auto", centered && "text-center")}>
            <p className="eyebrow">Live preview · {presets[cfg.preset].label}</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">{siteConfig.person.name}</h2>
            <p className="mt-2 font-mono text-xs text-muted">{siteConfig.person.title}</p>
            <p className={cn("mt-4 max-w-lg text-sm text-text-secondary", centered && "mx-auto")}>
              {siteConfig.person.shortBio}
            </p>
            <div className={cn("mt-6 flex flex-wrap gap-2", centered && "justify-center")}>
              <span className="btn btn-primary">Primary action</span>
              <span className="btn btn-secondary">Secondary</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded border border-border bg-surface p-3">
                <p className="eyebrow">Project</p>
                <p className="mt-1 text-sm">A small project card.</p>
              </div>
              <div className="rounded border border-border bg-surface p-3">
                <p className="eyebrow">Article</p>
                <p className="mt-1 text-sm">A small article card.</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          The preview is scoped to this box. Use the sun/moon toggle in the header to check dark mode.
          Nothing here changes your site until you paste the snippet below into your files.
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="eyebrow">Configuration</p>
            <button type="button" onClick={copy} className="btn btn-secondary">
              {copied === "ok" ? <Check className="h-4 w-4 text-success" aria-hidden /> : null}
              {copied === "ok" ? "Copied" : "Copy configuration"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded border border-border bg-surface p-4 font-mono text-xs text-text-secondary">
            {snippet}
          </pre>
          <p role="status" aria-live="polite" className="mt-2 text-xs text-muted">
            {copied === "fail" && "Clipboard blocked by the browser. Select the text above and copy it manually."}
          </p>
        </div>
      </div>
    </div>
  );
}
