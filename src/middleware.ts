import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "kzw_os_super_secret_jwt_key_92837492817498127391";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);
const SESSION_COOKIE_NAME = "admin_session";

async function isUserAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return !!payload?.userId;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. ADMIN ROUTE PROTECTION
  if (pathname.startsWith("/admin")) {
    const isAuth = await isUserAuthenticated(req);

    // If on login page and already authenticated -> redirect to dashboard
    if (pathname === "/admin/login") {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // If on any other admin route (or /admin root) and NOT authenticated -> redirect to login
    if (!isAuth) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // If at root /admin -> redirect to /admin/dashboard
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  }

  // 2. VISITOR LOGGING FOR PUBLIC PAGES
  // Skip static files, internal api calls, and asset bundles
  const isStatic =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("favicon.ico") ||
    pathname.includes(".") ||
    pathname.startsWith("/admin");

  if (!isStatic) {
    try {
      const forwardedFor = req.headers.get("x-forwarded-for");
      const realIp = req.headers.get("x-real-ip");
      const ip = (forwardedFor ? forwardedFor.split(",")[0].trim() : null) || realIp || "127.0.0.1";
      const userAgent = req.headers.get("user-agent") || "Unknown";

      // Non-blocking visitor log trigger to internal API
      const logUrl = new URL("/api/analytics/log", req.url);
      fetch(logUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          "x-forwarded-for": ip,
        },
        body: JSON.stringify({
          path: pathname,
          ip: ip,
        }),
      }).catch(() => {
        // Silently ignore async logging errors in middleware
      });
    } catch {
      // Ignore background fetch error
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
