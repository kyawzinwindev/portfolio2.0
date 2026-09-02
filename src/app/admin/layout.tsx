import React from "react";
import AdminSidebar from "./AdminSidebar";
import { getSessionUser } from "@/lib/auth";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Admin Console // KZW OS",
  description: "Secure Administrative System Control Plane for KZW OS",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[#8B5CF6]/30 selection:text-white transition-colors duration-200">
      {/* ── TOP TERMINAL OS CHROME BAR ── */}
      <header className="sticky top-0 z-50 bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-dim)] px-4 md:px-6 py-2.5 flex items-center justify-between">
        {/* OS Window dots & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <Link
            href="/admin/dashboard"
            className="font-mono text-xs text-[var(--text-primary)] hover:text-[var(--violet)] transition-colors flex items-center gap-2"
          >
            <span className="text-[var(--violet)] font-semibold">KZW OS</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-dim)]">ADMIN_CONTROL_PLANE</span>
          </Link>
        </div>

        {/* Right Action Cluster: Theme Toggle, Env Badge & Status */}
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[var(--text-dim)]">
            <span>ENV:</span>
            <span className="text-[var(--amber)]">PRISMA_SQLITE</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--green)]">
            <span className="status-dot" />
            <span className="hidden xs:inline">sys.online</span>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Shell */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-42px)]">
        <AdminSidebar userEmail={user?.email || "kyawzinw469@gmail.com"} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[var(--bg-base)]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
