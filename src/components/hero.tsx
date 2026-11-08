import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ResumeButton } from "@/components/resume-button";
import { activeSocials } from "@/lib/social";
import { cn } from "@/lib/utils";

function Actions({ center }: { center?: boolean }) {
  const socials = activeSocials();
  return (
    <div className={cn("mt-8 flex flex-wrap items-center gap-3", center && "justify-center")}>
      <Link href="/work" className="btn btn-primary">
        View work <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <Link href="/contact" className="btn btn-secondary">
        Get in touch
      </Link>
      <ResumeButton className="btn btn-ghost" />
      {socials.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
          {socials.map((s) => (
            <li key={s.key}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 hover:text-text"
              >
                {s.label}
                <ArrowUpRight className="h-3 w-3" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Avatar({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden border border-border bg-surface", className)}>
      <Image
        src={siteConfig.person.avatar}
        alt={`Portrait of ${siteConfig.person.name}`}
        width={512}
        height={512}
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function EditorialHero() {
  return (
    <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
      <div className="max-w-3xl">
        <AvailabilityBadge className="mb-6" />
        <h1 className="display text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {siteConfig.person.name}
        </h1>
        <p className="mt-4 font-mono text-sm text-muted">{siteConfig.person.title}</p>
        <p className="mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
          {siteConfig.person.shortBio}
        </p>
        <Actions />
      </div>
      <Avatar className="mx-auto aspect-square w-44 rounded-full md:mx-0 md:w-60" />
    </div>
  );
}

function CenteredHero() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <Avatar className="mb-8 aspect-square w-28 rounded-full" />
      <AvailabilityBadge className="mb-6" />
      <h1 className="display text-5xl md:text-7xl">{siteConfig.person.name}</h1>
      <p className="mt-4 font-mono text-sm text-muted">{siteConfig.person.title}</p>
      <p className="mt-6 max-w-xl text-lg text-text-secondary">{siteConfig.person.shortBio}</p>
      <Actions center />
    </div>
  );
}

function SplitHero() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <div>
        <AvailabilityBadge className="mb-6" />
        <h1 className="display text-5xl md:text-6xl">{siteConfig.person.name}</h1>
        <p className="mt-3 font-mono text-sm text-muted">{siteConfig.person.title}</p>
        <p className="mt-6 max-w-lg text-lg text-text-secondary">{siteConfig.person.shortBio}</p>
        <Actions />
      </div>
      <Avatar className="mx-auto aspect-[4/5] w-full max-w-sm rounded-lg md:ms-auto" />
    </div>
  );
}

function TechnicalHero() {
  const rows: [string, string][] = [
    ["name", siteConfig.person.name],
    ["role", siteConfig.person.title],
    ["location", siteConfig.person.location]
  ];
  return (
    <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div>
        <AvailabilityBadge className="mb-6" />
        <h1 className="display text-4xl sm:text-5xl md:text-6xl">{siteConfig.person.name}</h1>
        <p className="mt-6 max-w-xl text-lg text-text-secondary">{siteConfig.person.shortBio}</p>
        <Actions />
      </div>
      <div className="overflow-hidden rounded border border-border bg-surface font-mono text-sm">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="space-y-1.5 p-4">
          <p className="text-muted">
            <span className="text-accent">$</span> whoami
          </p>
          {rows.map(([k, v]) => (
            <p key={k} className="text-text-secondary">
              <span className="text-muted">{k}:</span> {v}
            </p>
          ))}
          <p className="text-muted">
            <span className="text-accent">$</span> <span className="animate-pulse">_</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const layout = siteConfig.defaults.heroLayout;
  return (
    <section className="container-content section-y pt-12 md:pt-20" aria-label="Introduction">
      {layout === "centered" && <CenteredHero />}
      {layout === "split" && <SplitHero />}
      {layout === "technical" && <TechnicalHero />}
      {layout === "editorial" && <EditorialHero />}
    </section>
  );
}
