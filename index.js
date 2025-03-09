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

addCurrencyBtn.addEventListener("click", function addCurrency(event) {
  event.preventDefault();

  const baseCurrencyNameValue = baseCurrencyName.value.toUpperCase();
  const targetCurrencyNameValue = targetCurrencyName.value.toUpperCase();

  let isItNewCurrency = true;
  let existedCurrencyIndex;

  currencyRates.forEach((item, index) => {
    if (item.base === baseCurrencyNameValue) {
      isItNewCurrency = false;
      existedCurrencyIndex = index;
    }
    if (
      item.base === baseCurrencyNameValue &&
      targetCurrencyNameValue in item.rates
    ) {
      setYesNoQuestionBox(
        existedCurrencyIndex,
        baseCurrencyNameValue,
        targetCurrencyNameValue,
        Number(exchangeRate.value),
        "The Exchange Rate Already Exists. Would You Like To Update It?!"
      );
      // .then((isAccepted) => {
      //   if (isAccepted) {
      //     item.rates[targetCurrencyNameValue] = Number(exchangeRate.value);
      //     showSuccessMessage("Currency Rate Updated !!");
      //     baseCurrencyName.value = "";
      //     targetCurrencyName.value = "";
      //     exchangeRate.value = "";
      //   }
      // });
    }
    return
  });

  if (!baseCurrencyNameValue) {
    showErrorMessage(baseCurrencyName, addError, "Invalid Currency Name");
  } else if (!targetCurrencyNameValue) {
    showErrorMessage(targetCurrencyName, addError, "Invalid Currency Name");
  } else if (Number(exchangeRate.value) <= 0) {
    showErrorMessage(exchangeRate, addError, "Invalid Currency Rate");
  } else if (!isItNewCurrency) {
    updateFirstCurrencySelectorList(baseCurrencyNameValue);
    updateFirstCurrencySelectorList(targetCurrencyNameValue);

    // updating the rates object
    currencyRates[existedCurrencyIndex].rates[targetCurrencyNameValue] = Number(
      exchangeRate.value
    );
    reverseCurrencyRateHandler(baseCurrencyNameValue, targetCurrencyNameValue);

    showSuccessMessage("Currency Added !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  } else {
    updateFirstCurrencySelectorList(baseCurrencyNameValue);
    updateFirstCurrencySelectorList(targetCurrencyNameValue);

    // Adding new currency object
    currencyRates.push({
      timestamp: setDate().timestamp,
      base: baseCurrencyNameValue,
      date: setDate().date,
      rates: {
        [targetCurrencyNameValue]: Number(exchangeRate.value),
      },
    });

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
  } else {
    // Adding new currency object for reverse currency rate
    currencyRates.push({
      timestamp: setDate().timestamp,
      base: targetCurrencyNameValue,
      date: setDate().date,
      rates: {
        [baseCurrencyNameValue]: 1 / Number(exchangeRate.value),
      },
    });
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

convertBtn.addEventListener("click", function convert(event) {
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

function setYesNoQuestionBox(index, base, target,exchangeRate, question) {
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
      : (currencyRates[targetCurrencyIndex].rates[base] =
          1 / exchangeRate);

          console.log("currencyRates", currencyRates);

    showSuccessMessage("Currency Rate Updated !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  });

  rejectBtn.addEventListener("click", () => {
        questionContainer.style.display = "none";
      });

  // return new Promise((resolve) => {
  //   acceptBtn.addEventListener("click", () => {
  //     questionContainer.style.display = "none";
  //     resolve(true);
  //   });
  //   rejectBtn.addEventListener("click", () => {
  //     questionContainer.style.display = "none";
  //     resolve(false);
  //   });
  // });
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

// calling functions

//addCurrencyBtn.addEventListener('click',addCurrency(event))

removeErrorMessage(baseCurrencyName, addError);
removeErrorMessage(targetCurrencyName, addError);
removeErrorMessage(exchangeRate, addError);
removeErrorMessage(firstCurrencyAmount, convertError);
