import React from "react";
import { CurrencySelectorModal } from "../components/CurrencySelectorModal";
import { EUR, GBP, USD } from "../utils/currencies";
import "../index.css";

export default {
  title: "CurrencySelectorModal",
  component: CurrencySelectorModal,
};

export const Sample = () => {
  return (
    <CurrencySelectorModal
      open
      balances={{
        [USD]: "205108735",
        [EUR]: "205108735",
        [GBP]: "205108735",
      }}
      title="Sample currency selector"
    />
  );
};
