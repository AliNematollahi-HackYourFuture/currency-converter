function testGettingData(data) {
  if (!data) {
    logError("unable to get data");
    return false;
  } else if (!data.currencyRates) {
    logError("invalid data, unable to get data.currencyRates");
    return false;
  } else {
    for (let i = 0; i < data.currencyRates.length; i++) {
      if (
        !data.currencyRates[i].base ||
        !data.currencyRates[i].rates ||
        !data.currencyRates[i].date ||
        !data.currencyRates[i].timestamp
      ) {
        logError(`invalid data on index '${i}'`);
        return false;
      }
    }

    return true;
  }
}

function logError(message) {
  console.error(message);
}
