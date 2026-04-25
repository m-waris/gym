"use client";

import { gsap } from "gsap";
import { useEffect } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Hide the CSS loader instantly — GSAP takes over
    const cssLoader = document.getElementById("css-loader");
    if (cssLoader) {
      cssLoader.style.display = "none";
    }

    // Create curtain elements dynamically
    const top = document.createElement("div");
    const bottom = document.createElement("div");

    const shared: Partial<CSSStyleDeclaration> = {
      position: "fixed",
      left: "0",
      right: "0",
      background: "#0A0A0A",
      zIndex: "9999",
    };

    Object.assign(top.style, { ...shared, top: "0", height: "50%" });
    Object.assign(bottom.style, { ...shared, bottom: "0", height: "50%" });

    document.body.appendChild(top);
    document.body.appendChild(bottom);

    // Small delay so curtains paint before animating
    const timer = setTimeout(() => {
      const tl = gsap.timeline();

      tl.to(top, {
        y: "-100%",
        duration: 0.55,
        ease: "power2.inOut",
      });

      tl.to(
        bottom,
        {
          y: "100%",
          duration: 0.55,
          ease: "power2.inOut",
          onComplete: () => {
            top.remove();
            bottom.remove();
            document.body.style.overflow = originalOverflow;
            onComplete();
          },
        },
        "<", // same time as top
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      top.remove();
      bottom.remove();
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  return null; // renders nothing — all DOM is handled imperatively
}