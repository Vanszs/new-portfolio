import { useState } from "react";
import { ArrowUpRightIcon, FolderIcon } from "./icons";
import SectionTitle from "./SectionTitle";
import type { ZickrianProject } from "./types";

const fallback: ZickrianProject[] = [
  ["owie-motion", "Owie Motion", "2026"],
  ["nasdem-dashboard", "NasDem Election Dashboard", "2026"],
  ["smart-city", "Surabaya Smart City Apps", "2025"],
  ["drone", "Autonomous Drone Delivery", "2025"],
  ["landslide", "Landslide Detection IoT", "2025"],
  ["diamante", "Diamante NFT Marketplace", "2025"],
  ["arcalis", "ArcalisAI LLM Pipeline", "2025"],
  ["solana", "Solana Migration Contracts", "2025"],
  ["carv", "Carv Community Operations", "2023-2025"],
  ["blockhood", "BlockHood Web3 Community", "2025"],
  ["venimee", "Venimee Discord Channel", "2024-2026"],
  ["asv", "Autonomous Surface Vehicle", "2022-2024"],
  ["bangkit", "Bangkit IoT Computer Vision", "2024"],
].map(([id, title, year]) => ({
  id,
  title,
  year,
  category: "AI / Full-stack",
  description: "A practical software project focused on useful systems and measurable impact.",
  image: null,
  tags: ["AI", "Software"],
}));

export default function ProjectsList({ projects }: { projects?: ZickrianProject[] }) {
  const items = projects?.length ? projects : fallback;
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, 4);

  return (
    <section id="projects" className="zickrian-section zickrian-projects">
      <SectionTitle
        count="13"
        action={
          <a href="#projects" className="zickrian-view-all">
            View all <ArrowUpRightIcon width={14} height={14} />
          </a>
        }
      >
        Projects
      </SectionTitle>
      <div className="zickrian-proj-list">
        {visible.map((item) => (
          <a
            className="zickrian-proj-item"
            key={item.id}
            href={`#projects`}
          >
            <div className="zickrian-proj-left">
              <div className="zickrian-proj-icon">
                <FolderIcon width={14} height={14} />
              </div>
            </div>
            <div className="zickrian-proj-content">
              <p className="zickrian-proj-title">{item.title}</p>
              <div className="zickrian-proj-meta">
                <span>{item.year}</span>
              </div>
            </div>
            <ArrowUpRightIcon width={16} height={16} className="zickrian-proj-arrow" />
          </a>
        ))}
      </div>
      {items.length > 4 && (
        <button
          type="button"
          className="zickrian-show-more"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </section>
  );
}
