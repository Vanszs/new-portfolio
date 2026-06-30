import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { SERVICES } from "../data";

interface ServicesSectionProps {
  onServiceActionClick: (serviceTitle: string) => void;
}

export default function ServicesSection({ onServiceActionClick }: ServicesSectionProps) {
  // Initial state has '02' (Full-Stack Web & Mobile Development) expanded
  const [expandedId, setExpandedId] = useState<string | null>("02");

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-brand-bg relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16">
          <div>
            {/* Specialization indicator */}
            <div className="flex items-center gap-2 mb-3 text-brand-orange font-display font-medium text-sm uppercase tracking-wider">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              <span>My Specialization</span>
            </div>
            
            {/* Title with sparkles */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-tighter relative inline-block">
              Services <span className="text-brand-orange relative">
                I Provide
                <svg className="absolute -top-1 -right-5 w-4 h-4 text-brand-orange animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </span>
            </h2>
          </div>
          
          <div>
            <p className="text-[#5e5e5e] text-sm sm:text-base leading-relaxed md:max-w-md font-sans">
              End-to-end engineering across AI/ML, full-stack development, blockchain, and autonomous systems — built for production, performance, and measurable impact.
            </p>
          </div>
        </div>

        {/* Accordion / List of Services */}
        <div className="flex flex-col gap-4 mb-12">
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <div 
                key={service.id}
                className="w-full transition-all duration-500 rounded-[24px] overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  className={`w-full flex items-center justify-between px-6 sm:px-10 py-6 text-left transition-all duration-500 relative z-10 ${
                    isExpanded 
                      ? "bg-brand-dark text-white rounded-t-[24px]" 
                      : "bg-[#f3f2ee] hover:bg-[#eae8df] text-brand-dark rounded-[24px]"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    {/* Number */}
                    <span className={`font-display font-bold text-base sm:text-lg ${
                      isExpanded ? "text-brand-orange" : "text-[#8c8c8c]"
                    }`}>
                      {service.id}.
                    </span>
                    {/* Title */}
                    <span className="font-display font-bold text-lg sm:text-2xl tracking-tight">
                      {service.title}
                    </span>
                  </div>

                  {/* Icon Trigger */}
                  <div>
                    {isExpanded ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-orange flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-300">
                        {/* Custom Red Close Icon with standard X or Arrow */}
                        <X size={16} className="stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-brand-dark hover:scale-110 active:scale-95 transition-transform duration-300">
                        {/* Diagonal arrow indicator */}
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                {/* Accordion Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="bg-brand-dark text-white rounded-b-[24px] border-t border-white/5 overflow-hidden"
                    >
                      <div className="px-6 sm:px-10 pb-8 pt-4 flex flex-col gap-6">
                        
                        {/* Badges / Tags Cloud */}
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-display text-xs px-3.5 py-1.5 rounded-full transition-colors cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                          {service.description}
                        </p>

                        {/* Expanded Mockup Illustration (For Full-Stack or Autonomous Systems) */}
                        {service.image && (
                          <div className="mt-4 w-full flex justify-center">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg md:max-w-2xl border border-white/10 group">
                              <img
                                src={service.image}
                                alt={`${service.title} Mockup`}
                                referrerPolicy="no-referrer"
                                className="w-full h-auto object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-xs font-mono text-white/80">Interactive Workspace Model</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Order service CTA inside expanded card */}
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => onServiceActionClick(service.title)}
                            className="text-brand-orange hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors group"
                          >
                            <span>Inquire about {service.title}</span>
                            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => onServiceActionClick("All Services")}
            className="bg-[#fd4a24] hover:bg-[#e03d15] text-white font-display font-semibold px-6 py-3.5 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
          >
            <span>View All Services</span>
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-brand-dark group-hover:rotate-45 transition-transform duration-300 shadow-sm">
              <ArrowRight size={14} className="stroke-[2.5]" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
