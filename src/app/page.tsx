import React from "react";
import ChromeHeader from "@/components/ChromeHeader";
import HeroBoot from "@/components/HeroBoot";
import CommandPalette from "@/components/CommandPalette";
import AboutSys from "@/components/AboutSys";
import ProjectsLog from "@/components/ProjectsLog";
import SystemNotes from "@/components/SystemNotes";
import ContactEndpoint from "@/components/ContactEndpoint";
import StatusBar from "@/components/StatusBar";

export default function Home() {
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
          <CommandPalette />
        </div>

        {/* ── SCREEN 02: ABOUT.SYS ── */}
        <AboutSys />

        <div className="divider" />

        {/* ── SCREEN 03: PROJECTS.LOG ── */}
        <ProjectsLog />

        <div className="divider" />

        {/* ── SCREEN 04: SYSTEM.NOTES ── */}
        <SystemNotes />

        <div className="divider" />

        {/* ── SCREEN 05: CONTACT.ENDPOINT ── */}
        <ContactEndpoint />
      </main>

      {/* ── BOTTOM OPERATIONAL STATUS BAR ── */}
      <StatusBar />
    </div>
  );
}
