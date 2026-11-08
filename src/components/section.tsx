import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  description,
  children,
  id,
  className,
  headingLevel = 2
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  id?: string;
  className?: string;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id={id} className={cn("container-content section-y", className)}>
      {(eyebrow || title) && (
        <header className="mb-10 max-w-2xl md:mb-14">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {title && (
            <Heading
              className={cn("display", headingLevel === 1 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl")}
            >
              {title}
            </Heading>
          )}
          {description && <p className="mt-4 text-text-secondary">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
