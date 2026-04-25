"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const handlerRef = useRef<() => void>(() => {});

  useEffect(() => {
    handlerRef.current = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const next = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
      setProgress(next);
    };

    const onScroll = () => handlerRef.current();
    window.addEventListener("scroll", onScroll, { passive: true });
    handlerRef.current();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return progress;
}
