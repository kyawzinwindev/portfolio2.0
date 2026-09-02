import React from "react";
import ChromeHeader from "@/components/ChromeHeader";
import HeroBoot from "@/components/HeroBoot";
import CommandPalette from "@/components/CommandPalette";
import AboutSys from "@/components/AboutSys";
import ProjectsLog from "@/components/ProjectsLog";
import SystemNotes, { NoteItem } from "@/components/SystemNotes";
import ContactEndpoint from "@/components/ContactEndpoint";
import StatusBar from "@/components/StatusBar";
import prisma from "@/lib/prisma";

export const revalidate = 60; // ISR revalidate every 60s or on-demand via server action

export default async function Home() {
  // Fetch published posts and site settings in parallel
  const [dbPosts, dbSettings] = await Promise.all([
    prisma.post
      .findMany({
        where: { isPublished: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      })
      .catch(() => []),
    prisma.siteSetting.findMany().catch(() => []),
  ]);

  // Map settings
  const settingsMap: Record<string, string> = {};
  for (const s of dbSettings) {
    settingsMap[s.key] = s.value;
  }

  const githubUrl = settingsMap.github_url || "https://github.com/kyawzinwin";
  const linkedinUrl =
    settingsMap.linkedin_url || "https://linkedin.com/in/kyawzinwin";
  const contactEmail =
    settingsMap.contact_email || "contact@kyawzinwin.dev";

  // Map DB posts to NoteItem interface
  const formattedPosts: NoteItem[] = dbPosts.map((p, idx) => {
    let parsedTags: string[] = [];
    try {
      parsedTags = JSON.parse(p.tags);
      if (!Array.isArray(parsedTags)) parsedTags = [];
    } catch {
      parsedTags = p.tags ? p.tags.split(",").map((s) => s.trim()) : [];
    }

    const dateToFormat = p.publishedAt || p.createdAt;
    const formattedDate = dateToFormat
      ? new Date(dateToFormat).toISOString().replace(/\.\d{3}Z$/, "Z")
      : "2025-01-01T00:00Z";

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      readTime: p.readingTime,
      tags: parsedTags,
      timestamp: formattedDate,
      isLatest: idx === 0,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      {/* ── CHROME BAR ── */}
      <ChromeHeader />

      {/* Main OS Content Canvas */}
      <main className="flex-1 flex flex-col">
        {/* ── SCREEN 01: BOOT.INIT ── */}
        <HeroBoot />

        {/* ── COMMAND PALETTE QUICK BAR ── */}
        <div className="sticky top-[33px] z-40">
          <CommandPalette
            githubUrl={githubUrl}
            contactEmail={contactEmail}
          />
        </div>

        {/* ── SCREEN 02: ABOUT.SYS ── */}
        <AboutSys />

        <div className="divider" />

        {/* ── SCREEN 03: PROJECTS.LOG ── */}
        <ProjectsLog />

        <div className="divider" />

        {/* ── SCREEN 04: SYSTEM.NOTES ── */}
        <SystemNotes initialPosts={formattedPosts} />

        <div className="divider" />

        {/* ── SCREEN 05: CONTACT.ENDPOINT ── */}
        <ContactEndpoint
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          contactEmail={contactEmail}
        />
      </main>

      {/* ── BOTTOM OPERATIONAL STATUS BAR ── */}
      <StatusBar />
    </div>
  );
}
