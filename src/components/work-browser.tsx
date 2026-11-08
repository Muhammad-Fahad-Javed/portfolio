"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function WorkBrowser({
  projects,
  categories,
  tags
}: {
  projects: Project[];
  categories: string[];
  tags: string[];
}) {
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (tag !== "All" && !p.tags.includes(tag)) return false;
      if (!q) return true;
      return `${p.title} ${p.summary} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q);
    });
  }, [projects, category, tag, query]);

  const reset = () => {
    setCategory("All");
    setTag("All");
    setQuery("");
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-sm">
          <Search
            className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="input ps-9"
          />
        </div>

        <fieldset>
          <legend className="eyebrow mb-2">Category</legend>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <FilterButton key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterButton>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-2">Technology</legend>
          <div className="flex flex-wrap gap-2">
            {["All", ...tags].map((t) => (
              <FilterButton key={t} active={tag === t} onClick={() => setTag(t)}>
                {t}
              </FilterButton>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-8 text-sm text-muted" role="status" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-12 md:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded border border-dashed border-border p-10 text-center">
          <p className="display text-xl">No projects match those filters.</p>
          <p className="mt-2 text-sm text-text-secondary">
            Try a different technology or clear the search.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="btn btn-primary">
              Clear filters
            </button>
            <Link href="/contact" className="btn btn-secondary">
              Ask me about it
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded border px-3 py-1.5 text-xs transition-colors",
        active
          ? "border-accent bg-accent/10 text-text"
          : "border-border bg-surface text-text-secondary hover:text-text"
      )}
    >
      {children}
    </button>
  );
}
