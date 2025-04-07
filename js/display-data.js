async function displayData() {
  try {
    // Get data from API
    const data = await fetch(
      "https://raw.githubusercontent.com/AliNematollahi-HackYourFuture/AliNematollahi-HackYourFuture.github.io/refs/heads/main/data/currency-rates.json"
    );

    const myData = await data.json();

    if (testGettingData(myData)) {
      myData.currencyRates.forEach((currencyObject) => {
        currencyRates.push(currencyObject);
      });

      currencyRates.forEach((newCurrencyObject) => {
        // Display currencies table
        tabelContainer.style.display = "block";
        displayNewCurrencyInTable(newCurrencyObject);

        // Update selectors in converter and alert part
        updateFirstCurrencySelectorList(newCurrencyObject.base, true);
      });
    }
  } catch (error) {
    console.error(error);
  }
}
