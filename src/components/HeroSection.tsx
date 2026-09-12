import React from "react";
import { ArrowUpRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

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
  return (
    <section id="home" className="border-b border-[#2b302b] px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.7fr)] lg:items-center lg:gap-20">
        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#d96a46]">AI / full-stack / autonomous systems</p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#ededed] sm:text-6xl lg:text-7xl">
            {data?.headline || "Engineering systems that hold up in production."}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#9ca39b] sm:text-lg">
            {data?.subtitle || "AI/ML Engineer and full-stack developer building useful software, intelligent automation, and autonomous systems."}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button onClick={onHireClick} className="inline-flex items-center gap-3 bg-[#d96a46] px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[#0e0f0e] transition-transform hover:-translate-y-0.5 active:translate-y-0">
              Start a conversation
              <ArrowUpRight size={15} />
            </button>
            <button onClick={onPortfolioClick} className="inline-flex items-center gap-2 border-b border-[#9ca39b] py-2 text-sm text-[#ededed] transition-colors hover:border-[#d96a46] hover:text-[#d96a46]">
              View selected work
              <ArrowUpRight size={14} />
            </button>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-[#2b302b] pt-5 sm:grid-cols-4">
            <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">Base</dt><dd className="mt-1 text-sm text-[#ededed]">Surabaya, ID</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">Focus</dt><dd className="mt-1 text-sm text-[#ededed]">Applied AI</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">Mode</dt><dd className="mt-1 text-sm text-[#ededed]">Independent</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">Status</dt><dd className="mt-1 text-sm text-[#d96a46]">Available</dd></div>
          </dl>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="absolute -left-4 -top-4 h-20 w-20 border-l border-t border-[#d96a46]" aria-hidden="true" />
          <div className="relative border border-[#2b302b] bg-[#151715] p-3 sm:p-5">
            <div className="mb-3 flex items-center justify-between border-b border-[#2b302b] pb-3 font-mono text-[10px] uppercase tracking-[0.13em] text-[#9ca39b]">
              <span>{data?.tagline || "System profile"}</span>
              <span>01 / 01</span>
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-[#1b1e1b]">
              <ImageWithFallback src={data?.imageUrl || "/images/image.png"} alt="Bevan, AI and full-stack engineer" width={720} height={900} className="h-full w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0" />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca39b]">Build carefully. Ship clearly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
