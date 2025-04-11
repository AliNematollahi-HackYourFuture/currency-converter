// sections variables
const converter = document.getElementById("converter");
converter.style.display = "none";

const request = document.getElementById("request");
request.style.display = "none";

const addRate = document.getElementById("add-rate");
addRate.style.display = "none";

const search = document.getElementById("search");
search.style.display = "none";

const addAlert = document.getElementById("add-alert");
addAlert.style.display = "none";

const appItems = document.querySelectorAll(".app-item");

// menu variables
const menuTable = document.getElementById("menu-table");
const menuConverter = document.getElementById("menu-converter");
const menuRequest = document.getElementById("menu-request");
const menuAddRate = document.getElementById("menu-add-rate");
const menuSearch = document.getElementById("menu-search");
const menuAlert = document.getElementById("menu-alert");

const menuItems = document.querySelectorAll(".side-bar");

// Adding currency variables
const baseCurrencyName = document.getElementById("base-currency-name");
const targetCurrencyName = document.getElementById("target-currency-name");
const exchangeRate = document.getElementById("exchange-rate");
const addCurrencyBtn = document.getElementById("add-currency-btn");

// request conversion rate for a new currency pair variables
const requestBaseCurrency = document.getElementById("request-base-currency");
const requestTargetCurrency = document.getElementById(
  "request-target-currency"
);
const requestRateBtn = document.getElementById("request-rate-btn");

// Currency converter variables
const firstCurrencyAmount = document.getElementById("first-currency-amount");
const firstCurrencyList = document.getElementById("first-currency-list");
const secondCurrencyList = document.getElementById("second-currency-list");
const result = document.getElementById("result");
result.style.display = "none";
const convertBtn = document.getElementById("convert-btn");

// Showing massage variables
const messageContainer = document.getElementById("message-container");
messageContainer.style.display = "none";
const messageText = document.getElementById("message-text");
const requestRateError = document.getElementById("request-rate-error");
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
const announcementText = document.getElementById("announcement-text");
const closeBtn =document.getElementById("close-btn");

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
