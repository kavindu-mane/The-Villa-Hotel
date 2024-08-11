import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Headings } from "@/components/custom/heading";

test("should render headings", async () => {
  render(<Headings title="Hello" description="World" />);

  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("World")).toBeInTheDocument();
});
