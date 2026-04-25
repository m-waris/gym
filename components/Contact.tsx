"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ContactForm from "@/components/ContactForm";

const INFO_ROWS = [
  {
    label: "OUR GYM",
    value: "Bahria Town Lahore, Pakistan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21C12 21 5 14.75 5 9.75C5 5.75 8.13 3 12 3C15.87 3 19 5.75 19 9.75C19 14.75 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "OPEN HOURS",
    value: "Mon-Fri: 6:00 AM - 11:00 PM\nSat-Sun: 7:00 AM - 9:00 PM",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "REACH US",
    value: "hello@laforza.com\n+92 300 1234567",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full border-t border-accent bg-[#0D0D0D] px-5 py-24 md:px-10 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          className="mb-3 block font-body text-xs uppercase tracking-[0.4em] text-accent"
          initial={{ opacity: 0, letterSpacing: "0.22em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.35em" } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          GET IN TOUCH
        </motion.p>

        <div data-cursor="text" className="overflow-hidden">
          <motion.h2
            className="mb-12 font-display text-[clamp(52px,7vw,96px)] leading-none text-white"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            FIND US.
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-10"
          >
            {INFO_ROWS.map((row, index) => (
              <motion.div
                key={row.label}
                className="flex items-start gap-5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2A2A2A] text-accent">
                  {row.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-[#555555]">
                    {row.label}
                  </p>
                  <p className="whitespace-pre-line font-body text-[15px] leading-relaxed text-[#F5F5F5]">
                    {row.value}
                  </p>

                  {row.label === "OUR GYM" && (
                    <a
                      href="https://maps.app.goo.gl/LSXaCCMdQKjyHRKK8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 font-body text-sm text-accent transition-colors duration-200 hover:underline"
                    >
                      VIEW ON GOOGLE MAPS -&gt;
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
