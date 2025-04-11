// Functions for Showing message to user

function showSuccessMessage(message) {
  messageContainer.style.display = "block";
  messageText.innerText = message;
  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

function setYesNoQuestionBox(index, base, target, newExchangeRate, question) {
  questionContainer.style.display = "block";
  questionText.innerText = question;

  acceptBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";

    // updating exchange rate for base currency
    currencyRates[index].rates[target] = newExchangeRate;

    // updating exchange rate for target currency (reverse)
    const targetCurrencyIndex = currencyRates.findIndex(
      (object) => object.base === target
    );
    targetCurrencyIndex === -1
      ? console.error("reverse currency adding fault")
      : (currencyRates[targetCurrencyIndex].rates[base] = 1 / newExchangeRate);

    const changingRateObject = {
      base: base,
      target: target,
      rate: newExchangeRate,
    };

    changeRateInTable( changingRateObject);

    const changingReverseRateObject = {
      base: target,
      target: base,
      rate: 1 / newExchangeRate,
    };

    changeRateInTable(changingReverseRateObject);

    showSuccessMessage("Currency Rate Updated !!");
    baseCurrencyName.value = "";
    targetCurrencyName.value = "";
    exchangeRate.value = "";
  });

  rejectBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
  });
}

function setAlertYesNoQuestionBox(index, newRate, question) {
  questionContainer.style.display = "block";
  questionText.innerText = question;

  acceptBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";

    alerts[index].rate = newRate;
    showSuccessMessage("The Alert Reset With New Rate !!");
    setAlertTable();
    setAlertInterval();

    alertBaseList.value = "";
    alertTargetList.value = "";
    alertRate.value = "";
  });

  rejectBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
  });
}

function showErrorMessage(inputElement, messageElement, message) {
  if(inputElement){
    inputElement.style.border = "3px solid red";
    inputElement.style.outline  = "2px solid white";
  }
  messageElement.innerText = message;
}

function removeErrorMessage(inputElement, messageElement) {
  inputElement.addEventListener("focus", () => {
    inputElement.style.border = "none";
    inputElement.style.outline  = "none";

    messageElement.innerText = "";
  });
}
