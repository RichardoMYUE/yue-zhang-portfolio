import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TagList } from "@/components/ui/TechnologyTag";
import { flagshipResearch as thesis } from "@/data/research";
import { formatPeriod } from "@/lib/utils";
import { ResearchArchitectureDiagram } from "./ResearchArchitectureDiagram";

/**
 * The flagship project block — the largest content block on the homepage.
 * Order: research problem → what was investigated → architecture →
 * what Yue did → data and evaluation.
 */
export function FeaturedResearch() {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="border-b border-line bg-surface-muted/50 px-5 py-3 sm:px-8">
        <ul className="flex flex-col gap-y-1 font-mono text-[0.75rem] text-ink-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
          <li className="font-medium text-accent">{thesis.type}</li>
          <li aria-hidden className="hidden text-line-strong sm:block">
            /
          </li>
          <li>{thesis.institution}</li>
          <li aria-hidden className="hidden text-line-strong sm:block">
            /
          </li>
          <li>{formatPeriod(thesis.period).replace(" – ", "–")}</li>
        </ul>
      </div>

      <div className="px-5 pt-8 pb-8 sm:px-8 sm:pt-10">
        <h3 className="max-w-4xl font-serif text-[1.75rem] leading-tight font-semibold tracking-tight text-ink sm:text-[2.125rem]">
          {thesis.title}
        </h3>
        <div className="mt-5 grid gap-x-10 gap-y-3 text-[1.0625rem] leading-relaxed lg:grid-cols-2">
          <p className="text-ink">{thesis.narrative[0]}</p>
          <p className="text-ink-muted">{thesis.narrative[1]}</p>
        </div>

        <div className="mt-10">
          <ResearchArchitectureDiagram />
        </div>

        <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="eyebrow">My contribution</p>
            <ul className="mt-3 space-y-2">
              {thesis.contributions.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <p className="eyebrow">Tools, models & data</p>
              <TagList tags={thesis.technologies} className="mt-3" label="Tools, models and data" />
            </div>
            <div>
              <p className="eyebrow">Evaluation data</p>
              <p className="mt-2 text-[0.9375rem] text-ink-muted">
                {thesis.datasets.map((dataset) => dataset.title).join(" · ")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[60ch] text-[0.9375rem] text-ink-muted">
            Problem, method, evaluation methodology and how this work could extend towards 3D
            perception and grasp planning.
          </p>
          <ButtonLink href={thesis.href} className="shrink-0">
            Read the full project
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
