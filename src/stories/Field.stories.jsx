import React from "react";
import { Field } from "../components/Field";
import { Input } from "../components/Input";
import "../index.css";

export default {
  title: "Field",
  component: Field,
};

export const Sample = () => {
  return (
    <Field label="Sample Field">
      <Input placeholder="sample text box" />
    </Field>
  );
};
