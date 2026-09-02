"use client";

import React from "react";

export default function AboutSys() {
  return (
    <section id="about" className="py-16 scroll-mt-12">
      <div className="wrapper">
        {/* Section label */}
        <div className="sec-label">{"// 02 — about.sys"}</div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_0.9fr] gap-8 md:gap-6">
          {/* Column 1: Bio (README.md) */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[10px] text-[#3F3F46] tracking-[0.06em] mb-[14px]">
              README.md
            </h3>
            <h2 className="font-sans text-xl font-medium tracking-[-0.02em] text-[#FAFAFA] mb-1">
              Kyaw Zin Win
            </h2>
            <div className="font-mono text-[11px] text-[#22C55E] mb-4 flex items-center gap-[6px]">
              <span className="status-dot" />
              <span>Junior → Mid Backend Engineer</span>
            </div>
            <div className="font-mono text-[11px] text-[#71717A] leading-[2.0] space-y-0.5">
              <div>Former: Airyno · 2024–2025</div>
              <div>Currently: NCC Bachelor Computing</div>
              <div className="pt-2 text-[#3F3F46]">
                <div>{"// Not a framework user."}</div>
                <div>{"// A system designer."}</div>
                <div>{"// Thinking about what happens at scale."}</div>
              </div>
            </div>
          </div>

          {/* Column 2: Stack Manifest */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[10px] text-[#3F3F46] tracking-[0.06em] mb-[14px]">
              stack.manifest
            </h3>
            <div className="flex flex-wrap gap-[6px] mb-4">
              <span className="tag tag-violet">Laravel</span>
              <span className="tag tag-sky">Livewire</span>
              <span className="tag tag-sky">Alpine.js</span>
              <span className="tag tag-green">Tailwind CSS</span>
              <span className="tag tag-amber">MySQL</span>
              <span className="tag tag-dim">PHP</span>
              <span className="tag tag-sky">React.js</span>
              <span className="tag tag-amber">REST APIs</span>
              <span className="tag tag-dim">Git / GitHub</span>
              <span className="tag tag-dim">Next.js</span>
            </div>
            <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-[10px_12px] mt-auto">
              <div className="font-mono text-[10px] text-[#71717A] mb-1">
                Primary stack
              </div>
              <div className="font-mono text-[11px] text-[#8B5CF6] font-medium">
                Tailwind · Alpine · Laravel · Livewire
              </div>
            </div>
          </div>

          {/* Column 3: Timeline (git log --timeline) */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[10px] text-[#3F3F46] tracking-[0.06em] mb-[14px]">
              git log --timeline
            </h3>
            <div className="border-l border-[#27272A] pl-[14px] relative space-y-4">
              {/* Item 1 */}
              <div className="relative">
                <span className="absolute -left-[18px] top-[5px] w-[7px] h-[7px] rounded-full bg-[#8B5CF6]" />
                <div className="font-mono text-[10px] text-[#3F3F46] mb-0.5">
                  2024–2025
                </div>
                <div className="font-mono text-xs font-medium text-[#FAFAFA] mb-px">
                  Airyno · Jr Backend Dev
                </div>
                <div className="font-mono text-[10px] text-[#71717A]">
                  CareNest · Jaraye · Chatbot
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative">
                <span className="absolute -left-[18px] top-[5px] w-[7px] h-[7px] rounded-full bg-[#27272A]" />
                <div className="font-mono text-[10px] text-[#3F3F46] mb-0.5">
                  2025–now
                </div>
                <div className="font-mono text-xs font-medium text-[#71717A] mb-px">
                  NCC Bachelor Computing
                </div>
                <div className="font-mono text-[10px] text-[#71717A]">
                  Deepening CS fundamentals
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative">
                <span className="absolute -left-[18px] top-[5px] w-[7px] h-[7px] rounded-full bg-[#09090B] border border-dashed border-[#8B5CF6]" />
                <div className="font-mono text-[10px] text-[#3F3F46] mb-0.5">
                  next
                </div>
                <div className="font-mono text-xs font-medium text-[#8B5CF6] mb-px">
                  Mid-level backend engineer
                </div>
                <div className="font-mono text-[10px] text-[#71717A]">
                  In progress...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
