import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/ui/TechnologyTag";
import { education } from "@/data/education";
import { cn, formatPeriod } from "@/lib/utils";

interface EducationTimelineProps {
  /** Number of courses to show per degree (all when omitted). */
  courseLimit?: number;
}

/** Degree timeline only. International experience is shown separately on the CV. */
export function EducationTimeline({ courseLimit }: EducationTimelineProps) {
  return (
    <ol className="relative">
      {education.map((entry, index) => {
        const last = index === education.length - 1;
        return (
          <li key={entry.id} className={cn("relative pl-8", !last && "pb-9")}>
            {!last ? (
              <span aria-hidden className="absolute top-3 bottom-0 left-[0.3125rem] w-px bg-line" />
            ) : null}
            <span
              aria-hidden
              className={cn(
                "absolute top-[0.4375rem] left-0 size-3 rounded-full border-2",
                entry.current ? "border-accent bg-accent" : "border-ink-subtle bg-paper",
              )}
            />

            <p className="font-mono text-[0.75rem] text-ink-subtle">
              {formatPeriod(entry.period)}
              {entry.current ? (
                <span className="ml-2 rounded bg-accent-soft px-1.5 py-0.5 text-accent-strong">
                  current
                </span>
              ) : null}
            </p>

            <h3 className="mt-1.5 text-lg leading-snug font-medium text-ink">{entry.degree}</h3>
            <p className="mt-0.5 text-[0.9375rem] text-ink-muted">
              {entry.institution}
              <span className="text-ink-subtle"> · {entry.location}</span>
            </p>

            {entry.focus ? (
              <div className="mt-3">
                <p className="mb-1.5 text-sm text-ink-subtle">{entry.focusLabel}</p>
                <TagList tags={entry.focus} tone="quiet" label={entry.focusLabel} />
              </div>
            ) : null}

            {entry.thesis ? (
              <p className="mt-3 text-[0.9375rem] text-ink-muted">
                <span className="text-ink-subtle">Thesis: </span>
                <Link
                  href={entry.thesis.href}
                  className="inline-flex items-start gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                >
                  {entry.thesis.label}
                  <ArrowUpRight aria-hidden className="mt-1 size-3.5 shrink-0 text-ink-subtle" />
                </Link>
              </p>
            ) : null}

            {entry.coursework ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-subtle">
                <span className="text-ink-muted">Coursework: </span>
                {(courseLimit ? entry.coursework.slice(0, courseLimit) : entry.coursework).join(" · ")}
                {courseLimit && entry.coursework.length > courseLimit ? " · …" : null}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
