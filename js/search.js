// search a  specific exchange rate

function searchExchangeRate() {
  const fromCurrencyInputValue = fromCurrencyInput.value.toUpperCase();
  const toCurrencyInputValue = toCurrencyInput.value.toUpperCase();

  const objectIndex = currencyRates.findIndex((CurrencyObject) => {
    return CurrencyObject.base === fromCurrencyInputValue;
  });

  const exchangeRate = currencyRates[objectIndex].rates[toCurrencyInputValue];
  if (objectIndex === -1 || !exchangeRate) {
    showErrorMessage(fromCurrencyInput, searchError, "Invalid Currency");
  } else {
    searchResult.innerText = `1 ${fromCurrencyInputValue} is equal to ${exchangeRate} ${toCurrencyInputValue}`;
  }
}

function chacngeHandler() {
  const tempVariable = fromCurrencyInput.value;

  fromCurrencyInput.value = toCurrencyInput.value;
  toCurrencyInput.value = tempVariable;
}
