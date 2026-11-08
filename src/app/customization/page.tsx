import { Section } from "@/components/section";
import { Playground } from "@/components/playground";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ title: "Customization", path: "/customization" }),
  robots: { index: false, follow: true }
};

export default function CustomizationPage() {
  return (
    <Section
      eyebrow="Customization"
      title="Design playground"
      headingLevel={1}
      className="pt-12 md:pt-20"
      description="Preview a configuration, then copy the snippet into your config files. This is a preview tool: it does not export a finished website."
    >
      <Playground />
    </Section>
  );
}
