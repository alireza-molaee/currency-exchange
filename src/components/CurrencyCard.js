import React from "react";
import styled from "styled-components";
import { CurrencyLabel } from "./CurrencyLabel";
import currencies from "../utils/currencies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Color from "color";
import NumberFormat from "react-number-format";
import Decimal from "decimal.js";
import { Text } from "./Text";

const CardContainer = styled.div`
  min-width: 240px;
  height: 130px;
  border-radius: 15px;
  background: #2a2f33;
  background-image: radial-gradient(
    circle at top right,
    #2d3337 0,
    #22252d 20%,
    #181b23 70%,
    #181b23 100%
  );
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  }
`;

const CardIconWrapper = styled.div`
  opacity: 0.2;
  font-size: 80px;
  position: absolute;
  right: 10px;
  bottom: 0;
`;

const CardLabel = styled(Text)`
  font-size: 14px;
  font-weight: normal;
  margin-top: 15px;
  margin-bottom: 0;
`;

const Balance = styled.span`
  color: #ffffff;
  font-size: 1em;
  margin-top: 5px;
`;

const BalanceDiff = styled.span`
  color: ${(props) => (props.negative ? "#c52323" : "#1e9c3e")};
  font-size: 1em;

  &::before {
    content: "";
  }
`;

export const CurrencyCard = ({
  currency,
  balance,
  exchangeAmount,
  ...otherProps
}) => {
  const currencyInfo = currencies[currency];
  const iconColor = Color(currencyInfo.color).lightness(90).hex().toString();
  let balanceDiffNode = "";
  if (exchangeAmount && exchangeAmount !== "0") {
    const exchangeAmountIsNegative = new Decimal(exchangeAmount).lt(0);
    balanceDiffNode = (
      <BalanceDiff
        data-testid="new-balance"
        negative={exchangeAmountIsNegative}
      >
        <NumberFormat
          value={new Decimal(balance).add(exchangeAmount).toString()}
          thousandSeparator
          prefix={currencyInfo.prefix || ""}
          displayType={"text"}
        />
      </BalanceDiff>
    );
  }
  return (
    <CardContainer {...otherProps}>
      <CurrencyLabel data-testid="currency-label" currency={currency} />
      <CardIconWrapper>
        <FontAwesomeIcon icon={currencyInfo.icon} color={iconColor} />
      </CardIconWrapper>
      <CardLabel>Balance:</CardLabel>
      <Balance data-testid="balance">
        <NumberFormat
          value={balance}
          thousandSeparator
          prefix={currencyInfo.prefix || ""}
          displayType={"text"}
        />
      </Balance>
      {balanceDiffNode}
    </CardContainer>
  );
};
