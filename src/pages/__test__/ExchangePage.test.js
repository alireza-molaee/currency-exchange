import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent } from "../../utils/test-utils";
import { ExchangePage } from "..";
import userEvent from "@testing-library/user-event";

export const handlers = [
  rest.get("https://freecurrencyapi.net/api/v2/latest", (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          USD: 4,
          EUR: 3,
          GBP: 2,
        },
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

const modalRootElem = document.createElement("div");
modalRootElem.id = "modal-root";

beforeAll(() => {
  document.body.appendChild(modalRootElem);
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  document.body.removeChild(modalRootElem);
  server.close();
});

test("change source account", async () => {
  render(<ExchangePage />);
  fireEvent.click(screen.getByText("Source account").lastChild);
  expect(
    await screen.findByText("Please select source account.")
  ).toBeInTheDocument();
  fireEvent.click(screen.getByText("GBP"));
  fireEvent.click(screen.getByText("Select"));
  expect(await screen.findByText("1 GBP = 3 EUR")).toBeInTheDocument();
  expect((await screen.findAllByTestId("currency-label"))[0]).toHaveTextContent(
    /GBP/i
  );
});

test("change destination account", async () => {
  render(<ExchangePage />);
  fireEvent.click(screen.getByText("Destination account").lastChild);
  expect(
    await screen.findByText("Please select destination account.")
  ).toBeInTheDocument();
  fireEvent.click(screen.getByText("GBP"));
  fireEvent.click(screen.getByText("Select"));
  expect(await screen.findByText(/1 USD = 2 GBP/i)).toBeInTheDocument();
  expect((await screen.findAllByTestId("currency-label"))[1]).toHaveTextContent(
    /GBP/i
  );
});

test("calculate receive amount by enter send amount", async () => {
  render(<ExchangePage />);
  expect(await screen.findByText("1 USD = 3 EUR")).toBeInTheDocument();
  const input = screen.getByLabelText("You Send:");
  userEvent.type(input, "10");
  const otherInput = screen.getByLabelText("You Receive:");
  expect(otherInput).toHaveValue("€30");
});

test("calculate send amount by enter receive amount", async () => {
  render(<ExchangePage />);
  expect(await screen.findByText("1 USD = 3 EUR")).toBeInTheDocument();
  const input = screen.getByLabelText("You Receive:");
  userEvent.type(input, "30");
  const otherInput = screen.getByLabelText("You Send:");
  expect(otherInput).toHaveValue("$10");
});

test("calculate source and destination account balance after enter send amount", async () => {
  render(<ExchangePage />);
  expect(await screen.findByText("1 USD = 3 EUR")).toBeInTheDocument();
  const input = screen.getByLabelText("You Send:");
  userEvent.type(input, "100");
  const newBalance = screen.getAllByTestId("new-balance");
  expect(newBalance[0]).toHaveTextContent("$900");
  expect(newBalance[1]).toHaveTextContent("€1,300");
});

test("calculate source and destination account balance after enter receive amount", async () => {
  render(<ExchangePage />);
  expect(await screen.findByText("1 USD = 3 EUR")).toBeInTheDocument();
  const input = screen.getByLabelText("You Receive:");
  userEvent.type(input, "300");
  const newBalance = screen.getAllByTestId("new-balance");
  expect(newBalance[0]).toHaveTextContent("$900");
  expect(newBalance[1]).toHaveTextContent("€1,300");
});

test("exchange should change balances", async () => {
  render(<ExchangePage />);
  expect(await screen.findByText("1 USD = 3 EUR")).toBeInTheDocument();
  const input = screen.getByLabelText("You Send:");
  userEvent.type(input, "100");
  fireEvent.click(screen.getByTestId("exchange-button"));
  const balances = screen.getAllByTestId("balance");
  expect(balances[0]).toHaveTextContent("$900");
  expect(balances[1]).toHaveTextContent("€1,300");
});
