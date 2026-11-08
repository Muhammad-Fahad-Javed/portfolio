import { siteConfig } from "@/config/site";

/** Plain share links (no third-party scripts, no tracking). */
export function ShareLinks({ title, path }: { title: string; path: string }) {
  const url = encodeURIComponent(`${siteConfig.url}${path}`);
  const text = encodeURIComponent(title);
  const links = [
    { label: "X", href: `https://x.com/intent/tweet?text=${text}&url=${url}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "Email", href: `mailto:?subject=${text}&body=${url}` }
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="eyebrow">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.label === "Email" ? undefined : "_blank"}
          rel="noreferrer noopener"
          className="text-text-secondary underline-offset-4 hover:text-text hover:underline"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
