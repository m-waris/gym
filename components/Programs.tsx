"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Program = {
  name: string;
  desc: string;
  duration: string;
  icon: React.ReactNode;
};

const iconClassName = "h-5 w-5 text-accent";

const PROGRAMS: Program[] = [
  {
    name: "Powerlifting",
    desc: "Build raw strength",
    duration: "60 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M2 12H22M2 8V16M5 6V18M19 6V18M22 8V16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "HIIT",
    desc: "Burn fat, build endurance",
    duration: "45 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M13 2L5 13H11L9 22L19 10H13L13 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "CrossFit",
    desc: "Functional fitness",
    duration: "55 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M12 3V21M3 12H21M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Boxing",
    desc: "Technique meets power",
    duration: "60 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M8 11C8 8.79 9.79 7 12 7H13C15.21 7 17 8.79 17 11V12H8V11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 12H18V15C18 17.21 16.21 19 14 19H11C8.79 19 7 17.21 7 15V12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Yoga",
    desc: "Mobility and recovery",
    duration: "50 min",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M5 15C8 12 16 12 19 15M8 22L12 16L16 22"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Nutrition",
    desc: "Fuel your performance",
    duration: "Ongoing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClassName} aria-hidden="true">
        <path
          d="M12 21C7.58 21 4 17.42 4 13C4 8.58 7.58 5 12 5C16.42 5 20 8.58 20 13C20 17.42 16.42 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 5C12 3 13 2 15 2M9 12C9.8 10.4 11.2 9.5 13 9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Programs() {
  const headerRef = useRef<HTMLElement | null>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section id="programs" ref={headerRef} className="w-full bg-dark px-5 py-24 md:px-10 lg:px-20">
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
          WHAT WE OFFER
        </motion.p>

        <div data-cursor="text" className="overflow-hidden">
          <motion.h2
            className="mb-12 font-display text-[clamp(52px,7vw,96px)] leading-none text-white"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isHeaderInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            PROGRAMS
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, index) => (
            <motion.article
              key={program.name}
              className="group relative flex min-h-[200px] flex-col gap-3 overflow-hidden border border-[#2A2A2A] bg-card p-7 transition-transform duration-300 hover:-translate-y-1"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
            >
              <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-250 group-hover:scale-y-100" />

              <div className="relative z-10 flex items-center justify-between">
                <span>{program.icon}</span>
                <span className="bg-[#1A1A1A] px-2 py-1 text-xs text-accent">
                  {program.duration}
                </span>
              </div>

              <h3 className="relative z-10 font-display text-[32px] leading-none text-white transition-colors duration-300 group-hover:text-accent">
                {program.name}
              </h3>
              <p className="relative z-10 font-body text-sm text-[#E5E5E5]">
                {program.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
