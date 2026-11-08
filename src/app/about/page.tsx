import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { ResumeButton } from "@/components/resume-button";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/content/about";
import { skillGroups } from "@/content/skills";
import { experience } from "@/content/experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  path: "/about",
  description: `About ${siteConfig.person.name}: ${siteConfig.person.title}.`
});

export default function AboutPage() {
  const education = experience.filter((e) => e.type === "Education");
  const a = siteConfig.aboutSections;

  return (
    <>
      <Section className="pt-12 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="eyebrow mb-3">About</p>
            <h1 className="display max-w-3xl text-4xl md:text-6xl">{aboutContent.headline}</h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">{siteConfig.person.longBio}</p>
            <div className="mt-6">
              <ResumeButton />
            </div>
          </div>
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border bg-surface md:h-56 md:w-56">
            <Image
              src={siteConfig.person.avatar}
              alt={`Portrait of ${siteConfig.person.name}`}
              fill
              sizes="224px"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {a.philosophy && aboutContent.philosophy.length > 0 && (
        <Section eyebrow="Philosophy" title="How I work.">
          <div className="prose-content">
            {aboutContent.philosophy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>
      )}

      {a.skills && (
        <Section eyebrow="Skills" title="Technical focus.">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <p className="eyebrow mb-3">{g.title}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <li key={i} className="chip">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(a.interests || a.goals) && (
        <Section eyebrow="Beyond the code" title="Interests & goals.">
          <div className="grid gap-10 md:grid-cols-2">
            {a.interests && aboutContent.interests.length > 0 && (
              <div>
                <h3 className="display text-xl">Interests</h3>
                <ul className="prose-content mt-3">
                  {aboutContent.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            )}
            {a.goals && aboutContent.goals && (
              <div>
                <h3 className="display text-xl">Career goals</h3>
                <p className="prose-content mt-3">{aboutContent.goals}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {a.education && education.length > 0 && (
        <Section eyebrow="Education" title="Formal background.">
          <ul className="divide-y divide-border border-y border-border">
            {education.map((e) => (
              <li key={e.id} className="grid gap-2 py-5 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="display text-lg">{e.role}</p>
                  <p className="text-sm text-text-secondary">{e.organization}</p>
                </div>
                <p className="font-mono text-xs text-muted">
                  {e.start.slice(0, 4)} to {e.end.slice(0, 4)}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section className="text-center">
        <h2 className="display mx-auto max-w-2xl text-3xl md:text-5xl">Want to work together?</h2>
        <div className="mt-6">
          <Link href="/contact" className="btn btn-primary">
            Get in touch
          </Link>
        </div>
      </Section>
    </>
  );
}
