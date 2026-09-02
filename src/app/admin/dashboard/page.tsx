import React from "react";
import Link from "next/link";
import { getDashboardStats } from "../actions";

export const revalidate = 0; // Fresh metrics on load

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[var(--border-dim)]">
        <div>
          <div className="font-mono text-[10px] text-[var(--amber)] tracking-wider mb-1 uppercase">
            // Module 01 · SYSTEM_OVERVIEW
          </div>
          <h1 className="font-sans text-2xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <span>Admin Control Dashboard</span>
            <span className="boot-cursor">_</span>
          </h1>
          <p className="font-mono text-xs text-[var(--text-dim)] mt-1">
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
            className="bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-xs py-2 px-3.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>⚙</span>
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* ── METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Visitors */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)] mb-2 uppercase">
            <span>Traffic Logs</span>
            <span className="text-[var(--sky)]">🛰️</span>
          </div>
          <div className="font-mono text-3xl font-semibold text-[var(--text-primary)]">
            {stats.totalVisitors}
          </div>
          <div className="font-mono text-[11px] text-[var(--text-dim)] mt-2 flex items-center justify-between">
            <span>Total request logs</span>
            <Link href="/admin/visitors" className="text-[var(--sky)] hover:underline font-medium">
              Inspect →
            </Link>
          </div>
        </div>

        {/* Card 2: System Notes / Posts */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)] mb-2 uppercase">
            <span>System Notes</span>
            <span className="text-[var(--violet)]">📝</span>
          </div>
          <div className="font-mono text-3xl font-semibold text-[var(--text-primary)]">
            {stats.totalPosts}
          </div>
          <div className="font-mono text-[11px] text-[var(--text-dim)] mt-2 flex items-center justify-between">
            <span>
              <span className="text-[var(--green)]">{stats.publishedPosts} live</span> ·{" "}
              <span className="text-[var(--amber)]">{stats.draftPosts} draft</span>
            </span>
            <Link href="/admin/posts" className="text-[var(--violet)] hover:underline font-medium">
              Manage →
            </Link>
          </div>
        </div>

        {/* Card 3: Contact Messages */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)] mb-2 uppercase">
            <span>Contact Messages</span>
            <span className="text-[var(--amber)]">📬</span>
          </div>
          <div className="font-mono text-3xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <span>{stats.totalMessages}</span>
            {stats.unreadMessages > 0 && (
              <span className="text-xs bg-red-500/10 border border-red-500/40 text-red-500 px-2 py-0.5 rounded-full font-mono font-normal">
                {stats.unreadMessages} new
              </span>
            )}
          </div>
          <div className="font-mono text-[11px] text-[var(--text-dim)] mt-2 flex items-center justify-between">
            <span>
              {stats.unreadMessages > 0
                ? `${stats.unreadMessages} unread waiting`
                : "All messages caught up"}
            </span>
            <Link href="/admin/messages" className="text-[var(--amber)] hover:underline font-medium">
              Inbox →
            </Link>
          </div>
        </div>

        {/* Card 4: Database & Engine */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)] mb-2 uppercase">
            <span>Backend Engine</span>
            <span className="text-[var(--green)]">⚡</span>
          </div>
          <div className="font-mono text-xl font-semibold text-[var(--green)] flex items-center gap-2">
            <span className="status-dot" />
            <span>Operational</span>
          </div>
          <div className="font-mono text-[11px] text-[var(--text-dim)] mt-2 flex items-center justify-between">
            <span>Prisma ORM · SQLite</span>
            <span className="text-[var(--green)] font-medium">v6.19</span>
          </div>
        </div>
      </div>

      {/* ── 2-COLUMN SECTION: RECENT TRAFFIC & RECENT MESSAGES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT TRAFFIC STREAM */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg">
          <div className="px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[var(--sky)]">🛰️</span>
              <h2 className="font-mono text-xs font-medium text-[var(--text-primary)]">
                Recent Traffic Telemetry
              </h2>
            </div>
            <Link
              href="/admin/visitors"
              className="font-mono text-[11px] text-[var(--sky)] hover:underline"
            >
              View all logs →
            </Link>
          </div>

          <div className="p-4">
            {stats.recentVisitors.length === 0 ? (
              <div className="py-8 text-center font-mono text-xs text-[var(--text-dim)]">
                No traffic logged yet. Visit public pages to record logs.
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.recentVisitors.map((v) => (
                  <div
                    key={v.id}
                    className="p-2.5 bg-[var(--bg-elevated)]/60 border border-[var(--border-dim)] rounded-lg font-mono text-xs flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[var(--text-primary)] font-medium">{v.ipAddress}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--sky)]">
                          {v.deviceType}
                        </span>
                        <span className="text-[10px] text-[var(--text-dim)]">
                          {v.browser} / {v.os}
                        </span>
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                        Path: <span className="text-[var(--violet)]">{v.visitedPath}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-[var(--text-dim)] shrink-0">
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
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg">
          <div className="px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[var(--amber)]">📬</span>
              <h2 className="font-mono text-xs font-medium text-[var(--text-primary)]">
                Latest Contact Form Inquiries
              </h2>
            </div>
            <Link
              href="/admin/messages"
              className="font-mono text-[11px] text-[var(--amber)] hover:underline"
            >
              View inbox →
            </Link>
          </div>

          <div className="p-4">
            {stats.recentMessages.length === 0 ? (
              <div className="py-8 text-center font-mono text-xs text-[var(--text-dim)]">
                No messages in the database yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 bg-[var(--bg-elevated)]/60 border border-[var(--border-dim)] rounded-lg font-mono text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--text-primary)] font-medium">{msg.name}</span>
                        <span className="text-[var(--text-dim)] text-[10px]">
                          ({msg.email})
                        </span>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                          msg.status === "UNREAD"
                            ? "bg-red-500/10 border-red-500/40 text-red-500"
                            : msg.status === "REPLIED"
                            ? "bg-[var(--green)]/10 border-[var(--green)]/40 text-[var(--green)]"
                            : "bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-dim)]"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-dim)] line-clamp-2">
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
