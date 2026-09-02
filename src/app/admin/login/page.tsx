"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("kyawzinw469@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

      // Success -> navigate to admin dashboard
      router.push("/admin/dashboard");
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
        <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl shadow-black/80">
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 border-b border-[#1E1E21] bg-[#09090B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="font-mono text-[11px] text-[#71717A] ml-2">
                auth.session // login.sh
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#8B5CF6]">v1.0.0</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6">
            <div className="mb-6">
              <div className="font-mono text-[10px] text-[#3F3F46] mb-1">
                {"// SECURE ACCESS GATEWAY"}
              </div>
              <h1 className="font-mono text-xl font-medium text-[#FAFAFA] flex items-center gap-2">
                <span>System Root Login</span>
                <span className="boot-cursor">_</span>
              </h1>
              <p className="font-mono text-xs text-[#71717A] mt-1">
                Enter your administrative credentials to initialize control plane.
              </p>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-lg bg-[#7F1D1D]/20 border border-[#DC2626]/40 text-[#EF4444] font-mono text-xs flex items-start gap-2">
                <span className="text-sm">⚠</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block font-mono text-xs text-[#FAFAFA] mb-1.5">
                  <span className="text-[#8B5CF6]">$</span> admin.email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="kyawzinw469@gmail.com"
                    className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg px-3 py-2.5 font-mono text-xs text-[#FAFAFA] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-mono text-xs text-[#FAFAFA]">
                    <span className="text-[#8B5CF6]">$</span> admin.password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="font-mono text-[10px] text-[#71717A] hover:text-[#FAFAFA] transition-colors"
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
                    className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg px-3 py-2.5 font-mono text-xs text-[#FAFAFA] outline-none transition-colors"
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

            {/* Quick credentials hint note */}
            <div className="mt-6 p-3 bg-[#18181B] border border-[#27272A] rounded-lg">
              <div className="font-mono text-[10px] text-[#71717A] mb-1 font-medium">
                Default Seeded Credentials:
              </div>
              <div className="font-mono text-[11px] text-[#F59E0B] space-y-0.5">
                <div>Email: <span className="text-[#FAFAFA]">kyawzinw469@gmail.com</span></div>
                <div>Password: <span className="text-[#FAFAFA]">k29z8w2002</span></div>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-4 text-center">
              <Link
                href="/"
                className="font-mono text-[11px] text-[#71717A] hover:text-[#FAFAFA] transition-colors"
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
