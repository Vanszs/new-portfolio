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
                      <p className="zickrian-exp-desc">{item.description}</p>
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
