import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <article className="group">
      <Link href={`/work/${project.slug}`} className="block">
        <div className="overflow-hidden rounded border border-border bg-surface">
          <div className={large ? "aspect-[16/9]" : "aspect-[4/3]"}>
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              width={1280}
              height={720}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">
              {project.category} · {project.year}
            </p>
            <h3 className="display mt-2 text-xl md:text-2xl">{project.title}</h3>
            <p className="mt-2 max-w-prose text-sm text-text-secondary">{project.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
            aria-hidden
          />
        </div>
      </Link>
    </article>
  );
}
