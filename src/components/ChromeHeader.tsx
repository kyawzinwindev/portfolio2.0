"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function ChromeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-base)]/85 backdrop-blur-md border-b border-[var(--border-dim)] px-4 sm:px-6 py-2 flex items-center justify-between transition-colors">
      {/* OS Window dots */}
      <div className="flex items-center gap-[6px]" aria-hidden="true">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity cursor-pointer" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity cursor-pointer" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity cursor-pointer" />
      </div>

      {/* Domain center title */}
      <span className="font-mono text-[11px] text-[var(--text-dim)] tracking-normal select-none">
        kyawzinwin.dev
      </span>

      {/* Right side: Theme Toggle & Online Status */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="flex items-center gap-[6px] font-mono text-[11px] text-[var(--green)]">
          <span className="status-dot" />
          <span className="hidden xs:inline">online</span>
        </div>
      </div>
    </header>
  );
}
