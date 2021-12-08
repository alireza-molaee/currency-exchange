import React from "react";
import styled, { css } from "styled-components";
import NumberFormat from "react-number-format";
import currencies from "../utils/currencies";

const inputStyle = (props) => css`
  width: 100%;
  max-width: 320px;
  color: #a6a9ac;
  font-size: 16px;
  line-height: 20px;
  outline: none;
  min-height: 28px;
  border-radius: 24px;
  padding: 8px 16px;
  background: #1a222a;
  box-shadow: 0 6px 6px rgb(0 118 255 / 10%);
  transition: all 0.1s ease 0s;
  border: 1px solid #294354;
  position: relative;

  &:focus {
    border: 2px solid rgb(0 118 255);
    box-shadow: 0 6px 20px rgb(0 118 255 / 20%);
  }
`;

const InputWrapper = styled.div`
  position: relative;

  ${(props) => {
    if (props.plus) {
      return css`
        &::before {
          content: "+";
          color: #1e9c3e;
          position: absolute;
          display: inline-block;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 100%;
          z-index: 100;
          font-size: 1.7em;
          padding-left: 15px;
          line-height: 33px;
        }

        & input {
          padding-left: 40px;
        }
      `;
    } else if (props.minus) {
      return css`
        &::before {
          content: "-";
          color: #c52323;
          position: absolute;
          display: inline-block;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 100%;
          z-index: 100;
          font-size: 1.7em;
          padding-left: 15px;
          line-height: 38px;
        }

        & > input {
          padding-left: 40px;
        }
      `;
    }
  }}
`;

const NormalInput = styled.input`
  ${inputStyle}
`;

const MaskInput = styled(NumberFormat)`
  ${inputStyle}
`;

export const Input = ({
  currency,
  plus = false,
  minus = false,
  ...otherProps
}) => {
  if (currency) {
    const currencyInfo = currencies[currency];
    return (
      <InputWrapper plus={plus} minus={minus}>
        <MaskInput
          thousandSeparator={true}
          prefix={currencyInfo.prefix || ""}
          {...otherProps}
        />
      </InputWrapper>
    );
  } else {
    return (
      <InputWrapper plus={plus} minus={minus}>
        <NormalInput {...otherProps} />
      </InputWrapper>
    );
  }
};
