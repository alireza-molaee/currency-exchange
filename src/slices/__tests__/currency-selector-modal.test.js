import reducer, {
  openForSourceCurrency,
  openForDestinationCurrency,
  close,
  targetAccountSelector,
  accountTargets,
} from "../currency-selector-modal";
import { USD, EUR, GBP } from "../../utils/currencies";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    targetAccount: null,
    title: "",
    open: false,
  });
});

test("should open modal with suitable message for selecting source account", () => {
  const previousState = {
    targetAccount: null,
    title: "",
    open: false,
  };
  expect(reducer(previousState, openForSourceCurrency())).toEqual({
    targetAccount: "source-account",
    title: "Please select source account.",
    open: true,
  });
});

test("should open modal with suitable message for selecting destination account", () => {
  const previousState = {
    targetAccount: null,
    title: "",
    open: false,
  };
  expect(reducer(previousState, openForDestinationCurrency())).toEqual({
    targetAccount: "destination-account",
    title: "Please select destination account.",
    open: true,
  });
});

test("should reset state to close modal", () => {
  const previousState = {
    targetAccount: "destination-account",
    title: "Please select destination account.",
    open: true,
  };
  expect(reducer(previousState, close())).toEqual({
    targetAccount: null,
    title: "",
    open: false,
  });
});

test("should select target account and replace key with symbol", () => {
  const result = targetAccountSelector({
    currencySelectorModal: {
      targetAccount: "destination-account",
      title: "Please select destination account.",
      open: true,
    },
  });
  expect(result).toEqual(accountTargets.destination);
});
