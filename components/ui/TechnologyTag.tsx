import { cn } from "@/lib/utils";

interface TechnologyTagProps {
  children: string;
  tone?: "default" | "accent" | "quiet";
  className?: string;
}

export function TechnologyTag({ children, tone = "default", className }: TechnologyTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[0.8125rem] leading-5 whitespace-nowrap",
        tone === "default" && "border-line bg-surface text-ink-muted",
        tone === "accent" && "border-transparent bg-accent-soft text-accent-strong",
        tone === "quiet" && "border-transparent bg-surface-muted text-ink-muted",
        "print:border-line print:bg-transparent print:px-1.5 print:py-0 print:text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({
  tags,
  tone,
  className,
  label,
}: {
  tags: string[];
  tone?: TechnologyTagProps["tone"];
  className?: string;
  label?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>
          <TechnologyTag tone={tone}>{tag}</TechnologyTag>
        </li>
      ))}
    </ul>
  );
}
