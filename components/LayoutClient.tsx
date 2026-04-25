"use client";

import ScrollProgress from "@/components/ScrollProgress";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}