import { AppTitle } from "../AppTitle";
import { render } from "@testing-library/react";

test("show text", () => {
  const text = "This is a test";
  const { getByText } = render(<AppTitle>{text}</AppTitle>);
  expect(getByText(text)).toBeInTheDocument();
});
