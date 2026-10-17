"use client";

import { Moon, Sun } from "lucide-react";

function currentTheme(): "light" | "dark" {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Switches between light and dark. Icons are toggled purely with CSS based
 * on <html data-theme>, so server and client markup are identical.
 */
export function ThemeToggle() {
  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="inline-flex size-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
    >
      <Moon aria-hidden className="theme-icon-to-dark size-[1.1rem]" />
      <Sun aria-hidden className="theme-icon-to-light size-[1.1rem]" />
    </button>
  );
}
