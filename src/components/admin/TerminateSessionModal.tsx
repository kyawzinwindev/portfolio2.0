"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminateSessionModal({
  isOpen,
  onClose,
}: TerminateSessionModalProps) {
  const [isTerminating, setIsTerminating] = useState(false);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press & auto-focus confirm button
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isTerminating) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => confirmBtnRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, isTerminating, onClose]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsTerminating(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Continue even if network glitch occurs
    }

    // Replace current location so dashboard is evicted from history
    window.location.replace("/admin/login");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminate-session-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={() => {
        if (!isTerminating) onClose();
      }}
    >
      <div
        className="w-full max-w-lg bg-[#09090B] border border-[#27272A] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="px-4 py-3 border-b border-[#27272A] bg-[#121215] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="font-mono text-[11px] text-[#A1A1AA] ml-2 font-medium">
              session.terminate // SIGTERM
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isTerminating}
            aria-label="Close modal"
            className="font-mono text-xs text-[#71717A] hover:text-[#FAFAFA] transition-colors cursor-pointer disabled:opacity-50 p-1"
          >
            ✕ ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Status & Terminal prompt */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#18181B] border border-[#27272A] font-mono text-[10px]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isTerminating ? "bg-red-500 animate-ping" : "bg-[#22C55E] animate-pulse"
                }`}
              />
              <span className={isTerminating ? "text-red-400" : "text-[#22C55E]"}>
                {isTerminating ? "STATUS: REVOKING_TOKEN" : "STATUS: ACTIVE_ROOT_SESSION"}
              </span>
            </div>

            <span className="font-mono text-[10px] text-[#71717A]">
              PID: 0xKZW-99
            </span>
          </div>

          <div>
            <div className="font-mono text-[11px] text-[#8B5CF6] mb-1 flex items-center gap-1.5">
              <span>$</span>
              <span>sysctl --terminate-session --purge-auth</span>
            </div>
            <h2
              id="terminate-session-title"
              className="font-mono text-lg font-semibold text-[#FAFAFA]"
            >
              Terminate Admin Session?
            </h2>
            <p className="font-mono text-xs text-[#A1A1AA] mt-2 leading-relaxed">
              This action will revoke active HMAC-SHA256 session cookies, flush administrative
              control plane tokens, and redirect the user back to the Root Login gateway.
            </p>
          </div>

          {/* Warning notice box */}
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 font-mono text-xs text-red-400 flex items-start gap-2.5">
            <span className="text-base leading-none">⚠</span>
            <div className="space-y-1">
              <div className="font-semibold tracking-wide uppercase text-[10px]">
                Authentication Invalidation Warning
              </div>
              <div className="text-[11px] text-red-300/80 leading-normal">
                Any unsaved draft notes or settings changes in the current session will be discarded.
              </div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="px-6 py-4 border-t border-[#27272A] bg-[#121215] flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isTerminating}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] font-mono text-xs text-[#D4D4D8] hover:text-[#FAFAFA] transition-colors cursor-pointer disabled:opacity-50 min-h-[44px] flex items-center justify-center"
          >
            Cancel [ESC]
          </button>

          <button
            ref={confirmBtnRef}
            type="button"
            onClick={handleConfirm}
            disabled={isTerminating}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-500/15 hover:bg-red-600 border border-red-500/40 hover:border-red-500 font-mono text-xs text-red-400 hover:text-white transition-all cursor-pointer disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2 font-medium shadow-lg shadow-red-950/20"
          >
            {isTerminating ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Terminating Session...</span>
              </>
            ) : (
              <>
                <span>⏻</span>
                <span>Confirm Termination</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
