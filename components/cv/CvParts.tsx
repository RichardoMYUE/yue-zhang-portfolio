import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { displayUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

/** A labelled CV section: label column on the left, content on the right. */
export function CvSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={`cv-${id}`}
      aria-labelledby={`cv-${id}-title`}
      className="grid scroll-mt-24 gap-x-10 gap-y-4 border-t border-line py-8 md:grid-cols-[10rem_minmax(0,1fr)] print:grid-cols-[28mm_minmax(0,1fr)] print:gap-x-6 print:py-3"
    >
      <h2
        id={`cv-${id}-title`}
        className="font-mono text-[0.75rem] leading-6 font-medium tracking-[0.08em] text-ink uppercase print:leading-5"
      >
        {title}
      </h2>
      <div className="min-w-0 space-y-7 print:space-y-3">{children}</div>
    </section>
  );
}

interface CvEntryProps {
  title: ReactNode;
  subtitle?: ReactNode;
  period?: string;
  children?: ReactNode;
  className?: string;
}

export function CvEntry({ title, subtitle, period, children, className }: CvEntryProps) {
  return (
    <div className={cn("avoid-break", className)}>
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:items-baseline print:justify-between print:gap-6">
        <h3 className="text-[1.0625rem] leading-snug font-semibold text-ink">{title}</h3>
        {period ? (
          <p className="shrink-0 font-mono text-[0.8125rem] text-ink-subtle sm:text-right">{period}</p>
        ) : null}
      </div>
      {subtitle ? <p className="mt-0.5 text-[0.9375rem] text-ink-muted">{subtitle}</p> : null}
      {children ? (
        <div className="mt-2.5 space-y-2 text-[0.9375rem] leading-relaxed print:mt-1.5 print:space-y-1 print:leading-normal">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/** A labelled line inside an entry, e.g. "Coursework: …". */
export function CvLine({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="text-ink-muted">
      <span className="font-medium text-ink">{label}: </span>
      {children}
    </p>
  );
}

export function CvBullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-ink-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.7em] h-px w-2.5 shrink-0 bg-ink-subtle" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** On screen: a link to the detail page. In print: the full URL. */
export function CvDetailLink({ href, label = "Full project page" }: { href: string; label?: string }) {
  return (
    <p className="text-sm">
      <Link
        href={href}
        className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-strong print:hidden"
      >
        {label}
        <ArrowUpRight aria-hidden className="size-3.5" />
      </Link>
      <span className="hidden font-mono text-[0.8125rem] text-ink-subtle print:inline">
        Details: {displayUrl(href)}
      </span>
    </p>
  );
}
