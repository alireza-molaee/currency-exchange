import { CurrencyCard } from "..";
import currencies, { USD } from "../../utils/currencies";
import { render } from "@testing-library/react";

test("it should show currency information", () => {
  const currencyInfo = currencies[USD];
  const { getByText } = render(<CurrencyCard currency={USD} />);
  expect(getByText(currencyInfo.title, { exact: false })).toBeInTheDocument();
  expect(getByText(currencyInfo.code, { exact: false })).toBeInTheDocument();
});

test("it should show balance with thousands separated", () => {
  const currencyInfo = currencies[USD];
  const { getByText } = render(
    <CurrencyCard currency={USD} balance="10000.01" />
  );
  expect(getByText(currencyInfo.prefix + "10,000.01")).toBeInTheDocument();
});

test("it should show new balance with positive exchange amount in thousands separated format", () => {
  const currencyInfo = currencies[USD];
  const { getByText } = render(
    <CurrencyCard currency={USD} balance="10001.01" exchangeAmount="1" />
  );
  expect(getByText(currencyInfo.prefix + "10,001.01")).toBeInTheDocument();
});

test("it should show new balance with negative exchange amount in thousands separated format", () => {
  const currencyInfo = currencies[USD];
  const { getByText } = render(
    <CurrencyCard currency={USD} balance="10001.01" exchangeAmount="-1" />
  );
  expect(getByText(currencyInfo.prefix + "10,000.01")).toBeInTheDocument();
});

test("it should not show new balance with zero exchange amount", () => {
  const currencyInfo = currencies[USD];
  const { queryAllByText } = render(
    <CurrencyCard currency={USD} balance="10000.01" exchangeAmount="0" />
  );
  expect(queryAllByText(currencyInfo.prefix + "10,000.01").length).toEqual(1);
});
