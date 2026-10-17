import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ResearchArchitectureDiagram } from "@/components/research/ResearchArchitectureDiagram";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { TagList } from "@/components/ui/TechnologyTag";
import { architectureChain, flagshipResearch as thesis } from "@/data/research";
import { pageMetadata } from "@/lib/metadata";
import { formatPeriod } from "@/lib/utils";

export const metadata = pageMetadata({
  title: thesis.title,
  description: `${thesis.type} (${thesis.institutionShort}, ${formatPeriod(thesis.period)}). ${thesis.lead}`,
  path: thesis.href,
});

function Section({ id, title, children, wide = false }: { id: string; title: string; children: ReactNode; wide?: boolean }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-[1.75rem] font-semibold tracking-tight text-ink">{title}</h2>
      <div className={wide ? "mt-5" : "mt-5 max-w-[70ch]"}>{children}</div>
    </section>
  );
}

export default function ThesisPage() {
  return (
    <article>
      <PageHeader eyebrow={thesis.type} title={thesis.title} breadcrumbs={[{ label: "Research", href: "/research" }]} lead={<p>{thesis.lead}</p>}>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md border border-line px-3 py-1.5 text-sm text-ink-muted">{thesis.institutionShort}</span>
          <span className="rounded-md border border-line px-3 py-1.5 text-sm text-ink-muted">{formatPeriod(thesis.period)}</span>
        </div>
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-14">
          <Section id="problem" title="Problem">
            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-muted">
              {thesis.problem.map((p) => <p key={p}>{p}</p>)}
            </div>
          </Section>

          <Section id="contribution" title="My contribution">
            <ul className="space-y-3">
              {thesis.contributions.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink">
                  <span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0 bg-accent" />{item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-lg border border-dashed border-line-strong px-4 py-3 text-sm leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">Scope. </span>{thesis.scope}
            </p>
          </Section>

          <Section id="architecture" title="System architecture" wide>
            <p className="max-w-[72ch] leading-relaxed text-ink-muted">{thesis.narrative[1]}</p>
            <p className="mt-4 rounded-lg border border-line bg-surface px-4 py-3 font-mono text-[0.8125rem] leading-relaxed text-ink">{architectureChain()}</p>
            <ResearchArchitectureDiagram className="mt-8" />
          </Section>

          <Section id="method" title="Method" wide>
            <div className="grid gap-4 md:grid-cols-2">
              {thesis.method.map((step) => (
                <div key={step.title} className="rounded-xl border border-line bg-surface p-5">
                  <h3 className="font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="evaluation" title="Evaluation" wide>
            <p className="max-w-[70ch] leading-relaxed text-ink-muted">{thesis.evaluation.intro}</p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {thesis.evaluation.groups.map((group) => (
                <div key={group.title} className="rounded-xl border border-line bg-surface p-5">
                  <h3 className="font-medium text-ink">{group.title}</h3>
                  <p className="mt-1 text-sm text-ink-subtle">{group.description}</p>
                  <dl className="mt-4 space-y-3">
                    {group.metrics.map((metric) => (
                      <div key={metric.abbr} className="grid grid-cols-[7rem_1fr] gap-3">
                        <dt className="font-mono text-sm text-accent">{metric.abbr}</dt>
                        <dd><span className="font-medium text-ink">{metric.name}</span><p className="text-sm leading-relaxed text-ink-muted">{metric.description}</p></dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Section>

          <Section id="results" title="Final results" wide>
            <div className="overflow-x-auto rounded-xl border border-line bg-surface">
              <table className="w-full min-w-[58rem] text-left text-sm">
                <thead><tr className="border-b border-line text-ink-subtle"><th className="px-5 py-3 font-normal">Model</th><th className="px-4 py-3 font-normal">Split</th>{thesis.results.columns.map((c) => <th key={c} className="px-4 py-3 font-normal">{c}</th>)}</tr></thead>
                <tbody className="divide-y divide-line">
                  {thesis.results.rows.map((row) => (
                    <tr key={`${row.model}-${row.split}`}><td className="px-5 py-3 font-medium text-ink">{row.model}</td><td className="px-4 py-3 text-ink-muted">{row.split}</td>{row.values.map((v, i) => <td key={i} className="px-4 py-3 font-mono text-ink">{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">{thesis.results.notes.map((n) => <p key={n} className="rounded-xl border border-line p-4 text-sm leading-relaxed text-ink-muted">{n}</p>)}</div>

            <h3 className="mt-10 text-lg font-medium text-ink">Qualitative example from the thesis</h3>
            <p className="mt-2 max-w-[72ch] leading-relaxed text-ink-muted">{thesis.qualitative.intro}</p>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {thesis.qualitative.figures.map((figure) => (
                <figure key={figure.src} className="overflow-hidden rounded-xl border border-line bg-surface">
                  <div className="flex aspect-[4/3] items-center justify-center bg-white p-3"><Image src={figure.src} alt={figure.alt} width={700} height={550} className="max-h-full w-full object-contain" /></div>
                  <figcaption className="border-t border-line px-4 py-3 font-medium text-ink">{figure.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{thesis.qualitative.note}</p>
          </Section>

          <Section id="technologies" title="Tools & methods">
            <TagList tags={thesis.technologies} />
            <div className="mt-3"><TagList tags={thesis.methods} tone="quiet" /></div>
          </Section>

          <Section id="references" title="Selected references" wide>
            <ol className="space-y-4">
              {thesis.references.map((ref, i) => (
                <li key={ref.citation} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-relaxed"><span className="font-mono text-ink-subtle">[{i + 1}]</span><div><p className="text-ink">{ref.citation}</p>{ref.note ? <p className="mt-1 text-ink-muted">{ref.note}</p> : null}</div></li>
              ))}
            </ol>
          </Section>

          <Section id="future" title="What comes next">
            <p className="leading-relaxed text-ink-muted">{thesis.futureIntro}</p>
            <ul className="mt-5 space-y-4">{thesis.future.map((item) => <li key={item.title}><h3 className="font-medium text-ink">{item.title}</h3><p className="mt-1 leading-relaxed text-ink-muted">{item.body}</p></li>)}</ul>
          </Section>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-10 print:hidden">
            <Link href="/research" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"><ArrowLeft className="size-4" />Research overview</Link>
            <ButtonLink href="/contact">Discuss this work</ButtonLink>
          </div>
        </div>
      </Container>
    </article>
  );
}
