function testGettingData(data) {
  if (!data) {
    logError("unable to get data");
    return false;
  } else if (!data.currencyRates) {
    logError("invalid data, unable to get data.currencyRates");
    return false;
  } else {
    data.currencyRates.forEach((currencyObject, index) => {
      if (
        !currencyObject.base ||
        !currencyObject.rates ||
        !currencyObject.date ||
        !currencyObject.timestamp
      ) {
        logError(`invalid data on index '${index}'`);
        return false;
      }
    });
    return true;
  }
}

function logError(message) {
  console.error(message);
}
