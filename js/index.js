// Fetching data from API, calculate rates, update table and selectors

getData().then((data) => {
  if (data) {
    calculateOtherRates(data);
    displayData();
  }
});

// side bar menu selectMenuItem

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    selectMenuItem(event);
  });
});

//

closeBtn.addEventListener('click',()=>{
  announcementContainer.style.display = "none"
})

// request
requestRateBtn.addEventListener("click", requestCurrencyRate);

// Adding currency exchange rate
addCurrencyBtn.addEventListener("click", addingCurrencyHandler);

// setting the second currency list according to chosen option in first currency list

firstCurrencyList.addEventListener("change", (event) => {
  updateSecondCurrencySelectorList(event, secondCurrencyList);
});

// Currency converter
convertBtn.addEventListener("click", convert);

// search a  specific exchange rate
searchBtn.addEventListener("click", searchExchangeRate);

changeBtn.addEventListener("click", () => {
  changeHandler();
  searchExchangeRate();
});

// calling messages functions
removeErrorMessage(baseCurrencyName, addError);
removeErrorMessage(targetCurrencyName, addError);
removeErrorMessage(exchangeRate, addError);
removeErrorMessage(firstCurrencyAmount, convertError);
removeErrorMessage(fromCurrencyInput, searchError);
removeErrorMessage(toCurrencyInput, searchError);
removeErrorMessage(alertBaseList, alertError);
removeErrorMessage(alertTargetList, alertError);
removeErrorMessage(alertRate, alertError);

// announcement
addEventListener("pageshow", announcementHandler);

// alert part
alertBaseList.addEventListener("change", (event) => {
  updateSecondCurrencySelectorList(event, alertTargetList);
});

alertBtn.addEventListener("click", alertHandler);
