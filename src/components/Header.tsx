import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onContactClick: () => void;
  activeSection: string;
}

export default function Header({ onContactClick, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Services", href: "#services", id: "services" },
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Blogs", href: "#blogs", id: "blogs" },
    { label: "Testimonials", href: "#testimonials", id: "testimonials" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-bg/80 backdrop-blur-md border-b border-[#e5e2da]/40 px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-between px-1.5 py-2 relative overflow-hidden shadow-sm transition-all duration-300 group-hover:scale-105">
            {/* Custom stylized 'V' white logo element */}
            <div className="w-full h-full rounded-full border-[3px] border-white flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold tracking-tighter">B</span>
            </div>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-brand-dark relative">
            Bevan<span className="text-brand-orange">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-sm font-medium transition-colors duration-300 relative py-1 ${
                  isActive ? "text-brand-orange font-semibold" : "text-[#5e5e5e] hover:text-brand-dark"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden md:block">
          <button
            id="contact-me-btn"
            onClick={onContactClick}
            className="bg-brand-dark hover:bg-brand-orange text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          >
            Contact Me
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-brand-dark p-1 hover:bg-[#f3f2ee] rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-bg border-b border-[#e5e2da] px-6 py-6 shadow-xl flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-lg font-medium py-1 border-b border-[#e5e2da]/40 ${
                  isActive ? "text-brand-orange font-bold pl-2 border-l-2 border-l-brand-orange" : "text-[#5e5e5e]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className="w-full bg-brand-dark text-white text-base font-semibold py-3 rounded-full hover:bg-brand-orange transition-all mt-2"
          >
            Contact Me
          </button>
        </div>
      )}
    </header>
  );
}
