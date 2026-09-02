import React from "react";
import { getPostById } from "@/app/admin/actions";
import PostEditor from "@/components/admin/PostEditor";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

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
    <PostEditor
      isEditing={true}
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        tags: parseTags(post.tags),
        readingTime: post.readingTime,
        isPublished: post.isPublished,
      }}
    />
  );
}
