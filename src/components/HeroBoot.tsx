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
    <section className="relative min-h-[calc(100vh-42px)] flex flex-col justify-center py-20 grid-bg border-b border-[var(--border-dim)] transition-colors duration-200">
      <div className="wrapper relative z-10">
        {/* System eyebrow */}
        <div className="font-mono text-[11px] text-[var(--amber)] mb-5 tracking-wide">
          {"// system init · 2026 · v1.0.0"}
        </div>

        {/* Display title */}
        <h1 className="font-sans text-4xl sm:text-[42px] font-medium tracking-[-0.03em] text-[var(--text-primary)] leading-[1.1] mb-[6px]">
          KYAW ZIN WIN <span className="boot-cursor">_</span>
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-[13px] text-[var(--text-dim)] mb-8">
          Full Stack engineer · System thinker · Myanmar
        </p>

        {/* Terminal block */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-5 max-w-[500px] mb-8 shadow-xl shadow-black/10">
          <div className="font-mono text-xs leading-[2.2] flex items-center gap-2 flex-wrap">
            <span className="text-[var(--text-muted)] select-none">$</span>
            <span className="text-[var(--green)]">init</span>
            <span className="text-[var(--text-dim)]">
              --role &quot;full stack engineer&quot; --mode &quot;system thinker&quot;
            </span>
          </div>

          <div className="font-mono text-xs leading-[2.2] flex items-center gap-2 flex-wrap">
            <span className="text-[var(--text-muted)] select-none">$</span>
            <span className="text-[var(--green)]">loading modules</span>
            <span className="inline-block text-[var(--amber)] tracking-[-2px] select-none">
              ████████████
            </span>
            <span className="text-[var(--text-dim)]">100%</span>
          </div>

          <div className="font-mono text-xs leading-[2.2] flex items-center gap-2 flex-wrap">
            <span className="text-[var(--text-muted)] select-none">$</span>
            <span className="text-[var(--sky)]">ready</span>
            <span className="text-[var(--text-dim)]">· press</span>
            <button
              onClick={triggerPalette}
              className="kbd cursor-pointer hover:border-[var(--violet)] hover:text-[var(--violet)] transition-colors"
              title="Click to open command palette"
            >
              ⌘K
            </button>
            <span className="text-[var(--text-dim)]">to navigate or scroll ↓</span>
          </div>
        </div>

        {/* Command hint button */}
        <div
          onClick={triggerPalette}
          className="inline-flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-hover)] rounded-lg py-[7px] px-[14px] font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-primary)] cursor-pointer transition-all duration-150 shadow-xs"
        >
          <span className="kbd text-[11px] text-[var(--text-dim)]">⌘K</span>
          <span>open command palette</span>
        </div>
      </div>
    </section>
  );
}
