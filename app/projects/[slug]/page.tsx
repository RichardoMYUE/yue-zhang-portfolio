import { ArrowLeft, ArrowRight, Award as AwardIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/TechnologyTag";
import { getAwardsForProject } from "@/data/awards";
import { getProject, projectHref, projects } from "@/data/projects";
import { flagshipResearch } from "@/data/research";
import { pageMetadata } from "@/lib/metadata";
import { formatPeriod } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: projectHref(project.slug),
  });
}

function Brief({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <h2 className="eyebrow">{label}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/*
 * The first screen answers: what was the problem, what did Yue do, what was
 * difficult, which tools were used, and what was the outcome.
 */
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const awards = getAwardsForProject(project.slug);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[index + 1];

  return (
    <article>
      <header className="border-b border-line">
        <Container className="pt-10 pb-8 sm:pt-14 sm:pb-10">
          <nav aria-label="Breadcrumb" className="mb-6 print:hidden">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-subtle">
              <li>
                <Link href="/projects" className="hover:text-ink">
                  Projects
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink-muted">
                {project.shortTitle}
              </li>
            </ol>
          </nav>
          <p className="eyebrow text-accent">{project.area}</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-[2.75rem]">
            {project.title}
          </h1>
          <p className="mt-4 font-mono text-[0.8125rem] text-ink-muted">
            {project.role} · {formatPeriod(project.period)}
          </p>
        </Container>
      </header>

      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0 space-y-9">
            <section aria-labelledby="problem-title">
              <h2 id="problem-title" className="eyebrow">
                Problem
              </h2>
              <p className="mt-2 max-w-[68ch] text-[1.0625rem] leading-relaxed text-ink">
                {project.problem}
              </p>
            </section>

            <section aria-labelledby="contributions-title">
              <h2 id="contributions-title" className="eyebrow">
                What I did
              </h2>
              <ul className="mt-3 max-w-[68ch] space-y-2.5">
                {project.contributions.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink">
                    <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="divide-y divide-line rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:self-start">
            <Brief label="What was difficult">
              <ul className="space-y-2">
                {project.challenges.map((item) => (
                  <li key={item} className="text-[0.9375rem] leading-relaxed text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Brief>
            <Brief label="Tools & methods">
                <TagList tags={project.technologies} tone="quiet" />
              </Brief>
              <Brief label="Outcome">
                {awards.length > 0 ? (
                  <ul className="space-y-2">
                    {awards.map((award) => (
                      <li key={award.id} className="flex gap-2.5">
                        <AwardIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-manipulation" />
                        <span className="text-[0.9375rem] text-ink">
                          {award.title} <span className="text-ink-subtle">— {award.year}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {project.outcome ? (
                  <p className="text-[0.9375rem] leading-relaxed text-ink">{project.outcome}</p>
                ) : null}
              </Brief>
          </aside>
        </div>

        <section
          aria-labelledby="relevance-title"
          className="mt-12 rounded-xl border-l-2 border-accent bg-accent-soft/50 px-5 py-5"
        >
          <h2 id="relevance-title" className="eyebrow text-accent">
            Connection to my research
          </h2>
          <p className="mt-2 max-w-[75ch] leading-relaxed text-ink">{project.relevance}</p>
          <Link
            href={flagshipResearch.href}
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-strong"
          >
            Main project: {flagshipResearch.shortTitle}
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </section>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" />
            All projects
          </Link>
          {next ? (
            <ButtonLink href={projectHref(next.slug)} variant="secondary">
              Next: {next.shortTitle}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          ) : (
            <ButtonLink href="/cv" variant="secondary">
              Background &amp; CV
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          )}
        </div>
      </Container>
    </article>
  );
}
