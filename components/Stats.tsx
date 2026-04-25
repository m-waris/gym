"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const STATS: StatItem[] = [
  { value: 12, suffix: "", label: "YEARS EXPERIENCE" },
  { value: 98, suffix: "%", label: "SUCCESS RATE" },
  { value: 2400, suffix: "+", label: "MEMBERS" },
  { value: 50, suffix: "+", label: "WEEKLY CLASSES" },
];

function StatCard({
  stat,
  index,
  start,
}: {
  stat: StatItem;
  index: number;
  start: boolean;
}) {
  const count = useCountUp(stat.value, 1300, start);

  return (
    <motion.article
      className="relative flex flex-col items-center justify-center border-r border-[#2A2A2A] px-8 py-12 text-center last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <p className="font-display text-[clamp(60px,8vw,96px)] leading-none text-white">
        {count}
        {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
      </p>
      <p className="mt-3 font-body text-xs uppercase tracking-[0.3em] text-[#555555]">
        {stat.label}
      </p>
    </motion.article>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="stats" ref={sectionRef} className="w-full bg-dark px-5 py-20 md:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
