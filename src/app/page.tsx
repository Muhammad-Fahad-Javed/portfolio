import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { AvailabilityBadge } from "@/components/availability-badge";
import { CopyEmail } from "@/components/copy-email";
import { featuredProjects } from "@/content/projects";
import { experience, workTypes } from "@/content/experience";
import { capabilities, skillGroups } from "@/content/skills";
import { testimonials } from "@/content/testimonials";
import { siteConfig } from "@/config/site";
import { formatMonth } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  const projects = featuredProjects();
  const recent = experience.filter((e) => workTypes.includes(e.type)).slice(0, 3);
  const s = siteConfig.sections;

  return (
    <>
      {s.hero && <Hero />}

      {s.selectedProjects && projects.length > 0 && (
        <Section eyebrow="Selected work" title="Projects worth reading closely.">
          <div className="grid gap-12 md:grid-cols-2">
            {projects.map((p, i) => (
              <div key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <ProjectCard project={p} large={i === 0} />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/work" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
              All projects <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      )}

      {s.capabilities && (
        <Section eyebrow="Capabilities" title="What I actually do.">
          <div className="grid gap-10 md:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="border-t border-border pt-5">
                <h3 className="display text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {s.aboutPreview && (
        <Section eyebrow="About" title="A short introduction.">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <p className="max-w-2xl text-lg text-text-secondary">{siteConfig.person.longBio}</p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                More about me <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border bg-surface md:h-52 md:w-52">
              <Image
                src={siteConfig.person.avatar}
                alt={`Portrait of ${siteConfig.person.name}`}
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
          </div>
        </Section>
      )}

      {s.experiencePreview && recent.length > 0 && (
        <Section eyebrow="Experience" title="Where I've been.">
          <ul className="divide-y divide-border border-y border-border">
            {recent.map((e) => (
              <li key={e.id} className="grid gap-4 py-6 md:grid-cols-[14rem_1fr]">
                <p className="font-mono text-xs text-muted">
                  {formatMonth(e.start)} to {formatMonth(e.end)}
                </p>
                <div>
                  <p className="display text-lg">{e.role}</p>
                  <p className="text-sm text-text-secondary">
                    {e.organization} · {e.type}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm text-text-secondary">{e.description}</p>
                  {e.technologies && (
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {e.technologies.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/experience" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
              Full timeline <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      )}

      {s.techStack && (
        <Section eyebrow="Stack" title="Tools of the trade.">
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

      {s.testimonials && testimonials.length > 0 && (
        <Section
          eyebrow="Testimonials"
          title="What people say."
          description="Demonstration content. Replace these entries with real testimonials before publishing, or switch the section off in src/config/site.ts."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.id} className="rounded border border-border bg-surface p-6">
                <blockquote className="text-text">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-text-secondary">
                  {t.author} · {t.role}, {t.organization}
                  {t.demo && <span className="chip ms-2">Demo</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {s.contactCta && (
        <Section className="text-center">
          <AvailabilityBadge className="mb-6" />
          <h2 className="display mx-auto max-w-3xl text-4xl md:text-6xl">Have something worth building?</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            I take on a small number of engagements at a time. If you think we&apos;d work well together,
            write to me.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Contact <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={`mailto:${siteConfig.person.email}`} className="btn btn-secondary">
              {siteConfig.person.email}
            </a>
          </div>
          <div className="mt-4 flex justify-center">
            <CopyEmail email={siteConfig.person.email} />
          </div>
        </Section>
      )}
    </>
  );
}
