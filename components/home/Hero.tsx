import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { education } from "@/data/education";
import { getConfiguredLinks, profile } from "@/data/profile";
import { projectHref, projects } from "@/data/projects";
import { flagshipResearch } from "@/data/research";
import { yearRange } from "@/lib/utils";

export function Hero() {
  const links = getConfiguredLinks();
  const [current, previous] = education;

  const glance: { label: string; value: ReactNode }[] = [
    {
      label: "Now",
      value: (
        <>
          {current.degree}, {current.institutionShort}
          <span className="text-ink-subtle"> · since {current.period.start}</span>
        </>
      ),
    },
    {
      label: "Previously",
      value: (
        <>
          {previous.degree}, {previous.institutionShort}
          <span className="text-ink-subtle"> · {yearRange(previous.period)}</span>
        </>
      ),
    },
    {
      label: "B.Sc. thesis",
      value: (
        <Link
          href={flagshipResearch.href}
          className="underline decoration-line-strong underline-offset-4 hover:decoration-accent"
        >
          {flagshipResearch.shortTitle}
          <ArrowUpRight aria-hidden className="ml-1 inline size-3.5 align-[-0.125em] text-ink-subtle" />
        </Link>
      ),
    },
    {
      label: "Also",
      value: (
        <ul className="space-y-0.5">
          {projects
            .filter((project) => project.emphasis === "primary")
            .map((project) => (
              <li key={project.slug}>
                <Link
                  href={projectHref(project.slug)}
                  className="underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                >
                  {project.shortTitle}
                </Link>
              </li>
            ))}
        </ul>
      ),
    },
    { label: "Used in practice", value: profile.usedInPractice.join(" · ") },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_80%_at_25%_35%,black_20%,transparent_75%)]"
      />
      <Container className="relative grid gap-10 pt-12 pb-14 sm:pt-16 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-14 lg:pt-16 lg:pb-16">
        <div>
          <p className="eyebrow">
            {profile.position.programme} ·{" "}
            <span className="sm:hidden">{profile.position.institutionShort}</span>
            <span className="hidden sm:inline">{profile.position.institution}</span>
          </p>
          <h1
            id="hero-title"
            className="mt-4 font-serif text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl lg:text-[4rem]"
          >
            {profile.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-accent sm:text-2xl">{profile.headline}</p>

          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink">{profile.intro}</p>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink-muted sm:text-[1.0625rem]">
            {profile.researchStatement}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <ButtonLink href="/research" className="col-span-2 sm:col-span-1">
              View Research
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/cv" variant="secondary">
              View CV
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact Me
            </ButtonLink>
            {links
              .filter((link) => link.kind === "github")
              .map((link) => (
                <a
                  key={link.kind}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-muted hover:text-ink"
                >
                  <BrandIcon kind={link.kind} className="size-5" />
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
            <Mail aria-hidden className="size-4 text-ink-subtle" />
            <a
              href={`mailto:${profile.email.primary.address}`}
              className="font-mono text-[0.8125rem] break-all underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink-subtle"
            >
              {profile.email.primary.address}
            </a>
          </p>
        </div>

        <aside
          aria-label="At a glance"
          className="self-start rounded-2xl border border-line bg-surface/90 p-5 shadow-card backdrop-blur-sm sm:p-6"
        >
          <p className="eyebrow">At a glance</p>
          <dl className="mt-4 divide-y divide-line">
            {glance.map((row) => (
              <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-3 py-3 first:pt-0 last:pb-0">
                <dt className="text-[0.8125rem] text-ink-subtle">{row.label}</dt>
                <dd className="text-[0.875rem] leading-snug text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </Container>
    </section>
  );
}
