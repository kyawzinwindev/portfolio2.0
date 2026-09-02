"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost, updatePost } from "@/app/admin/actions";

interface PostData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: string;
  isPublished: boolean;
}

interface PostEditorProps {
  initialData?: PostData;
  isEditing?: boolean;
}

export default function PostEditor({
  initialData,
  isEditing = false,
}: PostEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tagInput, setTagInput] = useState(
    initialData?.tags ? initialData.tags.join(", ") : "laravel, architecture, backend"
  );
  const [readingTime, setReadingTime] = useState(
    initialData?.readingTime || "5 min read"
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.isPublished ?? true
  );

  const [viewMode, setViewMode] = useState<"write" | "preview" | "split">(
    "split"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleAutoSlug = () => {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing && (!slug || slug === title.toLowerCase().replace(/\s+/g, "-"))) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim() || !slug.trim() || !content.trim()) {
      setErrorMsg("Title, Slug, and Markdown Content are required.");
      return;
    }

    const tagsArray = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    setIsSaving(true);

    try {
      if (isEditing && initialData?.id) {
        const res = await updatePost(initialData.id, {
          title,
          slug,
          excerpt,
          content,
          tags: tagsArray,
          readingTime,
          isPublished,
        });

        if (res.error) {
          setErrorMsg(res.error);
          setIsSaving(false);
          return;
        }

        setSuccessMsg("System note updated successfully!");
      } else {
        const res = await createPost({
          title,
          slug,
          excerpt,
          content,
          tags: tagsArray,
          readingTime,
          isPublished,
        });

        if (res.error) {
          setErrorMsg(res.error);
          setIsSaving(false);
          return;
        }

        setSuccessMsg("System note created successfully!");
        setTimeout(() => {
          router.push("/admin/posts");
          router.refresh();
        }, 500);
      }
    } catch {
      setErrorMsg("Failed to save post. Please verify all inputs.");
    } finally {
      setIsSaving(false);
    }
  };

  // Simple, fast client-side markdown formatter for preview
  const renderSimpleMarkdown = (md: string) => {
    if (!md) return <p className="text-[#71717A] italic">Empty content preview...</p>;

    const lines = md.split("\n");
    return (
      <div className="space-y-3 font-sans text-xs text-[#FAFAFA] leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith("### ")) {
            return (
              <h3 key={idx} className="font-mono text-sm font-semibold text-[#8B5CF6] mt-4 mb-1">
                {line.replace("### ", "")}
              </h3>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2 key={idx} className="font-mono text-base font-semibold text-[#FAFAFA] mt-5 mb-2 pb-1 border-b border-[#27272A]">
                {line.replace("## ", "")}
              </h2>
            );
          }
          if (line.startsWith("# ")) {
            return (
              <h1 key={idx} className="font-mono text-lg font-bold text-[#FAFAFA] mt-6 mb-2">
                {line.replace("# ", "")}
              </h1>
            );
          }
          if (line.startsWith("- ") || line.startsWith("* ")) {
            return (
              <li key={idx} className="ml-4 font-mono text-xs text-[#A1A1AA] list-disc">
                {line.replace(/^[-*]\s+/, "")}
              </li>
            );
          }
          if (line.startsWith("```")) {
            return (
              <div key={idx} className="font-mono text-[11px] text-[#71717A] bg-[#09090B] px-2 py-1 rounded border border-[#1E1E21]">
                {line}
              </div>
            );
          }
          if (line.trim() === "") {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className="font-mono text-xs text-[#D4D4D8]">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── BREADCRUMB & CONTROLS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#1E1E21]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#71717A] mb-1">
            <Link href="/admin/posts" className="hover:text-[#FAFAFA]">
              System Notes
            </Link>
            <span>/</span>
            <span className="text-[#8B5CF6]">
              {isEditing ? "Edit Note" : "Create New Note"}
            </span>
          </div>
          <h1 className="font-sans text-xl font-semibold text-[#FAFAFA]">
            {isEditing ? `Edit: ${title || "Untitled"}` : "Compose System Note"}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/posts"
            className="px-3.5 py-2 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] font-mono text-xs text-[#FAFAFA] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
          >
            {isSaving ? (
              <>
                <span className="status-dot !bg-white" />
                <span>Saving to SQLite...</span>
              </>
            ) : (
              <span>{isEditing ? "Update Note →" : "Publish Note →"}</span>
            )}
          </button>
        </div>
      </div>

      {/* ── STATUS BANNERS ── */}
      {errorMsg && (
        <div className="p-3 rounded-lg bg-[#7F1D1D]/20 border border-[#DC2626]/40 text-[#EF4444] font-mono text-xs flex items-center gap-2">
          <span>⚠</span>
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3 rounded-lg bg-[#052E16]/40 border border-[#16A34A]/40 text-[#22C55E] font-mono text-xs flex items-center gap-2">
          <span>✓</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* ── METADATA INPUTS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111113] border border-[#27272A] rounded-xl p-5">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block font-mono text-xs text-[#FAFAFA] mb-1">
            <span className="text-[#8B5CF6]">$</span> note.title *
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            placeholder="e.g. Designing role-permission systems in Laravel"
            className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg px-3 py-2 font-mono text-xs text-[#FAFAFA] outline-none"
          />
        </div>

        {/* Slug */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-mono text-xs text-[#FAFAFA]">
              <span className="text-[#8B5CF6]">$</span> note.slug (Unique URL Identifier) *
            </label>
            <button
              type="button"
              onClick={handleAutoSlug}
              className="font-mono text-[10px] text-[#8B5CF6] hover:underline"
            >
              Auto-generate
            </button>
          </div>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="e.g. designing-role-permission-systems"
            className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg px-3 py-2 font-mono text-xs text-[#38BDF8] outline-none"
          />
        </div>

        {/* Reading Time */}
        <div>
          <label className="block font-mono text-xs text-[#FAFAFA] mb-1">
            <span className="text-[#8B5CF6]">$</span> note.reading_time
          </label>
          <input
            type="text"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            placeholder="e.g. 8 min read"
            className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg px-3 py-2 font-mono text-xs text-[#FAFAFA] outline-none"
          />
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className="block font-mono text-xs text-[#FAFAFA] mb-1">
            <span className="text-[#8B5CF6]">$</span> note.excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Brief summary displayed on the main system notes timeline..."
            className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg p-3 font-mono text-xs text-[#FAFAFA] outline-none resize-y"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-mono text-xs text-[#FAFAFA] mb-1">
            <span className="text-[#8B5CF6]">$</span> note.tags (comma-separated)
          </label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="e.g. laravel, auth, database, scaling"
            className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg px-3 py-2 font-mono text-xs text-[#FAFAFA] outline-none"
          />
        </div>

        {/* Publish Status Toggle */}
        <div className="flex items-center justify-between p-3 bg-[#09090B] border border-[#27272A] rounded-lg self-end">
          <div>
            <div className="font-mono text-xs text-[#FAFAFA]">
              Publish Immediately
            </div>
            <div className="font-mono text-[10px] text-[#71717A]">
              Visible to public visitors on portfolio
            </div>
          </div>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 accent-[#8B5CF6] cursor-pointer"
          />
        </div>
      </div>

      {/* ── MARKDOWN CONTENT & LIVE PREVIEW ── */}
      <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-xl">
        {/* Editor Toolbar */}
        <div className="px-4 py-2.5 border-b border-[#1E1E21] bg-[#09090B] flex items-center justify-between flex-wrap gap-2">
          <div className="font-mono text-xs text-[#FAFAFA] flex items-center gap-2">
            <span className="text-[#8B5CF6]">$</span>
            <span>note.content.md (Markdown Supported)</span>
          </div>

          {/* View mode buttons */}
          <div className="flex items-center gap-1 bg-[#18181B] border border-[#27272A] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode("write")}
              className={`px-2.5 py-1 rounded font-mono text-[10px] transition-colors ${
                viewMode === "write"
                  ? "bg-[#27272A] text-[#FAFAFA]"
                  : "text-[#71717A] hover:text-[#FAFAFA]"
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`px-2.5 py-1 rounded font-mono text-[10px] transition-colors ${
                viewMode === "split"
                  ? "bg-[#27272A] text-[#FAFAFA]"
                  : "text-[#71717A] hover:text-[#FAFAFA]"
              }`}
            >
              Split View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`px-2.5 py-1 rounded font-mono text-[10px] transition-colors ${
                viewMode === "preview"
                  ? "bg-[#27272A] text-[#FAFAFA]"
                  : "text-[#71717A] hover:text-[#FAFAFA]"
              }`}
            >
              Live Preview
            </button>
          </div>
        </div>

        {/* Editor Canvas */}
        <div
          className={`grid ${
            viewMode === "split"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {/* Write Textarea */}
          {(viewMode === "write" || viewMode === "split") && (
            <div className="p-4 border-r border-[#1E1E21] bg-[#09090B]/50">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={18}
                placeholder="Write your system note in Markdown here...&#10;&#10;## Subheading&#10;Explain architectural considerations and state transitions...&#10;&#10;```php&#10;echo 'Hello World';&#10;```"
                className="w-full h-full min-h-[400px] bg-transparent border-none outline-none font-mono text-xs text-[#FAFAFA] placeholder:text-[#3F3F46] resize-y leading-relaxed"
              />
            </div>
          )}

          {/* Preview Panel */}
          {(viewMode === "preview" || viewMode === "split") && (
            <div className="p-6 bg-[#111113] overflow-y-auto max-h-[600px]">
              <div className="font-mono text-[10px] text-[#F59E0B] tracking-wider uppercase mb-3 pb-2 border-b border-[#1E1E21]">
                Live Render Output
              </div>
              <div className="mb-4">
                <h1 className="font-mono text-base font-semibold text-[#FAFAFA] mb-1">
                  {title || "Untitled Post"}
                </h1>
                <div className="font-mono text-[10px] text-[#71717A] flex items-center gap-2">
                  <span>{readingTime}</span>
                  <span>·</span>
                  <span className={isPublished ? "text-[#22C55E]" : "text-[#F59E0B]"}>
                    {isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                {renderSimpleMarkdown(content)}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
