import React from "react";
import styled from "styled-components";
import { CurrencySelector } from "./CurrencySelector";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;

  display: ${(props) => (props.open ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background: hsla(0, 0%, 0%, 0.5);
`;

const ModalContentWrapper = styled.div`
  box-shadow: 0.4rem 0.4rem 10.2rem 0.2rem hsla(236, 50%, 50%, 0.3);
  position: relative;
  overflow: hidden;
  border-radius: 15px;
`;

export const CurrencySelectorModal = ({ open, ...otherProps }) => {
  return (
    <ModalContainer open={open}>
      <ModalContentWrapper>
        <CurrencySelector {...otherProps} />
      </ModalContentWrapper>
    </ModalContainer>
  );
};
