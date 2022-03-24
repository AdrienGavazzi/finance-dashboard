import { info } from "../data/info";
//import { allocation } from "../data/allocation";
//import { performance } from "../data/performance";
import { positions } from "../data/positions";
import { Allocation, Position } from "../data/models";
import {
  getActionsLive,
  getCryptoLive,
  getEtfHistory,
  getEtfLives,
  getInfo,
  getRealEstateLive,
} from "../utils/API";
import { setEtfHistoryStorage, setEtfStorage } from "../utils/utils";

function getRandomDelay() {
  // return 0;
  return 500 + Math.random() * 2000;
  // return 9999999999;
}

export function getFundInfo(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(info);
    }, getRandomDelay());
  });
}

export async function getFundAllocation(): Promise<Allocation[]> {
  var listAllocation: Allocation[] = [];

  var responseDistribution: any = await getEtfLives();

  responseDistribution.data.data.forEach((element: any, index: any) => {
    listAllocation.push({
      category: element.name,
      value: Number(
        ((element.value * 100) / responseDistribution.data.total).toFixed(1)
      ),
    });
    responseDistribution.data.data[index].pourcent = Number(
      ((element.value * 100) / responseDistribution.data.total).toFixed(1)
    );
  }, responseDistribution.data.data);

  setEtfStorage(responseDistribution.data.data);

  return listAllocation;
}

export async function getPerformance(): Promise<any> {
  var perf: String[] = [];
  var categories: String[] = [];
  var deposits: String[] = [];

  var responseHistory: any = await getEtfHistory();

  var cpt = parseInt((responseHistory.data.data.length / 12).toString());

  responseHistory.data.data.forEach((element: any) => {
    perf.push(parseInt(element.assets).toString());
    deposits.push(parseInt(element.deposit).toString());
    if (cpt === parseInt((responseHistory.data.data.length / 12).toString())) {
      categories.push(element.date);
      cpt = 0;
    } else {
      categories.push("");
      cpt++;
    }
  });

  setEtfHistoryStorage(responseHistory.data.data);

  return { perf, categories, deposits };
}

export async function getPositions(): Promise<any> {
  var responsePosition: any = await getEtfLives();
  var responseInfo: any = await getInfo();

  var position: any = [];
  var total: any = [
    {
      finance: "ETF",
      bourse: Number(responsePosition.data.total).toFixed(1),
      money: responsePosition.data.money.number,
      total: Number(
        responsePosition.data.total + responsePosition.data.money.number
      ).toFixed(1),
      totalinvest: responseInfo.data.data.invest.etf,
      variation: Number(
        ((responsePosition.data.total +
          responsePosition.data.money.number -
          responseInfo.data.data.invest.etf) /
          responseInfo.data.data.invest.etf) *
          100
      ).toFixed(1),
    },
  ];

  responsePosition.data.data.forEach((element: any) => {
    position.push(element);
  });

  return { position, total };
}

export async function getActions(): Promise<any> {
  var responseActions: any = await getActionsLive();
  var responseInfo: any = await getInfo();

  var position: any = [];
  var total: any = [
    {
      finance: "Actions",
      bourse: Number(responseActions.data.total).toFixed(1),
      total: Number(responseActions.data.total).toFixed(1),
      totalinvest: responseInfo.data.data.invest.action,
      variation: Number(
        ((responseActions.data.total - responseInfo.data.data.invest.action) /
          responseInfo.data.data.invest.action) *
          100
      ).toFixed(1),
    },
  ];

  responseActions.data.data.forEach((element: any) => {
    position.push(element);
  });

  return { position, total };
}

export async function getRealEstate(): Promise<any> {
  var responseActions: any = await getRealEstateLive();
  var responseInfo: any = await getInfo();

  var position: any = [];
  var total: any = [
    {
      finance: "Real Estate",
      total: Number(responseActions.data.total).toFixed(1),
      totalinvest: responseInfo.data.data.invest["real-estate"],
      variation: Number(
        ((responseActions.data.total -
          responseInfo.data.data.invest["real-estate"]) /
          responseInfo.data.data.invest["real-estate"]) *
          100
      ).toFixed(1),
    },
  ];

  responseActions.data.data.forEach((element: any) => {
    position.push(element);
  });

  return { position, total };
}

export async function getCrypto(): Promise<any> {
  var responseCrypto: any = await getCryptoLive();
  var responseInfo: any = await getInfo();

  var position: any = [];
  var total: any = [
    {
      finance: "Crypto",
      total: Number(responseCrypto.data.total).toFixed(1),
      totalinvest: responseInfo.data.data.invest.crypto,
      variation: Number(
        ((responseCrypto.data.total - responseInfo.data.data.invest.crypto) /
          responseInfo.data.data.invest.crypto) *
          100
      ).toFixed(1),
    },
  ];

  responseCrypto.data.data.forEach((element: any) => {
    position.push(element);
  });

  return { position, total };
}

export function getValuePourcent(list: any): any {
  var total: number = 0;

  list.forEach((element: any) => (total += parseFloat(element.total)));

  for (let index = 0; index < list.length; index++) {
    list[index].value = Number((list[index].total * 100) / total).toFixed(1);
  }

  return list;
}
