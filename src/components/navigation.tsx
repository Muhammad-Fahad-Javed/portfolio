"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ui } from "@/config/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export const OPEN_PALETTE_EVENT = "frame:open-palette";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = ui[siteConfig.locale];

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Link href="/" className="display text-lg text-text">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded px-3 py-1.5 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-bg-secondary text-text"
                      : "text-text-secondary hover:text-text"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            className="hidden items-center gap-2 rounded border border-border bg-surface px-2.5 py-1.5 text-xs text-muted transition-colors hover:text-text md:inline-flex"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" aria-hidden />
            <span>Ctrl K</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-border bg-surface text-text-secondary md:hidden"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-bg md:hidden">
          <nav aria-label="Mobile" className="container-content flex flex-col py-2">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded px-2 py-3 text-sm",
                  isActive(item.href) ? "text-text" : "text-text-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
