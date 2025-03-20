let IsGettingAlertsucceed = false;

function alertHandler() {
  getAlert();
  setAlertTable(IsGettingAlertsucceed);
  setAlertInterval(IsGettingAlertsucceed);
}

function getAlert() {
  const alertRateValue = Number(alertRate.value);

  // change IsGettingAlertsucceed value to false if it is true from previous time
  IsGettingAlertsucceed = false;

  let isItNewAlert = true;
  let alertIndex;
  alerts.forEach((alertItem, index) => {
    if (
      alertItem.base === alertBaseList.value &&
      alertItem.target === alertTargetList.value
    ) {
      isItNewAlert = false;
      alertIndex = index;
    }
  });

  if (!alertBaseList.value) {
    showErrorMessage(alertBaseList, alertError, "Select A Currency Please");
  } else if (!alertTargetList.value) {
    showErrorMessage(alertTargetList, alertError, "Select A Currency Please");
  } else if (alertRateValue <= 0) {
    showErrorMessage(alertRate, alertError, "Invalid Input");
  } else if (!isItNewAlert) {
    setAlertYesNoQuestionBox(
      alertIndex,
      alertRateValue,
      "An Alert Has Already Been Set For This Rate. Would You Like To Update It?!"
    );
  } else {
    alerts.push({
      id: `${alertBaseList.value}-${alertTargetList.value}`,
      base: alertBaseList.value,
      target: alertTargetList.value,
      rate: alertRateValue,
    });
    IsGettingAlertsucceed = true;

    showSuccessMessage(" Alert Set !!");

    alertBaseList.value = "";
    alertTargetList.value = "";
    alertRate.value = "";
  }
}

function setAlertInterval(isValid) {
  if (isValid) {
    for (const key of intervalMap.keys()) {
      stopInterval(key);
    }

    alerts.forEach((alertItem) => {
      const currentRate = currencyRates.find((obj) => {
        return obj.base === alertItem.base;
      }).rates[alertItem.target];
      const rowId = `${alertItem.base}-${alertItem.target}-row`;
      const alertRow = document.getElementById(rowId);
      const intervalId = `${alertItem.base}-${alertItem.target}-interval`;
      if (alertItem.rate > currentRate) {
        startInterval(
          intervalId,
          5000,
          true,
          alertItem.base,
          alertItem.target,
          alertItem.rate,
          alertRow
        );
      } else if (alertItem.rate < currentRate) {
        startInterval(
          intervalId,
          5000,
          false,
          alertItem.base,
          alertItem.target,
          alertItem.rate,
          alertRow
        );
      }
    });
  }
}

function startInterval(
  id,
  time,
  isIncrementalRate,
  base,
  target,
  rate,
  alertRow
) {
  const intervalId = setInterval(() => {
    const newCurrentRate = currencyRates.find((obj) => {
      return obj.base === base;
    }).rates[target];
    if (isIncrementalRate) {
      if (newCurrentRate >= rate) {
        alertRow.style.backgroundColor = "rgb(135, 223, 146)";
        alert(
          `You reached your wish rate. Now 1 ${base} is ${newCurrentRate} ${target}`
        );
        stopInterval(id);
      }
    } else {
      if (newCurrentRate <= rate) {
        alertRow.style.backgroundColor = "rgb(135, 223, 146)";
        alert(
          `You reached your wish rate. Now 1 ${base} is ${newCurrentRate} ${target}`
        );
        stopInterval(id);
      }
    }
  }, time);
  intervalMap.set(id, intervalId);
}

function stopInterval(id) {
  if (intervalMap.has(id)) {
    clearInterval(intervalMap.get(id));
    intervalMap.delete(id);
  }
}

function setAlertTable(isValid) {
  if (alerts.length <= 0) {
    alertTableContainer.style.display = "none";
  } else if (isValid) {
    alertTableContainer.style.display = "block";
    const alertTable = document.createElement("table");
    alertTable.classList.add("table");
    alertTableContainer.replaceChildren();
    alertTable.innerHTML = `<thead>
            <tr>
              <th>Base Currency</th>
              <th>Target Currency</th>
              <th>Speicfic Rate</th>
              <th>Remove Alert</th>
            </tr>
          </thead>
          <tbody id="alert-table-body"></tbody>
          `;
    alertTableContainer.appendChild(alertTable);
    const alertTableBody = document.getElementById("alert-table-body");

    alerts.forEach((alertItem) => {
      const alertRow = document.createElement("tr");
      alertRow.id = `${alertItem.base}-${alertItem.target}-row`;
      alertRow.innerHTML = `
                  <td>${alertItem.base}</td>
                  <td>${alertItem.target}</td>
                  <td>${alertItem.rate}</td>
                  <td><img id="${alertItem.id}" onClick="removeAlert(event)" src="./images/bin.png" class="pointer"></td>
                `;
      alertTableBody.appendChild(alertRow);
    });
  }
}

function removeAlert(event) {
  const base = event.target.id.split("-")[0];
  const target = event.target.id.split("-")[1];
  alerts = alerts.filter((alertItem) => {
    return !(alertItem.base === base && alertItem.target === target);
  });
  setAlertTable(true);
}
