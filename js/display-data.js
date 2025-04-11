function displayData() {
  currencyRates.forEach((newCurrencyObject) => {
    // Display currencies table
    tabelContainer.style.display = "block";
    displayNewCurrencyInTable(newCurrencyObject);

    // Update selectors in converter and alert part
    updateFirstCurrencySelectorList(newCurrencyObject.base, true);
  });
}