import Link from "next/link";
import { awards } from "@/data/awards";
import { projectHref } from "@/data/projects";
import type { Award } from "@/data/types";
import { cn } from "@/lib/utils";

function awardHref(award: Award): string | null {
  if (award.project) return projectHref(award.project);
  return null;
}

export function AwardItem({ award, className }: { award: Award; className?: string }) {
  const href = awardHref(award);
  return (
    <li className={cn("grid grid-cols-[3.25rem_1fr] gap-3 py-3.5", className)}>
      <span className="pt-0.5 font-mono text-[0.8125rem] text-ink-subtle">{award.year}</span>
      <div>
        <p className="text-[0.9375rem] font-medium text-ink">{award.title}</p>
        <p className="mt-0.5 text-sm text-ink-muted">
          {href ? (
            <Link href={href} className="underline decoration-line-strong underline-offset-4 hover:text-ink">
              {award.context}
            </Link>
          ) : (
            award.context
          )}
        </p>
      </div>
    </li>
  );
}

export function AwardsList({ className }: { className?: string }) {
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {awards.map((award) => (
        <AwardItem key={award.id} award={award} />
      ))}
    </ul>
  );
}
