/**
 * @jest-environment node
 */
import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    contactMessage: {
      create: jest.fn(),
    },
  },
}));

describe("POST /api/contact Route Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "test@example.com", message: "" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("required fields");
  });

  it("should return 400 for invalid email format", async () => {
    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "invalid-email",
        message: "Hello world",
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("valid email address");
  });

  it("should successfully create contact message and return 200 JSON", async () => {
    const mockMessage = {
      id: "msg-123",
      name: "Alex Doe",
      email: "alex@example.com",
      message: "Looking forward to collaborating on backend systems.",
      status: "UNREAD",
      createdAt: new Date(),
    };

    (prisma.contactMessage.create as jest.Mock).mockResolvedValue(mockMessage);

    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: mockMessage.name,
        email: mockMessage.email,
        message: mockMessage.message,
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe("received");
    expect(data.sender).toBe(mockMessage.name);
    expect(data.reply_within).toBe("24-48h");
    expect(prisma.contactMessage.create).toHaveBeenCalledWith({
      data: {
        name: mockMessage.name,
        email: mockMessage.email,
        message: mockMessage.message,
        status: "UNREAD",
      },
    });
  });
});
