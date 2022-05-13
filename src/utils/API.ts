import axios from "axios";
import { getToken } from "./utils";

const url = "https://finance.gavazziadrien.fr:8001"; // http://localhost:8000 | 94.238.115.218

export function getInfo(): Promise<any> {
  return axios.get(url + "/finance/info", { params: { token: getToken() } });
}

export function getFundHistory(): Promise<any> {
  return axios.get(url + "/finance/fund/history", {
    params: { token: getToken() },
  });
}

export function getEtfLives(): Promise<any> {
  return axios.get(url + "/finance/etf/live", {
    params: { token: getToken() },
  });
}

export function getEtfDistribution(): Promise<any> {
  return axios.get(url + "/finance/etf/distribution", {
    params: { token: getToken() },
  });
}

export function getEtfHistoryAPI(send: any): Promise<any> {
  return axios.get(url + "/finance/etf/history", {
    params: { ...send, token: getToken() },
  });
}

export function getActionHistoryAPI(send: any): Promise<any> {
  return axios.get(url + "/finance/action/history", {
    params: { ...send, token: getToken() },
  });
}

export function getCryptoHistoryAPI(send: any): Promise<any> {
  return axios.get(url + "/finance/crypto/history", {
    params: { ...send, token: getToken() },
  });
}

export function getTest(): Promise<any> {
  return axios.get(url + "/");
}

export function getActionsLive(): Promise<any> {
  return axios.get(url + "/finance/action/live", {
    params: { token: getToken() },
  });
}

export function getRealEstateLive(): Promise<any> {
  return axios.get(url + "/finance/realestate/live", {
    params: { token: getToken() },
  });
}

export function getCryptoLive(): Promise<any> {
  return axios.get(url + "/finance/crypto/live", {
    params: { token: getToken() },
  });
}

export function getHistoryDates(send: any): Promise<any> {
  return axios.get(url + "/finance/fund/dateshistory", {
    params: { ...send, token: getToken() },
  });
}

export function login(send: any): Promise<any> {
  return axios.get(url + "/user/login", {
    params: { ...send, token: getToken() },
  });
}
