import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/ui/TechnologyTag";
import { education, internationalExperience } from "@/data/education";
import type { EducationEntry, ExperienceEntry } from "@/data/types";
import { cn, formatPeriod } from "@/lib/utils";

type TimelineItem =
  | { kind: "education"; entry: EducationEntry }
  | { kind: "experience"; entry: ExperienceEntry };

/** "10/2026" → sortable number. */
function sortKey(period: { start: string }) {
  const [month, year] = period.start.includes("/")
    ? period.start.split("/").map(Number)
    : [1, Number(period.start)];
  return year * 12 + month;
}

function journey(): TimelineItem[] {
  const items: TimelineItem[] = [
    ...education.map((entry) => ({ kind: "education" as const, entry })),
    ...internationalExperience.map((entry) => ({ kind: "experience" as const, entry })),
  ];
  return items.sort((a, b) => sortKey(b.entry.period) - sortKey(a.entry.period));
}

interface EducationTimelineProps {
  /** Number of courses to show per degree (all when omitted). */
  courseLimit?: number;
}

/** Education and international experience, newest first. */
export function EducationTimeline({ courseLimit }: EducationTimelineProps) {
  const items = journey();

  return (
    <ol className="relative">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        const current = item.kind === "education" && item.entry.current;
        const minor = item.kind === "experience";
        return (
          <li key={item.entry.id} className={cn("relative pl-8", !last && "pb-9")}>
            {!last ? (
              <span aria-hidden className="absolute top-3 bottom-0 left-[0.3125rem] w-px bg-line" />
            ) : null}
            <span
              aria-hidden
              className={cn(
                "absolute rounded-full border-2",
                minor
                  ? "top-[0.5rem] left-[0.0625rem] size-2.5 border-line-strong bg-paper"
                  : "top-[0.4375rem] left-0 size-3",
                !minor && (current ? "border-accent bg-accent" : "border-ink-subtle bg-paper"),
              )}
            />

            <p className="font-mono text-[0.75rem] text-ink-subtle">
              {formatPeriod(item.entry.period)}
              {current ? (
                <span className="ml-2 rounded bg-accent-soft px-1.5 py-0.5 text-accent-strong">
                  current
                </span>
              ) : null}
            </p>

            {item.kind === "education" ? (
              <>
                <h3 className="mt-1.5 text-lg leading-snug font-medium text-ink">
                  {item.entry.degree}
                </h3>
                <p className="mt-0.5 text-[0.9375rem] text-ink-muted">
                  {item.entry.institution}
                  <span className="text-ink-subtle"> · {item.entry.location}</span>
                </p>

                {item.entry.focus ? (
                  <div className="mt-3">
                    <p className="mb-1.5 text-sm text-ink-subtle">{item.entry.focusLabel}</p>
                    <TagList tags={item.entry.focus} tone="quiet" label={item.entry.focusLabel} />
                  </div>
                ) : null}

                {item.entry.thesis ? (
                  <p className="mt-3 text-[0.9375rem] text-ink-muted">
                    <span className="text-ink-subtle">Thesis: </span>
                    <Link
                      href={item.entry.thesis.href}
                      className="inline-flex items-start gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                    >
                      {item.entry.thesis.label}
                      <ArrowUpRight aria-hidden className="mt-1 size-3.5 shrink-0 text-ink-subtle" />
                    </Link>
                  </p>
                ) : null}

                {item.entry.coursework ? (
                  <p className="mt-2 text-sm leading-relaxed text-ink-subtle">
                    <span className="text-ink-muted">Coursework: </span>
                    {(courseLimit ? item.entry.coursework.slice(0, courseLimit) : item.entry.coursework).join(
                      " · ",
                    )}
                    {courseLimit && item.entry.coursework.length > courseLimit ? " · …" : null}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <h3 className="mt-1.5 text-base leading-snug font-medium text-ink">
                  {item.entry.title}
                </h3>
                <p className="mt-0.5 text-sm text-ink-muted">
                  {item.entry.institution ? `${item.entry.institution} · ` : null}
                  {item.entry.location}
                </p>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
