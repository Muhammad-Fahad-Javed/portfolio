import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "Rust"] },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Radix UI", "Vite"] },
  { title: "Backend", items: ["Node.js", "Fastify", "FastAPI", "Drizzle", "Prisma"] },
  { title: "Databases", items: ["Postgres", "SQLite", "Redis"] },
  { title: "Cloud & deployment", items: ["Docker", "Fly.io", "Vercel", "GitHub Actions"] },
  { title: "Tools", items: ["Git", "Playwright", "Storybook", "Figma"] }
];

export const capabilities = [
  {
    title: "Frontend engineering",
    body: "Production React and Next.js applications with an emphasis on typing, accessibility, and performance."
  },
  {
    title: "Product & design systems",
    body: "Reusable component libraries, token pipelines, and interfaces that scale beyond their first page."
  },
  {
    title: "Backend & data",
    body: "TypeScript and Python services over Postgres, with a bias toward boring, well-understood architecture."
  }
];
