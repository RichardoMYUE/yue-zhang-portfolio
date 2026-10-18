import { Fragment } from "react";
import {
  THESIS_METRIC_COLUMNS,
  THESIS_SPLITS,
  compareThesisModels,
  flagshipResearch,
} from "@/data/research";
import type { ThesisModelId, ThesisResultRow } from "@/data/types";
import { cn } from "@/lib/utils";

const SHORT_NAME: Record<ThesisModelId, string> = {
  baseline: "Baseline",
  direction: "+ Direction loss",
};

/**
 * Complete thesis Table 4-2: both runs on every split. Within each split
 * the higher of the two values is set in medium weight; ties stay plain.
 * No deltas or percentages — the numbers are shown as reported.
 */
export function ResultsTable() {
  const { rows, models, source } = flagshipResearch.results;

  function row(model: ThesisModelId, split: ThesisResultRow["split"]) {
    return rows.find((r) => r.model === model && r.split === split);
  }

  return (
    <div>
      <dl className="mb-4 grid gap-3 text-[0.875rem] sm:grid-cols-2">
        {models.map((model) => (
          <div key={model.id} className="rounded-lg border border-line bg-surface px-4 py-3">
            <dt className="font-medium text-ink">
              <span className="mr-2 font-mono text-[0.75rem] text-accent">{SHORT_NAME[model.id]}</span>
              {model.name}
            </dt>
            <dd className="mt-0.5 text-ink-muted">{model.description}</dd>
          </div>
        ))}
      </dl>

      <p className="mb-2 text-[0.75rem] text-ink-subtle sm:hidden">Scroll sideways to see all seven metrics →</p>
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[44rem] border-collapse text-left text-[0.875rem] tabular-nums">
          <caption className="sr-only">
            Relation-prediction results of the baseline run and the direction-constrained run on the
            easy, medium and hard test splits ({source}).
          </caption>
          <thead>
            <tr className="border-b border-line text-[0.75rem] text-ink-subtle">
              <th scope="col" className="px-4 py-3 font-normal">
                Split
              </th>
              <th scope="col" className="px-4 py-3 font-normal">
                Run
              </th>
              {THESIS_METRIC_COLUMNS.map((column) => (
                <th key={column.key} scope="col" className="px-3 py-3 text-right font-mono font-normal">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {THESIS_SPLITS.map((split, splitIndex) => {
              const base = row("baseline", split);
              const dir = row("direction", split);
              if (!base || !dir) return null;
              return (
                <Fragment key={split}>
                  {[base, dir].map((current, i) => {
                    const other = i === 0 ? dir : base;
                    return (
                      <tr
                        key={current.model}
                        className={cn(
                          i === 0 && splitIndex > 0 && "border-t border-line",
                          i === 1 && "bg-surface-muted/40",
                        )}
                      >
                        {i === 0 ? (
                          <th
                            scope="rowgroup"
                            rowSpan={2}
                            className="px-4 py-2.5 align-top font-mono text-[0.8125rem] font-normal text-ink"
                          >
                            {split}
                          </th>
                        ) : null}
                        <th scope="row" className="px-4 py-2.5 text-[0.8125rem] font-normal whitespace-nowrap text-ink-muted">
                          {SHORT_NAME[current.model]}
                        </th>
                        {THESIS_METRIC_COLUMNS.map(({ key }) => {
                          const higher = current[key] > other[key];
                          return (
                            <td
                              key={key}
                              className={cn(
                                "px-3 py-2.5 text-right font-mono text-[0.8125rem]",
                                higher ? "font-medium text-ink" : "text-ink-muted",
                              )}
                            >
                              {current[key].toFixed(3)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[0.75rem] text-ink-subtle">
        {source}. Darker figure = higher of the two runs on that split; equal values are left plain.
      </p>

      <ul className="mt-5 space-y-1.5 text-[0.875rem] text-ink-muted">
        {THESIS_SPLITS.map((split) => {
          const { higher, lower, equal } = compareThesisModels(split);
          return (
            <li key={split} className="grid gap-x-3 sm:grid-cols-[4.5rem_minmax(0,1fr)]">
              <span className="font-mono text-[0.8125rem] text-ink">{split}</span>
              <span>
                With the direction loss —{" "}
                <span className="text-ink">higher:</span> {higher.length ? higher.join(", ") : "none"}
                {"; "}
                <span className="text-ink">lower:</span> {lower.length ? lower.join(", ") : "none"}
                {equal.length ? `; equal: ${equal.join(", ")}` : ""}.
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
