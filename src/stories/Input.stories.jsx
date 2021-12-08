import React from "react";
import { Input } from "../components/Input";
import { USD, EUR } from "../utils/currencies";
import "../index.css";

export default {
  title: "Input",
  component: Input,
};

export const Normal = () => {
  return <Input placeholder="Sample" />;
};

export const CurrencyInput = () => {
  return <Input currency={USD} />;
};

export const WithPlus = () => {
  return <Input currency={EUR} plus />;
};

export const WithMinus = () => {
  return <Input minus />;
};
