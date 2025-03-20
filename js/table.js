// Filling table cells

function updateTable(newCurrencyObject, updatingObject, changingRateObject) {
  if (newCurrencyObject) {
    // Filling table cells with new currency
    const currencyNameCell = document.createElement("td");
    currencyNameCell.innerText = newCurrencyObject.base;
    tableCurrencyNamesRow.appendChild(currencyNameCell);

    const listingDateCell = document.createElement("td");
    listingDateCell.innerText = newCurrencyObject.date;
    tableListingDateRow.appendChild(listingDateCell);

    const availableRatesCell = document.createElement("td");
    const availableRatesList = document.createElement("ul");

    // creating dynamic id to use for updating list
    availableRatesList.id = `${newCurrencyObject.base}-available-rates-list`;

    for (let rate in newCurrencyObject.rates) {
      const availableRateItem = document.createElement("li");
      availableRateItem.innerText = `${rate}: ${newCurrencyObject.rates[rate]}`;

      // creating dynamic id to use for changing rate cases
      availableRateItem.id = `${newCurrencyObject.base}-${rate}-exchange-rate`;

      availableRatesList.appendChild(availableRateItem);
    }
    availableRatesCell.appendChild(availableRatesList);
    tableAvailableRatesRow.appendChild(availableRatesCell);
  } else if (updatingObject) {
    // updating available rates list
    const id = `${updatingObject.base}-available-rates-list`;
    const availableRatesList = document.getElementById(id);
    const availableRateItem = document.createElement("li");

    // creating dynamic id to use for changing rate cases
    availableRateItem.id = `${updatingObject.base}-${updatingObject.target}-exchange-rate`;

    availableRateItem.innerText = `${updatingObject.target}: ${updatingObject.rate}`;
    availableRatesList.appendChild(availableRateItem);
  } else if (changingRateObject) {
    const id = `${changingRateObject.base}-${changingRateObject.target}-exchange-rate`;
    const rateToChange = document.getElementById(id);
    rateToChange.innerText = `${changingRateObject.target}: ${changingRateObject.rate}`;
  }
}
