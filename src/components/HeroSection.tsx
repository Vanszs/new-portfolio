import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onHireClick: () => void;
  onPortfolioClick: () => void;
  data?: {
    headline?: string;
    subtitle?: string;
    imageUrl?: string;
    tagline?: string;
  };
}

export default function HeroSection({ onHireClick, onPortfolioClick, data }: HeroSectionProps) {
  // Avatar images for client proof
  const clientAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
  ];

  // Helper to scroll to testimonials
  const scrollToTestimonials = () => {
    const el = document.getElementById("testimonials");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative min-h-[calc(100svh-4.5rem)] bg-brand-bg bg-grid-pattern pt-10 md:pt-12 pb-6 px-6 md:px-12 flex flex-col justify-between overflow-hidden">
      
      {/* Top Banner Content */}
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col items-center justify-start text-center relative z-10">
        
        {/* Hello Subtitle */}
        <div className="flex items-center gap-2 mb-2 text-[#fd4a24] font-display font-medium text-sm md:text-base tracking-wide uppercase">
          <span className="w-6 h-[2px] bg-[#fd4a24]"></span>
          <span>{data?.tagline || 'Hello There!'}</span>
        </div>

        {/* Main Title Heading */}
        <div className="relative inline-block mb-2 max-w-4xl">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tighter text-brand-dark leading-[1.05]">
            {data?.headline || "I'm"} <span className="text-brand-orange relative inline-block">
              Bevan
              {/* Little red custom sparks / stars icon next to name */}
              <svg 
                className="absolute -top-3 -right-6 sm:-top-5 sm:-right-8 w-6 h-6 sm:w-8 sm:h-8 text-brand-orange animate-pulse" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="font-display text-base sm:text-lg md:text-xl text-[#5e5e5e] max-w-2xl mx-auto mb-6 tracking-tight">
          {data?.subtitle || 'AI/ML Engineer | Full-Stack & Blockchain Developer based in Surabaya, Indonesia'}
        </p>

        {/* Core Hero Grid - Cutout Portrait with Left / Right Floating Panels */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-2 relative max-w-6xl">
          
          {/* Left Panel: Quote & Testimonial Count */}
          <div className="lg:col-span-3 flex flex-col items-start text-left gap-8 order-2 lg:order-1">
            {/* Quote Card */}
            <div className="relative pl-6 border-l-2 border-brand-orange max-w-sm">
              <span className="text-4xl text-brand-orange font-serif leading-none absolute left-0 top-0 -translate-x-1/2 -translate-y-2">“</span>
              <p className="text-brand-dark font-medium italic text-sm sm:text-base leading-relaxed text-[#2c2c2c] pt-2">
                Bevan's full-stack and AI execution accelerated our product delivery—highly recommended!
              </p>
            </div>

            {/* Client proof stack */}
            <div 
              onClick={scrollToTestimonials}
              className="flex flex-col items-start gap-2 cursor-pointer group bg-[#f3f2ee]/40 hover:bg-[#f3f2ee]/80 p-3 rounded-2xl transition-all duration-300"
            >
              <div className="flex -space-x-3">
                {clientAvatars.map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar}
                    alt="Valued Client"
                    width={40}
                    height={40}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border-2 border-brand-bg object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-display font-bold text-base text-brand-dark group-hover:text-brand-orange transition-colors">
                    10+ Delivered Projects
                  </span>
                  <span className="text-[#5e5e5e] text-sm font-medium">(4.85/5)</span>
                </div>
                <p className="text-xs text-[#8c8c8c] font-medium">Trusted by cross-functional teams</p>
              </div>
            </div>
          </div>

          {/* Center Portrait with Organic Backdrop */}
          <div className="lg:col-span-6 flex justify-center relative min-h-[360px] sm:min-h-[440px] md:min-h-[420px] order-1 lg:order-2 select-none">
            {/* Portrait Image Cutout */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[380px] md:w-[380px] h-auto pointer-events-none">
              <img
                src={data?.imageUrl || '/images/image.png'}
                alt="Bevan Portrait"
                width={380}
                height={380}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-3xl transform hover:scale-[1.02] transition-transform duration-500 origin-bottom"
              />
            </div>

            {/* Overlapping Bottom Buttons (Portfolio & Hire Me) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 w-full justify-center max-w-sm px-4">
              <button
                onClick={onPortfolioClick}
                className="bg-brand-dark hover:bg-brand-orange text-white rounded-full pl-5 pr-3 py-2 flex items-center gap-3 text-sm font-semibold transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Portfolio</span>
                <span className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white">
                  <ArrowRight size={16} />
                </span>
              </button>
              
              <button
                onClick={onHireClick}
                className="bg-white border border-[#e5e2da] hover:border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Hire Me
              </button>
            </div>
          </div>

          {/* Right Panel: Tag Cloud & Social Links */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right gap-8 order-3">
            
            {/* Tag Cloud */}
            <div className="flex flex-wrap lg:justify-end justify-center gap-2 max-w-xs md:max-w-sm">
              <motion.span 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-brand-dark text-white font-display text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                AI / ML
              </motion.span>
              
              <motion.span 
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#fd4a24] text-white font-display text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Full-Stack
              </motion.span>

              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-brand-dark text-white font-display text-xs font-semibold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 hover:scale-105 transition-transform duration-200"
              >
                {/* Micro App Grid Icon */}
                <div className="grid grid-cols-2 gap-[2px] w-3 h-3">
                  <span className="bg-brand-orange rounded-[1px]"></span>
                  <span className="bg-white rounded-[1px]"></span>
                  <span className="bg-white rounded-[1px]"></span>
                  <span className="bg-brand-orange rounded-[1px]"></span>
                </div>
                <span>Mobile Apps</span>
              </motion.div>

              <motion.span 
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#fd4a24] text-white font-display text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Blockchain
              </motion.span>

              <motion.span 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-brand-dark text-white font-display text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Autonomous Systems
              </motion.span>
            </div>

            {/* Social Proof Links */}
            <div className="flex flex-col items-center lg:items-end gap-3 w-full">
              <span className="font-display text-xs font-semibold tracking-wider text-[#8c8c8c] uppercase">
                Connect With Me
              </span>
              <div className="flex gap-2.5">
                {[
                  {
                    name: "Facebook",
                    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"
                  },
                  {
                    name: "X",
                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  },
                  {
                    name: "Pinterest",
                    path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.715-.359-1.777c0-1.663.967-2.906 2.17-2.906 1.023 0 1.517.769 1.517 1.69 0 1.029-.655 2.568-.994 3.993-.283 1.194.599 2.169 1.775 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.868-2.061-4.874-5.007-4.874-3.41 0-5.41 2.561-5.41 5.202 0 1.031.397 2.138.892 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 12-5.38 12-11.997C24.017 5.367 18.638 0 12.017 0z"
                  },
                  {
                    name: "Instagram",
                    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert(`Visit Bevan's ${social.name}`); }}
                    className="w-10 h-10 rounded-full border border-[#e5e2da] bg-[#fcfbf9] text-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-300 transform hover:scale-110 active:scale-95"
                    title={social.name}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Dynamic Floating Circular Stamp (HIRE ME Stamp) in top right area */}
      <div className="absolute top-24 right-10 md:right-20 lg:right-32 z-25 hidden sm:block">
        <div className="relative w-28 h-28 flex items-center justify-center select-none">
          {/* Circular Text */}
          <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <defs>
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text fill="#0e0e0e" fontSize="9.5" fontWeight="bold" letterSpacing="2.5">
              <textPath href="#textPath" startOffset="0%">
                HIRE ME • HIRE ME • HIRE ME • 
              </textPath>
            </text>
          </svg>
          {/* Center Circle & Arrow */}
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
}
