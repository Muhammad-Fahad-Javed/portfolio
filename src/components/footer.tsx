import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { activeSocials } from "@/lib/social";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = activeSocials();
  return (
    <footer className="mt-12 border-t border-border bg-bg-secondary">
      <div className="container-content grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="display text-lg">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-sm text-text-secondary">{siteConfig.person.shortBio}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-3">Navigate</p>
          <ul className="space-y-1.5 text-sm">
            {siteConfig.navigation.map((n) => (
              <li key={n.href}>
                <Link className="text-text-secondary hover:text-text" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="space-y-1.5 text-sm">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  className="text-text-secondary hover:text-text"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="text-text-secondary hover:text-text"
                href={`mailto:${siteConfig.person.email}`}
              >
                {siteConfig.person.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-content flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.person.name}. All rights reserved.
          </p>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-text">
            Back to top <ArrowUp className="h-3 w-3" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
