import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AwardsList } from "@/components/awards/AwardItem";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { EducationTimeline } from "@/components/education/EducationTimeline";
import { CurrentInterests } from "@/components/home/CurrentInterests";
import { Hero } from "@/components/home/Hero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FeaturedResearch } from "@/components/research/FeaturedResearch";
import { ResearchPipeline } from "@/components/research/ResearchPipeline";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site-url";

function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function personJsonLd() {
  const [current, previous] = education;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: absoluteUrl("/"),
    email: `mailto:${profile.email.primary.address}`,
    jobTitle: profile.position.role,
    description: profile.intro,
    affiliation: { "@type": "CollegeOrUniversity", name: current.institution },
    alumniOf: { "@type": "CollegeOrUniversity", name: previous.institution },
    knowsAbout: profile.researchInterests,
    knowsLanguage: profile.languages.map((language) => language.name),
  };
}

/*
 * Homepage order answers, in turn:
 * who is Yue (hero) → strongest evidence (thesis) → what else (projects,
 * technical background, education, awards) → what next (research direction)
 * → how to get in touch.
 */
export default function HomePage() {
  const primaryProjects = projects.filter((project) => project.emphasis === "primary");
  const secondaryProjects = projects.filter((project) => project.emphasis === "secondary");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />

      <Hero />

      {/* 01 — Featured research */}
      <section
        aria-labelledby="featured-title"
        className="border-b border-line bg-surface-muted/50 pt-14 pb-20 sm:pt-16 sm:pb-24"
      >
        <Container>
          <Reveal>
            <SectionHeading id="featured-title" index="01" eyebrow="Featured research" title="Main research project" />
          </Reveal>
          <Reveal className="mt-8">
            <FeaturedResearch />
          </Reveal>
        </Container>
      </section>

      {/* 02 — Further projects */}
      <section aria-labelledby="projects-title" className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              id="projects-title"
              index="02"
              eyebrow="Further projects"
              title="Computer vision and autonomous systems"
              action={<MoreLink href="/projects">All projects</MoreLink>}
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {primaryProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          {secondaryProjects.length > 0 ? (
            <Reveal className="mt-8">
              <p className="eyebrow mb-3">Engineering</p>
              <div className="space-y-3">
                {secondaryProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} variant="compact" />
                ))}
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* 03 — Technical background */}
      <section aria-labelledby="skills-title" className="border-t border-line py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              id="skills-title"
              index="03"
              eyebrow="Technical background"
              title="Tools and methods I have used"
            />
          </Reveal>
          <Reveal className="mt-10" delay={0.05}>
            <SkillsGrid />
          </Reveal>
        </Container>
      </section>

      {/* 04 — Education and awards */}
      <section aria-labelledby="education-title" className="border-t border-line py-20 sm:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <Reveal>
                <SectionHeading id="education-title" index="04" eyebrow="Education" title="Academic path" />
              </Reveal>
              <Reveal className="mt-10" delay={0.05}>
                <EducationTimeline courseLimit={6} showAdditional />
              </Reveal>
            </div>
            <section aria-labelledby="awards-title">
              <Reveal>
                <p className="eyebrow">Awards</p>
                <h2 id="awards-title" className="mt-3 text-lg font-medium text-ink">
                  Recognition
                </h2>
              </Reveal>
              <Reveal className="mt-6" delay={0.05}>
                <AwardsList />
                <div className="mt-5">
                  <MoreLink href="/cv">Full academic background</MoreLink>
                </div>
              </Reveal>
            </section>
          </div>
        </Container>
      </section>

      {/* 05 — Research direction */}
      <section aria-labelledby="direction-title" className="border-t border-line py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              id="direction-title"
              index="05"
              eyebrow="Research direction"
              title="What I want to work on next"
              lead={
                <p>
                  My thesis covered perception and relation reasoning. Using structured scene
                  representations for grasp planning and robot action is the part I have not done yet
                  — and the direction I want to move in.
                </p>
              }
            />
          </Reveal>
          <Reveal className="mt-10" delay={0.05}>
            <ResearchPipeline initialStage="reasoning" />
          </Reveal>
          <Reveal className="mt-10">
            <CurrentInterests />
          </Reveal>
        </Container>
      </section>

      <div className="pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <ContactCTA />
          </Reveal>
        </Container>
      </div>
    </>
  );
}
