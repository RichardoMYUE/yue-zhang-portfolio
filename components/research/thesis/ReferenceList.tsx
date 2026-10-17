import { flagshipResearch } from "@/data/research";
import type { ReferenceId } from "@/data/types";

/** Number of a reference in the list, for inline citations like [1]. */
export function referenceNumber(id: ReferenceId): number {
  return flagshipResearch.references.findIndex((ref) => ref.id === id) + 1;
}

export function ReferenceList() {
  return (
    <ol className="space-y-4">
      {flagshipResearch.references.map((ref, index) => (
        <li
          key={ref.id}
          id={`ref-${ref.id}`}
          className="grid scroll-mt-24 grid-cols-[2rem_minmax(0,1fr)] gap-2 text-[0.9375rem] leading-relaxed"
        >
          <span className="font-mono text-[0.8125rem] leading-relaxed text-ink-subtle">[{index + 1}]</span>
          <div>
            <p className="text-ink">
              {ref.authors} <span className="italic">{ref.title}.</span> {ref.venue}, {ref.year}
              {ref.details ? `, ${ref.details}` : ""}.
            </p>
            <p className="mt-0.5 text-[0.8125rem] text-ink-subtle">Used here for: {ref.usedFor}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
