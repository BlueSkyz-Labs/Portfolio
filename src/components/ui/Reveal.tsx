"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly distance?: 8 | 16 | 24;
  readonly className?: string;
}

export function Reveal({
  children,
  delay = 0,
  distance = 16,
  className,
}: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
