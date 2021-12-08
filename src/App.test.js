import { render } from "@testing-library/react";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

test("render app without error", () => {
  render(
    <Provider store={store}>
      <App />
      <div id="modal-root"></div>
    </Provider>
  );
});
