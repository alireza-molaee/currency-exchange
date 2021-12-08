import { Modal } from "..";
import { render, screen } from "@testing-library/react";

const modalRootElem = document.createElement("div");
modalRootElem.id = "modal-root";

beforeAll(() => {
  document.body.appendChild(modalRootElem);
});

afterAll(() => {
  document.body.removeChild(modalRootElem);
});

test("modal children should be exist in document", () => {
  render(
    <Modal>
      <div data-testid="test-element" />
    </Modal>
  );
  expect(screen.getByTestId("test-element")).toBeInTheDocument();
});
