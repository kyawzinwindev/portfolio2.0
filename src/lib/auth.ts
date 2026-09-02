import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "./prisma";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "kzw_os_super_secret_jwt_key_92837492817498127391";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export interface SessionPayload {
  userId: string;
  email: string;
  role?: string;
  [key: string]: unknown;
}

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Compare plain password with hashed password
 */
export async function verifyPassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}

/**
 * Generate a signed JWT session token
 */
export async function signSessionToken(
  payload: { userId: string; email: string },
  expiresIn = "7d"
): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
}

/**
 * Verify JWT session token (Works in both Edge Runtime & Node.js)
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get current session from Next.js server context
 */
export async function getSessionUser(): Promise<{
  id: string;
  email: string;
} | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    const payload = await verifySessionToken(sessionCookie.value);
    if (!payload || !payload.userId) {
      return null;
    }

    // Verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });

    return user;
  } catch {
    return null;
  }
}

/**
 * Set the session cookie in response
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Clear the session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
