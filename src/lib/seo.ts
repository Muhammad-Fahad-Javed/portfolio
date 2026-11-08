import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface SeoArgs {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  publishedTime,
  author
}: SeoArgs = {}): Metadata {
  const fullTitle = title
    ? siteConfig.seo.titleTemplate.replace("%s", title)
    : siteConfig.seo.defaultTitle;
  const desc = description ?? siteConfig.seo.description;
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const img = `${siteConfig.url}${image ?? "/images/og-default.svg"}`;

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      images: [{ url: img }],
      type,
      ...(type === "article" && publishedTime
        ? { publishedTime, authors: author ? [author] : undefined }
        : {})
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [img]
    }
  };
}

/** Serialize JSON-LD safely for inline <script>. Escapes "<" so content cannot close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter((u): u is string => !!u);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.person.name,
    jobTitle: siteConfig.person.title,
    url: siteConfig.url,
    email: siteConfig.person.email,
    ...(sameAs.length ? { sameAs } : {})
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url
  };
}

export function articleJsonLd(args: {
  title: string;
  description: string;
  date: string;
  author: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    datePublished: args.date,
    author: { "@type": "Person", name: args.author },
    mainEntityOfPage: args.url
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path}`
    }))
  };
}
