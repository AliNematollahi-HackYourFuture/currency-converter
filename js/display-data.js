function displayData() {
  // Get data from API
  fetch(
    "https://raw.githubusercontent.com/AliNematollahi-HackYourFuture/AliNematollahi-HackYourFuture.github.io/refs/heads/main/data/currency-rates.json"
  )
    .then((response) => response.text())
    .then((data) => {
      const myData = JSON.parse(data);

      myData.currencyRates.forEach((currencyObject) => {
        currencyRates.push(currencyObject);
      });
    })
    .then(() => {
      currencyRates.forEach((newCurrencyObject) => {
        // Display currencies table
        tabelContainer.style.display = "block";
        displayNewCurrencyInTable(newCurrencyObject);

        // Update selectors in converter and alert part
        updateFirstCurrencySelectorList(newCurrencyObject.base, true);
      });
    });
}
