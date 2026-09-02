"use client";

import React, { useState } from "react";
import Link from "next/link";
import { deletePost, togglePostPublish } from "../actions";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string;
  isPublished: boolean;
  readingTime: string;
  createdAt: Date;
  publishedAt: Date | null;
}

export default function PostsListClient({
  initialPosts,
}: {
  initialPosts: PostItem[];
}) {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());

    if (filter === "PUBLISHED") return matchesSearch && post.isPublished;
    if (filter === "DRAFT") return matchesSearch && !post.isPublished;
    return matchesSearch;
  });

  const handleTogglePublish = async (id: string) => {
    setIsProcessing(id);
    try {
      const res = await togglePostPublish(id);
      if (res.success && res.post) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, isPublished: res.post.isPublished } : p
          )
        );
      }
    } catch {
      alert("Failed to toggle publish status");
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setIsProcessing(id);
    try {
      const res = await deletePost(id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert("Failed to delete post");
    } finally {
      setIsProcessing(null);
    }
  };

  const parseTags = (tagStr: string): string[] => {
    try {
      const parsed = JSON.parse(tagStr);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Fallback
    }
    return tagStr ? tagStr.split(",").map((s) => s.trim()) : [];
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#1E1E21]">
        <div>
          <div className="font-mono text-[10px] text-[#8B5CF6] tracking-wider mb-1 uppercase">
            // Module 02 · SYSTEM_NOTES_CRUD
          </div>
          <h1 className="font-sans text-2xl font-semibold text-[#FAFAFA]">
            System Notes & Blog Posts
          </h1>
          <p className="font-mono text-xs text-[#71717A] mt-1">
            Author, edit, preview, and publish engineering logs and architectural records.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="btn-primary flex items-center justify-center gap-2 text-xs py-2.5 px-4 rounded-lg self-start sm:self-auto"
        >
          <span>+</span>
          <span>Compose New Note</span>
        </Link>
      </div>

      {/* ── FILTER & SEARCH TOOLBAR ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#111113] border border-[#27272A] p-3 rounded-xl">
        {/* Search input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes by title, slug, or excerpt..."
            className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] rounded-lg px-3 py-2 font-mono text-xs text-[#FAFAFA] placeholder:text-[#3F3F46] outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#18181B] border border-[#27272A] p-1 rounded-lg shrink-0">
          {(["ALL", "PUBLISHED", "DRAFT"] as const).map((mode) => (
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

      {/* ── POSTS TABLE ── */}
      <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden shadow-xl">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="font-mono text-3xl mb-3">📝</div>
            <div className="font-mono text-sm text-[#FAFAFA] font-medium">
              No system notes found
            </div>
            <p className="font-mono text-xs text-[#71717A] mt-1 max-w-sm mx-auto">
              {search
                ? `No posts match your search "${search}"`
                : "Get started by creating your first system note."}
            </p>
            <Link
              href="/admin/posts/new"
              className="inline-block mt-4 btn-primary text-xs py-2 px-4 rounded-lg"
            >
              Create Note →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#09090B] border-b border-[#1E1E21] text-[#71717A] text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Title & Summary</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Tags</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E21]">
                {filteredPosts.map((post) => {
                  const tags = parseTags(post.tags);
                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-[#18181B]/40 transition-colors"
                    >
                      {/* Title & Excerpt */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <div className="font-medium text-[#FAFAFA] text-xs">
                          {post.title}
                        </div>
                        <div className="text-[11px] text-[#71717A] line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-4 py-3.5 text-[#38BDF8] text-[11px]">
                        /{post.slug}
                      </td>

                      {/* Status Toggle */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(post.id)}
                          disabled={isProcessing === post.id}
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] border transition-all cursor-pointer ${
                            post.isPublished
                              ? "bg-[#052E16]/50 border-[#16A34A]/50 text-[#22C55E] hover:border-[#22C55E]"
                              : "bg-[#1E1A0A] border-[#3A2E10] text-[#F59E0B] hover:border-[#F59E0B]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              post.isPublished ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                            }`}
                          />
                          <span>
                            {post.isPublished ? "Published" : "Draft"}
                          </span>
                        </button>
                      </td>

                      {/* Tags */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 flex-wrap max-w-xs">
                          {tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-[#18181B] border border-[#27272A] text-[#71717A]"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="text-[9px] text-[#52525B]">
                              +{tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 text-[#71717A] text-[11px] whitespace-nowrap">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#FAFAFA] text-[11px] transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            disabled={isProcessing === post.id}
                            className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#7F1D1D]/30 border border-[#27272A] hover:border-[#DC2626]/50 text-[#EF4444] text-[11px] transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
