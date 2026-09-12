import React from "react";
import { ArrowUpRightIcon } from "./icons";
import SectionTitle from "./SectionTitle";
import type { Certification } from "./types";

const certifications: Certification[] = [
  {
    title: "IT Specialist Artificial Intelligence",
    issuer: "Certiport",
    date: "2025",
    href: "https://bevansatria.my.id",
  },
];

const CertIcon = () => (
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
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="m14 14.5 2 4.5-3-1.5-3 1.5 2-4.5" />
    <path d="M7 10a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
  </svg>
);

export default function CertificationsSection() {
  return (
    <section id="certs" className="zickrian-section zickrian-certifications">
      <SectionTitle count={String(certifications.length)}>Certifications</SectionTitle>
      <div className="zickrian-proj-list">
        {certifications.map((item) => (
          <a
            key={item.title}
            className="zickrian-proj-item"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="zickrian-proj-left">
              <div className="zickrian-proj-icon">
                <CertIcon />
              </div>
            </div>
            <div className="zickrian-proj-content">
              <p className="zickrian-proj-title">{item.title}</p>
              <div className="zickrian-proj-meta">
                <span>@{item.issuer}</span>
                <span className="zickrian-meta-sep" aria-hidden="true" />
                <time>{item.date}</time>
              </div>
            </div>
            <ArrowUpRightIcon width={16} height={16} className="zickrian-proj-arrow" />
          </a>
        ))}
      </div>
    </section>
  );
}
