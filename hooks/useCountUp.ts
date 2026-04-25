"use client";

import { useEffect, useMemo, useState } from "react";

type CountUpTarget = number | `${number}${string}`;

function parseTarget(target: CountUpTarget): { value: number; suffix: string } {
  if (typeof target === "number") {
    return { value: target, suffix: "" };
  }

  const match = target.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { value: 0, suffix: "" };
  }

  return {
    value: Number(match[1]),
    suffix: match[2] ?? "",
  };
}

export function useCountUp(
  target: CountUpTarget,
  duration: number,
  start: boolean,
): string {
  const [current, setCurrent] = useState(0);

  const parsed = useMemo(() => parseTarget(target), [target]);

  useEffect(() => {
    if (!start) {
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const nextValue = parsed.value * easeOutExpo;

      setCurrent(nextValue);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCurrent(parsed.value);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [duration, parsed.value, start]);

  const roundedValue = useMemo(() => (start ? Math.round(current) : 0), [current, start]);
  return `${roundedValue}${parsed.suffix}`;
}
