import React, { useState } from "react";
import ImageWithFallback from "../ImageWithFallback";
import SectionTitle from "./SectionTitle";
import type { ZickrianExperience } from "./types";

const fallback: ZickrianExperience[] = [
  {
    id: "owie",
    organization: "Owie Technologies",
    role: "Founding Engineer",
    type: "Employment",
    period: "May 2026 - Present",
    duration: "",
    location: "Surabaya, Indonesia",
    logo: null,
    tags: ["Next.js", "Generative AI", "Prisma", "CI/CD"],
    description: "Developing Owie Motion across frontend, backend, and infrastructure workflows.",
    bullets: [
      "Integrated Generative AI features and automation pipelines into core web applications.",
      "Assisted backend architecture, database schema design, and high-availability server management.",
      "Designed robust CI/CD pipelines to ensure scalable, continuous, and reliable delivery."
    ]
  },
  {
    id: "nasdem",
    organization: "Partai Nasional Demokrat (NasDem)",
    role: "AI-Augmented Full Stack Developer",
    type: "Employment",
    period: "Aug 2025 - May 2026",
    duration: "",
    location: "Surabaya, Indonesia",
    logo: null,
    tags: ["Next.js", "RBAC", "Redis", "Cloudflare"],
    description: "Engineered a secure admin panel with election data aggregation, CRUD operations, RBAC, and Redis background jobs.",
    bullets: [
      "Reduced development timeline by 40% utilizing AI-assisted prototyping tools for rapid landing page iteration.",
      "Engineered a secure custom admin panel with real-time election data aggregation and role-based access control.",
      "Implemented a Redis-backed background job queue on VPS infrastructure fronted by Cloudflare."
    ]
  },
  {
    id: "venimee",
    organization: "Venimee Discord Channel",
    role: "Discord Community Lead",
    type: "Employment",
    period: "Jun 2024 - May 2026",
    duration: "",
    location: "Surabaya, Indonesia",
    logo: null,
    tags: ["Discord", "Community Management", "Partnerships"],
    description: "Scaled a Discord-based community, trained moderators, and directed strategic partnerships.",
    bullets: [
      "Initiated and organically scaled a creator community from zero to thousands of active members.",
      "Recruited, structured, and trained a dedicated moderator staff with clear accountability workflows.",
      "Directed strategic partnerships, daily governance, and long-term community engagement initiatives."
    ]
  },
  {
    id: "pimnas",
    organization: "Veteran Robotics | UPN Veteran Jawa Timur",
    role: "Autonomous Drone Solo Programmer",
    type: "Competition",
    period: "Jan 2025 - Dec 2025",
    duration: "",
    location: "Surabaya, Indonesia",
    logo: null,
    tags: ["ROS2", "MAVLink", "Next.js", "AI Agent"],
    description: "Engineered a complete autonomous drone system with path planning, collision avoidance, and monitoring dashboard.",
    bullets: [
      "Engineered and configured the complete autonomous drone software architecture on ROS2.",
      "Implemented PSO (Particle Swarm Optimization) and ORCA algorithms for package delivery collision avoidance.",
      "Built and deployed a real-time Next.js telemetry and flight control monitoring dashboard."
    ]
  },
  {
    id: "krti",
    organization: "Veteran Robotics | UPN Veteran Jawa Timur",
    role: "Autonomous Drone VTOL Solo Programmer",
    type: "Competition",
    period: "Jan 2025 - Oct 2025",
    duration: "",
    location: "Surabaya, Indonesia",
    logo: null,
    tags: ["ROS2", "Jetson Nano", "MAVLink", "Sensor Fusion"],
    description: "Designed an end-to-end autonomous VTOL drone system using ROS2, MAVLink, and multi-sensor fusion.",
    bullets: [
      "Architected end-to-end flight software on Ubuntu/ROS2 Foxy running on an embedded Jetson Nano.",
      "Integrated MAVLink protocol communication and tuned PID controllers for vertical-to-forward transitions.",
      "Engineered multi-sensor fusion combining ultrasonic rangefinders, magnetometers, and vision cameras."
    ]
  },
  {
    id: "blockhood",
    organization: "BlockHood",
    role: "Founder & Community Tech Lead",
    type: "Leadership",
    period: "Apr 2025 - Oct 2025",
    duration: "",
    location: "Surabaya, Indonesia",
    logo: null,
    tags: ["Web3", "Community Growth", "Leadership"],
    description: "Founded and expanded a Web3 community while leading developer operations and partnerships.",
    bullets: [
      "Founded BlockHood Web3 ecosystem and accelerated organic developer adoption across regional universities.",
      "Forged key technical partnerships with leading Layer-1 and Layer-2 blockchain protocols.",
      "Organized developer workshops, hackathons, and technical bootcamps for emerging builders."
    ]
  },
  {
    id: "surabaya",
    organization: "Pemerintah Kota Surabaya",
    role: "Solo Flutter Developer",
    type: "Contract",
    period: "Jul 2025 - Jul 2025",
    duration: "",
    location: "Surabaya, Indonesia",
    logo: null,
    tags: ["Flutter", "Riverpod", "Socket.IO", "Offline-First"],
    description: "Built two offline-first Flutter applications with real-time synchronization for city government.",
    bullets: [
      "Built two cross-platform Flutter applications (citizen & field officer) in an intensive 2-week sprint.",
      "Architected an offline-first local cache engine powered by Riverpod and SQLite.",
      "Integrated Socket.IO and REST APIs for instant push sync, reducing data latency by 60%."
    ]
  },
];

const RoleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function ExperienceList({ experiences }: { experiences?: ZickrianExperience[] }) {
  const items = experiences?.length ? experiences : fallback;
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="zickrian-section zickrian-experience">
      <SectionTitle count={String(items.length)}>Experience</SectionTitle>
      <div className="zickrian-exp-tree-list">
        {items.map((item) => {
          const isOpen = Boolean(openIds[item.id]);
          const initials = item.organization
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join("");

          return (
            <div key={item.id} className="zickrian-exp-group">
              {/* Company header */}
              <div className="zickrian-exp-company">
                <div className="zickrian-exp-avatar">
                  {item.logo ? (
                    <ImageWithFallback
                      src={item.logo}
                      alt={`${item.organization} logo`}
                      width={24}
                      height={24}
                      className="size-full rounded-full"
                    />
                  ) : (
                    <span className="zickrian-exp-initials">{initials}</span>
                  )}
                </div>
                <h3>{item.organization}</h3>
              </div>

              {/* Timeline stem + role collapsible */}
              <div className="zickrian-exp-timeline">
                <div className="zickrian-exp-role-wrap">
                  <div className="zickrian-exp-corner-bracket" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="zickrian-exp-role-btn"
                    aria-expanded={isOpen}
                  >
                    <div className="zickrian-exp-role-left">
                      <div className="zickrian-exp-role-icon">
                        <RoleIcon />
                      </div>
                      <span className="zickrian-exp-role-title">{item.role}</span>
                    </div>
                    <div className="zickrian-exp-role-right">
                      <span className="zickrian-exp-role-period">{item.period}</span>
                      <span className={`zickrian-exp-chevron ${isOpen ? "is-open" : ""}`}>
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="zickrian-exp-dropdown">
                      {item.bullets && item.bullets.length > 0 ? (
                        <ul className="zickrian-exp-bullets">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="zickrian-exp-desc">{item.description}</p>
                      )}
                      <div className="zickrian-tags">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
