import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { getConfiguredLinks, profile, publicEmails } from "@/data/profile";
import { contactNav, mainNav, siteConfig } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  const links = getConfiguredLinks();
  const emails = publicEmails();

  return (
    <footer className="mt-auto border-t border-line bg-surface print:hidden">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-5 text-accent" />
            <p className="font-serif text-lg font-semibold text-ink">{profile.name}</p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            {profile.headline}. {profile.position.programme},{" "}
            {profile.position.institution}.
          </p>
          {links.length > 0 ? (
            <ul className="mt-4 flex gap-2">
              {links.map((link) => (
                <li key={link.kind}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink"
                  >
                    <BrandIcon kind={link.kind} className="size-4" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Pages</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {[...mainNav, contactNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            {emails.map((email) => (
              <li key={email.address}>
                <span className="sr-only">{email.label}: </span>
                <a
                  href={`mailto:${email.address}`}
                  className="break-all text-ink-muted underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink-subtle"
                >
                  {email.address}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            Research homepage of {profile.name}.{" "}
            <Link href="/cv" className="underline underline-offset-4 hover:text-ink">
              Academic background &amp; CV
            </Link>
          </p>
          <p className="font-mono">
            Last updated{" "}
            <time dateTime={siteConfig.lastUpdated}>{formatDate(siteConfig.lastUpdated)}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
