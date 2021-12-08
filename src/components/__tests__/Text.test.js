import { Text } from "..";
import { render } from "@testing-library/react";

test("show text", () => {
  const text = "This is a test";
  const { getByText } = render(<Text>{text}</Text>);
  expect(getByText(text));
});
