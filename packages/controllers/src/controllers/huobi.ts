import axios from "axios"
import BigNumber from "bignumber.js"
import { CONFIG } from "../config"
import type { MarketController, MarketData } from "../typings"

type HuobiRatesResponse = {
	data: {
		symbol: string
		open: number
		high: number
		low: number
		close: number
		amount: number
		vol: number
		count: number
		bid: number
		bidSize: number
		ask: number
		askSize: number
	}[]
	status: "ok" | "error"
}

async function getHuobiSpotRatesAll(): Promise<HuobiRatesResponse["data"]> {
	const response = await axios.create().get(`${CONFIG.huobi.apiBaseUrl}/market/tickers`)
	// console.log("Status ", response.data.data)
	if (response.status === 200) {
		return response.data.data
	} else {
		throw new Error(`Binance API getSpotRatesAll method error - ${response.statusText}`)
	}
}

export class HuobiController implements MarketController {
	constructor() {}
	async getMarketData(): Promise<MarketData[]> {
		const response = await getHuobiSpotRatesAll()
		return response.map(e => ({
			price: new BigNumber(0),
			symbol: e.symbol,
			baseAsset: "",
			quoteAsset: "",
			marketName: "Huobi",
			ask: new BigNumber(e.ask),
			askVolume: new BigNumber(e.askSize),
			bid: new BigNumber(e.bid),
			bidVolume: new BigNumber(e.bidSize),
		}))
	}
}
