import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark text-[#8c8c8c] border-t border-white/5 relative z-10">
      
      {/* Top Footer Callout Area */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-16 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5">
        
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#fd4a24] flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full rounded-full border-[2.5px] border-white flex items-center justify-center">
                <span className="text-white font-display text-xs font-bold tracking-tighter">B</span>
              </div>
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Bevan<span className="text-brand-orange">.</span>
            </span>
          </div>
          <p className="text-sm text-white/55 leading-relaxed max-w-sm">
            Building end-to-end AI, full-stack, blockchain, and autonomous systems for high-growth teams, government contracts, and robotics competitions.
          </p>
          <div className="flex gap-3 text-xs text-white/60">
            <span>© {new Date().getFullYear()} Bevan.</span>
            <span>All rights reserved.</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest mb-6">
            Explore Portfolio
          </h4>
          <ul className="space-y-3.5 text-sm font-semibold">
            {[
              { label: "Home", href: "#home" },
              { label: "My Services", href: "#services" },
              { label: "About Experience", href: "#about" },
              { label: "Case Studies", href: "#projects" },
              { label: "Engineering Blog", href: "#blogs" }
            ].map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(link.href.slice(1));
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact/Inquire Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest">
            Let's Collaborate
          </h4>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-white/55">
              Have an upcoming AI, web, or autonomous systems project? Let's discuss your technical sprint together.
            </p>
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); onContactClick(); }}
              className="text-sm font-bold text-white hover:text-brand-orange transition-colors"
            >
              Open Contact Form
            </a>
          </div>
          
          {/* Newsletter signup */}
          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Successfully subscribed to newsletter!"); }}
            className="flex gap-2 w-full max-w-md mt-2"
          >
            <input 
              type="email" 
              required
              placeholder="Join tech digest..."
              className="bg-white/5 hover:bg-white/10 text-white placeholder:text-[#5e5e5e] text-xs px-4 py-2.5 rounded-xl border border-white/10 outline-none w-full focus:border-[#fd4a24] transition-all"
            />
            <button 
              type="submit"
              className="bg-[#fd4a24] hover:bg-[#e03d15] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex items-center justify-between text-xs text-white/35">
        <div>
          <span>Crafted with precision in Next.js, React & Tailwind CSS.</span>
        </div>
        <button 
          onClick={handleBackToTop}
          className="flex items-center gap-2 hover:text-white text-xs font-bold transition-colors group"
        >
          <span>BACK TO TOP</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
            <ArrowUp size={12} />
          </div>
        </button>
      </div>

    </footer>
  );
}
