import { Label } from "..";
import { render } from "@testing-library/react";

test("show label", () => {
  const text = "This is a test";
  const { container } = render(<Label>{text}</Label>);
  expect(container.querySelector("label")).toHaveTextContent(text);
});
