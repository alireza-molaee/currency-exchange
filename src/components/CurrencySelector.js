import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import currencies from "../utils/currencies";
import { CurrencyLabel } from "./CurrencyLabel";
import { Button } from "./Button";
import NumberFormat from "react-number-format";
import { Text } from "./Text";

const SelectorContainer = styled.div`
  min-width: 320px;
  max-width: 450px;
  border-radius: 15px;
  background: #2a2f33;
  background-image: radial-gradient(
    circle at top right,
    #2d3337 0,
    #22252d 20%,
    #181b23 70%,
    #181b23 100%
  );
`;

const ItemWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  padding: 1rem;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: auto auto;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #294354;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  }

  ${(props) =>
    props.selected &&
    css`
      border: 2px solid rgb(0 118 255);
      background: rgb(0 118 255 / 25%);
    `}
`;

const HeaderItem = styled.li`
  display: grid;
  grid-template-columns: auto auto;
  padding: 0.5rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  & > button {
    margin-right: 10px;
  }
`;

const Balance = styled(NumberFormat)`
  color: #ffffff;
  font-size: 1em;
  text-align: center;
  vertical-align: middle;
  line-height: 29px;
`;

const HeaderText = styled.p`
  color: #ffffff;
  font-size: 1em;
  padding: 1rem;
  margin: 0;
  padding-top: 2rem;
`;

export const CurrencySelector = ({
  balances = {},
  title = "",
  value = null,
  onSelect,
  onCancel,
}) => {
  const [selectedCurrency, selectCurrency] = useState(value);
  useEffect(() => {
    selectCurrency(value);
  }, [value]);
  const handleClickSelect = () => {
    if (onSelect) onSelect(selectedCurrency);
  };
  const handleClickCancel = () => {
    if (onCancel) onCancel();
  };
  const items = Reflect.ownKeys(currencies).map((currency) => {
    const currencyInfo = currencies[currency];
    const isSelected = selectedCurrency === currency;
    const handleClickOnItem = () => {
      selectCurrency(currency);
    };
    return (
      <Item
        key={currencyInfo.code}
        selected={isSelected}
        onClick={handleClickOnItem}
      >
        <CurrencyLabel currency={currency} />
        <Balance
          value={balances[currency] || "0"}
          thousandSeparator
          displayType={"text"}
          prefix={currencyInfo.prefix || ""}
        />
      </Item>
    );
  });
  return (
    <SelectorContainer>
      <HeaderText>{title}</HeaderText>
      <ItemWrapper>
        <HeaderItem key="header">
          <Text>Currency</Text>
          <Text align="right">Balance</Text>
        </HeaderItem>
        {items}
      </ItemWrapper>
      <Footer>
        <Button onClick={handleClickSelect}>Select</Button>
        <Button onClick={handleClickCancel} secondary>
          Cancel
        </Button>
      </Footer>
    </SelectorContainer>
  );
};
