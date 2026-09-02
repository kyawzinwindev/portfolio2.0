"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavProps {
  userEmail?: string;
}

export default function AdminSidebar({ userEmail = "kyawzinw469@gmail.com" }: AdminNavProps) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // If on login page, do not show admin sidebar/chrome
  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "01 // dashboard",
      icon: "⚡",
      badge: "live",
      badgeColor: "text-[var(--green)] border-[var(--green)]/30 bg-[var(--green)]/10",
    },
    {
      href: "/admin/posts",
      label: "02 // system.notes",
      icon: "📝",
      badge: "CRUD",
      badgeColor: "text-[var(--violet)] border-[var(--violet)]/30 bg-[var(--violet)]/10",
    },
    {
      href: "/admin/visitors",
      label: "03 // traffic.logs",
      icon: "🛰️",
      badge: "analytics",
      badgeColor: "text-[var(--sky)] border-[var(--sky)]/30 bg-[var(--sky)]/10",
    },
    {
      href: "/admin/messages",
      label: "04 // messages.inbox",
      icon: "📬",
      badge: "contact",
      badgeColor: "text-[var(--amber)] border-[var(--amber)]/30 bg-[var(--amber)]/10",
    },
    {
      href: "/admin/settings",
      label: "05 // sys.settings",
      icon: "⚙️",
      badge: "auth & links",
      badgeColor: "text-[var(--text-dim)] border-[var(--border)] bg-[var(--bg-elevated)]",
    },
  ];

  const handleLogout = async () => {
    if (confirm("Terminate admin session and exit control plane?")) {
      setIsLoggingOut(true);
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        // Continue with redirect even if network glitch occurs
      }
      // Force navigation to login page
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="w-full md:w-64 bg-[var(--bg-surface)] border-r border-[var(--border-dim)] flex flex-col shrink-0 min-h-[calc(100vh-42px)] transition-colors duration-200">
      {/* OS Session Profile Block */}
      <div className="p-4 border-b border-[var(--border-dim)]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-[var(--text-dim)] tracking-wider uppercase">
            Admin Auth Active
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-[var(--green)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            ROOT
          </span>
        </div>
        <div className="font-mono text-xs font-medium text-[var(--text-primary)] truncate" title={userEmail}>
          {userEmail}
        </div>
        <div className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
          Session: HMAC-SHA256
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1.5 flex-1" aria-label="Admin console navigation">
        <div className="px-2 py-1 font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
          Modules
        </div>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-mono text-xs transition-all duration-150 group ${
                isActive
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] shadow-sm font-medium"
                  : "text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-sm opacity-80">{item.icon}</span>
                <span
                  className={`truncate ${
                    isActive ? "text-[var(--violet)] font-medium" : "group-hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded border font-mono ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Public Link & Logout Block */}
      <div className="p-3 border-t border-[var(--border-dim)] space-y-2 bg-[var(--bg-elevated)]/40">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border)] font-mono text-xs text-[var(--text-primary)] transition-colors shadow-xs"
        >
          <span>🌐</span>
          <span>View Public Site ↗</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[var(--bg-surface)] hover:bg-red-500/10 border border-[var(--border)] hover:border-red-500/40 font-mono text-xs text-red-500 transition-colors cursor-pointer"
        >
          <span>⏻</span>
          <span>{isLoggingOut ? "Terminating..." : "Terminate Session"}</span>
        </button>
      </div>
    </aside>
  );
}
