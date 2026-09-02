import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Save message to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        status: "UNREAD",
      },
    });

    const now = new Date();
    const formattedIso = now.toISOString().replace(/\.\d{3}Z$/, "Z");

    return NextResponse.json(
      {
        status: "received",
        statusCode: 200,
        reply_within: "24-48h",
        timestamp: formattedIso,
        id: contactMessage.id,
        sender: contactMessage.name,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process contact request" },
      { status: 500 }
    );
  }
}
