import reducer, {
  swap,
  changeSendAmount,
  changeReceiveAmount,
  changeSourceAccount,
  changeDestinationAccount,
  exchange,
  fetchExchangeRate,
  sourceAccountSelector,
  destinationAccountSelector,
} from "../currencies";
import { USD, EUR, GBP } from "../../utils/currencies";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  rest.get("https://freecurrencyapi.net/api/v2/latest", (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          USD: 1.5,
          EUR: 2,
          GBP: 3,
        },
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "1000",
      [Symbol.keyFor(EUR)]: "1000",
      [Symbol.keyFor(GBP)]: "1000",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "0",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "0",
    },
    exchangeRate: "1",
  });
});

test("should swap accounts", () => {
  const previousState = {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    exchangeRate: "2",
  };
  expect(reducer(previousState, swap())).toEqual({
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    destinationAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    exchangeRate: "0.5",
  });
});

test("should change send amount and calculate receive amount", () => {
  const previousState = {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    exchangeRate: "2",
  };
  expect(reducer(previousState, changeSendAmount("20"))).toEqual({
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "20",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "40",
    },
    exchangeRate: "2",
  });
});

test("should change receive amount and calculate send amount", () => {
  const previousState = {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    exchangeRate: "2",
  };
  expect(reducer(previousState, changeReceiveAmount("20"))).toEqual({
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "10",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "20",
    },
    exchangeRate: "2",
  });
});

test("should change source account and reset amounts", () => {
  const previousState = {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    exchangeRate: "2",
  };
  expect(reducer(previousState, changeSourceAccount("GBP"))).toEqual({
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(GBP),
      exchangeAmount: "0",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "0",
    },
    exchangeRate: "2",
  });
});

test("should change destination account and reset amounts", () => {
  const previousState = {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    exchangeRate: "2",
  };
  expect(reducer(previousState, changeDestinationAccount("GBP"))).toEqual({
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "0",
    },
    destinationAccount: {
      currency: Symbol.keyFor(GBP),
      exchangeAmount: "0",
    },
    exchangeRate: "2",
  });
});

test("should update accounts and reset amounts", () => {
  const previousState = {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    exchangeRate: "2",
  };
  expect(reducer(previousState, exchange())).toEqual({
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "95",
      [Symbol.keyFor(EUR)]: "110",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "0",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "0",
    },
    exchangeRate: "2",
  });
});

test("should update exchange rate by api call", () => {
  const previousState = {
    waiting: false,
    accounts: {
      [Symbol.keyFor(USD)]: "100",
      [Symbol.keyFor(EUR)]: "100",
      [Symbol.keyFor(GBP)]: "100",
    },
    sourceAccount: {
      currency: Symbol.keyFor(USD),
      exchangeAmount: "5",
    },
    destinationAccount: {
      currency: Symbol.keyFor(EUR),
      exchangeAmount: "10",
    },
    exchangeRate: "1",
  };
  const state = reducer(previousState, fetchExchangeRate());
  setTimeout(() => {
    expect(state).toEqual({
      waiting: false,
      accounts: {
        [Symbol.keyFor(USD)]: "100",
        [Symbol.keyFor(EUR)]: "100",
        [Symbol.keyFor(GBP)]: "100",
      },
      sourceAccount: {
        currency: Symbol.keyFor(USD),
        exchangeAmount: "5",
      },
      destinationAccount: {
        currency: Symbol.keyFor(EUR),
        exchangeAmount: "10",
      },
      exchangeRate: "2",
    });
  }, 200);
});

test("source account selector should select source account", () => {
  const result = sourceAccountSelector({
    currencies: {
      waiting: false,
      accounts: {
        [Symbol.keyFor(USD)]: "51354173",
        [Symbol.keyFor(EUR)]: "7153465",
        [Symbol.keyFor(GBP)]: "120",
      },
      sourceAccount: {
        currency: Symbol.keyFor(USD),
        exchangeAmount: "1",
      },
      destinationAccount: {
        currency: Symbol.keyFor(EUR),
        exchangeAmount: "2",
      },
      exchangeRate: "1",
    },
  });

  expect(Object.keys(result)).toEqual(["currency", "exchangeAmount"]);
  expect(result.exchangeAmount).toEqual("1");
});

test("source account selector should replace currency key with currency symbol", () => {
  const result = sourceAccountSelector({
    currencies: {
      waiting: false,
      accounts: {
        [Symbol.keyFor(USD)]: "51354173",
        [Symbol.keyFor(EUR)]: "7153465",
        [Symbol.keyFor(GBP)]: "120",
      },
      sourceAccount: {
        currency: Symbol.keyFor(USD),
        exchangeAmount: "1",
      },
      destinationAccount: {
        currency: Symbol.keyFor(EUR),
        exchangeAmount: "2",
      },
      exchangeRate: "1",
    },
  });
  expect(result.currency).toEqual(USD);
});

test("destination account selector should select source account", () => {
  const result = destinationAccountSelector({
    currencies: {
      waiting: false,
      accounts: {
        [Symbol.keyFor(USD)]: "100",
        [Symbol.keyFor(EUR)]: "100",
        [Symbol.keyFor(GBP)]: "100",
      },
      sourceAccount: {
        currency: Symbol.keyFor(USD),
        exchangeAmount: "1",
      },
      destinationAccount: {
        currency: Symbol.keyFor(EUR),
        exchangeAmount: "2",
      },
      exchangeRate: "1",
    },
  });

  expect(Object.keys(result)).toEqual(["currency", "exchangeAmount"]);
  expect(result.exchangeAmount).toEqual("2");
});

test("destination account selector should replace currency key with currency symbol", () => {
  const result = destinationAccountSelector({
    currencies: {
      waiting: false,
      accounts: {
        [Symbol.keyFor(USD)]: "100",
        [Symbol.keyFor(EUR)]: "100",
        [Symbol.keyFor(GBP)]: "100",
      },
      sourceAccount: {
        currency: Symbol.keyFor(USD),
        exchangeAmount: "1",
      },
      destinationAccount: {
        currency: Symbol.keyFor(EUR),
        exchangeAmount: "2",
      },
      exchangeRate: "1",
    },
  });
  expect(result.currency).toEqual(EUR);
});
