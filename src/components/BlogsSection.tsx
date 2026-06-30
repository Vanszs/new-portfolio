import React from "react";
import { ArrowRight } from "lucide-react";

export default function BlogsSection() {
  const blogs = [
    {
      id: "b1",
      title: "From LLM Prompts to Production: Building AI-Native Apps",
      category: "AI/ML",
      date: "June 15, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=500",
      desc: "A practical guide to integrating large language models into full-stack applications, from prompt engineering and cost control to observability and user feedback loops."
    },
    {
      id: "b2",
      title: "Autonomous Drones with ROS2: A Solo Developer's Workflow",
      category: "Robotics",
      date: "May 28, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=500",
      desc: "How I used ROS2, MAVLink, and an AI coding assistant to architect a collision-avoidance drone system and deploy a remote monitoring dashboard on a VPS."
    },
    {
      id: "b3",
      title: "Scaling Flutter Apps for Offline-First Government Deployments",
      category: "Mobile Engineering",
      date: "April 12, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=500",
      desc: "Lessons learned building two production Flutter applications for a city government: offline-first architecture, Riverpod state management, and zero-crash launches."
    }
  ];

  return (
    <section id="blogs" className="py-24 px-6 md:px-12 bg-[#f3f2ee]/40 relative z-10 border-t border-[#e5e2da]/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-brand-orange font-display font-medium text-sm uppercase tracking-wider">
              <span className="w-5 h-[2px] bg-brand-orange"></span>
              <span>Engineering Notes</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-tighter leading-none">
              Insights & Publications
            </h2>
          </div>
          
          <div className="md:text-right">
            <span className="text-[#5e5e5e] text-sm sm:text-base font-medium max-w-sm block">
              Sharing methodologies on AI systems, autonomous robotics, full-stack engineering, and blockchain development.
            </span>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id}
              onClick={() => alert(`Reading article: "${blog.title}" (Mock Interaction)`)}
              className="group flex flex-col bg-white border border-[#e5e2da] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f2ee]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-3 left-3 bg-white text-brand-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {blog.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-[#8c8c8c] mb-3">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  
                  <h3 className="font-display font-bold text-lg sm:text-xl text-brand-dark mb-3 tracking-tight group-hover:text-[#fd4a24] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  
                  <p className="text-[#5e5e5e] text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#fd4a24] text-xs sm:text-sm font-bold pt-4 border-t border-[#e5e2da]/40 group-hover:translate-x-1 transition-transform duration-300">
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
