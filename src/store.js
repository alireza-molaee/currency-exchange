import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./slices/currencies";
import currencySelectorModalReducer from "./slices/currency-selector-modal";

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
    currencySelectorModal: currencySelectorModalReducer,
  },
});
