import { CurrencyLabel } from "..";
import currencies, { USD } from "../../utils/currencies";
import { render } from "@testing-library/react";

test("it should show currency information", () => {
  const currencyInfo = currencies[USD];
  const { getByText } = render(<CurrencyLabel currency={USD} />);
  expect(getByText(currencyInfo.title, { exact: false })).toBeInTheDocument();
  expect(getByText(currencyInfo.code, { exact: false })).toBeInTheDocument();
});
