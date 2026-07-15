import React from "react";
import { Check } from "lucide-react";

interface AboutSectionProps {
  data?: {
    bio?: string;
    bioSecond?: string;
    milestones?: { number: string; label: string }[];
    coreSkills?: string[];
    principles?: { title: string; desc: string }[];
  };
}

export default function AboutSection({ data }: AboutSectionProps) {
  const milestones = data?.milestones || [
    { number: "3+", label: "Years Experience" },
    { number: "10+", label: "Projects Delivered" },
    { number: "3", label: "Peer-Reviewed Publications" },
    { number: "4.85/5", label: "Average Satisfaction" }
  ];

  const coreSkills = data?.coreSkills || [
    "Machine Learning & LLM Integration",
    "Computer Vision & Sensor Fusion",
    "Full-Stack Web (Next.js / React / TypeScript)",
    "Cross-Platform Mobile (Flutter)",
    "Blockchain (Solidity / Rust / Solana)",
    "Autonomous Systems (ROS2 / MAVLink / Jetson)"
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#f3f2ee]/40 relative z-10 border-t border-[#e5e2da]/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3 text-brand-orange font-display font-medium text-sm uppercase tracking-wider">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              <span>About Me</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-tighter leading-tight">
              Building intelligent systems that <span className="text-brand-orange">scale</span> and deliver.
            </h2>
          </div>
          
          <div className="lg:col-span-7">
            <p className="text-[#5e5e5e] text-base leading-relaxed mb-6 font-sans">
              {data?.bio || 'I am Bevan — a Machine Learning Engineer, Full-Stack Developer, and Autonomous Systems Specialist based in Surabaya. With 3+ years of hands-on experience, I have built end-to-end solutions across AI/ML, robotics, blockchain, and web technologies for startups, government contracts, and robotics competitions.'}
            </p>
            <p className="text-[#5e5e5e] text-base leading-relaxed font-sans">
              {data?.bioSecond || 'My approach combines deep technical rigor with rapid iteration: translating complex challenges into production-ready systems. Whether architecting autonomous drones, deploying secure full-stack dashboards, or integrating LLMs, I focus on measurable impact and scalable architecture.'}
            </p>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {milestones.map((milestone, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#e5e2da] rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-orange group-hover:scale-105 transition-transform duration-300 mb-2">
                {milestone.number}
              </div>
              <div className="text-brand-dark text-xs sm:text-sm font-semibold tracking-tight uppercase">
                {milestone.label}
              </div>
            </div>
          ))}
        </div>

        {/* Column breakdown: My Principles vs Core Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Principles */}
          <div className="bg-brand-dark text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-colors"></div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-6 tracking-tight">
              My Engineering Principles
            </h3>
            <ul className="space-y-4">
              {(data?.principles || [
                { title: "Production-Ready Code", desc: "Every system is built to run reliably in production: tested, secure, observable, and documented." },
                { title: "Rapid Iteration with AI", desc: "I leverage AI-assisted workflows to accelerate development while maintaining hands-on quality control." },
                { title: "Scalable Architecture", desc: "From embedded devices to cloud backends, I architect modular systems that grow with the problem." }
              ]).map((principle, idx) => (
                <li key={idx} className="flex flex-col gap-1">
                  <span className="font-display font-bold text-lg text-brand-orange">
                    0{idx + 1}. {principle.title}
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed pl-6">
                    {principle.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Skills List */}
          <div className="bg-white border border-[#e5e2da] rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark mb-6 tracking-tight">
                Core Competencies
              </h3>
              <p className="text-[#5e5e5e] text-sm sm:text-base leading-relaxed mb-6">
                A hybrid skill set spanning AI research, autonomous systems, full-stack engineering, and blockchain development:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coreSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#fd4a24]/10 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-brand-dark leading-snug">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e5e2da]/60 flex items-center gap-4">
              <span className="text-xs font-mono text-[#8c8c8c]">TOOLS & SUITE:</span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#5e5e5e]">
                <span>Python</span> • <span>TensorFlow</span> • <span>ROS2</span> • <span>Next.js</span> • <span>Flutter</span> • <span>Solidity</span> • <span>Jetson Nano</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
