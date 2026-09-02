import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactEndpoint from "@/components/ContactEndpoint";

describe("ContactEndpoint Component", () => {
  beforeEach(() => {
    // Mock global fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render request and response panels with dynamic links", () => {
    render(
      <ContactEndpoint
        githubUrl="https://github.com/kyawzinwin"
        contactEmail="contact@kyawzinwin.dev"
      />
    );

    expect(screen.getByText("REQUEST")).toBeInTheDocument();
    expect(screen.getByText("RESPONSE")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("your.email@domain.com")
    ).toBeInTheDocument();
  });

  it("should submit form data and update response terminal with HTTP 200 payload", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        sender: "Jane Doe",
        reply_within: "24-48h",
        timestamp: "2025-01-15T12:00Z",
      }),
    });

    render(<ContactEndpoint />);

    fireEvent.change(screen.getByPlaceholderText("Your Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("your.email@domain.com"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Let's build something scalable..."),
      {
        target: { value: "Hello, interested in your backend services." },
      }
    );

    const submitBtn = screen.getByRole("button", { name: /send request/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
      expect(screen.getByText('"Jane Doe"')).toBeInTheDocument();
    });
  });
});
