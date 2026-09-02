"use client";

import React, { useState } from "react";
import { updateSiteSettings, changeAdminPassword } from "../actions";

interface SettingsMap {
  [key: string]: string;
}

export default function SettingsClient({
  initialSettings,
  userEmail,
}: {
  initialSettings: SettingsMap;
  userEmail: string;
}) {
  // Site Links State
  const [githubUrl, setGithubUrl] = useState(
    initialSettings.github_url || "https://github.com/kyawzinwin"
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    initialSettings.linkedin_url || "https://linkedin.com/in/kyawzinwin"
  );
  const [contactEmail, setContactEmail] = useState(
    initialSettings.contact_email || "contact@kyawzinwin.dev"
  );
  const [siteTitle, setSiteTitle] = useState(
    initialSettings.site_title || "Kyaw Zin Win — Backend Engineer | KZW OS"
  );
  const [siteTagline, setSiteTagline] = useState(
    initialSettings.site_tagline || "Full Stack engineer · System thinker · Myanmar"
  );

  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // Change Password State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSuccess(null);
    setSettingsError(null);

    try {
      const res = await updateSiteSettings({
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        contact_email: contactEmail,
        site_title: siteTitle,
        site_tagline: siteTagline,
      });

      if (res.success) {
        setSettingsSuccess("Site configuration saved to database successfully!");
      }
    } catch {
      setSettingsError("Failed to update site settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassSuccess(null);
    setPassError(null);

    if (newPass !== confirmPass) {
      setPassError("New password and confirmation do not match.");
      return;
    }

    if (newPass.length < 6) {
      setPassError("New password must be at least 6 characters long.");
      return;
    }

    setIsChangingPass(true);

    try {
      const res = await changeAdminPassword({
        currentPass,
        newPass,
      });

      if (res.error) {
        setPassError(res.error);
      } else {
        setPassSuccess("Admin password updated successfully! Keep it safe.");
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      }
    } catch {
      setPassError("Failed to update password. Please try again.");
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="pb-4 border-b border-[var(--border-dim)]">
        <div className="font-mono text-[10px] text-[var(--text-dim)] tracking-wider mb-1 uppercase">
          // Module 05 · SYSTEM_CONFIGURATION
        </div>
        <h1 className="font-sans text-2xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span>Settings & Security Access</span>
          <span className="boot-cursor">_</span>
        </h1>
        <p className="font-mono text-xs text-[var(--text-dim)] mt-1">
          Dynamically configure public links, metadata parameters, and manage administrative credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── SECTION 1: DYNAMIC SITE LINKS & CONFIG ── */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl">
          <div className="px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[var(--violet)]">⚙</span>
              <h2 className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                Dynamic Site Links & Info
              </h2>
            </div>
            <span className="font-mono text-[10px] text-[var(--green)]">live sync</span>
          </div>

          <form onSubmit={handleSaveSettings} className="p-5 space-y-4">
            {settingsSuccess && (
              <div className="p-3 rounded-lg bg-[var(--green)]/10 border border-[var(--green)]/40 text-[var(--green)] font-mono text-xs flex items-center gap-2">
                <span>✓</span>
                <span>{settingsSuccess}</span>
              </div>
            )}
            {settingsError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-500 font-mono text-xs flex items-center gap-2">
                <span>⚠</span>
                <span>{settingsError}</span>
              </div>
            )}

            {/* GitHub URL */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> settings.github_url
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                required
                placeholder="https://github.com/kyawzinwin"
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--violet)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--sky)] outline-none"
              />
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> settings.linkedin_url
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                required
                placeholder="https://linkedin.com/in/kyawzinwin"
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--violet)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--sky)] outline-none"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> settings.contact_email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                placeholder="contact@kyawzinwin.dev"
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--violet)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--green)] outline-none"
              />
            </div>

            {/* Site Title */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> settings.site_title
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--violet)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-primary)] outline-none"
              />
            </div>

            {/* Site Tagline */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> settings.site_tagline
              </label>
              <input
                type="text"
                value={siteTagline}
                onChange={(e) => setSiteTagline(e.target.value)}
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--violet)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-primary)] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSavingSettings}
              className="btn-primary w-full py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isSavingSettings ? (
                <>
                  <span className="status-dot !bg-white" />
                  <span>Saving Configuration...</span>
                </>
              ) : (
                <span>Save Site Settings →</span>
              )}
            </button>
          </form>
        </div>

        {/* ── SECTION 2: CHANGE ADMIN PASSWORD ── */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl">
          <div className="px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[var(--amber)]">🔒</span>
              <h2 className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                Change Admin Password
              </h2>
            </div>
            <span className="font-mono text-[10px] text-[var(--amber)]">bcrypt hashing</span>
          </div>

          <form onSubmit={handleChangePassword} className="p-5 space-y-4">
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-dim)] rounded-lg font-mono text-xs text-[var(--text-dim)]">
              Account: <span className="text-[var(--text-primary)] font-medium">{userEmail}</span>
            </div>

            {passSuccess && (
              <div className="p-3 rounded-lg bg-[var(--green)]/10 border border-[var(--green)]/40 text-[var(--green)] font-mono text-xs flex items-center gap-2">
                <span>✓</span>
                <span>{passSuccess}</span>
              </div>
            )}
            {passError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-500 font-mono text-xs flex items-center gap-2">
                <span>⚠</span>
                <span>{passError}</span>
              </div>
            )}

            {/* Current Password */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> auth.current_password *
              </label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                required
                placeholder="Enter existing password..."
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--amber)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-primary)] outline-none"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> auth.new_password (min 6 chars) *
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                placeholder="Enter new strong password..."
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--amber)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-primary)] outline-none"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-primary)] mb-1">
                <span className="text-[var(--violet)]">$</span> auth.confirm_new_password *
              </label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
                placeholder="Re-enter new password..."
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--amber)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-primary)] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isChangingPass}
              className="w-full py-2.5 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-xs"
            >
              {isChangingPass ? (
                <>
                  <span className="status-dot !bg-white" />
                  <span>Re-hashing with bcrypt...</span>
                </>
              ) : (
                <span>Update Password →</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
