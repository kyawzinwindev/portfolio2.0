"use client";

import React from "react";

export default function StatusBar() {
  return (
    <footer className="sticky bottom-0 z-50 bg-[var(--bg-surface)]/90 backdrop-blur-md border-t border-[var(--border-dim)] px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 transition-colors duration-200">
      {/* Left OS identifier */}
      <span className="font-mono text-[10px] text-[var(--text-muted)] select-none">
        KZW OS · v1.0.0
      </span>

      {/* Center Nav Anchors */}
      <nav className="flex items-center gap-5" aria-label="System status bar navigation">
        <a
          href="#about"
          className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          about.sys
        </a>
        <a
          href="#projects"
          className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          projects.log
        </a>
        <a
          href="#notes"
          className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          system.notes
        </a>
        <a
          href="#contact"
          className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          contact.endpoint
        </a>
      </nav>

      {/* Right Operational Status */}
      <div className="flex items-center gap-[5px] font-mono text-[10px] text-[var(--green)]">
        <span className="status-dot" />
        <span>all systems operational</span>
      </div>
    </footer>
  );
}
