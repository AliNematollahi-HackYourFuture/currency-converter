const newCurrencyName = document.querySelector("#new-currency-name");
const newCurrencyRate = document.querySelector("#new-currency-rate");
const firstCurrencyAmount = document.querySelector("#first-currency-amount");
const firstCurrencyList = document.querySelector("#first-currency-list");
const secondCurrencyList = document.querySelector("#second-currency-list");
const result = document.querySelector("#result");
const editCurrencyList = document.querySelector("#edit-currency-list");
const newRate = document.querySelector("#new-rate");
const messageContainer = document.querySelector("#message-container");
messageContainer.style.display = "none";
const messageText = document.querySelector("#message-text");
const addError = document.querySelector("#add-error");
const convertError = document.querySelector("#convert-error");
const editError = document.querySelector("#edit-error");

let currencyRates = { rates: { EUR: 1 } };
const currencyList = ["EUR"];

// Adding A New Currency

function setDate() {
  const timestamp = Date.now();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return {
    timestamp: timestamp,
    date: `${year}-${month + 1}-${day}`,
  };
}

function addCurrency(event) {
  event.preventDefault();
  const newCurrencyNameValue = newCurrencyName.value.toUpperCase();
  if (currencyList.includes(newCurrencyNameValue)) {
    ShowErrorMessage(newCurrencyName, addError, "The Currency already exists");
  } else if (!newCurrencyNameValue) {
    ShowErrorMessage(newCurrencyName, addError, "Invalid Currency Name");
  } else if (Number(newCurrencyRate.value) <= 0) {
    ShowErrorMessage(newCurrencyRate, addError, "Invalid Currency Rate");
  } else {
    currencyRates.timestamp = setDate().timestamp;
    currencyRates.base = "EUR";
    currencyRates.date = setDate().date;
    currencyRates.rates[newCurrencyNameValue] = Number(newCurrencyRate.value);

    updateCrrencySelectorList(newCurrencyNameValue, firstCurrencyList);
    updateCrrencySelectorList(newCurrencyNameValue, secondCurrencyList);
    updateCrrencySelectorList(newCurrencyNameValue, editCurrencyList);

    currencyList.push(newCurrencyNameValue);

    showSuccessMessage("Currency Added !!");
    newCurrencyName.value = "";
    newCurrencyRate.value = "";
  }
}

// Currency Converter

function updateCrrencySelectorList(newCurrency, CurrencySelectorList) {
  if (!currencyList.includes(newCurrency)) {
    const currencyName = document.createElement("option");
    currencyName.value = newCurrency;
    currencyName.innerText = newCurrency;
    CurrencySelectorList.appendChild(currencyName);
  } else {
    console.error("Currency name validation error");
  }
}

function convert(event) {
  event.preventDefault();

  if (firstCurrencyAmount.value <= 0) {
    ShowErrorMessage(firstCurrencyAmount, convertError, "Invalid Amount");
  } else {
    const firstCurrency = firstCurrencyList.value;
    const secondCurrency = secondCurrencyList.value;
    const firstCurrencyRate = currencyRates.rates[firstCurrency];
    const secondCurrencyRate = currencyRates.rates[secondCurrency];
    const secondCurrencyAmount =
      (firstCurrencyRate / secondCurrencyRate) *
      Number(firstCurrencyAmount.value);
    result.innerText = `${firstCurrencyAmount.value} of ${firstCurrency} is equal to ${secondCurrencyAmount} of ${secondCurrency}`;
  }
}

// Edit Currency Rate

function editCurrencyRate(event) {
  event.preventDefault();

  if (newRate.value <= 0) {
    ShowErrorMessage(newRate, editError, "Invalid Input");
  } else {
    currencyRates.rates[editCurrencyList.value] = Number(newRate.value);
    showSuccessMessage("Currency Rate Changed !!");
  }
}

// Showing message to user

function showSuccessMessage(message) {
  messageContainer.style.display = "block";
  messageText.innerText = message;
  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

function ShowErrorMessage(inputElement, messageElement, message) {
  inputElement.style.borderColor = "red";
  messageElement.innerText = message;
}

function removeErrorMessage(inputElement, messageElement) {
  inputElement.addEventListener("focus", () => {
    inputElement.style.borderColor = "black";
    messageElement.innerText = "";
  });
}

// calling functions

removeErrorMessage(newCurrencyName, addError);
removeErrorMessage(newCurrencyRate, addError);
removeErrorMessage(firstCurrencyAmount, convertError);
removeErrorMessage(newRate, editError);
