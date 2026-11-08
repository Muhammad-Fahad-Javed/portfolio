import type { BlogPost } from "@/types";

/**
 * DEMO ARTICLES. Replace or delete. `body` supports a small markdown subset:
 * ## / ### headings, paragraphs, "- " lists, "1. " lists, **bold**, *italic*, `code`,
 * "> quote" and [links](https://example.com).
 */
export const posts: BlogPost[] = [
  {
    slug: "designing-for-the-seam",
    title: "Designing for the seam",
    excerpt:
      "Most product bugs live where two systems meet, each working perfectly in isolation. A short case for treating the seam as a first-class design surface.",
    date: "2024-08-12",
    author: "Alex Rivera",
    categories: ["Design", "Engineering"],
    tags: ["design systems", "product", "process"],
    featured: true,
    readingTimeMinutes: 3,
    body: `## The seam is where the bugs live

Every system you ship is really two systems meeting. A design file meets a component library. A component library meets an API. An API meets a database. Each can be perfect in isolation. The bugs live where they meet.

## A small example

Picture a dashboard where every component is correct and every endpoint is fast, yet every user has at least one complaint. The complaints have a shape:

- The loading state of one card runs at a different tempo than the card next to it.
- The empty state of a filtered list looks like an error to a first-time user.
- A success banner appears before the data has returned.

Each was somebody's reasonable local decision. None was visible to a component test.

## What to do about it

1. Write down what each component assumes about its neighbors.
2. Give loading, empty, and error states the same design attention as the happy path.
3. Test the combination, not only the parts.`
  },
  {
    slug: "why-i-still-use-postgres",
    title: "Why I still reach for Postgres",
    excerpt:
      "A short defense of using the boring database for almost everything, and of knowing when not to.",
    date: "2024-06-28",
    author: "Alex Rivera",
    categories: ["Engineering", "Databases"],
    tags: ["postgres", "sql", "architecture"],
    featured: true,
    readingTimeMinutes: 3,
    body: `## The boring choice

Postgres is rarely the exciting choice. It is very often the right one. The interesting questions are usually about access patterns and operations, not the database brand.

## Three reasons

### One tool, many uses

Postgres can be your relational store, your JSON store, a simple queue, and your full-text search. It is not the best at each, but it is good enough that you can often avoid adding three more systems.

### The operational story is written

Backups, replication, monitoring, migrations: all of it has been documented by people who have run Postgres for decades.

### SQL is a real interface

Your schema is a document. Anyone can read it.

## When not to

If you have a specific need where Postgres will clearly struggle, use the other tool. Just don't pick it only because it is newer.`
  },
  {
    slug: "what-a-portfolio-is-for",
    title: "What a portfolio is actually for",
    excerpt:
      "It isn't to prove you can code. It's to show you can think clearly and honestly about the right things.",
    date: "2024-04-03",
    author: "Alex Rivera",
    categories: ["Career"],
    tags: ["portfolio", "career", "writing"],
    readingTimeMinutes: 2,
    body: `## The wrong audience

Many developer portfolios are written for an imagined committee that will grade your CSS. In practice the reader is tired, skimming, and more interested in what you did than how.

## What they want to know

1. What problem you were solving.
2. What constraints you had.
3. What you did that was specific to *you*.
4. What happened afterwards.

You can answer all four in a paragraph. The paragraph is the portfolio.`
  }
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const allCategories = () => Array.from(new Set(posts.flatMap((p) => p.categories)));
export const allTags = () => Array.from(new Set(posts.flatMap((p) => p.tags)));
export const sortedPosts = () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export function relatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score:
        p.categories.filter((c) => current.categories.includes(c)).length * 2 +
        p.tags.filter((t) => current.tags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
