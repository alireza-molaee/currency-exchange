import { Link } from "..";
import { render } from "@testing-library/react";

test("show text", () => {
  const text = "This is a test";
  const { getByText } = render(<Link>{text}</Link>);
  expect(getByText(text));
});
