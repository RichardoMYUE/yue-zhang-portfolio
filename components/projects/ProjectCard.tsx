import { ArrowRight, Award as AwardIcon } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/ui/TechnologyTag";
import { getAwardsForProject } from "@/data/awards";
import { projectHref } from "@/data/projects";
import type { Project } from "@/data/types";
import { cn, formatPeriod } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** "full": standard card. "compact": single row, visually quieter. */
  variant?: "full" | "compact";
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function ProjectCard({
  project,
  variant = "full",
  headingLevel = "h3",
  className,
}: ProjectCardProps) {
  const Heading = headingLevel;
  const awards = getAwardsForProject(project.slug);
  const href = projectHref(project.slug);

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "group relative flex flex-col gap-3 rounded-xl border border-line bg-surface/60 px-5 py-4 transition-colors hover:border-line-strong sm:flex-row sm:items-center sm:gap-6",
          className,
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.6875rem] tracking-wide text-ink-subtle uppercase">
            {project.area} · {project.role} · {formatPeriod(project.period)}
          </p>
          <Heading className="mt-1 text-base font-medium text-ink">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-xl">
              {project.title}
            </Link>
          </Heading>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        </div>
        <TagList tags={project.tags.slice(0, 4)} tone="quiet" className="sm:max-w-[16rem] sm:justify-end" />
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow text-accent">{project.area}</p>
        <p className="font-mono text-[0.75rem] text-ink-subtle">{formatPeriod(project.period)}</p>
      </div>
      <Heading className="mt-3 font-serif text-[1.375rem] leading-snug font-semibold text-ink">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl">
          {project.title}
        </Link>
      </Heading>
      <p className="mt-1 text-sm text-ink-subtle">{project.role}</p>
      <p className="mt-4 leading-relaxed text-ink-muted">{project.summary}</p>

      {awards.length > 0 ? (
        <ul className="mt-5 space-y-1.5" aria-label="Awards">
          {awards.map((award) => (
            <li key={award.id} className="flex items-center gap-2 text-sm text-ink">
              <AwardIcon aria-hidden className="size-4 shrink-0 text-manipulation" />
              <span>
                {award.title} <span className="text-ink-subtle">— {award.year}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        <TagList tags={project.tags} tone="quiet" />
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Project details
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}
