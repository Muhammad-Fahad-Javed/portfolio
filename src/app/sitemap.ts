import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const staticRoutes = ["", "/about", "/work", "/experience", "/blog", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now
  }));
  const projectRoutes = projects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified: now }));
  const blogRoutes = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) }));
  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
