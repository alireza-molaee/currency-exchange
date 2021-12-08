import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
// Import your own reducer
import currenciesReducer from "../slices/currencies";
import currencySelectorModalReducer from "../slices/currency-selector-modal";
import { configureStore } from "@reduxjs/toolkit";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        currencies: currenciesReducer,
        currencySelectorModal: currencySelectorModalReducer,
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
