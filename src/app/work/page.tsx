import { Section } from "@/components/section";
import { WorkBrowser } from "@/components/work-browser";
import { projectCategories, projectTags, projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work",
  path: "/work",
  description: "Selected projects and case studies."
});

export default function WorkPage() {
  return (
    <Section
      eyebrow="Work"
      title="Selected projects."
      headingLevel={1}
      className="pt-12 md:pt-20"
      description="Filter by category or technology, or search by keyword."
    >
      <WorkBrowser projects={projects} categories={projectCategories()} tags={projectTags()} />
    </Section>
  );
}
