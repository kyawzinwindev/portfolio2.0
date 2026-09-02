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
    <section id="projects" className="py-16 scroll-mt-12 transition-colors duration-200">
      <div className="wrapper">
        {/* Section label */}
        <div className="sec-label">{"// 03 — projects.log"}</div>

        {/* 3-card project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--text-muted)] rounded-xl overflow-hidden transition-all duration-200 flex flex-col group shadow-xs"
            >
              {/* Project Card Header */}
              <div className="px-[14px] py-[10px] border-b border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between">
                <span className="font-mono text-[13px] font-medium text-[var(--text-primary)]">
                  {project.name}
                </span>

                {project.badge.type === "deployed" ? (
                  <span className="inline-flex items-center gap-1 bg-[var(--green-bg)] border border-[var(--green-bdr)] rounded-[4px] px-2 py-0.5 font-mono text-[9px] text-[var(--green)]">
                    <span className="text-[7px]">●</span> {project.badge.label}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-[var(--amber-bg)] border border-[var(--amber-bdr)] rounded-[4px] px-2 py-0.5 font-mono text-[9px] text-[var(--amber)]">
                    <span className="text-[7px]">●</span> {project.badge.label}
                  </span>
                )}
              </div>

              {/* Project Card Body */}
              <div className="p-[14px] flex-1 flex flex-col">
                <div className="font-mono text-[11px] text-[var(--text-dim)] mb-[10px]">
                  {project.description}
                </div>

                <ul className="space-y-0.5 mb-3 flex-1">
                  {project.architecturePoints.map((point) => (
                    <li
                      key={point}
                      className="font-mono text-[10px] text-[var(--text-dim)] leading-[2.0] flex items-center gap-[6px]"
                    >
                      <span className="text-[var(--sky)] select-none">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="pt-[10px] border-t border-[var(--border-dim)] font-mono text-[10px] text-[var(--violet)]">
                  {project.stack}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request Flow Strip */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg p-[10px_14px] flex items-center gap-[6px] flex-wrap shadow-xs">
          <span className="font-mono text-[10px] text-[var(--text-muted)] mr-1">
            request flow
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">·</span>
          <span className="tag tag-dim text-[9px]">HTTP</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">→</span>
          <span className="tag tag-violet text-[9px]">Auth middleware</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">→</span>
          <span className="tag tag-sky text-[9px]">Controller</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">→</span>
          <span className="tag tag-sky text-[9px]">Service</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">→</span>
          <span className="tag tag-green text-[9px]">Model</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">→</span>
          <span className="tag tag-green text-[9px]">Database</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">→</span>
          <span className="tag tag-amber text-[9px]">200 OK</span>
        </div>
      </div>
    </section>
  );
}
