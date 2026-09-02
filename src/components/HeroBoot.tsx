"use client";

import React from "react";

interface HeroBootProps {
  onOpenPalette?: () => void;
}

export default function HeroBoot({ onOpenPalette }: HeroBootProps) {
  const triggerPalette = () => {
    if (onOpenPalette) {
      onOpenPalette();
    } else {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", metaKey: true })
      );
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-42px)] flex flex-col justify-center py-20 grid-bg border-b border-[#1E1E21]">
      <div className="wrapper relative z-10">
        {/* System eyebrow */}
        <div className="font-mono text-[11px] text-[#3F3F46] mb-5 tracking-wide">
          {"// system init · 2025 · v1.0.0"}
        </div>

        {/* Display title */}
        <h1 className="font-sans text-4xl sm:text-[42px] font-medium tracking-[-0.03em] text-[#FAFAFA] leading-[1.1] mb-[6px]">
          KZW <span className="boot-cursor">_</span>
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-[13px] text-[#71717A] mb-8">
          Backend engineer · System thinker · Myanmar
        </p>

        {/* Terminal block */}
        <div className="bg-[#111113] border border-[#27272A] rounded-xl p-5 max-w-[500px] mb-8 shadow-xl shadow-black/40">
          <div className="font-mono text-xs leading-[2.2] flex items-center gap-2 flex-wrap">
            <span className="text-[#3F3F46] select-none">$</span>
            <span className="text-[#22C55E]">init</span>
            <span className="text-[#71717A]">
              --role &quot;backend engineer&quot; --mode &quot;system thinker&quot;
            </span>
          </div>

          <div className="font-mono text-xs leading-[2.2] flex items-center gap-2 flex-wrap">
            <span className="text-[#3F3F46] select-none">$</span>
            <span className="text-[#22C55E]">loading modules</span>
            <span className="inline-block text-[#F59E0B] tracking-[-2px] select-none">
              ████████████
            </span>
            <span className="text-[#71717A]">100%</span>
          </div>

          <div className="font-mono text-xs leading-[2.2] flex items-center gap-2 flex-wrap">
            <span className="text-[#3F3F46] select-none">$</span>
            <span className="text-[#38BDF8]">ready</span>
            <span className="text-[#71717A]">· press</span>
            <button
              onClick={triggerPalette}
              className="kbd cursor-pointer hover:border-[#8B5CF6] transition-colors"
              title="Click to open command palette"
            >
              ⌘K
            </button>
            <span className="text-[#71717A]">to navigate or scroll ↓</span>
          </div>
        </div>

        {/* Command hint button */}
        <div
          onClick={triggerPalette}
          className="inline-flex items-center gap-2 bg-[#111113] border border-[#27272A] hover:border-[#3F3F46] hover:bg-[#18181B] rounded-lg py-[7px] px-[14px] font-mono text-xs text-[#71717A] hover:text-[#FAFAFA] cursor-pointer transition-all duration-150"
        >
          <span className="kbd text-[11px] text-[#A1A1AA]">⌘K</span>
          <span>open command palette</span>
        </div>
      </div>
    </section>
  );
}
