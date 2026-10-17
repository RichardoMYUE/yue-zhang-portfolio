"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3.5 text-sm font-medium text-ink transition-colors hover:border-ink-subtle hover:bg-surface-muted print:hidden"
    >
      <Printer aria-hidden className="size-4" />
      Print / Save as PDF
    </button>
  );
}
