import React from "react";
import { DotLabel } from "../components/DotLabel";
import "../index.css";

export default {
  title: "DotLabel",
  component: DotLabel,
};

export const Sample = () => {
  return <DotLabel>1 USD = 15.88 GBD</DotLabel>;
};
