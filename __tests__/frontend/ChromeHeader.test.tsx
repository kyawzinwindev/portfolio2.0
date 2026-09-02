import React from "react";
import { render, screen } from "@testing-library/react";
import ChromeHeader from "@/components/ChromeHeader";
import { ThemeProvider } from "@/components/ThemeProvider";

describe("ChromeHeader Component", () => {
  it("should render domain title and online status indicator", () => {
    render(
      <ThemeProvider>
        <ChromeHeader />
      </ThemeProvider>
    );

    expect(screen.getByText("kyawzinwin.dev")).toBeInTheDocument();
    expect(screen.getByText("online")).toBeInTheDocument();
  });

  it("should include ThemeToggle inside chrome header", () => {
    render(
      <ThemeProvider>
        <ChromeHeader />
      </ThemeProvider>
    );

    const themeButton = screen.getByRole("button", { name: /switch to/i });
    expect(themeButton).toBeInTheDocument();
  });
});
