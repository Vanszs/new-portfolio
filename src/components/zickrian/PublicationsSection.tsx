import React from "react";
import { ArrowUpRightIcon, BookIcon } from "./icons";
import SectionTitle from "./SectionTitle";
import type { Publication } from "./types";

const publications: Publication[] = [
  {
    title: "Food Optimizing for Patients with Kidney Failure Using Evolution Strategies Algorithm",
    journal: "Research publication",
    date: "2025",
    href: "https://bevansatria.my.id"
  },
  {
    title: "Optimizing Chicken Feed Using Evolution Strategies Algorithm",
    journal: "Research publication",
    date: "2025",
    href: "https://bevansatria.my.id"
  },
  {
    title: "Exploring the Potential of Hybrid Whale Optimization Algorithm: A Literature Review",
    journal: "Research publication",
    date: "2025",
    href: "https://bevansatria.my.id"
  },
];

export default function PublicationsSection() {
  return (
    <section id="publications" className="zickrian-section zickrian-publications">
      <SectionTitle count={String(publications.length)}>Publications</SectionTitle>
      <div className="zickrian-pub-list">
        {publications.map((item) => (
          <a
            key={item.title}
            className="zickrian-pub-item"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="zickrian-pub-left">
              <div className="zickrian-pub-icon">
                <BookIcon width={14} height={14} />
              </div>
            </div>
            <div className="zickrian-pub-content">
              <h3>{item.title}</h3>
              <div className="zickrian-pub-meta">
                <span>@{item.journal}</span>
                <span className="zickrian-meta-sep" aria-hidden="true" />
                <time>{item.date}</time>
              </div>
            </div>
            <ArrowUpRightIcon width={16} height={16} className="zickrian-pub-arrow" />
          </a>
        ))}
      </div>
    </section>
  );
}
