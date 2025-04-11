// Currency Converter

function convert() {
  if (firstCurrencyAmount.value <= 0) {
    showErrorMessage(firstCurrencyAmount, convertError, "Invalid Amount");
  } else {
    const firstCurrency = firstCurrencyList.value;
    const secondCurrency = secondCurrencyList.value;
    const rate = currencyRates.find((item) => item.base === firstCurrency)
      .rates[secondCurrency];
    const secondCurrencyAmount = rate * Number(firstCurrencyAmount.value);

    result.style.display = "block";
    result.innerText = `${firstCurrencyAmount.value} ${firstCurrency} is equal to ${customRound(secondCurrencyAmount)} ${secondCurrency}`;
  }
}
