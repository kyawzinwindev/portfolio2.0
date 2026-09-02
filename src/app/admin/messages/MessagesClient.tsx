"use client";

import React, { useState } from "react";
import { updateMessageStatus, deleteContactMessage } from "../actions";

interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string; // UNREAD, READ, REPLIED
  createdAt: Date;
}

export default function MessagesClient({
  initialMessages,
}: {
  initialMessages: ContactMessageItem[];
}) {
  const [messages, setMessages] = useState<ContactMessageItem[]>(initialMessages);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ" | "REPLIED">("ALL");
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const filtered = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase());

    if (filter === "ALL") return matchesSearch;
    return matchesSearch && msg.status === filter;
  });

  const handleStatusChange = async (
    id: string,
    newStatus: "UNREAD" | "READ" | "REPLIED"
  ) => {
    setIsProcessing(true);
    try {
      const res = await updateMessageStatus(id, newStatus);
      if (res.success && res.message) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch {
      alert("Failed to update status");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from ${name}?`)) return;

    setIsProcessing(true);
    try {
      const res = await deleteContactMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch {
      alert("Failed to delete message");
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "UNREAD":
        return "bg-[#EF4444]/10 border-[#DC2626]/40 text-[#EF4444]";
      case "REPLIED":
        return "bg-[#22C55E]/10 border-[#16A34A]/40 text-[#22C55E]";
      case "READ":
      default:
        return "bg-[#18181B] border-[#27272A] text-[#71717A]";
    }
  };

  const unreadCount = messages.filter((m) => m.status === "UNREAD").length;

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#1E1E21]">
        <div>
          <div className="font-mono text-[10px] text-[#F59E0B] tracking-wider mb-1 uppercase">
            // Module 04 · CONTACT_INBOX
          </div>
          <h1 className="font-sans text-2xl font-semibold text-[#FAFAFA] flex items-center gap-2">
            <span>Contact Form Submissions</span>
            <span className="boot-cursor">_</span>
          </h1>
          <p className="font-mono text-xs text-[#71717A] mt-1">
            Review incoming inquiries sent via the public POST /api/contact endpoint.
          </p>
        </div>

        {unreadCount > 0 && (
          <div className="bg-[#EF4444]/10 border border-[#DC2626]/40 text-[#EF4444] font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <span>{unreadCount} UNREAD MESSAGES</span>
          </div>
        )}
      </div>

      {/* ── TOOLBAR ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#111113] border border-[#27272A] p-3 rounded-xl">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter messages by name, email, or keywords..."
          className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#F59E0B] rounded-lg px-3 py-2 font-mono text-xs text-[#FAFAFA] placeholder:text-[#3F3F46] outline-none"
        />

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#18181B] border border-[#27272A] p-1 rounded-lg shrink-0">
          {(["ALL", "UNREAD", "READ", "REPLIED"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1 rounded font-mono text-xs transition-colors ${
                filter === mode
                  ? "bg-[#27272A] text-[#FAFAFA]"
                  : "text-[#71717A] hover:text-[#FAFAFA]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* ── 2-COLUMN VIEW: LIST + MESSAGE READER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List */}
        <div
          className={`${
            selectedMessage ? "lg:col-span-7" : "lg:col-span-12"
          } bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-xl`}
        >
          {filtered.length === 0 ? (
            <div className="p-12 text-center font-mono text-xs text-[#71717A]">
              No messages found under this filter.
            </div>
          ) : (
            <div className="divide-y divide-[#1E1E21] max-h-[650px] overflow-y-auto">
              {filtered.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === "UNREAD") {
                        handleStatusChange(msg.id, "READ");
                      }
                    }}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#18181B] border-l-2 border-[#8B5CF6]"
                        : "hover:bg-[#18181B]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#FAFAFA]">
                          {msg.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#71717A]">
                          &lt;{msg.email}&gt;
                        </span>
                      </div>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded border font-mono ${getStatusBadge(
                          msg.status
                        )}`}
                      >
                        {msg.status}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-[#A1A1AA] line-clamp-2 my-1">
                      {msg.message}
                    </p>

                    <div className="font-mono text-[10px] text-[#52525B] flex items-center justify-between mt-2">
                      <span>
                        {new Date(msg.createdAt).toLocaleDateString()} at{" "}
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-[#8B5CF6] hover:underline">
                        {isSelected ? "Active reading" : "Click to view →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Message Reader Panel */}
        {selectedMessage && (
          <div className="lg:col-span-5 bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#1E1E21] bg-[#09090B] flex items-center justify-between">
              <span className="font-mono text-xs text-[#FAFAFA] font-medium">
                Message Detail View
              </span>
              <button
                onClick={() => setSelectedMessage(null)}
                className="font-mono text-xs text-[#71717A] hover:text-[#FAFAFA]"
              >
                ✕ Close
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 space-y-4">
              <div className="p-3 bg-[#09090B] border border-[#1E1E21] rounded-lg font-mono text-xs space-y-1">
                <div>
                  <span className="text-[#71717A]">Sender:</span>{" "}
                  <span className="text-[#FAFAFA] font-medium">
                    {selectedMessage.name}
                  </span>
                </div>
                <div>
                  <span className="text-[#71717A]">Email:</span>{" "}
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-[#38BDF8] hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#71717A]">Received:</span>{" "}
                  <span className="text-[#FAFAFA]">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[#71717A]">Current Status:</span>{" "}
                  <span
                    className={`inline-block text-[9px] px-1.5 py-0.5 rounded border ${getStatusBadge(
                      selectedMessage.status
                    )}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
              </div>

              {/* Message Payload Body */}
              <div>
                <label className="block font-mono text-[10px] text-[#71717A] uppercase tracking-wider mb-1.5">
                  Payload Content
                </label>
                <div className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg font-mono text-xs text-[#FAFAFA] leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status change actions */}
              <div className="pt-2 border-t border-[#1E1E21] space-y-2">
                <div className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">
                  Update Status
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    disabled={isProcessing}
                    onClick={() =>
                      handleStatusChange(selectedMessage.id, "UNREAD")
                    }
                    className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] font-mono text-xs text-[#EF4444]"
                  >
                    Mark Unread
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={() => handleStatusChange(selectedMessage.id, "READ")}
                    className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] font-mono text-xs text-[#FAFAFA]"
                  >
                    Mark Read
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={() =>
                      handleStatusChange(selectedMessage.id, "REPLIED")
                    }
                    className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] font-mono text-xs text-[#22C55E]"
                  >
                    Mark Replied
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Contact from Kyaw Zin Win Portfolio`}
                  onClick={() => handleStatusChange(selectedMessage.id, "REPLIED")}
                  className="btn-primary flex-1 text-center py-2 rounded-lg text-xs"
                >
                  Reply via Email ↗
                </a>

                <button
                  disabled={isProcessing}
                  onClick={() =>
                    handleDelete(selectedMessage.id, selectedMessage.name)
                  }
                  className="px-3 py-2 rounded-lg bg-[#18181B] hover:bg-[#7F1D1D]/30 border border-[#27272A] hover:border-[#DC2626]/50 text-[#EF4444] font-mono text-xs transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
