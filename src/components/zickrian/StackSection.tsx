import React from "react";
import SectionTitle from "./SectionTitle";
import type { StackGroup } from "./types";

const groups: StackGroup[] = [
  {
    number: "01",
    label: "AI / ML",
    items: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Pandas", "NumPy", "OpenAI", "DeepSeek"],
  },
  {
    number: "02",
    label: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    number: "03",
    label: "Backend",
    items: ["Node.js", "Next.js API", "Prisma", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    number: "04",
    label: "Robotics / Web3",
    items: ["ROS2", "MAVLink", "Jetson Nano", "Solidity", "Rust", "Solana", "Docker", "Cloudflare"],
  },
];

export default function StackSection() {
  return (
    <section id="stack" className="zickrian-section zickrian-stack">
      <SectionTitle>Stack</SectionTitle>
      <div className="zickrian-stack-container">
        <div className="zickrian-stack-guide" aria-hidden="true" />
        {groups.map((group) => (
          <div key={group.number} className="zickrian-stack-row">
            <div className="zickrian-stack-col-left">
              <span className="zickrian-stack-num">{group.number}</span>
              <span className="zickrian-stack-name">{group.label}</span>
            </div>
            <ul className="zickrian-stack-col-right">
              {group.items.map((item) => (
                <li key={item} className="zickrian-stack-badge">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
