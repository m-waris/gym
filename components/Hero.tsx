"use client";

import { motion, TargetAndTransition, Transition } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import pushUpIcon from "@/public/gym.json";

const HEADLINE_WORDS = ["BREAK", "YOUR", "LIMITS."];

const LOADER_OFFSET = 1.5;

const wordVariants: {
  initial: TargetAndTransition | undefined;
  animate: TargetAndTransition | undefined;
  transition: Transition<any> | undefined
}[] = [
    // BREAK — slams in from left with skew
    {
      initial: { x: "-120%", skewX: -20, opacity: 0 },
      animate: { x: "0%", skewX: 0, opacity: 1 },
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: LOADER_OFFSET + 0.1,
      },
    },
    // YOUR — drops from above with spring
    {
      initial: { y: "-130%", scaleY: 1.4, opacity: 0 },
      animate: { y: "0%", scaleY: 1, opacity: 1 },
      transition: {
        duration: 0.65,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        delay: LOADER_OFFSET,
      },
    },
    // LIMITS. — explodes from center with blur
    {
      initial: { scale: 0.2, opacity: 0, filter: "blur(12px)" },
      animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: LOADER_OFFSET,
      },
    },
  ];

export default function Hero() {
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHideScrollIndicator(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full bg-black px-5 py-24 pt-[72px] md:px-10 lg:px-20"
    >
      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-2 sm:gap-12 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center py-10 md:py-15">
          <div data-cursor="text" className="leading-[0.92]">
            {HEADLINE_WORDS.map((word, index) => {
              const isLimits = index === 2;
              const v = wordVariants[index];

              return (
                <div
                  key={word}
                  className={`overflow-hidden ${index === 1 ? "ml-4 lg:ml-8" : ""}`}
                >
                  <motion.span
                    className={`block text-center font-display
                      text-[clamp(72px,12vw,200px)] leading-[0.9] lg:text-left
                      ${isLimits ? "text-accent" : "text-white"}`}
                    initial={v.initial}
                    animate={v.animate}
                    transition={v.transition}
                    style={{ display: "block", transformOrigin: "left center" }}
                  >
                    {word}
                  </motion.span>
                </div>
              );
            })}
          </div>

          {/* Underline draws after all words land */}
          <motion.div
            className="mt-1 h-[3px] w-full max-w-[clamp(200px,40vw,520px)] self-center bg-accent lg:self-start"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: LOADER_OFFSET + 1.2,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            style={{ transformOrigin: "left center" }}
          />

          <motion.p
            className="mt-6 text-center font-body text-base tracking-widest opacity-30 md:text-lg lg:text-left"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: LOADER_OFFSET + 1.0, duration: 0.6 }}
          >
            Elite training. Zero excuses. Real results.
          </motion.p>
        </div>

        <motion.div
          className="relative sm:h-[500px] sm:min-h-[400px] w-full overflow-hidden lg:h-full"

          initial={{ x: "120%", skewX: -20, opacity: 0 }}
          animate={{ x: "0%", skewX: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            delay: LOADER_OFFSET + 0.1,
          }}
        >
          <Lottie
            animationData={pushUpIcon}
            loop={true}
            autoplay={true}
          />
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: hideScrollIndicator ? 0 : 1,
          y: [0, 8, 0],
        }}
        transition={{
          opacity: { delay: LOADER_OFFSET + 1.4, duration: 0.4 },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.6,
            ease: "easeInOut",
          },
        }}
      >
        <span className="h-10 w-px bg-accent" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9L12 15L18 9"
            stroke="#FF2020"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}