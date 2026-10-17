import { flagshipResearch } from "@/data/research";

/** Explains the loss added in the thesis: edge existence vs. edge orientation. */
export function DirectionConstraint() {
  const { direction } = flagshipResearch;

  return (
    <div className="space-y-6">
      <p className="max-w-[70ch] leading-relaxed text-ink-muted">{direction.gap}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="eyebrow">Baseline · dense-graph BCE</p>
          <p className="mt-2 text-[0.9375rem] font-medium text-ink">Learns edge existence</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
            {direction.supervises.baseline}
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent-soft/40 p-5">
          <p className="eyebrow text-accent">Added in this thesis · direction loss</p>
          <p className="mt-2 text-[0.9375rem] font-medium text-ink">Learns edge orientation</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
            {direction.supervises.direction}
          </p>
        </div>
      </div>

      <div>
        <p className="max-w-[70ch] leading-relaxed text-ink">{direction.idea}</p>
        <ol className="mt-4 max-w-[70ch] space-y-2">
          {direction.rules.map((rule, index) => (
            <li key={rule} className="grid grid-cols-[1.75rem_1fr] gap-2 text-[0.9375rem] leading-relaxed text-ink-muted">
              <span className="font-mono text-[0.8125rem] leading-relaxed text-ink-subtle">
                {index + 1}.
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-line bg-surface px-5 py-4">
        <p className="eyebrow">Training objective</p>
        <p className="mt-2 overflow-x-auto font-mono text-[0.9375rem] whitespace-nowrap text-ink">
          {direction.objective}
        </p>
        <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-1 font-mono text-[0.8125rem]">
          {direction.weights.map((weight) => (
            <div key={weight.label} className="flex gap-2">
              <dt className="text-ink-muted">{weight.label}</dt>
              <dd className="font-mono text-ink">= {weight.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
