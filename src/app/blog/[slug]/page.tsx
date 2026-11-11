import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ShareLinks } from "@/components/share-links";
import { getPost, posts, relatedPosts, sortedPosts } from "@/content/blog";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Unknown slugs return a server-rendered 404 (the global not-found page).
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Article not found" });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    author: post.author
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const ordered = sortedPosts();
  const idx = ordered.findIndex((p) => p.slug === post.slug);
  const newer = ordered[idx - 1];
  const older = ordered[idx + 1];
  const related = relatedPosts(post.slug);

  return (
    <article>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          date: post.date,
          author: post.author,
          url: `${siteConfig.url}/blog/${post.slug}`
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />

      <Section className="pt-12 md:pt-20">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-text">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All writing
        </Link>
        <p className="eyebrow mt-6">
          {formatDate(post.date)} · {post.readingTimeMinutes} min read
        </p>
        <h1 className="display mt-3 max-w-3xl text-4xl md:text-6xl">{post.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-text-secondary">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>By {post.author}</span>
          <span aria-hidden>·</span>
          {post.categories.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </Section>

      <div className="container-content">
        <div className="prose-content">{renderMarkdown(post.body)}</div>
        <div className="mt-10 border-t border-border pt-6">
          <ul className="mb-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className="chip font-mono">
                #{t}
              </li>
            ))}
          </ul>
          <ShareLinks title={post.title} path={`/blog/${post.slug}`} />
        </div>
      </div>

      {related.length > 0 && (
        <Section eyebrow="Related" title="Keep reading.">
          <ul className="divide-y divide-border border-y border-border">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="group block py-5">
                  <p className="font-mono text-xs text-muted">{formatDate(r.date)}</p>
                  <p className="display mt-1 text-lg group-hover:text-accent">{r.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <nav className="container-content border-t border-border py-8" aria-label="Article navigation">
        <div className="flex items-center justify-between gap-4">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text">
              <ArrowLeft className="h-4 w-4" aria-hidden /> {older.title}
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link href={`/blog/${newer.slug}`} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text">
              {newer.title} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  );
}
