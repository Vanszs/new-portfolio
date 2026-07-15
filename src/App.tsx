"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TickerBar from "./components/TickerBar";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogsSection from "./components/BlogsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactModal from "./components/ContactModal";
import Footer from "./components/Footer";

interface AppData {
  hero: any;
  services: any[];
  projects: any[];
  blogs: any[];
  testimonials: any[];
  about: any;
  footer: any;
}

interface AppProps {
  data: AppData;
}

export default function App({ data }: AppProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "about", "projects", "blogs", "testimonials"];
      const scrollPosition = window.scrollY + 200; // Offset for accuracy

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openContactWithService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle === "All Services" ? "" : serviceTitle);
    setIsContactOpen(true);
  };

  const handleHireMeClick = () => {
    setPreselectedService("");
    setIsContactOpen(true);
  };

  const handlePortfolioClick = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-orange selection:text-white">
      {/* Sticky top navigation bar */}
      <Header 
        onContactClick={() => setIsContactOpen(true)} 
        activeSection={activeSection} 
      />

      {/* Main sections layout */}
      <main>
        {/* Hero Section */}
        <HeroSection
          data={data.hero}
          onHireClick={handleHireMeClick}
          onPortfolioClick={handlePortfolioClick}
        />

        {/* Black Ticker scrolling marquee */}
        <TickerBar />

        {/* Services accordion section */}
        <ServicesSection data={data.services} onServiceActionClick={openContactWithService} />

        {/* About milestones and details */}
        <AboutSection data={data.about} />

        {/* Portfolio / Selected Projects showcase */}
        <ProjectsSection data={data.projects} onProjectInquire={openContactWithService} />

        {/* Blogs / insights publication cards */}
        <BlogsSection data={data.blogs} />

        {/* Testimonials and client feedback cards */}
        <TestimonialsSection data={data.testimonials} />
      </main>

      {/* Footer component */}
      <Footer data={data.footer} onContactClick={() => setIsContactOpen(true)} />

      {/* Inquire/Hire slide-out Contact Modal */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        preselectedService={preselectedService} 
      />
    </div>
  );
}
