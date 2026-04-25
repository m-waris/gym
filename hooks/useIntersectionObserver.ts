"use client";

import { RefObject, useEffect, useState } from "react";

type IntersectionOptions = {
  threshold?: number | number[];
  rootMargin?: string;
};

export function useIntersectionObserver<T extends Element>(
  ref: RefObject<T | null>,
  options: IntersectionOptions = {},
  onEnter?: () => void,
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        setIsVisible(true);
        onEnter?.();
        observer.disconnect();
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? "0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [onEnter, options.rootMargin, options.threshold, ref]);

  return isVisible;
}
