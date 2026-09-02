"use client";

import React from "react";

export default function StatusBar() {
  return (
    <footer className="sticky bottom-0 z-50 bg-[#111113]/90 backdrop-blur-md border-t border-[#1E1E21] px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
      {/* Left OS identifier */}
      <span className="font-mono text-[10px] text-[#3F3F46] select-none">
        KZW OS · v1.0.0
      </span>

      {/* Center Nav Anchors */}
      <nav className="flex items-center gap-5" aria-label="System status bar navigation">
        <a
          href="#about"
          className="font-mono text-[10px] text-[#3F3F46] hover:text-[#71717A] transition-colors"
        >
          about.sys
        </a>
        <a
          href="#projects"
          className="font-mono text-[10px] text-[#3F3F46] hover:text-[#71717A] transition-colors"
        >
          projects.log
        </a>
        <a
          href="#notes"
          className="font-mono text-[10px] text-[#3F3F46] hover:text-[#71717A] transition-colors"
        >
          system.notes
        </a>
        <a
          href="#contact"
          className="font-mono text-[10px] text-[#3F3F46] hover:text-[#71717A] transition-colors"
        >
          contact.endpoint
        </a>
      </nav>

      {/* Right Operational Status */}
      <div className="flex items-center gap-[5px] font-mono text-[10px] text-[#22C55E]">
        <span className="status-dot" />
        <span>all systems operational</span>
      </div>
    </footer>
  );
}
