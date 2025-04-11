const access_key = "3f1dc98ee887872f7cc7e81b57a8703f";
const baseCurrency = "EUR"
const primaryTargetCurrencyList = [
  "USD",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "NZD",
];

const url = `http://data.fixer.io/api/latest?access_key=${access_key}&base=${baseCurrency}&symbols=${primaryTargetCurrencyList}`;


