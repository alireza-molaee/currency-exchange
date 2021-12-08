import { createSlice } from "@reduxjs/toolkit";

export const accountTargets = Object.freeze({
  source: Symbol.for("source-account"),
  destination: Symbol.for("destination-account"),
});

export const modalSlice = createSlice({
  name: "currencySelectorModal",
  initialState: {
    targetAccount: null,
    title: "",
    open: false,
  },
  reducers: {
    openForSourceCurrency: (state) => {
      state.targetAccount = Symbol.keyFor(accountTargets.source);
      state.title = "Please select source account.";
      state.open = true;
    },
    openForDestinationCurrency: (state) => {
      state.targetAccount = Symbol.keyFor(accountTargets.destination);
      state.title = "Please select destination account.";
      state.open = true;
    },
    close: (state) => {
      state.targetAccount = null;
      state.title = "";
      state.open = false;
    },
  },
});

export const targetAccountSelector = (state) => {
  return Symbol.for(state.currencySelectorModal.targetAccount);
};

export const { openForSourceCurrency, openForDestinationCurrency, close } =
  modalSlice.actions;

export default modalSlice.reducer;
