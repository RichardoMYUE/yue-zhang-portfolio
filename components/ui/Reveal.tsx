"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Subtle one-time entrance for below-the-fold content. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}
