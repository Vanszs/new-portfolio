import React, { useState, useMemo } from "react";
import { ArrowRight, X, Calendar, MapPin, Tag, ChevronLeft, ChevronRight } from "lucide-react";

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

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp1",
    role: "Founding Engineer",
    company: "Owie Technologies",
    location: "Surabaya, East Java, Indonesia",
    period: "May 2026 - Present",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    summary: "Developing Owie Motion across frontend, backend, and infrastructure workflows.",
    description: "Contributed to the development of Owie Motion. Integrated Generative AI features into web applications, including AI-powered automation and API integrations. Assisted in backend development and server management to ensure scalable and reliable system performance. Supported CI/CD pipeline implementation and deployment workflows. Improved system architecture, infrastructure stability, and AI integration processes.",
    gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"],
    tags: ["Next.js", "Generative AI", "Prisma", "CI/CD"]
  },
  {
    id: "exp2",
    role: "AI-Augmented Full Stack Developer",
    company: "Partai Nasional Demokrat (NasDem)",
    location: "Surabaya, East Java, Indonesia",
    period: "Aug 2025 - May 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    summary: "Engineered secure admin panel with election data aggregation, CRUD, and RBAC.",
    description: "Reduced development timeline by 40% by utilizing AI-assisted prototyping tools (Lovable AI) for initial landing page design and rapid iteration. Engineered a custom admin panel with election data aggregation, CRUD operations for program management, and role-based access control. Implemented Redis-based background job processing system, optimizing performance and enabling scalable async operations. Deployed production infrastructure on VPS with Cloudflare integration.",
    gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"],
    tags: ["Next.js", "RBAC", "Redis", "Cloudflare"]
  },
  {
    id: "exp3",
    role: "Discord Community Lead",
    company: "Venimee Discord Channel",
    location: "Surabaya, Indonesia (Remote)",
    period: "Jun 2024 - May 2026",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
    summary: "Scaled a creator community, designed engagement workflows, and managed moderation.",
    description: "Initiated and scaled a Discord-based community from zero, designing engagement workflows and fostering organic growth. Recruited, trained, and managed a team of moderators with clearly defined roles. Directed high-impact partnerships and held full ownership of strategic direction, daily governance, and community culture.",
    gallery: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600"],
    tags: ["Discord", "Community Management", "Event Ops", "Partnerships"]
  },
  {
    id: "exp4",
    role: "Autonomous Drone Solo Programmer (PIMNAS)",
    company: "Veteran Robotics | UPN Veteran Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Dec 2025",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600",
    summary: "Engineered complete autonomous drone system and control dashboard.",
    description: "Engineered and configured a complete autonomous drone system, including the setup of the ROS2 development environment. Developed advanced path-planning and collision avoidance algorithms, integrating Particle Swarm Optimization (PSO) and Optimal Reciprocal Collision Avoidance (ORCA) for package delivery. Built and deployed Next.js control & monitoring dashboard on a VPS.",
    gallery: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600"],
    tags: ["ROS2", "MAVLink", "Next.js", "AI Agent"]
  },
  {
    id: "exp5",
    role: "Autonomous Drone VTOL Solo Programmer (KRTI)",
    company: "Veteran Robotics | UPN Veteran Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Oct 2025",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600",
    summary: "Managed VTOL drone setup and software development on Jetson Nano.",
    description: "Designed and implemented an end-to-end autonomous VTOL drone system. Developed full software stack using ROS2 Foxy on Ubuntu 20 for real-time drone control. Integrated MAVLink protocols and built a multi-sensor fusion system integrating ultrasonic, magnetometer, and computer vision sensors. Configured VPS with a reverse tunnel for secure remote operations.",
    gallery: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600"],
    tags: ["ROS2", "Jetson Nano", "MAVLink", "Sensor Fusion"]
  },
  {
    id: "exp6",
    role: "Founder & Community Tech Lead",
    company: "BlockHood",
    location: "Surabaya, East Java, Indonesia",
    period: "Apr 2025 - Oct 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    summary: "Led Web3 community growth, operations, and strategic partnerships.",
    description: "Founded and expanded BlockHood Web3 community. Handled strategic developer operations, fostered partnerships with other Web3 protocols, managed moderators, and aligned community initiatives with tech stack implementation.",
    gallery: ["https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"],
    tags: ["Web3", "Community Growth", "Leadership", "Vibe Coding"]
  },
  {
    id: "exp7",
    role: "Solo Flutter Developer",
    company: "Pemerintah Kota Surabaya",
    location: "Surabaya, East Java, Indonesia",
    period: "Jul 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    summary: "Delivered two offline-first Flutter apps in a two-week sprint.",
    description: "Built the end-to-end development of two complete Flutter applications (warga & petugas). Architected a robust offline-first system using Riverpod state management. Integrated real-time synchronization via RESTful APIs and Socket.IO, reducing data latency by 60%. Designed a modern UI/UX using Material Design 3 and Lottie animations.",
    gallery: ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"],
    tags: ["Flutter", "Riverpod", "Socket.IO", "Offline-First"]
  },
  {
    id: "exp8",
    role: "Solo Full-Stack Web Developer",
    company: "Pemerintah Kota Surabaya",
    location: "Surabaya, East Java, Indonesia",
    period: "Jul 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600",
    summary: "Built secure admin dashboard with MySQL and custom RBAC.",
    description: "Developed and deployed a full-stack admin dashboard in 2 weeks using Next.js (App Router), TypeScript, and React. Architected secure backend using Next.js API Routes and MySQL, featuring bcrypt hashing, HMAC-signed sessions, SQL injection/CSRF protection, and rate-limiting. Implemented granular Role-Based Access Control (RBAC) system for 4 distinct user roles.",
    gallery: ["https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600"],
    tags: ["Next.js", "MySQL", "RBAC", "Next.js API"]
  },
  {
    id: "exp9",
    role: "Flutter Developer",
    company: "PT. IGS Indonesia Group",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1581093588402-485ed6ad48d4?auto=format&fit=crop&q=80&w=600",
    summary: "Built Flutter app for landslide detection with IoT sensor integrations.",
    description: "Developed a responsive and performant Flutter-based mobile application for landslide detection. Focuses on real-time visualization of IoT sensor data, integrating the mobile app with hardware nodes via REST APIs. Managed local state using Provider and BLoC patterns.",
    gallery: ["https://images.unsplash.com/photo-1581093588402-485ed6ad48d4?auto=format&fit=crop&q=80&w=600"],
    tags: ["Flutter", "IoT", "BLoC", "APIs"]
  },
  {
    id: "exp10",
    role: "Machine Learning & IoT Developer",
    company: "PT. IGS Indonesia Group",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
    summary: "Designed ML sensor-fusion pipelines for landslide early warning systems.",
    description: "Developed and optimized machine learning models for early landslide potential detection. Integrated real-time data from IoT sensor arrays and applied sensor-fusion algorithms to reduce false alarms by 43% and improve accuracy.",
    gallery: ["https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600"],
    tags: ["Machine Learning", "IoT", "TensorFlow", "Sensor Fusion"]
  },
  {
    id: "exp11",
    role: "AI Engineer",
    company: "ArcalisAI",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - May 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    summary: "Integrated OpenAI/OpenRouter APIs and fine-tuned prompt engineering pipelines.",
    description: "Developed and implemented AI systems, managing API pipelines for large language models including GPT and DeepSeek. Conducted hyperparameter selection, prompt tuning, and model optimization to enhance response quality and cost control.",
    gallery: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600"],
    tags: ["AI Engineer", "OpenAI", "DeepSeek", "API Integration"]
  },
  {
    id: "exp12",
    role: "Blockchain Developer",
    company: "ArcalisAI",
    location: "Surabaya, East Java, Indonesia",
    period: "Dec 2024 - May 2025",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=600",
    summary: "Wrote smart contracts in Solidity and Rust-based Solana migration programs.",
    description: "Developed smart contracts using Solidity for blockchain-based applications. Designed and implemented Rust-based Solana migration contracts to enhance scalability and performance. Led the tech team in end-to-end decentralized deployments.",
    gallery: ["https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=600"],
    tags: ["Solidity", "Rust", "Solana", "Smart Contracts"]
  },
  {
    id: "exp13",
    role: "Community Moderator",
    company: "CARV",
    location: "Singapore (Remote)",
    period: "Dec 2023 - May 2025",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
    summary: "Managed game night events, ticket support, and community operations.",
    description: "Managed global Web3 gaming community events, resolved support tickets, reported bugs, and facilitated member interactions at CARV. Supported community engagement strategies, ensuring smooth user experiences.",
    gallery: ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600"],
    tags: ["Community Management", "Event Ops", "Support", "Web3"]
  },
  {
    id: "exp14",
    role: "Community Lead & Marketer",
    company: "Seeds",
    location: "Jakarta, Indonesia",
    period: "Dec 2024 - Apr 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    summary: "Managed partnerships with Web3 communities and marketing content.",
    description: "Managed partnerships with Web3 communities on revenue-sharing mechanisms via Discord and Telegram. Coordinated market awareness campaigns and stock recommendations to attract potential clients.",
    gallery: ["https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"],
    tags: ["Community Lead", "Marketing", "Partnerships", "Web3"]
  },
  {
    id: "exp15",
    role: "Blockchain Developer",
    company: "Seeds",
    location: "Jakarta, Indonesia",
    period: "Dec 2024 - Feb 2025",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    summary: "Built decentralized marketplace on the Diamante blockchain.",
    description: "Developed and deployed code for a decentralized marketplace on the Diamante blockchain network. Implemented core features such as NFT minting, listing, buying, and selling mechanisms. Conducted testing and contract optimization.",
    gallery: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600"],
    tags: ["Blockchain", "Solidity", "Diamante", "NFTs"]
  },
  {
    id: "exp16",
    role: "Autonomous Ship Team President",
    company: "Veteran Robotics | UPN Veteran Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "Nov 2022 - Nov 2024",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    summary: "Led autonomous surface vehicle team to 2nd place in national championships.",
    description: "Led the ASV team division in the robotics community to secure second place in the prestigious KKCTBN 2023 and KKI 2024 maritime robotics championships. Fostered collaborative work with Puspresnas.",
    gallery: ["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"],
    tags: ["ASV", "Maritime Robotics", "Team Leadership", "KKCTBN"]
  },
  {
    id: "exp17",
    role: "R&D Staff & Event Chairman",
    company: "BEM Fasilkom UPN \"Veteran\" Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "2023 - Apr 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    summary: "Orchestrated AI and Data Science seminars and workshops.",
    description: "Served as Event Organizer Chairman for 'Fasilkom Talk #4', coordinating an offline seminar on AI and Data Science. Managed workshops, logistics, and speaker engagement to advance tech proficiency within the campus.",
    gallery: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"],
    tags: ["R&D Staff", "Event Operations", "Data Science", "Leadership"]
  },
  {
    id: "exp18",
    role: "Junior Web Developer",
    company: "PT Imersa Solusi Teknologi",
    location: "Nganjuk, East Java, Indonesia",
    period: "May 2021 - Jul 2021",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
    summary: "Developed client landing pages using HTML, CSS, and JavaScript.",
    description: "Built and maintained responsive web applications for small businesses. Optimized visual assets, resolving layout issues to improve overall page loading speed.",
    gallery: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600"],
    tags: ["HTML", "CSS", "JavaScript", "Web Development"]
  }
];

const ITEMS_PER_PAGE = 4;

interface ExperienceSectionProps {
  data?: ExperienceItem[];
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  const experiencesList = data && data.length > 0 ? data : EXPERIENCES;
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(experiencesList.length / ITEMS_PER_PAGE);

  const paginatedExperiences = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return experiencesList.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, experiencesList]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("experience");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-[#f5f4f2] relative z-10 border-t border-neutral-200/80">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Title with tasteskill style */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
            Experience
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#0a0a0a] tracking-tight leading-[1.05]">
            Professional Work <span className="font-normal italic font-serif" style={{ fontFamily: "Georgia, serif" }}>History</span>
          </h2>
        </div>

        {/* Experience Bento Grid (2 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {paginatedExperiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              className="group p-2 bg-black/[0.015] border border-black/5 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="bg-white border border-[#e5e2da]/40 rounded-[calc(2rem-0.5rem)] overflow-hidden h-full flex flex-col justify-between">
                
                {/* Image Banner */}
                <div className="relative overflow-hidden aspect-[16/9] bg-[#f5f4f2] border-b border-[#e5e2da]/40">
                  <img
                    src={exp.image}
                    alt={exp.company}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-brand-dark text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>

                {/* Detail Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-brand-dark mb-1 group-hover:text-brand-orange transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-brand-orange font-display text-sm font-semibold mb-4">
                      {exp.company}
                    </p>
                    <p className="text-[#5e5e5e] text-sm leading-relaxed mb-6 font-sans">
                      {exp.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#e5e2da]/60">
                    <div className="flex gap-1.5">
                      {exp.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#f5f4f2] text-[#5e5e5e] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-brand-dark group-hover:text-brand-orange font-semibold text-xs flex items-center gap-1">
                      <span>Learn More</span>
                      <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Timeline Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-neutral-200/80 bg-white text-brand-dark hover:bg-neutral-100 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
                  currentPage === page
                    ? "bg-brand-dark text-white border border-brand-dark"
                    : "border border-neutral-200/80 bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-neutral-200/80 bg-white text-brand-dark hover:bg-neutral-100 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Experience Detail Modal (tasteskill style) */}
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#f5f4f2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90svh] flex flex-col animate-slide-up border border-neutral-200">
              
              {/* Sticky Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200/80 bg-white z-10">
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-brand-dark">
                    {selectedExp.role}
                  </h3>
                  <p className="text-brand-orange font-display text-xs font-semibold">
                    {selectedExp.company}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExp(null)}
                  className="p-2 hover:bg-[#f5f4f2] rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-brand-dark" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-6 space-y-6 flex-grow bg-white">
                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-neutral-400 text-xs font-medium font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-orange" />
                    <span>{selectedExp.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-brand-orange" />
                    <span>{selectedExp.location}</span>
                  </span>
                </div>

                {/* Primary Image & Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedExp.gallery.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Gallery item ${idx + 1}`}
                      className="w-full aspect-[16/10] object-cover rounded-2xl border border-neutral-200/80"
                    />
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-display font-bold text-xs text-neutral-400 mb-2 uppercase tracking-wider">
                    About this role
                  </h4>
                  <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line font-sans">
                    {selectedExp.description}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-display font-bold text-xs text-neutral-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag size={14} className="text-brand-orange" />
                    <span>Skills & Technologies</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#f5f4f2] text-neutral-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
