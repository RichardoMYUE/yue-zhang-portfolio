import Image from "next/image";
import type { ReactNode } from "react";
import type { ThesisFigure as ThesisFigureData } from "@/data/types";
import { cn } from "@/lib/utils";

interface ThesisFigureProps {
  figure: ThesisFigureData;
  /** Responsive `sizes` hint for next/image. */
  sizes: string;
  className?: string;
  /** Extra caption content below the figure's own caption. */
  children?: ReactNode;
}

/** A figure taken from the thesis, with its source figure number. */
export function ThesisFigure({ figure, sizes, className, children }: ThesisFigureProps) {
  return (
    <figure className={cn("avoid-break", className)}>
      <div className="overflow-hidden rounded-xl border border-line bg-white p-2">
        <Image
          src={figure.src}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-2 text-[0.8125rem] leading-relaxed text-ink-subtle">
        <span className="font-medium text-ink-muted">{figure.caption}</span>
        <span className="font-mono text-[0.75rem]"> · {figure.source}</span>
        {children}
      </figcaption>
    </figure>
  );
}
