import { Globe, Mail, MapPin } from "lucide-react";
import { CvBullets, CvDetailLink, CvEntry, CvLine, CvSection } from "@/components/cv/CvParts";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Container";
import { PrintButton } from "@/components/ui/PrintButton";
import { awards, getAwardsForProject } from "@/data/awards";
import { education, internationalExperience } from "@/data/education";
import { getConfiguredLinks, profile, publicEmails } from "@/data/profile";
import { projectHref, projects } from "@/data/projects";
import { flagshipResearch as thesis } from "@/data/research";
import { siteConfig } from "@/data/site";
import { skillGroups } from "@/data/skills";
import type { Project } from "@/data/types";
import { pageMetadata } from "@/lib/metadata";
import { displayUrl } from "@/lib/site-url";
import { formatDate, formatPeriod } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Academic Background (CV)",
  description:
    "Academic CV of Yue Zhang: education, research experience, projects, awards, skills and languages. M.Sc. Embedded Systems, TU Chemnitz.",
  path: "/cv",
});

function ProjectEntry({ project }: { project: Project }) {
  const projectAwards = getAwardsForProject(project.slug);
  return (
    <CvEntry
      title={project.title}
      subtitle={project.role}
      period={formatPeriod(project.period)}
    >
      <CvBullets items={project.contributions} />
      {projectAwards.length > 0 ? (
        <CvLine label="Awards">
          {projectAwards.map((award) => `${award.title} (${award.year})`).join(" · ")}
        </CvLine>
      ) : null}
      <CvLine label="Keywords">{project.tags.join(", ")}</CvLine>
      <CvDetailLink href={projectHref(project.slug)} />
    </CvEntry>
  );
}

export default function CvPage() {
  const links = getConfiguredLinks();
  const researchProjects = projects.filter((project) => project.category === "research");
  const engineeringProjects = projects.filter((project) => project.category === "engineering");
  const emails = publicEmails();

  return (
    <article className="pb-20 print:pb-0">
      <Container size="narrow" className="pt-10 sm:pt-14 print:max-w-none print:px-0 print:pt-0">
        {/* Screen-only toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 print:hidden">
          <p className="text-sm text-ink-muted">
            Web-native CV · prints cleanly via <span className="font-medium text-ink">Print → Save as PDF</span>
          </p>
          <PrintButton />
        </div>

        {/* 1 — Identity and contact */}
        <header className="pb-8 print:pb-3">
          <p className="eyebrow">Academic background · Curriculum Vitae</p>
          <h1 className="mt-3 font-serif text-[2.75rem] leading-none font-semibold tracking-tight text-ink sm:text-5xl print:text-[26pt]">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-ink">
            {profile.position.programme}
            <span className="text-ink-subtle"> · </span>
            {profile.position.institution}
          </p>
          <p className="mt-1 text-[0.9375rem] font-medium text-accent">{profile.headline}</p>

          <dl className="mt-6 grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2 print:mt-3 print:grid-cols-2">
            {emails.map((email) => (
              <div key={email.address} className="flex items-center gap-2.5">
                <dt className="flex items-center gap-2 text-ink-subtle">
                  <Mail aria-hidden className="size-4 print:hidden" />
                  <span>{email.label}:</span>
                </dt>
                <dd>
                  <a href={`mailto:${email.address}`} className="break-all text-ink hover:underline">
                    {email.address}
                  </a>
                </dd>
              </div>
            ))}
            <div className="flex items-center gap-2.5">
              <dt className="flex items-center gap-2 text-ink-subtle">
                <MapPin aria-hidden className="size-4 print:hidden" />
                <span>Location:</span>
              </dt>
              <dd className="text-ink">{profile.position.location}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <dt className="flex items-center gap-2 text-ink-subtle">
                <Globe aria-hidden className="size-4 print:hidden" />
                <span>Web:</span>
              </dt>
              <dd className="text-ink">{displayUrl("/")}</dd>
            </div>
            {links.map((link) => (
              <div key={link.kind} className="flex items-center gap-2.5">
                <dt className="flex items-center gap-2 text-ink-subtle">
                  <BrandIcon kind={link.kind} className="size-4 print:hidden" />
                  <span>{link.label}:</span>
                </dt>
                <dd>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="break-all text-ink hover:underline">
                    {link.url.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {/* 2 — Research interests */}
        <CvSection id="interests" title="Research interests">
          <div className="space-y-3">
            <p className="text-[0.9375rem] leading-relaxed text-ink">
              {profile.researchInterests.join(" · ")}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-ink-muted">{profile.researchStatement}</p>
            <CvLine label="Future directions">{profile.currentlyInterestedIn.join(", ")}</CvLine>
          </div>
        </CvSection>

        {/* 3 — Education */}
        <CvSection id="education" title="Education">
          {education.map((entry) => (
            <CvEntry
              key={entry.id}
              title={entry.degree}
              subtitle={`${entry.institution} · ${entry.location}`}
              period={formatPeriod(entry.period)}
            >
              {entry.grade ? <CvLine label="Final grade">{entry.grade}</CvLine> : null}
              {entry.thesis ? <CvLine label="Thesis">{entry.thesis.label}</CvLine> : null}
              {entry.focus ? (
                <CvLine label={entry.focusLabel ?? "Focus"}>{entry.focus.join(", ")}</CvLine>
              ) : null}
              {entry.coursework ? (
                <CvLine label="Relevant coursework">{entry.coursework.join(", ")}</CvLine>
              ) : null}
            </CvEntry>
          ))}
        </CvSection>

        {/* 4 — Research experience */}
        <CvSection id="research" title="Research experience">
          <CvEntry
            title={thesis.title}
            subtitle={`${thesis.type} · ${thesis.institution}`}
            period={formatPeriod(thesis.period)}
          >
            <CvBullets items={thesis.cvBullets} />
            <CvLine label="Tools">{thesis.technologies.join(", ")}</CvLine>
            <CvDetailLink href={thesis.href} label="Method, complete results and figures" />
          </CvEntry>

          {researchProjects.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </CvSection>

        {/* 5 — Selected engineering projects */}
        <CvSection id="projects" title="Selected engineering projects">
          {engineeringProjects.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </CvSection>

        {/* 6 — Awards */}
        <CvSection id="awards" title="Awards">
          <ul className="space-y-2.5 text-[0.9375rem]">
            {awards.map((award) => (
              <li key={award.id} className="avoid-break grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3">
                <span className="font-mono text-[0.8125rem] leading-6 text-ink-subtle">{award.year}</span>
                <span>
                  <span className="font-medium text-ink">{award.title}</span>
                  <span className="text-ink-muted"> — {award.context}</span>
                </span>
              </li>
            ))}
          </ul>
        </CvSection>

        {/* 7 — Technical skills */}
        <CvSection id="skills" title="Technical skills">
          {skillGroups.map((group) => (
            <div key={group.id} className="avoid-break">
              <h3 className="text-[0.9375rem] font-semibold text-ink">
                {group.title}
                <span className="font-normal text-ink-subtle"> — {group.note.toLowerCase()}</span>
              </h3>
              <dl className="mt-2 space-y-1.5 text-[0.9375rem]">
                {group.categories.map((category) => (
                  <div
                    key={category.id}
                    className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[11rem_minmax(0,1fr)] print:grid-cols-[38mm_minmax(0,1fr)]"
                  >
                    <dt className="text-ink">{category.title}</dt>
                    <dd className="text-ink-muted">{category.skills.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </CvSection>

        {/* 8 — International experience */}
        <CvSection id="international" title="International experience">
          {internationalExperience.map((entry) => (
            <CvEntry
              key={entry.id}
              title={entry.title}
              subtitle={[entry.institution, entry.location].filter(Boolean).join(" · ")}
              period={formatPeriod(entry.period)}
            >
              <CvBullets items={entry.points} />
            </CvEntry>
          ))}
        </CvSection>

        {/* 9 — Languages */}
        <CvSection id="languages" title="Languages">
          <dl className="grid gap-x-8 gap-y-1.5 text-[0.9375rem] sm:grid-cols-3 print:grid-cols-3">
            {profile.languages.map((language) => (
              <div key={language.name} className="flex gap-2">
                <dt className="font-medium text-ink">{language.name}</dt>
                <dd className="text-ink-muted">— {language.level}</dd>
              </div>
            ))}
          </dl>
        </CvSection>

        <footer className="border-t border-line pt-6 text-[0.8125rem] text-ink-subtle print:pt-3">
          <p>
            Last updated{" "}
            <time dateTime={siteConfig.lastUpdated}>{formatDate(siteConfig.lastUpdated)}</time>
            <span className="hidden print:inline">
              {" "}
              · Online version with project details: {displayUrl("/cv")}
            </span>
          </p>
        </footer>
      </Container>
    </article>
  );
}
