import { DotLabel } from "..";
import { render } from "@testing-library/react";

test("show text", () => {
  const text = "This is a test";
  const { getByText } = render(<DotLabel>{text}</DotLabel>);
  expect(getByText(text)).toBeInTheDocument();
});
