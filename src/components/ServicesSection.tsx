import React, { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SERVICES } from "../data";
import ImageWithFallback from "./ImageWithFallback";

interface ServiceItem {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image?: string | null;
}

interface ServicesSectionProps {
  onServiceActionClick: (serviceTitle: string) => void;
  data?: ServiceItem[];
}

export default function ServicesSection({ onServiceActionClick, data }: ServicesSectionProps) {
  const services = data && data.length > 0 ? data : SERVICES;
  const [expandedId, setExpandedId] = useState<string | null>("02");

  return (
    <section id="services" className="border-b border-[#2b302b] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d96a46]">What I build</p>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#ededed] sm:text-5xl">Systems with a clear job to do.</h2>
          <p className="mt-5 text-base leading-7 text-[#9ca39b]">From model integrations to field hardware, the work stays close to the user, the constraints, and the outcome.</p>
        </div>

        <div className="border-t border-[#2b302b]">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            const panelId = `service-panel-${service.id}`;
            return (
              <div key={service.id} className="border-b border-[#2b302b]">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left transition-colors hover:text-[#d96a46]"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                >
                  <span className="flex min-w-0 items-baseline gap-5 sm:gap-8">
                    <span className="font-mono text-xs text-[#d96a46]">{service.id}</span>
                    <span className="font-display text-xl font-medium tracking-tight text-[#ededed] sm:text-2xl">{service.title}</span>
                  </span>
                  <ChevronDown size={18} className={`shrink-0 text-[#9ca39b] transition-transform ${isExpanded ? "rotate-180 text-[#d96a46]" : ""}`} />
                </button>

                {isExpanded && (
                  <div id={panelId} className="grid grid-cols-1 gap-8 pb-8 pl-0 sm:grid-cols-[minmax(0,1fr)_220px] sm:pl-16">
                    <div>
                      <p className="max-w-2xl text-sm leading-7 text-[#9ca39b]">{service.description}</p>
                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#ededed]">
                        {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <button type="button" onClick={() => onServiceActionClick(service.title)} className="mt-7 inline-flex items-center gap-2 border-b border-[#d96a46] pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#d96a46] hover:text-[#ededed]">
                        Discuss this service <ArrowUpRight size={14} />
                      </button>
                    </div>
                    {service.image && <ImageWithFallback src={service.image} alt={`${service.title} project preview`} className="aspect-[4/3] w-full border border-[#2b302b] object-cover grayscale" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={() => onServiceActionClick("All Services")} className="mt-8 inline-flex items-center gap-2 border-b border-[#9ca39b] pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b] hover:border-[#d96a46] hover:text-[#d96a46]">
          Request a broader scope <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
}
