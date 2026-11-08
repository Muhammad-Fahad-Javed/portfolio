import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Code2 } from "lucide-react";
import { getProject, projects, relatedProjects } from "@/content/projects";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";

interface Params {
  params: { slug: string };
}

// Unknown slugs return a server-rendered 404 (the global not-found page).
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) return buildMetadata({ title: "Project not found" });
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.cover
  });
}

function TextBlock({ title, text }: { title: string; text?: string }) {
  if (!text) return null;
  return (
    <section>
      <h2 className="display mb-3 text-2xl">{title}</h2>
      <p>{text}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section>
      <h2 className="display mb-3 text-2xl">{title}</h2>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];
  const related = relatedProjects(project.slug);

  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` }
        ])}
      />
      <Section className="pt-12 md:pt-20">
        <nav aria-label="Breadcrumb" className="text-xs text-muted">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-text">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/work" className="hover:text-text">Work</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-text-secondary">{project.title}</li>
          </ol>
        </nav>
        <p className="eyebrow mt-8">
          {project.category} · {project.year}
        </p>
        <h1 className="display mt-3 max-w-3xl text-4xl md:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-text-secondary">{project.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="btn btn-primary">
              <ExternalLink className="h-4 w-4" aria-hidden /> Live demo
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noreferrer noopener" className="btn btn-secondary">
              <Code2 className="h-4 w-4" aria-hidden /> Source code
            </a>
          )}
        </div>
      </Section>

      <div className="container-content">
        <div className="overflow-hidden rounded border border-border bg-surface">
          <div className="aspect-[16/9]">
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              width={1600}
              height={900}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 md:grid-cols-[16rem_1fr]">
          <aside className="space-y-6">
            <div>
              <p className="eyebrow mb-2">Technology</p>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="prose-content space-y-10">
            <TextBlock title="Overview" text={project.overview} />
            <TextBlock title="Problem" text={project.problem} />
            <ListBlock title="Goals" items={project.goals} />
            <TextBlock title="Solution" text={project.solution} />
            <ListBlock title="Process" items={project.process} />
            <TextBlock title="Architecture" text={project.architecture} />
            <ListBlock title="Main features" items={project.features} />
            <ListBlock title="Technical challenges" items={project.challenges} />
            <ListBlock title="Solutions implemented" items={project.solutions} />
            <ListBlock title="Outcomes" items={project.outcomes} />
          </div>
        </div>
      </Section>

      {project.gallery && project.gallery.length > 0 && (
        <Section eyebrow="Gallery" title="Images.">
          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((g) => (
              <div key={g.src} className="overflow-hidden rounded border border-border bg-surface">
                <Image src={g.src} alt={g.alt} width={1280} height={720} className="h-auto w-full" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section eyebrow="Related" title="More projects.">
          <div className="grid gap-12 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      <nav className="container-content border-t border-border py-8" aria-label="Project navigation">
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text">
              <ArrowLeft className="h-4 w-4" aria-hidden /> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/work/${next.slug}`} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text">
              {next.title} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  );
}
