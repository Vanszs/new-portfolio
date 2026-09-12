"use client";

import React, { useEffect, useState } from "react";
import ContactModal from "./components/ContactModal";
import ContributionsSection from "./components/zickrian/ContributionsSection";
import ExperienceList from "./components/zickrian/ExperienceList";
import MainNav from "./components/zickrian/MainNav";
import ProfileHeader from "./components/zickrian/ProfileHeader";
import ProjectsList from "./components/zickrian/ProjectsList";
import StackSection from "./components/zickrian/StackSection";
import AwardsSection from "./components/zickrian/AwardsSection";
import PublicationsSection from "./components/zickrian/PublicationsSection";
import CertificationsSection from "./components/zickrian/CertificationsSection";
import ZickrianFooter from "./components/zickrian/ZickrianFooter";
import SectionTitle from "./components/zickrian/SectionTitle";
import type { ZickrianExperience, ZickrianProject } from "./components/zickrian/types";

import type { Project, Service, SocialLink, Testimonial } from "./types";

interface HeroData {
  headline: string;
  subtitle: string;
  imageUrl: string;
  tagline: string;
}

interface ExperienceData {
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

interface BlogData {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  description: string;
}

export interface AboutData {
  bio: string;
  bioSecond: string | null;
  milestones: { number: string; label: string }[];
  publications: { title: string; desc?: string }[];
  principles: { title: string; desc: string }[];
  coreSkills: string[];
  certifications: string[];
}

export interface FooterData {
  brandText: string;
  socialLinks: SocialLink[];
  copyrightText: string;
}

export interface AppData {
  hero: HeroData | null;
  services: Service[];
  experiences: ExperienceData[];
  projects: Project[];
  blogs: BlogData[];
  testimonials: Testimonial[];
  about: AboutData | null;
  footer: FooterData | null;
}

interface AppProps {
  data: AppData;
}

const fallbackProjects: ZickrianProject[] = [
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
].map(([id, title, year]) => ({ id, title, year, category: "AI / Full-stack", description: "", tags: [], image: null }));

export default function App({ data }: AppProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const sections = ["home", "experience", "projects", "blog", "gallery", "stack"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences: ZickrianExperience[] = [];
  const projects: ZickrianProject[] = fallbackProjects;

  const openChat = () => {
    setIsSettingsOpen(false);
    setPreselectedService("");
    setIsContactOpen(true);
  };

  useEffect(() => {
    if (!isSettingsOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSettingsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSettingsOpen]);

  return <div className="public-site"><a className="skip-link" href="#main">Skip to content</a><main id="main"><div className="zickrian-shell" id="home"><ProfileHeader /><MainNav activeSection={activeSection} onChat={openChat} onSettings={() => setIsSettingsOpen((value) => !value)} />{isSettingsOpen && <div className="zickrian-settings" role="dialog" aria-label="Settings"><button type="button">EN</button><button type="button">ID</button><button type="button" onClick={() => setIsSettingsOpen(false)} aria-label="Close settings">×</button></div>}<div className="zickrian-content"><p className="zickrian-intro">A few chapters of building, learning, and turning technical curiosity into useful systems.</p><ExperienceList experiences={experiences} /><ProjectsList projects={projects} /><StackSection /><ContributionsSection /><AwardsSection /><PublicationsSection /><CertificationsSection /></div></div></main><ZickrianFooter /><ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} preselectedService={preselectedService} /></div>;
}
