export type AvailabilityStatus = "available" | "open" | "unavailable";

export type SocialKey =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "dribbble"
  | "behance"
  | "youtube"
  | "website";

export type PresetKey = "editorial" | "minimal" | "technical";
export type HeroLayout = "editorial" | "centered" | "split" | "technical";
export type Locale = "en" | "ur" | "ar";

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  cover: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  year: string;
  overview?: string;
  problem?: string;
  goals?: string[];
  solution?: string;
  process?: string[];
  architecture?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  outcomes?: string[];
  gallery?: { src: string; alt: string }[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  type:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Freelance"
    | "Internship"
    | "Education"
    | "Certification"
    | "Achievement";
  start: string;
  end: string;
  location?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  logo?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  image?: string;
  demo: true;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
  featured?: boolean;
  readingTimeMinutes: number;
  body: string;
}
