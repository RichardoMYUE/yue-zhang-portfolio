import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { flagshipResearch as thesis } from "@/data/research";
import { formatPeriod } from "@/lib/utils";
import { ResearchArchitectureDiagram } from "./ResearchArchitectureDiagram";

/**
 * The flagship project block — the largest content block on the homepage.
 * Order: research problem → what was done → architecture → what Yue did →
 * evidence (how it was evaluated, and what came out).
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
          <li>{formatPeriod(thesis.period)}</li>
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

        <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="eyebrow">What I did</p>
            <ul className="mt-3 space-y-2">
              {thesis.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-subtle">{thesis.creditLine}</p>
          </div>
          <div>
            <p className="eyebrow">Evidence</p>
            <dl className="mt-3 divide-y divide-line rounded-xl border border-line">
              {thesis.evidence.map((item) => (
                <div key={item.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 px-4 py-2.5 text-[0.875rem]">
                  <dt className="text-ink-subtle">{item.label}</dt>
                  <dd className="text-ink">{item.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 px-4 py-2.5 text-[0.875rem]">
                <dt className="text-ink-subtle">Outcome</dt>
                <dd className="text-ink">
                  {thesis.outcome}{" "}
                  <Link
                    href={`${thesis.href}#results`}
                    className="whitespace-nowrap text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                  >
                    Full results
                  </Link>
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-[0.8125rem] text-ink-subtle">
              {thesis.technologies.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[60ch] text-[0.9375rem] text-ink-muted">
            Method, direction constraint, setup, complete results table, training curves and real
            dependency-graph outputs.
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
