/**
 * @jest-environment node
 */
import { POST } from "@/app/api/analytics/log/route";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    visitorLog: {
      create: jest.fn(),
    },
  },
}));

describe("POST /api/analytics/log Route Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should parse visitor user agent and save log to database", async () => {
    (prisma.visitorLog.create as jest.Mock).mockResolvedValue({
      id: "log-1",
      ipAddress: "127.0.0.1",
      deviceType: "Desktop",
      browser: "Chrome 120",
      os: "macOS",
      visitedPath: "/",
      createdAt: new Date(),
    });

    const userAgent =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    const req = new NextRequest("http://localhost:3000/api/analytics/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": userAgent,
      },
      body: JSON.stringify({
        path: "/",
        userAgent,
        ip: "127.0.0.1",
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.id).toBe("log-1");
    expect(prisma.visitorLog.create).toHaveBeenCalled();
  });

  it("should skip internal analytics and static assets", async () => {
    const req = new NextRequest("http://localhost:3000/api/analytics/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "/_next/static/chunks/app.js",
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.skipped).toBe(true);
    expect(prisma.visitorLog.create).not.toHaveBeenCalled();
  });
});
