import React from "react";
import Link from "next/link";
import { getDashboardStats } from "../actions";

export const revalidate = 0; // Fresh metrics on load

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#1E1E21]">
        <div>
          <div className="font-mono text-[10px] text-[#F59E0B] tracking-wider mb-1 uppercase">
            // Module 01 · SYSTEM_OVERVIEW
          </div>
          <h1 className="font-sans text-2xl font-semibold text-[#FAFAFA] flex items-center gap-2">
            <span>Admin Control Dashboard</span>
            <span className="boot-cursor">_</span>
          </h1>
          <p className="font-mono text-xs text-[#71717A] mt-1">
            Real-time telemetry, publication statuses, visitor metrics, and contact requests.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/posts/new"
            className="btn-primary flex items-center gap-1.5 text-xs py-2 px-3.5 rounded-lg"
          >
            <span>+</span>
            <span>New Post / Note</span>
          </Link>
          <Link
            href="/admin/settings"
            className="bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#FAFAFA] font-mono text-xs py-2 px-3.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>⚙</span>
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* ── METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Visitors */}
        <div className="bg-[#111113] border border-[#27272A] rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#71717A] mb-2 uppercase">
            <span>Traffic Logs</span>
            <span className="text-[#38BDF8]">🛰️</span>
          </div>
          <div className="font-mono text-3xl font-semibold text-[#FAFAFA]">
            {stats.totalVisitors}
          </div>
          <div className="font-mono text-[11px] text-[#71717A] mt-2 flex items-center justify-between">
            <span>Total request logs</span>
            <Link href="/admin/visitors" className="text-[#38BDF8] hover:underline">
              Inspect →
            </Link>
          </div>
        </div>

        {/* Card 2: System Notes / Posts */}
        <div className="bg-[#111113] border border-[#27272A] rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#71717A] mb-2 uppercase">
            <span>System Notes</span>
            <span className="text-[#8B5CF6]">📝</span>
          </div>
          <div className="font-mono text-3xl font-semibold text-[#FAFAFA]">
            {stats.totalPosts}
          </div>
          <div className="font-mono text-[11px] text-[#71717A] mt-2 flex items-center justify-between">
            <span>
              <span className="text-[#22C55E]">{stats.publishedPosts} live</span> ·{" "}
              <span className="text-[#F59E0B]">{stats.draftPosts} draft</span>
            </span>
            <Link href="/admin/posts" className="text-[#8B5CF6] hover:underline">
              Manage →
            </Link>
          </div>
        </div>

        {/* Card 3: Contact Messages */}
        <div className="bg-[#111113] border border-[#27272A] rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#71717A] mb-2 uppercase">
            <span>Contact Messages</span>
            <span className="text-[#F59E0B]">📬</span>
          </div>
          <div className="font-mono text-3xl font-semibold text-[#FAFAFA] flex items-center gap-2">
            <span>{stats.totalMessages}</span>
            {stats.unreadMessages > 0 && (
              <span className="text-xs bg-[#EF4444]/20 border border-[#DC2626]/40 text-[#EF4444] px-2 py-0.5 rounded-full font-mono font-normal">
                {stats.unreadMessages} new
              </span>
            )}
          </div>
          <div className="font-mono text-[11px] text-[#71717A] mt-2 flex items-center justify-between">
            <span>
              {stats.unreadMessages > 0
                ? `${stats.unreadMessages} unread waiting`
                : "All messages caught up"}
            </span>
            <Link href="/admin/messages" className="text-[#F59E0B] hover:underline">
              Inbox →
            </Link>
          </div>
        </div>

        {/* Card 4: Database & Engine */}
        <div className="bg-[#111113] border border-[#27272A] rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#71717A] mb-2 uppercase">
            <span>Backend Engine</span>
            <span className="text-[#22C55E]">⚡</span>
          </div>
          <div className="font-mono text-xl font-semibold text-[#22C55E] flex items-center gap-2">
            <span className="status-dot" />
            <span>Operational</span>
          </div>
          <div className="font-mono text-[11px] text-[#71717A] mt-2 flex items-center justify-between">
            <span>Prisma ORM · SQLite</span>
            <span className="text-[#22C55E]">v6.19</span>
          </div>
        </div>
      </div>

      {/* ── 2-COLUMN SECTION: RECENT TRAFFIC & RECENT MESSAGES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT TRAFFIC STREAM */}
        <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-lg">
          <div className="px-4 py-3 border-b border-[#1E1E21] bg-[#09090B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#38BDF8]">🛰️</span>
              <h2 className="font-mono text-xs font-medium text-[#FAFAFA]">
                Recent Traffic Telemetry
              </h2>
            </div>
            <Link
              href="/admin/visitors"
              className="font-mono text-[11px] text-[#38BDF8] hover:underline"
            >
              View all logs →
            </Link>
          </div>

          <div className="p-4">
            {stats.recentVisitors.length === 0 ? (
              <div className="py-8 text-center font-mono text-xs text-[#71717A]">
                No traffic logged yet. Visit public pages to record logs.
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.recentVisitors.map((v) => (
                  <div
                    key={v.id}
                    className="p-2.5 bg-[#18181B]/70 border border-[#27272A] rounded-lg font-mono text-xs flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[#FAFAFA] font-medium">{v.ipAddress}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#09090B] border border-[#27272A] text-[#38BDF8]">
                          {v.deviceType}
                        </span>
                        <span className="text-[10px] text-[#71717A]">
                          {v.browser} / {v.os}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#52525B] truncate mt-0.5">
                        Path: <span className="text-[#8B5CF6]">{v.visitedPath}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#71717A] shrink-0">
                      {new Date(v.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RECENT CONTACT MESSAGES */}
        <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-lg">
          <div className="px-4 py-3 border-b border-[#1E1E21] bg-[#09090B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#F59E0B]">📬</span>
              <h2 className="font-mono text-xs font-medium text-[#FAFAFA]">
                Latest Contact Form Inquiries
              </h2>
            </div>
            <Link
              href="/admin/messages"
              className="font-mono text-[11px] text-[#F59E0B] hover:underline"
            >
              View inbox →
            </Link>
          </div>

          <div className="p-4">
            {stats.recentMessages.length === 0 ? (
              <div className="py-8 text-center font-mono text-xs text-[#71717A]">
                No messages in the database yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 bg-[#18181B]/70 border border-[#27272A] rounded-lg font-mono text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FAFAFA] font-medium">{msg.name}</span>
                        <span className="text-[#71717A] text-[10px]">
                          ({msg.email})
                        </span>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                          msg.status === "UNREAD"
                            ? "bg-[#EF4444]/10 border-[#DC2626]/40 text-[#EF4444]"
                            : msg.status === "REPLIED"
                            ? "bg-[#22C55E]/10 border-[#16A34A]/40 text-[#22C55E]"
                            : "bg-[#18181B] border-[#27272A] text-[#71717A]"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] line-clamp-2">
                      &quot;{msg.message}&quot;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
