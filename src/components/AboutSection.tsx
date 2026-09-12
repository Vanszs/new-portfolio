import React from "react";

interface AboutSectionProps {
  data?: {
    bio?: string;
    bioSecond?: string;
    milestones?: { number: string; label: string }[];
    publications?: { title: string; desc?: string }[];
    principles?: { title: string; desc: string }[];
    coreSkills?: string[];
    certifications?: string[];
  };
}

const defaultMilestones = [
  { number: "3+", label: "years building" },
  { number: "10+", label: "projects shipped" },
  { number: "3", label: "peer-reviewed papers" },
  { number: "4.85/5", label: "average satisfaction" },
];

const defaultPrinciples = [
  { title: "Production first", desc: "Systems should be tested, observable, secure, and understandable after handoff." },
  { title: "Fast feedback", desc: "Short loops with real users beat long stretches of speculative implementation." },
  { title: "Useful complexity", desc: "Architecture earns its place when it makes the next change safer or faster." },
];

const defaultPublications = [
  { title: "Food Optimizing for Patients with Kidney Failure Using Evolution Strategies Algorithm" },
  { title: "Optimizing Chicken Feed Using Evolution Strategies Algorithm" },
  { title: "Hybrid Whale Optimization Algorithm: A Literature Review" },
];

export default function AboutSection({ data }: AboutSectionProps) {
  const milestones = data?.milestones?.length ? data.milestones : defaultMilestones;
  const principles = data?.principles?.length ? data.principles : defaultPrinciples;
  const publications = data?.publications?.length ? data.publications : defaultPublications;
  const skills = data?.coreSkills?.length ? data.coreSkills : ["Python", "TensorFlow", "ROS2", "Next.js", "Flutter", "Solidity"];
  const certifications = data?.certifications?.length ? data.certifications : ["IT Specialist Artificial Intelligence"];

  return (
    <section id="about" className="border-b border-[#2b302b] bg-[#151715] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d96a46]">Profile</p>
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#ededed] sm:text-5xl">Technical range, practical delivery.</h2>
            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-[#9ca39b]">
              <p>{data?.bio || "I am Bevantyo Satria Pinandhita, an AI/ML Engineer and full-stack developer based in Surabaya. I build end-to-end solutions across machine learning, robotics, blockchain, and web technologies."}</p>
              <p>{data?.bioSecond || "My approach combines technical rigor with rapid iteration. I translate complex constraints into production-ready systems, from autonomous drones and secure dashboards to LLM integrations."}</p>
            </div>
          </div>

          <dl className="grid grid-cols-2 self-start border-t border-[#2b302b]">
            {milestones.map((milestone, index) => (
              <div key={`${milestone.label}-${index}`} className="border-b border-r border-[#2b302b] py-5 pr-4 last:border-r-0 even:border-r-0 sm:pr-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca39b]">{milestone.label}</dt>
                <dd className="mt-2 font-display text-2xl font-semibold text-[#d96a46]">{milestone.number}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-[#2b302b] pt-8 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-display text-xl font-medium text-[#ededed]">Engineering principles</h3>
            <ol className="mt-7 border-t border-[#2b302b]">
              {principles.map((principle, index) => (
                <li key={principle.title} className="grid grid-cols-[40px_1fr] gap-4 border-b border-[#2b302b] py-5">
                  <span className="font-mono text-xs text-[#d96a46]">0{index + 1}</span>
                  <div><h4 className="text-sm font-medium text-[#ededed]">{principle.title}</h4><p className="mt-2 text-sm leading-6 text-[#9ca39b]">{principle.desc}</p></div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-display text-xl font-medium text-[#ededed]">Evidence of practice</h3>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">Selected publications</p>
            <ul className="mt-3 border-t border-[#2b302b]">
              {publications.map((publication, index) => <li key={`${publication.title}-${index}`} className="border-b border-[#2b302b] py-4 text-sm leading-6 text-[#ededed]">{publication.title}</li>)}
            </ul>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">Certification</p>
            <p className="mt-3 text-sm text-[#ededed]">{certifications.join(" / ")}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-[#2b302b] pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#d96a46]">Working stack</span>
          {skills.map((skill) => <span key={skill} className="font-mono text-[11px] text-[#9ca39b]">{skill}</span>)}
        </div>
      </div>
    </section>
  );
}
