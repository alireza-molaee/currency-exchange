import { Field } from "..";
import { render } from "@testing-library/react";

test("show label", () => {
  const label = "This is a test";
  const { container } = render(
    <Field label={label}>
      <input />
    </Field>
  );
  expect(container.querySelector("label")).toHaveTextContent(label);
});

test("show error", () => {
  const label = "This is a test";
  const { getByText } = render(
    <Field error={label}>
      <input />
    </Field>
  );
  expect(getByText(label));
});
