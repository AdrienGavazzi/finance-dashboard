import axios from "axios";

import { getToken } from "../../utils/utils";

export default class ApiService {

    private static url: string = "https://api.finance.gavazziadrien.fr"

    public static async getPositions(): Promise<any> {
        return await axios.get(this.url + "/positions", {headers: { authorization: "Bearer " + getToken() }})
    }

    public static async getPositionsList(): Promise<any> {
        return await axios.get(this.url + "/positions/list", {headers: { authorization: "Bearer " + getToken() }})
    }

    public static async getPositionsLive(symbol?: string): Promise<any> {
        if (symbol) {
            return await axios.get(this.url + "/positions/live", {params: {symbols: symbol}, headers: { authorization: "Bearer " + getToken() }})
        }
        return await axios.get(this.url + "/positions/live", {headers: { authorization: "Bearer " + getToken() }})
    }

    public static async getPositionsHistory(start_date?: string, end_date?: string): Promise<any> {
        if (start_date && end_date) {
            return await axios.get(this.url + "/positions/history", {params: {start_date, end_date}, headers: { authorization: "Bearer " + getToken() }})
        }
        return await axios.get(this.url + "/positions/history", {headers: { authorization: "Bearer " + getToken() }})
    }
}