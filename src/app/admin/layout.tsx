import React from "react";
import AdminSidebar from "./AdminSidebar";
import { getSessionUser } from "@/lib/auth";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans selection:bg-[#8B5CF6]/30 selection:text-white">
      {/* ── TOP TERMINAL OS CHROME BAR ── */}
      <header className="sticky top-0 z-50 bg-[#09090B]/90 backdrop-blur-md border-b border-[#1E1E21] px-4 md:px-6 py-2.5 flex items-center justify-between">
        {/* OS Window dots & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <Link
            href="/admin/dashboard"
            className="font-mono text-xs text-[#FAFAFA] hover:text-[#8B5CF6] transition-colors flex items-center gap-2"
          >
            <span className="text-[#8B5CF6] font-semibold">KZW OS</span>
            <span className="text-[#3F3F46]">/</span>
            <span className="text-[#71717A]">ADMIN_CONTROL_PLANE</span>
          </Link>
        </div>

        {/* System Online Badge & Host */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#71717A]">
            <span>ENV:</span>
            <span className="text-[#F59E0B]">PRISMA_SQLITE</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-[#22C55E]">
            <span className="status-dot" />
            <span>sys.online</span>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Shell */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-42px)]">
        <AdminSidebar userEmail={user?.email || "kyawzinw469@gmail.com"} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#09090B]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
