import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "../data";

interface ProjectsSectionProps {
  onProjectInquire: (projectTitle: string) => void;
}

export default function ProjectsSection({ onProjectInquire }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Web App", "Mobile App", "Autonomous Systems", "Robotics", "AI/ML", "IoT", "Blockchain", "Community"];

  const filteredProjects = selectedCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-brand-bg relative z-10 border-t border-[#e5e2da]/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-brand-orange font-display font-medium text-sm uppercase tracking-wider">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              <span>Selected Works</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-tighter leading-none">
              Featured Case Studies
            </h2>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-brand-dark text-white shadow-md"
                    : "bg-[#f3f2ee] hover:bg-[#eae8df] text-[#5e5e5e] hover:text-brand-dark"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group flex flex-col bg-white border border-[#e5e2da] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Image Area */}
              <div className="relative overflow-hidden aspect-[4/3] bg-[#f3f2ee]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Badge for Category */}
                <span className="absolute top-4 left-4 bg-brand-dark text-white font-display text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {project.category}
                </span>

                {/* Hover CTA overlay */}
                <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => onProjectInquire(project.title)}
                    className="bg-white text-brand-dark font-display font-semibold text-sm px-5 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#fd4a24] hover:text-white"
                  >
                    <span>Inquire About Project</span>
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#8c8c8c] font-semibold uppercase tracking-widest">
                      PROJECT / {project.year}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-dark mb-4 tracking-tight group-hover:text-[#fd4a24] transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#e5e2da]/60">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-[#f3f2ee] text-[#5e5e5e] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if No Projects found */}
        {filteredProjects.length === 0 && (
          <div className="w-full py-20 text-center bg-[#f3f2ee]/30 rounded-3xl border border-dashed border-[#e5e2da] flex flex-col items-center justify-center">
            <p className="text-[#5e5e5e] text-base font-medium mb-2">No projects found in this category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-brand-orange hover:underline font-semibold text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
