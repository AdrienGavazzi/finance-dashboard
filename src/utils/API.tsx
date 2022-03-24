import axios from "axios";

const url = "http://94.238.115.218:8000"; // http://localhost:8000

export function getInfo(): Promise<any> {
  return axios.get(url + "/finance/info");
}

export function getEtfLives(): Promise<any> {
  return axios.get(url + "/finance/etf/live");
}

export function getEtfDistribution(): Promise<any> {
  return axios.get(url + "/finance/etf/distribution");
}

export function getEtfHistory(): Promise<any> {
  return axios.get(url + "/finance/etf/history");
}

export function getTest(): Promise<any> {
  return axios.get(url + "/");
}

export function getActionsLive(): Promise<any> {
  return axios.get(url + "/finance/action/live");
}

export function getRealEstateLive(): Promise<any> {
  return axios.get(url + "/finance/realestate/live");
}

export function getCryptoLive(): Promise<any> {
  return axios.get(url + "/finance/crypto/live");
}
