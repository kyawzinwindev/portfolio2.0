import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroBoot from "@/components/HeroBoot";

describe("HeroBoot Component", () => {
  it("should render main display heading and system role", () => {
    render(<HeroBoot />);

    expect(screen.getByText(/KYAW ZIN WIN/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Full Stack engineer · System thinker · Myanmar/i)
    ).toBeInTheDocument();
  });

  it("should trigger palette open callback when ⌘K button is clicked", () => {
    const onOpenPaletteMock = jest.fn();
    render(<HeroBoot onOpenPalette={onOpenPaletteMock} />);

    const triggerBtn = screen.getByText(/open command palette/i);
    fireEvent.click(triggerBtn);

    expect(onOpenPaletteMock).toHaveBeenCalledTimes(1);
  });
});
