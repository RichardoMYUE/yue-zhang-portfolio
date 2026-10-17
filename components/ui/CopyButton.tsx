"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label: string;
  className?: string;
}

/** Copies text to the clipboard and confirms via a polite live region. */
export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink print:hidden",
        className,
      )}
    >
      {copied ? (
        <Check aria-hidden className="size-4 text-understanding" />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
      <span className="sr-only"> {label}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}
