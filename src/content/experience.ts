import type { ExperienceEntry } from "@/types";

/** DEMO CONTENT. All entries are fictional. Replace with your own history. */
export const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    role: "Senior Full-Stack Developer",
    organization: "Northwind Studio (demo)",
    type: "Full-time",
    start: "2022-04",
    end: "Present",
    location: "Lisbon, Portugal · Remote",
    description:
      "Lead developer on client engagements covering design systems, product frontends, and small production services.",
    highlights: [
      "Led the design-system engagement described in the Camber case study",
      "Introduced Playwright-based parity testing across client work"
    ],
    technologies: ["TypeScript", "React", "Next.js", "Postgres", "Node.js"]
  },
  {
    id: "exp-2",
    role: "Frontend Engineer",
    organization: "Marrow Labs (demo)",
    type: "Full-time",
    start: "2019-09",
    end: "2022-03",
    location: "Porto, Portugal · Hybrid",
    description:
      "Frontend engineer on a mid-size SaaS product. Owned the migration from a legacy dashboard to React.",
    technologies: ["React", "TypeScript", "GraphQL", "Tailwind", "Vite"]
  },
  {
    id: "exp-3",
    role: "Freelance Developer",
    organization: "Independent",
    type: "Freelance",
    start: "2017-01",
    end: "2019-08",
    location: "Remote",
    description:
      "Independent contractor for small studios and founders: marketing sites, internal tools, and the occasional rescue project.",
    technologies: ["JavaScript", "React", "Node.js", "Postgres"]
  },
  {
    id: "edu-1",
    role: "BSc Computer Science",
    organization: "Demo University",
    type: "Education",
    start: "2013-09",
    end: "2017-06",
    location: "Coimbra, Portugal",
    description: "Focused on distributed systems and human-computer interaction."
  },
  {
    id: "cert-1",
    role: "Example Certification (demo)",
    organization: "Demo Certifying Body",
    type: "Certification",
    start: "2023-02",
    end: "2026-02",
    description: "Placeholder entry showing how certifications are displayed."
  }
];

export const workTypes: ExperienceEntry["type"][] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship"
];
