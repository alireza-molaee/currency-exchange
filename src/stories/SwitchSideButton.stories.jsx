import React from "react";
import { SwitchSideButton } from "../components/SwitchSideButton";
import "../index.css";

export default {
  title: "SwitchSideButton",
  component: SwitchSideButton,
};

export const Horizontal = () => {
  return <SwitchSideButton />;
};

export const Vertical = () => {
  return <SwitchSideButton vertical />;
};
