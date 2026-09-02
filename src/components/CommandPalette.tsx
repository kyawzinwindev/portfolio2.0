"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  category: "Navigation" | "Action" | "External" | "Admin";
  badge?: string;
  action: () => void;
}

interface CommandPaletteProps {
  githubUrl?: string;
  contactEmail?: string;
}

export default function CommandPalette({
  githubUrl = "https://github.com/kyawzinwin",
  contactEmail = "contact@kyawzinwin.dev",
}: CommandPaletteProps) {
  const router = useRouter();
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
      id: "admin",
      label: "admin.console",
      description: "Access backend administrative control plane & CRUD operations",
      category: "Admin",
      badge: "root",
      action: () => {
        router.push("/admin/dashboard");
        setIsOpen(false);
      },
    },
    {
      id: "github",
      label: `github: ${githubUrl.replace(/^https?:\/\//, "")}`,
      description: "Open GitHub profile in new tab",
      category: "External",
      badge: "git",
      action: () => {
        window.open(githubUrl, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "copy-email",
      label: `copy: ${contactEmail}`,
      description: "Copy contact email to clipboard",
      category: "Action",
      badge: "exec",
      action: () => {
        navigator.clipboard.writeText(contactEmail);
        alert(`Copied ${contactEmail} to clipboard!`);
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
      <div className="bg-[var(--bg-surface)] border-t border-b border-[var(--border-dim)] py-[10px] transition-colors duration-200">
        <div className="wrapper">
          <div className="flex flex-col sm:flex-row sm:items-center gap-[10px]">
            <div
              onClick={openPalette}
              className="flex-1 flex items-center gap-[10px] cursor-pointer group"
            >
              <span className="font-mono text-[11px] text-[var(--violet)] group-hover:opacity-80 transition-opacity font-medium">
                ⌘K
              </span>
              <div className="flex-1 bg-[var(--bg-base)] border border-[var(--border)] group-hover:border-[var(--text-muted)] rounded-[8px] py-[7px] px-3 flex items-center gap-2 transition-all">
                <span className="font-mono text-[13px] text-[var(--text-muted)]">/</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)] truncate group-hover:text-[var(--text-dim)] transition-colors">
                  type a command — about.sys · projects.log · system.notes · contact.endpoint · admin
                </span>
              </div>
            </div>

            <nav className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" aria-label="Quick navigation">
              <a
                href="#about"
                className="font-mono text-[11px] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
              >
                about.sys
              </a>
              <a
                href="#projects"
                className="font-mono text-[11px] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
              >
                projects.log
              </a>
              <a
                href="#notes"
                className="font-mono text-[11px] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
              >
                system.notes
              </a>
              <a
                href="#contact"
                className="font-mono text-[11px] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] py-1 px-[10px] rounded-[4px] transition-colors whitespace-nowrap"
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
            className="w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)]">
              <span className="font-mono text-[var(--violet)] text-xs font-semibold">⌘K</span>
              <span className="font-mono text-[var(--text-muted)] text-sm">/</span>
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
                className="w-full bg-transparent border-none outline-none font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="kbd text-[10px] text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-[var(--text-dim)]">
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
                            ? "bg-[var(--bg-elevated)] border border-[var(--border)] font-medium"
                            : "border border-transparent hover:bg-[var(--bg-hover)]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`font-mono text-xs ${
                              isSelected ? "text-[var(--violet)]" : "text-[var(--text-dim)]"
                            }`}
                          >
                            $
                          </span>
                          <div className="min-w-0">
                            <div className="font-mono text-xs font-medium text-[var(--text-primary)] flex items-center gap-2">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--bg-base)] text-[var(--amber)] border border-[var(--border)] font-mono">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-[var(--text-dim)] truncate mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
                            {item.category}
                          </span>
                          {isSelected && (
                            <span className="font-mono text-[10px] text-[var(--green)]">↵</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Tips */}
            <div className="px-4 py-2 border-t border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)]">
              <div className="flex items-center gap-2">
                <span>Use <kbd className="text-[var(--text-primary)]">↑</kbd> <kbd className="text-[var(--text-primary)]">↓</kbd> to navigate</span>
                <span>·</span>
                <span><kbd className="text-[var(--text-primary)]">↵</kbd> to select</span>
              </div>
              <div>KZW OS Terminal</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
