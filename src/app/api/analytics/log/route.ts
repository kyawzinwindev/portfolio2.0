import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UAParser } from "ua-parser-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawPath = body.path || "/";

    // Skip logging internal analytics or static assets
    if (
      rawPath.startsWith("/_next") ||
      rawPath.startsWith("/api") ||
      rawPath.includes("favicon.ico") ||
      rawPath.includes(".map")
    ) {
      return NextResponse.json({ skipped: true }, { status: 200 });
    }

    const userAgent = req.headers.get("user-agent") || "Unknown";

    // Extract IP address from various proxies / headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ipAddress =
      body.ip ||
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
      realIp ||
      "127.0.0.1";

    // Parse User-Agent with UAParser
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    let deviceType = "Desktop";
    if (result.device.type === "mobile") deviceType = "Mobile";
    else if (result.device.type === "tablet") deviceType = "Tablet";
    else if (result.device.type === "smarttv" || result.device.type === "console")
      deviceType = result.device.type;

    const browser = result.browser.name
      ? `${result.browser.name}${result.browser.major ? " " + result.browser.major : ""}`
      : "Unknown Browser";

    const os = result.os.name
      ? `${result.os.name}${result.os.version ? " " + result.os.version : ""}`
      : "Unknown OS";

    // Save to VisitorLog in Prisma
    const log = await prisma.visitorLog.create({
      data: {
        ipAddress,
        userAgent: userAgent.slice(0, 500),
        deviceType,
        browser,
        os,
        visitedPath: rawPath.slice(0, 200),
      },
    });

    return NextResponse.json({ success: true, id: log.id }, { status: 201 });
  } catch (error) {
    console.error("Analytics logging error:", error);
    return NextResponse.json(
      { error: "Failed to record visitor log" },
      { status: 500 }
    );
  }
}
