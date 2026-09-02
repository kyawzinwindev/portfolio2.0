"use server";

import prisma from "@/lib/prisma";
import { getSessionUser, hashPassword, verifyPassword, clearSessionCookie } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Require valid admin authentication in server actions
 */
async function requireAuth() {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized: Active admin session required");
  }
  return user;
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────────────────
export async function getDashboardStats() {
  await requireAuth();

  const [
    totalVisitors,
    totalPosts,
    publishedPosts,
    draftPosts,
    unreadMessages,
    totalMessages,
    recentVisitors,
    recentMessages,
  ] = await Promise.all([
    prisma.visitorLog.count(),
    prisma.post.count(),
    prisma.post.count({ where: { isPublished: true } }),
    prisma.post.count({ where: { isPublished: false } }),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    prisma.contactMessage.count(),
    prisma.visitorLog.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    totalVisitors,
    totalPosts,
    publishedPosts,
    draftPosts,
    unreadMessages,
    totalMessages,
    recentVisitors,
    recentMessages,
  };
}

// ─────────────────────────────────────────────────────────────
// POSTS CRUD
// ─────────────────────────────────────────────────────────────
export async function getAdminPosts(query?: string) {
  await requireAuth();

  const where = query
    ? {
        OR: [
          { title: { contains: query } },
          { excerpt: { contains: query } },
          { slug: { contains: query } },
        ],
      }
    : {};

  return await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostById(id: string) {
  await requireAuth();
  return await prisma.post.findUnique({ where: { id } });
}

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  readingTime?: string;
}) {
  await requireAuth();

  // Validate slug uniqueness
  const existing = await prisma.post.findUnique({
    where: { slug: data.slug.trim().toLowerCase() },
  });

  if (existing) {
    return { error: "A post with this URL slug already exists" };
  }

  const post = await prisma.post.create({
    data: {
      title: data.title.trim(),
      slug: data.slug.trim().toLowerCase(),
      excerpt: data.excerpt.trim(),
      content: data.content,
      tags: JSON.stringify(data.tags),
      isPublished: data.isPublished,
      readingTime: data.readingTime || "5 min read",
      publishedAt: data.isPublished ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  return { success: true, post };
}

export async function updatePost(
  id: string,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    isPublished: boolean;
    readingTime?: string;
  }
) {
  await requireAuth();

  // Check if slug taken by another post
  const existing = await prisma.post.findFirst({
    where: {
      slug: data.slug.trim().toLowerCase(),
      NOT: { id },
    },
  });

  if (existing) {
    return { error: "A post with this URL slug already exists" };
  }

  const currentPost = await prisma.post.findUnique({ where: { id } });
  const publishedAt =
    data.isPublished && !currentPost?.publishedAt
      ? new Date()
      : currentPost?.publishedAt;

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: data.title.trim(),
      slug: data.slug.trim().toLowerCase(),
      excerpt: data.excerpt.trim(),
      content: data.content,
      tags: JSON.stringify(data.tags),
      isPublished: data.isPublished,
      readingTime: data.readingTime || "5 min read",
      publishedAt: data.isPublished ? publishedAt : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  return { success: true, post };
}

export async function deletePost(id: string) {
  await requireAuth();

  await prisma.post.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function togglePostPublish(id: string) {
  await requireAuth();

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return { error: "Post not found" };

  const updated = await prisma.post.update({
    where: { id },
    data: {
      isPublished: !post.isPublished,
      publishedAt: !post.isPublished ? new Date() : post.publishedAt,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  return { success: true, post: updated };
}

// ─────────────────────────────────────────────────────────────
// VISITOR LOGS
// ─────────────────────────────────────────────────────────────
export async function getVisitorLogs(page = 1, limit = 50, search?: string) {
  await requireAuth();

  const skip = (page - 1) * limit;
  const where = search
    ? {
        OR: [
          { ipAddress: { contains: search } },
          { visitedPath: { contains: search } },
          { browser: { contains: search } },
          { os: { contains: search } },
          { deviceType: { contains: search } },
        ],
      }
    : {};

  const [logs, total] = await Promise.all([
    prisma.visitorLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.visitorLog.count({ where }),
  ]);

  // Aggregate device breakdown
  const deviceCounts = await prisma.visitorLog.groupBy({
    by: ["deviceType"],
    _count: { deviceType: true },
  });

  return {
    logs,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
    deviceCounts,
  };
}

// ─────────────────────────────────────────────────────────────
// CONTACT MESSAGES
// ─────────────────────────────────────────────────────────────
export async function getContactMessages(statusFilter?: string) {
  await requireAuth();

  const where =
    statusFilter && statusFilter !== "ALL"
      ? { status: statusFilter }
      : {};

  return await prisma.contactMessage.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function updateMessageStatus(
  id: string,
  status: "UNREAD" | "READ" | "REPLIED"
) {
  await requireAuth();

  const updated = await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
  return { success: true, message: updated };
}

export async function deleteContactMessage(id: string) {
  await requireAuth();

  await prisma.contactMessage.delete({ where: { id } });

  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────
// SITE SETTINGS & CREDENTIALS
// ─────────────────────────────────────────────────────────────
export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  for (const s of settings) {
    map[s.key] = s.value;
  }
  return map;
}

export async function updateSiteSettings(settings: Record<string, string>) {
  await requireAuth();

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function changeAdminPassword(data: {
  currentPass: string;
  newPass: string;
}) {
  const user = await requireAuth();

  if (!data.currentPass || !data.newPass) {
    return { error: "All password fields are required" };
  }

  if (data.newPass.length < 6) {
    return { error: "New password must be at least 6 characters long" };
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!currentUser) {
    return { error: "Admin user not found" };
  }

  // Verify current password with bcrypt
  const isMatch = await verifyPassword(data.currentPass, currentUser.password);
  if (!isMatch) {
    return { error: "Current password verification failed. Please try again." };
  }

  // Hash new password and save
  const newHashed = await hashPassword(data.newPass);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: newHashed },
  });

  return { success: true, message: "Password updated successfully!" };
}

export async function logoutAdmin() {
  await clearSessionCookie();
  redirect("/admin/login");
}

