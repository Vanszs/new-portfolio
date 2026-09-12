import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  image: string;
  summary: string;
  description: string;
  gallery: string[];
  tags: string[];
}

const FALLBACK_EXPERIENCES: ExperienceItem[] = [
  { id: "exp1", role: "Founding Engineer", company: "Owie Technologies", location: "Surabaya, Indonesia", period: "May 2026 - Present", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600", summary: "Developing Owie Motion across frontend, backend, and infrastructure workflows.", description: "Integrated Generative AI features, supported backend development, and improved deployment workflows for reliable system performance.", gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"], tags: ["Next.js", "Generative AI", "Prisma", "CI/CD"] },
  { id: "exp2", role: "AI-Augmented Full Stack Developer", company: "Partai Nasional Demokrat", location: "Surabaya, Indonesia", period: "Aug 2025 - May 2026", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", summary: "Engineered a secure admin panel with election data aggregation and RBAC.", description: "Built a custom admin panel with CRUD operations, role-based access control, Redis background jobs, and Cloudflare-backed VPS infrastructure.", gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"], tags: ["Next.js", "RBAC", "Redis", "Cloudflare"] },
  { id: "exp3", role: "Autonomous Drone Solo Programmer", company: "Veteran Robotics", location: "Surabaya, Indonesia", period: "Jan 2025 - Dec 2025", image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600", summary: "Engineered an autonomous drone system and remote control dashboard.", description: "Configured ROS2, developed path planning and collision avoidance algorithms, and deployed a Next.js monitoring dashboard on a VPS.", gallery: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600"], tags: ["ROS2", "MAVLink", "Next.js", "AI Agent"] },
  { id: "exp4", role: "Machine Learning and IoT Developer", company: "PT. IGS Indonesia Group", location: "Surabaya, Indonesia", period: "Jan 2025 - Jul 2025", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600", summary: "Designed sensor-fusion pipelines for landslide early warning systems.", description: "Developed machine learning models for early landslide detection and integrated real-time data from IoT sensor arrays.", gallery: ["https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600"], tags: ["Machine Learning", "IoT", "TensorFlow", "Sensor Fusion"] },
];

const ITEMS_PER_PAGE = 4;

interface ExperienceSectionProps {
  data?: ExperienceItem[];
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  const experiences = data && data.length > 0 ? data : FALLBACK_EXPERIENCES;
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);
  const totalPages = Math.ceil(experiences.length / ITEMS_PER_PAGE);
  const paginatedExperiences = useMemo(() => experiences.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [experiences, currentPage]);

  const closeExperience = () => {
    setSelectedExp(null);
    openerRef.current?.focus();
    openerRef.current = null;
  };

  useEffect(() => {
    if (!selectedExp) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeExperience();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedExp]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="experience" className="border-b border-[#2b302b] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d96a46]">Selected experience</p><h2 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#ededed] sm:text-5xl">Work, in context.</h2></div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">{experiences.length} records</span>
        </div>

        <div className="border-t border-[#2b302b]">
          {paginatedExperiences.map((experience, index) => (
            <button type="button" key={experience.id} onClick={() => setSelectedExp(experience)} className="group grid w-full grid-cols-[36px_1fr_auto] gap-4 border-b border-[#2b302b] py-6 text-left transition-colors hover:bg-[#151715] sm:grid-cols-[44px_1fr_180px_auto] sm:gap-6">
              <span className="font-mono text-xs text-[#d96a46]">{String((currentPage - 1) * ITEMS_PER_PAGE + index + 1).padStart(2, "0")}</span>
              <span className="min-w-0"><strong className="block font-display text-base font-medium text-[#ededed] group-hover:text-[#d96a46] sm:text-lg">{experience.role}</strong><span className="mt-1 block text-sm text-[#9ca39b]">{experience.company}</span><span className="mt-3 block max-w-xl text-sm leading-6 text-[#9ca39b] sm:hidden">{experience.summary}</span></span>
              <span className="hidden font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-[#9ca39b] sm:block">{experience.period}</span>
              <ArrowUpRight size={17} className="mt-1 text-[#9ca39b] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#d96a46]" />
            </button>
          ))}
        </div>

        {totalPages > 1 && <div className="mt-8 flex items-center gap-2"><button type="button" onClick={() => handlePageClick(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="border border-[#2b302b] p-2 text-[#9ca39b] hover:border-[#d96a46] hover:text-[#d96a46] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Previous page"><ChevronLeft size={16} /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} onClick={() => handlePageClick(page)} className={`border px-3 py-2 font-mono text-xs ${page === currentPage ? "border-[#d96a46] text-[#d96a46]" : "border-[#2b302b] text-[#9ca39b] hover:border-[#ededed]"}`} aria-current={page === currentPage ? "page" : undefined}>{String(page).padStart(2, "0")}</button>)}<button type="button" onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="border border-[#2b302b] p-2 text-[#9ca39b] hover:border-[#d96a46] hover:text-[#d96a46] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Next page"><ChevronRight size={16} /></button></div>}
      </div>

      {selectedExp && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e0f0e]/85 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeExperience(); }}><div ref={dialogRef} tabIndex={-1} className="flex max-h-[90vh] w-full max-w-2xl flex-col border border-[#2b302b] bg-[#151715]" role="dialog" aria-modal="true" aria-labelledby="experience-dialog-title"><div className="flex items-start justify-between gap-6 border-b border-[#2b302b] p-5 sm:p-7"><div><h3 id="experience-dialog-title" className="font-display text-xl font-medium text-[#ededed]">{selectedExp.role}</h3><p className="mt-1 text-sm text-[#d96a46]">{selectedExp.company}</p></div><button type="button" onClick={closeExperience} className="border border-[#2b302b] p-2 text-[#9ca39b] hover:border-[#d96a46] hover:text-[#d96a46]" aria-label="Close experience details"><X size={17} /></button></div><div className="overflow-y-auto p-5 sm:p-7"><div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#9ca39b]"><span>{selectedExp.period}</span><span>{selectedExp.location}</span></div><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{selectedExp.gallery.map((image, index) => <ImageWithFallback key={`${image}-${index}`} src={image} alt={`${selectedExp.company} project view ${index + 1}`} className="aspect-[16/10] w-full border border-[#2b302b] object-cover grayscale" />)}</div><h4 className="mt-7 font-mono text-[10px] uppercase tracking-[0.14em] text-[#d96a46]">Role summary</h4><p className="mt-3 text-sm leading-7 text-[#9ca39b]">{selectedExp.description}</p><div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#ededed]">{selectedExp.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div></div>}
    </section>
  );
}
