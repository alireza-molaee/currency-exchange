import { CurrencySelector } from "..";
import { render, fireEvent, screen } from "@testing-library/react";
import currencies, { USD, EUR, GBP } from "../../utils/currencies";

test("it should render all available currencies as option", () => {
  const options = Object.getOwnPropertySymbols(currencies);
  const { container } = render(<CurrencySelector />);
  expect(container.querySelectorAll("li").length).toEqual(options.length + 1);
});

test("it should have cancel and select button", () => {
  const { getByText } = render(<CurrencySelector />);
  expect(getByText("Select")).toBeInTheDocument();
  expect(getByText("Cancel")).toBeInTheDocument();
});

test("it should call onSelect callback function with correct value when click on select", () => {
  const mockFunc = jest.fn((x) => x);
  render(<CurrencySelector onSelect={mockFunc} />);
  fireEvent.click(screen.getByText("USD"));
  fireEvent.click(screen.getByText("Select"));

  expect(mockFunc.mock.calls.length).toEqual(1);
  expect(mockFunc.mock.results[0].value).toBe(USD);
});

test("it should call onCancel callback function  when click on cancel", () => {
  const mockFunc = jest.fn((x) => x);
  render(<CurrencySelector onCancel={mockFunc} />);
  fireEvent.click(screen.getByText("USD"));
  fireEvent.click(screen.getByText("Cancel"));

  expect(mockFunc.mock.calls.length).toEqual(1);
});

test("it should show balances", () => {
  const balances = {
    [USD]: "110000",
    [EUR]: "120000",
    [GBP]: "10.5",
  };
  const { getByText } = render(<CurrencySelector balances={balances} />);

  expect(getByText(currencies[USD].prefix + "110,000")).toBeInTheDocument();
  expect(getByText(currencies[EUR].prefix + "120,000")).toBeInTheDocument();
  expect(getByText(currencies[GBP].prefix + "10.5")).toBeInTheDocument();
});

test("it should call onSelect callback function with init value when click on select without select another option", () => {
  const mockFunc = jest.fn((x) => x);
  render(<CurrencySelector onSelect={mockFunc} value={EUR} />);
  fireEvent.click(screen.getByText("Select"));

  expect(mockFunc.mock.calls.length).toEqual(1);
  expect(mockFunc.mock.results[0].value).toBe(EUR);
});
