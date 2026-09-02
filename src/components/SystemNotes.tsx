"use client";

import React, { useState } from "react";

export interface NoteItem {
  id?: string;
  timestamp: string;
  readTime: string;
  tags: string[];
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  isLatest?: boolean;
}

interface SystemNotesProps {
  initialPosts?: NoteItem[];
}

const fallbackNotes: NoteItem[] = [
  {
    timestamp: "2025-01-10T09:32Z",
    readTime: "8 min read",
    tags: ["auth", "laravel", "architecture"],
    title: "Designing role-permission systems in Laravel",
    slug: "designing-role-permission-systems-in-laravel",
    excerpt:
      "How I moved from a simple boolean `is_admin` to a full 23-permission matrix without breaking anything in production. The real challenge wasn't the permissions — it was making it extensible...",
    isLatest: true,
  },
  {
    timestamp: "2024-12-28T14:12Z",
    readTime: "6 min read",
    tags: ["database", "design", "thinking"],
    title: "Thinking beyond CRUD",
    slug: "thinking-beyond-crud",
    excerpt:
      "Most tutorials teach you to build CRUD apps. No one tells you that real systems are about state transitions, not rows. Here's how I started thinking about data differently...",
  },
  {
    timestamp: "2024-11-15T08:00Z",
    readTime: "5 min read",
    tags: ["junior", "mistakes", "lessons"],
    title: "Mistakes I made as a junior backend developer",
    slug: "mistakes-i-made-as-a-junior-backend-developer",
    excerpt:
      "Fat controllers. No service layer. `is_admin = 1`. Hardcoded values everywhere. Here's everything I got wrong in my first year and what I replaced each one with...",
  },
  {
    timestamp: "2024-10-02T08:00Z",
    readTime: "7 min read",
    tags: ["admin", "scalable", "systems"],
    title: "Building scalable admin systems",
    slug: "building-scalable-admin-systems",
    excerpt:
      "What makes an admin dashboard still readable at 10,000 users? What breaks first? Here's how I approached the Jaraye platform dashboard architecture for long-term maintainability...",
  },
];

export default function SystemNotes({ initialPosts }: SystemNotesProps) {
  const notes = initialPosts && initialPosts.length > 0 ? initialPosts : fallbackNotes;
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);

  const renderMarkdownLines = (text?: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-mono text-sm font-semibold text-[#8B5CF6] mt-4 mb-1">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={idx} className="font-mono text-base font-semibold text-[#FAFAFA] mt-5 mb-2 pb-1 border-b border-[#27272A]">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1 key={idx} className="font-mono text-lg font-bold text-[#FAFAFA] mt-6 mb-2">
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 font-mono text-xs text-[#A1A1AA] list-disc">
            {line.replace(/^[-*]\s+/, "")}
          </li>
        );
      }
      if (line.startsWith("```")) {
        return (
          <div key={idx} className="font-mono text-[11px] text-[#71717A] bg-[#09090B] px-2.5 py-1.5 rounded border border-[#1E1E21] my-1">
            {line}
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="font-mono text-xs text-[#D4D4D8] leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <section id="notes" className="py-16 scroll-mt-12">
      <div className="wrapper">
        {/* Section label */}
        <div className="sec-label">{"// 04 — system.notes · build records"}</div>

        {/* Engineering log entries */}
        <div className="border-l border-[#27272A] pl-5 relative space-y-6">
          {notes.map((note, index) => {
            const isLast = index === notes.length - 1;
            const isLatest = note.isLatest || index === 0;

            return (
              <article
                key={note.slug || note.title}
                onClick={() => {
                  if (note.content) setActiveNote(note);
                }}
                className={`relative group ${
                  !isLast ? "pb-6 border-b border-[#1E1E21]" : ""
                } ${note.content ? "cursor-pointer" : ""}`}
              >
                {/* Node dot on timeline */}
                <span
                  className={`absolute -left-[24px] top-[6px] w-2 h-2 rounded-full transition-colors ${
                    isLatest
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
                <h3 className="font-mono text-sm font-medium text-[#FAFAFA] group-hover:text-[#8B5CF6] transition-colors mb-1 leading-[1.4] flex items-center gap-2">
                  <span>{note.title}</span>
                  {note.content && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#8B5CF6]">
                      [read note ↗]
                    </span>
                  )}
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

      {/* Note Reader Modal */}
      {activeNote && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveNote(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#1E1E21] bg-[#09090B] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="font-mono text-[11px] text-[#71717A] ml-2">
                  cat notes/{activeNote.slug || "record"}.md
                </span>
              </div>
              <button
                onClick={() => setActiveNote(null)}
                className="font-mono text-xs text-[#71717A] hover:text-[#FAFAFA]"
              >
                ✕ ESC
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <div className="font-mono text-[10px] text-[#F59E0B] mb-1">
                  {activeNote.timestamp} · {activeNote.readTime}
                </div>
                <h1 className="font-mono text-lg font-bold text-[#FAFAFA]">
                  {activeNote.title}
                </h1>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {activeNote.tags.map((t) => (
                    <span
                      key={t}
                      className="tag tag-dim text-[9px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="divider" />

              <div className="prose prose-invert max-w-none">
                {renderMarkdownLines(activeNote.content || activeNote.excerpt)}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[#1E1E21] bg-[#09090B] flex items-center justify-between font-mono text-[10px] text-[#52525B]">
              <span>KZW OS System Notes Reader</span>
              <button
                onClick={() => setActiveNote(null)}
                className="hover:text-[#FAFAFA]"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
