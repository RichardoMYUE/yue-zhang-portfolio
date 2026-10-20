import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { EducationTimeline } from "@/components/education/EducationTimeline";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { flagshipResearch } from "@/data/research";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Yue Zhang: M.Sc. Embedded Systems student at TU Chemnitz with research interests in robot perception, scene understanding and robotic manipulation.",
  path: "/about",
});

export default function AboutPage() {
  const facts = [
    { label: "Current", value: `${profile.position.programme}, ${profile.position.institution}` },
    { label: "Based in", value: profile.position.location },
    { label: "B.Sc. thesis", value: flagshipResearch.shortTitle, href: flagshipResearch.href },
    {
      label: "Languages",
      value: profile.languages
        .map((language) => `${language.name} (${[language.level, language.certificate].filter(Boolean).join(", ")})`)
        .join(", "),
    },
    { label: "Email", value: profile.email.primary.address, href: `mailto:${profile.email.primary.address}` },
  ];

  return (
    <>
      <PageHeader eyebrow="About" title={profile.name} lead={<p>{profile.headline}</p>} />

      <Container className="py-14 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <div className="min-w-0 space-y-14">
            <section aria-labelledby="bio-title">
              <h2 id="bio-title" className="eyebrow">
                Short biography
              </h2>
              <div className="mt-4 max-w-[68ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink">
                {profile.about.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="perspective-title">
              <h2 id="perspective-title" className="eyebrow">
                Research perspective
              </h2>
              <div className="mt-4 max-w-[68ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-muted">
                {profile.about.perspective.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/research">
                  Research
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <ButtonLink href="/cv" variant="secondary">
                  Background &amp; CV
                </ButtonLink>
              </div>
            </section>

            <section aria-labelledby="path-title" className="border-t border-line pt-12">
              <SectionHeading id="path-title" eyebrow="Education" title="Academic path" />
              <div className="mt-8">
                <EducationTimeline />
              </div>
            </section>
          </div>

          <aside aria-label="At a glance" className="lg:pt-1">
            <div className="rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24">
              <p className="eyebrow">At a glance</p>
              <dl className="mt-4 divide-y divide-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="py-3 first:pt-0 last:pb-0">
                    <dt className="text-[0.8125rem] text-ink-subtle">{fact.label}</dt>
                    <dd className="mt-0.5 text-[0.9375rem] leading-snug break-words text-ink">
                      {fact.href ? (
                        <Link
                          href={fact.href}
                          className="underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                        >
                          {fact.value}
                        </Link>
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 border-t border-line pt-4">
                <p className="eyebrow">Research interests</p>
                <ul className="mt-2 space-y-1 text-[0.9375rem] text-ink-muted">
                  {profile.researchInterests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
