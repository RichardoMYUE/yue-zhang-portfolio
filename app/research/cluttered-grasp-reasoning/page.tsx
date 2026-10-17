import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ResearchArchitectureDiagram } from "@/components/research/ResearchArchitectureDiagram";
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
  { id: "method", title: "Method" },
  { id: "dataset", title: "Dataset" },
  { id: "evaluation", title: "Evaluation" },
  { id: "technologies", title: "Technologies" },
  { id: "learned", title: "What I learned" },
  { id: "future", title: "Relation to future research" },
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

export default function ThesisPage() {
  const nextProject = projects[0];
  const facts = [
    { label: "Type", value: thesis.type },
    { label: "Institution", value: thesis.institution },
    { label: "Period", value: formatPeriod(thesis.period).replace(" – ", "–") },
    { label: "Focus", value: thesis.shortTitle },
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
              <dd className="mt-1 text-[0.9375rem] leading-snug text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <div className="xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-14">
          <nav aria-label="On this page" className="mb-10 xl:mb-0">
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

            <DetailSection id="contribution">
              <ul className="space-y-3">
                {thesis.contributions.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink">
                    <span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection id="architecture" wide>
              <p className="max-w-[70ch] leading-relaxed text-ink-muted">{thesis.narrative[1]}</p>
              <p className="mt-4 rounded-lg border border-line bg-surface px-4 py-3 font-mono text-[0.8125rem] leading-relaxed text-ink">
                {architectureChain()}
              </p>
              <ResearchArchitectureDiagram className="mt-8" />
            </DetailSection>

            <DetailSection id="method">
              <ol className="space-y-7">
                {thesis.method.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="pt-0.5 font-mono text-sm text-ink-subtle">
                      {String.fromCharCode(97 + index)}.
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-ink">{step.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ink-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 rounded-lg border border-dashed border-line-strong px-4 py-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">Scope. </span>
                {thesis.scope}
              </p>
            </DetailSection>

            <DetailSection id="dataset">
              <div className="grid gap-4 sm:grid-cols-2">
                {thesis.datasets.map((dataset) => (
                  <div key={dataset.title} className="rounded-xl border border-line bg-surface p-5">
                    <h3 className="font-medium text-ink">{dataset.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{dataset.body}</p>
                  </div>
                ))}
              </div>
            </DetailSection>

            <DetailSection id="evaluation" wide>
              <p className="max-w-[70ch] leading-relaxed text-ink-muted">{thesis.evaluation.intro}</p>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {thesis.evaluation.groups.map((group) => (
                  <div key={group.title} className="rounded-xl border border-line bg-surface">
                    <div className="border-b border-line px-5 py-4">
                      <h3 className="font-medium text-ink">{group.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-subtle">{group.description}</p>
                    </div>
                    <dl className="divide-y divide-line">
                      {group.metrics.map((metric) => (
                        <div key={metric.abbr} className="grid grid-cols-[5.5rem_1fr] gap-3 px-5 py-3.5">
                          <dt className="font-mono text-[0.8125rem] font-medium text-accent">{metric.abbr}</dt>
                          <dd>
                            <p className="text-[0.9375rem] font-medium text-ink">{metric.name}</p>
                            <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{metric.description}</p>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              {thesis.results ? (
                <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface">
                  <table className="w-full text-left text-sm">
                    <caption className="px-5 pt-4 text-left font-medium text-ink">Results</caption>
                    <thead>
                      <tr className="border-b border-line text-ink-subtle">
                        <th scope="col" className="px-5 py-3 font-normal">Metric</th>
                        <th scope="col" className="px-5 py-3 font-normal">Setting</th>
                        <th scope="col" className="px-5 py-3 font-normal">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {thesis.results.map((row) => (
                        <tr key={`${row.metric}-${row.setting}`}>
                          <td className="px-5 py-3 text-ink">{row.metric}</td>
                          <td className="px-5 py-3 text-ink-muted">{row.setting}</td>
                          <td className="px-5 py-3 font-mono text-ink">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </DetailSection>

            <DetailSection id="technologies">
              <dl className="space-y-4">
                <div>
                  <dt className="eyebrow">Tools, models &amp; data</dt>
                  <dd className="mt-2">
                    <TagList tags={thesis.technologies} />
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Methods</dt>
                  <dd className="mt-2">
                    <TagList tags={thesis.methods} tone="quiet" />
                  </dd>
                </div>
              </dl>
            </DetailSection>

            <DetailSection id="learned" wide>
              <div className="grid gap-4 md:grid-cols-2">
                {thesis.learned.map((item) => (
                  <div key={item.title} className="rounded-xl border border-line bg-surface p-5">
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </DetailSection>

            <DetailSection id="future">
              <p className="leading-relaxed text-ink-muted">{thesis.futureIntro}</p>
              <ul className="mt-6 space-y-5">
                {thesis.future.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
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
