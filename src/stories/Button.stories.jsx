import React from "react";
import { Button } from "../components/Button";
import "../index.css";

export default {
  title: "Button",
  component: Button,
};

export const Primary = () => {
  return <Button>primary btn</Button>;
};

export const Secondary = () => {
  return <Button secondary>secondary btn</Button>;
};
