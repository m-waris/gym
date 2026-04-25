"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen]);

  const navBaseClass =
    "relative text-[13px] uppercase tracking-[0.15em] text-[#E5E5E5] transition-colors duration-200 hover:text-[#F5F5F5]";

  const mobileVariants = useMemo(
    () => ({
      closed: { x: "100%" },
      open: {
        x: "0%",
        transition: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1] as const,
          when: "beforeChildren" as const,
          staggerChildren: 0.07,
        },
      },
    }),
    [],
  );

  const mobileItemVariants = useMemo(
    () => ({
      closed: { y: 40, opacity: 0 },
      open: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
      },
    }),
    [],
  );

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMobile = false,
  ) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (closeMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 h-[72px] border-b border-transparent transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-5 sm:px-10 xl:px-1">
          <div className="flex basis-1/3 justify-start">
            <a
              href="#top"
              onClick={(event) => handleNavClick(event, "#top")}
              className="flex items-center gap-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 12H22M2 8V16M5 6V18M19 6V18M22 8V16"
                  stroke="#FF2020"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display sm:text-[24px] leading-none text-[#F5F5F5]">
                La Forza
              </span>
            </a>
          </div>

          <nav className="hidden basis-1/3 items-center justify-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`${navBaseClass} group`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-250 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex basis-1/3 justify-end">
            <button
              type="button"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="relative z-[101] flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span
                className={`absolute h-[2px] w-6 bg-[#F5F5F5] transition-all duration-300 ${
                  isMobileOpen ? "translate-y-0 rotate-45" : "-translate-y-[7px]"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-[#F5F5F5] transition-all duration-300 ${
                  isMobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-[#F5F5F5] transition-all duration-300 ${
                  isMobileOpen ? "translate-y-0 -rotate-45" : "translate-y-[7px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-drawer-backdrop"
            className="fixed inset-0 z-[99] bg-[#0A0A0A]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileVariants}
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="flex h-full w-full items-center justify-center">
              <nav
                className="flex flex-col items-center gap-5"
                onClick={(event) => event.stopPropagation()}
              >
                {NAV_ITEMS.map((item) => (
                  <motion.a
                    key={`mobile-${item.href}`}
                    href={item.href}
                    variants={mobileItemVariants}
                    onClick={(event) => handleNavClick(event, item.href, true)}
                    className="font-display text-[52px] leading-none text-[#F5F5F5]"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
