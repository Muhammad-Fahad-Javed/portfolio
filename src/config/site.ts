import type {
  AvailabilityStatus,
  HeroLayout,
  Locale,
  NavItem,
  PresetKey,
  SocialKey
} from "@/types";

/**
 * Canonical site URL, in priority order:
 * 1. NEXT_PUBLIC_SITE_URL when set. Always set this for production.
 * 2. Vercel production deployments: the project's production domain.
 * 3. Vercel preview deployments: that deployment's own URL, so canonicals never
 *    point at the wrong host.
 * 4. localhost for local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  /** Product / brand name. Change this once and it updates everywhere. */
  name: "FRAME",
  tagline: "Premium Developer Portfolio System",
  url: resolveSiteUrl(),

  /** "en" | "ur" | "ar". Controls <html lang> and text direction. See DOCUMENTATION.md. */
  locale: "en" as Locale,

  person: {
    name: "Alex Rivera",
    title: "Full-Stack Developer & Interface Engineer",
    shortBio:
      "I design and build thoughtful web products, from design systems and marketing sites to production APIs. Currently focused on TypeScript, React, and pragmatic backend architecture.",
    longBio:
      "I'm a developer who cares about the seams: the gap between a design file and a shipped interface, between a spec and a real product, between an elegant data model and a database that survives production. I've spent the last seven years in that gap, shipping interfaces and services for small teams and independent studios. My work tends to be quiet, fast, and easy for the next person to pick up.",
    email: "hello@example.com",
    location: "Lisbon, Portugal",
    avatar: "/images/avatar.svg",
    /** Set to e.g. "/resume/resume.pdf" after adding the file. Empty string hides every resume button. */
    resumeUrl: ""
  },

  /** Only non-empty entries are rendered. */
  social: {
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example",
    x: "https://x.com/example",
    instagram: "",
    dribbble: "",
    behance: "",
    youtube: "",
    website: ""
  } as Partial<Record<SocialKey, string>>,

  availability: {
    status: "available" as AvailabilityStatus,
    labels: {
      available: "Available for new projects",
      open: "Open to opportunities",
      unavailable: "Not currently available"
    }
  },

  defaults: {
    /** "light" | "dark" | "system" is handled by next-themes; this is only the first-visit default. */
    theme: "system" as "light" | "dark" | "system",
    /** "editorial" | "minimal" | "technical" */
    preset: "editorial" as PresetKey,
    /** "editorial" | "centered" | "split" | "technical" */
    heroLayout: "editorial" as HeroLayout
  },

  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Experience", href: "/experience" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" }
  ] satisfies NavItem[],

  /** Toggle homepage sections. */
  sections: {
    hero: true,
    selectedProjects: true,
    capabilities: true,
    aboutPreview: true,
    experiencePreview: true,
    techStack: true,
    testimonials: true,
    contactCta: true
  },

  /** Toggle optional parts of the About page. */
  aboutSections: {
    philosophy: true,
    skills: true,
    interests: true,
    goals: true,
    education: true
  },

  seo: {
    defaultTitle: "Alex Rivera | Full-Stack Developer",
    titleTemplate: "%s · Alex Rivera",
    description:
      "Portfolio of Alex Rivera, a full-stack developer building thoughtful web products with TypeScript, React, and pragmatic backend architecture."
  }
};

export type SiteConfig = typeof siteConfig;

export function availabilityLabel(): string {
  return siteConfig.availability.labels[siteConfig.availability.status];
}
