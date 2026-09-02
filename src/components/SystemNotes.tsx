"use client";

import React from "react";

interface NoteItem {
  timestamp: string;
  readTime: string;
  tags: string[];
  title: string;
  excerpt: string;
  isLatest?: boolean;
}

const notes: NoteItem[] = [
  {
    timestamp: "2025-01-10T09:32Z",
    readTime: "8 min read",
    tags: ["auth", "laravel", "architecture"],
    title: "Designing role-permission systems in Laravel",
    excerpt:
      "How I moved from a simple boolean `is_admin` to a full 23-permission matrix without breaking anything in production. The real challenge wasn't the permissions — it was making it extensible...",
    isLatest: true,
  },
  {
    timestamp: "2024-12-28T14:12Z",
    readTime: "6 min read",
    tags: ["database", "design", "thinking"],
    title: "Thinking beyond CRUD",
    excerpt:
      "Most tutorials teach you to build CRUD apps. No one tells you that real systems are about state transitions, not rows. Here's how I started thinking about data differently...",
  },
  {
    timestamp: "2024-11-15T08:00Z",
    readTime: "5 min read",
    tags: ["junior", "mistakes", "lessons"],
    title: "Mistakes I made as a junior backend developer",
    excerpt:
      "Fat controllers. No service layer. `is_admin = 1`. Hardcoded values everywhere. Here's everything I got wrong in my first year and what I replaced each one with...",
  },
  {
    timestamp: "2024-10-02T08:00Z",
    readTime: "7 min read",
    tags: ["admin", "scalable", "systems"],
    title: "Building scalable admin systems",
    excerpt:
      "What makes an admin dashboard still readable at 10,000 users? What breaks first? Here's how I approached the Jaraye platform dashboard architecture for long-term maintainability...",
  },
];

export default function SystemNotes() {
  return (
    <section id="notes" className="py-16 scroll-mt-12">
      <div className="wrapper">
        {/* Section label */}
        <div className="sec-label">{"// 04 — system.notes · build records"}</div>

        {/* Engineering log entries */}
        <div className="border-l border-[#27272A] pl-5 relative space-y-6">
          {notes.map((note, index) => {
            const isLast = index === notes.length - 1;
            return (
              <article
                key={note.title}
                className={`relative group ${
                  !isLast ? "pb-6 border-b border-[#1E1E21]" : ""
                }`}
              >
                {/* Node dot on timeline */}
                <span
                  className={`absolute -left-[24px] top-[6px] w-2 h-2 rounded-full transition-colors ${
                    note.isLatest
                      ? "bg-[#8B5CF6]"
                      : "bg-[#27272A] group-hover:bg-[#71717A]"
                  }`}
                />

                {/* Metadata line */}
                <div className="font-mono text-[10px] text-[#3F3F46] mb-[5px] flex items-center gap-2 flex-wrap">
                  <span className="text-[#F59E0B]">{note.timestamp}</span>
                  <span>·</span>
                  <span>{note.readTime}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#18181B] border border-[#27272A] rounded-[3px] px-1.5 py-[1px] text-[9px] text-[#71717A] group-hover:text-[#FAFAFA] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Note title */}
                <h3 className="font-mono text-sm font-medium text-[#FAFAFA] group-hover:text-[#8B5CF6] transition-colors mb-1 leading-[1.4]">
                  {note.title}
                </h3>

                {/* Note excerpt */}
                <p className="font-mono text-[11px] text-[#52525B] leading-[1.7]">
                  {note.excerpt}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
