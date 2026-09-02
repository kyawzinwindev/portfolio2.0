"use client";

import React, { useState, useEffect, useRef } from "react";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  category: "Navigation" | "Action" | "External";
  badge?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    {
      id: "about",
      label: "about.sys",
      description: "Identity, bio, stack manifest & git timeline",
      category: "Navigation",
      badge: "02",
      action: () => {
        const el = document.getElementById("about");
        el?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "projects",
      label: "projects.log",
      description: "Architecture case studies & system reports (CareNest, Jaraye, Chatbot)",
      category: "Navigation",
      badge: "03",
      action: () => {
        const el = document.getElementById("projects");
        el?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "notes",
      label: "system.notes",
      description: "Engineering journal, build records & technical writing",
      category: "Navigation",
      badge: "04",
      action: () => {
        const el = document.getElementById("notes");
        el?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "contact",
      label: "contact.endpoint",
      description: "POST request interface & contact parameters",
      category: "Navigation",
      badge: "05",
      action: () => {
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "github",
      label: "github.com/kyawzinwin",
      description: "Open GitHub profile in new tab",
      category: "External",
      badge: "git",
      action: () => {
        window.open("https://github.com", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "copy-email",
      label: "copy: email address",
      description: "Copy contact email to clipboard",
      category: "Action",
      badge: "exec",
      action: () => {
        navigator.clipboard.writeText("contact@kyawzinwin.dev");
        alert("Copied contact@kyawzinwin.dev to clipboard!");
        setIsOpen(false);
      },
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const openPalette = () => {
    setQuery("");
    setSelectedIndex(0);
    setIsOpen(true);
  };

  const closePalette = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Sticky Quick Nav Bar */}
      <div className="bg-[#111113] border-t border-b border-[#1E1E21] py-[10px]">
        <div className="wrapper">
          <div className="flex flex-col sm:flex-row sm:items-center gap-[10px]">
            <div
              onClick={openPalette}
              className="flex-1 flex items-center gap-[10px] cursor-pointer group"
            >
              <span className="font-mono text-[11px] text-[#8B5CF6] group-hover:text-[#A78BFA] transition-colors font-medium">
                ⌘K
              </span>
              <div className="flex-1 bg-[#09090B] border border-[#27272A] group-hover:border-[#3F3F46] rounded-[8px] py-[7px] px-3 flex items-center gap-2 transition-all">
                <span className="font-mono text-[13px] text-[#3F3F46]">/</span>
                <span className="font-mono text-[11px] text-[#3F3F46] truncate group-hover:text-[#71717A] transition-colors">
                  type a command — about.sys · projects.log · system.notes · contact.endpoint
                </span>
              </div>
            </div>

            <nav className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" aria-label="Quick navigation">
              <a
                href="#about"
                className="font-mono text-[11px] text-[#3F3F46] hover:text-[#FAFAFA] hover:bg-[#18181B] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
              >
                about.sys
              </a>
              <a
                href="#projects"
                className="font-mono text-[11px] text-[#3F3F46] hover:text-[#FAFAFA] hover:bg-[#18181B] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
              >
                projects.log
              </a>
              <a
                href="#notes"
                className="font-mono text-[11px] text-[#3F3F46] hover:text-[#FAFAFA] hover:bg-[#18181B] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
              >
                system.notes
              </a>
              <a
                href="#contact"
                className="font-mono text-[11px] text-[#3F3F46] hover:text-[#FAFAFA] hover:bg-[#18181B] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
              >
                contact.endpoint
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Command Palette Modal Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1E1E21] bg-[#09090B]">
              <span className="font-mono text-[#8B5CF6] text-xs font-semibold">⌘K</span>
              <span className="font-mono text-[#3F3F46] text-sm">/</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNavigation}
                placeholder="Type a command or jump to system module..."
                className="w-full bg-transparent border-none outline-none font-mono text-xs text-[#FAFAFA] placeholder:text-[#3F3F46]"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="kbd text-[10px] text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-[#71717A]">
                  No matching system commands found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => item.action()}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`px-3 py-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[#18181B] border border-[#3F3F46]"
                            : "border border-transparent hover:bg-[#18181B]/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`font-mono text-xs ${
                              isSelected ? "text-[#8B5CF6]" : "text-[#71717A]"
                            }`}
                          >
                            $
                          </span>
                          <div className="min-w-0">
                            <div className="font-mono text-xs font-medium text-[#FAFAFA] flex items-center gap-2">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#09090B] text-[#F59E0B] border border-[#27272A] font-mono">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-[#71717A] truncate mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-mono text-[9px] text-[#52525B] uppercase tracking-wider">
                            {item.category}
                          </span>
                          {isSelected && (
                            <span className="font-mono text-[10px] text-[#22C55E]">↵</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Tips */}
            <div className="px-4 py-2 border-t border-[#1E1E21] bg-[#09090B] flex items-center justify-between font-mono text-[10px] text-[#52525B]">
              <div className="flex items-center gap-2">
                <span>Use <kbd className="text-[#A1A1AA]">↑</kbd> <kbd className="text-[#A1A1AA]">↓</kbd> to navigate</span>
                <span>·</span>
                <span><kbd className="text-[#A1A1AA]">↵</kbd> to select</span>
              </div>
              <div>KZW OS Terminal</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
