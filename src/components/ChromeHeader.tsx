"use client";

import React from "react";

export default function ChromeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#09090B]/85 backdrop-blur-md border-b border-[#1E1E21] px-6 py-2 flex items-center justify-between transition-colors">
      {/* OS Window dots */}
      <div className="flex items-center gap-[6px]" aria-hidden="true">
        <div className="w-2 h-2 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity cursor-pointer" />
        <div className="w-2 h-2 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity cursor-pointer" />
        <div className="w-2 h-2 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity cursor-pointer" />
      </div>

      {/* Domain center title */}
      <span className="font-mono text-[11px] text-[#71717A] tracking-normal select-none">
        kyawzinwin.dev
      </span>

      {/* System online status */}
      <div className="flex items-center gap-[6px] font-mono text-[11px] text-[#22C55E]">
        <span className="status-dot" />
        <span>online</span>
      </div>
    </header>
  );
}
