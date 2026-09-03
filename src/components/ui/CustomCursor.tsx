"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — SPEC.md §4.5
 *
 * Desktop pointer devices only: a 1px gold ring (8px) that follows the
 * cursor with an ~80ms lerp. Hidden on touch and when reduced-motion is set.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    let frame = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let visible = false;

    const lerp = 1 - Math.exp(-1 / (0.08 * 60)); // ~80ms toward target at 60fps

    const tick = () => {
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;
      ring.style.transform = `translate3d(${currentX - 4}px, ${currentY - 4}px, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        currentX = targetX;
        currentY = targetY;
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button']",
      );
      ring.dataset.active = interactive ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full border border-gold-champagne opacity-0 transition-[border-width] duration-200 ease-standard md:block data-[active=true]:border-2"
      style={{ willChange: "transform" }}
    />
  );
}

export default CustomCursor;
