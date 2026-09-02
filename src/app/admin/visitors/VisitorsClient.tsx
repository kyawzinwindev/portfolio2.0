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
        return "bg-[#0F1F2A] border-[#1A3A4A] text-[#38BDF8]";
      case "tablet":
        return "bg-[#1E1A0A] border-[#3A2E10] text-[#F59E0B]";
      default:
        return "bg-[#1A1628] border-[#3B3063] text-[#8B5CF6]";
    }
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#1E1E21]">
        <div>
          <div className="font-mono text-[10px] text-[#38BDF8] tracking-wider mb-1 uppercase">
            // Module 03 · TRAFFIC_TELEMETRY
          </div>
          <h1 className="font-sans text-2xl font-semibold text-[#FAFAFA] flex items-center gap-2">
            <span>Traffic & Visitor Logs</span>
            <span className="boot-cursor">_</span>
          </h1>
          <p className="font-mono text-xs text-[#71717A] mt-1">
            Real-time IP logs, parsed device types, operating systems, and requested routes.
          </p>
        </div>

        <div className="font-mono text-xs text-[#71717A] bg-[#111113] border border-[#27272A] px-3.5 py-2 rounded-lg">
          Total Logs Recorded:{" "}
          <span className="text-[#38BDF8] font-semibold">{total}</span>
        </div>
      </div>

      {/* ── DEVICE BREAKDOWN STAT PILLS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {deviceCounts.map((dc) => (
          <div
            key={dc.deviceType}
            className="p-3 bg-[#111113] border border-[#27272A] rounded-xl font-mono text-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {dc.deviceType === "Mobile"
                  ? "📱"
                  : dc.deviceType === "Tablet"
                  ? "📟"
                  : "💻"}
              </span>
              <span className="text-[#FAFAFA]">{dc.deviceType}</span>
            </div>
            <span className="text-[#38BDF8] font-medium">
              {dc._count.deviceType}
            </span>
          </div>
        ))}
      </div>

      {/* ── SEARCH BAR ── */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 bg-[#111113] border border-[#27272A] p-3 rounded-xl"
      >
        <span className="font-mono text-xs text-[#8B5CF6] pl-2">$</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter traffic by IP address, path (/), browser, or OS..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#FAFAFA] placeholder:text-[#3F3F46]"
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
            className="font-mono text-xs text-[#71717A] hover:text-[#FAFAFA] px-2"
          >
            Clear
          </button>
        )}
      </form>

      {/* ── LOGS TABLE ── */}
      <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-xl">
        {initialLogs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="font-mono text-3xl mb-3">🛰️</div>
            <div className="font-mono text-sm text-[#FAFAFA] font-medium">
              No traffic logs found
            </div>
            <p className="font-mono text-xs text-[#71717A] mt-1 max-w-sm mx-auto">
              Visit the public portfolio or clear filters to populate real-time visitor records.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#09090B] border-b border-[#1E1E21] text-[#71717A] text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Device Type</th>
                  <th className="px-4 py-3">Browser / Platform</th>
                  <th className="px-4 py-3">OS</th>
                  <th className="px-4 py-3">Visited Path</th>
                  <th className="px-4 py-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E21]">
                {initialLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-[#18181B]/40 transition-colors"
                  >
                    {/* IP */}
                    <td className="px-4 py-3 font-medium text-[#FAFAFA]">
                      {log.ipAddress}
                    </td>

                    {/* Device Badge */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border ${getDeviceBadge(
                          log.deviceType
                        )}`}
                      >
                        {log.deviceType}
                      </span>
                    </td>

                    {/* Browser */}
                    <td className="px-4 py-3 text-[#A1A1AA]">{log.browser}</td>

                    {/* OS */}
                    <td className="px-4 py-3 text-[#71717A]">{log.os}</td>

                    {/* Path */}
                    <td className="px-4 py-3">
                      <span className="text-[#38BDF8] bg-[#09090B] px-1.5 py-0.5 rounded border border-[#1E1E21]">
                        {log.visitedPath}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="px-4 py-3 text-right text-[#71717A] text-[11px] whitespace-nowrap">
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
          <div className="px-4 py-3 border-t border-[#1E1E21] bg-[#09090B] flex items-center justify-between font-mono text-xs">
            <span className="text-[#71717A]">
              Page <span className="text-[#FAFAFA]">{page}</span> of{" "}
              <span className="text-[#FAFAFA]">{totalPages}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-3 py-1 rounded bg-[#18181B] disabled:opacity-30 hover:bg-[#27272A] border border-[#27272A] text-[#FAFAFA] transition-colors cursor-pointer"
              >
                ← Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1 rounded bg-[#18181B] disabled:opacity-30 hover:bg-[#27272A] border border-[#27272A] text-[#FAFAFA] transition-colors cursor-pointer"
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
