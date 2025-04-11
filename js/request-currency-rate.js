async function requestCurrencyRate() {
  const base = requestBaseCurrency.value.toUpperCase();
  const target = requestTargetCurrency.value.toUpperCase();

  if ( base && target && (base === target)) {
    showErrorMessage(
      requestTargetCurrency,
      requestRateError,
      "You Have Entered The Same Currency!!"
    );
    return;
  }

  if (newCurrencyCheck(base, target) === "existed rate") {
    showErrorMessage(null, requestRateError, "This rate already exists!!");
    return;
  }

  //getting access_key and baseCurrency from api-variables to make url
  //request rate for both base and target as symbols for baseCurrency and then calculate the rate for base and target

  const requestUrl = `http://data.fixer.io/api/latest?access_key=${access_key}&base=${baseCurrency}&symbols=${base},${target}`;

  const response = await fetch(requestUrl);

  const data = await response.json();

  if (!data.success) {
    showErrorMessage(
      null,
      requestRateError,
      "The request did not complete due to an error or invalid inputs, try again please!"
    );
  } else if (!data.rates[base]) {
    showErrorMessage(requestBaseCurrency, requestRateError, "Invalid Input");
  } else if (!data.rates[target]) {
    showErrorMessage(requestTargetCurrency, requestRateError, "Invalid Input");
  } else if (
    newCurrencyCheck(base, target).status === "existed base new target"
  ) {
    //update currency object
    const index = newCurrencyCheck(base, target).index;
    currencyRates[index].rates[target] = data.rates[base] / data.rates[target];

    updateCurrencyInTable({
      base: base,
      target: target,
      rate: data.rates[base] / data.rates[target],
    });

    // update reverse rate
    let isTargetObjecExist = false;

    currencyRates.forEach((currencyObject, index) => {
      if (currencyObject.base === target) {
        currencyRates[index].rates[base] =
          data.rates[target] / data.rates[base];

        updateCurrencyInTable({
          base: target,
          target: base,
          rate: data.rates[target] / data.rates[base],
        });

        isTargetObjecExist = true;
      }
    });

    // creta new object for target
    if (!isTargetObjecExist) {
      const newTargetCurrencyObject = {
        timestamp: data.timestamp,
        base: target,
        date: data.date,
        rates: {
          [base]: data.rates[target] / data.rates[base],
        },
      };

      currencyRates.push(newTargetCurrencyObject);
      displayNewCurrencyInTable(newTargetCurrencyObject);
      updateFirstCurrencySelectorList(newTargetCurrencyObject.base, true);

      showSuccessMessage("New Conversion Rate Added!");
      requestBaseCurrency.value = "";
      requestTargetCurrency.value = "";
    }
  } else if (newCurrencyCheck(base, target) === "new rate") {
    const newCurrencyObject = {
      timestamp: data.timestamp,
      base: base,
      date: data.date,
      rates: {
        [target]: data.rates[base] / data.rates[target],
      },
    };

    currencyRates.push(newCurrencyObject);
    displayNewCurrencyInTable(newCurrencyObject);
    updateFirstCurrencySelectorList(newCurrencyObject.base, true);

    showSuccessMessage("New Conversion Rate Added!");
    requestBaseCurrency.value = "";
    requestTargetCurrency.value = "";

    // update reverse rate
    let isTargetObjecExist = false;

    currencyRates.forEach((currencyObject, index) => {
      if (currencyObject.base === target) {
        currencyRates[index].rates[base] =
          data.rates[target] / data.rates[base];

        updateCurrencyInTable({
          base: target,
          target: base,
          rate: data.rates[target] / data.rates[base],
        });

        isTargetObjecExist = true;
      }
    });
    
    // creta new object for target
    if (!isTargetObjecExist) {
      const newTargetCurrencyObject = {
        timestamp: data.timestamp,
        base: target,
        date: data.date,
        rates: {
          [base]: data.rates[target] / data.rates[base],
        },
      };

      currencyRates.push(newTargetCurrencyObject);
      displayNewCurrencyInTable(newTargetCurrencyObject);
      updateFirstCurrencySelectorList(newTargetCurrencyObject.base, true);

      showSuccessMessage("New Conversion Rate Added!");
      requestBaseCurrency.value = "";
      requestTargetCurrency.value = "";
    }
  }
}

function newCurrencyCheck(base, target) {
  for (let i = 0; i < currencyRates.length; i++) {
    if (currencyRates[i].base === base) {
      for (targetCurrency in currencyRates[i].rates) {
        if (targetCurrency === target) {
          return "existed rate";
        }
      }
      return { status: "existed base new target", index: i };
    }
  }
  return "new rate";
}
