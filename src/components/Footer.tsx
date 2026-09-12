import React from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";

interface FooterProps {
  onContactClick: () => void;
  data?: { brandText?: string; socialLinks?: { platform: string; url: string }[]; copyrightText?: string };
}

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
];

export default function Footer({ onContactClick, data }: FooterProps) {
  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => { event.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <footer className="bg-[#0e0f0e] px-5 py-14 md:px-10 md:py-20"><div className="mx-auto max-w-6xl"><div className="grid grid-cols-1 gap-12 border-b border-[#2b302b] pb-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-16"><div><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center border border-[#d96a46] font-mono text-xs text-[#d96a46]">B/</span><span className="font-display text-base font-semibold text-[#ededed]">Bevan<span className="text-[#d96a46]">.</span></span></div><p className="mt-6 max-w-sm text-sm leading-7 text-[#9ca39b]">{data?.brandText || "Building end-to-end AI, full-stack, blockchain, and autonomous systems for teams with real constraints."}</p></div><nav aria-label="Footer navigation"><h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#d96a46]">Navigate</h2><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">{links.map((link) => <a key={link.href} href={link.href} onClick={(event) => scrollTo(event, link.href.slice(1))} className="text-sm text-[#9ca39b] hover:text-[#ededed]">{link.label}</a>)}</div></nav><div><h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#d96a46]">Contact</h2><button type="button" onClick={onContactClick} className="mt-5 inline-flex items-center gap-2 border-b border-[#9ca39b] pb-1 text-sm text-[#ededed] hover:border-[#d96a46] hover:text-[#d96a46]">Open contact form <ArrowUpRight size={14} /></button>{data?.socialLinks && data.socialLinks.length > 0 && <div className="mt-6 flex flex-wrap gap-4">{data.socialLinks.filter((link) => link.url).map((link) => <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9ca39b] hover:text-[#ededed]">{link.platform}</a>)}</div>}</div></div><div className="flex flex-col gap-5 pt-7 text-xs text-[#9ca39b] sm:flex-row sm:items-center sm:justify-between"><span>{data?.copyrightText || `© ${new Date().getFullYear()} Bevan. All rights reserved.`}</span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.12em] hover:text-[#ededed] sm:self-auto">Back to top <ArrowUp size={14} /></button></div></div></footer>
  );
}
