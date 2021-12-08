import React from "react";
import styled from "styled-components";
import { Label } from "./Label";

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 250px;
`;

const FieldLabel = styled(Label)`
  padding-left: 0px;
  margin-bottom: 0.5rem;
`;

const Error = styled.p`
  color: #bb2626;
  font-size: 0.8em;
`;

export const Field = ({ label, error, htmlFor, children, otherProps }) => {
  return (
    <FieldContainer {...otherProps}>
      <FieldLabel htmlFor={htmlFor}>{label}:</FieldLabel>
      <div>{children}</div>
      {error && <Error>{error}</Error>}
    </FieldContainer>
  );
};
