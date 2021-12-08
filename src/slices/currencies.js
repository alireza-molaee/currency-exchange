import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USD, EUR, GBP } from "../utils/currencies";
import Decimal from "decimal.js";
import axios from "axios";

export const fetchExchangeRate = createAsyncThunk(
  "currencies/fetchExchangeRate",
  async (payload, thunkApi) => {
    const state = thunkApi.getState();
    const sourceAccountCurrencyCode = state.currencies.sourceAccount.currency;
    const destinationAccountCurrencyCode =
      state.currencies.destinationAccount.currency;
    const response = await axios.get(
      "https://freecurrencyapi.net/api/v2/latest",
      {
        params: {
          apikey: "42a24ab0-5763-11ec-a45a-2f7a68c45389",
          base_currency: sourceAccountCurrencyCode,
        },
      }
    );
    return response.data.data[destinationAccountCurrencyCode];
  }
);

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "1000",
      [Symbol.keyFor(EUR)]: "1000",
      [Symbol.keyFor(GBP)]: "1000",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "0",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "0",
    },
    exchangeRate: "1",
  },
  reducers: {
    swap: (state) => {
      const sourceCopy = state.sourceAccount;
      state.sourceAccount = state.destinationAccount;
      state.destinationAccount = sourceCopy;
      state.exchangeRate = new Decimal(1).div(state.exchangeRate).toString();
    },
    changeSendAmount: (state, action) => {
      const newValue = action.payload;
      state.sourceAccount.exchangeAmount = newValue || "0";
      state.destinationAccount.exchangeAmount = newValue
        ? new Decimal(newValue)
            .mul(state.exchangeRate)
            .toDecimalPlaces(4)
            .toString()
        : "0";
    },
    changeReceiveAmount: (state, action) => {
      const newValue = action.payload;
      state.destinationAccount.exchangeAmount = newValue || "0";
      state.sourceAccount.exchangeAmount = newValue
        ? new Decimal(newValue)
            .div(state.exchangeRate)
            .toDecimalPlaces(4)
            .toString()
        : "0";
    },
    changeSourceAccount: (state, action) => {
      const value = action.payload;
      state.sourceAccount.currency = value;
      state.sourceAccount.exchangeAmount = "0";
      state.destinationAccount.exchangeAmount = "0";
    },
    changeDestinationAccount: (state, action) => {
      const value = action.payload;
      state.destinationAccount.currency = value;
      state.sourceAccount.exchangeAmount = "0";
      state.destinationAccount.exchangeAmount = "0";
    },
    exchange: (state) => {
      const { currency: sourceCurrency, exchangeAmount: sourceExchangeAmount } =
        state.sourceAccount;
      const {
        currency: destinationCurrency,
        exchangeAmount: destinationExchangeAmount,
      } = state.destinationAccount;

      state.destinationAccount.exchangeAmount = "0";
      state.sourceAccount.exchangeAmount = "0";

      state.accounts[sourceCurrency] = new Decimal(
        state.accounts[sourceCurrency]
      )
        .minus(sourceExchangeAmount)
        .toString();

      state.accounts[destinationCurrency] = new Decimal(
        state.accounts[destinationCurrency]
      )
        .plus(destinationExchangeAmount)
        .toString();
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchExchangeRate.pending, (state, action) => {
      state.waiting = true;
    });
    builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
      state.waiting = false;
      state.exchangeRate = action.payload.toString();
    });
    builder.addCase(fetchExchangeRate.rejected, (state, action) => {
      state.waiting = false;
      console.error(action.error.message);
    });
  },
});

export const accountSelector = (state) => {
  return Object.entries(state.currencies.accounts).reduce(
    (resultObj, [currencyKey, balance]) => {
      resultObj[Symbol.for(currencyKey)] = balance;
      return resultObj;
    },
    {}
  );
};

export const sourceAccountSelector = (state) => {
  const sourceAccount = { ...state.currencies.sourceAccount };
  sourceAccount.currency = Symbol.for(sourceAccount.currency);
  return sourceAccount;
};

export const destinationAccountSelector = (state) => {
  const destinationAccount = { ...state.currencies.destinationAccount };
  destinationAccount.currency = Symbol.for(destinationAccount.currency);
  return destinationAccount;
};

export const {
  swap,
  changeSendAmount,
  changeReceiveAmount,
  exchange,
  changeSourceAccount,
  changeDestinationAccount,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
