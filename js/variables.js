// Adding currency variables
const baseCurrencyName = document.getElementById("base-currency-name");
const targetCurrencyName = document.getElementById("target-currency-name");
const exchangeRate = document.getElementById("exchange-rate");
const addCurrencyBtn = document.getElementById("add-currency-btn");

// Currency converter variables
const firstCurrencyAmount = document.getElementById("first-currency-amount");
const firstCurrencyList = document.getElementById("first-currency-list");
const secondCurrencyList = document.getElementById("second-currency-list");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert-btn");

// Showing massage variables
const messageContainer = document.getElementById("message-container");
messageContainer.style.display = "none";
const messageText = document.getElementById("message-text");
const addError = document.getElementById("add-error");
const convertError = document.getElementById("convert-error");
const questionContainer = document.getElementById("question-container");
questionContainer.style.display = "none";
const questionText = document.getElementById("question-text");
const acceptBtn = document.getElementById("accept-btn");
const rejectBtn = document.getElementById("reject-btn");

// Table variables
const tabelContainer = document.getElementById("tabel-container");
tabelContainer.style.display = "none";
const tableCurrencyNamesRow = document.getElementById(
  "table-currency-names-row"
);
const tableListingDateRow = document.getElementById("table-listing-date-row");
const tableAvailableRatesRow = document.getElementById(
  "table-available-rates-row"
);

// Searching part variables
const fromCurrencyInput = document.getElementById("from-currency-input");
const toCurrencyInput = document.getElementById("to-currency-input");
const searchResult = document.getElementById("search-result");
const searchError = document.getElementById("search-error");
const changeBtn = document.getElementById("change-btn");
const searchBtn = document.getElementById("search-btn");

// announcement variables

const announcementContainer = document.getElementById("announcement-container");

// Alert part variables
const alertBaseList = document.getElementById("alert-base-list");
const alertTargetList = document.getElementById("alert-target-list");
const alertRate = document.getElementById("alert-rate");
const alertBtn = document.getElementById("alert-btn");
const alertTableContainer = document.getElementById("alert-table-container");
alertTableContainer.style.display = "none";
const alertError = document.getElementById("alert-error");
const intervalMap = new Map();

// other
const currencyRates = [];
let alerts = [];
