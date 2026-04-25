"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "La Forza completely transformed my body and mindset. Best investment I've ever made in myself.",
    name: "AHMED RAZA",
    role: "Member since 2022",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    quote:
      "The coaches push you beyond what you think is possible. I've never felt stronger.",
    name: "FATIMA MALIK",
    role: "Member since 2021",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    quote:
      "The community here is unlike any gym I've been to. Results speak for themselves.",
    name: "USMAN ALI",
    role: "Member since 2023",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
];

function Stars() {
  return (
    <div className="mt-2 flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2L14.9 8.2L22 9.1L16.8 13.9L18.2 21L12 17.4L5.8 21L7.2 13.9L2 9.1L9.1 8.2L12 2Z"
            fill="#FF2020"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pauseRef = useRef(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (pauseRef.current) return;
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      ref={headerRef}
      className="w-full bg-[#0D0D0D] px-5 py-24 md:px-10 lg:px-20"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          className="mb-3 block font-body text-xs uppercase tracking-[0.4em] text-accent"
          initial={{ opacity: 0, letterSpacing: "0.22em" }}
          animate={
            isHeaderInView
              ? { opacity: 1, letterSpacing: "0.35em" }
              : { opacity: 0, letterSpacing: "0.22em" }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          WHAT THEY SAY
        </motion.p>

        <div data-cursor="text" className="overflow-hidden">
          <motion.h2
            className="mb-12 font-display text-[clamp(52px,7vw,96px)] leading-none text-white"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isHeaderInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            RESULTS
          </motion.h2>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p
                className="mb-0 block font-display text-[96px] text-accent opacity-30"
                style={{ lineHeight: 0.7 }}
              >
                &quot;
              </p>
              <p className="mt-4 font-body text-[18px] italic leading-relaxed text-white md:text-[20px]">
                {active.quote}
              </p>

              <Stars />

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={active.avatar}
                    alt={`${active.name} avatar`}
                    width={48}
                    height={48}
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="text-left">
                  <p className="font-display text-[18px] leading-none text-[#F5F5F5]">{active.name}</p>
                  <p className="mt-1 font-body text-[12px] text-[#555555]">{active.role}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-10 flex justify-center gap-2">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                  activeIndex === index ? "bg-accent" : "bg-[#2A2A2A]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
