import Link from "next/link";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ title: "Style Guide", path: "/style-guide" }),
  robots: { index: false, follow: true }
};

// Tailwind needs complete class names at build time, so swatches are listed explicitly.
const colors = [
  { name: "bg", cls: "bg-bg" },
  { name: "bg-secondary", cls: "bg-bg-secondary" },
  { name: "surface", cls: "bg-surface" },
  { name: "text", cls: "bg-text" },
  { name: "text-secondary", cls: "bg-text-secondary" },
  { name: "muted", cls: "bg-muted" },
  { name: "border", cls: "bg-border" },
  { name: "accent", cls: "bg-accent" },
  { name: "accent-hover", cls: "bg-accent-hover" },
  { name: "success", cls: "bg-success" },
  { name: "warning", cls: "bg-warning" },
  { name: "error", cls: "bg-error" }
];

const spacing = ["1", "2", "3", "4", "6", "8", "12", "16"];
const spacingCls: Record<string, string> = {
  "1": "w-1",
  "2": "w-2",
  "3": "w-3",
  "4": "w-4",
  "6": "w-6",
  "8": "w-8",
  "12": "w-12",
  "16": "w-16"
};

export default function StyleGuidePage() {
  return (
    <>
      <Section
        eyebrow="Style guide"
        title="Design system"
        headingLevel={1}
        className="pt-12 md:pt-20"
        description="Every token, component and state in one place. Use the theme toggle in the header to check light and dark, and change presets in src/config/site.ts."
      >
        <h2 className="display mb-6 text-2xl">Color</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {colors.map((c) => (
            <div key={c.name} className="rounded border border-border p-3">
              <div className={`h-14 rounded border border-border ${c.cls}`} />
              <p className="mt-2 font-mono text-xs">{c.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="display mb-6 text-2xl">Typography</h2>
        <div className="space-y-4">
          <p className="display text-5xl md:text-6xl">Display 6xl</p>
          <p className="display text-4xl">Display 4xl</p>
          <p className="display text-2xl">Section heading 2xl</p>
          <p className="text-lg">Body large. The quick brown fox jumps over the lazy dog.</p>
          <p className="text-base">Body. The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm text-text-secondary">Small secondary. The quick brown fox jumps over the lazy dog.</p>
          <p className="eyebrow">Eyebrow label</p>
          <p className="font-mono text-xs text-muted">Mono metadata / 12px / muted</p>
        </div>
      </Section>

      <Section>
        <h2 className="display mb-6 text-2xl">Buttons &amp; links</h2>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary">Primary</button>
          <button type="button" className="btn btn-secondary">Secondary</button>
          <button type="button" className="btn btn-ghost">Ghost</button>
          <button type="button" className="btn btn-primary" disabled>Disabled</button>
          <Link href="/about" className="text-sm text-accent underline underline-offset-4">Text link</Link>
        </div>
      </Section>

      <Section>
        <h2 className="display mb-6 text-2xl">Cards &amp; badges</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded border border-border bg-surface p-5">
            <p className="eyebrow">Surface card</p>
            <p className="mt-2 text-sm text-text-secondary">A bordered card on the surface colour.</p>
          </div>
          <div className="rounded border border-border bg-bg-secondary p-5">
            <p className="eyebrow">Muted card</p>
            <p className="mt-2 text-sm text-text-secondary">A card on the secondary background.</p>
          </div>
          <div className="rounded border border-accent/40 bg-accent/5 p-5">
            <p className="eyebrow">Accent card</p>
            <p className="mt-2 text-sm text-text-secondary">Highlighted content.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="chip">Chip</span>
          <span className="rounded bg-accent/10 px-2 py-0.5 text-xs text-accent">Accent</span>
          <span className="rounded bg-success/10 px-2 py-0.5 text-xs text-success">Success</span>
          <span className="rounded bg-warning/10 px-2 py-0.5 text-xs text-warning">Warning</span>
          <span className="rounded bg-error/10 px-2 py-0.5 text-xs text-error">Error</span>
        </div>
      </Section>

      <Section>
        <h2 className="display mb-6 text-2xl">Forms &amp; states</h2>
        <div className="grid max-w-xl gap-4">
          <div>
            <label htmlFor="sg-text" className="mb-1.5 block text-sm text-text-secondary">Text input</label>
            <input id="sg-text" className="input" placeholder="Placeholder" />
          </div>
          <div>
            <label htmlFor="sg-err" className="mb-1.5 block text-sm text-text-secondary">Input with error</label>
            <input id="sg-err" className="input" aria-invalid="true" defaultValue="not-an-email" />
            <p className="mt-1 text-xs text-error">Please enter a valid email address.</p>
          </div>
          <div>
            <label htmlFor="sg-area" className="mb-1.5 block text-sm text-text-secondary">Textarea</label>
            <textarea id="sg-area" className="input" rows={3} />
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="display mb-6 text-2xl">Navigation</h2>
        <nav aria-label="Style guide example" className="flex flex-wrap gap-1 rounded border border-border bg-surface p-2">
          <span className="rounded bg-bg-secondary px-3 py-1.5 text-sm text-text">Active</span>
          <span className="rounded px-3 py-1.5 text-sm text-text-secondary">Default</span>
          <span className="rounded px-3 py-1.5 text-sm text-muted">Muted</span>
        </nav>
      </Section>

      <Section>
        <h2 className="display mb-6 text-2xl">Spacing &amp; borders</h2>
        <div className="space-y-2">
          {spacing.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-10 font-mono text-xs text-muted">{s}</span>
              <span className={`h-3 rounded-sm bg-accent ${spacingCls[s]}`} />
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-sm border border-border p-4 text-xs">radius sm</div>
          <div className="rounded border border-border p-4 text-xs">radius default</div>
          <div className="rounded-lg border border-border p-4 text-xs">radius lg</div>
        </div>
      </Section>
    </>
  );
}
