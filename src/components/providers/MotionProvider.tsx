"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "framer-motion";

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  );
}
