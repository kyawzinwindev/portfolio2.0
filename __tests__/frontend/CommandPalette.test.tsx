import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommandPalette from "@/components/CommandPalette";

describe("CommandPalette Component", () => {
  it("should render quick bar with trigger", () => {
    render(<CommandPalette />);

    expect(screen.getByText(/type a command/i)).toBeInTheDocument();
  });

  it("should open palette modal on trigger click and filter items", () => {
    render(<CommandPalette />);

    const quickBarTrigger = screen.getByText(/type a command/i);
    fireEvent.click(quickBarTrigger);

    const input = screen.getByPlaceholderText(
      /type a command or jump to system module/i
    );
    expect(input).toBeInTheDocument();

    // Type filter query
    fireEvent.change(input, { target: { value: "projects" } });
    const matchingItems = screen.getAllByText("projects.log");
    expect(matchingItems.length).toBeGreaterThanOrEqual(1);
  });
});
