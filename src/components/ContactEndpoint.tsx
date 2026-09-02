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
    <section id="contact" className="py-16 scroll-mt-12">
      <div className="wrapper">
        {/* Section label */}
        <div className="sec-label">{"// 05 — contact.endpoint"}</div>

        {/* 2-panel grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request Panel */}
          <div>
            <div className="font-mono text-[10px] text-[#F59E0B] tracking-[0.08em] mb-2 font-medium">
              REQUEST
            </div>
            <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-lg">
              <div className="px-[14px] py-2 border-b border-[#1E1E21] bg-[#09090B]">
                <span className="font-mono text-[10px] text-[#71717A]">
                  POST /api/contact HTTP/1.1
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-[14px]">
                <div className="font-mono text-[11px] leading-[2.2]">
                  <div>
                    <span className="text-[#8B5CF6]">POST</span>{" "}
                    <span className="text-[#38BDF8]">/api/contact</span>{" "}
                    <span className="text-[#71717A]">HTTP/1.1</span>
                  </div>
                  <div>
                    <span className="text-[#71717A]">Host:</span>{" "}
                    <span className="text-[#FAFAFA]">kyawzinwin.dev</span>
                  </div>
                  <div>
                    <span className="text-[#71717A]">Content-Type:</span>{" "}
                    <span className="text-[#FAFAFA]">application/json</span>
                  </div>

                  <div className="mt-1.5 text-[#3F3F46]">{"{"}</div>

                  {/* Name field */}
                  <div className="pl-[14px] flex items-center">
                    <span className="text-[#F59E0B]">&quot;name&quot;</span>
                    <span className="text-[#71717A] mr-1">:</span>
                    <span className="text-[#22C55E]">&quot;</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your Name"
                      required
                      className="bg-transparent border-none outline-none font-mono text-[11px] text-[#22C55E] placeholder:text-[#3F3F46] w-full px-0.5 focus:bg-[#18181B]/40 rounded"
                    />
                    <span className="text-[#22C55E]">&quot;</span>
                    <span className="text-[#3F3F46]">,</span>
                  </div>

                  {/* Email field */}
                  <div className="pl-[14px] flex items-center">
                    <span className="text-[#F59E0B]">&quot;email&quot;</span>
                    <span className="text-[#71717A] mr-1">:</span>
                    <span className="text-[#22C55E]">&quot;</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your.email@domain.com"
                      required
                      className="bg-transparent border-none outline-none font-mono text-[11px] text-[#22C55E] placeholder:text-[#3F3F46] w-full px-0.5 focus:bg-[#18181B]/40 rounded"
                    />
                    <span className="text-[#22C55E]">&quot;</span>
                    <span className="text-[#3F3F46]">,</span>
                  </div>

                  {/* Message field */}
                  <div className="pl-[14px] flex items-center">
                    <span className="text-[#F59E0B]">&quot;message&quot;</span>
                    <span className="text-[#71717A] mr-1">:</span>
                    <span className="text-[#22C55E]">&quot;</span>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Let's build something scalable..."
                      required
                      className="bg-transparent border-none outline-none font-mono text-[11px] text-[#22C55E] placeholder:text-[#3F3F46] w-full px-0.5 focus:bg-[#18181B]/40 rounded"
                    />
                    <span className="text-[#22C55E]">&quot;</span>
                  </div>

                  <div className="text-[#3F3F46]">{"}"}</div>
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
            <div className="font-mono text-[10px] text-[#22C55E] tracking-[0.08em] mb-2 font-medium">
              RESPONSE
            </div>
            <div className="bg-[#0A100A] border border-[#166534] rounded-xl overflow-hidden shadow-lg">
              <div className="px-[14px] py-2 border-b border-[#14532D] bg-[#071307]">
                <span className="font-mono text-[10px] text-[#22C55E]">
                  HTTP/1.1 {responseState.statusCode} OK
                </span>
              </div>

              <div className="p-[14px]">
                <div className="font-mono text-[11px] leading-[2.2]">
                  <div>
                    <span className="text-[#22C55E]">
                      HTTP/1.1 {responseState.statusCode} OK
                    </span>
                  </div>
                  <div>
                    <span className="text-[#71717A]">Content-Type:</span>{" "}
                    <span className="text-[#FAFAFA]">application/json</span>
                  </div>

                  <div className="mt-1.5 text-[#3F3F46]">{"{"}</div>

                  <div className="pl-[14px]">
                    <span className="text-[#F59E0B]">&quot;status&quot;</span>
                    <span className="text-[#71717A]">: </span>
                    <span className="text-[#22C55E]">
                      &quot;{responseState.status}&quot;
                    </span>
                    <span className="text-[#3F3F46]">,</span>
                  </div>

                  <div className="pl-[14px]">
                    <span className="text-[#F59E0B]">&quot;reply_within&quot;</span>
                    <span className="text-[#71717A]">: </span>
                    <span className="text-[#22C55E]">
                      &quot;{responseState.replyWithin}&quot;
                    </span>
                    <span className="text-[#3F3F46]">,</span>
                  </div>

                  <div className="pl-[14px]">
                    <span className="text-[#F59E0B]">&quot;timestamp&quot;</span>
                    <span className="text-[#71717A]">: </span>
                    <span className="text-[#38BDF8]">
                      &quot;{responseState.timestamp}&quot;
                    </span>
                    {responseState.sender && (
                      <>
                        <span className="text-[#3F3F46]">,</span>
                        <div className="mt-0.5">
                          <span className="text-[#F59E0B]">&quot;sender&quot;</span>
                          <span className="text-[#71717A]">: </span>
                          <span className="text-[#22C55E]">
                            &quot;{responseState.sender}&quot;
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-[#3F3F46]">{"}"}</div>
                </div>
              </div>
            </div>

            {/* Also Reachable Via Bar */}
            <div className="mt-[10px] p-[10px_12px] bg-[#111113] border border-[#27272A] rounded-lg">
              <div className="font-mono text-[10px] text-[#71717A] mb-1">
                Also reachable via
              </div>
              <div className="font-mono text-[11px] text-[#38BDF8] flex items-center gap-2 flex-wrap">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {githubUrl.replace(/^https?:\/\//, "")}
                </a>
                <span className="text-[#3F3F46]">·</span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
                <span className="text-[#3F3F46]">·</span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:underline text-[#22C55E]"
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
