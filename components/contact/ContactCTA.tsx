import { ArrowRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { publicEmails, profile } from "@/data/profile";

export function ContactCTA() {
  const emails = publicEmails();

  return (
    <section aria-labelledby="contact-cta-title" className="print:hidden">
      <div className="rounded-2xl border border-line bg-surface px-6 py-9 shadow-card sm:px-10 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="eyebrow">Contact</p>
            <h2
              id="contact-cta-title"
              className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-tight text-ink"
            >
              Get in touch
            </h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-muted">
              {profile.openTo} Email is the best way to reach me.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <ButtonLink href={`mailto:${profile.email.primary.address}`} external>
              <Mail aria-hidden className="size-4" />
              Email
            </ButtonLink>
            <ButtonLink href="/cv" variant="secondary">
              Background & CV
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-6 text-sm">
          {emails.map((email) => (
            <div key={email.address}>
              <dt className="text-ink-subtle">{email.label}</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${email.address}`}
                  className="font-mono text-[0.875rem] break-all text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                >
                  {email.address}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
