import type { Project } from "@/types";

/**
 * DEMO CONTENT. Every project below is fictional and exists to demonstrate the
 * case-study layout. Replace with your own work. Every field except
 * slug/title/summary/category/tags/cover/year is optional; empty sections are hidden.
 */
export const projects: Project[] = [
  {
    slug: "atlas-analytics",
    title: "Atlas Analytics",
    summary:
      "A privacy-first analytics dashboard for small product teams. Server-side aggregation, zero third-party scripts, no cookie banners.",
    category: "Full-Stack",
    tags: ["Next.js", "TypeScript", "Postgres", "Drizzle"],
    cover: "/images/project-atlas.svg",
    liveUrl: "https://example.com/atlas",
    sourceUrl: "https://github.com/example/atlas",
    featured: true,
    year: "2024",
    overview:
      "Atlas answers three questions well: which pages get visited, where visitors come from, and which changes correlated with a change in traffic. It was built around one constraint: no third-party trackers, no cookies, no consent banner.",
    problem:
      "Small product teams are stuck between overly complex enterprise analytics and privacy-invasive scripts that demand a cookie banner and erode user trust.",
    goals: [
      "Zero third-party scripts on the client",
      "Fast dashboard reads from a small Postgres instance",
      "A simple event model a solo developer can understand in an hour",
      "Self-hostable in a single container"
    ],
    solution:
      "A lightweight ingestion endpoint writes anonymized events to a partitioned Postgres table. A background aggregator produces daily rollups that the dashboard reads. Everything is TypeScript end to end, with shared types between the ingestion worker and the frontend.",
    process: [
      "Designed the event schema and partition strategy before any UI",
      "Built a thin ingestion route with token-based auth",
      "Wrote a rollup job with idempotent semantics",
      "Iterated on the dashboard with early testers"
    ],
    architecture:
      "Next.js App Router for the dashboard, a standalone Node worker for rollups, and Postgres for raw events and aggregates. The ingestion endpoint and worker share one Drizzle schema package.",
    features: [
      "Anonymized page-view tracking without cookies",
      "Daily and hourly aggregate tables",
      "Traffic-source breakdown",
      "Shareable public dashboard links"
    ],
    challenges: [
      "Keeping ingestion fast while remaining idempotent",
      "Handling timezone rollups without a managed warehouse",
      "Designing a public dashboard view that cannot leak visitor data"
    ],
    solutions: [
      "Batched inserts keyed by a deterministic event hash",
      "Rollups computed in UTC and converted at read time",
      "Public views read only from pre-aggregated tables"
    ],
    gallery: [{ src: "/images/project-atlas.svg", alt: "Atlas Analytics cover illustration" }]
  },
  {
    slug: "camber-design-system",
    title: "Camber Design System",
    summary:
      "An accessible component library and design-token pipeline built around a single source of truth for color, type, and spacing.",
    category: "Design Systems",
    tags: ["React", "TypeScript", "Tailwind", "Storybook"],
    cover: "/images/project-camber.svg",
    liveUrl: "https://example.com/camber",
    sourceUrl: "https://github.com/example/camber",
    featured: true,
    year: "2023",
    overview:
      "Camber is a design system for a SaaS product with three separate frontends. The goal was not to replace them all at once, but to give them something they could adopt incrementally.",
    problem:
      "Three teams shipped three visually different products from the same brand guidelines, with three slightly different button components.",
    goals: [
      "A shared token source that compiles to CSS variables",
      "Incrementally adoptable components",
      "Contrast checks enforced in the token build step"
    ],
    solution:
      "A single JSON token source that a small build script turns into CSS variables and TypeScript types. Components ship as one package with per-component imports so teams can migrate a screen at a time.",
    process: [
      "Audited all three products to find the real component surface",
      "Extracted tokens from production values, not the design file",
      "Built the token compiler with contrast checks in CI",
      "Shipped the smallest possible first component: the button"
    ],
    architecture:
      "A monorepo with three packages: tokens (JSON plus compiler), primitives (React components), and docs (Storybook).",
    features: [
      "Token compiler with automatic contrast checks",
      "Accessible primitives with keyboard support",
      "Per-component CSS exports for tree-shaking",
      "Storybook documentation with usage examples"
    ],
    challenges: [
      "Keeping the CSS variable layer lightweight",
      "Keeping primitives readable for teams that dislike abstractions"
    ]
  },
  {
    slug: "quiet-hours",
    title: "Quiet Hours",
    summary:
      "A small, focused scheduling tool for people who want to protect their calendar without giving up control of it.",
    category: "Product",
    tags: ["Next.js", "TypeScript", "SQLite", "Tailwind"],
    cover: "/images/project-quiet-hours.svg",
    liveUrl: "https://example.com/quiet-hours",
    sourceUrl: "https://github.com/example/quiet-hours",
    featured: true,
    year: "2024",
    overview:
      "Quiet Hours lets you protect recurring blocks of focus time without revealing your entire calendar to a third party.",
    problem:
      "Existing scheduling tools ask for full calendar access and reveal more availability than people want to share.",
    goals: [
      "Share only availability, never event contents",
      "No account required for the person booking",
      "Self-hostable"
    ],
    solution:
      "A small app that reads free/busy data from a CalDAV endpoint and exposes only that as a scheduling link. Booking is a plain form that writes a single event back.",
    architecture:
      "Next.js App Router, SQLite for booking records, and a small CalDAV client. Everything runs in one process.",
    features: [
      "Free/busy-only scheduling links",
      "Recurring quiet-hours blocks",
      "Timezone-aware booking form"
    ],
    challenges: ["Handling CalDAV differences across providers"]
  },
  {
    slug: "portico-migration",
    title: "Portico: Legacy Migration",
    summary:
      "A staged migration of an old jQuery admin panel to React, with automated feature-parity checks per sprint.",
    category: "Engineering",
    tags: ["React", "TypeScript", "Vite", "Playwright"],
    cover: "/images/project-portico.svg",
    sourceUrl: "https://github.com/example/portico",
    year: "2023",
    overview:
      "Moving a long-lived jQuery admin panel to React one route at a time, without ever freezing the codebase for a rewrite.",
    problem:
      "The old panel worked but was increasingly expensive to change. A full rewrite was unaffordable.",
    goals: [
      "Ship every sprint with no long-lived feature branch",
      "Automated parity checks per migrated screen"
    ],
    solution:
      "A React island architecture that let new routes live alongside legacy ones, with Playwright parity checks against the legacy implementation.",
    architecture:
      "A hybrid routing layer that mounts React islands into the existing page shell, with a shared data layer over the existing API.",
    features: ["Gradual migration with no freeze windows", "Automated parity tests per screen"]
  },
  {
    slug: "lattice-cli",
    title: "Lattice CLI",
    summary:
      "A developer CLI for scaffolding and managing small, opinionated TypeScript services.",
    category: "Tooling",
    tags: ["Node.js", "TypeScript", "CLI"],
    cover: "/images/project-lattice.svg",
    sourceUrl: "https://github.com/example/lattice",
    year: "2022",
    overview:
      "Lattice scaffolds and manages opinionated TypeScript services. It exists because the same project structure kept being rebuilt for tiny services.",
    solution:
      "Two subcommands: `new` and `upgrade`. The scaffold is a plain template directory; the upgrade compares against the template and shows a diff.",
    features: ["One-command scaffolding", "Template diffing on upgrade"]
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = () => projects.filter((p) => p.featured);
export const projectCategories = () => Array.from(new Set(projects.map((p) => p.category)));
export const projectTags = () =>
  Array.from(new Set(projects.flatMap((p) => p.tags))).sort((a, b) => a.localeCompare(b));

export function relatedProjects(slug: string, limit = 2): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  return projects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score:
        (p.category === current.category ? 2 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
