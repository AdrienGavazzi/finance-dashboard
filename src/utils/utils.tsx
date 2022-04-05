const variables = {
  etf: "etf",
  etfHistory: "etfhistory",
};

export function setEtfStorage(data: any) {
  localStorage.setItem(variables.etf, data);
}

export function getEtfStorage(): any {
  return localStorage.getItem(variables.etf);
}

export function setEtfHistoryStorage(data: any) {
  localStorage.setItem(variables.etfHistory, data);
}

export function getEtfHistoryStorage(): any {
  return localStorage.getItem(variables.etfHistory);
}

export function setToken(token: any) {
  return localStorage.setItem("token", token);
}

export function getToken(): any {
  return localStorage.getItem("token");
}

export function calculDetails(series: any[], labels: any[], deposit: any[]) {
  // Start / End Value
  // Variation global
  // Max / Min Value
  // Deposit and date
  // Amount win

  var startValue: number = series[0];
  var endValue: number = series[series.length - 1];

  var max: number = series[0];
  var min: number = series[0];

  series.forEach((element) => {
    if (max < element) {
      max = element;
    }
    if (min > element) {
      min = element;
    }
  });

  var listDeposit: any[] = [];

  var depo: any = deposit[0];
  var amountDepo: number = 0;

  deposit.forEach((element, index) => {
    if (element !== depo) {
      listDeposit.push({ deposit: element - depo, date: labels[index] });
      amountDepo += element - depo;
      depo = element;
    }
  });

  var value: number = Number((endValue - startValue - amountDepo).toFixed(2));

  var variation: number = Number(
    (
      ((endValue - deposit[deposit.length - 1]) / deposit[deposit.length - 1]) *
        100 -
      ((startValue - deposit[0]) / deposit[0]) * 100
    ).toFixed(1)
  );
  return { startValue, endValue, value, max, min, listDeposit, variation };
}
