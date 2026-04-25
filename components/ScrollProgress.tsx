"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed left-0 top-0 z-[9997] h-[2px] w-full origin-left bg-[#FF2020]"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
