"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowRight, Check, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { posts } from "@/content/blog";
import { OPEN_PALETTE_EVENT } from "@/components/navigation";

interface Item {
  id: string;
  group: "Navigate" | "Actions" | "Projects" | "Articles";
  label: string;
  hint?: string;
  keepOpen?: boolean;
  run: () => void | Promise<void>;
}

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus?.();
  }, []);

  const openPalette = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setCopied("idle");
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) {
            triggerRef.current = document.activeElement as HTMLElement | null;
            setQuery("");
            setActive(0);
            setCopied("idle");
          }
          return !v;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, openPalette);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, openPalette);
    };
  }, [openPalette]);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      setOpen(false);
      router.push(href);
    };
    return [
      ...siteConfig.navigation.map<Item>((n) => ({
        id: `nav-${n.href}`,
        group: "Navigate",
        label: n.label === "Home" ? "Go to Home" : `Open ${n.label}`,
        hint: n.href,
        run: go(n.href)
      })),
      {
        id: "toggle-theme",
        group: "Actions",
        label: "Toggle theme",
        hint: resolvedTheme === "dark" ? "dark" : "light",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          setOpen(false);
        }
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email",
        hint: siteConfig.person.email,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(siteConfig.person.email);
            setCopied("ok");
          } catch {
            setCopied("fail");
          }
        }
      },
      ...projects.map<Item>((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: p.category,
        run: go(`/work/${p.slug}`)
      })),
      ...posts.map<Item>((p) => ({
        id: `post-${p.slug}`,
        group: "Articles",
        label: p.title,
        hint: p.categories[0],
        run: go(`/blog/${p.slug}`)
      }))
    ];
  }, [router, setTheme, resolvedTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => setActive(0), [query]);

  // Focus input on open + lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep active option in view
  useEffect(() => {
    if (!open) return;
    document.getElementById(`cmd-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      void filtered[active]?.run();
    } else if (e.key === "Tab") {
      // Minimal focus trap: all interactive content is reached through the input + arrows.
      e.preventDefault();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[12vh] animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted" aria-hidden />
          <input
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={filtered.length ? `cmd-opt-${active}` : undefined}
            aria-label="Search pages, projects and articles"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, articles…"
            className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        <ul id="cmd-list" role="listbox" className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted">
              No matches for “{query}”. Try a page name like “work” or “blog”.
            </li>
          )}
          {filtered.map((item, i) => {
            const showGroup = i === 0 || filtered[i - 1].group !== item.group;
            return (
              <li key={item.id} role="presentation">
                {showGroup && <p className="eyebrow px-4 pb-1 pt-3">{item.group}</p>}
                <div
                  id={`cmd-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => void item.run()}
                  className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                    i === active ? "bg-bg-secondary text-text" : "text-text-secondary"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {item.id === "copy-email" && copied === "ok" && (
                      <Check className="h-3.5 w-3.5 text-success" aria-hidden />
                    )}
                    <span className="truncate">
                      {item.id === "copy-email" && copied === "ok"
                        ? "Email copied"
                        : item.id === "copy-email" && copied === "fail"
                          ? "Clipboard blocked. Copy manually:"
                          : item.label}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {item.hint && <span className="font-mono text-[11px] text-muted">{item.hint}</span>}
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" aria-hidden />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-border px-4 py-2 text-[11px] text-muted">
          ↑ ↓ to navigate · Enter to select · Esc to close
        </div>
      </div>
    </div>
  );
}
