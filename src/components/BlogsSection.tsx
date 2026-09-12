import React from "react";
import { ArrowUpRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  description?: string;
  desc?: string;
}

interface BlogsSectionProps {
  data?: BlogItem[];
}

const fallbackBlogs: BlogItem[] = [
  { id: "b1", title: "From LLM Prompts to Production: Building AI-Native Apps", category: "AI/ML", date: "June 15, 2026", readTime: "6 min read", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=500", description: "A practical guide to integrating language models into full-stack applications, from prompt engineering and cost control to observability." },
  { id: "b2", title: "Autonomous Drones with ROS2: A Solo Developer's Workflow", category: "Robotics", date: "May 28, 2026", readTime: "8 min read", image: "/images/image.png", description: "How ROS2, MAVLink, and an AI coding assistant shaped a collision-avoidance drone system and remote monitoring dashboard." },
  { id: "b3", title: "Scaling Flutter Apps for Offline-First Government Deployments", category: "Mobile engineering", date: "April 12, 2026", readTime: "5 min read", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=500", description: "Lessons from building production Flutter applications with offline-first architecture, Riverpod, and real-time synchronization." },
];

export default function BlogsSection({ data }: BlogsSectionProps) {
  const blogs = data && data.length > 0 ? data : fallbackBlogs;
  return (
    <section id="blogs" className="border-b border-[#2b302b] bg-[#151715] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl"><div className="mb-10 max-w-2xl"><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d96a46]">Notes</p><h2 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#ededed] sm:text-5xl">Writing from the work.</h2><p className="mt-5 text-sm leading-7 text-[#9ca39b]">Methods, constraints, and lessons from AI systems, robotics, and full-stack delivery.</p></div><div className="border-t border-[#2b302b]">{blogs.map((blog, index) => <article key={blog.id} className="grid grid-cols-[48px_1fr] gap-5 border-b border-[#2b302b] py-6 sm:grid-cols-[72px_150px_1fr_auto] sm:gap-6"><span className="font-mono text-xs text-[#d96a46]">{String(index + 1).padStart(2, "0")}</span><ImageWithFallback src={blog.image} alt="" className="hidden h-20 w-full border border-[#2b302b] object-cover grayscale sm:block" /><div><div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#9ca39b]"><span>{blog.category}</span><span>{blog.date}</span><span>{blog.readTime}</span></div><h3 className="mt-3 font-display text-lg font-medium leading-snug text-[#ededed]">{blog.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#9ca39b]">{blog.description || blog.desc}</p></div><span className="hidden self-center text-[#9ca39b] sm:block" aria-hidden="true"><ArrowUpRight size={17} /></span></article>)}</div></div>
    </section>
  );
}
