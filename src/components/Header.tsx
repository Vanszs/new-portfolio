import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onContactClick: () => void;
  activeSection: string;
}

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Services", href: "#services", id: "services" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Blogs", href: "#blogs", id: "blogs" },
  { label: "Testimonials", href: "#testimonials", id: "testimonials" },
];

export default function Header({ onContactClick, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#2b302b] bg-[#0e0f0e]/95 px-5 backdrop-blur-md md:px-10">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6">
        <a href="#home" onClick={(event) => handleNavClick(event, "home")} className="flex shrink-0 items-center gap-3 text-[#ededed]" aria-label="Bevan home">
          <span className="flex h-8 w-8 items-center justify-center border border-[#d96a46] font-mono text-xs text-[#d96a46]">B/</span>
          <span className="font-display text-base font-semibold tracking-tight">Bevan<span className="text-[#d96a46]">.</span></span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.id)}
              className={`border-b py-1 text-xs transition-colors ${activeSection === item.id ? "border-[#d96a46] text-[#ededed]" : "border-transparent text-[#9ca39b] hover:text-[#ededed]"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button onClick={onContactClick} className="border border-[#d96a46] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#d96a46] transition-colors hover:bg-[#d96a46] hover:text-[#0e0f0e]">
            Contact
          </button>
        </div>

        <button
          type="button"
          className="border border-[#2b302b] p-2 text-[#ededed] lg:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-[#2b302b] py-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.id)}
                className={`border-b border-[#2b302b] py-3 font-mono text-xs uppercase tracking-[0.12em] ${activeSection === item.id ? "text-[#d96a46]" : "text-[#9ca39b]"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button onClick={() => { setMobileMenuOpen(false); onContactClick(); }} className="mt-4 w-full bg-[#d96a46] px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#0e0f0e]">
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
