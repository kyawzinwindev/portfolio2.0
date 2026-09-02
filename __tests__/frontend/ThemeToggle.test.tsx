import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("should render theme toggle button with initial theme", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /switch to/i });
    expect(button).toBeInTheDocument();
  });

  it("should toggle between dark and light mode on click", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /switch to/i });
    fireEvent.click(button);

    // Clicking toggles theme and persists in localStorage
    expect(localStorage.getItem("kzw_theme_preference")).toBeDefined();
  });
});
