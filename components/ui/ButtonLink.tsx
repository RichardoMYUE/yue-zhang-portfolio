import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Use a plain <a> (mailto:, external URLs). */
  external?: boolean;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong border border-transparent shadow-sm",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-ink-subtle hover:bg-surface-muted",
  ghost: "border border-transparent text-ink hover:bg-surface-muted",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4.5 text-[0.9375rem] font-medium transition-colors duration-150",
    variants[variant],
    className,
  );

  if (external) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
