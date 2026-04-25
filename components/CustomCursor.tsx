"use client";

import { useEffect, useRef, useState } from "react";
import { useCursorState } from "@/hooks/useCursorState";

const EASE = 0.08;

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const variant = useCursorState();
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const ringX = useRef(-100);
  const ringY = useRef(-100);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Safe to access navigator here — we're in the browser
    if (navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      // Dot snaps instantly
      dot.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px)`;
    };

    const onDown = () => {
      ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px) scale(0.75)`;
      dot.style.transform  = `translate(${mouseX.current}px, ${mouseY.current}px) scale(0.75)`;
    };

    const onUp = () => {
      // scale reset handled by rAF on next frame
    };

    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * EASE;
      ringY.current += (mouseY.current - ringY.current) * EASE;
      ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        id="cursor-ring"
        ref={ringRef}
        className={variant !== "default" ? `cursor--${variant}` : ""}
      >
        <span className="cursor-view-label">VIEW</span>
      </div>
      <div id="cursor-dot" ref={dotRef} />
    </>
  );
}