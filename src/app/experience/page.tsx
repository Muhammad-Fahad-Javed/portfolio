import Image from "next/image";
import { Section } from "@/components/section";
import { ResumeButton } from "@/components/resume-button";
import { experience } from "@/content/experience";
import { formatMonth } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience",
  path: "/experience",
  description: "Work history, education and certifications."
});

const groups: { label: string; types: string[] }[] = [
  { label: "Work", types: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"] },
  { label: "Education", types: ["Education"] },
  { label: "Certifications", types: ["Certification"] },
  { label: "Achievements", types: ["Achievement"] }
];

export default function ExperiencePage() {
  return (
    <Section
      eyebrow="Experience"
      title="A timeline."
      headingLevel={1}
      className="pt-12 md:pt-20"
      description="Roles, education and certifications."
    >
      <div className="space-y-14">
        {groups.map((group) => {
          const items = experience.filter((e) => group.types.includes(e.type));
          if (items.length === 0) return null;
          return (
            <div key={group.label}>
              <h2 className="eyebrow mb-4">{group.label}</h2>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((e) => (
                  <li key={e.id} className="grid gap-4 py-6 md:grid-cols-[12rem_1fr]">
                    <div>
                      <p className="font-mono text-xs text-muted">
                        {formatMonth(e.start)} to {formatMonth(e.end)}
                      </p>
                      {e.location && <p className="mt-1 text-xs text-muted">{e.location}</p>}
                    </div>
                    <div className="flex gap-4">
                      {e.logo && (
                        <Image
                          src={e.logo}
                          alt={`${e.organization} logo`}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded border border-border object-contain"
                        />
                      )}
                      <div>
                        <h3 className="display text-lg">{e.role}</h3>
                        <p className="text-sm text-text-secondary">
                          {e.organization} <span className="text-muted">· {e.type}</span>
                        </p>
                        <p className="mt-2 max-w-2xl text-sm text-text-secondary">{e.description}</p>
                        {e.highlights && e.highlights.length > 0 && (
                          <ul className="mt-3 list-disc space-y-1 ps-5 text-sm text-text-secondary">
                            {e.highlights.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        )}
                        {e.technologies && e.technologies.length > 0 && (
                          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                            {e.technologies.map((t) => (
                              <li key={t} className="chip">
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <ResumeButton />
      </div>
    </Section>
  );
}
