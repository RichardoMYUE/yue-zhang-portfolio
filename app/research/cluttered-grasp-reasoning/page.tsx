import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ResearchArchitectureDiagram } from "@/components/research/ResearchArchitectureDiagram";
import { DirectionConstraint } from "@/components/research/thesis/DirectionConstraint";
import { ReferenceList, referenceNumber } from "@/components/research/thesis/ReferenceList";
import { ResultsTable } from "@/components/research/thesis/ResultsTable";
import { ThesisFigure } from "@/components/research/thesis/ThesisFigure";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { TagList } from "@/components/ui/TechnologyTag";
import { projects, projectHref } from "@/data/projects";
import { architectureChain, flagshipResearch as thesis } from "@/data/research";
import { pageMetadata } from "@/lib/metadata";
import { formatPeriod } from "@/lib/utils";

export const metadata = pageMetadata({
  title: thesis.title,
  description: `${thesis.type} (${thesis.institutionShort}, ${formatPeriod(thesis.period)}). ${thesis.lead}`,
  path: thesis.href,
});

const sections = [
  { id: "problem", title: "Problem" },
  { id: "motivation", title: "Motivation" },
  { id: "contribution", title: "My contribution" },
  { id: "architecture", title: "System architecture" },
  { id: "method", title: "Direction-aware relation learning" },
  { id: "setup", title: "Experimental setup" },
  { id: "metrics", title: "Evaluation metrics" },
  { id: "results", title: "Results" },
  { id: "training", title: "Training behaviour" },
  { id: "qualitative", title: "Qualitative examples" },
  { id: "findings", title: "What the experiments show" },
  { id: "future", title: "Relation to future research" },
  { id: "references", title: "Selected references" },
] as const;

type SectionId = (typeof sections)[number]["id"];

function DetailSection({
  id,
  children,
  wide = false,
}: {
  id: SectionId;
  children: ReactNode;
  wide?: boolean;
}) {
  const index = sections.findIndex((section) => section.id === id);
  const { title } = sections[index];
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <p className="font-mono text-[0.75rem] text-accent">{String(index + 1).padStart(2, "0")}</p>
      <h2 id={`${id}-title`} className="mt-1 font-serif text-[1.75rem] leading-tight font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className={wide ? "mt-6" : "mt-5 max-w-[70ch]"}>{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-medium text-ink">{children}</h3>;
}

function Bullets({ items, tone = "muted" }: { items: string[]; tone?: "muted" | "ink" }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 leading-relaxed ${tone === "ink" ? "text-ink" : "text-ink-muted"}`}
        >
          <span aria-hidden className="mt-[0.75em] h-px w-3.5 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ThesisPage() {
  const nextProject = projects[0];
  const { figures } = thesis;
  const facts = [
    { label: "Type", value: thesis.type },
    { label: "Institution", value: thesis.institution },
    { label: "Period", value: formatPeriod(thesis.period) },
    { label: "Original title", value: thesis.originalTitle, lang: "zh-CN" },
  ];

  return (
    <article>
      <PageHeader
        eyebrow={thesis.type}
        title={thesis.title}
        breadcrumbs={[{ label: "Research", href: "/research" }]}
        lead={<p>{thesis.lead}</p>}
      >
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-surface px-4 py-3">
              <dt className="eyebrow">{fact.label}</dt>
              <dd lang={fact.lang} className="mt-1 text-[0.9375rem] leading-snug text-ink">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <div className="xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-14">
          <nav aria-label="On this page" className="mb-10 xl:mb-0 print:hidden">
            <div className="xl:sticky xl:top-24">
              <p className="eyebrow">On this page</p>
              <ol className="mt-3 flex flex-wrap gap-2 xl:flex-col xl:gap-0.5">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-baseline gap-2 rounded-md border border-line px-2.5 py-1 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink xl:border-transparent xl:px-2 xl:hover:border-transparent xl:hover:bg-surface-muted"
                    >
                      <span className="font-mono text-[0.6875rem] text-ink-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 space-y-14">
            <DetailSection id="problem">
              <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-muted">
                {thesis.problem.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </DetailSection>

            <DetailSection id="motivation">
              <blockquote className="border-l-2 border-accent pl-5 font-serif text-[1.3125rem] leading-relaxed text-ink">
                {thesis.motivation}
              </blockquote>
              <p className="mt-5 leading-relaxed text-ink-muted">{thesis.motivationDetail}</p>
            </DetailSection>

            <DetailSection id="contribution" wide>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-10">
                <div className="rounded-xl border border-line bg-surface p-5">
                  <p className="eyebrow">Built on prior work</p>
                  <ul className="mt-3 space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {thesis.priorWork.map((item) => (
                      <li key={item.what}>
                        {item.what}{" "}
                        <a
                          href={`#ref-${item.ref}`}
                          className="font-mono text-[0.8125rem] text-accent hover:text-accent-strong"
                        >
                          [{referenceNumber(item.ref)}]
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow">What I did</p>
                  <div className="mt-3">
                    <Bullets items={thesis.contributions} tone="ink" />
                  </div>
                </div>
              </div>
              <p className="mt-6 max-w-[75ch] rounded-lg border-l-2 border-accent bg-accent-soft/50 px-4 py-3 leading-relaxed text-ink">
                {thesis.increment}
              </p>
            </DetailSection>

            <DetailSection id="architecture" wide>
              <p className="max-w-[70ch] leading-relaxed text-ink-muted">{thesis.narrative[1]}</p>
              <p className="mt-4 rounded-lg border border-line bg-surface px-4 py-3 font-mono text-[0.8125rem] leading-relaxed text-ink">
                {architectureChain()}
              </p>
              <ResearchArchitectureDiagram className="mt-8" />
            </DetailSection>

            <DetailSection id="method" wide>
              <div className="max-w-[70ch]">
                <SubHeading>Baseline relation learning (reproduced from D3G)</SubHeading>
                <ol className="mt-4 space-y-5">
                  {thesis.baselineMethod.map((step, index) => (
                    <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="pt-0.5 font-mono text-sm text-ink-subtle">
                        {String.fromCharCode(97 + index)}.
                      </span>
                      <div>
                        <h4 className="font-medium text-ink">{step.title}</h4>
                        <p className="mt-1 leading-relaxed text-ink-muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10">
                <SubHeading>Direction constraint (added in this thesis)</SubHeading>
                <div className="mt-4">
                  <DirectionConstraint />
                </div>
              </div>

              <p className="mt-8 max-w-[75ch] rounded-lg border border-dashed border-line-strong px-4 py-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">Scope. </span>
                {thesis.scope}
              </p>
            </DetailSection>

            <DetailSection id="setup" wide>
              <div className="grid gap-4 md:grid-cols-2">
                {thesis.setup.data.map((item) => (
                  <div key={item.title} className="rounded-xl border border-line bg-surface p-5">
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <SubHeading>Test splits</SubHeading>
                <dl className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
                  {thesis.setup.splits.map((item) => (
                    <div key={item.split} className="grid gap-1 px-5 py-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-4">
                      <dt className="font-mono text-[0.875rem] text-ink">{item.split}</dt>
                      <dd className="text-[0.9375rem] text-ink-muted">{item.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8">
                <SubHeading>Two-stage training</SubHeading>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {thesis.setup.training.map((item) => (
                    <div key={item.title} className="rounded-xl border border-line bg-surface p-5">
                      <h4 className="font-medium text-ink">{item.title}</h4>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <SubHeading>Final relation-training configuration</SubHeading>
                <dl className="mt-3 grid gap-x-8 rounded-xl border border-line bg-surface px-5 py-2 sm:grid-cols-2">
                  {thesis.setup.config.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                    >
                      <dt className="text-[0.875rem] text-ink-muted">{item.label}</dt>
                      <dd className="text-right font-mono text-[0.8125rem] text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 max-w-[75ch] text-[0.875rem] leading-relaxed text-ink-subtle">
                  Thesis Table 4-1. {thesis.setup.configNote}
                </p>
              </div>
            </DetailSection>

            <DetailSection id="metrics" wide>
              <p className="max-w-[70ch] leading-relaxed text-ink-muted">{thesis.evaluation.intro}</p>
              <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface">
                {thesis.evaluation.relationMetrics.map((metric) => (
                  <div key={metric.abbr} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="font-mono text-[0.8125rem] font-medium text-accent">{metric.abbr}</dt>
                    <dd>
                      <p className="text-[0.9375rem] font-medium text-ink">{metric.name}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{metric.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 max-w-[75ch] text-[0.875rem] leading-relaxed text-ink-subtle">
                {thesis.evaluation.detectionNote}
              </p>
            </DetailSection>

            <DetailSection id="results" wide>
              <ResultsTable />
              <div className="mt-8 max-w-[75ch] space-y-4 leading-relaxed text-ink-muted">
                {thesis.results.summary.slice(0, -1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-5 max-w-[75ch] rounded-lg border-l-2 border-accent bg-accent-soft/50 px-4 py-3 leading-relaxed text-ink">
                {thesis.results.summary[thesis.results.summary.length - 1]}
              </p>
            </DetailSection>

            <DetailSection id="training" wide>
              <div className="grid gap-8">
                <ThesisFigure
                  figure={figures.totalLoss}
                  className="max-w-2xl"
                  sizes="(min-width: 768px) 672px, 100vw"
                />
                <ThesisFigure figure={figures.relationLosses} sizes="(min-width: 1280px) 820px, 100vw" />
              </div>
              <div className="mt-8 max-w-[75ch]">
                <Bullets items={thesis.training.points} />
              </div>
              <p className="mt-6 max-w-[75ch] rounded-lg border border-dashed border-line-strong px-4 py-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">Training loss is not test performance. </span>
                {thesis.training.caveat}
              </p>
            </DetailSection>

            <DetailSection id="qualitative" wide>
              <div className="grid gap-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-start">
                <ThesisFigure figure={figures.inputScene} sizes="(min-width: 768px) 256px, 100vw" />
                <div>
                  <p className="eyebrow">How to read the graphs</p>
                  <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {thesis.qualitative.legend.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">{thesis.qualitative.observation}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <ThesisFigure figure={figures.baselineGraph} sizes="(min-width: 1280px) 420px, (min-width: 768px) 45vw, 100vw" />
                <ThesisFigure figure={figures.directionGraph} sizes="(min-width: 1280px) 420px, (min-width: 768px) 45vw, 100vw" />
              </div>
              <p className="mt-6 max-w-[75ch] rounded-lg border border-dashed border-line-strong px-4 py-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">Qualitative only. </span>
                {thesis.qualitative.caveat}
              </p>
            </DetailSection>

            <DetailSection id="findings" wide>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div>
                  <SubHeading>Supported by the experiments</SubHeading>
                  <div className="mt-4">
                    <Bullets items={thesis.findings} tone="ink" />
                  </div>
                </div>
                <div>
                  <SubHeading>Limitations</SubHeading>
                  <ul className="mt-4 space-y-2.5">
                    {thesis.limitations.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-ink-muted">
                        <span aria-hidden className="mt-[0.55em] inline-block size-2 shrink-0 rounded-full border border-ink-subtle" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <p className="eyebrow">Tools, models &amp; data</p>
                <TagList tags={thesis.technologies} className="mt-2" label="Tools, models and data" />
              </div>
            </DetailSection>

            <DetailSection id="future">
              <p className="leading-relaxed text-ink-muted">{thesis.futureIntro}</p>
              <ul className="mt-6 space-y-5">
                {thesis.future.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span aria-hidden className="mt-[0.55em] inline-block size-2 shrink-0 rounded-full border border-ink-subtle" />
                    <div>
                      <h3 className="font-medium text-ink">{item.title}</h3>
                      <p className="mt-1 leading-relaxed text-ink-muted">{item.body}</p>
                      {item.link ? (
                        <Link
                          href={item.link.href}
                          className="mt-1.5 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-strong"
                        >
                          {item.link.label}
                          <ArrowUpRight aria-hidden className="size-3.5" />
                        </Link>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection id="references">
              <p className="mb-5 text-[0.9375rem] leading-relaxed text-ink-muted">
                Core prior work this page relies on, as cited in the thesis bibliography.
              </p>
              <ReferenceList />
            </DetailSection>

            <div className="flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between print:hidden">
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Research overview
              </Link>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={projectHref(nextProject.slug)} variant="secondary">
                  Next: {nextProject.shortTitle}
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink href="/contact">Discuss this work</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
