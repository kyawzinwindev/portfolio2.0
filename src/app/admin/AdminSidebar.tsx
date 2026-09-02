"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface AdminNavProps {
  userEmail?: string;
}

export default function AdminSidebar({ userEmail = "kyawzinw469@gmail.com" }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();
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
      badgeColor: "text-[#22C55E] border-[#166534] bg-[#052e16]/40",
    },
    {
      href: "/admin/posts",
      label: "02 // system.notes",
      icon: "📝",
      badge: "CRUD",
      badgeColor: "text-[#8B5CF6] border-[#3B3063] bg-[#1A1628]",
    },
    {
      href: "/admin/visitors",
      label: "03 // traffic.logs",
      icon: "🛰️",
      badge: "analytics",
      badgeColor: "text-[#38BDF8] border-[#1A3A4A] bg-[#0F1F2A]",
    },
    {
      href: "/admin/messages",
      label: "04 // messages.inbox",
      icon: "📬",
      badge: "contact",
      badgeColor: "text-[#F59E0B] border-[#3A2E10] bg-[#1E1A0A]",
    },
    {
      href: "/admin/settings",
      label: "05 // sys.settings",
      icon: "⚙️",
      badge: "auth & links",
      badgeColor: "text-[#71717A] border-[#27272A] bg-[#18181B]",
    },
  ];

  const handleLogout = async () => {
    if (confirm("Terminate admin session?")) {
      setIsLoggingOut(true);
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      } catch {
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <aside className="w-full md:w-64 bg-[#111113] border-r border-[#1E1E21] flex flex-col shrink-0 min-h-[calc(100vh-42px)]">
      {/* OS Session Profile Block */}
      <div className="p-4 border-b border-[#1E1E21]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-[#71717A] tracking-wider uppercase">
            Admin Auth Active
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#22C55E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            ROOT
          </span>
        </div>
        <div className="font-mono text-xs font-medium text-[#FAFAFA] truncate" title={userEmail}>
          {userEmail}
        </div>
        <div className="font-mono text-[10px] text-[#52525B] mt-0.5">
          Session: HMAC-SHA256
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1.5 flex-1" aria-label="Admin console navigation">
        <div className="px-2 py-1 font-mono text-[10px] text-[#3F3F46] tracking-wider uppercase">
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
                  ? "bg-[#18181B] text-[#FAFAFA] border border-[#3F3F46] shadow-sm"
                  : "text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B]/50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-sm opacity-80">{item.icon}</span>
                <span
                  className={`truncate ${
                    isActive ? "text-[#8B5CF6] font-medium" : "group-hover:text-[#FAFAFA]"
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
      <div className="p-3 border-t border-[#1E1E21] space-y-2 bg-[#09090B]/60">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] font-mono text-xs text-[#FAFAFA] transition-colors"
        >
          <span>🌐</span>
          <span>View Public Site ↗</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#18181B] hover:bg-[#7F1D1D]/20 border border-[#27272A] hover:border-[#DC2626]/50 font-mono text-xs text-[#EF4444] transition-colors cursor-pointer"
        >
          <span>⏻</span>
          <span>{isLoggingOut ? "Terminating..." : "Terminate Session"}</span>
        </button>
      </div>
    </aside>
  );
}
