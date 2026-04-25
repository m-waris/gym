"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type Tier = {
  name: string;
  tag?: string;
  monthly: number;
  quarterly: number;
  biYearly: number;
  yearly: number;
};

type MembershipType = {
  label: string;
  description: string;
  tiers: Tier[];
  note?: string;
};

const MEMBERSHIPS: MembershipType[] = [
  {
    label: "Individual",
    description: "Founding Member rates — first 150 members. No Registration Fees.",
    tiers: [
      {
        name: "Basic",
        monthly: 9000,
        quarterly: 25000,
        biYearly: 47000,
        yearly: 85000,
      },
      {
        name: "Premium",
        tag: "Sauna, Steam & Coldbath",
        monthly: 13000,
        quarterly: 36000,
        biYearly: 70000,
        yearly: 130000,
      },
    ],
  },
  {
    label: "Students/Couples",
    description: "Discounted plans for students, couples, and groups.",
    tiers: [
      {
        name: "Basic",
        monthly: 8000,
        quarterly: 22000,
        biYearly: 40000,
        yearly: 75000,
      },
      {
        name: "Premium",
        tag: "Sauna, Steam & Coldbath",
        monthly: 11000,
        quarterly: 30000,
        biYearly: 55000,
        yearly: 100000,
      },
    ],
  },
];

const DURATIONS = [
  { key: "monthly",   label: "Monthly"  },
  { key: "quarterly", label: "Quarterly" },
  { key: "biYearly",  label: "Bi-Yearly" },
  { key: "yearly",    label: "Yearly"    },
] as const;

type DurationKey = typeof DURATIONS[number]["key"];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent">
      <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES_BASIC = [
  "Unlimited gym access",
  "Locker room access",
  "Group classes included",
  "Fitness assessment",
];

const FEATURES_PREMIUM = [
  "Unlimited gym access",
  "Locker room access",
  "Group classes included",
  "Fitness assessment",
  "Sauna & steam room",
  "Coldbath access",
  "Priority booking",
];

export default function Pricing() {
  const [activeDuration, setActiveDuration] = useState<DurationKey>("monthly");
  const [activeMembership, setActiveMembership] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.2 });

  const membership = MEMBERSHIPS[activeMembership];

  return (
    <section
      id="pricing"
      ref={headerRef}
      className="w-full overflow-hidden bg-dark px-5 py-24 md:px-10 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* Header */}
        <motion.p
          className="mb-3 block font-body text-xs uppercase tracking-[0.4em] text-accent"
          initial={{ opacity: 0, letterSpacing: "0.22em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.35em" } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          SIMPLE &amp; TRANSPARENT
        </motion.p>

        <div data-cursor="text" className="overflow-hidden">
          <motion.h2
            className="mb-10 font-display text-[clamp(52px,7vw,96px)] leading-none text-white"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            PRICING
          </motion.h2>
        </div>

        {/* No Registration Fee callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 inline-flex items-center gap-3 border border-accent px-4 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <p className="font-body text-sm text-[#E5E5E5]">
            <span className="text-accent font-semibold">No Registration Fees</span>
            {" "}— Founding member rates for first 150 members
          </p>
        </motion.div>

        {/* Membership type toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4 flex gap-0 border border-[#2A2A2A] w-fit"
        >
          {MEMBERSHIPS.map((m, i) => (
            <button
              key={m.label}
              onClick={() => setActiveMembership(i)}
              className={`sm:px-5 px-2 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-200
                ${activeMembership === i
                  ? "bg-accent text-black"
                  : "text-[#555] hover:text-white"
                }`}
            >
              {m.label}
            </button>
          ))}
        </motion.div>

        {/* Duration toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12 flex gap-0 border border-[#2A2A2A] w-fit"
        >
          {DURATIONS.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDuration(d.key)}
              className={`sm:px-5 px-1.5 py-2.5 text-xs tracking-[0.2em] transition-all duration-200
                ${activeDuration === d.key
                  ? "bg-white text-black"
                  : "text-[#555] hover:text-white"
                }`}
            >
              {d.label}
            </button>
          ))}
        </motion.div>

        {/* Membership description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeMembership}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-8 font-body text-sm text-[#555]"
          >
            {membership.description}
          </motion.p>
        </AnimatePresence>

        {/* Tier cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {membership.tiers.map((tier, index) => {
            const price = tier[activeDuration];
            const isMonthly = activeDuration === "monthly";
            const features = tier.name === "Premium" ? FEATURES_PREMIUM : FEATURES_BASIC;

            return (
              <motion.article
                key={`${activeMembership}-${tier.name}`}
                className={`relative border bg-card p-8 transition-all duration-300
                  hover:border-accent hover:shadow-[0_0_24px_rgba(255,32,32,0.08)]
                  ${tier.name === "Premium"
                    ? "border-t-2 border-t-accent border-x-[#2A2A2A] border-b-[#2A2A2A]"
                    : "border-[#2A2A2A]"
                  }`}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                {/* Tier header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="font-display text-[22px] text-white">{tier.name}</p>
                    {tier.tag && (
                      <p className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-accent">
                        {tier.tag}
                      </p>
                    )}
                  </div>
                  {tier.name === "Premium" && (
                    <span className="border border-accent px-2 py-0.5 font-body text-[10px] uppercase tracking-widest text-accent">
                      Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="mb-1 font-body text-xs uppercase tracking-widest text-[#555]">PKR</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${activeDuration}-${price}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="font-display text-[clamp(44px,5vw,68px)] leading-none text-white"
                    >
                      {price.toLocaleString()}
                      <span className="ml-1 font-body text-base text-[#555]">
                        {isMonthly ? "/mo" : "/total"}
                      </span>
                    </motion.p>
                  </AnimatePresence>
                  {!isMonthly && (
                    <p className="mt-2 font-body text-sm text-[#555]">
                      ≈ {Math.round(price / (
                        activeDuration === "quarterly" ? 3 :
                        activeDuration === "biYearly" ? 6 : 12
                      )).toLocaleString()} PKR/mo
                    </p>
                  )}
                </div>

                <div className="my-6 border-t border-[#2A2A2A]" />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 font-body text-sm text-[#E5E5E5]">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Sauna add-on note for Basic */}
                {tier.name === "Basic" && (
                  <p className="mt-6 border-t border-[#2A2A2A] pt-4 font-body text-xs text-[#555]">
                    Sauna, Steamroom &amp; Coldbath available at{" "}
                    <span className="text-[#E5E5E5]">1,500 PKR/session</span>
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center font-body text-sm italic text-[#555]"
        >
          &ldquo;Let&apos;s raise the bar for gyms in Pakistan together.&rdquo;
        </motion.p>

      </div>
    </section>
  );
}