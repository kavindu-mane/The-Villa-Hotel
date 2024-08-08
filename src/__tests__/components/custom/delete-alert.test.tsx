import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { DeleteAlert } from "@/components";

test("should render delete alert", async () => {
  const yesAction = vi.fn();
  render(
    <DeleteAlert yesAction={yesAction}>
      <button>Delete</button>
    </DeleteAlert>,
  );

  expect(screen.getByText("Delete")).toBeInTheDocument();

  screen.getByText("Delete").click();

  expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
  expect(
    screen.getByText(
      "This action cannot be undone. This will permanently delete your data from our servers.",
    ),
  ).toBeInTheDocument();

  screen.getByText("Cancel").click();
  expect(yesAction).not.toHaveBeenCalled();

  screen.getByText("Delete").click();
  screen.getByText("Continue").click();
  expect(yesAction).toHaveBeenCalled();
});
