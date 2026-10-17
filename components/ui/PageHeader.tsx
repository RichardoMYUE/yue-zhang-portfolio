import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LinkRef } from "@/data/types";
import { Container } from "./Container";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  breadcrumbs?: LinkRef[];
  children?: ReactNode;
  size?: "default" | "narrow";
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
  size = "default",
}: PageHeaderProps) {
  return (
    <header className="border-b border-line">
      <Container size={size} className="pt-12 pb-12 sm:pt-16 sm:pb-14">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6 print:hidden">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-subtle">
              {breadcrumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  <Link href={crumb.href} className="hover:text-ink">
                    {crumb.label}
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5" />
                </li>
              ))}
              <li aria-current="page" className="text-ink-muted">
                {eyebrow}
              </li>
            </ol>
          </nav>
        ) : null}
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <div className="mt-6 max-w-[68ch] space-y-3 text-lg leading-relaxed text-ink-muted">{lead}</div>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
