import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { flagshipResearch as thesis } from "@/data/research";
import { pageMetadata } from "@/lib/metadata";
import { formatPeriod } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Research and engineering projects by Yue Zhang: open-vocabulary segmentation for X-ray inspection, an autonomous intelligent vehicle and a retrieval-augmented QA system.",
  path: "/projects",
});

export default function ProjectsPage() {
  const primary = projects.filter((project) => project.emphasis === "primary");
  const secondary = projects.filter((project) => project.emphasis === "secondary");

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Research and engineering projects"
        lead={
          <p>
            Further work beyond my thesis, ordered by relevance to robot perception: computer vision
            research, autonomous systems on physical hardware, and machine-learning engineering.
          </p>
        }
      />

      <Container className="py-14 sm:py-16">
        <Reveal>
          <Link
            href={thesis.href}
            className="group flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent-soft/50 p-5 transition-colors hover:border-accent/60 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div>
              <p className="eyebrow text-accent">
                Main research project · {thesis.type} · {formatPeriod(thesis.period).replace(" – ", "–")}
              </p>
              <p className="mt-2 font-serif text-xl font-semibold text-ink">{thesis.title}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
              Read the project
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {primary.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} headingLevel="h2" />
            </Reveal>
          ))}
        </div>

        {secondary.length > 0 ? (
          <section aria-labelledby="engineering-title" className="mt-14">
            <h2 id="engineering-title" className="eyebrow">
              Engineering
            </h2>
            <div className="mt-4 space-y-3">
              {secondary.map((project) => (
                <Reveal key={project.slug}>
                  <ProjectCard project={project} variant="compact" />
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
