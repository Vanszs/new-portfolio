import React from "react";
import { BookOpen, Award } from "lucide-react";

interface AboutSectionProps {
  data?: {
    bio?: string;
    bioSecond?: string;
    milestones?: { number: string; label: string }[];
    publications?: { title: string; desc?: string }[];
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

  const principles = data?.principles || [
    { title: "Production-Ready Code", desc: "Every system is built to run reliably in production: tested, secure, observable, and documented." },
    { title: "Rapid Iteration with AI", desc: "I leverage AI-assisted workflows to accelerate development while maintaining hands-on quality control." },
    { title: "Scalable Architecture", desc: "From embedded devices to cloud backends, I architect modular systems that grow with the problem." }
  ];

  const publications = [
    { title: "Food Optimizing for Patients with Kidney Failure Using Evolution Strategies Algorithm" },
    { title: "Optimizing Chicken Feed Using Evolution strategies (ES) algorithm" },
    { title: "Exploring the Potential of Hybrid Whale Optimization Algorithm: A Literature Review" }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#f5f4f2] relative z-10 border-t border-neutral-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Bento Cell 1: Bio Intro (Col span 8) */}
          <div className="md:col-span-8 rounded-2xl border border-neutral-200/80 bg-white/70 p-8 sm:p-10 backdrop-blur-sm shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                About Me
              </div>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#0a0a0a] tracking-tight leading-[1.05] mb-6">
                Building intelligent systems that <span className="font-normal italic font-serif" style={{ fontFamily: "Georgia, serif" }}>scale</span> and deliver.
              </h2>
            </div>
            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-prose">
              <p>
                {data?.bio || 'I am Bevantyo Satria Pinandhita (Bevan) - a Machine Learning Engineer, Full-Stack Developer, and Autonomous Systems Specialist based in Surabaya. With 3+ years of hands-on experience, I have built end-to-end solutions across AI/ML, robotics, blockchain, and web technologies for startups, government contracts, and robotics competitions.'}
              </p>
              <p>
                {data?.bioSecond || 'My approach combines deep technical rigor with rapid iteration: translating complex challenges into production-ready systems. Whether architecting autonomous drones, deploying secure full-stack dashboards, or integrating LLMs, I focus on measurable impact and scalable architecture.'}
              </p>
            </div>
          </div>

          {/* Bento Cell 2: Quick Stats Matrix (Col span 4) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            {milestones.map((milestone, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-neutral-200/80 bg-white/70 p-4 backdrop-blur-sm shadow-sm text-center h-full flex flex-col justify-center"
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-brand-orange mb-1">
                  {milestone.number}
                </div>
                <div className="text-neutral-500 text-[9px] font-bold tracking-wider uppercase">
                  {milestone.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bento Cell 3: Engineering Principles (Col span 6) */}
          <div className="md:col-span-6 rounded-2xl border border-neutral-200/80 bg-white/70 p-8 sm:p-10 backdrop-blur-sm shadow-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0a0a0a] mb-8 tracking-tight">
              My Engineering Principles
            </h3>
            <ul className="space-y-6">
              {principles.map((principle, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="font-serif italic font-normal text-2xl text-brand-orange leading-none mt-0.5" style={{ fontFamily: "Georgia, serif" }}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-base text-brand-dark mb-1 tracking-tight">
                      {principle.title}
                    </h4>
                    <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-sans">
                      {principle.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Bento Cell 4: Publications & Certifications (Col span 6) */}
          <div className="md:col-span-6 rounded-2xl border border-neutral-200/80 bg-white/70 p-8 sm:p-10 backdrop-blur-sm shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0a0a0a] mb-6 tracking-tight">
                Academic & Professional Focus
              </h3>
              
              {/* Publications */}
              <div className="mb-6">
                <h4 className="text-[10px] font-mono font-bold text-neutral-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={12} className="text-brand-orange" />
                  <span>Selected Publications</span>
                </h4>
                <ul className="space-y-3">
                  {publications.map((pub, idx) => (
                    <li key={idx} className="text-xs text-neutral-600 leading-normal pl-4 border-l border-neutral-200 hover:border-brand-orange transition-colors">
                      {pub.title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-[10px] font-mono font-bold text-neutral-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={12} className="text-brand-orange" />
                  <span>Certifications</span>
                </h4>
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#f5f4f2] px-3.5 py-2 text-xs font-semibold text-brand-dark border border-neutral-200/60">
                  IT Specialist Artificial Intelligence
                </div>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-neutral-200/80 flex items-center gap-4">
              <span className="text-[10px] font-mono font-bold text-neutral-400">STACK:</span>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] font-semibold text-neutral-600">
                <span>Python</span> • <span>TensorFlow</span> • <span>ROS2</span> • <span>Next.js</span> • <span>Flutter</span> • <span>Solidity</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
