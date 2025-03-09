const baseCurrencyName = document.querySelector("#base-currency-name");
const targetCurrencyName = document.querySelector("#target-currency-name");
const exchangeRate = document.querySelector("#exchange-rate");
const firstCurrencyAmount = document.querySelector("#first-currency-amount");
const firstCurrencyList = document.querySelector("#first-currency-list");
const secondCurrencyList = document.querySelector("#second-currency-list");
const result = document.querySelector("#result");
const newRate = document.querySelector("#new-rate");
const messageContainer = document.querySelector("#message-container");
messageContainer.style.display = "none";
const messageText = document.querySelector("#message-text");
const addError = document.querySelector("#add-error");
const convertError = document.querySelector("#convert-error");
const questionContainer = document.querySelector("#question-container");
questionContainer.style.display = "none";
const questionText = document.querySelector("#question-text");
const addCurrencyBtn = document.querySelector("#add-currency-btn");
const convertBtn = document.querySelector("#convert-btn");
const acceptBtn = document.querySelector("#accept-btn");
const rejectBtn = document.querySelector("#reject-btn");
const searchBtn = document.querySelector("#search-btn");
const tabelContainer = document.querySelector("#tabel-container");
tabelContainer.style.display = "none";
const tableCurrencyNamesRow = document.querySelector(
  "#table-currency-names-row"
);
const tableListingDateRow = document.querySelector("#table-listing-date-row");
const tableAvailableRatesRow = document.querySelector(
  "#table-available-rates-row"
);
const fromCurrencyInput = document.querySelector("#from-currency-input");
const toCurrencyInput = document.querySelector("#to-currency-input");
const searchResult = document.querySelector("#search-result");
const searchError = document.querySelector("#search-error");
const changeImg = document.querySelector("#change-img");

const currencyRates = [];

// Adding A New Currency

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

addCurrencyBtn.addEventListener("click", function (event) {
  event.preventDefault();

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
      setYesNoQuestionBox(
        existedCurrencyIndex,
        baseCurrencyNameValue,
        targetCurrencyNameValue,
        Number(exchangeRate.value),
        "The Exchange Rate Already Exists. Would You Like To Update It?!"
      );
      return;
    }
  });

  if (!baseCurrencyNameValue) {
    showErrorMessage(baseCurrencyName, addError, "Invalid Currency Name");
  } else if (!targetCurrencyNameValue) {
    showErrorMessage(targetCurrencyName, addError, "Invalid Currency Name");
  } else if (Number(exchangeRate.value) <= 0) {
    showErrorMessage(exchangeRate, addError, "Invalid Currency Rate");
  } else if (!isItNewCurrency && !isItSameTarget) {
    updateFirstCurrencySelectorList(baseCurrencyNameValue);
    updateFirstCurrencySelectorList(targetCurrencyNameValue);

    // updating the rates object
    currencyRates[existedCurrencyIndex].rates[targetCurrencyNameValue] = Number(
      exchangeRate.value
    );
    updateTable("", {
      base: baseCurrencyNameValue,
      target: targetCurrencyNameValue,
      rate: Number(exchangeRate.value),
    });

    reverseCurrencyRateHandler(baseCurrencyNameValue, targetCurrencyNameValue);

    showSuccessMessage("Currency Added !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  } else if (isItNewCurrency) {
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
    updateTable(currencyObject);
    reverseCurrencyRateHandler(baseCurrencyNameValue, targetCurrencyNameValue);

    showSuccessMessage("Currency Added !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  }
});

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
    updateTable("", {
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
    updateTable(currencyObject);
  }
}

// setting the first currency list

function updateFirstCurrencySelectorList(newCurrency) {
  let isNew = true;
  currencyRates.forEach((item) => {
    if (item.base === newCurrency) {
      isNew = false;
    }
  });
  if (isNew) {
    const currencyName = document.createElement("option");
    currencyName.value = newCurrency;
    currencyName.innerText = newCurrency;
    firstCurrencyList.appendChild(currencyName);
  }
}

// setting the second currency list according to chosen option in first currency list

firstCurrencyList.addEventListener("change", () => {
  secondCurrencyList.innerHTML = '<option value="">Select Currency</option>';
  const availableCurrencyRates = currencyRates.find((item) => {
    return item.base === firstCurrencyList.value;
  })?.rates;

  for (let currency in availableCurrencyRates) {
    const currencyName = document.createElement("option");
    currencyName.value = currency;
    currencyName.innerText = currency;
    secondCurrencyList.appendChild(currencyName);
  }
});

// Currency Converter

convertBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (firstCurrencyAmount.value <= 0) {
    showErrorMessage(firstCurrencyAmount, convertError, "Invalid Amount");
  } else {
    const firstCurrency = firstCurrencyList.value;
    const secondCurrency = secondCurrencyList.value;
    const rate = currencyRates.find((item) => item.base === firstCurrency)
      .rates[secondCurrency];
    const secondCurrencyAmount = rate * Number(firstCurrencyAmount.value);

    result.innerText = `${firstCurrencyAmount.value} of ${firstCurrency} is equal to ${secondCurrencyAmount} of ${secondCurrency}`;
  }
});

// Functions for Showing message to user

function showSuccessMessage(message) {
  messageContainer.style.display = "block";
  messageText.innerText = message;
  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

function setYesNoQuestionBox(index, base, target, exchangeRate, question) {
  questionContainer.style.display = "block";
  questionText.innerText = question;

  acceptBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";

    // updating exchange rate for base currency
    currencyRates[index].rates[target] = exchangeRate;

    // updating exchange rate for target currency (reverse)
    const targetCurrencyIndex = currencyRates.findIndex(
      (object) => object.base === target
    );
    targetCurrencyIndex === -1
      ? console.error("reverse currency adding fault")
      : (currencyRates[targetCurrencyIndex].rates[base] = 1 / exchangeRate);

    const changingRateObject = {
      base: base,
      target: target,
      rate: exchangeRate,
    };

    updateTable("", "", changingRateObject);

    const changingReverseRateObject = {
      base: target,
      target: base,
      rate: 1 / exchangeRate,
    };

    updateTable("", "", changingReverseRateObject);

    showSuccessMessage("Currency Rate Updated !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  });

  rejectBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
  });
}

function showErrorMessage(inputElement, messageElement, message) {
  inputElement.style.borderColor = "red";
  messageElement.innerText = message;
}

function removeErrorMessage(inputElement, messageElement) {
  inputElement.addEventListener("focus", () => {
    inputElement.style.borderColor = "black";
    messageElement.innerText = "";
  });
}

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

// search a  specific exchange rate

function searchExchangeRate() {
  const fromCurrencyInputValue = fromCurrencyInput.value.toUpperCase();
  const toCurrencyInputValue = toCurrencyInput.value.toUpperCase();

  const objectIndex = currencyRates.findIndex((CurrencyObject) => {
    return CurrencyObject.base === fromCurrencyInputValue;
  });

  if (objectIndex === -1) {
    showErrorMessage(fromCurrencyInput, searchError, "Invalid Currency");
  } else {
    const exchangeRate = currencyRates[objectIndex].rates[toCurrencyInputValue];
    if (!exchangeRate) {
      showErrorMessage(toCurrencyInput, searchError, "Invalid Currency");
    } else {
      searchResult.innerText = `1 ${fromCurrencyInputValue} is equal to ${exchangeRate} ${toCurrencyInputValue}`;
    }
  }
}

searchBtn.addEventListener("click", () => {
  searchExchangeRate();
});

changeImg.addEventListener("click", () => {
  const tempVariable = fromCurrencyInput.value;

  fromCurrencyInput.value = toCurrencyInput.value;
  toCurrencyInput.value = tempVariable;

  searchExchangeRate();
});

// calling functions

removeErrorMessage(baseCurrencyName, addError);
removeErrorMessage(targetCurrencyName, addError);
removeErrorMessage(exchangeRate, addError);
removeErrorMessage(firstCurrencyAmount, convertError);
removeErrorMessage(fromCurrencyInput, searchError);
removeErrorMessage(toCurrencyInput, searchError);
