import { serializeJsonLd } from "@/lib/seo";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Safe: serializeJsonLd escapes "<" and the data comes from our own config/content.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
