import { ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { getConfiguredLinks, profile, publicEmails } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact Yue Zhang by email: ${profile.email.primary.address}.`,
  path: "/contact",
});

export default function ContactPage() {
  const links = getConfiguredLinks();
  const emails = publicEmails();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        size="narrow"
        lead={
          <p>
            {profile.openTo} Email is the best way to reach me.
          </p>
        }
      />

      <Container size="narrow" className="py-14 sm:py-16">
        <ul className="space-y-4">
          {emails.map((email) => (
            <li
              key={email.address}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="min-w-0">
                <p className="eyebrow">{email.label}</p>
                <a
                  href={`mailto:${email.address}`}
                  className="mt-2 inline-flex items-center gap-2.5 font-mono text-[1.0625rem] break-all text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent sm:text-lg"
                >
                  <Mail aria-hidden className="size-5 shrink-0 text-accent" />
                  {email.address}
                </a>
              </div>
              <CopyButton value={email.address} label={`${email.label} address`} />
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-line pt-10">
          <p className="eyebrow">Location</p>
          <p className="mt-2 flex items-center gap-2 text-ink">
            <MapPin aria-hidden className="size-4 text-ink-subtle" />
            {profile.position.location}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {profile.position.programme}, {profile.position.institution}
          </p>
        </div>

        {links.length > 0 ? (
          <div className="mt-10 border-t border-line pt-10">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {links.map((link) => (
                <li key={link.kind}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3.5 text-sm text-ink hover:border-line-strong"
                  >
                    <BrandIcon kind={link.kind} className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 rounded-2xl border border-line bg-surface-muted/60 p-5 sm:p-6">
          <p className="text-ink">Looking for my background first?</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/research"
              className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-strong"
            >
              Research <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/cv" className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-strong">
              Background &amp; CV <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
