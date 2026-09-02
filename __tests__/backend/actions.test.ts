/**
 * @jest-environment node
 */
import {
  getSiteSettings,
  updateSiteSettings,
  changeAdminPassword,
  createPost,
  deletePost,
  togglePostPublish,
} from "@/app/admin/actions";
import prisma from "@/lib/prisma";
import * as authModule from "@/lib/auth";

jest.mock("@/lib/auth", () => {
  const actual = jest.requireActual("@/lib/auth");
  return {
    ...actual,
    getSessionUser: jest.fn(),
    verifyPassword: jest.fn(),
    hashPassword: jest.fn(),
    clearSessionCookie: jest.fn(),
  };
});

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    siteSetting: {
      findMany: jest.fn(),
      upsert: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    post: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Admin Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (authModule.getSessionUser as jest.Mock).mockResolvedValue({
      id: "admin-user-1",
      email: "kyawzinw469@gmail.com",
    });
  });

  describe("Site Settings Actions", () => {
    it("should retrieve site settings as a key-value record", async () => {
      (prisma.siteSetting.findMany as jest.Mock).mockResolvedValue([
        { key: "github_url", value: "https://github.com/kyawzinwin" },
        { key: "contact_email", value: "contact@kyawzinwin.dev" },
      ]);

      const settings = await getSiteSettings();
      expect(settings.github_url).toBe("https://github.com/kyawzinwin");
      expect(settings.contact_email).toBe("contact@kyawzinwin.dev");
    });

    it("should upsert settings and revalidate paths", async () => {
      (prisma.siteSetting.upsert as jest.Mock).mockResolvedValue({});

      const result = await updateSiteSettings({
        site_title: "Kyaw Zin Win Portfolio",
      });

      expect(result.success).toBe(true);
      expect(prisma.siteSetting.upsert).toHaveBeenCalledWith({
        where: { key: "site_title" },
        update: { value: "Kyaw Zin Win Portfolio" },
        create: { key: "site_title", value: "Kyaw Zin Win Portfolio" },
      });
    });
  });

  describe("Password Management Action", () => {
    it("should reject password change if current password does not match", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "admin-user-1",
        password: "$2a$10$hashedcurrentpass",
      });

      (authModule.verifyPassword as jest.Mock).mockResolvedValue(false);

      const res = await changeAdminPassword({
        currentPass: "wrongCurrent",
        newPass: "newSecretPassword123",
      });

      expect(res.error).toBeDefined();
      expect(res.error).toContain("Current password verification failed");
    });

    it("should hash and update password if current password is valid", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: "admin-user-1",
        password: "$2a$10$hashedcurrentpass",
      });

      (authModule.verifyPassword as jest.Mock).mockResolvedValue(true);
      (authModule.hashPassword as jest.Mock).mockResolvedValue("$2a$10$newhashedpassword");
      (prisma.user.update as jest.Mock).mockResolvedValue({});

      const res = await changeAdminPassword({
        currentPass: "correctCurrent",
        newPass: "newSecretPassword123",
      });

      expect(res.success).toBe(true);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: "admin-user-1" },
        data: { password: "$2a$10$newhashedpassword" },
      });
    });
  });

  describe("Post CRUD Actions", () => {
    it("should create a new post with JSON tags", async () => {
      (prisma.post.create as jest.Mock).mockResolvedValue({
        id: "post-1",
        title: "Test Note",
        slug: "test-note",
        isPublished: true,
      });

      const res = await createPost({
        title: "Test Note",
        slug: "test-note",
        excerpt: "Summary here",
        content: "Markdown body",
        tags: ["architecture", "laravel"],
        readingTime: "5 min read",
        isPublished: true,
      });

      expect(res.success).toBe(true);
      expect(prisma.post.create).toHaveBeenCalled();
    });

    it("should delete an existing post", async () => {
      (prisma.post.delete as jest.Mock).mockResolvedValue({});

      const res = await deletePost("post-1");
      expect(res.success).toBe(true);
      expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: "post-1" } });
    });

    it("should toggle post publication status", async () => {
      (prisma.post.findUnique as jest.Mock).mockResolvedValue({
        id: "post-1",
        isPublished: false,
      });
      (prisma.post.update as jest.Mock).mockResolvedValue({
        id: "post-1",
        isPublished: true,
      });

      const res = await togglePostPublish("post-1");
      expect(res.success).toBe(true);
      expect(res.post?.isPublished).toBe(true);
    });
  });
});
