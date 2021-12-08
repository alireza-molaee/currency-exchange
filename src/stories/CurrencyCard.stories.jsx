import React from "react";
import { CurrencyCard } from "../components/CurrencyCard";
import { USD, EUR, GBP } from "../utils/currencies";
import "../index.css";

export default {
  title: "CurrencyCard",
  component: CurrencyCard,
};

export const WithoutExchangeAmount = () => {
  return <CurrencyCard currency={USD} balance="4270500" />;
};

export const WithNegativeExchangeAmount = () => {
  return (
    <CurrencyCard currency={EUR} balance="4270500" exchangeAmount="-240200" />
  );
};

export const WithPositiveExchangeAmount = () => {
  return (
    <CurrencyCard currency={GBP} balance="4270500" exchangeAmount="240200" />
  );
};
