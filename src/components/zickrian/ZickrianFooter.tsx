import React, { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "./icons";

const contactLinks = [
  { label: "GitHub", href: "https://github.com/Vanszs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bevantyo-satria-pinandhita/" },
  { label: "Discord", href: "https://discord.com" },
  { label: "Medium", href: "https://medium.com" },
  { label: "Email", href: "mailto:admin@bevansatria.my.id" },
  { label: "Hugging Face", href: "https://huggingface.co" },
];

const indexLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
];

export default function ZickrianFooter() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute UTC+7 Jakarta time
  let timeString = "4:30 PM";
  let hourAngle = 135;
  let minuteAngle = 180;
  let secondAngle = 0;

  if (now) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      minute: "2-digit",
      second: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const h = parseInt(parts.find((p) => p.type === "hour")?.value || "16", 10);
    const m = parseInt(parts.find((p) => p.type === "minute")?.value || "30", 10);
    const s = parseInt(parts.find((p) => p.type === "second")?.value || "0", 10);

    const displayFormat = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    timeString = displayFormat.format(now);

    hourAngle = ((h % 12) + m / 60 + s / 3600) * 30;
    minuteAngle = (m + s / 60) * 6;
    secondAngle = s * 6;
  }

  return (
    <footer className="zickrian-footer">
      <div className="zickrian-footer-inner">
        {/* Banner with video & poster */}
        <div role="region" aria-label="Footer ASCII landscape banner" className="zickrian-footer-banner">
          <img
            src="/images/zickrian/ascii-footer-poster.webp"
            alt=""
            className="zickrian-footer-poster"
          />
          <video
            src="/images/zickrian/ascii-footer.webm"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="zickrian-footer-video"
          />
          <div className="zickrian-footer-vignette" aria-hidden="true" />
          <div className="zickrian-footer-banner-content">
            <h2>Building the future with data, AI, and code.</h2>
            <p>Exploring practical machine learning systems, data products, and full-stack software.</p>
            <div className="zickrian-banner-cta-wrap">
              <a
                href="mailto:admin@bevansatria.my.id"
                className="zickrian-white-cta"
              >
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Footer info */}
        <div className="zickrian-footer-grid">
          {/* Column 1: Signature, Braille, Clock & Globe */}
          <div className="zickrian-footer-col-meta">
            <div>
              <p className="zickrian-footer-sig">© 2026 Bevantyo Satria Pinandhita</p>
              <p className="footer-braille" aria-hidden="true">⠃⠑⠧⠁⠝</p>
            </div>
            <div className="zickrian-footer-stamps">
              <div className="footer-stamp">
                <svg className="footer-clock" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" aria-hidden="true">
                  <circle className="footer-clock-ring" cx="16" cy="16" r="14.5" />
                  <path className="footer-clock-ticks" d="M16 3.5v2M28.5 16h-2M16 28.5v-2M3.5 16h2" />
                  <line className="footer-clock-hour" x1="16" y1="16" x2="16" y2="9.5" transform={`rotate(${hourAngle} 16 16)`} />
                  <line className="footer-clock-minute" x1="16" y1="16" x2="16" y2="6.75" transform={`rotate(${minuteAngle} 16 16)`} />
                  <line className="footer-clock-second" x1="16" y1="17.5" x2="16" y2="5.5" transform={`rotate(${secondAngle} 16 16)`} />
                  <circle className="footer-clock-pin" cx="16" cy="16" r="1" />
                </svg>
                <span className="footer-stamp-lines">
                  <span>UTC+7</span>
                  <time aria-label={`Current local time in Indonesia: ${timeString}`}>{timeString}</time>
                </span>
              </div>
              <div className="footer-stamp" aria-hidden="true">
                <svg className="footer-globe" viewBox="0 0 20 20" width="22" height="22" fill="none" stroke="currentColor">
                  <circle cx="10" cy="10" r="9" />
                  <ellipse cx="10" cy="10" rx="4" ry="9" />
                  <path d="M1 10h18M1.9 6h16.2M1.9 14h16.2" />
                </svg>
                <span className="footer-stamp-lines">
                  <span>Asia/Jakarta</span>
                  <span>Indonesia</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Contact tree */}
          <div className="footer-tree">
            <h2 className="footer-label">Contact</h2>
            <ul>
              {contactLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                    {label}
                    <ArrowUpRightIcon width={14} height={14} className="zickrian-tree-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Index tree */}
          <div className="footer-tree">
            <h2 className="footer-label">Index</h2>
            <ul>
              {indexLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="zickrian-footer-bottom-spacer" />
      </div>
    </footer>
  );
}
