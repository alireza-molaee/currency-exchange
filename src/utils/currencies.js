import {
  faDollarSign,
  faEuroSign,
  faPoundSign,
} from "@fortawesome/free-solid-svg-icons";

export const USD = Symbol.for("USD");
export const EUR = Symbol.for("EUR");
export const GBP = Symbol.for("GBP");

const currencies = {
  [USD]: {
    icon: faDollarSign,
    color: "#2FB498",
    code: "USD",
    title: "Dollar",
    prefix: "$",
  },
  [EUR]: {
    icon: faEuroSign,
    color: "#246BFD",
    code: "EUR",
    title: "Euro",
    prefix: "€",
  },
  [GBP]: {
    icon: faPoundSign,
    color: "#FF2876",
    code: "GBP",
    title: "Pound",
    prefix: "£",
  },
};

export default currencies;
