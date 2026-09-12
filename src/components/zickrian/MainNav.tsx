import { useState } from "react";
import { BookIcon, FolderIcon, HomeIcon, ImageIcon, MessageIcon, SettingsIcon } from "./icons";

interface MainNavProps {
  activeSection: string;
  onChat: () => void;
  onSettings: () => void;
}

const navItems = [
  { label: "Home", id: "home", icon: HomeIcon, href: "#home" },
  { label: "Projects", id: "projects", icon: FolderIcon, href: "#projects" },
  { label: "Experience", id: "experience", icon: BookIcon, href: "#experience" },
  { label: "Stack", id: "stack", icon: ImageIcon, href: "#stack" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MainNav({ activeSection, onChat, onSettings }: MainNavProps) {
  return (
    <nav className="zickrian-nav" aria-label="Main Navigation">
      <div className="zickrian-nav-inner">
        {navItems.map(({ label, id, icon: Icon, href }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={href}
              className={isActive ? "is-active" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(id);
              }}
              aria-label={label}
            >
              <Icon width={18} height={18} />
              <span>{label}</span>
            </a>
          );
        })}
        <button type="button" onClick={onChat} aria-label="Chat" title="Chat">
          <MessageIcon width={18} height={18} />
          <span>Chat</span>
        </button>
        <button type="button" onClick={onSettings} aria-label="Settings" title="Settings">
          <SettingsIcon width={18} height={18} />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}
