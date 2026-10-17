import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { TagList } from "@/components/ui/TechnologyTag";
import type { PillarId, ResearchPillar } from "@/data/types";
import { cn } from "@/lib/utils";

export const pillarColor: Record<PillarId, { color: string; soft: string }> = {
  perception: { color: "var(--perception)", soft: "var(--perception-soft)" },
  understanding: { color: "var(--understanding)", soft: "var(--understanding-soft)" },
  manipulation: { color: "var(--manipulation)", soft: "var(--manipulation-soft)" },
};

interface ResearchCardProps {
  pillar: ResearchPillar;
  /** Show guiding questions (used on /research). */
  showQuestions?: boolean;
  className?: string;
}

/** One research theme ("pillar") with its methods and where it appears in Yue's work. */
export function ResearchCard({ pillar, showQuestions = false, className }: ResearchCardProps) {
  const tone = pillarColor[pillar.id];

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong",
        className,
      )}
      style={{ "--pillar": tone.color, "--pillar-soft": tone.soft } as CSSProperties}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex size-9 items-center justify-center rounded-lg font-mono text-sm font-medium"
          style={{ background: "var(--pillar-soft)", color: "var(--pillar)" }}
        >
          {pillar.index}
        </span>
        <span aria-hidden className="h-px flex-1" style={{ background: "var(--pillar)", opacity: 0.35 }} />
      </div>

      <h3 className="mt-5 font-serif text-[1.375rem] leading-snug font-semibold text-ink">
        {pillar.title}
      </h3>
      <p className="mt-3 leading-relaxed text-ink-muted">{pillar.description}</p>

      {showQuestions ? (
        <div className="mt-5">
          <p className="eyebrow">Questions I would like to study</p>
          <ul className="mt-2 space-y-2">
            {pillar.questions.map((question) => (
              <li key={question} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink">
                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0" style={{ background: "var(--pillar)" }} />
                {question}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5">
        <p className="eyebrow">{pillar.methodsLabel}</p>
        <TagList tags={pillar.methods} tone="quiet" className="mt-2" label={pillar.methodsLabel} />
      </div>

      <div className="mt-auto pt-6">
        <div className="border-t border-line pt-4">
          <p className="eyebrow">In my work</p>
          <ul className="mt-2 space-y-1.5">
            {pillar.relatedWork.map((work) => (
              <li key={work.label}>
                <Link
                  href={work.href}
                  className="group inline-flex items-start gap-1.5 text-[0.875rem] leading-snug text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-[var(--pillar)]">
                    {work.label}
                  </span>
                  <ArrowUpRight aria-hidden className="mt-0.5 size-3.5 shrink-0 text-ink-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
