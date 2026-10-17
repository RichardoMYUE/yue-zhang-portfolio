import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * Section title with a numbered eyebrow. `id` is placed on the <h2> so the
 * parent <section> can reference it via aria-labelledby.
 */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  lead,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <p className="eyebrow flex items-center gap-3">
          {index ? <span className="text-accent">{index}</span> : null}
          {index ? <span aria-hidden className="h-px w-6 bg-line-strong" /> : null}
          <span>{eyebrow}</span>
        </p>
        <h2
          id={id}
          className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-[2.125rem]"
        >
          {title}
        </h2>
        {lead ? (
          <div className="mt-4 max-w-[68ch] text-base leading-relaxed text-ink-muted sm:text-[1.0625rem]">
            {lead}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
