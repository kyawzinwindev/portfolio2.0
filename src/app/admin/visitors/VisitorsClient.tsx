"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface VisitorLogItem {
  id: string;
  ipAddress: string;
  userAgent: string;
  deviceType: string;
  browser: string;
  os: string;
  visitedPath: string;
  createdAt: Date;
}

interface DeviceCount {
  deviceType: string;
  _count: {
    deviceType: number;
  };
}

export default function VisitorsClient({
  initialLogs,
  total,
  page,
  totalPages,
  deviceCounts,
}: {
  initialLogs: VisitorLogItem[];
  total: number;
  page: number;
  totalPages: number;
  deviceCounts: DeviceCount[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    params.set("page", "1");
    router.push(`/admin/visitors?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/visitors?${params.toString()}`);
  };

  const getDeviceBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "mobile":
        return "bg-[var(--sky)]/10 border-[var(--sky)]/30 text-[var(--sky)]";
      case "tablet":
        return "bg-[var(--amber)]/10 border-[var(--amber)]/30 text-[var(--amber)]";
      default:
        return "bg-[var(--violet)]/10 border-[var(--violet)]/30 text-[var(--violet)]";
    }
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border-dim)]">
        <div>
          <div className="font-mono text-[10px] text-[var(--sky)] tracking-wider mb-1 uppercase">
            // Module 03 · TRAFFIC_TELEMETRY
          </div>
          <h1 className="font-sans text-2xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <span>Traffic & Visitor Logs</span>
            <span className="boot-cursor">_</span>
          </h1>
          <p className="font-mono text-xs text-[var(--text-dim)] mt-1">
            Real-time IP logs, parsed device types, operating systems, and requested routes.
          </p>
        </div>

        <div className="font-mono text-xs text-[var(--text-dim)] bg-[var(--bg-surface)] border border-[var(--border)] px-3.5 py-2 rounded-lg shadow-xs">
          Total Logs Recorded:{" "}
          <span className="text-[var(--sky)] font-semibold">{total}</span>
        </div>
      </div>

      {/* ── DEVICE BREAKDOWN STAT PILLS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {deviceCounts.map((dc) => (
          <div
            key={dc.deviceType}
            className="p-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl font-mono text-xs flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {dc.deviceType === "Mobile"
                  ? "📱"
                  : dc.deviceType === "Tablet"
                  ? "📟"
                  : "💻"}
              </span>
              <span className="text-[var(--text-primary)]">{dc.deviceType}</span>
            </div>
            <span className="text-[var(--sky)] font-medium">
              {dc._count.deviceType}
            </span>
          </div>
        ))}
      </div>

      {/* ── SEARCH BAR ── */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border)] p-3 rounded-xl shadow-xs"
      >
        <span className="font-mono text-xs text-[var(--violet)] pl-2">$</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter traffic by IP address, path (/), browser, or OS..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
        />
        <button
          type="submit"
          className="btn-primary text-xs py-1.5 px-3 rounded-md cursor-pointer"
        >
          Search
        </button>
        {currentSearch && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              router.push("/admin/visitors");
            }}
            className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-primary)] px-2"
          >
            Clear
          </button>
        )}
      </form>

      {/* ── LOGS TABLE ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl">
        {initialLogs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="font-mono text-3xl mb-3">🛰️</div>
            <div className="font-mono text-sm text-[var(--text-primary)] font-medium">
              No traffic logs found
            </div>
            <p className="font-mono text-xs text-[var(--text-dim)] mt-1 max-w-sm mx-auto">
              Visit the public portfolio or clear filters to populate real-time visitor records.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-dim)] text-[var(--text-dim)] text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Device Type</th>
                  <th className="px-4 py-3">Browser / Platform</th>
                  <th className="px-4 py-3">OS</th>
                  <th className="px-4 py-3">Visited Path</th>
                  <th className="px-4 py-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-dim)]">
                {initialLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    {/* IP */}
                    <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                      {log.ipAddress}
                    </td>

                    {/* Device Badge */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border font-mono ${getDeviceBadge(
                          log.deviceType
                        )}`}
                      >
                        {log.deviceType}
                      </span>
                    </td>

                    {/* Browser */}
                    <td className="px-4 py-3 text-[var(--text-dim)]">{log.browser}</td>

                    {/* OS */}
                    <td className="px-4 py-3 text-[var(--text-muted)]">{log.os}</td>

                    {/* Path */}
                    <td className="px-4 py-3">
                      <span className="text-[var(--sky)] bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                        {log.visitedPath}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="px-4 py-3 text-right text-[var(--text-dim)] text-[11px] whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-dim)]">
              Page <span className="text-[var(--text-primary)] font-medium">{page}</span> of{" "}
              <span className="text-[var(--text-primary)] font-medium">{totalPages}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-3 py-1 rounded bg-[var(--bg-surface)] disabled:opacity-30 hover:bg-[var(--bg-hover)] border border-[var(--border)] text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                ← Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1 rounded bg-[var(--bg-surface)] disabled:opacity-30 hover:bg-[var(--bg-hover)] border border-[var(--border)] text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
