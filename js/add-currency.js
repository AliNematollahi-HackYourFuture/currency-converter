function addingCurrencyHandler() {
  const baseCurrencyNameValue = baseCurrencyName.value.toUpperCase();
  const targetCurrencyNameValue = targetCurrencyName.value.toUpperCase();

  let isItNewCurrency = true;
  let isItSameTarget = false;
  let existedCurrencyIndex;

  if (baseCurrencyNameValue === targetCurrencyNameValue) {
    showErrorMessage(
      targetCurrencyName,
      addError,
      "You Have Entered The Same Currency!!"
    );
    return;
  }

  currencyRates.forEach((item, index) => {
    if (item.base === baseCurrencyNameValue) {
      isItNewCurrency = false;
      existedCurrencyIndex = index;
    }

    if (
      item.base === baseCurrencyNameValue &&
      targetCurrencyNameValue in item.rates
    ) {
      isItSameTarget = true;
      if (Number(exchangeRate.value) > 0) {
        setYesNoQuestionBox(
          existedCurrencyIndex,
          baseCurrencyNameValue,
          targetCurrencyNameValue,
          Number(exchangeRate.value),
          "The Exchange Rate Already Exists. Would You Like To Update It?!"
        );
      }
      return;
    }
  });

  // Checking invalid base currency value
  if (!baseCurrencyNameValue) {
    showErrorMessage(baseCurrencyName, addError, "Invalid Currency Name");
  }
  // Checking invalid target currency value
  else if (!targetCurrencyNameValue) {
    showErrorMessage(targetCurrencyName, addError, "Invalid Currency Name");
  }
  // Checking invalid exchange rate value
  else if (Number(exchangeRate.value) <= 0) {
    showErrorMessage(exchangeRate, addError, "Invalid Currency Rate");
  }
  // Adding a new rate to existed currency (existed base, new target)
  else if (!isItNewCurrency && !isItSameTarget) {
    updateFirstCurrencySelectorList(baseCurrencyNameValue);
    updateFirstCurrencySelectorList(targetCurrencyNameValue);

    // updating the rates object
    currencyRates[existedCurrencyIndex].rates[targetCurrencyNameValue] = Number(
      exchangeRate.value
    );
    updateCurrencyInTable({
      base: baseCurrencyNameValue,
      target: targetCurrencyNameValue,
      rate: Number(exchangeRate.value),
    });

    reverseCurrencyRateHandler(baseCurrencyNameValue, targetCurrencyNameValue);

    showSuccessMessage("Currency Added !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  }
  // Adding a new currency
  else if (isItNewCurrency) {
    updateFirstCurrencySelectorList(baseCurrencyNameValue);
    updateFirstCurrencySelectorList(targetCurrencyNameValue);

    // Adding new currency object
    const currencyObject = {
      timestamp: setDate().timestamp,
      base: baseCurrencyNameValue,
      date: setDate().date,
      rates: {
        [targetCurrencyNameValue]: Number(exchangeRate.value),
      },
    };

    currencyRates.push(currencyObject);

    tabelContainer.style.display = "block";
    displayNewCurrencyInTable(currencyObject);
    reverseCurrencyRateHandler(baseCurrencyNameValue, targetCurrencyNameValue);

    showSuccessMessage("Currency Added !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  }
}

function reverseCurrencyRateHandler(
  baseCurrencyNameValue,
  targetCurrencyNameValue
) {
  // checking for reverse currency rate
  const reverseCurrencyReateIndex = currencyRates.findIndex((item) => {
    return item.base === targetCurrencyNameValue;
  });

  if (reverseCurrencyReateIndex !== -1) {
    // Update currency object for reverse currency rate
    currencyRates[reverseCurrencyReateIndex].rates[baseCurrencyNameValue] =
      1 / Number(exchangeRate.value);
    updateCurrencyInTable( {
      base: targetCurrencyNameValue,
      target: baseCurrencyNameValue,
      rate: 1 / Number(exchangeRate.value),
    });
  } else {
    // Adding new currency object for reverse currency rate
    const currencyObject = {
      timestamp: setDate().timestamp,
      base: targetCurrencyNameValue,
      date: setDate().date,
      rates: {
        [baseCurrencyNameValue]: 1 / Number(exchangeRate.value),
      },
    };
    currencyRates.push(currencyObject);
    displayNewCurrencyInTable(currencyObject);
  }
}

function setDate() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return {
    timestamp: timestamp,
    date: `${year}-${month + 1}-${day}`,
  };
}

// setting the first currency list

function updateFirstCurrencySelectorList(newCurrency,isFetchedData) {
  let isNew = true;
  currencyRates.forEach((item) => {
    if (item.base === newCurrency) {
      isNew = false;
    }
  });
  if (isNew || isFetchedData) {
    // Adding option for first select list in convert part
    const currencyName = document.createElement("option");
    currencyName.value = newCurrency;
    currencyName.innerText = newCurrency;
    firstCurrencyList.appendChild(currencyName);

    // Adding option for first select list in alert part
    const alertCurrencyName = document.createElement("option");
    alertCurrencyName.value = newCurrency;
    alertCurrencyName.innerText = newCurrency;
    alertBaseList.appendChild(alertCurrencyName);
  }
}

function updateSecondCurrencySelectorList(event, selectorElement) {
  selectorElement.innerHTML = '<option value="">Select Currency</option>';
  const availableCurrencyRates = currencyRates.find((item) => {
    return item.base === event.target.value;
  })?.rates;

  for (let currency in availableCurrencyRates) {
    const currencyName = document.createElement("option");
    currencyName.value = currency;
    currencyName.innerText = currency;
    selectorElement.appendChild(currencyName);
  }
}
