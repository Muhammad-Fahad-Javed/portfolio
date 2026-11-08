import { Section } from "@/components/section";
import { BlogBrowser } from "@/components/blog-browser";
import { allCategories, sortedPosts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  path: "/blog",
  description: "Notes on building things."
});

export default function BlogPage() {
  return (
    <Section
      eyebrow="Writing"
      title="Notes on building things."
      headingLevel={1}
      className="pt-12 md:pt-20"
      description="Demo articles. Replace them in src/content/blog.ts."
    >
      <BlogBrowser posts={sortedPosts()} categories={allCategories()} />
    </Section>
  );
}
