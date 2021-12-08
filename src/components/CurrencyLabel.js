import React from "react";
import styled from "styled-components";
import currencies from "../utils/currencies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Color from "color";

const CurrencyIconWrapper = styled.span`
  display: inline-block;
  padding: 5px 15px;
  background-color: ${(props) => props.color};
  border-radius: 10%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 18px;
    height: 10px;
    border-radius: 50%;
    transform: translateX(-9px);
    background-color: transparent;
    box-shadow: 0 0px 18px ${(props) => props.color};
  }
`;

const CurrencyContainer = styled.span`
  display: inline-block;
`;

const CurrencyCode = styled.span`
  display: inline-block;
  margin-left: 5px;
  font-weight: bold;
  color: #fff;
`;

const CurrencyTitle = styled.span`
  display: inline-block;
  margin-left: 5px;
  font-weight: normal;
  font-size: 12px;
  color: #fff;
`;

export const CurrencyLabel = ({ currency, ...otherProps }) => {
  const currencyInfo = currencies[currency];
  const fontColor = Color(currencyInfo.color).lightness(90).hex().toString();
  return (
    <CurrencyContainer {...otherProps}>
      <CurrencyIconWrapper color={currencyInfo.color}>
        <FontAwesomeIcon icon={currencyInfo.icon} color={fontColor} />
      </CurrencyIconWrapper>
      <CurrencyCode>{currencyInfo.code}</CurrencyCode>
      <CurrencyTitle>({currencyInfo.title})</CurrencyTitle>
    </CurrencyContainer>
  );
};
