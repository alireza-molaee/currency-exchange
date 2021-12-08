import React, { useEffect } from "react";
import {
  CurrencyCard,
  SwitchSideButton,
  Text,
  Field,
  Input,
  Button,
  DotLabel,
  Modal,
  CurrencySelectorModal,
  Container,
  Grid,
  GridItem,
  AppTitle,
  SingleCol,
  Link,
} from "../components";
import currencies from "../utils/currencies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Decimal from "decimal.js";
import {
  swap,
  changeSendAmount,
  changeReceiveAmount,
  changeSourceAccount,
  changeDestinationAccount,
  exchange,
  fetchExchangeRate,
  accountSelector,
  sourceAccountSelector,
  destinationAccountSelector,
} from "../slices/currencies";
import {
  close,
  openForSourceCurrency,
  openForDestinationCurrency,
  accountTargets,
  targetAccountSelector,
} from "../slices/currency-selector-modal";

export function ExchangePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, [dispatch]);
  const currencySelectorTarget = useSelector((state) =>
    targetAccountSelector(state)
  );
  const balances = useSelector((state) => accountSelector(state));
  const source = useSelector((state) => sourceAccountSelector(state));
  const destination = useSelector((state) => destinationAccountSelector(state));
  const modalOpenState = useSelector(
    (state) => state.currencySelectorModal.open
  );
  const modalTitle = useSelector((state) => state.currencySelectorModal.title);
  const exchangeRate = useSelector((state) => state.currencies.exchangeRate);
  const rateInfo = `1 ${currencies[source.currency].code} = ${new Decimal(
    exchangeRate
  )
    .toDecimalPlaces(4)
    .toString()} ${currencies[destination.currency].code}`;

  let error = null;
  if (new Decimal(source.exchangeAmount).gt(balances[source.currency])) {
    error = "This Amount is not valid. your balance could not be negative.";
  }
  const handleClickSwapButton = () => {
    dispatch(swap());
  };

  const handleSendAmountChange = ({ value }, { event }) => {
    if (event) {
      dispatch(changeSendAmount(value));
    }
  };

  const handleReceiveAmountChange = ({ value }, { event }) => {
    if (event) {
      dispatch(changeReceiveAmount(value));
    }
  };

  const handleSubmitExchange = () => {
    dispatch(exchange());
  };

  const handleClickToOpenSourceCurrencySelector = () => {
    dispatch(openForSourceCurrency());
  };

  const handleClickToOpenDestinationCurrencySelector = () => {
    dispatch(openForDestinationCurrency());
  };

  const currentCurrencyToChange =
    currencySelectorTarget === accountTargets.source
      ? source.currency
      : destination.currency;

  const handleSelectCurrency = (selectedCurrency) => {
    if (currencySelectorTarget === accountTargets.source) {
      dispatch(changeSourceAccount(Symbol.keyFor(selectedCurrency)));
      dispatch(close());
    }

    if (currencySelectorTarget === accountTargets.destination) {
      dispatch(changeDestinationAccount(Symbol.keyFor(selectedCurrency)));
      dispatch(close());
    }
    dispatch(fetchExchangeRate());
  };

  const handleCancelSelecting = () => {
    dispatch(close());
  };

  return (
    <Container>
      <AppTitle>Currency Exchange Prototype</AppTitle>
      <Grid>
        <GridItem>
          <Text fillArea align="center">
            Source account{" "}
            <Link onClick={handleClickToOpenSourceCurrencySelector}>
              (change)
            </Link>
          </Text>
          <CurrencyCard
            onClick={handleClickToOpenSourceCurrencySelector}
            currency={source.currency}
            balance={balances[source.currency]}
            exchangeAmount={new Decimal(source.exchangeAmount)
              .mul(-1)
              .toString()}
          />
        </GridItem>
        <GridItem>
          <SwitchSideButton onClick={handleClickSwapButton} vertical />
        </GridItem>
        <GridItem>
          <Text fillArea align="center">
            Destination account{" "}
            <Link onClick={handleClickToOpenDestinationCurrencySelector}>
              (change)
            </Link>
          </Text>
          <CurrencyCard
            onClick={handleClickToOpenDestinationCurrencySelector}
            currency={destination.currency}
            balance={balances[destination.currency]}
            exchangeAmount={destination.exchangeAmount}
          />
        </GridItem>
        <GridItem>
          <Field label="You Send" htmlFor="send-input" error={error}>
            <Input
              name="send"
              id="send-input"
              value={source.exchangeAmount}
              currency={source.currency}
              onValueChange={handleSendAmountChange}
              minus
            />
          </Field>
        </GridItem>
        <GridItem>
          <SingleCol>
            <DotLabel>{rateInfo}</DotLabel>
            <Button
              data-testid="exchange-button"
              disabled={!!error}
              onClick={handleSubmitExchange}
            >
              Exchange <FontAwesomeIcon icon={faExchangeAlt} />
            </Button>
          </SingleCol>
        </GridItem>
        <GridItem>
          <Field htmlFor="receive-input" label="You Receive">
            <Input
              name="receive"
              id="receive-input"
              value={destination.exchangeAmount}
              currency={destination.currency}
              onValueChange={handleReceiveAmountChange}
              plus
            />
          </Field>
        </GridItem>
      </Grid>
      <Modal>
        <CurrencySelectorModal
          value={currentCurrencyToChange}
          onSelect={handleSelectCurrency}
          onCancel={handleCancelSelecting}
          balances={balances}
          open={modalOpenState}
          title={modalTitle}
        />
      </Modal>
    </Container>
  );
}
