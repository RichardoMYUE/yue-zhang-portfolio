import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { CurrentInterests } from "@/components/home/CurrentInterests";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ResearchArchitectureDiagram } from "@/components/research/ResearchArchitectureDiagram";
import { ResearchCard } from "@/components/research/ResearchCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { flagshipResearch as thesis, researchNarrative, researchPillars } from "@/data/research";
import { pageMetadata } from "@/lib/metadata";
import { cn, formatPeriod } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Research",
  description:
    "Research overview of Yue Zhang: robot perception, scene understanding and visual relation reasoning for robotic manipulation in cluttered scenes.",
  path: "/research",
});

export default function ResearchPage() {
  const researchProjects = projects.filter((project) => project.category === "research");

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Object relationships for robotic manipulation"
        lead={<p>{profile.researchStatement}</p>}
      >
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {researchNarrative.map((step, index) => (
            <li key={step.title} className={cn("relative p-4", step.status === "thesis" ? "bg-surface" : "bg-paper")}>
              <p className="font-mono text-[0.75rem] text-accent">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-medium text-ink">{step.title}</p>
              <p className="mt-1 text-sm leading-snug text-ink-subtle">{step.body}</p>
              <p className="mt-3 flex items-center gap-1.5 text-[0.75rem] text-ink-subtle">
                {step.status === "thesis" ? (
                  <span aria-hidden className="inline-block size-2 rounded-full bg-accent" />
                ) : (
                  <span aria-hidden className="inline-block size-2 rounded-full border border-ink-subtle" />
                )}
                {step.status === "thesis" ? "Covered in my B.Sc. thesis" : "Next step — not yet done"}
              </p>
              {index < researchNarrative.length - 1 ? (
                <ArrowRight
                  aria-hidden
                  className="absolute top-4 right-4 hidden size-4 text-line-strong lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </PageHeader>

      {/* Main project */}
      <section aria-labelledby="main-project-title" className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading id="main-project-title" eyebrow="Main project" title={thesis.title} />
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.8125rem] text-ink-muted">
              <li className="text-accent">{thesis.type}</li>
              <li>{thesis.institution}</li>
              <li>{formatPeriod(thesis.period).replace(" – ", "–")}</li>
            </ul>
          </Reveal>
          <Reveal className="mt-8 grid gap-x-10 gap-y-4 text-[1.0625rem] leading-relaxed lg:grid-cols-2">
            <p className="text-ink">{thesis.narrative[0]}</p>
            <p className="text-ink-muted">{thesis.narrative[1]}</p>
          </Reveal>
          <Reveal className="mt-10">
            <ResearchArchitectureDiagram />
          </Reveal>
          <div className="mt-8">
            <ButtonLink href={thesis.href}>
              Problem, contribution, method and evaluation
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Themes */}
      <section aria-labelledby="themes-title" className="border-t border-line bg-surface-muted/50 py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              id="themes-title"
              eyebrow="Research themes"
              title="Three connected themes"
              lead={
                <p>
                  Each theme lists the methods I have used, the questions I would like to study, and
                  where it appears in my projects.
                </p>
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {researchPillars.map((pillar, index) => (
              <Reveal key={pillar.id} delay={index * 0.06}>
                <ResearchCard pillar={pillar} showQuestions />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Related research */}
      {researchProjects.length > 0 ? (
        <section aria-labelledby="related-title" className="border-t border-line py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                id="related-title"
                eyebrow="Related research"
                title="Open-vocabulary computer vision"
                action={
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
                  >
                    All projects
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                }
              />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {researchProjects.map((project) => (
                <Reveal key={project.slug}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Directions */}
      <section aria-labelledby="directions-title" className="border-t border-line py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              id="directions-title"
              eyebrow="Next directions"
              title="Currently interested in"
            />
          </Reveal>
          <Reveal className="mt-10">
            <CurrentInterests />
          </Reveal>
          <Reveal className="mt-16">
            <ContactCTA />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
