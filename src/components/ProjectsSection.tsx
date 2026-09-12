import React, { useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "../data";
import ImageWithFallback from "./ImageWithFallback";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  year: string;
  description?: string;
}

interface ProjectsSectionProps {
  onProjectInquire: (projectTitle: string) => void;
  data?: ProjectItem[];
}

const ITEMS_PER_PAGE = 6;
const categories = ["All", "Web App", "Mobile App", "Autonomous Systems", "Robotics", "AI/ML", "IoT", "Blockchain", "Community"];

export default function ProjectsSection({ onProjectInquire, data }: ProjectsSectionProps) {
  const projects = data && data.length > 0 ? data : PORTFOLIO_PROJECTS;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProjects = useMemo(() => selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory), [projects, selectedCategory]);
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const paginatedProjects = useMemo(() => filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [filteredProjects, currentPage]);
  const featuredProject = paginatedProjects[0];
  const compactProjects = paginatedProjects.slice(1);

  const selectCategory = (category: string) => { setSelectedCategory(category); setCurrentPage(1); };

  return (
    <section id="projects" className="border-b border-[#2b302b] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d96a46]">Selected work</p><h2 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#ededed] sm:text-5xl">Projects with a job to do.</h2></div><div className="flex flex-wrap gap-x-4 gap-y-2 lg:max-w-xl lg:justify-end">{categories.map((category) => <button type="button" key={category} onClick={() => selectCategory(category)} className={`border-b py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${selectedCategory === category ? "border-[#d96a46] text-[#d96a46]" : "border-transparent text-[#9ca39b] hover:border-[#9ca39b] hover:text-[#ededed]"}`}>{category}</button>)}</div></div>

        {featuredProject ? <>
          <article className="grid grid-cols-1 border-y border-[#2b302b] bg-[#151715] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="aspect-[4/3] overflow-hidden border-b border-[#2b302b] lg:border-b-0 lg:border-r"><ImageWithFallback src={featuredProject.image} alt={featuredProject.title} className="h-full w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0" /></div>
            <div className="flex flex-col justify-between p-6 sm:p-9"><div><div className="flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.13em] text-[#9ca39b]"><span>Featured / {featuredProject.category}</span><span>{featuredProject.year}</span></div><h3 className="mt-8 max-w-md font-display text-3xl font-medium tracking-[-0.04em] text-[#ededed] sm:text-4xl">{featuredProject.title}</h3><p className="mt-5 max-w-md text-sm leading-7 text-[#9ca39b]">{featuredProject.description}</p></div><div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-[#2b302b] pt-5"><div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#ededed]">{featuredProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button type="button" onClick={() => onProjectInquire(featuredProject.title)} className="inline-flex items-center gap-2 border-b border-[#d96a46] pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#d96a46] hover:text-[#ededed]">Discuss project <ArrowUpRight size={14} /></button></div></div>
          </article>

          {compactProjects.length > 0 && <div className="mt-10 border-t border-[#2b302b]">{compactProjects.map((project, index) => <article key={project.id} className="grid grid-cols-[34px_1fr_auto] gap-4 border-b border-[#2b302b] py-5 sm:grid-cols-[44px_1fr_150px_auto] sm:gap-6"><span className="font-mono text-xs text-[#d96a46]">{String(index + 2).padStart(2, "0")}</span><div><h3 className="font-display text-base font-medium text-[#ededed]">{project.title}</h3><p className="mt-1 text-sm text-[#9ca39b]">{project.category} <span className="px-2 text-[#d96a46]">/</span> {project.tags.join(", ")}</p></div><span className="hidden font-mono text-[10px] uppercase tracking-[0.1em] text-[#9ca39b] sm:block">{project.year}</span><button type="button" onClick={() => onProjectInquire(project.title)} className="text-[#9ca39b] hover:text-[#d96a46]" aria-label={`Discuss ${project.title}`}><ArrowUpRight size={17} /></button></article>)}</div>}
        </> : <div className="border border-dashed border-[#2b302b] p-10 text-center"><p className="text-sm text-[#9ca39b]">No projects found in this category.</p><button type="button" onClick={() => selectCategory("All")} className="mt-4 border-b border-[#d96a46] pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#d96a46]">Reset filters</button></div>}

        {totalPages > 1 && <div className="mt-8 flex items-center gap-2"><button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="border border-[#2b302b] p-2 text-[#9ca39b] hover:border-[#d96a46] hover:text-[#d96a46] disabled:opacity-35" aria-label="Previous projects page"><ChevronLeft size={16} /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`border px-3 py-2 font-mono text-xs ${currentPage === page ? "border-[#d96a46] text-[#d96a46]" : "border-[#2b302b] text-[#9ca39b] hover:border-[#ededed]"}`} aria-current={currentPage === page ? "page" : undefined}>{String(page).padStart(2, "0")}</button>)}<button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="border border-[#2b302b] p-2 text-[#9ca39b] hover:border-[#d96a46] hover:text-[#d96a46] disabled:opacity-35" aria-label="Next projects page"><ChevronRight size={16} /></button></div>}
      </div>
    </section>
  );
}
