import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  verifyPassword,
  signSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Lookup user by email (case-insensitive)
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password credentials" },
        { status: 401 }
      );
    }

    // Verify bcrypt password
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password credentials" },
        { status: 401 }
      );
    }

    // Sign session token
    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        user: { id: user.id, email: user.email },
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Auth login error:", error);
    return NextResponse.json(
      { error: "Internal server authentication error" },
      { status: 500 }
    );
  }
}
