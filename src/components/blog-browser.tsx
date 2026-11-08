"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogBrowser({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && !p.categories.includes(category)) return false;
      if (!q) return true;
      return `${p.title} ${p.excerpt} ${p.tags.join(" ")} ${p.categories.join(" ")}`
        .toLowerCase()
        .includes(q);
    });
  }, [posts, category, query]);

  const featured = filtered.filter((p) => p.featured);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-sm">
          <Search
            className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="input ps-9"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded border px-3 py-1.5 text-xs transition-colors",
                category === c
                  ? "border-accent bg-accent/10 text-text"
                  : "border-border bg-surface text-text-secondary hover:text-text"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {featured.length > 0 && category === "All" && !query && (
        <p className="eyebrow mt-10">Featured articles are marked ★</p>
      )}

      <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group grid gap-4 py-7 md:grid-cols-[10rem_1fr]">
                <div>
                  <p className="font-mono text-xs text-muted">{formatDate(post.date)}</p>
                  <p className="mt-1 text-xs text-muted">{post.readingTimeMinutes} min read</p>
                </div>
                <div>
                  <h2 className="display text-xl group-hover:text-accent md:text-2xl">
                    {post.featured && (
                      <span className="me-2 text-accent" aria-label="Featured">
                        ★
                      </span>
                    )}
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-text-secondary">{post.excerpt}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
                    {post.tags.map((t) => (
                      <li key={t} className="chip font-mono">
                        #{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded border border-dashed border-border p-10 text-center">
          <p className="display text-xl">No articles found.</p>
          <p className="mt-2 text-sm text-text-secondary">Try another search term or category.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="btn btn-primary mt-5"
          >
            Show all articles
          </button>
        </div>
      )}
    </div>
  );
}
