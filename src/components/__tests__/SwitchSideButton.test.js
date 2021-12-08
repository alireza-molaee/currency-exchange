import { SwitchSideButton } from "..";
import { render, screen, fireEvent } from "@testing-library/react";

test("it should call callback function that pass to the onClick prop", () => {
  const mockFunc = jest.fn((x) => x);
  render(<SwitchSideButton onClick={mockFunc} />);
  fireEvent.click(screen.getByRole("button"));
  expect(mockFunc.mock.calls.length).toEqual(1);
});
