import { Button } from "..";
import { render } from "@testing-library/react";

test("button should exist", () => {
  const { getByRole } = render(<Button>Test Button</Button>);
  expect(getByRole("button")).toBeInTheDocument();
});

test("button could be disabled", () => {
  const label = "Test Button";
  const { getByText } = render(<Button disabled>{label}</Button>);
  expect(getByText(label)).toBeDisabled();
});
