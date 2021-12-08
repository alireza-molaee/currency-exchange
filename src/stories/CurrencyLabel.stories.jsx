import React from "react";
import { CurrencyLabel } from "../components/CurrencyLabel";
import { USD, EUR, GBP } from "../utils/currencies";
import "../index.css";

export default {
  title: "currency",
  component: CurrencyLabel,
};

export const Dollar = () => {
  return <CurrencyLabel currency={USD} />;
};

export const Euro = () => {
  return <CurrencyLabel currency={EUR} />;
};

export const Pound = () => {
  return <CurrencyLabel currency={GBP} />;
};
