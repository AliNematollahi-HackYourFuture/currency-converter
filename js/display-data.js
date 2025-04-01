function displayData() {
  // Get data from API
  fetch(
    "https://raw.githubusercontent.com/AliNematollahi-HackYourFuture/AliNematollahi-HackYourFuture.github.io/refs/heads/main/data/currency-rates.json"
  )
    .then((response) => response.json())
    .then((data) => {
      data.currencyRates.forEach((currencyObject) => {
        currencyRates.push(currencyObject);
      });

      currencyRates.forEach((newCurrencyObject) => {
        // Display currencies table
        tabelContainer.style.display = "block";
        displayNewCurrencyInTable(newCurrencyObject);

        // Update selectors in converter and alert part
        updateFirstCurrencySelectorList(newCurrencyObject.base, true);
      });
    });
}
