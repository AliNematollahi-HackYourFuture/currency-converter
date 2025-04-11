function testGettingData(data) {
  if (!data) {
    logError("unable to get data");
    return false;
  } else {
      if (
        !data.base ||
        !data.rates ||
        !data.date ||
        !data.timestamp
      ) {
        logError(`invalid data`);
        return false;
      }
    return true;
  }
}

function logError(message) {
  console.error(message);
}
