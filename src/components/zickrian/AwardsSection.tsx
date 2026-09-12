import React, { useState } from "react";
import { ArrowUpRightIcon } from "./icons";
import SectionTitle from "./SectionTitle";
import type { Award } from "./types";

const awards: Award[] = [
  {
    title: "Best Capstone Project – Pijak in Collaboration with IBM Skillsbuild",
    prize: "Best Capstone Project",
    date: "07.2026",
    grade: "National",
    href: "https://www.dicoding.com/",
  },
  {
    title: "Best Graduate – AI Engineer, Pijak in Collaboration with IBM Skillsbuild",
    prize: "Lulusan Terbaik (Best Graduate)",
    date: "07.2026",
    grade: "National",
    href: "https://www.dicoding.com/",
  },
  {
    title: "Top 5 National Finalist of Base Track at Coinbase Hackathon Indonesia 2025",
    prize: "Top 5 National Finalist",
    date: "01.2026",
    grade: "National",
    href: "https://baserealms.app/",
  },
];

const CrownIcon = () => (
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
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
    <path d="M5 21h14" />
  </svg>
);

export default function AwardsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="awards" className="zickrian-section zickrian-awards">
      <SectionTitle count={String(awards.length)}>Awards</SectionTitle>
      <div className="zickrian-proj-list">
        {awards.map((award, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={award.title} className="zickrian-proj-item-col">
              <div
                className="zickrian-proj-item cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="zickrian-proj-left">
                  <div className="zickrian-proj-icon">
                    <CrownIcon />
                  </div>
                </div>
                <div className="zickrian-proj-content">
                  <p className="zickrian-proj-title">{award.title}</p>
                  <div className="zickrian-proj-meta">
                    <span>{award.prize}</span>
                    <span className="zickrian-meta-sep" aria-hidden="true" />
                    <time>{award.date}</time>
                  </div>
                </div>
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="zickrian-proj-arrow p-1"
                  aria-label={`Open link for ${award.title}`}
                >
                  <ArrowUpRightIcon width={16} height={16} />
                </a>
              </div>
              {isOpen && (
                <div className="zickrian-subdetail">
                  <span>Grade: {award.grade}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
