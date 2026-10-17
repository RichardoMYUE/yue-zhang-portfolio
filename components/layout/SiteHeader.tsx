"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { contactNav, mainNav } from "@/data/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenOn(null);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpenOn(null);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={close}
          className="group flex items-center gap-2.5 rounded-md"
          aria-label={`${profile.name} — home`}
        >
          <LogoMark className="size-6 text-accent" />
          <span className="font-serif text-[1.1875rem] font-semibold tracking-tight text-ink">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 self-stretch md:flex">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-full items-center px-3 text-[0.9375rem] transition-colors",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
          <span aria-hidden className="mx-2 h-5 w-px bg-line" />
          <ThemeToggle />
          <Link
            href={contactNav.href}
            aria-current={isActive(pathname, contactNav.href) ? "page" : undefined}
            className="ml-2 inline-flex h-9 items-center rounded-lg bg-ink px-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            {contactNav.label}
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-muted"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <>
            <m.div
              key="backdrop"
              aria-hidden
              onClick={close}
              className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] bg-ink/15 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <m.nav
              key="menu"
              id="mobile-menu"
              aria-label="Main"
              className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-card md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
                {[...mainNav, contactNav].map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-3 text-base transition-colors",
                          active
                            ? "bg-surface-muted font-medium text-ink"
                            : "text-ink-muted hover:bg-surface-muted hover:text-ink",
                        )}
                      >
                        {item.label}
                        {active ? (
                          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <p className="mx-auto max-w-6xl border-t border-line px-7 py-3 font-mono text-xs text-ink-subtle sm:px-9">
                {profile.email.primary.address}
              </p>
            </m.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
