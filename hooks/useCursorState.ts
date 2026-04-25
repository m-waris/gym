"use client";

import { useEffect, useState } from "react";

export type CursorVariant = "default" | "pointer" | "text" | "view";

export function useCursorState(): CursorVariant {
  const [variant, setVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        setVariant("default");
        return;
      }

      if (target.closest('[data-cursor="text"]')) {
        setVariant("text");
        return;
      }

      if (target.closest('[data-cursor="view"]')) {
        setVariant("view");
        return;
      }

      if (target.closest("a, button")) {
        setVariant("pointer");
        return;
      }

      setVariant("default");
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return variant;
}
