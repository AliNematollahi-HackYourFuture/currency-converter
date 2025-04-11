async function getData() {
  try {
    //getting url from api-variables

    const response = await fetch(url);
    const data = await response.json();

    if (testGettingData(data)) {
      currencyRates.push(data);
    }

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
