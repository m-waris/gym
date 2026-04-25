const NAV_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-accent bg-dark px-5 py-10 md:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="#top" className="flex items-center gap-2">
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
            <span className="font-display text-[24px] leading-none text-[#F5F5F5]">La Forza</span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-[13px] text-[#555555] transition-colors duration-200 hover:text-[#F5F5F5]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#555555] transition-colors duration-200 hover:text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-[#555555] transition-colors duration-200 hover:text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-[#555555] transition-colors duration-200 hover:text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.8" y="6.2" width="18.4" height="11.6" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#2A2A2A] pt-6 text-center">
          <p className="font-body text-xs text-[#555555]">
            © {new Date().getFullYear()} La Forza. ALL RIGHTS RESERVED.
          </p>
          <span className="text-xs mt-1 text-[#555555]">Made with <span className="text-accent"> ❤ </span> by {" "}
            <a className="underline hover:underline-offset-2 hover:text-[#F5F5F5] transition-all duration-200 font-extrabold italic"  href="https://mwarismahmood.vercel.app/" target="blank">Waris</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
