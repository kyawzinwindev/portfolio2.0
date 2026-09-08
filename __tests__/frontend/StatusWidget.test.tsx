import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StatusWidget } from "@/components/portfolio/StatusWidget";

describe("StatusWidget", () => {
  it("renders the name and availability status", () => {
    render(
      <ThemeProvider>
        <StatusWidget clock="10:14 GMT+6:30" onToggleTheme={() => {}} />
      </ThemeProvider>,
    );

    expect(screen.getByText("Kyaw Zin Win")).toBeInTheDocument();
    expect(screen.getByText("open to work")).toBeInTheDocument();
    expect(screen.getByLabelText("Toggle dark mode")).toBeInTheDocument();
  });
});
