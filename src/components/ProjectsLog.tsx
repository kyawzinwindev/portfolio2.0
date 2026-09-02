"use client";

import React from "react";

interface ProjectItem {
  name: string;
  badge: {
    label: string;
    type: "deployed" | "production";
  };
  description: string;
  architecturePoints: string[];
  stack: string;
}

const projects: ProjectItem[] = [
  {
    name: "CareNest",
    badge: {
      label: "DEPLOYED",
      type: "deployed",
    },
    description: "Clinic appointment management system",
    architecturePoints: [
      "State machine for appointments",
      "4 roles · 23 permissions",
      "Service layer architecture",
      "Polymorphic notifications",
    ],
    stack: "Laravel · Livewire · MySQL · Tailwind",
  },
  {
    name: "Jaraye",
    badge: {
      label: "PRODUCTION",
      type: "production",
    },
    description: "Educational platform dashboard & backend",
    architecturePoints: [
      "Multi-role admin system",
      "Dashboard architecture",
      "Database schema design",
      "User management system",
    ],
    stack: "Laravel · Alpine.js · MySQL · Tailwind",
  },
  {
    name: "Chatbot API",
    badge: {
      label: "DEPLOYED",
      type: "deployed",
    },
    description: "Backend support chatbot system",
    architecturePoints: [
      "REST API design",
      "Auth & session handling",
      "Webhook integration",
      "Response routing logic",
    ],
    stack: "Laravel · PHP · REST APIs · MySQL",
  },
];

export default function ProjectsLog() {
  return (
    <section id="projects" className="py-16 scroll-mt-12">
      <div className="wrapper">
        {/* Section label */}
        <div className="sec-label">{"// 03 — projects.log"}</div>

        {/* 3-card project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-[#111113] border border-[#27272A] hover:border-[#3F3F46] rounded-xl overflow-hidden transition-all duration-200 flex flex-col group"
            >
              {/* Project Card Header */}
              <div className="px-[14px] py-[10px] border-b border-[#1E1E21] flex items-center justify-between">
                <span className="font-mono text-[13px] font-medium text-[#FAFAFA]">
                  {project.name}
                </span>

                {project.badge.type === "deployed" ? (
                  <span className="inline-flex items-center gap-1 bg-[#052010] border border-[#14532D] rounded-[4px] px-2 py-0.5 font-mono text-[9px] text-[#22C55E]">
                    <span className="text-[7px]">●</span> {project.badge.label}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-[#1C1006] border border-[#78350F] rounded-[4px] px-2 py-0.5 font-mono text-[9px] text-[#F59E0B]">
                    <span className="text-[7px]">●</span> {project.badge.label}
                  </span>
                )}
              </div>

              {/* Project Card Body */}
              <div className="p-[14px] flex-1 flex flex-col">
                <div className="font-mono text-[11px] text-[#71717A] mb-[10px]">
                  {project.description}
                </div>

                <ul className="space-y-0.5 mb-3 flex-1">
                  {project.architecturePoints.map((point) => (
                    <li
                      key={point}
                      className="font-mono text-[10px] text-[#52525B] leading-[2.0] flex items-center gap-[6px]"
                    >
                      <span className="text-[#38BDF8] select-none">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="pt-[10px] border-t border-[#1E1E21] font-mono text-[10px] text-[#8B5CF6]">
                  {project.stack}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request Flow Strip */}
        <div className="bg-[#0D0D10] border border-[#1E1E21] rounded-lg p-[10px_14px] flex items-center gap-[6px] flex-wrap">
          <span className="font-mono text-[10px] text-[#3F3F46] mr-1">
            request flow
          </span>
          <span className="font-mono text-[10px] text-[#3F3F46]">·</span>
          <span className="tag tag-dim text-[9px]">HTTP</span>
          <span className="font-mono text-[10px] text-[#3F3F46]">→</span>
          <span className="tag tag-violet text-[9px]">Auth middleware</span>
          <span className="font-mono text-[10px] text-[#3F3F46]">→</span>
          <span className="tag tag-sky text-[9px]">Controller</span>
          <span className="font-mono text-[10px] text-[#3F3F46]">→</span>
          <span className="tag tag-sky text-[9px]">Service</span>
          <span className="font-mono text-[10px] text-[#3F3F46]">→</span>
          <span className="tag tag-green text-[9px]">Model</span>
          <span className="font-mono text-[10px] text-[#3F3F46]">→</span>
          <span className="tag tag-green text-[9px]">Database</span>
          <span className="font-mono text-[10px] text-[#3F3F46]">→</span>
          <span className="tag tag-amber text-[9px]">200 OK</span>
        </div>
      </div>
    </section>
  );
}
