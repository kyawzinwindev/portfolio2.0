"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prevent bfcache or back navigation from displaying stale login form when authenticated
  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace("/admin/dashboard");
          }
        }
      } catch {
        // Silently ignore network failure on background check
      }
    };

    checkActiveSession();

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        checkActiveSession();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Authentication failed. Invalid credentials.");
        setIsLoading(false);
        return;
      }

      // Success -> replace history entry with admin dashboard so login is not kept in history stack
      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Network or connection error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Terminal OS Frame */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl shadow-black/20">
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="font-mono text-[11px] text-[var(--text-dim)] ml-2">
                auth.session // login.sh
              </span>
            </div>
            <ThemeToggle showLabel={false} />
          </div>

          {/* Terminal Body */}
          <div className="p-6">
            <div className="mb-6">
              <div className="font-mono text-[10px] text-[var(--text-muted)] mb-1">
                {"// SECURE ACCESS GATEWAY"}
              </div>
              <h1 className="font-mono text-xl font-medium text-[var(--text-primary)] flex items-center gap-2">
                <span>System Root Login</span>
                <span className="boot-cursor">_</span>
              </h1>
              <p className="font-mono text-xs text-[var(--text-dim)] mt-1">
                Enter your administrative credentials to initialize control plane.
              </p>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-500 font-mono text-xs flex items-start gap-2">
                <span className="text-sm">⚠</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block font-mono text-xs text-[var(--text-primary)] mb-1.5">
                  <span className="text-[var(--violet)]">$</span> admin.email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@gmail.com"
                    className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--violet)] rounded-lg px-3 py-2.5 font-mono text-xs text-[var(--text-primary)] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-mono text-xs text-[var(--text-primary)]">
                    <span className="text-[var(--violet)]">$</span> admin.password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="font-mono text-[10px] text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {showPassword ? "hide" : "show"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--violet)] rounded-lg px-3 py-2.5 font-mono text-xs text-[var(--text-primary)] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 btn-primary flex items-center justify-center gap-2 py-3 rounded-lg cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="status-dot !bg-white" />
                    <span>Verifying HMAC & bcrypt hash...</span>
                  </>
                ) : (
                  <span>Authenticate & Enter Console →</span>
                )}
              </button>
            </form>

            {/* Back link */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="font-mono text-[11px] text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
              >
                ← Return to Public Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
