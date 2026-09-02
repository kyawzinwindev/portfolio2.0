"use client";

import React, { useState } from "react";

interface ContactEndpointProps {
  githubUrl?: string;
  linkedinUrl?: string;
  contactEmail?: string;
}

export default function ContactEndpoint({
  githubUrl = "https://github.com/kyawzinwin",
  linkedinUrl = "https://linkedin.com/in/kyawzinwin",
  contactEmail = "contact@kyawzinwin.dev",
}: ContactEndpointProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseState, setResponseState] = useState<{
    status: string;
    statusCode: number;
    replyWithin: string;
    timestamp: string;
    sender: string | null;
    isSent: boolean;
    error?: string;
  }>({
    status: "idle",
    statusCode: 200,
    replyWithin: "48h",
    timestamp: "2025-01-14T09:32Z",
    sender: null,
    isSent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in name, email, and message before sending request.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseState({
          status: "received",
          statusCode: 200,
          replyWithin: data.reply_within || "24-48h",
          timestamp: data.timestamp || new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
          sender: data.sender || formData.name,
          isSent: true,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Failed to deliver contact request.");
      }
    } catch {
      alert("Network error: Could not reach backend contact endpoint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 scroll-mt-12 transition-colors duration-200">
      <div className="wrapper">
        {/* Section label */}
        <div className="sec-label">{"// 05 — contact.endpoint"}</div>

        {/* 2-panel grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request Panel */}
          <div>
            <div className="font-mono text-[10px] text-[var(--amber)] tracking-[0.08em] mb-2 font-medium">
              REQUEST
            </div>
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg">
              <div className="px-[14px] py-2 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)]">
                <span className="font-mono text-[10px] text-[var(--text-dim)]">
                  POST /api/contact HTTP/1.1
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-[14px]">
                <div className="font-mono text-[11px] leading-[2.2]">
                  <div>
                    <span className="text-[var(--violet)]">POST</span>{" "}
                    <span className="text-[var(--sky)]">/api/contact</span>{" "}
                    <span className="text-[var(--text-dim)]">HTTP/1.1</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-dim)]">Host:</span>{" "}
                    <span className="text-[var(--text-primary)]">kyawzinwin.dev</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-dim)]">Content-Type:</span>{" "}
                    <span className="text-[var(--text-primary)]">application/json</span>
                  </div>

                  <div className="mt-1.5 text-[var(--text-muted)]">{"{"}</div>

                  {/* Name field */}
                  <div className="pl-[14px] flex items-center">
                    <span className="text-[var(--amber)]">&quot;name&quot;</span>
                    <span className="text-[var(--text-dim)] mr-1">:</span>
                    <span className="text-[var(--green)]">&quot;</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your Name"
                      required
                      className="bg-transparent border-none outline-none font-mono text-[11px] text-[var(--green)] placeholder:text-[var(--text-muted)] w-full px-0.5 focus:bg-[var(--bg-elevated)] rounded"
                    />
                    <span className="text-[var(--green)]">&quot;</span>
                    <span className="text-[var(--text-muted)]">,</span>
                  </div>

                  {/* Email field */}
                  <div className="pl-[14px] flex items-center">
                    <span className="text-[var(--amber)]">&quot;email&quot;</span>
                    <span className="text-[var(--text-dim)] mr-1">:</span>
                    <span className="text-[var(--green)]">&quot;</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your.email@domain.com"
                      required
                      className="bg-transparent border-none outline-none font-mono text-[11px] text-[var(--green)] placeholder:text-[var(--text-muted)] w-full px-0.5 focus:bg-[var(--bg-elevated)] rounded"
                    />
                    <span className="text-[var(--green)]">&quot;</span>
                    <span className="text-[var(--text-muted)]">,</span>
                  </div>

                  {/* Message field */}
                  <div className="pl-[14px] flex items-center">
                    <span className="text-[var(--amber)]">&quot;message&quot;</span>
                    <span className="text-[var(--text-dim)] mr-1">:</span>
                    <span className="text-[var(--green)]">&quot;</span>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Let's build something scalable..."
                      required
                      className="bg-transparent border-none outline-none font-mono text-[11px] text-[var(--green)] placeholder:text-[var(--text-muted)] w-full px-0.5 focus:bg-[var(--bg-elevated)] rounded"
                    />
                    <span className="text-[var(--green)]">&quot;</span>
                  </div>

                  <div className="text-[var(--text-muted)]">{"}"}</div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full mt-3 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="status-dot !bg-white" />
                      <span>Transmitting HTTP POST payload...</span>
                    </>
                  ) : (
                    <span>Send Request →</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Response Panel */}
          <div>
            <div className="font-mono text-[10px] text-[var(--green)] tracking-[0.08em] mb-2 font-medium">
              RESPONSE
            </div>
            <div className="bg-[var(--green-bg)]/30 border border-[var(--green-bdr)] rounded-xl overflow-hidden shadow-lg">
              <div className="px-[14px] py-2 border-b border-[var(--green-bdr)]/70 bg-[var(--green-bg)]/50">
                <span className="font-mono text-[10px] text-[var(--green)]">
                  HTTP/1.1 {responseState.statusCode} OK
                </span>
              </div>

              <div className="p-[14px]">
                <div className="font-mono text-[11px] leading-[2.2]">
                  <div>
                    <span className="text-[var(--green)]">
                      HTTP/1.1 {responseState.statusCode} OK
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-dim)]">Content-Type:</span>{" "}
                    <span className="text-[var(--text-primary)]">application/json</span>
                  </div>

                  <div className="mt-1.5 text-[var(--text-muted)]">{"{"}</div>

                  <div className="pl-[14px]">
                    <span className="text-[var(--amber)]">&quot;status&quot;</span>
                    <span className="text-[var(--text-dim)]">: </span>
                    <span className="text-[var(--green)]">
                      &quot;{responseState.status}&quot;
                    </span>
                    <span className="text-[var(--text-muted)]">,</span>
                  </div>

                  <div className="pl-[14px]">
                    <span className="text-[var(--amber)]">&quot;reply_within&quot;</span>
                    <span className="text-[var(--text-dim)]">: </span>
                    <span className="text-[var(--green)]">
                      &quot;{responseState.replyWithin}&quot;
                    </span>
                    <span className="text-[var(--text-muted)]">,</span>
                  </div>

                  <div className="pl-[14px]">
                    <span className="text-[var(--amber)]">&quot;timestamp&quot;</span>
                    <span className="text-[var(--text-dim)]">: </span>
                    <span className="text-[var(--sky)]">
                      &quot;{responseState.timestamp}&quot;
                    </span>
                    {responseState.sender && (
                      <>
                        <span className="text-[var(--text-muted)]">,</span>
                        <div className="mt-0.5">
                          <span className="text-[var(--amber)]">&quot;sender&quot;</span>
                          <span className="text-[var(--text-dim)]">: </span>
                          <span className="text-[var(--green)]">
                            &quot;{responseState.sender}&quot;
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-[var(--text-muted)]">{"}"}</div>
                </div>
              </div>
            </div>

            {/* Also Reachable Via Bar */}
            <div className="mt-[10px] p-[10px_12px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg shadow-xs">
              <div className="font-mono text-[10px] text-[var(--text-dim)] mb-1">
                Also reachable via
              </div>
              <div className="font-mono text-[11px] text-[var(--sky)] flex items-center gap-2 flex-wrap">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {githubUrl.replace(/^https?:\/\//, "")}
                </a>
                <span className="text-[var(--text-muted)]">·</span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
                <span className="text-[var(--text-muted)]">·</span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:underline text-[var(--green)] font-medium"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
