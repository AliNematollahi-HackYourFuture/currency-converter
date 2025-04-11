function calculateOtherRates(data) {
  for (currency in data.rates) {
    // create an object for new currency
    const currencyObject = {
      timestamp: data.timestamp,
      base: currency,
      date: data.date,
      rates: {
        EUR: 1 / data.rates[currency],
      },
    };

    // add new carrency rates
    Object.keys(data.rates).forEach((targetcurrency) => {
      if (targetcurrency !== currency) {
        currencyObject.rates[targetcurrency] =
          data.rates[targetcurrency] / data.rates[currency];
      }
    });

    currencyRates.push(currencyObject);
  }
}
